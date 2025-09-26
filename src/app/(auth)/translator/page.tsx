import TranslationForm from "@/components/translator/translation-form";

export default function TranslatorPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          Multilingual Content Translator
        </h2>
        <p className="text-muted-foreground">
          Translate educational content and verify its appropriateness for students.
        </p>
      </div>
      <TranslationForm />
    </div>
  );
}
