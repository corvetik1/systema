// src/features/accounting/store/counterparties/thunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Counterparty } from '../../types/counterparty';

export const fetchCounterparties = createAsyncThunk(
  'counterparties/fetchCounterparties',
  async (_, { rejectWithValue }) => {
    try {
      // Здесь будет API-запрос, пока используем моковые данные
      return []; // Пустой массив, так как данные уже в initialState
    } catch (error) {
      return rejectWithValue('Ошибка загрузки контрагентов');
    }
  }
);