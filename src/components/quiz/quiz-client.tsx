'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useIsClient } from '@/hooks/use-is-client';
import { useUserData } from '@/hooks/use-user-data';
import type { Question, Subject, Topic } from '@/lib/types';
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

  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);

  useEffect(() => {
    if (isClient) {
      const savedEmail = localStorage.getItem('aura-last-email');
      if (!savedEmail) router.push('/');
      else setEmail(savedEmail);
    }
  }, [isClient, router]);

  const { userData, setUserStats, setUserProgress } = useUserData(email);

  useEffect(() => {
    if (!topic) return;

    const loadQuestions = () => {
      setIsLoading(true);
      if (topic.questions) {
        const shuffledQuestions = [...topic.questions].sort(() => Math.random() - 0.5).slice(0, 5);
        setQuestions(shuffledQuestions);
      } else {
        toast({ title: "Error", description: "Could not load quiz questions. Please try again.", variant: "destructive" });
        router.back();
      }
      setIsLoading(false);
    };

    loadQuestions();
  }, [topic, router, toast]);

  const handleAnswer = (option: string) => {
    if (isAnswered) return;

    setSelectedAnswer(option);
    setIsAnswered(true);
    
    if (option === questions[questionIndex].answer) {
      setCurrentScore(s => s + 1);
    } else {
      if(userData && userData.stats.hearts > 0) {
        setUserStats({ hearts: userData.stats.hearts - 1, lastRegen: Date.now() });
      }
    }
  };

  const handleNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(i => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    if (!userData || questions.length === 0) return;
    const oldProgress = userData.progress[topicId];
    const newBestScore = Math.max(oldProgress?.score ?? 0, currentScore);
    const accuracy = currentScore / questions.length;
    let newStarRating = 0;
    if (accuracy === 1) newStarRating = 5;
    else if (accuracy >= 0.8) newStarRating = 4;
    else if (accuracy >= 0.6) newStarRating = 3;
    else if (accuracy >= 0.4) newStarRating = 2;
    else if (accuracy > 0) newStarRating = 1;

    const finalStarRating = Math.max(oldProgress?.stars ?? 0, newStarRating);

    setUserProgress(topicId, {
      completed: true,
      score: newBestScore,
      stars: finalStarRating,
    });
    
    setUserStats({ coins: userData.stats.coins + COINS_PER_QUIZ });

    setIsQuizOver(true);
  };

  if (isLoading || !userData || !topic) {
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
                        You've run out of hearts. You can wait for them to regenerate or visit the store.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => router.push('/store')}>Go to Store</AlertDialogAction>
                    <AlertDialogAction onClick={() => router.push('/dashboard')}>Go to Dashboard</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
  }
  
  const currentQuestion = questions[questionIndex];
  if (!currentQuestion) return null;
  const progressPercentage = ((questionIndex) / questions.length) * 100;

  return (
    <>
      <AppContainer>
        <div className="p-8">
          <div className="mb-4">
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-sm text-muted-foreground text-center mt-2">Question {questionIndex + 1} of {questions.length}</p>
          </div>
          
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="text-center text-xl md:text-2xl min-h-[6rem] flex items-center justify-center">{currentQuestion.question}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option) => {
                const isCorrect = option === currentQuestion.answer;
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
              <Button onClick={handleNextQuestion}>
                {questionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </Button>
            </div>
          )}
        </div>
      </AppContainer>

      <AlertDialog open={isQuizOver}>
        <AlertDialogContent>
          <AlertDialogHeader className="items-center">
            <Award className="h-16 w-16 text-primary" />
            <AlertDialogTitle className="font-headline text-3xl">Quiz Complete!</AlertDialogTitle>
            <AlertDialogDescription>
              You scored {currentScore} out of {questions.length}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-center items-center gap-4 text-2xl font-bold text-primary">
            <Coins className="h-8 w-8"/>
            <span>+ {COINS_PER_QUIZ}</span>
          </div>
          <AlertDialogFooter className="mt-4">
            <AlertDialogAction onClick={() => router.replace(`/topics/${subjectName}`)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
