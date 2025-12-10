export type SubjectName = 'Physics' | 'Chemistry' | 'Math' | 'Biology' | 'Coding';

export interface Question {
  question: string;
  options: string[];
  answer: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface Subject {
  name: SubjectName;
  topics: Topic[];
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
}

export interface TopicProgress {
  completed: boolean;
  score: number;
  stars: number;
}

export interface UserData {
  name: string;
  email: string;
  stats: {
    hearts: number;
    lastRegen: number;
    coins: number;
    streak: number;
    lastLogin: number;
  };
  inventory: {
    streakFreeze: number;
  };
  progress: {
    [topicId: string]: TopicProgress;
  };
  quizCache: {
    [topicId: string]: Question[];
  };
}
