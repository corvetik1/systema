// src/features/accounting/store/index.ts
import { combineReducers } from '@reduxjs/toolkit';
import analyticsReducer from './analytics/slice';
import settingsReducer from './settings/slice';
import documentsReducer from './documents/slice';
import transactionsReducer from './transactions/slice';
import counterpartiesReducer from './counterparties/slice';
import taxesReducer from './taxes/slice';
import reportsReducer from './reports/slice';
import kudirReducer from './kudir/slice';

const accountingReducer = combineReducers({
  analytics: analyticsReducer,
  settings: settingsReducer,
  documents: documentsReducer,
  transactions: transactionsReducer,
  counterparties: counterpartiesReducer,
  taxes: taxesReducer,
  reports: reportsReducer,
  kudir: kudirReducer,
});

export default accountingReducer;