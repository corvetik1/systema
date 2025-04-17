// src/features/accounting/store/reports/slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Report, ReportFilters, DebtItem, BalanceItem, ProfitLossItem } from '../../types/report';

interface ReportsState {
  reports: Report[];
  debtReport: {
    data: DebtItem[];
    period: string;
  };
  balanceReport: {
    data: BalanceItem[];
    period: string;
  };
  profitLossReport: {
    data: ProfitLossItem[];
    period: string;
  };
  filters: ReportFilters;
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: ReportsState = {
  reports: [
    {
      id: 1,
      name: 'Отчет по продажам Q3',
      date: '2023-10-01',
      type: 'debt',
      status: 'completed',
    },
    {
      id: 2,
      name: 'Финансовый отчет за сентябрь',
      date: '2023-09-30',
      type: 'balance',
      status: 'pending',
    },
    {
      id: 3,
      name: 'Аналитический отчет по регионам',
      date: '2023-10-05',
      type: 'profitLoss',
      status: 'failed',
    },
  ],
  debtReport: {
    data: [
      { id: 1, counterparty: 'ООО Рога и Копыта', amount: 300000, date: '2023-09-15', status: 'overdue' },
      { id: 2, counterparty: 'ИП Иванов', amount: 150000, date: '2023-10-05', status: 'on-time' },
      { id: 3, counterparty: 'ЗАО Пример', amount: 220000, date: '2023-09-30', status: 'pending' },
      { id: 4, counterparty: 'ООО СтройТех', amount: 450000, date: '2023-08-20', status: 'overdue' },
      { id: 5, counterparty: 'ИП Петров', amount: 80000, date: '2023-10-10', status: 'on-time' },
      { id: 6, counterparty: 'ООО Альфа', amount: 175000, date: '2023-09-25', status: 'pending' },
      { id: 7, counterparty: 'ЗАО Вектор', amount: 320000, date: '2023-07-15', status: 'overdue' },
      { id: 8, counterparty: 'ООО Горизонт', amount: 95000, date: '2023-10-01', status: 'on-time' },
    ],
    period: 'year',
  },
  balanceReport: {
    data: [
      { article: 'Активы', amount: 2500000 },
      { article: 'Пассивы', amount: 2000000 },
      { article: 'Капитал', amount: 500000 },
    ],
    period: 'year',
  },
  profitLossReport: {
    data: [
      { article: 'Выручка', amount: 5000000 },
      { article: 'Себестоимость', amount: 3200000 },
      { article: 'Валовая прибыль', amount: 1800000 },
      { article: 'Операционные расходы', amount: 800000 },
      { article: 'Операционная прибыль', amount: 1000000 },
      { article: 'Прочие доходы', amount: 200000 },
      { article: 'Прочие расходы', amount: 150000 },
      { article: 'Чистая прибыль', amount: 1050000 },
    ],
    period: 'year',
  },
  filters: {
    filterDate: '',
    filterType: '',
    filterCounterparty: '',
  },
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

console.log('Reports initialState:', initialState);

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    fetchReports(state) {
      state.loading = true;
    },
    fetchReportsSuccess(state, action: PayloadAction<Report[]>) {
      state.reports = action.payload;
      state.loading = false;
      state.error = null;
      state.totalPages = Math.ceil(action.payload.length / 3);
    },
    fetchReportsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setFilters(state, action: PayloadAction<ReportFilters>) {
      state.filters = action.payload;
      state.page = 1;
    },
    setDebtPeriod(state, action: PayloadAction<string>) {
      state.debtReport.period = action.payload;
    },
    setBalancePeriod(state, action: PayloadAction<string>) {
      state.balanceReport.period = action.payload;
    },
    setProfitLossPeriod(state, action: PayloadAction<string>) {
      state.profitLossReport.period = action.payload;
    },
  },
});

export const {
  fetchReports,
  fetchReportsSuccess,
  fetchReportsFailure,
  setPage,
  setFilters,
  setDebtPeriod,
  setBalancePeriod,
  setProfitLossPeriod,
} = reportsSlice.actions;

export default reportsSlice.reducer;