// Contoh generic sederhana: tipe data masukan dan keluaran tetap konsisten.
export function identity<T>(value: T): T {
  return value;
}

// Contoh penggunaan:
// identity<string>('TaskMate');
// identity<number>(3);
