export interface Task {
  id: string;
  title: string;
  body: string;
  completed: boolean;
  createdAt: number;
}

export type TaskFilter = 'all' | 'active' | 'completed';
