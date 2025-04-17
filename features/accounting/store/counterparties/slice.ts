// src/features/accounting/store/counterparties/slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Counterparty } from '../../types/counterparty';

interface CounterpartyState {
  counterparties: Counterparty[];
  filters: {
    name: string;
    inn: string;
    status: string;
  };
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: CounterpartyState = {
  counterparties: [
    {
      id: 1,
      name: 'ООО Рога и Копыта',
      inn: '7701234567',
      contactPerson: 'Иванов Иван',
      phone: '+7 495 123-45-67',
      email: 'info@rogakopyta.ru',
      address: 'Москва, ул. Примерная, 1',
      details: 'Расчётный счёт: 40702810000000012345',
      status: 'active',
    },
    {
      id: 2,
      name: 'ИП Петров Петр',
      inn: '7707654321',
      contactPerson: 'Петров Петр',
      phone: '+7 495 234-56-78',
      email: 'petrov@example.com',
      address: 'Москва, ул. Тестовая, 2',
      details: 'Расчётный счёт: 40702810000000067890',
      status: 'active',
    },
    {
      id: 3,
      name: 'ЗАО Пример',
      inn: '7709876543',
      contactPerson: 'Сидоров Сидор',
      phone: '+7 495 345-67-89',
      email: 'sidorov@primer.ru',
      address: 'Москва, ул. Образцовая, 3',
      details: 'Расчётный счёт: 40702810000000054321',
      status: 'inactive',
    },
    {
      id: 4,
      name: 'ООО Новые Технологии',
      inn: '7701357924',
      contactPerson: 'Смирнов Алексей',
      phone: '+7 495 456-78-90',
      email: 'smirnov@newtech.ru',
      address: 'Москва, ул. Инновационная, 4',
      details: 'Расчётный счёт: 40702810000000098765',
      status: 'active',
    },
    {
      id: 5,
      name: 'АО Прогресс',
      inn: '7702468135',
      contactPerson: 'Козлов Михаил',
      phone: '+7 495 567-89-01',
      email: 'kozlov@progress.ru',
      address: 'Москва, ул. Развития, 5',
      details: 'Расчётный счёт: 40702810000000043210',
      status: 'active',
    },
    {
      id: 6,
      name: 'ООО Успех',
      inn: '7701122334',
      contactPerson: 'Лебедев Сергей',
      phone: '+7 495 678-90-12',
      email: 'lebedev@uspeh.ru',
      address: 'Москва, ул. Победы, 6',
      details: 'Расчётный счёт: 40702810000000087654',
      status: 'inactive',
    },
  ],
  filters: {
    name: '',
    inn: '',
    status: '',
  },
  sortBy: 'name',
  sortOrder: 'asc',
  page: 1,
  totalPages: 2, // 6 записей по 3 на страницу
  loading: false,
  error: null,
};

const counterpartiesSlice = createSlice({
  name: 'counterparties',
  initialState,
  reducers: {
    fetchCounterparties(state) {
      state.loading = true;
    },
    fetchCounterpartiesSuccess(state, action: PayloadAction<Counterparty[]>) {
      state.counterparties = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchCounterpartiesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setFilter(state, action: PayloadAction<{ field: string; value: string }>) {
      state.filters[action.payload.field as keyof typeof state.filters] = action.payload.value;
      state.page = 1; // Сброс на первую страницу при изменении фильтров
    },
    resetFilters(state) {
      state.filters = { name: '', inn: '', status: '' };
      state.page = 1;
    },
    setSort(state, action: PayloadAction<{ field: string; order: 'asc' | 'desc' }>) {
      state.sortBy = action.payload.field;
      state.sortOrder = action.payload.order;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    addCounterparty(state, action: PayloadAction<Omit<Counterparty, 'id'>>) {
      const newCounterparty = {
        ...action.payload,
        id: state.counterparties.length + 1,
      };
      state.counterparties.push(newCounterparty);
      state.totalPages = Math.ceil(state.counterparties.length / 3);
    },
    updateCounterparty(state, action: PayloadAction<Counterparty>) {
      const index = state.counterparties.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.counterparties[index] = action.payload;
      }
    },
  },
});

export const {
  fetchCounterparties,
  fetchCounterpartiesSuccess,
  fetchCounterpartiesFailure,
  setFilter,
  resetFilters,
  setSort,
  setPage,
  addCounterparty,
  updateCounterparty,
} = counterpartiesSlice.actions;

export default counterpartiesSlice.reducer;