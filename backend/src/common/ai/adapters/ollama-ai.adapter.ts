import { Injectable } from '@nestjs/common';
import { CopilotRequest, CopilotResponse, IAssistantProvider } from '../ai.provider';

@Injectable()
export class OllamaAiAdapter implements IAssistantProvider {
  constructor(private readonly baseUrl?: string, private readonly model?: string) {}

  async analyze(_input: CopilotRequest): Promise<CopilotResponse> {
    if (!this.baseUrl || !this.model) {
      throw new Error('Missing OLLAMA_BASE_URL or OLLAMA_MODEL');
    }

    throw new Error(
      'Ollama adapter placeholder: call local /api/chat endpoint in a later iteration.',
    );
  }
}
