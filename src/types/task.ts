export type Priority = 'Tinggi' | 'Sedang' | 'Rendah';
export type TaskStatus = 'Belum Selesai' | 'Selesai';

export interface Task {
  id: string;
  title: string;
  subject: string;
  description: string;
  deadline: string;
  priority: Priority;
  status: TaskStatus;
  createdAt: string;
}

export type TaskFilter = 'Semua' | TaskStatus;
