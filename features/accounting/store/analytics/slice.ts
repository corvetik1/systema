// src/features/accounting/store/analytics/slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChartData {
  labels: string[];
  income: number[];
  expense: number[];
  taxes: number[];
}

interface AnalyticsState {
  metrics: {
    totalIncome: number;
    totalExpense: number;
    netProfit: number;
    taxesDue: number;
    taxShare: number;
  };
  chartData: {
    week: ChartData;
    month: ChartData;
    year: ChartData;
  };
  selectedPeriod: 'week' | 'month' | 'year';
}

const initialState: AnalyticsState = {
  metrics: {
    totalIncome: 1200000,
    totalExpense: 800000,
    netProfit: 400000,
    taxesDue: 150000,
    taxShare: 12.5,
  },
  chartData: {
    week: {
      labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      income: [1200, 1500, 1100, 1800, 1700, 1400, 1600],
      expense: [800, 900, 700, 1200, 1100, 850, 950],
      taxes: [100, 120, 90, 150, 140, 110, 130],
    },
    month: {
      labels: ['1 неделя', '2 неделя', '3 неделя', '4 неделя'],
      income: [5000, 7000, 6500, 8000],
      expense: [3500, 4000, 3800, 4200],
      taxes: [400, 600, 550, 700],
    },
    year: {
      labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      income: [20000, 25000, 23000, 27000, 30000, 32000, 31000, 33000, 34000, 36000, 38000, 40000],
      expense: [15000, 18000, 17000, 19000, 21000, 23000, 22000, 24000, 25000, 26000, 28000, 30000],
      taxes: [2000, 2500, 2300, 2700, 3000, 3200, 3100, 3300, 3400, 3600, 3800, 4000],
    },
  },
  selectedPeriod: 'year',
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setPeriod(state, action: PayloadAction<'week' | 'month' | 'year'>) {
      state.selectedPeriod = action.payload;
    },
  },
});

export const { setPeriod } = analyticsSlice.actions;
export default analyticsSlice.reducer;