// src/features/accounting/types/counterparty.ts
export interface Counterparty {
  id: number;
  name: string;
  inn: string;
  contactPerson?: string;
  phone: string;
  email?: string;
  address?: string;
  details?: string;
  status: 'active' | 'inactive';
}