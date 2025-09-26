import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { badges, leaderboardData } from "@/lib/data";

export default function RewardsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Rewards & Leaderboard</h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Leaderboard</CardTitle>
                    <CardDescription>See where you stand among all learners.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">Rank</TableHead>
                            <TableHead>Student</TableHead>
                            <TableHead className="text-right">Points</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {leaderboardData.map((student) => (
                            <TableRow key={student.id}>
                            <TableCell className="font-bold text-lg text-muted-foreground">{student.rank}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={student.avatarUrl} alt={student.name} />
                                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{student.name}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-right font-bold text-lg">{student.points.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Your Badges</CardTitle>
                    <CardDescription>All your hard-earned achievements.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-y-6">
                {badges.map((badge) => (
                    <div key={badge.id} className="flex flex-col items-center text-center gap-2 animate-in fade-in zoom-in-95">
                        <Image
                            src={badge.imageUrl}
                            alt={badge.name}
                            data-ai-hint={badge.imageHint}
                            width={100}
                            height={100}
                            className="rounded-full border-4 border-accent shadow-md hover:scale-105 transition-transform"
                        />
                        <div className="flex flex-col">
                            <span className="font-semibold">{badge.name}</span>
                            <span className="text-xs text-muted-foreground">{badge.description}</span>
                        </div>
                    </div>
                ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
