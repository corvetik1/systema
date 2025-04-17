// src/features/accounting/store/transactions/thunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Transaction } from './types';

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (_, { rejectWithValue }) => {
    try {
      // Возвращаем начальные демо-данные
      return [
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
      ];
    } catch (error) {
      return rejectWithValue('Ошибка загрузки транзакций');
    }
  }
);

export const loadMoreTransactions = createAsyncThunk(
  'transactions/loadMoreTransactions',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any;
      const page = state.accounting.transactions.page;
      // Моковые данные для пагинации
      const newTransactions: Transaction[] = page < 3 ? [
        {
          id: 100 + page,
          type: page % 2 === 0 ? 'income' : 'expense',
          amount: page % 2 === 0 ? 18000 : 7000,
          date: `2023-10-${10 + page}`,
          category: page % 2 === 0 ? 'Продажи' : 'Сырье',
          counterpartyId: page % 2 === 0 ? 6 : 7,
          description: page % 2 === 0 ? 'Дополнительный доход' : 'Дополнительный расход',
          status: 'completed',
        },
      ] : [];
      return newTransactions;
    } catch (error) {
      return rejectWithValue('Ошибка загрузки дополнительных транзакций');
    }
  }
);