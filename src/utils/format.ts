export function formatDate(value: string): string {
  if (!value) return 'Tanpa deadline';
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    .format(new Date(`${value}T00:00:00`));
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[char] ?? char);
}
