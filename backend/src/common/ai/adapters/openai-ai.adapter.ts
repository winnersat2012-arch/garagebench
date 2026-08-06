import { Injectable } from '@nestjs/common';
import { CopilotRequest, CopilotResponse, IAssistantProvider } from '../ai.provider';

@Injectable()
export class OpenAiAiAdapter implements IAssistantProvider {
  constructor(private readonly apiKey?: string) {}

  async analyze(_input: CopilotRequest): Promise<CopilotResponse> {
    if (!this.apiKey) {
      throw new Error('Missing OPENAI_API_KEY');
    }

    throw new Error(
      'OpenAI adapter placeholder: wire to the official SDK in a later iteration.',
    );
  }
}
