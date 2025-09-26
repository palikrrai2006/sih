
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookImage, Brain, Puzzle } from 'lucide-react';

const challenges = [
  {
    id: 'interactive-story',
    title: 'Interactive Stories',
    description: 'Your choices shape the narrative. Embark on an adventure where you control the outcome.',
    icon: BookImage,
    href: '/challenges/story-selection',
    status: 'Ready to Play'
  },
  {
    id: 'logic-puzzles',
    title: 'Logic Puzzles',
    description: 'Sharpen your mind with a collection of brain-teasing logic puzzles and riddles.',
    icon: Brain,
    href: '#',
    status: 'Coming Soon'
  },
  {
    id: 'coding-challenges',
    title: 'Coding Challenges',
    description: 'Put your programming skills to the test with fun, block-based coding problems.',
    icon: Puzzle,
    href: '#',
    status: 'Coming Soon'
  },
];

export default function ChallengesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const role = searchParams.role;
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Challenges</h2>
      </div>
      <p className="text-muted-foreground">
        Test your knowledge and problem-solving skills with these interactive challenges.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className="flex flex-col">
            <CardHeader className="flex-row gap-4 items-center">
              <div className="p-3 bg-primary/10 rounded-lg">
                <challenge.icon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle>{challenge.title}</CardTitle>
                <CardDescription>{challenge.status}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">
                {challenge.description}
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" disabled={challenge.status !== 'Ready to Play'}>
                <Link href={`${challenge.href}?role=${role}`}>
                  Start Challenge
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
