// src/features/accounting/store/transactions/types.ts
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

export interface TransactionFilters {
  type?: string;
  category?: string;
  counterpartyId?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: string;
}