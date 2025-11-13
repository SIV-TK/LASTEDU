'use server';
/**
 * @fileOverview An AI agent that generates study tips for a subject.
 *
 * - generateStudyTips - A function that handles tip generation.
 * - GenerateStudyTipsInput - The input type for the function.
 * - GenerateStudyTipsOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStudyTipsInputSchema = z.object({
  subject: z.string().describe('The subject for which to generate study tips.'),
});
export type GenerateStudyTipsInput = z.infer<typeof GenerateStudyTipsInputSchema>;

const GenerateStudyTipsOutputSchema = z.object({
  tips: z.string().describe('A list of actionable study tips for the given subject, formatted as a Markdown list.'),
});
export type GenerateStudyTipsOutput = z.infer<typeof GenerateStudyTipsOutputSchema>;

export async function generateStudyTips(input: GenerateStudyTipsInput): Promise<GenerateStudyTipsOutput> {
  return generateStudyTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStudyTipsPrompt',
  input: {schema: GenerateStudyTipsInputSchema},
  model: 'deepseek/deepseek-chat',
  output: {schema: GenerateStudyTipsOutputSchema},
  prompt: `You are an expert academic advisor. A student is looking for advice on how to succeed in their {{{subject}}} class.

  Please provide a list of 5-7 concise, actionable study tips to help them excel in this subject. The tips should be practical and easy to follow.

  Format the output as a Markdown list.
  `,
});

const generateStudyTipsFlow = ai.defineFlow(
  {
    name: 'generateStudyTipsFlow',
    inputSchema: GenerateStudyTipsInputSchema,
    outputSchema: GenerateStudyTipsOutputSchema,
  },
  async input => {
    try {
      const result = await ai.generate({
        model: 'deepseek/deepseek-chat',
        prompt: `You are an expert academic advisor. A student is looking for advice on how to succeed in their ${input.subject} class.

Please provide a list of 5-7 concise, actionable study tips to help them excel in this subject. The tips should be practical and easy to follow.

Format the output as a Markdown list.`,
        output: { schema: GenerateStudyTipsOutputSchema }
      });
      
      return result.output() as GenerateStudyTipsOutput;
    } catch (error) {
      console.error('Study tips generation failed:', error);
      return { 
        tips: `## Study Tips for ${input.subject}\n\n- Review material regularly, don't cram\n- Practice problems daily\n- Ask questions when confused\n- Form study groups\n- Use multiple learning resources\n- Take breaks to avoid burnout\n- Connect concepts to real-world examples` 
      };
    }
  }
);
