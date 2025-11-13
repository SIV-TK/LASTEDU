import { genkit } from 'genkit';
import { deepseek } from 'genkitx-deepseek';
import { deepseekResponseMiddleware } from './deepseek-middleware';

export const ai = genkit({
  plugins: [
    deepseek({
      apiKey: process.env.DEEPSEEK_API_KEY,
    }),
  ],
  model: {
    middleware: [deepseekResponseMiddleware]
  },
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
