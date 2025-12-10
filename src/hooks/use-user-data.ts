'use client';

import { useState, useEffect, useCallback } from 'react';
import type { UserData, TopicProgress, QuizQuestion } from '@/lib/types';
import { MAX_HEARTS, HEART_REGEN_RATE } from '@/lib/constants';
import { isToday, isYesterday } from 'date-fns';

const getLocalStorageKey = (email: string) => `aura-learning-user-${email}`;

const getInitialUserData = (email: string, name: string): UserData => ({
  email,
  name,
  stats: {
    hearts: MAX_HEARTS,
    lastHeartRegen: Date.now(),
    coins: 0,
    streak: 0,
    lastLogin: Date.now(),
  },
  inventory: {
    streakFreezes: 0,
  },
  progress: {},
  quizCache: {},
});

export function useUserData(email: string | null) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const getStorageKey = useCallback(() => {
    return email ? getLocalStorageKey(email) : null;
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
            if (parsedData.inventory.streakFreezes > 0) {
              parsedData.inventory.streakFreezes -= 1;
            } else {
              parsedData.stats.streak = 1; 
            }
          }
          parsedData.stats.lastLogin = Date.now();
        }

        setUserData(parsedData);
      } else {
        // This case can happen if login page fails to write, so we create a default user
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
        setUserData(prev => {
          if (!prev || prev.stats.hearts >= MAX_HEARTS) {
            clearInterval(timer);
            return prev;
          }
          const now = Date.now();
          const timeDiff = now - prev.stats.lastHeartRegen;
          const heartsToRegen = Math.floor(timeDiff / HEART_REGEN_RATE);

          if(heartsToRegen > 0) {
            const updatedHearts = Math.min(MAX_HEARTS, prev.stats.hearts + heartsToRegen);
            const newLastRegen = prev.stats.lastHeartRegen + heartsToRegen * HEART_REGEN_RATE;
             return {
              ...prev,
              stats: {
                ...prev.stats,
                hearts: updatedHearts,
                lastHeartRegen: newLastRegen,
              }
            };
          }
          return prev;
        });
      }, 60000); // Check every minute

      return () => clearInterval(timer);
    }
  }, [userData, getStorageKey]);
  
  const updateUserData = useCallback((newUserData: UserData | ((prev: UserData) => UserData) ) => {
    setUserData(prev => {
        const dataToUpdate = typeof newUserData === 'function' ? newUserData(prev!) : newUserData;
        const storageKey = getStorageKey();
        if (storageKey) {
            localStorage.setItem(storageKey, JSON.stringify(dataToUpdate));
        }
        return dataToUpdate;
    });
  }, [getStorageKey]);

  const updateTopicProgress = (topicId: string, progress: Partial<TopicProgress>) => {
    if (!userData) return;
    updateUserData(prev => ({
        ...prev,
        progress: {
            ...prev.progress,
            [topicId]: {
                ...(prev.progress[topicId] || { completed: false, highScore: 0, starRating: 0 }),
                ...progress
            }
        }
    }));
  };
  
  const cacheQuizQuestions = (topicId: string, questions: QuizQuestion[]) => {
    if (!userData) return;
    updateUserData(prev => ({
      ...prev,
      quizCache: {
        ...prev.quizCache,
        [topicId]: questions
      }
    }));
  };

  const updateUserStats = (stats: Partial<UserData['stats']>) => {
    if (!userData) return;
    updateUserData(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        ...stats,
      }
    }));
  }

  const updateUserInventory = (inventory: Partial<UserData['inventory']>) => {
    if (!userData) return;
    updateUserData(prev => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        ...inventory,
      }
    }));
  }

  return { userData, loading, updateTopicProgress, cacheQuizQuestions, updateUserStats, updateUserInventory, setUserData };
}
