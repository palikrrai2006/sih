
'use server';
/**
 * @fileOverview An AI agent for generating hints for puzzles.
 *
 * - getPuzzleHint - A function that creates a hint for a given riddle.
 * - PuzzleHintInput - The input type for the getPuzzleHint function.
 * - PuzzleHintOutput - The return type for the getPuzzleHint function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PuzzleHintInputSchema = z.object({
  riddle: z.string().describe('The riddle for which a hint is needed.'),
});
export type PuzzleHintInput = z.infer<typeof PuzzleHintInputSchema>;

const PuzzleHintOutputSchema = z.object({
  hint: z.string().describe('A single, cryptic hint that helps solve the riddle without giving away the answer.'),
});
export type PuzzleHintOutput = z.infer<typeof PuzzleHintOutputSchema>;

export async function getPuzzleHint(input: PuzzleHintInput): Promise<PuzzleHintOutput> {
  return puzzleHintFlow(input);
}

const prompt = ai.definePrompt({
  name: 'puzzleHintPrompt',
  input: { schema: PuzzleHintInputSchema },
  output: { schema: PuzzleHintOutputSchema },
  prompt: `You are a master of riddles. A user is stuck on a puzzle and needs a hint.
Your task is to provide a single, clever hint for the following riddle.

The hint must NOT contain the answer. It should guide the user's thinking in the right direction. Make it short and cryptic.

Riddle: "{{{riddle}}}"
`,
});

const puzzleHintFlow = ai.defineFlow(
  {
    name: 'puzzleHintFlow',
    inputSchema: PuzzleHintInputSchema,
    outputSchema: PuzzleHintOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
