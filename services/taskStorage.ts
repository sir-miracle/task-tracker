import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Task } from '@/types/task';
import { TASKS_STORAGE_KEY } from '@/constants/storage';

export async function getStoredTasks(): Promise<Task[]> {
  try {
    const raw = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Task[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((t) => ({
      ...t,
      body: typeof t.body === 'string' ? t.body : '',
    }));
  } catch {
    return [];
  }
}

export async function setStoredTasks(tasks: Task[]): Promise<void> {
  await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}
