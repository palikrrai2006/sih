'use server';

/**
 * @fileOverview A multilingual content translation AI agent.
 *
 * - translateContent - A function that handles the content translation process.
 * - TranslateContentInput - The input type for the translateContent function.
 * - TranslateContentOutput - The return type for the translateContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateContentInputSchema = z.object({
  text: z.string().describe('The text to translate.'),
  targetLanguage: z.string().describe('The target language for translation (e.g., Hindi, Tamil).'),
});
export type TranslateContentInput = z.infer<typeof TranslateContentInputSchema>;

const TranslateContentOutputSchema = z.object({
  translatedText: z.string().describe('The translated text in the target language.'),
  isAppropriate: z.boolean().describe('Whether the translated content is appropriate for students.'),
  appropriatenessExplanation: z.string().describe('Explanation of why the translated content is appropriate or not.'),
});
export type TranslateContentOutput = z.infer<typeof TranslateContentOutputSchema>;

export async function translateContent(input: TranslateContentInput): Promise<TranslateContentOutput> {
  return translateContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateContentPrompt',
  input: {schema: TranslateContentInputSchema},
  output: {schema: TranslateContentOutputSchema},
  prompt: `You are a content translator specializing in translating educational content for students in rural schools in India. You must ensure that the translated content is accurate, culturally relevant, and appropriate for students in grades 6-12.

Translate the following text into {{{targetLanguage}}}:

{{{text}}}

After translating, evaluate the translated text for appropriateness. Consider cultural relevance, potential misunderstandings, and age-appropriateness. Explain your reasoning in the appropriatenessExplanation field. Set the isAppropriate boolean field to true if the content is appropriate, and false if it is not.
`,
});

const translateContentFlow = ai.defineFlow(
  {
    name: 'translateContentFlow',
    inputSchema: TranslateContentInputSchema,
    outputSchema: TranslateContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
