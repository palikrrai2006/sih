
"use client";

import { create } from 'zustand';
import { quizzes as initialQuizzes } from '@/lib/data';
import type { Quiz } from '@/lib/types';

interface QuizState {
  quizzes: Quiz[];
  addQuiz: (quiz: Quiz) => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  quizzes: [],
  addQuiz: (quiz) => set((state) => ({ quizzes: [...state.quizzes, quiz] })),
}));
