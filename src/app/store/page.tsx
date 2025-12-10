'use client';

import { useRouter } from 'next/navigation';
import { useIsClient } from '@/hooks/use-is-client';
import { useUserData } from '@/hooks/use-user-data';
import { useEffect, useState } from 'react';
import { AppContainer } from '@/components/layout/app-container';
import { STORE_ITEMS, MAX_HEARTS } from '@/lib/constants';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Shield, CircleDollarSign, ArrowLeft } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from '@/components/ui/skeleton';

export default function StorePage() {
  const router = useRouter();
  const isClient = useIsClient();
  const { toast } = useToast();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (isClient) {
      const savedEmail = localStorage.getItem('aura-last-email');
      if (!savedEmail) {
        router.push('/');
      } else {
        setEmail(savedEmail);
      }
    }
  }, [isClient, router]);
  
  const { userData, setUserStats, setUserInventory } = useUserData(email);

  const buyHeartRefill = () => {
    if (!userData) return;
    if (userData.stats.coins < STORE_ITEMS.HEART_REFILL.price) {
        toast({ title: "Not enough coins!", description: "Complete quizzes to earn more coins.", variant: 'destructive' });
        return;
    }
    if (userData.stats.hearts === MAX_HEARTS) {
        toast({ title: "Hearts already full!", description: "No need to buy a heart refill." });
        return;
    }

    setUserStats({
        coins: userData.stats.coins - STORE_ITEMS.HEART_REFILL.price,
        hearts: MAX_HEARTS,
    });
    toast({ title: "Purchase successful!", description: "Your hearts have been refilled." });
  };

  const buyStreakFreeze = () => {
    if (!userData) return;
    if (userData.stats.coins < STORE_ITEMS.STREAK_FREEZE.price) {
        toast({ title: "Not enough coins!", description: "Complete quizzes to earn more coins.", variant: 'destructive' });
        return;
    }
    
    setUserInventory({
        streakFreeze: (userData.inventory.streakFreeze || 0) + 1,
    });
    setUserStats({
        coins: userData.stats.coins - STORE_ITEMS.STREAK_FREEZE.price,
    });
    toast({ title: "Purchase successful!", description: "You've got a Streak Freeze!" });
  };

  const storeItems = [
    {
        icon: Heart,
        title: STORE_ITEMS.HEART_REFILL.name,
        description: STORE_ITEMS.HEART_REFILL.description,
        price: STORE_ITEMS.HEART_REFILL.price,
        onBuy: buyHeartRefill,
        disabled: userData?.stats.hearts === MAX_HEARTS,
        owned: null
    },
    {
        icon: Shield,
        title: STORE_ITEMS.STREAK_FREEZE.name,
        description: STORE_ITEMS.STREAK_FREEZE.description,
        price: STORE_ITEMS.STREAK_FREEZE.price,
        onBuy: buyStreakFreeze,
        disabled: false,
        owned: userData?.inventory.streakFreeze
    },
  ];

  if (!isClient || !userData) {
    return (
        <AppContainer>
            <div className="p-8">
                <Skeleton className="h-10 w-1/2 mx-auto mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Skeleton className="h-64" />
                    <Skeleton className="h-64" />
                </div>
            </div>
        </AppContainer>
    );
  }

  return (
    <AppContainer>
      <div className="p-8">
        <Button variant="outline" onClick={() => router.back()} className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
        <h2 className="font-headline text-4xl text-center mb-2">Store</h2>
        <p className="text-muted-foreground text-center mb-8">Spend your coins on powerful items.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {storeItems.map(item => (
                <Card key={item.title} className="flex flex-col bg-card/50">
                    <CardHeader className="items-center text-center">
                        <item.icon className="h-16 w-16 text-primary mb-4" />
                        <CardTitle className="font-headline text-2xl">{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                        {item.owned !== null && <p className="text-sm text-primary font-bold mt-2">You own: {item.owned}</p>}
                    </CardHeader>
                    <CardContent className="flex-grow"/>
                    <CardFooter>
                        <Button className="w-full" onClick={item.onBuy} disabled={item.disabled || (userData?.stats.coins ?? 0) < item.price}>
                            <CircleDollarSign className="mr-2 h-5 w-5" />
                            {item.price} Coins
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </div>
    </AppContainer>
  );
}
