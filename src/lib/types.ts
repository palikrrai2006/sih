export type Role = 'student' | 'teacher' | 'admin';

export type User = {
  id: string;
  name: string;
  role: Role;
  avatarUrl: string;
  classId?: number; // For students
  classIds?: number[]; // For teachers
};

export type Lesson = {
  id: string;
  title: string;
  subject: string;
  description: string;
  icon: React.ElementType;
};

export type QuizQuestion = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
};

export type Quiz = {
  id: string;
  title: string;
  lessonId: string;
  subject: string;
  points: number;
  questions: QuizQuestion[];
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export type StudentProgress = {
  studentId: string;
  studentName: string;
  studentAvatar: string;
  lessonsCompleted: number;
  quizzesTaken: number;
  averageScore: number;
  engagement: number; // as a percentage
};