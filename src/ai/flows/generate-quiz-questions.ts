'use server';

/**
 * @fileOverview A flow to generate multiple-choice quiz questions for a given topic.
 *
 * - generateQuizQuestions - A function that generates quiz questions for a topic.
 * - GenerateQuizQuestionsInput - The input type for the generateQuizQuestions function.
 * - GenerateQuizQuestionsOutput - The return type for the generateQuizQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizQuestionsInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate quiz questions.'),
  numQuestions: z.number().describe('The number of quiz questions to generate.'),
});

export type GenerateQuizQuestionsInput = z.infer<typeof GenerateQuizQuestionsInputSchema>;

const GenerateQuizQuestionsOutputSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string().describe('The quiz question.'),
      options: z.array(z.string()).describe('The multiple-choice options.'),
      correctAnswer: z.string().describe('The correct answer to the question.'),
    })
  ).describe('An array of quiz questions with options and correct answers.'),
});

export type GenerateQuizQuestionsOutput = z.infer<typeof GenerateQuizQuestionsOutputSchema>;

export async function generateQuizQuestions(input: GenerateQuizQuestionsInput): Promise<GenerateQuizQuestionsOutput> {
  return generateQuizQuestionsFlow(input);
}

const generateQuizQuestionsPrompt = ai.definePrompt({
  name: 'generateQuizQuestionsPrompt',
  input: {schema: GenerateQuizQuestionsInputSchema},
  output: {schema: GenerateQuizQuestionsOutputSchema},
  prompt: `You are an expert quiz question generator.

  Generate {{numQuestions}} multiple-choice questions for the topic: {{topic}}.

  Each question should have 4 options, with one correct answer.

  The output should be a JSON array of questions, where each question object has the following structure:
  {
    "question": "The quiz question.",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correctAnswer": "The correct answer to the question."
  }
  `,
});

const generateQuizQuestionsFlow = ai.defineFlow(
  {
    name: 'generateQuizQuestionsFlow',
    inputSchema: GenerateQuizQuestionsInputSchema,
    outputSchema: GenerateQuizQuestionsOutputSchema,
  },
  async input => {
    const {output} = await generateQuizQuestionsPrompt(input);
    return output!;
  }
);
