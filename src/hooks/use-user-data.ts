'use client';

import { useState, useEffect, useCallback } from 'react';
import type { UserData, TopicProgress, Question } from '@/lib/types';
import { MAX_HEARTS, HEART_REGEN_RATE } from '@/lib/constants';
import { isToday, isYesterday } from 'date-fns';

const getUserStorageKey = (email: string) => `aura-user-${email}`;

const getInitialUserData = (email: string, name: string): UserData => ({
  email,
  name,
  stats: {
    hearts: MAX_HEARTS,
    lastRegen: Date.now(),
    coins: 0,
    streak: 0,
    lastLogin: Date.now(),
  },
  inventory: {
    streakFreeze: 0,
  },
  progress: {},
  quizCache: {},
});

export function useUserData(email: string | null) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const getStorageKey = useCallback(() => {
    return email ? getUserStorageKey(email) : null;
  }, [email]);

  useEffect(() => {
    if (!email) {
      setLoading(false);
      return;
    }

    const storageKey = getStorageKey();
    if (!storageKey) return;

    try {
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        const parsedData: UserData = JSON.parse(savedData);
        
        if (!isToday(new Date(parsedData.stats.lastLogin))) {
          if (isYesterday(new Date(parsedData.stats.lastLogin))) {
            parsedData.stats.streak += 1;
          } else {
            if (parsedData.inventory.streakFreeze > 0) {
              parsedData.inventory.streakFreeze -= 1;
            } else {
              parsedData.stats.streak = 1; 
            }
          }
          parsedData.stats.lastLogin = Date.now();
        }

        parsedData.quizCache = {};

        setUserData(parsedData);
      } else {
        const defaultUser = getInitialUserData(email, "Student");
        localStorage.setItem(storageKey, JSON.stringify(defaultUser));
        setUserData(defaultUser);
      }
    } catch (error) {
      console.error("Failed to load user data:", error);
    } finally {
      setLoading(false);
    }
  }, [email, getStorageKey]);

  useEffect(() => {
    if (userData) {
      const storageKey = getStorageKey();
      if (!storageKey) return;
      localStorage.setItem(storageKey, JSON.stringify(userData));

      if (userData.stats.hearts >= MAX_HEARTS) return;

      const timer = setInterval(() => {
        setUserData(prevData => {
          if (!prevData || prevData.stats.hearts >= MAX_HEARTS) {
            clearInterval(timer);
            return prevData;
          }
          const now = Date.now();
          const timeDifference = now - prevData.stats.lastRegen;
          const heartsToRegen = Math.floor(timeDifference / HEART_REGEN_RATE);

          if(heartsToRegen > 0) {
            const newHeartCount = Math.min(MAX_HEARTS, prevData.stats.hearts + heartsToRegen);
            const newLastRegen = prevData.stats.lastRegen + heartsToRegen * HEART_REGEN_RATE;
             return {
              ...prevData,
              stats: {
                ...prevData.stats,
                hearts: newHeartCount,
                lastRegen: newLastRegen,
              }
            };
          }
          return prevData;
        });
      }, 60000);

      return () => clearInterval(timer);
    }
  }, [userData, getStorageKey]);
  
  const setUserDataWrapper = useCallback((newUserData: UserData | ((prev: UserData) => UserData) ) => {
    setUserData(prev => {
        const dataToUpdate = typeof newUserData === 'function' ? newUserData(prev!) : newUserData;
        const storageKey = getStorageKey();
        if (storageKey) {
            localStorage.setItem(storageKey, JSON.stringify(dataToUpdate));
        }
        return dataToUpdate;
    });
  }, [getStorageKey]);

  const setUserProgress = (topicId: string, progress: Partial<TopicProgress>) => {
    if (!userData) return;
    setUserDataWrapper(prev => ({
        ...prev,
        progress: {
            ...prev.progress,
            [topicId]: {
                ...(prev.progress[topicId] || { completed: false, score: 0, stars: 0 }),
                ...progress
            }
        }
    }));
  };
  
  const setUserStats = (stats: Partial<UserData['stats']>) => {
    if (!userData) return;
    setUserDataWrapper(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        ...stats,
      }
    }));
  }

  const setUserInventory = (inventory: Partial<UserData['inventory']>) => {
    if (!userData) return;
    setUserDataWrapper(prev => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        ...inventory,
      }
    }));
  }

  return { userData, loading, setUserProgress, setUserStats, setUserInventory, setUserData: setUserDataWrapper };
}
