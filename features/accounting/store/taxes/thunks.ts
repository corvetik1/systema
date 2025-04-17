// src/features/accounting/store/taxes/thunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Tax } from '../../types/tax';

export const fetchTaxes = createAsyncThunk(
  'taxes/fetchTaxes',
  async (_, { rejectWithValue }) => {
    try {
      // Здесь будет API-запрос, пока используем моковые данные
      return []; // Пустой массив, так как данные уже в initialState
    } catch (error) {
      return rejectWithValue('Ошибка загрузки налогов');
    }
  }
);