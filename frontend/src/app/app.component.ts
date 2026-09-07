import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

type AssistResponse = {
  caseId: string;
  assistantSummary: {
    uncertainties: string[];
    missingInformation: { question: string; context: string }[];
    hypotheses: { title: string; rationale: string; probability: number }[];
    recommendedTests: { testName: string; purpose: string; expectedImpact: string }[];
    evidences: { key: string; value: string; kind: string; confidence: number; source?: string }[];
  };
};

type LocalVehicle = {
  id: string;
  vin: string;
  make: string;
  model: string;
  year: number;
};

type LocalSymptom = {
  description: string;
  frequency: string;
  context: string;
};

type LocalDtc = {
  code: string;
  description: string;
};

type LocalMeasurement = {
  name: string;
  value: number;
  unit: string;
  note: string;
};

type LocalTest = {
  name: string;
  expectedResult: string;
  actualResult: string;
  status: string;
};

type LocalCase = {
  id: string;
  vehicleId: string;
  caseNumber: string;
  complaint: string;
  symptoms: LocalSymptom[];
  dtcs: LocalDtc[];
  measurements: LocalMeasurement[];
  tests: LocalTest[];
};

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  standalone: true,
  styles: [
    `
      :host {
        display: block;
        padding: 24px;
        font-family: 'Trebuchet MS', 'Segoe UI', Arial, sans-serif;
        background: linear-gradient(135deg, #f8fafc, #e8ecff);
        color: #102a43;
      }
      .panel {
        border: 1px solid #d6deea;
        padding: 14px;
        border-radius: 12px;
        margin-bottom: 14px;
        background: #fff;
      }
      button {
        background: #2f67f6;
        border: 0;
        color: #fff;
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        margin-top: 8px;
      }
      input,
      textarea {
        width: 100%;
        box-sizing: border-box;
        margin: 6px 0 12px;
        padding: 8px;
      }
      label {
        font-weight: 600;
      }
      .status {
        border: 1px solid #b8d3ff;
        background: #eef6ff;
        color: #0f3d73;
        padding: 10px 12px;
        border-radius: 8px;
        margin-bottom: 14px;
      }
      .status.error {
        border-color: #f4b5b5;
        background: #fff0f0;
        color: #8a1f1f;
      }
    `,
  ],
  template: `
    <h1>GarageBench — MVP</h1>
    <p class="status" [class.error]="statusIsError" *ngIf="statusMessage">
      {{ statusMessage }}
    </p>

    <section class="panel">
      <h2>1) Create vehicle</h2>
      <label>VIN</label>
      <input [(ngModel)]="vehicle.vin" />
      <label>Make</label>
      <input [(ngModel)]="vehicle.make" />
      <label>Model</label>
      <input [(ngModel)]="vehicle.model" />
      <label>Year</label>
      <input type="number" [(ngModel)]="vehicle.year" />
      <button (click)="createVehicle()">Create vehicle</button>
    </section>

    <section class="panel">
      <h2>2) Create case</h2>
      <label>Vehicle ID</label>
      <input [(ngModel)]="casePayload.vehicleId" />
      <label>Case number</label>
      <input [(ngModel)]="casePayload.caseNumber" />
      <label>Complaint</label>
      <textarea rows="3" [(ngModel)]="casePayload.complaint"></textarea>
      <button (click)="createCase()">Create case</button>
    </section>

    <section class="panel" *ngIf="caseId">
      <h2>3) Add information</h2>
      <div>
        <label>Symptom</label>
        <input [(ngModel)]="symptom.description" />
        <button (click)="addSymptom()">Add symptom</button>
      </div>
      <div>
        <label>DTC</label>
        <input [(ngModel)]="dtc.code" />
        <button (click)="addDtc()">Add DTC</button>
      </div>
      <div>
        <label>Measurement (name)</label>
        <input [(ngModel)]="measurement.name" />
        <label>Value</label>
        <input type="number" [(ngModel)]="measurement.value" />
        <label>Unit</label>
        <input [(ngModel)]="measurement.unit" />
        <label>Note</label>
        <input [(ngModel)]="measurement.note" />
        <button (click)="addMeasurement()">Add measurement</button>
      </div>
    </section>

    <section class="panel" *ngIf="caseId">
      <h2>4) Assistant</h2>
      <button (click)="requestAssist()">Ask assistant</button>
      <pre *ngIf="assist">{{ assist | json }}</pre>
    </section>

    <section class="panel" *ngIf="caseId">
      <h2>5) Register test</h2>
      <label>Test name</label>
      <input [(ngModel)]="test.name" />
      <label>Expected result</label>
      <input [(ngModel)]="test.expectedResult" />
      <label>Actual result</label>
      <input [(ngModel)]="test.actualResult" />
      <label>Status</label>
      <input [(ngModel)]="test.status" />
      <button (click)="addTest()">Register test</button>
    </section>
  `,
})
export class AppComponent {
  vehicle = { vin: '', make: '', model: '', year: new Date().getFullYear() };
  casePayload = {
    vehicleId: '',
    caseNumber: '',
    complaint: '',
  };
  symptom = { description: '', frequency: 'frequent', context: '' };
  dtc = { code: '', description: '' };
  measurement = { name: '', value: 0, unit: '', note: '' };
  test = {
    name: '',
    expectedResult: '',
    actualResult: '',
    status: 'done',
  };

  caseId = '';
  assist?: AssistResponse;
  statusMessage = '';
  statusIsError = false;
  private readonly localVehiclesKey = 'garagebench.localVehicles';
  private readonly localCasesKey = 'garagebench.localCases';

  constructor(private readonly http: HttpClient) {}

  createVehicle() {
    this.setStatus('Creating vehicle...');
    const payload = { ...this.vehicle, year: Number(this.vehicle.year) };
    this.http
      .post<{ id: string }>(`${environment.apiBaseUrl}/vehicles`, payload)
      .subscribe({
        next: (res) => {
          this.casePayload.vehicleId = res.id;
          this.setStatus(`Vehicle created. ID copied into the case form: ${res.id}`);
        },
        error: (error) => {
          if (this.isBackendUnavailable(error)) {
            const id = this.createLocalId();
            this.saveLocalVehicle({ id, ...payload });
            this.casePayload.vehicleId = id;
            this.setStatus(`Vehicle created locally. ID copied into the case form: ${id}`);
            return;
          }

          this.handleError('Could not create vehicle', error);
        },
      });
  }

  createCase() {
    this.setStatus('Creating diagnostic case...');
    this.http
      .post<{ id: string }>(`${environment.apiBaseUrl}/cases`, this.casePayload)
      .subscribe({
        next: (res) => {
          this.caseId = res.id;
          this.setStatus(`Case created: ${res.id}`);
        },
        error: (error) => {
          if (this.isBackendUnavailable(error)) {
            const id = this.createLocalId();
            this.saveLocalCase({
              id,
              vehicleId: this.casePayload.vehicleId,
              caseNumber: this.casePayload.caseNumber,
              complaint: this.casePayload.complaint,
              symptoms: [],
              dtcs: [],
              measurements: [],
              tests: [],
            });
            this.caseId = id;
            this.setStatus(`Case created locally: ${id}`);
            return;
          }

          this.handleError('Could not create case', error);
        },
      });
  }

  addSymptom() {
    if (!this.caseId) return;
    this.setStatus('Adding symptom...');
    this.http
      .post(`${environment.apiBaseUrl}/cases/${this.caseId}/symptoms`, this.symptom)
      .subscribe({
        next: () => this.setStatus('Symptom added.'),
        error: (error) => {
          if (this.isBackendUnavailable(error)) {
            this.updateLocalCase('symptoms', this.symptom);
            this.setStatus('Symptom added locally.');
            return;
          }

          this.handleError('Could not add symptom', error);
        },
      });
  }

  addDtc() {
    if (!this.caseId) return;
    this.setStatus('Adding DTC...');
    this.http
      .post(`${environment.apiBaseUrl}/cases/${this.caseId}/dtcs`, this.dtc)
      .subscribe({
        next: () => this.setStatus('DTC added.'),
        error: (error) => {
          if (this.isBackendUnavailable(error)) {
            this.updateLocalCase('dtcs', this.dtc);
            this.setStatus('DTC added locally.');
            return;
          }

          this.handleError('Could not add DTC', error);
        },
      });
  }

  addMeasurement() {
    if (!this.caseId) return;
    this.setStatus('Adding measurement...');
    const payload = {
      ...this.measurement,
      value: Number(this.measurement.value),
    };
    this.http
      .post(`${environment.apiBaseUrl}/cases/${this.caseId}/measurements`, payload)
      .subscribe({
        next: () => this.setStatus('Measurement added.'),
        error: (error) => {
          if (this.isBackendUnavailable(error)) {
            this.updateLocalCase('measurements', payload);
            this.setStatus('Measurement added locally.');
            return;
          }

          this.handleError('Could not add measurement', error);
        },
      });
  }

  requestAssist() {
    if (!this.caseId) return;
    this.setStatus('Asking assistant...');
    this.http
      .post<AssistResponse>(`${environment.apiBaseUrl}/cases/${this.caseId}/assist`, {})
      .subscribe({
        next: (res) => {
          this.assist = res;
          this.setStatus('Assistant response ready.');
        },
        error: (error) => {
          if (this.isBackendUnavailable(error)) {
            this.setStatus('Assistant is not available while the backend is offline.');
            return;
          }

          this.handleError('Could not get assistant response', error);
        },
      });
  }

  addTest() {
    if (!this.caseId) return;
    this.setStatus('Registering test...');
    this.http
      .post(`${environment.apiBaseUrl}/cases/${this.caseId}/tests`, this.test)
      .subscribe({
        next: () => this.setStatus('Test registered.'),
        error: (error) => {
          if (this.isBackendUnavailable(error)) {
            this.updateLocalCase('tests', this.test);
            this.setStatus('Test registered locally.');
            return;
          }

          this.handleError('Could not register test', error);
        },
      });
  }

  private setStatus(message: string) {
    this.statusMessage = message;
    this.statusIsError = false;
  }

  private handleError(prefix: string, error: HttpErrorResponse) {
    const detail = error.error?.message ?? error.message ?? 'Unknown error';
    this.statusMessage = `${prefix}: ${detail}`;
    this.statusIsError = true;
  }

  private isBackendUnavailable(error: HttpErrorResponse) {
    return error.status === 0;
  }

  private createLocalId() {
    return crypto.randomUUID();
  }

  private saveLocalVehicle(vehicle: LocalVehicle) {
    const vehicles = this.readLocal<LocalVehicle>(this.localVehiclesKey);
    vehicles.push(vehicle);
    this.writeLocal(this.localVehiclesKey, vehicles);
  }

  private saveLocalCase(diagnosticCase: LocalCase) {
    const cases = this.readLocal<LocalCase>(this.localCasesKey);
    cases.push(diagnosticCase);
    this.writeLocal(this.localCasesKey, cases);
  }

  private updateLocalCase<K extends 'symptoms' | 'dtcs' | 'measurements' | 'tests'>(
    key: K,
    value: LocalCase[K][number],
  ) {
    const cases = this.readLocal<LocalCase>(this.localCasesKey);
    const diagnosticCase = cases.find((item) => item.id === this.caseId);
    if (!diagnosticCase) return;

    switch (key) {
      case 'symptoms':
        diagnosticCase.symptoms.push(value as LocalSymptom);
        break;
      case 'dtcs':
        diagnosticCase.dtcs.push(value as LocalDtc);
        break;
      case 'measurements':
        diagnosticCase.measurements.push(value as LocalMeasurement);
        break;
      case 'tests':
        diagnosticCase.tests.push(value as LocalTest);
        break;
    }

    this.writeLocal(this.localCasesKey, cases);
  }

  private readLocal<T>(key: string): T[] {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  }

  private writeLocal<T>(key: string, value: T[]) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
