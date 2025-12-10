'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { AppContainer } from '@/components/layout/app-container';
import { GraduationCap } from 'lucide-react';
import type { UserData } from '@/lib/types';

const loginSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState<{name: string} | null>(null);

  useEffect(() => {
    setIsClient(true);
    const email = localStorage.getItem('aura-last-email');
    if (email) {
      const userKey = `aura-user-${email}`;
      const userDataString = localStorage.getItem(userKey);
      if (userDataString) {
        const userData: UserData = JSON.parse(userDataString);
        setUser({ name: userData.name });
      }
      setTimeout(() => router.push('/dashboard'), 1500);
    }
  }, [router]);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  function onSubmit(data: LoginValues) {
    localStorage.setItem('aura-last-email', data.email);
    const key = `aura-user-${data.email}`;
    const oldData = localStorage.getItem(key);
    if (!oldData) {
      const initialData = {
          email: data.email,
          name: data.name,
          stats: { hearts: 5, lastRegen: Date.now(), coins: 0, streak: 1, lastLogin: Date.now() },
          inventory: { streakFreeze: 0 },
          progress: {},
          quizCache: {}
      }
      localStorage.setItem(key, JSON.stringify(initialData));
    } else {
        const parsed = JSON.parse(oldData);
        parsed.name = data.name;
        localStorage.setItem(key, JSON.stringify(parsed));
    }

    router.push('/dashboard');
  }

  if (!isClient) {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-background">
            <p className="text-foreground">Loading...</p>
        </div>
    );
  }

  if (user) {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-background">
            <div className="text-center">
              <h1 className="font-headline text-4xl text-primary mb-4">Welcome back, {user.name}!</h1>
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
            <h1 className="font-headline text-3xl sm:text-4xl text-primary">Aura Learning - Studygram</h1>
          </div>
          <p className="mb-8 text-center text-lg text-muted-foreground">
            Your gamified learning adventure starts here.
          </p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormLabel>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormLabel>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormLabel>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormLabel>
                )}
              />
              <Button type="submit" className="w-full" size="lg">
                Start Learning
              </Button>
            </form>
          </Form>
        </div>
      </AppContainer>
    </main>
  );
}
