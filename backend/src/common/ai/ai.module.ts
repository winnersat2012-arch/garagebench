import { Module } from '@nestjs/common';
import { AiService, AI_PROVIDER } from './ai.service';
import { OpenAiAiAdapter } from './adapters/openai-ai.adapter';
import { OllamaAiAdapter } from './adapters/ollama-ai.adapter';
import { MockAiAdapter } from './adapters/mock-ai.adapter';

@Module({
  providers: [
    {
      provide: AI_PROVIDER,
      useFactory: () => {
        const provider = process.env.AI_PROVIDER?.toLowerCase();

        if (provider === 'openai') {
          return new OpenAiAiAdapter(process.env.OPENAI_API_KEY);
        }

        if (provider === 'ollama') {
          return new OllamaAiAdapter(process.env.OLLAMA_BASE_URL, process.env.OLLAMA_MODEL);
        }

        return new MockAiAdapter();
      },
    },
    AiService,
  ],
  exports: [AiService],
})
export class AiModule {}
