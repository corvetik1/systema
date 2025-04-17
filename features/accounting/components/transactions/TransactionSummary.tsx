// src/features/accounting/components/transactions/TransactionSummary.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import {
  TransactionSummaryCard,
  TransactionSummaryTitle,
  TransactionMetricsGrid,
  TransactionMetric,
  TransactionMetricLabel,
  TransactionMetricValue,
  TransactionIncome,
  TransactionExpense,
  TransactionBalance,
} from '../AccountingStyles';
import { RootState } from '../../../../app/store';
import { selectTransactionSummary } from '../../store/transactions/selectors';

const TransactionSummary: React.FC = () => {
  const { totalIncome, totalExpense, balance } = useSelector((state: RootState) =>
    selectTransactionSummary(state)
  );

  return (
    <TransactionSummaryCard>
      <TransactionSummaryTitle>Сводка транзакций</TransactionSummaryTitle>
      <TransactionMetricsGrid>
        <TransactionMetric>
          <TransactionMetricLabel>Общий доход</TransactionMetricLabel>
          <TransactionMetricValue>
            <TransactionIncome>
              {totalIncome.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
            </TransactionIncome>
          </TransactionMetricValue>
        </TransactionMetric>
        <TransactionMetric>
          <TransactionMetricLabel>Общий расход</TransactionMetricLabel>
          <TransactionMetricValue>
            <TransactionExpense>
              {totalExpense.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
            </TransactionExpense>
          </TransactionMetricValue>
        </TransactionMetric>
        <TransactionMetric>
          <TransactionMetricLabel>Баланс</TransactionMetricLabel>
          <TransactionMetricValue>
            <TransactionBalance>
              {balance.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
            </TransactionBalance>
          </TransactionMetricValue>
        </TransactionMetric>
      </TransactionMetricsGrid>
    </TransactionSummaryCard>
  );
};

export default TransactionSummary;