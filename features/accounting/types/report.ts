// src/features/accounting/types/report.ts
export interface Report {
  id: number;
  name: string;
  date: string;
  type: 'balance' | 'profitLoss' | 'debt';
  status: 'completed' | 'pending' | 'failed';
}

export interface DebtItem {
  id: number;
  counterparty: string;
  amount: number;
  date: string;
  status: 'overdue' | 'on-time' | 'pending';
}

export interface BalanceItem {
  article: string;
  amount: number;
}

export interface ProfitLossItem {
  article: string;
  amount: number;
}

export interface ReportFilters {
  filterDate: string;
  filterType: string;
  filterCounterparty: string;
}