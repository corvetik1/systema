// src/features/accounting/store/transactions/selectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store';
import { Transaction } from './types';

const selectTransactionsState = (state: RootState) => state.accounting?.transactions || {};

export const selectFilteredTransactions = createSelector(
  [selectTransactionsState],
  (transactionsState) => {
    const { transactions, filter, sort } = transactionsState;

    let filtered = [...transactions];

    // Применение фильтров
    if (filter.dateFrom) {
      filtered = filtered.filter((t) => filter.dateFrom ? new Date(t.date) >= new Date(filter.dateFrom as string) : true);
    }
    if (filter.dateTo) {
      filtered = filtered.filter((t) => filter.dateTo ? new Date(t.date) <= new Date(filter.dateTo as string) : true);
    }
    if (filter.type) {
      filtered = filtered.filter((t) => t.type === filter.type);
    }
    if (filter.category) {
      filtered = filtered.filter((t) => t.category && filter.category && t.category.toLowerCase().includes(filter.category.toLowerCase()));
    }
    if (filter.counterpartyId) {
      filtered = filtered.filter((t) => t.counterpartyId.toString() === filter.counterpartyId);
    }
    if (filter.status) {
      filtered = filtered.filter((t) => t.status === filter.status);
    }

    // Сортировка
    filtered.sort((a, b) => {
      let aValue: any = a[sort.field];
      let bValue: any = b[sort.field];

      if (sort.field === 'amount') {
        aValue = a.amount;
        bValue = b.amount;
      } else if (sort.field === 'date') {
        aValue = new Date(a.date);
        bValue = new Date(b.date);
      } else if (sort.field === 'counterpartyId') {
        aValue = a.counterpartyId;
        bValue = b.counterpartyId;
      } else {
        aValue = aValue?.toLowerCase() || '';
        bValue = bValue?.toLowerCase() || '';
      }

      if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }
);

export const selectTransactionSummary = createSelector(
  [selectTransactionsState],
  (transactionsState) => {
    const { transactions = [] } = transactionsState;
    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpense;

    return { totalIncome, totalExpense, balance };
  }
);