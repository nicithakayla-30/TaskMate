
// 1. Primitive Types
export const studentName: string = "Kayla";
export const studentAge: number = 20;
export const isStudent: boolean = true;

// 2. Array
export const subjects: string[] = [
  "Pemrograman Web",
  "Basis Data",
  "Pemrograman Mobile",
];

// 3. Interface
export interface Student {
  name: string;
  age: number;
  major: string;
}

// 4. Type Alias dan Union Type
export type TaskStatus = "Pending" | "Completed" | "In Progress";

// 5. Generic Function
export function getData<T>(data: T): T {
  return data;
}
