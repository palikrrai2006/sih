"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Role } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  GraduationCap,
  Shield,
  User as UserIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

export function LoginForm() {
  const router = useRouter();
  const [role, setRole] = React.useState<Role>('student');
  const [grade, setGrade] = React.useState<string>('');
  const [userId, setUserId] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) {
        setError('Please enter your User ID.');
        return;
    }
    if (role === 'student' && !grade) {
        setError('Please select a class to continue.');
        return;
    }
    setError('');
    const params = new URLSearchParams({ role, userId });
    if (role === 'student' && grade) {
        params.set('grade', grade);
    }
    router.push(`/dashboard?${params.toString()}`);
  };

  const handleRoleChange = (value: string) => {
    setRole(value as Role);
    setError('');
    if (value !== 'student') {
        setGrade('');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
       <div className="grid gap-2">
          <Label htmlFor="userId" className='flex items-center gap-2'><UserIcon className='h-4 w-4' /> User ID</Label>
          <Input 
            id="userId" 
            type="text" 
            placeholder="Enter your ID" 
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required 
          />
        </div>

      <RadioGroup value={role} onValueChange={handleRoleChange} className="grid gap-4">
        <Label
          htmlFor="student"
          className="flex flex-row items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
        >
          <div className="flex items-center space-x-3">
             <GraduationCap className="h-5 w-5" />
             <span className="font-semibold">Student</span>
          </div>
          <RadioGroupItem value="student" id="student" />
        </Label>
        <Label
          htmlFor="teacher"
          className="flex flex-row items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
        >
          <div className="flex items-center space-x-3">
             <Users className="h-5 w-5" />
             <span className="font-semibold">Teacher</span>
          </div>
          <RadioGroupItem value="teacher" id="teacher" />
        </Label>
        <Label
          htmlFor="admin"
          className="flex flex-row items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
        >
          <div className="flex items-center space-x-3">
             <Shield className="h-5 w-5" />
             <span className="font-semibold">Administrator</span>
          </div>
          <RadioGroupItem value="admin" id="admin" />
        </Label>
      </RadioGroup>

        <div className={cn("grid gap-2 transition-all duration-300", role === 'student' ? "h-auto opacity-100" : "h-0 opacity-0 overflow-hidden")}>
             <Label htmlFor="grade">Class</Label>
            <Select onValueChange={setGrade} value={grade}>
                <SelectTrigger id="grade">
                    <SelectValue placeholder="Select your class" />
                </SelectTrigger>
                <SelectContent>
                    {Array.from({ length: 7 }, (_, i) => 6 + i).map((g) => (
                        <SelectItem key={g} value={g.toString()}>
                            Class {g}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}

      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
}
