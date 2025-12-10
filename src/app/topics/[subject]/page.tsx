'use client';

import { useParams, useRouter } from 'next/navigation';
import { useIsClient } from '@/hooks/use-is-client';
import { useUserData } from '@/hooks/use-user-data';
import { useEffect, useState } from 'react';
import { AppContainer } from '@/components/layout/app-container';
import { SUBJECTS } from '@/lib/constants';
import type { Subject, Topic } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
      />
    ))}
  </div>
);

export default function TopicSelectionPage() {
  const router = useRouter();
  const params = useParams();
  const isClient = useIsClient();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (isClient) {
        const storedEmail = localStorage.getItem('aura-learning-last-email');
        if (!storedEmail) {
            router.push('/');
        } else {
            setEmail(storedEmail);
        }
    }
  }, [isClient, router]);

  const { userData } = useUserData(email);

  const subjectName = params.subject as string;
  const subject: Subject | undefined = SUBJECTS.find(s => s.name.toLowerCase() === subjectName);

  if (!isClient || !userData || !subject) {
    return (
        <AppContainer>
            <div className="p-8 space-y-6">
                <Skeleton className="h-12 w-1/2" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
            </div>
        </AppContainer>
    );
  }
  
  const SubjectIcon = subject.icon;

  return (
    <AppContainer>
      <div className="p-8">
        <div className="flex items-center gap-4 mb-8">
            <SubjectIcon className="h-12 w-12 text-primary"/>
            <h2 className="font-headline text-4xl">{subject.name}</h2>
        </div>
        <div className="space-y-4">
          {subject.topics.map((topic: Topic) => {
            const progress = userData.progress[topic.id];
            return (
              <Card key={topic.id} className="bg-card/50">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="font-headline text-2xl">{topic.title}</CardTitle>
                      <CardDescription>{topic.description}</CardDescription>
                    </div>
                    {progress?.completed && <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 p-2"><CheckCircle2 className="h-5 w-5" /></Badge>}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <span className="font-semibold">High Score:</span>
                        <span>{progress?.highScore ?? 0}/5</span>
                    </div>
                    <StarRating rating={progress?.starRating ?? 0} />
                </CardContent>
                <CardFooter>
                    <Link href={`/quiz/${subject.name.toLowerCase()}/${topic.id}`} className="w-full">
                        <Button className="w-full">{progress?.completed ? 'Retake Quiz' : 'Start Quiz'}</Button>
                    </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        <Button variant="outline" onClick={() => router.push('/dashboard')} className="mt-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Subjects
        </Button>
      </div>
    </AppContainer>
  );
}
