
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Code2, CheckCircle, XCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const challenge = {
  id: "code-1",
  title: "Variable Swap",
  question: "You have two variables, `a` and `b`. How do you swap their values without using a third variable?",
  codeSnippet: `let a = 5;
let b = 10;

// Your code here...

console.log(a); // Should be 10
console.log(b); // Should be 5`,
  options: [
    "a = b; b = a;",
    "[a, b] = [b, a];",
    "a = a + b; b = a - b; a = a - b;",
    "Both 2 and 3 are correct"
  ],
  correctAnswer: "Both 2 and 3 are correct",
  points: 75,
};

export default function CodingChallengesPage() {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [feedback, setFeedback] = useState<{type: 'success' | 'error', message: string} | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAnswer) {
      setFeedback({type: 'error', message: "Please select an answer."});
      return;
    }

    if (selectedAnswer === challenge.correctAnswer) {
      setFeedback({type: 'success', message: `Correct! You've earned ${challenge.points} points.`});
    } else {
      setFeedback({type: 'error', message: "Not quite. Think about how the values change with each operation."});
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Coding Challenges</h2>
      </div>
      <p className="text-muted-foreground">
        Test your coding skills and earn points!
      </p>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="text-primary" />
            {challenge.title}
          </CardTitle>
          <CardDescription>Solve the problem below to earn {challenge.points} points.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <p className="text-lg">
              {challenge.question}
            </p>
            <pre className="bg-muted p-4 rounded-lg text-sm font-code overflow-x-auto">
              <code>
                {challenge.codeSnippet}
              </code>
            </pre>
            
            {feedback && (
                 <Alert variant={feedback.type === 'error' ? 'destructive' : 'default'} className={feedback.type === 'success' ? 'bg-green-100/80 border-green-300 dark:bg-green-900/30 dark:border-green-700' : ''}>
                    <AlertTitle>{feedback.type === 'success' ? 'Success!' : 'Try Again'}</AlertTitle>
                    <AlertDescription>{feedback.message}</AlertDescription>
                </Alert>
            )}

            <RadioGroup 
                onValueChange={(value) => setSelectedAnswer(value)}
                value={selectedAnswer}
                disabled={feedback?.type === 'success'}
            >
                {challenge.options.map((option, index) => (
                    <Label key={index} className="flex items-center space-x-3 p-4 border rounded-md hover:bg-muted cursor-pointer has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-70">
                        <RadioGroupItem value={option} id={`option-${index}`} disabled={feedback?.type === 'success'} />
                        <span className="font-code text-sm">{option}</span>
                    </Label>
                ))}
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={feedback?.type === 'success'}>
              Submit Answer
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
