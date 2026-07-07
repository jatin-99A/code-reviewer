import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import env from '../env';

export const llm = createOpenRouter({
    apiKey: env.OPEN_ROUTER_API_KEY,
});