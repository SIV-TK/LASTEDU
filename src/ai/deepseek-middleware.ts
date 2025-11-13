import { ModelMiddleware } from 'genkit';

export const deepseekResponseMiddleware: ModelMiddleware = (req, next) => {
  return next(req).then(response => {
    // Fix Deepseek response format to match Genkit schema
    if (response?.candidates?.[0]?.message?.text && !response.candidates[0].message.content) {
      response.candidates[0].message = {
        role: response.candidates[0].message.role === 'assistant' ? 'model' : response.candidates[0].message.role,
        content: [{ text: response.candidates[0].message.text }]
      };
      delete response.candidates[0].message.text;
    }
    return response;
  });
};