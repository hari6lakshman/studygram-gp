'use server';

/**
 * @fileOverview Dynamically adjusts quiz difficulty based on student performance.
 *
 * - adjustDifficulty - Main function to get quiz questions with difficulty adjustment.
 * - DifficultyAdjustmentInput - Input type for the adjustDifficulty function.
 * - DifficultyAdjustmentOutput - Output type for the adjustDifficulty function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DifficultyAdjustmentInputSchema = z.object({
  subject: z.string().describe('The subject of the quiz (e.g., Physics, Chemistry, Math, Biology, Coding).'),
  topic: z.string().describe('The specific topic within the subject (e.g., Basic Electrostatics).'),
  studentPerformance: z
    .number()
    .min(0)
    .max(1)
    .describe(
      'A numerical representation of the student performance on the last quiz, between 0 and 1.  0 is all incorrect, 1 is all correct.'
    ),
  previousQuestions: z
    .array(z.string())
    .optional()
    .describe('The questions asked in the previous round to prevent duplicates.'),
});
export type DifficultyAdjustmentInput = z.infer<typeof DifficultyAdjustmentInputSchema>;

const DifficultyAdjustmentOutputSchema = z.object({
  questions: z.array(z.string()).describe('An array of 5 multiple-choice questions tailored to the student performance.'),
});
export type DifficultyAdjustmentOutput = z.infer<typeof DifficultyAdjustmentOutputSchema>;

export async function adjustDifficulty(input: DifficultyAdjustmentInput): Promise<DifficultyAdjustmentOutput> {
  return adjustDifficultyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'difficultyAdjustmentPrompt',
  input: {schema: DifficultyAdjustmentInputSchema},
  output: {schema: DifficultyAdjustmentOutputSchema},
  prompt: `You are an expert quiz question generator, tailoring questions based on student performance.

  Subject: {{{subject}}}
  Topic: {{{topic}}}
  Student Performance (0-1): {{{studentPerformance}}}

  Based on the student's performance, generate 5 multiple-choice questions.  If the performance is near 0, generate easier questions.  If the performance is near 1, generate harder questions.

  Previous questions (if any) that have already been asked and MUST NOT be re-used:
  {{#if previousQuestions}}
  {{#each previousQuestions}}- {{{this}}}\n{{/each}}
  {{else}}
  None
  {{/if}}
  `,
});

const adjustDifficultyFlow = ai.defineFlow(
  {
    name: 'adjustDifficultyFlow',
    inputSchema: DifficultyAdjustmentInputSchema,
    outputSchema: DifficultyAdjustmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
