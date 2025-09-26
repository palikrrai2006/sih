
'use server';
/**
 * @fileOverview An AI agent for generating interactive, choice-based stories.
 *
 * - generateStory - A function that creates a segment of a story based on a topic and user choices.
 * - StoryInput - The input type for the generateStory function.
 * - StoryOutput - The return type for the generateStory function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const StoryInputSchema = z.object({
  topic: z.string().describe('The overall theme or topic of the story (e.g., "Space Odyssey", "Deep Sea Mystery").'),
  path: z.array(z.string()).describe('An array of choices the user has made so far to reach the current story point.'),
});
export type StoryInput = z.infer<typeof StoryInputSchema>;

const StoryOutputSchema = z.object({
  storySegment: z.string().describe('The next segment of the story, written in the second person (e.g., "You open the door and see..."). This should be a single, engaging paragraph.'),
  choices: z.array(z.string()).min(2).max(3).describe('A list of 2 or 3 distinct choices for the user to make.'),
  isEnding: z.boolean().describe('Set to true if this segment is a conclusion to the story, otherwise false.'),
  choiceMade: z.string().optional().describe('The choice that led to this story segment. Not present for the initial segment.'),
});
export type StoryOutput = z.infer<typeof StoryOutputSchema>;

export async function generateStory(input: StoryInput): Promise<StoryOutput> {
  return storyChallengeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'storyChallengePrompt',
  input: { schema: StoryInputSchema },
  output: { schema: StoryOutputSchema },
  prompt: `You are an expert storyteller creating a fun, interactive, choice-based adventure for a student. The story should be engaging and educational, subtly incorporating elements related to science, technology, or history based on the topic.

The topic is: {{{topic}}}

The user has made the following choices so far:
{{#if path}}
  {{#each path}}
  - "{{this}}"
  {{/each}}
{{else}}
  This is the beginning of the story.
{{/if}}

Generate the next part of the story.
- Write the story segment from a second-person perspective ("You..."). It should be a single, descriptive paragraph.
- Provide 2 or 3 distinct and interesting choices for the user to make.
- If the story is just beginning (i.e., the path is empty), create an exciting opening.
- If the story has reached a natural conclusion after a few steps (3 to 5 steps is ideal), set isEnding to true and provide a concluding paragraph. In this case, the choices array can be empty, but it's better to provide one final choice like "Play again?".
- Ensure the choices are short and clear actions.
- Do not repeat previous story beats. Each step should introduce a new situation.
- The tone should be adventurous and suitable for a middle-school student.
`,
});

const storyChallengeFlow = ai.defineFlow(
  {
    name: 'storyChallengeFlow',
    inputSchema: StoryInputSchema,
    outputSchema: StoryOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
