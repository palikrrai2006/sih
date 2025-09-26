import { notFound } from "next/navigation";
import { lessons } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function LessonDetailPage({
  params,
  searchParams,
}: {
  params: { lessonId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const lesson = lessons.find((l) => l.id === params.lessonId);
  const role = searchParams.role;

  if (!lesson) {
    notFound();
  }

  const quizId = `q-${lesson.id}`;

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
            <h2 className="text-3xl font-bold tracking-tight font-headline">
            {lesson.title}
            </h2>
            <p className="text-muted-foreground">{lesson.subject}</p>
        </div>
         <Link href={`/quizzes/${quizId}?role=${role}`}>
            <Button>Take Quiz</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lesson Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <p>{lesson.description}</p>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Introduction to Forces</AccordionTrigger>
                <AccordionContent>
                  Force is any interaction that, when unopposed, will change the motion of an object. A force can cause an object with mass to change its velocity (which includes to begin moving from a state of rest), i.e., to accelerate. Force can also be described intuitively as a push or a pull. A force has both magnitude and direction, making it a vector quantity.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Newton's Laws of Motion</AccordionTrigger>
                <AccordionContent>
                  Newton's laws of motion are three basic laws of classical mechanics that describe the relationship between the motion of an object and the forces acting on it. These laws can be paraphrased as follows: a body remains at rest, or in uniform motion in a straight line, unless acted upon by a force; the rate of change of momentum of a body is directly proportional to the force applied; and for every action, there is an equal and opposite reaction.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Friction</AccordionTrigger>
                <AccordionContent>
                  Friction is the force resisting the relative motion of solid surfaces, fluid layers, and material elements sliding against each other. There are several types of friction: Dry friction is a force that opposes the relative lateral motion of two solid surfaces in contact. Fluid friction describes the friction between layers of a viscous fluid that are moving relative to each other.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>

        <div className="flex justify-end">
            <Button size="lg" variant="secondary">
                <CheckCircle className="mr-2 h-5 w-5" />
                Mark as Complete
            </Button>
        </div>
    </div>
  );
}
