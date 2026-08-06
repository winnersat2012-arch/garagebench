import { Injectable } from '@nestjs/common';
import {
  CopilotRequest,
  CopilotResponse,
  IAssistantProvider,
} from '../ai.provider';

@Injectable()
export class MockAiAdapter implements IAssistantProvider {
  async analyze(input: CopilotRequest): Promise<CopilotResponse> {
    const uncertainties: string[] = [];
    const missingInformation: { question: string; context: string }[] = [];
    const hypotheses: { title: string; rationale: string; probability: number }[] = [];
    const recommendedTests: { testName: string; purpose: string; expectedImpact: string }[] = [];

    if (!input.symptoms.length) {
      missingInformation.push({
        question: 'Describe los síntomas percibidos (ej. tirones, vibración, ruido, olores).',
        context: 'El diagnóstico necesita una base de observación.',
      });
      uncertainties.push('Faltan síntomas declarados por el técnico.');
    }

    if (!input.dtcs.length) {
      uncertainties.push('No se han aportado códigos DTC; la ruta de hipótesis será menos precisa.');
    }

    if (!input.measurements.length) {
      recommendedTests.push({
        testName: 'Lectura de sensores en cruce en ralentí',
        purpose: 'Obtener una medida de base para comparar contra los síntomas reportados.',
        expectedImpact: 'Reducir incertidumbre de diagnóstico del régimen base.',
      });
    }

    if (input.dtcs.includes('P0300') || input.dtcs.some((c) => c.startsWith('P03'))) {
      hypotheses.push({
        title: 'Posible fallo de encendido intermitente',
        rationale:
          'Los códigos de misfire suelen relacionarse con encendido, bobina, bujía o inyector.',
        probability: 0.82,
      });
      recommendedTests.push({
        testName: 'Inspección visual de sistema de encendido y prueba de compresión',
        purpose: 'Distinguir causas mecánicas de causas eléctricas sin inventar valores.',
        expectedImpact: 'Confirmar o descartar fallos de alta probabilidad.',
      });
    } else if (input.dtcs.length > 0) {
      hypotheses.push({
        title: 'Confirmar patrón de fallo con pruebas dirigidas',
        rationale:
          'Hay código(s) presentes; sin lecturas adicionales conviene secuenciar pruebas antes de cerrar hipótesis.',
        probability: 0.52,
      });
    } else {
      hypotheses.push({
        title: 'Definir hipótesis a partir de síntomas y comprobaciones básicas',
        rationale:
          'Sin códigos aún, conviene primero medir magnitudes relacionadas con el síntoma.',
        probability: 0.45,
      });
    }

    return {
      uncertainties,
      missingInformation,
      hypotheses,
      recommendedTests,
      evidences: [
        ...input.symptoms.map((s) => ({
          key: 'symptom',
          value: s,
          kind: 'DECLARED' as const,
          confidence: 1,
          source: 'vehicle owner/technician',
        })),
        ...input.dtcs.map((d) => ({
          key: 'dtc',
          value: d,
          kind: 'RETRIEVED' as const,
          confidence: 0.93,
          source: 'scanner',
        })),
      ],
    };
  }
}
