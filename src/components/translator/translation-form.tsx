
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { translateContent, TranslateContentOutput } from "@/ai/flows/multilingual-content-translation";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Languages, Loader2, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const languages = ["Hindi", "Tamil", "Bengali", "Marathi", "Telugu", "Gujarati", "Kannada", "Punjabi", "Odia"];

const formSchema = z.object({
  text: z.string().min(10, { message: "Please enter at least 10 characters." }),
  targetLanguage: z.string({ required_error: "Please select a language." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function TranslationForm() {
  const [translationResult, setTranslationResult] = useState<TranslateContentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setTranslationResult(null);
    try {
      const result = await translateContent(values);
      setTranslationResult(result);
    } catch (error) {
      console.error("Translation failed:", error);
      toast({
        variant: "destructive",
        title: "Translation Error",
        description: "An error occurred while translating the content. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            Translation Input
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text to Translate</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter the educational content here..."
                        rows={8}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetLanguage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Language</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang} value={lang}>
                            {lang}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Translating...
                  </>
                ) : (
                  "Translate & Verify"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Result</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin mb-4" />
              <p>Translating and analyzing content...</p>
            </div>
          )}

          {!isLoading && !translationResult && (
             <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                <p>Your translation results will appear here.</p>
            </div>
          )}

          {translationResult && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h3 className="font-semibold mb-2">Translated Text</h3>
                <p className="p-4 bg-muted rounded-md border text-sm">
                  {translationResult.translatedText}
                </p>
              </div>
              <div>
                 <h3 className="font-semibold mb-2">Appropriateness Check</h3>
                <div className={`p-4 rounded-md border ${translationResult.isAppropriate ? 'bg-green-100/50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-yellow-100/50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800'}`}>
                    <div className="flex items-center gap-2 mb-2">
                        {translationResult.isAppropriate ? (
                            <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                                <CheckCircle2 className="mr-1 h-4 w-4"/>
                                Appropriate
                            </Badge>
                        ) : (
                             <Badge variant="destructive" className="bg-yellow-500 hover:bg-yellow-600">
                                <AlertTriangle className="mr-1 h-4 w-4"/>
                                Caution Advised
                            </Badge>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                    {translationResult.appropriatenessExplanation}
                    </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
