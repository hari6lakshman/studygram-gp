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
      const storedEmail = localStorage.getItem('aura-learning-last-email');
      if (!storedEmail) {
        router.push('/');
      } else {
        setEmail(storedEmail);
      }
    }
  }, [isClient, router]);
  
  const { userData, updateUserStats, updateUserInventory } = useUserData(email);

  const handleBuyLifeRefill = () => {
    if (!userData) return;
    if (userData.stats.coins < STORE_ITEMS.LIFE_REFILL.price) {
        toast({ title: "Not enough coins!", description: "Complete more quizzes to earn coins.", variant: 'destructive' });
        return;
    }
    if (userData.stats.hearts === MAX_HEARTS) {
        toast({ title: "Hearts already full!", description: "No need to refill your hearts right now." });
        return;
    }

    updateUserStats({
        coins: userData.stats.coins - STORE_ITEMS.LIFE_REFILL.price,
        hearts: MAX_HEARTS,
    });
    toast({ title: "Purchase Successful!", description: "Your hearts have been refilled." });
  };

  const handleBuyStreakFreeze = () => {
    if (!userData) return;
    if (userData.stats.coins < STORE_ITEMS.STREAK_FREEZE.price) {
        toast({ title: "Not enough coins!", description: "Complete more quizzes to earn coins.", variant: 'destructive' });
        return;
    }
    
    updateUserInventory({
        streakFreezes: (userData.inventory.streakFreezes || 0) + 1,
    });
    updateUserStats({
        coins: userData.stats.coins - STORE_ITEMS.STREAK_FREEZE.price,
    });
    toast({ title: "Purchase Successful!", description: "You've acquired a Streak Freeze!" });
  };

  const storeItems = [
    {
        icon: Heart,
        title: STORE_ITEMS.LIFE_REFILL.name,
        description: STORE_ITEMS.LIFE_REFILL.description,
        price: STORE_ITEMS.LIFE_REFILL.price,
        onBuy: handleBuyLifeRefill,
        disabled: userData?.stats.hearts === MAX_HEARTS,
        owned: null
    },
    {
        icon: Shield,
        title: STORE_ITEMS.STREAK_FREEZE.name,
        description: STORE_ITEMS.STREAK_FREEZE.description,
        price: STORE_ITEMS.STREAK_FREEZE.price,
        onBuy: handleBuyStreakFreeze,
        disabled: false,
        owned: userData?.inventory.streakFreezes
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
        <h2 className="font-headline text-4xl text-center mb-2">Aura Store</h2>
        <p className="text-muted-foreground text-center mb-8">Spend your hard-earned coins on powerful items.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {storeItems.map(item => (
                <Card key={item.title} className="flex flex-col bg-card/50">
                    <CardHeader className="items-center text-center">
                        <item.icon className="h-16 w-16 text-primary mb-4" />
                        <CardTitle className="font-headline text-2xl">{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                        {item.owned !== null && <p className="text-sm text-primary font-bold mt-2">Owned: {item.owned}</p>}
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
        <Button variant="outline" onClick={() => router.back()} className="mt-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    </AppContainer>
  );
}
