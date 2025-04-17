// src/features/accounting/components/analytics/SummaryCards.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PercentIcon from '@mui/icons-material/Percent';
import { MetricsGrid, SummaryCard, CardIcon, CardTitle, CardValue } from '../AccountingStyles';
import { RootState } from '../../../../app/store';

const SummaryCards: React.FC = () => {
  const { totalIncome, totalExpense, netProfit, taxesDue, taxShare } = useSelector(
    (state: RootState) => state.accounting?.analytics?.metrics || {
      totalIncome: 0,
      totalExpense: 0,
      netProfit: 0,
      taxesDue: 0,
      taxShare: 0,
    }
  );

  const cards = [
    {
      icon: <AttachMoneyIcon />,
      title: 'Общий доход',
      value: totalIncome.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' }),
      color: '#27ae60',
    },
    {
      icon: <MoneyOffIcon />,
      title: 'Общий расход',
      value: totalExpense.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' }),
      color: '#e74c3c',
    },
    {
      icon: <TrendingUpIcon />,
      title: 'Чистая прибыль',
      value: netProfit.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' }),
      color: '#27ae60',
    },
    {
      icon: <AccountBalanceWalletIcon />,
      title: 'Налоги к уплате',
      value: taxesDue.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' }),
      color: '#e74c3c',
    },
    {
      icon: <PercentIcon />,
      title: 'Доля налогов',
      value: `${taxShare.toFixed(1)}%`,
      color: '#3498db',
    },
  ];

  return (
    <MetricsGrid>
      {cards.map((card, index) => (
        <SummaryCard key={index}>
          <CardIcon>{card.icon}</CardIcon>
          <CardTitle>{card.title}</CardTitle>
          <CardValue sx={{ color: card.color }}>{card.value}</CardValue>
        </SummaryCard>
      ))}
    </MetricsGrid>
  );
};

export default SummaryCards;