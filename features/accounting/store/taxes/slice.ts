// src/features/accounting/store/taxes/slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tax } from '../../types/tax';

interface TaxesState {
  taxes: Tax[];
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: TaxesState = {
  taxes: [
    {
      id: 1,
      name: 'НДС',
      amount: 500000,
      paymentDate: '2023-09-30',
      taxType: 'nds',
      status: 'overdue',
    },
    {
      id: 2,
      name: 'Налог на прибыль',
      amount: 300000,
      paymentDate: '2023-11-15',
      taxType: 'profitTax',
      status: 'on-time',
    },
    {
      id: 3,
      name: 'Налог на имущество',
      amount: 150000,
      paymentDate: '2023-10-15',
      taxType: 'propertyTax',
      status: 'pending',
    },
    {
      id: 4,
      name: 'Акцизный сбор',
      amount: 200000,
      paymentDate: '2023-10-05',
      taxType: 'excise',
      status: 'overdue',
    },
  ],
  page: 1,
  totalPages: 1, // 4 записи на 1 странице
  loading: false,
  error: null,
};

const taxesSlice = createSlice({
  name: 'taxes',
  initialState,
  reducers: {
    fetchTaxes(state) {
      state.loading = true;
    },
    fetchTaxesSuccess(state, action: PayloadAction<Tax[]>) {
      state.taxes = action.payload;
      state.loading = false;
      state.error = null;
      state.totalPages = Math.ceil(action.payload.length / 4);
    },
    fetchTaxesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    addTax(state, action: PayloadAction<Omit<Tax, 'id' | 'status'>>) {
      const newTax: Tax = {
        ...action.payload,
        id: state.taxes.length + 1,
        status: new Date(action.payload.paymentDate) < new Date() ? 'overdue' : 'pending',
      };
      state.taxes.push(newTax);
      state.totalPages = Math.ceil(state.taxes.length / 4);
    },
    updateTax(state, action: PayloadAction<Tax>) {
      const index = state.taxes.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.taxes[index] = {
          ...action.payload,
          status:
            new Date(action.payload.paymentDate) < new Date() ? 'overdue' : 'pending',
        };
      }
    },
  },
});

export const {
  fetchTaxes,
  fetchTaxesSuccess,
  fetchTaxesFailure,
  setPage,
  addTax,
  updateTax,
} = taxesSlice.actions;

export default taxesSlice.reducer;