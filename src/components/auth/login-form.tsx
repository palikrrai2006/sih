"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Role } from '@/lib/types';
import {
  Users,
  GraduationCap,
  Shield,
} from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const [role, setRole] = React.useState<Role>('student');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/dashboard?role=${role}`);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <RadioGroup value={role} onValueChange={(value: string) => setRole(value as Role)} className="grid gap-4">
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
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
}
