'use client';

import { useUserData } from '@/hooks/use-user-data';
import { useIsClient } from '@/hooks/use-is-client';
import { Heart, CircleDollarSign, Zap, Shield, GraduationCap, LogOut, Store } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';

const StatItem = ({ icon: Icon, value, label }: { icon: React.ElementType, value: React.ReactNode, label: string }) => (
    <div className="flex items-center gap-2" aria-label={label}>
        <Icon className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold text-foreground">{value}</span>
    </div>
);

export function Header() {
    const router = useRouter();
    const isClient = useIsClient();
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        if (isClient) {
            setEmail(localStorage.getItem('aura-learning-last-email'));
        }
    }, [isClient]);

    const { userData, loading } = useUserData(email);

    const handleLogout = () => {
        localStorage.removeItem('aura-learning-last-email');
        router.push('/');
    };

    if (!isClient || loading) {
        return (
            <header className="w-full p-4 border-b border-primary/20">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-3">
                        <GraduationCap className="h-8 w-8 text-primary" />
                        <h1 className="font-headline text-2xl text-primary">Aura Learning</h1>
                    </div>
                    <div className="flex items-center gap-6">
                        <Skeleton className="h-6 w-12 rounded-md" />
                        <Skeleton className="h-6 w-12 rounded-md" />
                        <Skeleton className="h-6 w-12 rounded-md" />
                        <Skeleton className="h-6 w-12 rounded-md" />
                    </div>
                    <Skeleton className="h-10 w-28 rounded-md" />
                </div>
            </header>
        );
    }
    
    return (
        <header className="w-full p-4 border-b border-primary/20">
            <div className="flex flex-wrap items-center justify-between gap-4 max-w-7xl mx-auto">
                <Link href="/dashboard" className="flex items-center gap-3">
                    <GraduationCap className="h-8 w-8 text-primary" />
                    <h1 className="font-headline text-2xl text-primary hidden sm:block">Aura Learning</h1>
                </Link>

                <div className="flex items-center gap-4 sm:gap-6">
                    <StatItem icon={Heart} value={userData?.stats.hearts ?? 0} label="Hearts" />
                    <StatItem icon={CircleDollarSign} value={userData?.stats.coins ?? 0} label="Coins" />
                    <StatItem icon={Zap} value={userData?.stats.streak ?? 0} label="Streak" />
                    <StatItem icon={Shield} value={userData?.inventory.streakFreezes ?? 0} label="Streak Freezes" />
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-foreground hidden md:inline">{userData?.name}</span>
                    <Button variant="outline" size="icon" asChild>
                      <Link href="/store">
                        <Store />
                        <span className="sr-only">Store</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Log out">
                       <LogOut className="h-5 w-5 text-muted-foreground" />
                    </Button>
                </div>
            </div>
        </header>
    );
}
