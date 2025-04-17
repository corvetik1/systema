// src/features/accounting/store/kudir/slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KUDIRRecord, KUDIRFilters } from './types';

interface KUDIRState {
  records: KUDIRRecord[];
  filters: KUDIRFilters;
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: KUDIRState = {
  records: [
    {
      id: 1,
      date: '2023-10-01',
      recordNumber: 'KR-001',
      amount: 10000,
      type: 'income',
      description: 'Приход товара',
    },
    {
      id: 2,
      date: '2023-10-03',
      recordNumber: 'KR-002',
      amount: 15500,
      type: 'expense',
      description: 'Расход по доставке',
    },
    {
      id: 3,
      date: '2023-10-05',
      recordNumber: 'KR-003',
      amount: 8750,
      type: 'income',
      description: 'Корректировка',
    },
    {
      id: 4,
      date: '2023-10-07',
      recordNumber: 'KR-004',
      amount: 12300,
      type: 'expense',
      description: 'Возврат товара',
    },
    {
      id: 5,
      date: '2023-10-10',
      recordNumber: 'KR-005',
      amount: 20000,
      type: 'income',
      description: 'Оприходование',
    },
  ],
  filters: {
    dateFrom: '',
    dateTo: '',
    sumFrom: undefined,
    sumTo: undefined,
    category: '',
  },
  page: 1,
  totalPages: 2, // 5 записей, 3 на страницу
  loading: false,
  error: null,
};

const kudirSlice = createSlice({
  name: 'kudir',
  initialState,
  reducers: {
    setKUDIRPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setKUDIRFilters(state, action: PayloadAction<KUDIRFilters>) {
      state.filters = action.payload;
      state.page = 1;
    },
  },
});

export const { setKUDIRPage, setKUDIRFilters } = kudirSlice.actions;

export default kudirSlice.reducer;