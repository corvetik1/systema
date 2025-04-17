// src/features/accounting/components/AccountingPage.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DrawerContainer, Content } from './AccountingStyles';
import DrawerMenu from '../common/DrawerMenu';
import ErrorBoundary from './common/ErrorBoundary';
import Analytics from './Analytics/Analytics';
import CounterpartyList from './counterparties/CounterpartyList';
import TransactionList from './transactions/TransactionList';
import DocumentList from './documents/DocumentList';
import TaxList from './taxes/TaxList';
import ReportList from './reports/ReportList';
import DebtReport from './reports/DebtReport';
import BalanceReport from './reports/BalanceReport';
import ProfitLossReport from './reports/ProfitLossReport';
import KUDIRTable from './kudir/KUDIRTable';
import Settings from './settings/Settings';
import InvoiceForm from './documents/InvoiceForm';

const AccountingPage: React.FC = () => {
  return (
    <DrawerContainer>
      <DrawerMenu />
      <Content>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Analytics />} />
            <Route path="counterparties" element={<CounterpartyList />} />
            <Route path="transactions" element={<TransactionList />} />
            <Route path="documents" element={<DocumentList />} />
            <Route path="documents/new" element={<InvoiceForm />} />
            <Route path="taxes" element={<TaxList />} />
            <Route path="reports" element={<ReportList />} />
            <Route path="reports/debt" element={<DebtReport />} />
            <Route path="reports/balance" element={<BalanceReport />} />
            <Route path="reports/profit-loss" element={<ProfitLossReport />} />
            <Route path="kudir" element={<KUDIRTable />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </ErrorBoundary>
      </Content>
    </DrawerContainer>
  );
};

export default AccountingPage;