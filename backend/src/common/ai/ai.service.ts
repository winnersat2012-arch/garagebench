import { Inject, Injectable } from '@nestjs/common';
import { CopilotRequest, CopilotResponse, IAssistantProvider } from './ai.provider';

export const AI_PROVIDER = 'AI_PROVIDER_TOKEN';

@Injectable()
export class AiService {
  constructor(@Inject(AI_PROVIDER) private readonly provider: IAssistantProvider) {}

  analyzeForCase(input: CopilotRequest): Promise<CopilotResponse> {
    return this.provider.analyze(input);
  }
}
