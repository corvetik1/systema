// src/features/accounting/store/settings/slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  currency: 'RUB' | 'USD' | 'EUR';
  dateFormat: 'DD.MM.YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
  notifications: {
    email: boolean;
    push: boolean;
  };
}

const initialState: SettingsState = {
  currency: 'RUB',
  dateFormat: 'DD.MM.YYYY',
  notifications: {
    email: true,
    push: false,
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setCurrency(state, action: PayloadAction<'RUB' | 'USD' | 'EUR'>) {
      state.currency = action.payload;
    },
    setDateFormat(state, action: PayloadAction<'DD.MM.YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD'>) {
      state.dateFormat = action.payload;
    },
    setNotifications(state, action: PayloadAction<{ email?: boolean; push?: boolean }>) {
      state.notifications = { ...state.notifications, ...action.payload };
    },
  },
});

export const { setCurrency, setDateFormat, setNotifications } = settingsSlice.actions;
export default settingsSlice.reducer;