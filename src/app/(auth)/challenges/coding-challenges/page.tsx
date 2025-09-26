
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Puzzle } from "lucide-react";

export default function CodingChallengesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Coding Challenges</h2>
      </div>
      <p className="text-muted-foreground">
        Test your coding skills. More challenges coming soon!
      </p>

      <Card>
        <CardHeader>
            <CardTitle>Coming Soon!</CardTitle>
            <CardDescription>Interactive coding challenges are on the way.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
            <Puzzle className="h-16 w-16 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Challenges in the Pipeline</h3>
            <p>We're building fun, block-based coding problems for you to tackle. Stay tuned!</p>
        </CardContent>
      </Card>
    </div>
  );
}
