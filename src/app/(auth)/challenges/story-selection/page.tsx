
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const storyTopics = [
  {
    id: 'space-odyssey',
    title: 'Space Odyssey',
    description: 'Captain a starship and explore the mysteries of a new galaxy.',
    imageUrl: 'https://picsum.photos/seed/space/600/400',
    imageHint: 'galaxy stars'
  },
  {
    id: 'deep-sea-mystery',
    title: 'Deep Sea Mystery',
    description: 'Dive into the abyss to uncover ancient secrets and strange creatures.',
    imageUrl: 'https://picsum.photos/seed/deepsea/600/400',
    imageHint: 'underwater trench'
  },
  {
    id: 'jungle-expedition',
    title: 'Jungle Expedition',
    description: 'Navigate a dense jungle to find a lost city of gold, avoiding traps along the way.',
    imageUrl: 'https://picsum.photos/seed/jungle/600/400',
    imageHint: 'jungle ruins'
  },
  {
    id: 'cyber-heist',
    title: 'The Cyber Heist',
    description: 'As a master hacker, infiltrate secure servers to expose a corporate conspiracy.',
    imageUrl: 'https://picsum.photos/seed/cyber/600/400',
    imageHint: 'digital code'
  },
];

export default function StorySelectionPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const role = searchParams.role;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Choose Your Adventure</h2>
      </div>
      <p className="text-muted-foreground">Select a story topic to begin your interactive challenge.</p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {storyTopics.map((topic) => (
          <Link href={`/challenges/story/${topic.id}?role=${role}`} key={topic.id} className="group">
            <Card className="overflow-hidden h-full flex flex-col transition-all group-hover:border-primary group-hover:shadow-lg">
              <div className="relative h-48 w-full">
                <Image
                  src={topic.imageUrl}
                  alt={topic.title}
                  data-ai-hint={topic.imageHint}
                  fill
                  className="object-cover"
                />
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              </div>
              <CardHeader>
                <CardTitle>{topic.title}</CardTitle>
                <CardDescription>{topic.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex items-end justify-end">
                  <ArrowRight className="h-6 w-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
