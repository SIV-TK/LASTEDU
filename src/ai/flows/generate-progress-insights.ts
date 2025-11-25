'use server';
/**
 * @fileOverview An AI agent that analyzes student progress data.
 *
 * - generateProgressInsights - A function that handles the progress analysis.
 * - GenerateProgressInsightsInput - The input type for the function.
 * - GenerateProgressInsightsOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProgressDataItemSchema = z.object({
  month: z.string(),
  progress: z.number(),
});

const GenerateProgressInsightsInputSchema = z.object({
  subject: z.string().describe('The subject for which to generate insights.'),
  progressData: z.array(ProgressDataItemSchema).describe("An array of the student's monthly progress data."),
});
export type GenerateProgressInsightsInput = z.infer<typeof GenerateProgressInsightsInputSchema>;

const GenerateProgressInsightsOutputSchema = z.object({
  insights: z.string().describe("AI-generated analysis of the student's progress, formatted as Markdown."),
});
export type GenerateProgressInsightsOutput = z.infer<typeof GenerateProgressInsightsOutputSchema>;

export async function generateProgressInsights(input: GenerateProgressInsightsInput): Promise<GenerateProgressInsightsOutput> {
  return generateProgressInsightsFlow(input);
}



const generateProgressInsightsFlow = ai.defineFlow(
  {
    name: 'generateProgressInsightsFlow',
    inputSchema: GenerateProgressInsightsInputSchema,
    outputSchema: GenerateProgressInsightsOutputSchema,
  },
  async input => {
    try {
      const result = await ai.generate({
        model: 'deepseek/deepseek-chat',
        prompt: `Analyze progress data for ${input.subject}: ${input.progressData.map(d => `${d.month}: ${d.progress}%`).join(', ')}. Provide 2-3 encouraging sentences highlighting strengths and areas for improvement.`,
        output: { schema: GenerateProgressInsightsOutputSchema }
      });
      
      return result.output() as GenerateProgressInsightsOutput;
    } catch (error) {
      console.error('Progress insights generation failed:', error);
      return { insights: 'Your progress shows dedication to learning. Keep up the consistent effort!' };
    }
  }
);
