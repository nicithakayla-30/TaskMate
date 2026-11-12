import './style.css';
import type { Priority, Task, TaskFilter } from './types/task';
import { loadTasks, saveTasks } from './services/storage';
import { escapeHtml, formatDate } from './utils/format';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('Elemen #app tidak ditemukan.');

let tasks: Task[] = loadTasks();
let activeFilter: TaskFilter = 'Semua';
let searchTerm = '';
let subjectFilter = 'Semua Mata Kuliah';
let editingId: string | null = null;

const icon = {
  heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.8c0 5.2-8.8 10-8.8 10S3.2 14 3.2 8.8A4.5 4.5 0 0 1 12 6.4a4.5 4.5 0 0 1 8.8 2.4Z"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
  book: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22V5.5Z"/><path d="M4 17a2.5 2.5 0 0 1 2.5-2.5H20"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>',
  edit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5 4 4M4 20l4-.8L19 8a2.8 2.8 0 0 0-4-4L4 15l0 5Z"/></svg>',
  trash: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3"/></svg>',
  plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>'
};

function persist(): void { saveTasks(tasks); }

function render(): void {
  const completed = tasks.filter(task => task.status === 'Selesai').length;
  const pending = tasks.length - completed;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
  const subjects = [...new Set(tasks.map(task => task.subject))].sort();
  const visibleTasks = tasks.filter(task => {
    const matchesStatus = activeFilter === 'Semua' || task.status === activeFilter;
    const matchesSubject = subjectFilter === 'Semua Mata Kuliah' || task.subject === subjectFilter;
    const matchesSearch = `${task.title} ${task.subject}`.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSubject && matchesSearch;
  });

  app!.innerHTML = `
    <div class="app-shell">
      <header class="topbar">
        <a class="brand" href="#" aria-label="TaskMate beranda"><span class="brand-mark">${icon.heart}</span><span>TaskMate<span class="brand-dot">.</span></span></a>
        <nav class="main-nav" aria-label="Navigasi utama">
          <button class="nav-link ${activeFilter === 'Semua' ? 'active' : ''}" data-filter="Semua">Dashboard</button>
          <button class="nav-link ${activeFilter === 'Belum Selesai' ? 'active' : ''}" data-filter="Belum Selesai">Belum Selesai</button>
          <button class="nav-link ${activeFilter === 'Selesai' ? 'active' : ''}" data-filter="Selesai">Completed</button>
        </nav>
        <span class="topbar-note">little steps, big progress ♡</span>
      </header>

      <main>
        <section class="welcome">
          <div><p class="eyebrow">YOUR LITTLE STUDY COMPANION</p><h1>Hello, Student! <span>♡</span></h1><p class="welcome-copy">Atur tugasmu, satu langkah kecil dalam satu waktu.</p></div>
          <div class="date-chip">${icon.calendar}<span>${new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())}</span></div>
        </section>

        <section class="stats-grid" aria-label="Ringkasan tugas">
          <article class="stat-card pink"><span class="stat-icon">${icon.book}</span><p>Total Tugas</p><strong>${tasks.length}</strong><small>Semua tugas kuliahmu</small></article>
          <article class="stat-card lavender"><span class="stat-icon">${icon.check}</span><p>Tugas Selesai</p><strong>${completed}</strong><small>Yeay, terus semangat!</small></article>
          <article class="stat-card sage"><span class="stat-icon">${icon.calendar}</span><p>Belum Selesai</p><strong>${pending}</strong><small>Pelan-pelan diselesaikan</small></article>
        </section>

        <section class="progress-card">
          <div class="progress-heading"><div><p class="eyebrow">YOUR ACHIEVEMENT</p><h2>My Progress</h2></div><strong>${progress}%</strong></div>
          <div class="progress-track"><span style="width:${progress}%"></span></div>
          <p class="progress-caption">${tasks.length ? `Kamu sudah menyelesaikan ${completed} dari ${tasks.length} tugas. Keep going! ♡` : 'Tambahkan tugas pertamamu untuk memulai progress ♡'}</p>
        </section>

        <section class="tasks-section">
          <div class="section-heading"><div><p class="eyebrow">STAY ORGANIZED</p><h2>My Tasks <span>♡</span></h2></div><button class="primary-btn" id="add-task">${icon.plus}<span>Add New Task</span></button></div>
          <div class="toolbar">
            <label class="search-box">${icon.search}<input id="search" type="search" placeholder="Cari nama tugas atau mata kuliah..." value="${escapeHtml(searchTerm)}"></label>
            <select id="subject-filter" aria-label="Filter mata kuliah"><option>Semua Mata Kuliah</option>${subjects.map(subject => `<option ${subjectFilter === subject ? 'selected' : ''}>${escapeHtml(subject)}</option>`).join('')}</select>
          </div>
          <div class="task-list">
            ${visibleTasks.length ? visibleTasks.map(task => taskCard(task)).join('') : `<div class="empty-state"><div class="empty-illustration">♡</div><h3>${tasks.length ? 'Tugas tidak ditemukan' : 'No tasks yet ♡'}</h3><p>${tasks.length ? 'Coba ubah kata pencarian atau filter.' : 'Your study journey starts with one little task.'}</p>${tasks.length ? '' : '<button class="primary-btn" id="empty-add">Add Your First Task</button>'}</div>`}
          </div>
        </section>
      </main>
      <footer>Made with <span>♥</span> for your college journey · TaskMate ${escapeHtml(import.meta.env.VITE_APP_VERSION || '1.0.0')}</footer>
    </div>
    <div class="modal-backdrop hidden" id="modal-backdrop">
      <section class="task-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-heading"><div><p class="eyebrow">A LITTLE STEP FORWARD</p><h2 id="modal-title">${editingId ? 'Edit Task' : 'Add New Task'} ♡</h2></div><button class="icon-btn" id="close-modal" aria-label="Tutup">×</button></div>
        <form id="task-form">
          <label>Nama Tugas <span>*</span><input name="title" required maxlength="90" placeholder="Contoh: Membuat laporan praktikum"></label>
          <label>Mata Kuliah <span>*</span><input name="subject" required maxlength="60" placeholder="Contoh: Basis Data"></label>
          <label>Deskripsi <small>(opsional)</small><textarea name="description" rows="3" maxlength="240" placeholder="Catatan kecil tentang tugas ini..."></textarea></label>
          <div class="form-row"><label>Deadline <span>*</span><input name="deadline" type="date" required></label><label>Prioritas<select name="priority"><option>Tinggi</option><option selected>Sedang</option><option>Rendah</option></select></label></div>
          <p class="form-error" id="form-error" role="alert"></p>
          <div class="modal-actions"><button type="button" class="secondary-btn" id="cancel-modal">Batal</button><button type="submit" class="primary-btn">Simpan Tugas ♡</button></div>
        </form>
      </section>
    </div>
    <div class="toast" id="toast" role="status"></div>
  `;

  bindEvents();
}

function taskCard(task: Task): string {
  const priorityClass = task.priority.toLowerCase();
  const done = task.status === 'Selesai';
  return `<article class="task-card ${done ? 'is-done' : ''}">
    <div class="task-symbol">${icon.book}</div>
    <div class="task-main"><h3>${escapeHtml(task.title)}</h3><p class="task-subject">${escapeHtml(task.subject)}</p>${task.description ? `<p class="task-description">${escapeHtml(task.description)}</p>` : ''}<div class="task-meta"><span class="deadline">${icon.calendar}${formatDate(task.deadline)}</span><span class="priority ${priorityClass}">${task.priority}</span><span class="status ${done ? 'done' : 'pending'}">${done ? 'Selesai' : 'Belum Selesai'}</span></div></div>
    <div class="task-actions"><button class="action-btn edit" data-action="edit" data-id="${task.id}" aria-label="Edit ${escapeHtml(task.title)}" title="Edit">${icon.edit}</button><button class="action-btn delete" data-action="delete" data-id="${task.id}" aria-label="Hapus ${escapeHtml(task.title)}" title="Hapus">${icon.trash}</button><button class="action-btn complete ${done ? 'completed' : ''}" data-action="toggle" data-id="${task.id}" aria-label="${done ? 'Tandai belum selesai' : 'Tandai selesai'}" title="${done ? 'Tandai belum selesai' : 'Tandai selesai'}">${icon.check}</button></div>
  </article>`;
}

function openModal(task?: Task): void {
  editingId = task?.id ?? null;
  const backdrop = document.querySelector<HTMLDivElement>('#modal-backdrop')!;
  backdrop.classList.remove('hidden');
  const form = document.querySelector<HTMLFormElement>('#task-form')!;
  if (task) {
    (form.elements.namedItem('title') as HTMLInputElement).value = task.title;
    (form.elements.namedItem('subject') as HTMLInputElement).value = task.subject;
    (form.elements.namedItem('description') as HTMLTextAreaElement).value = task.description;
    (form.elements.namedItem('deadline') as HTMLInputElement).value = task.deadline;
    (form.elements.namedItem('priority') as HTMLSelectElement).value = task.priority;
  } else {
    form.reset();
    (form.elements.namedItem('deadline') as HTMLInputElement).min = new Date().toISOString().slice(0, 10);
  }
  document.querySelector('#modal-title')!.textContent = task ? 'Edit Task ♡' : 'Add New Task ♡';
  (form.elements.namedItem('title') as HTMLInputElement).focus();
}

function closeModal(): void {
  document.querySelector('#modal-backdrop')?.classList.add('hidden');
  editingId = null;
}

let toastTimer: number | undefined;
function showToast(message: string): void {
  const toast = document.querySelector<HTMLDivElement>('#toast')!;
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2400);
}

function bindEvents(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter as TaskFilter;
    render();
  }));
  document.querySelector('#add-task')?.addEventListener('click', () => openModal());
  document.querySelector('#empty-add')?.addEventListener('click', () => openModal());
  document.querySelector('#close-modal')?.addEventListener('click', closeModal);
  document.querySelector('#cancel-modal')?.addEventListener('click', closeModal);
  document.querySelector('#modal-backdrop')?.addEventListener('click', event => {
    if (event.target === event.currentTarget) closeModal();
  });
  document.querySelector('#search')?.addEventListener('input', event => {
    searchTerm = (event.target as HTMLInputElement).value;
    const cursor = (event.target as HTMLInputElement).selectionStart;
    render();
    const input = document.querySelector<HTMLInputElement>('#search')!;
    input.focus();
    input.setSelectionRange(cursor, cursor);
  });
  document.querySelector('#subject-filter')?.addEventListener('change', event => {
    subjectFilter = (event.target as HTMLSelectElement).value;
    render();
  });
  document.querySelectorAll<HTMLButtonElement>('[data-action]').forEach(button => button.addEventListener('click', () => {
    const id = button.dataset.id!;
    const action = button.dataset.action;
    const task = tasks.find(item => item.id === id);
    if (!task) return;
    if (action === 'edit') openModal(task);
    if (action === 'delete' && window.confirm(`Hapus tugas "${task.title}"?`)) {
      tasks = tasks.filter(item => item.id !== id);
      persist(); render(); showToast('Tugas berhasil dihapus.');
    }
    if (action === 'toggle') {
      task.status = task.status === 'Selesai' ? 'Belum Selesai' : 'Selesai';
      persist(); render(); showToast(task.status === 'Selesai' ? 'Yeay! Tugas selesai ♡' : 'Status tugas diperbarui.');
    }
  }));
  document.querySelector('#task-form')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const title = String(data.get('title') ?? '').trim();
    const subject = String(data.get('subject') ?? '').trim();
    const deadline = String(data.get('deadline') ?? '');
    const error = document.querySelector<HTMLParagraphElement>('#form-error')!;
    if (!title || !subject || !deadline) {
      error.textContent = 'Nama tugas, mata kuliah, dan deadline wajib diisi.';
      return;
    }
    const values = {
      title, subject, deadline,
      description: String(data.get('description') ?? '').trim(),
      priority: String(data.get('priority') ?? 'Sedang') as Priority
    };
    if (editingId) {
      const existing = tasks.find(task => task.id === editingId);
      if (existing) Object.assign(existing, values);
      showToast('Tugas berhasil diperbarui ♡');
    } else {
      tasks.unshift({ id: crypto.randomUUID(), ...values, status: 'Belum Selesai', createdAt: new Date().toISOString() });
      showToast('Tugas baru berhasil ditambahkan ♡');
    }
    persist(); closeModal(); render();
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); }, { once: true });
}

render();
