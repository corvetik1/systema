// src/features/accounting/store/transactions/slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction, TransactionFilters } from './types';

interface TransactionsState {
  transactions: Transaction[];
  filter: TransactionFilters;
  sort: {
    field: keyof Transaction;
    direction: 'asc' | 'desc';
  };
  page: number;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: TransactionsState = {
  transactions: [
    {
      id: 1,
      type: 'income',
      amount: 50000,
      date: '2023-10-01',
      category: 'Продажи',
      counterpartyId: 1,
      description: 'Оплата за товары',
      status: 'completed',
    },
    {
      id: 2,
      type: 'expense',
      amount: 20000,
      date: '2023-10-02',
      category: 'Сырье',
      counterpartyId: 2,
      description: 'Покупка материалов',
      status: 'pending',
    },
    {
      id: 3,
      type: 'income',
      amount: 75000,
      date: '2023-10-03',
      category: 'Услуги',
      counterpartyId: 3,
      description: 'Оплата за услуги',
      status: 'completed',
    },
    {
      id: 4,
      type: 'expense',
      amount: 30000,
      date: '2023-10-04',
      category: 'Налоги',
      counterpartyId: 4,
      description: 'Уплата налогов',
      status: 'completed',
    },
    {
      id: 5,
      type: 'income',
      amount: 100000,
      date: '2023-10-05',
      category: 'Продажи',
      counterpartyId: 5,
      description: 'Аванс по договору',
      status: 'pending',
    },
  ],
  filter: {
    type: '',
    category: '',
    counterpartyId: '',
    dateFrom: '',
    dateTo: '',
    status: '',
  },
  sort: {
    field: 'date',
    direction: 'desc',
  },
  page: 1,
  hasMore: true,
  loading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    fetchTransactions(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTransactionsSuccess(state, action: PayloadAction<Transaction[]>) {
      state.transactions = action.payload;
      state.loading = false;
      state.page = 1;
      state.hasMore = action.payload.length > 0;
    },
    fetchTransactionsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    loadMoreTransactions(state) {
      state.loading = true;
      state.error = null;
    },
    loadMoreTransactionsSuccess(state, action: PayloadAction<Transaction[]>) {
      state.transactions = [...state.transactions, ...action.payload];
      state.loading = false;
      state.page += 1;
      state.hasMore = action.payload.length > 0;
    },
    loadMoreTransactionsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addTransaction(state, action: PayloadAction<Omit<Transaction, 'id'>>) {
      state.transactions.push({
        ...action.payload,
        id: state.transactions.length ? Math.max(...state.transactions.map((t) => t.id)) + 1 : 1,
      });
    },
    updateTransaction(state, action: PayloadAction<Transaction>) {
      const index = state.transactions.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
    setFilter(state, action: PayloadAction<Partial<TransactionFilters>>) {
      state.filter = { ...state.filter, ...action.payload };
      state.page = 1;
    },
    resetFilters(state) {
      state.filter = initialState.filter;
      state.page = 1;
    },
    setSort(state, action: PayloadAction<{ field: keyof Transaction; direction: 'asc' | 'desc' }>) {
      state.sort = action.payload;
    },
  },
});

export const {
  fetchTransactions,
  fetchTransactionsSuccess,
  fetchTransactionsFailure,
  loadMoreTransactions,
  loadMoreTransactionsSuccess,
  loadMoreTransactionsFailure,
  addTransaction,
  updateTransaction,
  setFilter,
  resetFilters,
  setSort,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;