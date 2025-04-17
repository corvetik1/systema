// src/features/accounting/store/index.ts
import { combineReducers } from '@reduxjs/toolkit';
import analyticsReducer from './analytics/slice';
// Другие слайсы 
import counterpartiesReducer from './counterparties/slice';
import transactionsReducer from './transactions/slice';
import documentsReducer from './documents/slice';
import taxesReducer from './taxes/slice';
import reportsReducer from './reports/slice';
import kudirReducer from './kudir/slice';

const accountingReducer = combineReducers({
  analytics: analyticsReducer,
  counterparties: counterpartiesReducer,
  transactions: transactionsReducer,
  documents: documentsReducer,
  taxes: taxesReducer,
  reports: reportsReducer,
  kudir: kudirReducer,
});

export default accountingReducer;