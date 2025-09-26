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
import { ArrowRight } from "lucide-react";

export default function LessonsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const role = searchParams.role;
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Lessons</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {lessons.map((lesson) => (
          <Card key={lesson.id} className="flex flex-col">
            <CardHeader className="flex-row gap-4 items-center">
              <div className="p-3 bg-primary/10 rounded-lg">
                <lesson.icon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle>{lesson.title}</CardTitle>
                <CardDescription>{lesson.subject}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">
                {lesson.description}
              </p>
            </CardContent>
            <CardFooter>
              <Link href={`/lessons/${lesson.id}?role=${role}`} className="w-full">
                <Button className="w-full">
                  Start Lesson
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
