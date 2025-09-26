
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { lessons } from '@/lib/data';

const questionSchema = z.object({
  text: z.string().min(1, "Question text is required"),
  options: z.array(z.string().min(1, "Option text is required")).min(2, "At least two options are required"),
  correctAnswer: z.string().min(1, "Please select a correct answer"),
});

const quizSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  lessonId: z.string().min(1, 'Please select a lesson'),
  points: z.coerce.number().min(1, 'Points must be at least 1'),
  questions: z.array(questionSchema).min(1, "At least one question is required"),
});

type QuizFormValues = z.infer<typeof quizSchema>;

export default function CreateQuizPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: '',
      lessonId: '',
      points: 100,
      questions: [
        { text: '', options: ['', ''], correctAnswer: '' }
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const onSubmit = (data: QuizFormValues) => {
    console.log('New Quiz Data:', data);
    toast({
      title: "Quiz Created!",
      description: `The quiz "${data.title}" has been successfully created.`,
    });
    router.push('/quizzes?role=teacher');
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Create New Quiz</h2>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Quiz Details</CardTitle>
            <CardDescription>Fill in the basic information for your new quiz.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title">Quiz Title</Label>
                <Input id="title" {...form.register('title')} />
                {form.formState.errors.title && <p className="text-sm font-medium text-destructive">{form.formState.errors.title.message}</p>}
              </div>
              <Controller
                control={form.control}
                name="lessonId"
                render={({ field }) => (
                  <div>
                    <Label>Associated Lesson</Label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a lesson" />
                      </SelectTrigger>
                      <SelectContent>
                        {lessons.map(lesson => (
                          <SelectItem key={lesson.id} value={lesson.id}>{lesson.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.lessonId && <p className="text-sm font-medium text-destructive">{form.formState.errors.lessonId.message}</p>}
                  </div>
                )}
              />
              <div>
                <Label htmlFor="points">Points</Label>
                <Input id="points" type="number" {...form.register('points')} />
                {form.formState.errors.points && <p className="text-sm font-medium text-destructive">{form.formState.errors.points.message}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {fields.map((field, index) => (
          <Card key={field.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Question {index + 1}</CardTitle>
              <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} disabled={fields.length <= 1}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Question Text</Label>
                <Textarea {...form.register(`questions.${index}.text`)} />
                {form.formState.errors.questions?.[index]?.text && <p className="text-sm font-medium text-destructive">{form.formState.errors.questions?.[index]?.text?.message}</p>}
              </div>
              <div>
                <Label>Options</Label>
                <div className="space-y-2">
                  {[0,1,2,3].map(optionIndex => (
                    <Input key={optionIndex} {...form.register(`questions.${index}.options.${optionIndex}`)} placeholder={`Option ${optionIndex + 1}`} />
                  ))}
                </div>
                 {form.formState.errors.questions?.[index]?.options && <p className="text-sm font-medium text-destructive">Please provide at least two options.</p>}
              </div>
              <Controller
                control={form.control}
                name={`questions.${index}.correctAnswer`}
                render={({ field: controllerField }) => (
                  <div>
                    <Label>Correct Answer</Label>
                    <Select onValueChange={controllerField.onChange} defaultValue={controllerField.value}>
                       <SelectTrigger>
                        <SelectValue placeholder="Select the correct answer" />
                      </SelectTrigger>
                      <SelectContent>
                        {form.watch(`questions.${index}.options`).filter(o => o).map(option => (
                           <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.questions?.[index]?.correctAnswer && <p className="text-sm font-medium text-destructive">{form.formState.errors.questions?.[index]?.correctAnswer?.message}</p>}
                  </div>
                )}
              />
            </CardContent>
          </Card>
        ))}
        
        <Button type="button" variant="outline" onClick={() => append({ text: '', options: ['', ''], correctAnswer: '' })}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Question
        </Button>
        
        <div className="flex justify-end">
            <Button type="submit" size="lg">Save Quiz</Button>
        </div>
      </form>
    </div>
  );
}
