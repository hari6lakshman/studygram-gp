'use client';

import { useRouter } from 'next/navigation';
import { useIsClient } from '@/hooks/use-is-client';
import { useEffect, useState } from 'react';
import { AppContainer } from '@/components/layout/app-container';
import { SUBJECTS } from '@/lib/constants';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import type { UserData } from '@/lib/types';

export default function DashboardPage() {
  const router = useRouter();
  const isClient = useIsClient();
  const [userName, setUserName] = useState<string | null>(null);
  
  useEffect(() => {
    if (isClient) {
      const email = localStorage.getItem('aura-last-email');
      if (!email) {
        router.push('/');
      } else {
        const userKey = `aura-user-${email}`;
        const userDataString = localStorage.getItem(userKey);
        if (userDataString) {
          const userData: UserData = JSON.parse(userDataString);
          setUserName(userData.name);
        }
      }
    }
  }, [isClient, router]);
  
  if (!isClient || !userName) {
    return (
      <AppContainer>
        <div className="p-8">
          <Skeleton className="h-10 w-1/2 mx-auto mb-2" />
          <Skeleton className="h-6 w-1/3 mx-auto mb-8" />
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
        <h1 className="font-headline text-4xl text-center text-primary mb-2">Hi, {userName}!</h1>
        <h2 className="font-headline text-3xl text-center mb-2">Pick a Subject</h2>
        <p className="text-muted-foreground text-center mb-8">Select a subject to start.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUBJECTS.map((subject) => (
            <Link key={subject.name} href={`/topics/${subject.name.toLowerCase()}`} passHref>
              <Card className="h-full transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-1 bg-card/50 hover:bg-card cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <subject.icon className="h-10 w-10 text-primary" />
                    <div>
                      <CardTitle className="font-headline text-2xl">{subject.name}</CardTitle>
                      <CardDescription>Explore {subject.name}.</CardDescription>
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
