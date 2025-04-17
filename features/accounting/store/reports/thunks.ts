// src/features/accounting/store/reports/thunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Report } from '../../types/report';

export const fetchReports = createAsyncThunk(
  'reports/fetchReports',
  async (_, { rejectWithValue }) => {
    try {
      // Здесь будет API-запрос, пока используем моковые данные
      return [];
    } catch (error) {
      return rejectWithValue('Ошибка загрузки отчетов');
    }
  }
);