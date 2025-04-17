// Глобальные типы приложения

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export type ID = string | number;
