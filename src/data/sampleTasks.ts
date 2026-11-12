import type { Task } from '../types/task';

const today = new Date();
const dateAfter = (days: number): string => {
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

export const sampleTasks: Task[] = [
  { id: 'sample-1', title: 'Menyelesaikan laporan basis data', subject: 'Basis Data', description: 'Rapikan query dan dokumentasi praktikum.', deadline: dateAfter(2), priority: 'Tinggi', status: 'Belum Selesai', createdAt: new Date().toISOString() },
  { id: 'sample-2', title: 'Membuat desain aplikasi mobile', subject: 'Pemrograman Mobile', description: 'Finalisasi halaman beranda dan profil.', deadline: dateAfter(4), priority: 'Sedang', status: 'Belum Selesai', createdAt: new Date().toISOString() },
  { id: 'sample-3', title: 'Membaca materi TypeScript', subject: 'Pemrograman Web', description: 'Pelajari interface, union, dan generic.', deadline: dateAfter(6), priority: 'Rendah', status: 'Selesai', createdAt: new Date().toISOString() }
];
