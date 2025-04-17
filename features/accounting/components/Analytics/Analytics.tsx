// src/features/accounting/components/analytics/Analytics.tsx
import React from 'react';
import { Typography } from '@mui/material';
import SummaryCards from './SummaryCards';
import Charts from './Charts';
import { AnalyticsContainer, AnalyticsTitle } from '../AccountingStyles';

const Analytics: React.FC = () => {
  return (
    <AnalyticsContainer>
      <AnalyticsTitle>Аналитика бухгалтерии</AnalyticsTitle>
      <SummaryCards />
      <Charts />
    </AnalyticsContainer>
  );
};

export default Analytics;