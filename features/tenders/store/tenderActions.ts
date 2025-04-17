// src/features/tenders/tenderActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api'; // Исправлен путь импорта
// import logger from '../../utils/logger'; // Файл ts отсутствует, убираем импорт
import { setLoading, setError, addTenderRealtime, updateTenderRealtime, deleteTenderRealtime } from './tendersSlice';
import { Budget, Tender } from './tendersSlice';

// Загрузка всех тендеров
export const fetchTenders = createAsyncThunk<Tender[], void, { rejectValue: string }>(
  'tenders/fetchTenders',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const response = await api.getTenders();
      // Очистка данных для соответствия интерфейсу Tender
      const cleanedData = response.map((tender: any) => ({
        ...tender,
        winner_price: tender.winner_price || '',
        winner_name: tender.winner_name || '',
        risk_card: tender.risk_card || '',
        contract_security: tender.contract_security || '',
        platform_fee: tender.platform_fee || '',
      }));
      
      return cleanedData;
    } catch (error: any) {
      const errorMessage = error.error || error.message || 'Неизвестная ошибка';
      
      dispatch(setError({ key: 'fetch', message: errorMessage })); // Уточнён вызов setError
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Добавление нового тендера
export const addTender = createAsyncThunk<Tender, Tender, { rejectValue: string }>(
  'tenders/addTender',
  async (tenderData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const response = await api.addTender(tenderData);
      dispatch(addTenderRealtime(response));
      
      return response;
    } catch (error: any) {
      const errorMessage = error.error || error.message || 'Неизвестная ошибка';
      
      dispatch(setError({ key: 'add', message: errorMessage })); // Уточнён вызов setError
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Обновление существующего тендера
export const updateTender = createAsyncThunk<Tender, { id: number; tenderData: Partial<Tender> }, { rejectValue: string }>(
  'tenders/updateTender',
  async ({ id, tenderData }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const response = await api.updateTender(id, tenderData);
      dispatch(updateTenderRealtime(response));
      
      return response;
    } catch (error: any) {
      const errorMessage = error.error || error.message || 'Неизвестная ошибка';
      
      dispatch(setError({ key: 'update', message: errorMessage })); // Уточнён вызов setError
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Удаление тендера
export const deleteTender = createAsyncThunk<number, number, { rejectValue: string }>(
  'tenders/deleteTender',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      await api.deleteTender(id);
      dispatch(deleteTenderRealtime(id));
      
      return id;
    } catch (error: any) {
      const errorMessage = error.error || error.message || 'Неизвестная ошибка';
      
      dispatch(setError({ key: 'delete', message: errorMessage })); // Уточнён вызов setError
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Загрузка бюджета тендера
export const fetchTenderBudget = createAsyncThunk<{ tenderId: number; budget: Budget }, number, { rejectValue: string }>(
  'tenders/fetchTenderBudget',
  async (tenderId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const response = await api.getTenderBudget(tenderId);
      const budget: Budget = {
        available: response.amount || '0',
        reserved: 0, // Значения reserved и spent не возвращаются API, оставляем 0
        spent: 0,
      };
      
      return { tenderId, budget };
    } catch (error: any) {
      const errorMessage = error.error || error.message || 'Неизвестная ошибка';
      
      dispatch(setError({ key: 'fetchBudget', message: errorMessage })); // Уточнён вызов setError
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Загрузка заметки в шапке
export const fetchHeaderNote = createAsyncThunk<string, void, { rejectValue: string }>(
  'tenders/fetchHeaderNote',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const response = await api.getHeaderNote();
      
      return response.content;
    } catch (error: any) {
      const errorMessage = error.error || error.message || 'Неизвестная ошибка';
      
      dispatch(setError({ key: 'headerNote', message: errorMessage })); // Уточнён вызов setError
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Обновление заметки в шапке
export const updateHeaderNote = createAsyncThunk<string, string, { rejectValue: string }>(
  'tenders/updateHeaderNote',
  async (content, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const response = await api.saveHeaderNote(content); // Исправлено на saveHeaderNote
      
      return response.content;
    } catch (error: any) {
      const errorMessage = error.error || error.message || 'Неизвестная ошибка';
      
      dispatch(setError({ key: 'headerNoteUpdate', message: errorMessage })); // Уточнён вызов setError
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  }
);