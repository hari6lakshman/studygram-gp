'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { AppContainer } from '@/components/layout/app-container';
import { GraduationCap } from 'lucide-react';
import type { UserData } from '@/lib/types';

const loginSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<{name: string} | null>(null);

  useEffect(() => {
    setIsClient(true);
    const storedEmail = localStorage.getItem('aura-learning-last-email');
    if (storedEmail) {
      const userKey = `aura-learning-user-${storedEmail}`;
      const userDataString = localStorage.getItem(userKey);
      if (userDataString) {
        const userData: UserData = JSON.parse(userDataString);
        setLoggedInUser({ name: userData.name });
      }
      // Redirect after a short delay to show the message
      setTimeout(() => router.push('/dashboard'), 1500);
    }
  }, [router]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  function onSubmit(data: LoginFormValues) {
    localStorage.setItem('aura-learning-last-email', data.email);
    const key = `aura-learning-user-${data.email}`;
    const existingData = localStorage.getItem(key);
    if (!existingData) {
      const initialData = {
          email: data.email,
          name: data.name,
          stats: { hearts: 5, lastHeartRegen: Date.now(), coins: 0, streak: 1, lastLogin: Date.now() },
          inventory: { streakFreezes: 0 },
          progress: {},
          quizCache: {}
      }
      localStorage.setItem(key, JSON.stringify(initialData));
    } else {
        const parsedData = JSON.parse(existingData);
        parsedData.name = data.name;
        localStorage.setItem(key, JSON.stringify(parsedData));
    }

    router.push('/dashboard');
  }

  if (!isClient) {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-background">
            <p className="text-foreground">Loading Aura...</p>
        </div>
    );
  }

  if (loggedInUser) {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-background">
            <div className="text-center">
              <h1 className="font-headline text-4xl text-primary mb-4">Welcome back, {loggedInUser.name}!</h1>
              <p className="text-foreground">Redirecting to your dashboard...</p>
            </div>
        </div>
    );
  }

  return (
    <main>
      <AppContainer className="overflow-hidden">
        <div className="flex flex-col items-center justify-center p-8 sm:p-12 md:p-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="border-2 border-primary rounded-lg p-2">
                <GraduationCap className="h-12 w-12 text-primary" />
            </div>
            <h1 className="font-headline text-4xl sm:text-5xl text-primary">Aura Learning</h1>
          </div>
          <p className="mb-8 text-center text-lg text-muted-foreground">
            Your personalized, gamified studygram.
          </p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" size="lg">
                Begin Your Journey
              </Button>
            </form>
          </Form>

          <p className="mt-8 text-xs text-muted-foreground text-center">
            No password needed. Your progress is saved on this device.
          </p>
        </div>
      </AppContainer>
    </main>
  );
}
