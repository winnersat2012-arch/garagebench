import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiModule } from '../common/ai/ai.module';
import { DiagnosticsController } from './controllers/diagnostics.controller';
import { VehicleController } from './controllers/vehicle.controller';
import { DiagnosticsService } from './services/diagnostics.service';
import { Vehicle } from './entities/vehicle.entity';
import { DiagnosticCase } from './entities/diagnostic-case.entity';
import { Symptom } from './entities/symptom.entity';
import { DtcCode } from './entities/dtc-code.entity';
import { Measurement } from './entities/measurement.entity';
import { Hypothesis } from './entities/hypothesis.entity';
import { DiagnosticTest } from './entities/diagnostic-test.entity';
import { Evidence } from './entities/evidence.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Vehicle,
      DiagnosticCase,
      Symptom,
      DtcCode,
      Measurement,
      Hypothesis,
      DiagnosticTest,
      Evidence,
    ]),
    AiModule,
  ],
  controllers: [VehicleController, DiagnosticsController],
  providers: [DiagnosticsService],
})
export class DiagnosticsModule {}
