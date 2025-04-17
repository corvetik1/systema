// src/app/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import TendersPage from '../features/tenders/components/TendersPage';
import FinancePage from '../features/finance/components/FinancePage';
import HomePage from '../features/home/components/HomePage';
import AccountingPage from '../features/accounting/components/AccountingPage';
import NotesPage from '../features/notes/components/NotesPage';
import GalleryPage from '../features/gallery/components/GalleryPage';
import InvestmentsPage from '../features/investments/components/InvestmentsPage';
import AnalyticsPage from '../features/analytics/components/AnalyticsPage';
import UserManagementPage from '../features/users/components/UserManagementPage';
import { store } from 'app/store';

const App: React.FC = () => {
  const handleLogout = async () => {
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <Routes>
        <Route element={<AppLayout onLogout={handleLogout} />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/tenders" element={<TendersPage />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="/accounting/*" element={<AccountingPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/investments" element={<InvestmentsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/users" element={<UserManagementPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;