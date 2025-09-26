
"use client";

import { useState, useEffect, use } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';
import { generateStory, StoryInput, StoryOutput } from '@/ai/flows/story-challenge-flow';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const storyMetadata: Record<string, { title: string, imageUrl: string, imageHint: string }> = {
    "space-odyssey": {
        title: "Space Odyssey",
        imageUrl: "https://picsum.photos/seed/space-bg/1200/800",
        imageHint: "nebula galaxy"
    },
    "deep-sea-mystery": {
        title: "Deep Sea Mystery",
        imageUrl: "https://picsum.photos/seed/deepsea-bg/1200/800",
        imageHint: "deep ocean"
    },
    "jungle-expedition": {
        title: "Jungle Expedition",
        imageUrl: "https://picsum.photos/seed/jungle-bg/1200/800",
        imageHint: "jungle canopy"
    },
    "cyber-heist": {
        title: "The Cyber Heist",
        imageUrl: "https://picsum.photos/seed/cyber-bg/1200/800",
        imageHint: "binary code"
    }
}

export default function StoryPage({ params }: { params: { storyId: string } }) {
    const [storyState, setStoryState] = useState<StoryOutput | null>(null);
    const [history, setHistory] = useState<StoryOutput[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const metadata = storyMetadata[params.storyId] || { title: "Adventure", imageUrl: "https://picsum.photos/seed/default-bg/1200/800", imageHint: "fantasy landscape"};

    useEffect(() => {
        async function startStory() {
            setIsLoading(true);
            const input: StoryInput = {
                topic: metadata.title,
                path: [],
            };
            const result = await generateStory(input);
            setStoryState(result);
            setHistory([result]);
            setIsLoading(false);
        }
        startStory();
    }, [params.storyId, metadata.title]);

    const handleChoice = async (choice: string) => {
        setIsLoading(true);
        const currentPath = history.map(h => h.choiceMade).filter(Boolean) as string[];
        const input: StoryInput = {
            topic: metadata.title,
            path: [...currentPath, choice],
        };
        const result = await generateStory(input);
        
        const updatedChoice = { ...storyState!, choiceMade: choice };

        setHistory(prev => [...prev.slice(0, -1), updatedChoice, result]);
        setStoryState(result);
        setIsLoading(false);
    };

    return (
        <div className="relative flex-1">
            <Image 
                src={metadata.imageUrl} 
                alt={metadata.title}
                data-ai-hint={metadata.imageHint} 
                fill 
                className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative flex flex-col h-full items-center justify-center p-4 md:p-8">
                 <Card className="w-full max-w-2xl bg-background/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="font-headline text-3xl">{metadata.title}</CardTitle>
                        <CardDescription>An Interactive AI-Powered Story</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {isLoading && !storyState ? (
                            <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
                                <Loader2 className="h-8 w-8 animate-spin mb-4" />
                                <p>Generating your story...</p>
                            </div>
                        ) : storyState && (
                            <div className="space-y-4 animate-in fade-in">
                                <p className="text-lg leading-relaxed">{storyState.storySegment}</p>
                                {storyState.isEnding ? (
                                    <Badge className='bg-yellow-500'>The End</Badge>
                                ) : (
                                    <h3 className="font-semibold text-xl">What do you do next?</h3>
                                )}
                            </div>
                        )}
                    </CardContent>
                    {!storyState?.isEnding && (
                    <CardFooter className="flex flex-col md:flex-row gap-4">
                        {isLoading && storyState ? (
                             <div className="flex items-center justify-center w-full text-muted-foreground">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                AI is thinking...
                            </div>
                        ): storyState?.choices.map((choice, index) => (
                            <Button key={index} onClick={() => handleChoice(choice)} className="w-full" variant="secondary" disabled={isLoading}>
                                {choice}
                            </Button>
                        ))}
                    </CardFooter>
                    )}
                 </Card>
            </div>
        </div>
    );
}

