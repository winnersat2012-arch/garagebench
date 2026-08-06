import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
    `,
  ],
  template: `
    <h1>GarageBench — MVP</h1>
    <section class="panel">
      <h2>1) Crear vehículo</h2>
      <label>VIN</label>
      <input [(ngModel)]="vehicle.vin" />
      <label>Marca</label>
      <input [(ngModel)]="vehicle.make" />
      <label>Modelo</label>
      <input [(ngModel)]="vehicle.model" />
      <label>Año</label>
      <input type="number" [(ngModel)]="vehicle.year" />
      <button (click)="createVehicle()">Crear vehículo</button>
    </section>

    <section class="panel">
      <h2>2) Crear expediente</h2>
      <label>ID vehículo</label>
      <input [(ngModel)]="casePayload.vehicleId" />
      <label>Número de expediente</label>
      <input [(ngModel)]="casePayload.caseNumber" />
      <label>Descripción/avería</label>
      <textarea rows="3" [(ngModel)]="casePayload.complaint"></textarea>
      <button (click)="createCase()">Crear expediente</button>
    </section>

    <section class="panel" *ngIf="caseId">
      <h2>3) Añadir información</h2>
      <div>
        <label>Síntoma</label>
        <input [(ngModel)]="symptom.description" />
        <button (click)="addSymptom()">Añadir síntoma</button>
      </div>
      <div>
        <label>DTC</label>
        <input [(ngModel)]="dtc.code" />
        <button (click)="addDtc()">Añadir DTC</button>
      </div>
    </section>

    <section class="panel" *ngIf="caseId">
      <h2>4) Copiloto de diagnóstico</h2>
      <button (click)="requestAssist()">Solicitar orientación</button>
      <pre *ngIf="assist">{{ assist | json }}</pre>
    </section>

    <section class="panel" *ngIf="caseId">
      <h2>5) Registrar prueba</h2>
      <label>Nombre de prueba</label>
      <input [(ngModel)]="test.name" />
      <label>Resultado esperado</label>
      <input [(ngModel)]="test.expectedResult" />
      <label>Resultado obtenido</label>
      <input [(ngModel)]="test.actualResult" />
      <label>Estado</label>
      <input [(ngModel)]="test.status" />
      <button (click)="addTest()">Registrar prueba</button>
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
  test = {
    name: '',
    expectedResult: '',
    actualResult: '',
    status: 'done',
  };

  caseId = '';
  assist?: AssistResponse;

  constructor(private readonly http: HttpClient) {}

  createVehicle() {
    const payload = { ...this.vehicle, year: Number(this.vehicle.year) };
    this.http
      .post<{ id: string }>(`${environment.apiBaseUrl}/vehicles`, payload)
      .subscribe((res) => {
        this.casePayload.vehicleId = res.id;
      });
  }

  createCase() {
    this.http
      .post<{ id: string }>(`${environment.apiBaseUrl}/cases`, this.casePayload)
      .subscribe((res) => {
        this.caseId = res.id;
      });
  }

  addSymptom() {
    if (!this.caseId) return;
    this.http
      .post(`${environment.apiBaseUrl}/cases/${this.caseId}/symptoms`, this.symptom)
      .subscribe();
  }

  addDtc() {
    if (!this.caseId) return;
    this.http
      .post(`${environment.apiBaseUrl}/cases/${this.caseId}/dtcs`, this.dtc)
      .subscribe();
  }

  requestAssist() {
    if (!this.caseId) return;
    this.http
      .post<AssistResponse>(`${environment.apiBaseUrl}/cases/${this.caseId}/assist`, {})
      .subscribe((res) => (this.assist = res));
  }

  addTest() {
    if (!this.caseId) return;
    this.http
      .post(`${environment.apiBaseUrl}/cases/${this.caseId}/tests`, this.test)
      .subscribe();
  }
}
