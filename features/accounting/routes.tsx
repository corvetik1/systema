// src/features/accounting/routes.tsx
import { RouteObject } from 'react-router-dom';
import AccountingPage from './components/AccountingPage';

export const accountingRoutes: RouteObject[] = [
  {
    path: 'accounting',
    element: <AccountingPage />,
  },
];