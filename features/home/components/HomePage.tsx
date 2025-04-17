import React from 'react';
import { Box } from '@mui/material';
import TenderDashboardBlock from './TenderDashboardBlock';
import AccountingDashboardBlock from './AccountingDashboardBlock';
import InvestmentsDashboardBlock from './InvestmentsDashboardBlock';
import AnalyticsDashboardBlock from './AnalyticsDashboardBlock';
import NotesDashboardBlock from './NotesDashboardBlock';
import FinanceDashboardBlock from './FinanceDashboardBlock';

const HomePage: React.FC = () => (
  <Box sx={{ p: { xs: 2, md: 6 }, maxWidth: '1200px', mx: 'auto' }}>
    <TenderDashboardBlock />
    <AccountingDashboardBlock />
    <FinanceDashboardBlock />
    <InvestmentsDashboardBlock />
    <AnalyticsDashboardBlock />
    <NotesDashboardBlock />
  </Box>
);

export default HomePage;
