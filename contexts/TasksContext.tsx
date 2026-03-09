import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Task, TaskFilter } from '@/types/task';
import { getStoredTasks, setStoredTasks } from '@/services/taskStorage';

type TasksContextValue = {
  tasks: Task[];
  filter: TaskFilter;
  setFilter: (f: TaskFilter) => void;
  filteredTasks: Task[];
  addTask: (title: string, body?: string) => Task;
  toggleTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<Pick<Task, 'title' | 'body' | 'completed'>>) => void;
  deleteTask: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
  isLoading: boolean;
};

const TasksContext = createContext<TasksContextValue | null>(null);

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getStoredTasks().then((stored) => {
      if (mounted) setTasks(stored);
    }).finally(() => {
      if (mounted) setIsLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!isLoading) setStoredTasks(tasks);
  }, [tasks, isLoading]);

  const addTask = useCallback((title: string, body = ''): Task => {
    const trimmedTitle = title.trim();
    const newTask: Task = {
      id: makeId(),
      title: trimmedTitle,
      body: (body ?? '').trim(),
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Pick<Task, 'title' | 'body' | 'completed'>>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const getTaskById = useCallback((id: string) => tasks.find((t) => t.id === id), [tasks]);

  const filteredTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter((t) => !t.completed);
    if (filter === 'completed') return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const value = useMemo<TasksContextValue>(
    () => ({
      tasks,
      filter,
      setFilter,
      filteredTasks,
      addTask,
      toggleTask,
      updateTask,
      deleteTask,
      getTaskById,
      isLoading,
    }),
    [tasks, filter, filteredTasks, addTask, toggleTask, updateTask, deleteTask, getTaskById, isLoading]
  );

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks(): TasksContextValue {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasks must be used within TasksProvider');
  return ctx;
}
