export type SubjectName = 'Physics' | 'Chemistry' | 'Math' | 'Biology' | 'Coding';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export interface Subject {
  name: SubjectName;
  topics: Topic[];
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
}

export interface TopicProgress {
  completed: boolean;
  highScore: number;
  starRating: number;
}

export interface UserData {
  name: string;
  email: string;
  stats: {
    hearts: number;
    lastHeartRegen: number; // timestamp
    coins: number;
    streak: number;
    lastLogin: number; // timestamp for streak
  };
  inventory: {
    streakFreezes: number;
  };
  progress: {
    [topicId: string]: TopicProgress;
  };
  quizCache: {
    // This is no longer used but kept for schema compatibility
    [topicId: string]: QuizQuestion[];
  };
}
