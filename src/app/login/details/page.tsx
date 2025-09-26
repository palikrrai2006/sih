
"use client";

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User as UserIcon } from 'lucide-react';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images.json';

export default function LoginDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userId, setUserId] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  
  const heroImage = placeholderImages.find(p => p.id === "hero-image-1");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) {
      setError('Please enter your User ID.');
      return;
    }
    setError('');
    const params = new URLSearchParams(searchParams.toString());
    params.set('userId', userId);
    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold font-headline text-primary">STEM Quest</h1>
            <p className="text-balance text-muted-foreground">
              Enter your ID to continue
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Enter Details</CardTitle>
              <CardDescription>Please enter your User ID to log in.</CardDescription>
            </CardHeader>
            <CardContent>
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
                {error && <p className="text-sm font-medium text-destructive">{error}</p>}
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt="Students learning STEM"
            data-ai-hint={heroImage.imageHint}
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.4]"
          />
        )}
      </div>
    </div>
  );
}