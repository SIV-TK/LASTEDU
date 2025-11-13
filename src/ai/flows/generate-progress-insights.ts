'use server';
/**
 * @fileOverview An AI agent that analyzes student progress data.
 *
 * - generateProgressInsights - A function that handles the progress analysis.
 * - GenerateProgressInsightsInput - The input type for the function.
 * - GenerateProgressInsightsOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {validateAndFormatResponse} from '@/ai/response-formatter';
import {deepseekChat} from 'genkitx-deepseek';
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

const prompt = ai.definePrompt({
  name: 'generateProgressInsightsPrompt',
  input: {schema: GenerateProgressInsightsInputSchema},
  model: deepseekChat,
  output: {schema: GenerateProgressInsightsOutputSchema},
  prompt: `You are an encouraging and insightful academic advisor. Analyze the following progress data for the subject '{{{subject}}}'.

  Your task is to provide a brief, actionable analysis of the student's performance. The tone should be positive and constructive.
  
  - Highlight strengths, such as significant improvements or consistent high performance. For example: "Great job on the consistent progress in May and June!"
  - Gently point out areas for focus if you see a dip in performance. For example: "It looks like there was a small dip in March; perhaps reviewing that month's topics would be helpful."
  - Keep the overall analysis concise (2-3 sentences).
  
  Here is the student's data:
  {{#each progressData}}
  - **{{month}}**: {{progress}}%
  {{/each}}
  
  Generate the analysis now.`,
});

const generateProgressInsightsFlow = ai.defineFlow(
  {
    name: 'generateProgressInsightsFlow',
    inputSchema: GenerateProgressInsightsInputSchema,
    outputSchema: GenerateProgressInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output as GenerateProgressInsightsOutput;
  }
);
