
"use client";

import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { users, classes } from "@/lib/data";
import { User } from "@/lib/types";

export default function ManageClassesPage() {
  const { toast } = useToast();
  const teachers = users.filter((u) => u.role === "teacher");
  const [teacherClasses, setTeacherClasses] = useState<Record<string, number[]>>(() => {
    const initialState: Record<string, number[]> = {};
    teachers.forEach(teacher => {
        initialState[teacher.id] = teacher.classIds || [];
    });
    return initialState;
  });

  const handleClassChange = (teacherId: string, classId: number, checked: boolean | "indeterminate") => {
    setTeacherClasses(prev => {
      const currentClasses = prev[teacherId] || [];
      if (checked) {
        return { ...prev, [teacherId]: [...currentClasses, classId] };
      } else {
        return { ...prev, [teacherId]: currentClasses.filter(id => id !== classId) };
      }
    });
  };

  const handleSaveChanges = () => {
    // Here you would typically save the changes to your backend.
    // For this example, we'll just show a toast notification.
    console.log("Saving changes:", teacherClasses);
    toast({
      title: "Changes Saved!",
      description: "Teacher class assignments have been updated.",
    });
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
            <h2 className="text-3xl font-bold tracking-tight font-headline">
            Manage Teacher Classes
            </h2>
            <p className="text-muted-foreground">
                Assign classes to each teacher to control their access.
            </p>
        </div>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </div>
      <Card>
        <CardContent className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher</TableHead>
                {classes.map(c => (
                    <TableHead key={c} className="text-center">Class {c}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={teacher.avatarUrl} alt={teacher.name} />
                        <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{teacher.name}</span>
                    </div>
                  </TableCell>
                  {classes.map(classId => (
                     <TableCell key={classId} className="text-center">
                        <Checkbox 
                            checked={(teacherClasses[teacher.id] || []).includes(classId)}
                            onCheckedChange={(checked) => handleClassChange(teacher.id, classId, checked)}
                            aria-label={`Assign Class ${classId} to ${teacher.name}`}
                        />
                     </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
