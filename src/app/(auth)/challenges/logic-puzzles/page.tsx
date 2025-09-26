
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Brain } from "lucide-react";

export default function LogicPuzzlesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Logic Puzzles</h2>
      </div>
      <p className="text-muted-foreground">
        Challenge your mind with these puzzles. More coming soon!
      </p>

      <Card>
        <CardHeader>
            <CardTitle>Coming Soon!</CardTitle>
            <CardDescription>Interactive logic puzzles are being developed.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
            <Brain className="h-16 w-16 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Puzzles Under Construction</h3>
            <p>We're busy creating new and exciting logic puzzles for you to solve. Please check back later!</p>
        </CardContent>
      </Card>
    </div>
  );
}
