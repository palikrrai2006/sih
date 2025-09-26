"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { studentProgressData } from "@/lib/data"
import { Progress } from "@/components/ui/progress"

const engagementData = studentProgressData.map(s => ({
  name: s.studentName.split(' ')[0],
  engagement: s.engagement,
}));

export default function TeacherDashboard() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Student Engagement</CardTitle>
            <CardDescription>
              Weekly engagement levels across your class.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={engagementData}>
                <XAxis
                  dataKey="name"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--accent) / 0.3)' }}
                  contentStyle={{ 
                    background: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: 'var(--radius)'
                  }}
                />
                <Bar dataKey="engagement" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle>Top Performing Students</CardTitle>
             <CardDescription>Students with the highest average scores.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentProgressData
                .sort((a,b) => b.averageScore - a.averageScore)
                .slice(0,5)
                .map(student => (
                  <div key={student.studentId} className="flex items-center">
                     <Avatar className="h-9 w-9">
                      <AvatarImage src={student.studentAvatar} alt={student.studentName} />
                      <AvatarFallback>{student.studentName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{student.studentName}</p>
                      <p className="text-sm text-muted-foreground">{student.lessonsCompleted} lessons</p>
                    </div>
                    <div className="ml-auto font-medium">{student.averageScore}%</div>
                  </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="xl:col-span-3">
        <CardHeader>
          <CardTitle>Student Progress Overview</CardTitle>
          <CardDescription>Detailed progress for all students.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead className="text-right">Avg. Score</TableHead>
                <TableHead className="hidden md:table-cell text-right">Lessons Done</TableHead>
                <TableHead className="hidden md:table-cell text-right">Quizzes Taken</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentProgressData.map((s) => (
                <TableRow key={s.studentId}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                       <Avatar className="h-8 w-8">
                        <AvatarImage src={s.studentAvatar} alt={s.studentName} />
                        <AvatarFallback>{s.studentName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{s.studentName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={s.engagement} className="h-2 w-24" />
                      <span>{s.engagement}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold">{s.averageScore}%</TableCell>
                  <TableCell className="hidden md:table-cell text-right">{s.lessonsCompleted}</TableCell>
                  <TableCell className="hidden md:table-cell text-right">{s.quizzesTaken}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
