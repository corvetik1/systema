import analyticsReducer from './analytics/slice';
import settingsReducer from './settings/slice';
import documentsReducer from './documents/slice';
import transactionsReducer from './transactions/slice';
import counterpartiesReducer from './counterparties/slice';
import taxesReducer from './taxes/slice';
import reportsReducer from './reports/slice';
import kudirReducer from './kudir/slice';

export interface AccountingState {
  analytics: ReturnType<typeof analyticsReducer>;
  settings: ReturnType<typeof settingsReducer>;
  documents: ReturnType<typeof documentsReducer>;
  transactions: ReturnType<typeof transactionsReducer>;
  counterparties: ReturnType<typeof counterpartiesReducer>;
  taxes: ReturnType<typeof taxesReducer>;
  reports: ReturnType<typeof reportsReducer>;
  kudir: ReturnType<typeof kudirReducer>;
}
