
"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, Lightbulb, Loader2 } from "lucide-react";
import { getPuzzleHint } from "@/ai/flows/puzzle-hint-flow";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const puzzle = {
  id: "riddle-1",
  title: "The River Crossing",
  riddle: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
  answer: "A map",
  points: 50,
};

export default function LogicPuzzlesPage() {
  const { toast } = useToast();
  const [answer, setAnswer] = useState("");
  const [hint, setHint] = useState("");
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [feedback, setFeedback] = useState<{type: 'success' | 'error', message: string} | null>(null);

  const handleHint = async () => {
    setIsHintLoading(true);
    setHint("");
    try {
      const result = await getPuzzleHint({ riddle: puzzle.riddle });
      setHint(result.hint);
    } catch (error) {
      console.error("Failed to get hint:", error);
      toast({
        variant: "destructive",
        title: "Hint Error",
        description: "Could not fetch a hint at this time. Please try again.",
      });
    } finally {
      setIsHintLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim().toLowerCase() === puzzle.answer.toLowerCase()) {
      setFeedback({type: 'success', message: `Correct! You've earned ${puzzle.points} points.`});
      toast({
        title: "Puzzle Solved!",
        description: `You earned ${puzzle.points} points.`,
      });
    } else {
      setFeedback({type: 'error', message: "Not quite. Try thinking from a different perspective!"});
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Logic Puzzles</h2>
      </div>
      <p className="text-muted-foreground">
        Challenge your mind and earn points!
      </p>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="text-primary" />
            {puzzle.title}
          </CardTitle>
          <CardDescription>Solve the riddle below to earn {puzzle.points} points.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <p className="text-lg text-center font-medium p-4 bg-muted rounded-lg">
              "{puzzle.riddle}"
            </p>

            {feedback && (
                 <Alert variant={feedback.type === 'error' ? 'destructive' : 'default'} className={feedback.type === 'success' ? 'bg-green-100/80 border-green-300 dark:bg-green-900/30 dark:border-green-700' : ''}>
                    <AlertTitle>{feedback.type === 'success' ? 'Success!' : 'Try Again'}</AlertTitle>
                    <AlertDescription>{feedback.message}</AlertDescription>
                </Alert>
            )}
           
            <div className="space-y-2">
              <Label htmlFor="answer">Your Answer</Label>
              <Input
                id="answer"
                placeholder="Type your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={feedback?.type === 'success'}
              />
            </div>
            
            {hint && (
              <Alert variant="default" className="bg-yellow-100/80 border-yellow-300 dark:bg-yellow-900/30 dark:border-yellow-700">
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Hint</AlertTitle>
                <AlertDescription>{hint}</AlertDescription>
              </Alert>
            )}

          </CardContent>
          <CardFooter className="flex justify-between items-center gap-4">
            <Button type="button" variant="outline" onClick={handleHint} disabled={isHintLoading || !!hint || feedback?.type === 'success'}>
              {isHintLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Getting Hint...</>
              ) : (
                <><Lightbulb className="mr-2 h-4 w-4" /> Get a Hint</>
              )}
            </Button>
            <Button type="submit" disabled={feedback?.type === 'success'}>Submit Answer</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

