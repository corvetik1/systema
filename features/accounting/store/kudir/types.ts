// src/features/accounting/store/kudir/types.ts
export interface KUDIRRecord {
  id: number;
  date: string;
  recordNumber: string;
  amount: number;
  type: 'income' | 'expense';
  description: string;
}

export interface KUDIRFilters {
  dateFrom?: string;
  dateTo?: string;
  sumFrom?: number;
  sumTo?: number;
  category?: string;
}