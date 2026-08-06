export interface EvidenceSignal {
  key: string;
  value: string;
  kind: 'DECLARED' | 'OBSERVED' | 'MEASURED' | 'RETRIEVED' | 'INFERRED';
  confidence: number;
  source?: string;
}

export interface HypothesisSuggestion {
  title: string;
  rationale: string;
  probability: number;
}

export interface RecommendedTest {
  testName: string;
  purpose: string;
  expectedImpact: string;
}

export interface MissingInfoQuestion {
  question: string;
  context: string;
}

export interface CopilotResponse {
  uncertainties: string[];
  missingInformation: MissingInfoQuestion[];
  hypotheses: HypothesisSuggestion[];
  recommendedTests: RecommendedTest[];
  evidences: EvidenceSignal[];
}

export interface CopilotRequest {
  vehicle: {
    vin: string;
    make: string;
    model: string;
    year: number;
  };
  complaint?: string;
  symptoms: string[];
  dtcs: string[];
  measurements: { name: string; value: number; unit: string }[];
}

export interface IAssistantProvider {
  analyze(input: CopilotRequest): Promise<CopilotResponse>;
}
