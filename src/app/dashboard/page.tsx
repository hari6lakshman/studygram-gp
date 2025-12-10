'use client';

import { useRouter } from 'next/navigation';
import { useIsClient } from '@/hooks/use-is-client';
import { useEffect } from 'react';
import { AppContainer } from '@/components/layout/app-container';
import { SUBJECTS } from '@/lib/constants';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const router = useRouter();
  const isClient = useIsClient();
  
  useEffect(() => {
    if (isClient && !localStorage.getItem('aura-learning-last-email')) {
      router.push('/');
    }
  }, [isClient, router]);
  
  if (!isClient) {
    return (
      <AppContainer>
        <div className="p-8">
          <Skeleton className="h-10 w-1/2 mx-auto mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-28" />)}
          </div>
        </div>
      </AppContainer>
    )
  }

  return (
    <AppContainer>
      <div className="p-8">
        <h2 className="font-headline text-3xl text-center mb-2">Choose a Subject</h2>
        <p className="text-muted-foreground text-center mb-8">Select a subject to start your learning journey.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUBJECTS.map((subject) => (
            <Link key={subject.name} href={`/topics/${subject.name.toLowerCase()}`} passHref>
              <Card className="h-full transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-1 bg-card/50 hover:bg-card cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <subject.icon className="h-10 w-10 text-primary" />
                    <div>
                      <CardTitle className="font-headline text-2xl">{subject.name}</CardTitle>
                      <CardDescription>Explore topics in {subject.name}.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AppContainer>
  );
}
