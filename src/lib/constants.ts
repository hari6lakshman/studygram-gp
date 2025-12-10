import type { Subject } from './types';
import { Atom, FlaskConical, Sigma, Dna, Code } from 'lucide-react';

export const SUBJECTS: Subject[] = [
  {
    name: 'Physics',
    icon: Atom,
    topics: [
      { id: 'physics-1', title: 'Basic Electrostatics', description: 'Understand the fundamental principles of electric charges and fields.' },
      { id: 'physics-2', title: 'Newtonian Mechanics', description: 'Explore the laws of motion and gravitation.' },
      { id: 'physics-3', title: 'Thermodynamics', description: 'Learn about heat, work, and energy.' },
    ],
  },
  {
    name: 'Chemistry',
    icon: FlaskConical,
    topics: [
      { id: 'chem-1', title: 'Atomic Structure', description: 'Delve into the composition of atoms.' },
      { id: 'chem-2', title: 'Chemical Bonds', description: 'Learn how atoms form molecules.' },
      { id: 'chem-3', title: 'Stoichiometry', description: 'Master the quantitative relationships in chemical reactions.' },
    ],
  },
  {
    name: 'Math',
    icon: Sigma,
    topics: [
      { id: 'math-1', title: 'Calculus', description: 'Grasp the concepts of derivatives and integrals.' },
      { id: 'math-2', title: 'Linear Algebra', description: 'Work with vectors, matrices, and linear transformations.' },
      { id: 'math-3', title: 'Probability', description: 'Understand the likelihood of events.' },
    ],
  },
  {
    name: 'Biology',
    icon: Dna,
    topics: [
      { id: 'bio-1', title: 'Cell Biology', description: 'Explore the structure and function of cells.' },
      { id: 'bio-2', title: 'Genetics', description: 'Learn about heredity and variation of inherited characteristics.' },
      { id: 'bio-3', title: 'Ecology', description: 'Study the interactions among organisms and their environment.' },
    ],
  },
  {
    name: 'Coding',
    icon: Code,
    topics: [
      { id: 'code-1', title: 'Data Structures', description: 'Understand arrays, linked lists, stacks, and queues.' },
      { id: 'code-2', title: 'Algorithms', description: 'Learn sorting, searching, and graph algorithms.' },
      { id: 'code-3', title: 'Web Development Basics', description: 'Get started with HTML, CSS, and JavaScript.' },
    ],
  },
];

export const MAX_HEARTS = 5;
export const HEART_REGEN_RATE = 6 * 60 * 1000; // 6 minutes in milliseconds

export const STORE_ITEMS = {
  LIFE_REFILL: {
    name: 'Life Refill',
    description: 'Restore your hearts to full.',
    price: 100,
  },
  STREAK_FREEZE: {
    name: 'Streak Freeze',
    description: 'Protect your daily streak for one day of inactivity.',
    price: 200,
  },
};

export const COINS_PER_QUIZ = 200;
