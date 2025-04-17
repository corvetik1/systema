// src/features/accounting/types/transaction.ts
export interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  date: string;
  category: string;
  counterpartyId: number;
  description?: string;
  status: 'completed' | 'pending';
}