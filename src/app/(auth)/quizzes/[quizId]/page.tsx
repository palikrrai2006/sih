
"use client"

import { notFound, useRouter } from "next/navigation";
import { quizzes, lessons } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowLeft } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function QuizPage({ params }: { params: { quizId: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const quiz = quizzes.find((q) => q.id === params.quizId);
  const lesson = quiz ? lessons.find(l => l.id === quiz.lessonId) : undefined;
  
  const [answers, setAnswers] = useState<Record<string, string>>({});

  if (!quiz) {
    notFound();
  }

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    let score = 0;
    quiz.questions.forEach(q => {
        if(answers[q.id] === q.correctAnswer) {
            score++;
        }
    })
    const totalQuestions = quiz.questions.length;
    const percentage = (score / totalQuestions) * 100;

    toast({
        title: "Quiz Submitted!",
        description: `You scored ${score} out of ${totalQuestions} (${percentage.toFixed(0)}%). Keep up the great work!`,
    });
    router.push(`/rewards`);
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
       <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Quizzes
            </Button>
            <div className="flex items-center gap-2 text-lg font-semibold text-accent-foreground">
                <Trophy className="h-6 w-6 text-yellow-500" />
                <span>{quiz.points} Points</span>
            </div>
      </div>
      
      <Card>
        <CardHeader>
          {lesson && <CardDescription>From: {lesson.title}</CardDescription>}
          <CardTitle className="text-3xl font-bold tracking-tight font-headline">{quiz.title}</CardTitle>
        </CardHeader>
      </Card>

      <div className="space-y-6">
        {quiz.questions.map((question, index) => (
            <Card key={question.id}>
                <CardHeader>
                    <CardTitle>Question {index + 1}</CardTitle>
                    <CardDescription className="text-lg pt-2">{question.text}</CardDescription>
                </CardHeader>
                <CardContent>
                    <RadioGroup 
                        onValueChange={(value) => handleAnswerChange(question.id, value)}
                        value={answers[question.id]}
                    >
                        {question.options.map((option) => (
                            <Label key={option} className="flex items-center space-x-3 p-4 border rounded-md hover:bg-muted cursor-pointer">
                                <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                                <span className="text-base">{option}</span>
                            </Label>
                        ))}
                    </RadioGroup>
                </CardContent>
            </Card>
        ))}
      </div>

       <CardFooter className="px-0">
            <Button size="lg" className="w-full" onClick={handleSubmit}>
                Submit Quiz & Claim Rewards
            </Button>
      </CardFooter>
    </div>
  );
}
