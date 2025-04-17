// src/features/accounting/components/taxes/TaxSummary.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import {
  TaxSummaryCard,
  TaxSummaryTitle,
  TaxMetricsGrid,
  TaxMetricItem,
  TaxMetricIcon,
  TaxMetricLabel,
  TaxMetricValue,
} from '../AccountingStyles';
import { RootState } from '../../../../app/store';
import { selectTaxSummary } from '../../store/taxes/selectors';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const TaxSummary: React.FC = () => {
  const { totalTax, paidTax, dueTax } = useSelector((state: RootState) =>
    selectTaxSummary(state)
  );

  return (
    <TaxSummaryCard>
      <TaxSummaryTitle>Сводка налогов</TaxSummaryTitle>
      <TaxMetricsGrid>
        <TaxMetricItem>
          <TaxMetricIcon sx={{ color: '#34495e' }}>
            <AttachMoneyIcon fontSize="inherit" />
          </TaxMetricIcon>
          <TaxMetricLabel>Общая сумма</TaxMetricLabel>
          <TaxMetricValue sx={{ color: '#34495e' }}>
            {totalTax.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
          </TaxMetricValue>
        </TaxMetricItem>
        <TaxMetricItem>
          <TaxMetricIcon sx={{ color: '#27ae60' }}>
            <CheckCircleOutlineIcon fontSize="inherit" />
          </TaxMetricIcon>
          <TaxMetricLabel>Уплачено</TaxMetricLabel>
          <TaxMetricValue sx={{ color: '#27ae60' }}>
            {paidTax.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
          </TaxMetricValue>
        </TaxMetricItem>
        <TaxMetricItem>
          <TaxMetricIcon sx={{ color: '#e74c3c' }}>
            <ErrorOutlineIcon fontSize="inherit" />
          </TaxMetricIcon>
          <TaxMetricLabel>К уплате</TaxMetricLabel>
          <TaxMetricValue sx={{ color: '#e74c3c' }}>
            {dueTax.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
          </TaxMetricValue>
        </TaxMetricItem>
      </TaxMetricsGrid>
    </TaxSummaryCard>
  );
};

export default TaxSummary;