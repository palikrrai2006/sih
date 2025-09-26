
"use client";

import { notFound } from "next/navigation";
import { lessons } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const lessonContent = {
    "phy-1": [
        {
            title: "Introduction to Forces",
            content: "Force is any interaction that, when unopposed, will change the motion of an object. A force can cause an object with mass to change its velocity (which includes to begin moving from a state of rest), i.e., to accelerate. Force can also be described intuitively as a push or a pull. A force has both magnitude and direction, making it a vector quantity."
        },
        {
            title: "Newton's Laws of Motion",
            content: "Newton's laws of motion are three basic laws of classical mechanics that describe the relationship between the motion of an object and the forces acting on it. These laws can be paraphrased as follows: a body remains at rest, or in uniform motion in a straight line, unless acted upon by a force; the rate of change of momentum of a body is directly proportional to the force applied; and for every action, there is an equal and opposite reaction."
        },
        {
            title: "Friction",
            content: "Friction is the force resisting the relative motion of solid surfaces, fluid layers, and material elements sliding against each other. There are several types of friction: Dry friction is a force that opposes the relative lateral motion of two solid surfaces in contact. Fluid friction describes the friction between layers of a viscous fluid that are moving relative to each other."
        }
    ]
};

export default function LessonDetailPage({
  params,
  searchParams,
}: {
  params: { lessonId: "phy-1" };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const lesson = lessons.find((l) => l.id === params.lessonId);
  const role = searchParams.role;

  if (!lesson) {
    notFound();
  }

  const content = lessonContent[params.lessonId] || [];
  const quizId = `q-${lesson.id}`;

  const handleDownload = () => {
    let textContent = `${lesson.title}\n`;
    textContent += `Subject: ${lesson.subject}\n\n`;
    textContent += `${lesson.description}\n\n`;
    textContent += "--------------------------------------\n\n";

    content.forEach(item => {
        textContent += `${item.title}\n`;
        textContent += `${item.content}\n\n`;
    });

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${lesson.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
            <h2 className="text-3xl font-bold tracking-tight font-headline">
            {lesson.title}
            </h2>
            <p className="text-muted-foreground">{lesson.subject}</p>
        </div>
         <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Link href={`/quizzes/${quizId}?role=${role}`}>
                <Button>Take Quiz</Button>
            </Link>
         </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lesson Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <p>{lesson.description}</p>
            <Accordion type="single" collapsible className="w-full">
              {content.map((item, index) => (
                <AccordionItem value={`item-${index + 1}`} key={index}>
                    <AccordionTrigger>{item.title}</AccordionTrigger>
                    <AccordionContent>
                        {item.content}
                    </AccordionContent>
                </AccordionItem>
              ))}
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
