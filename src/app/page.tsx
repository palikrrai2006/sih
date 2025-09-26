
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FlaskConical } from 'lucide-react';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 2000); // 2-second delay before redirecting

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
        <div className="flex items-center gap-4 animate-pulse">
            <FlaskConical className="h-16 w-16 text-primary" />
            <h1 className="text-5xl font-bold font-headline text-primary">
                STEM Quest
            </h1>
        </div>
        <p className="mt-4 text-muted-foreground">Loading your learning adventure...</p>
    </div>
  );
}
