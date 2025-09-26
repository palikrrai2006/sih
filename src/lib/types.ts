export type Role = 'student' | 'teacher' | 'admin';

export type User = {
  id: string;
  name: string;
  role: Role;
  avatarUrl: string;
};

export type Lesson = {
  id: string;
  title: string;
  subject: string;
  description: string;
  icon: React.ElementType;
};

export type Quiz = {
  id: string;
  title: string;
  lessonId: string;
  subject: string;
  points: number;
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
