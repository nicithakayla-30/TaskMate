import type { Task } from '../types/task';
import { sampleTasks } from '../data/sampleTasks';

const STORAGE_KEY = 'taskmate_tasks_v1';

export function loadTasks(): Task[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved) as Task[];
  } catch (error) {
    console.error('Gagal membaca tugas dari LocalStorage:', error);
  }
  return sampleTasks;
}

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
