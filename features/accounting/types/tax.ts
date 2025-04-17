// src/features/accounting/types/tax.ts
export interface Tax {
  id: number;
  name: string;
  amount: number;
  paymentDate: string;
  taxType: string;
  status: 'overdue' | 'on-time' | 'pending';
}