
"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { lessons } from "@/lib/data";
import { useQuizStore } from "@/lib/quiz-store";
import { ArrowRight, Trophy, PlusCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function QuizzesPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  const { quizzes } = useQuizStore();

  const filteredQuizzes = role === 'teacher' ? quizzes.filter(q => !q.id.startsWith('q-')) : quizzes;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Quizzes</h2>
        {role === 'teacher' && (
          <Button asChild>
            <Link href={`/quizzes/create?role=teacher`}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Quiz
            </Link>
          </Button>
        )}
      </div>

      {quizzes.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {quizzes.map((quiz) => {
            const lesson = lessons.find(l => l.id === quiz.lessonId);
            return (
              <Card key={quiz.id} className="flex flex-col">
                <CardHeader>
                  {lesson && <CardDescription>{lesson.title}</CardDescription>}
                  <CardTitle>{quiz.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Trophy className="h-5 w-5 text-accent-foreground" />
                      <span>Up to {quiz.points} points</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/quizzes/${quiz.id}?role=${role}`} className="w-full">
                    <Button className="w-full" variant="secondary">
                      Start Quiz
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
            <h3 className="text-xl font-semibold mb-2">No Quizzes Yet</h3>
            <p>
                {role === 'teacher' 
                    ? "You haven't created any quizzes. Click 'Create New Quiz' to get started."
                    : "There are no quizzes available at the moment. Please check back later."}
            </p>
        </div>
      )}
    </div>
  );
}

