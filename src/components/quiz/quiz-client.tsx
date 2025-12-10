'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useIsClient } from '@/hooks/use-is-client';
import { useUserData } from '@/hooks/use-user-data';
import type { QuizQuestion, Subject, Topic } from '@/lib/types';
import { SUBJECTS, COINS_PER_QUIZ } from '@/lib/constants';
import { AppContainer } from '@/components/layout/app-container';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Check, X, Award, Coins } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

export function QuizClient() {
  const router = useRouter();
  const params = useParams();
  const isClient = useIsClient();
  const { toast } = useToast();
  const [email, setEmail] = useState<string | null>(null);

  const subjectName = params.subject as string;
  const topicId = params.topic as string;
  
  const subject: Subject | undefined = SUBJECTS.find(s => s.name.toLowerCase() === subjectName);
  const topic: Topic | undefined = subject?.topics.find(t => t.id === topicId);

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isClient) {
      const storedEmail = localStorage.getItem('aura-learning-last-email');
      if (!storedEmail) router.push('/');
      else setEmail(storedEmail);
    }
  }, [isClient, router]);

  const { userData, updateUserStats, updateTopicProgress } = useUserData(email);

  useEffect(() => {
    if (!topic) return;

    const fetchQuestions = () => {
      setLoadingQuestions(true);
      // Directly get questions from the topic object
      if (topic.questions) {
        // Simple shuffle to make it less repetitive
        const shuffledQuestions = [...topic.questions].sort(() => Math.random() - 0.5).slice(0, 5);
        setQuestions(shuffledQuestions);
      } else {
        toast({ title: "Error", description: "Could not load quiz questions. Please try again later.", variant: "destructive" });
        router.back();
      }
      setLoadingQuestions(false);
    };

    fetchQuestions();
  }, [topic, router, toast]);

  const handleAnswer = (option: string) => {
    if (isAnswered) return;

    setSelectedAnswer(option);
    setIsAnswered(true);
    
    if (option === questions[currentQuestionIndex].correctAnswer) {
      setScore(s => s + 1);
    } else {
      if(userData && userData.stats.hearts > 0) {
        updateUserStats({ hearts: userData.stats.hearts - 1, lastHeartRegen: Date.now() });
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    if (!userData || questions.length === 0) return;
    const previousProgress = userData.progress[topicId];
    const newHighScore = Math.max(previousProgress?.highScore ?? 0, score);
    const accuracy = score / questions.length;
    let starRating = 0;
    if (accuracy === 1) starRating = 5;
    else if (accuracy >= 0.8) starRating = 4;
    else if (accuracy >= 0.6) starRating = 3;
    else if (accuracy >= 0.4) starRating = 2;
    else if (accuracy > 0) starRating = 1;

    const newStarRating = Math.max(previousProgress?.starRating ?? 0, starRating);

    updateTopicProgress(topicId, {
      completed: true,
      highScore: newHighScore,
      starRating: newStarRating,
    });
    
    updateUserStats({ coins: userData.stats.coins + COINS_PER_QUIZ });

    setIsFinished(true);
  };

  if (loadingQuestions || !userData || !topic) {
    return (
        <AppContainer>
            <div className="p-8 space-y-8">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="space-y-4 mt-8">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
            </div>
        </AppContainer>
    );
  }
  
  if (userData.stats.hearts <= 0 && !isAnswered) {
    return (
        <AlertDialog open={true}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Out of Hearts!</AlertDialogTitle>
                    <AlertDialogDescription>
                        You've run out of hearts. Wait for them to regenerate or visit the store to refill.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => router.push('/store')}>Go to Store</AlertDialogAction>
                    <AlertDialogAction onClick={() => router.push('/dashboard')}>Back to Dashboard</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) return null; // Should not happen if loading is done
  const progressPercentage = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <>
      <AppContainer>
        <div className="p-8">
          <div className="mb-4">
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-sm text-muted-foreground text-center mt-2">Question {currentQuestionIndex + 1} of {questions.length}</p>
          </div>
          
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="text-center text-xl md:text-2xl min-h-[6rem] flex items-center justify-center">{currentQuestion.question}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option) => {
                const isCorrect = option === currentQuestion.correctAnswer;
                const isSelected = option === selectedAnswer;
                
                return (
                  <Button
                    key={option}
                    variant="outline"
                    size="lg"
                    className={cn(
                      "justify-start h-auto py-3 text-base whitespace-normal text-left",
                      isAnswered && isCorrect && "bg-green-500/20 border-green-500 hover:bg-green-500/30 text-foreground",
                      isAnswered && isSelected && !isCorrect && "bg-red-500/20 border-red-500 hover:bg-red-500/30 text-foreground"
                    )}
                    onClick={() => handleAnswer(option)}
                    disabled={isAnswered}
                  >
                    <div className="flex items-start">
                        {isAnswered && isCorrect && <Check className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-400"/>}
                        {isAnswered && isSelected && !isCorrect && <X className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-red-400"/>}
                        <span>{option}</span>
                    </div>
                  </Button>
                );
              })}
            </CardContent>
          </Card>
          
          {isAnswered && (
            <div className="mt-4 flex justify-end">
              <Button onClick={handleNext}>
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </Button>
            </div>
          )}
        </div>
      </AppContainer>

      <AlertDialog open={isFinished}>
        <AlertDialogContent>
          <AlertDialogHeader className="items-center">
            <Award className="h-16 w-16 text-primary" />
            <AlertDialogTitle className="font-headline text-3xl">Quiz Complete!</AlertDialogTitle>
            <AlertDialogDescription>
              You scored {score} out of {questions.length}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-center items-center gap-4 text-2xl font-bold text-primary">
            <Coins className="h-8 w-8"/>
            <span>+ {COINS_PER_QUIZ}</span>
          </div>
          <AlertDialogFooter className="mt-4">
            <AlertDialogAction onClick={() => router.replace(`/topics/${subjectName}`)}>Continue Learning</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
