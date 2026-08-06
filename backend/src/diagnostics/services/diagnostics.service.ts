import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AiService } from '../../common/ai/ai.service';
import { CreateDiagnosticCaseDto } from '../dto/create-diagnostic-case.dto';
import { CreateDtcDto } from '../dto/create-dtc.dto';
import { CreateSymptomDto } from '../dto/create-symptom.dto';
import { CreateTestDto } from '../dto/create-test.dto';
import { CreateMeasurementDto } from '../dto/create-measurement.dto';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { EvidenceKind } from '../entities/evidence-kind.enum';
import { DiagnosticCase } from '../entities/diagnostic-case.entity';
import { DtcCode } from '../entities/dtc-code.entity';
import { DiagnosticTest } from '../entities/diagnostic-test.entity';
import { Evidence } from '../entities/evidence.entity';
import { Hypothesis } from '../entities/hypothesis.entity';
import { Measurement } from '../entities/measurement.entity';
import { Symptom } from '../entities/symptom.entity';
import { Vehicle } from '../entities/vehicle.entity';

@Injectable()
export class DiagnosticsService {
  constructor(
    @InjectRepository(Vehicle) private readonly vehicleRepo: Repository<Vehicle>,
    @InjectRepository(DiagnosticCase) private readonly caseRepo: Repository<DiagnosticCase>,
    @InjectRepository(Symptom) private readonly symptomRepo: Repository<Symptom>,
    @InjectRepository(DtcCode) private readonly dtcRepo: Repository<DtcCode>,
    @InjectRepository(Measurement) private readonly measurementRepo: Repository<Measurement>,
    @InjectRepository(DiagnosticTest) private readonly testRepo: Repository<DiagnosticTest>,
    @InjectRepository(Hypothesis) private readonly hypothesisRepo: Repository<Hypothesis>,
    @InjectRepository(Evidence) private readonly evidenceRepo: Repository<Evidence>,
    private readonly aiService: AiService,
  ) {}

  createVehicle(dto: CreateVehicleDto) {
    const v = this.vehicleRepo.create(dto);
    return this.vehicleRepo.save(v);
  }

  async createCase(dto: CreateDiagnosticCaseDto) {
    const vehicle = await this.vehicleRepo.findOneByOrFail({ id: dto.vehicleId });
    const dc = this.caseRepo.create({
      vehicle,
      caseNumber: dto.caseNumber,
      complaint: dto.complaint,
    });

    const saved = await this.caseRepo.save(dc);
    await this.evidenceRepo.save(
      this.evidenceRepo.create({
        case: saved,
        kind: EvidenceKind.DECLARED,
        key: 'case created',
        value: dto.caseNumber,
        confidence: 1,
        source: 'technician form',
      }),
    );

    return saved;
  }

  async addSymptom(caseId: string, dto: CreateSymptomDto) {
    const dc = await this.caseRepo.findOne({ where: { id: caseId } });
    if (!dc) throw new NotFoundException('Diagnostic case not found');
    const symptom = await this.symptomRepo.save(
      this.symptomRepo.create({ ...dto, case: dc }),
    );
    await this.evidenceRepo.save(
      this.evidenceRepo.create({
        case: dc,
        kind: EvidenceKind.DECLARED,
        key: 'symptom',
        value: dto.description,
        confidence: 1,
        source: 'technician form',
      }),
    );
    return symptom;
  }

  async addDtc(caseId: string, dto: CreateDtcDto) {
    const dc = await this.caseRepo.findOne({ where: { id: caseId } });
    if (!dc) throw new NotFoundException('Diagnostic case not found');
    const dtc = await this.dtcRepo.save(this.dtcRepo.create({ ...dto, case: dc }));
    await this.evidenceRepo.save(
      this.evidenceRepo.create({
        case: dc,
        kind: EvidenceKind.RETRIEVED,
        key: 'dtc',
        value: `${dto.code}${dto.description ? ` - ${dto.description}` : ''}`,
        confidence: 0.9,
        source: 'scanner',
      }),
    );
    return dtc;
  }

  async addMeasurement(caseId: string, dto: CreateMeasurementDto) {
    const dc = await this.caseRepo.findOne({ where: { id: caseId } });
    if (!dc) throw new NotFoundException('Diagnostic case not found');

    const created = await this.measurementRepo.save(
      this.measurementRepo.create({
        ...dto,
        case: dc,
      }),
    );

    await this.evidenceRepo.save(
      this.evidenceRepo.create({
        case: dc,
        kind: EvidenceKind.MEASURED,
        key: `measurement:${dto.name}`,
        value: `${dto.name}: ${dto.value} ${dto.unit}`,
        confidence: 0.9,
        source: 'technician',
      }),
    );

    return created;
  }

  async addTest(caseId: string, dto: CreateTestDto) {
    const dc = await this.caseRepo.findOne({ where: { id: caseId } });
    if (!dc) throw new NotFoundException('Diagnostic case not found');

    const created = await this.testRepo.save(
      this.testRepo.create({
        ...dto,
        case: dc,
      }),
    );

    await this.evidenceRepo.save(
      this.evidenceRepo.create({
        case: dc,
        kind: EvidenceKind.MEASURED,
        key: 'diagnostic test result',
        value: `${dto.name}: ${dto.actualResult ?? dto.expectedResult ?? 'registrado'}`,
        confidence: 0.95,
        source: 'technician',
      }),
    );
    return created;
  }

  async getVehicleById(vehicleId: string) {
    const vehicle = await this.vehicleRepo.findOneBy({ id: vehicleId });
    if (!vehicle) throw new NotFoundException('Vehicle not found');
    return vehicle;
  }

  async getCase(caseId: string) {
    const dc = await this.caseRepo.findOne({
      where: { id: caseId },
      relations: {
        vehicle: true,
        symptoms: true,
        dtcCodes: true,
        diagnosticTests: true,
        measurements: true,
        evidences: true,
        hypotheses: true,
      },
    });

    if (!dc) throw new NotFoundException('Diagnostic case not found');

    return dc;
  }

  async requestAssistant(caseId: string) {
    const dc = await this.getCase(caseId);

    const assistInput = {
      vehicle: {
        vin: dc.vehicle.vin,
        make: dc.vehicle.make,
        model: dc.vehicle.model,
        year: dc.vehicle.year,
      },
      complaint: dc.complaint,
      symptoms: dc.symptoms.map((s) => s.description),
      dtcs: dc.dtcCodes.map((d) => d.code),
      measurements: dc.measurements?.map((m) => ({
        name: m.name,
        value: m.value,
        unit: m.unit,
      })),
    };

    const response = await this.aiService.analyzeForCase(assistInput);

    await this.hypothesisRepo.save(
      response.hypotheses.map((h) =>
        this.hypothesisRepo.create({
          case: dc,
          statement: h.title,
          rationale: h.rationale,
          probability: h.probability,
          status: h.probability > 0.8 ? 'high-likelihood' : 'provisional',
        }),
      ),
    );

    await this.evidenceRepo.save(
      response.evidences.map((e) =>
        this.evidenceRepo.create({
          case: dc,
          kind: EvidenceKind[e.kind as keyof typeof EvidenceKind],
          key: e.key,
          value: e.value,
          confidence: e.confidence,
          source: e.source,
        }),
      ),
    );

    return {
      caseId,
      assistantSummary: response,
    };
  }
}
