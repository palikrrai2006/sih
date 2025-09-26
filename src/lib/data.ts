
import { Atom, BrainCircuit, Dna, FlaskConical } from 'lucide-react';
import type { Role, User, Lesson, Quiz, Badge, StudentProgress } from './types';
import { placeholderImages } from './placeholder-images.json';

export const users: User[] = [
  { id: '1', name: 'Priya S.', role: 'student', avatarUrl: placeholderImages.find(p => p.id === 'avatar-1')?.imageUrl || '', classId: 8 },
  { id: '2', name: 'Rohan K.', role: 'student', avatarUrl: placeholderImages.find(p => p.id === 'avatar-2')?.imageUrl || '', classId: 7 },
  { id: '3', name: 'Anika V.', role: 'student', avatarUrl: placeholderImages.find(p => p.id === 'avatar-3')?.imageUrl || '', classId: 9 },
  { id: '4', name: 'Mr. Sharma', role: 'teacher', avatarUrl: 'https://picsum.photos/seed/avatar4/100/100', classIds: [7, 8, 9] },
  { id: '5', name: 'Admin', role: 'admin', avatarUrl: 'https://picsum.photos/seed/avatar5/100/100' },
];

export const lessons: Lesson[] = [
  { id: 'phy-1', title: 'Forces and Motion', subject: 'Physics', description: 'Understand the fundamental laws of motion and how forces interact.', icon: Atom },
  { id: 'chem-1', title: 'Chemical Reactions', subject: 'Chemistry', description: 'Explore the fascinating world of chemical changes and equations.', icon: FlaskConical },
  { id: 'bio-1', title: 'The Cell', subject: 'Biology', description: 'Discover the basic building block of all life.', icon: Dna },
  { id: 'tech-1', title: 'Introduction to Circuits', subject: 'Technology', description: 'Learn how electricity powers the world around us.', icon: BrainCircuit },
];

export const quizzes: Quiz[] = [
  { 
    id: 'q-phy-1', 
    title: 'Motion Mastery', 
    lessonId: 'phy-1', 
    subject: 'Physics', 
    points: 100,
    questions: [
      { id: 'q1', text: 'What is the unit of force?', options: ['Joule', 'Watt', 'Newton', 'Pascal'], correctAnswer: 'Newton' },
      { id: 'q2', text: 'Which of Newton\'s laws is also known as the law of inertia?', options: ['First Law', 'Second Law', 'Third Law', 'Fourth Law'], correctAnswer: 'First Law' },
      { id: 'q3', text: 'A car accelerates from rest. What force is responsible for this acceleration?', options: ['Gravity', 'Friction', 'Air Resistance', 'Engine Force'], correctAnswer: 'Engine Force' },
    ]
  },
  { 
    id: 'q-chem-1', 
    title: 'Reaction Race', 
    lessonId: 'chem-1', 
    subject: 'Chemistry', 
    points: 120,
    questions: [
      { id: 'q1', text: 'What is the chemical symbol for water?', options: ['H2O', 'CO2', 'O2', 'NaCl'], correctAnswer: 'H2O' },
      { id: 'q2', text: 'What type of reaction is 2H2 + O2 -> 2H2O?', options: ['Decomposition', 'Synthesis', 'Single Replacement', 'Double Replacement'], correctAnswer: 'Synthesis' },
    ] 
  },
  { 
    id: 'q-bio-1', 
    title: 'Cell Structure Challenge', 
    lessonId: 'bio-1', 
    subject: 'Biology', 
    points: 150,
    questions: [
        { id: 'q1', text: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Cell Wall'], correctAnswer: 'Mitochondria' },
    ]
  },
  { 
    id: 'q-tech-1', 
    title: 'Circuit Challenge', 
    lessonId: 'tech-1', 
    subject: 'Technology', 
    points: 80,
    questions: [
        { id: 'q1', text: 'What component is used to resist the flow of current?', options: ['Capacitor', 'Inductor', 'Resistor', 'Transistor'], correctAnswer: 'Resistor' },
    ]
  },
  {
    id: 'q-chem-2',
    title: 'Advanced Reactions',
    lessonId: 'chem-1',
    subject: 'Chemistry',
    points: 130,
    questions: [
      { id: 'q1', text: 'Which of the following is a sign of a chemical reaction?', options: ['Change in color', 'Production of gas', 'Change in temperature', 'All of the above'], correctAnswer: 'All of the above' },
      { id: 'q2', text: 'Balancing chemical equations is based on which law?', options: ['Law of Conservation of Mass', 'Law of Constant Proportions', 'Avogadro\'s Law', 'Boyle\'s Law'], correctAnswer: 'Law of Conservation of Mass' },
    ]
  }
];

export const badges: Badge[] = [
  { id: 'b-phy-1', name: 'Physics Pioneer', description: 'Completed "Forces and Motion"', imageUrl: placeholderImages.find(p => p.id === 'badge-physics-1')?.imageUrl || '', imageHint: 'physics award' },
  { id: 'b-chem-1', name: 'Chemistry Champion', description: 'Completed "Chemical Reactions"', imageUrl: placeholderImages.find(p => p.id === 'badge-chemistry-1')?.imageUrl || '', imageHint: 'chemistry award' },
  { id: 'b-bio-1', name: 'Biology Buff', description: 'Completed "The Cell"', imageUrl: placeholderImages.find(p => p.id === 'badge-biology-1')?.imageUrl || '', imageHint: 'biology award' },
  { id: 'b-math-1', name: 'Math Magician', description: 'Mastered Algebra Basics', imageUrl: placeholderImages.find(p => p.id === 'badge-math-1')?.imageUrl || '', imageHint: 'math award' },
];


export const studentProgressData: StudentProgress[] = [
    { studentId: '1', studentName: 'Priya S.', studentAvatar: placeholderImages.find(p => p.id === 'avatar-1')?.imageUrl || '', lessonsCompleted: 5, quizzesTaken: 4, averageScore: 88, engagement: 92 },
    { studentId: '2', studentName: 'Rohan K.', studentAvatar: placeholderImages.find(p => p.id === 'avatar-2')?.imageUrl || '', lessonsCompleted: 3, quizzesTaken: 3, averageScore: 75, engagement: 65 },
    { studentId: '3', studentName: 'Anika V.', studentAvatar: placeholderImages.find(p => p.id === 'avatar-3')?.imageUrl || '', lessonsCompleted: 6, quizzesTaken: 6, averageScore: 95, engagement: 98 },
    { studentId: '6', studentName: 'Suresh P.', studentAvatar: 'https://picsum.photos/seed/avatar6/100/100', lessonsCompleted: 2, quizzesTaken: 1, averageScore: 60, engagement: 40 },
    { studentId: '7', studentName: 'Deepa M.', studentAvatar: 'https://picsum.photos/seed/avatar7/100/100', lessonsCompleted: 4, quizzesTaken: 4, averageScore: 82, engagement: 85 },
];

export const leaderboardData = studentProgressData
  .map(s => ({
    id: s.studentId,
    name: s.studentName,
    avatarUrl: s.studentAvatar,
    points: (s.lessonsCompleted * 20) + (s.quizzesTaken * s.averageScore),
  }))
  .sort((a, b) => b.points - a.points)
  .map((s, index) => ({ ...s, rank: index + 1 }));

export const classes = [6, 7, 8, 9, 10, 11, 12];
