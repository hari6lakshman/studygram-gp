'use server';

import { generateQuizQuestions } from '@/ai/flows/generate-quiz-questions';
import type { GenerateQuizQuestionsInput } from '@/ai/flows/generate-quiz-questions';

export async function getQuizQuestionsAction(
  input: GenerateQuizQuestionsInput
) {
  try {
    const result = await generateQuizQuestions(input);
    return { success: true, data: result.questions };
  } catch (error) {
    console.error('Error generating quiz questions:', error);
    return { success: false, error: 'Failed to generate quiz questions.' };
  }
}
