// src/features/accounting/types/document.ts
export interface Document {
  id: number;
  number: string;
  date: string;
  type: string;
  contractor: string;
  amount: string;
  url: string;
}