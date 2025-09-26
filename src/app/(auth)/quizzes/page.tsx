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
import { quizzes, lessons } from "@/lib/data";
import { ArrowRight, Trophy } from "lucide-react";

export default function QuizzesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const role = searchParams.role;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Quizzes</h2>
      </div>

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
    </div>
  );
}
