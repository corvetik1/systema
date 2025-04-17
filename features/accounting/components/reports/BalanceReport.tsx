// src/features/accounting/components/reports/BalanceReport.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Table, TableBody, TableHead, TableRow, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  ReportContainer,
  ReportHeader,
  ReportTitle,
  ReportPeriodSelector,
  ReportPeriodLabel,
  ReportPeriodSelect,
  ReportContent,
  ReportTableSection,
  ReportTableSectionTitle,
  ReportTableContainer,
  ReportTableHeader,
  ReportTableCell,
  ReportChartSection,
  ReportChartSectionTitle,
  ReportChartCanvas,
  ReportPagination,
  ReportPageButton,
} from '../AccountingStyles';
import ErrorBoundary from '../common/ErrorBoundary';
import { RootState } from '../../../../app/store';
import { selectBalanceReport } from '../../store/reports/selectors';
import { setBalancePeriod } from '../../store/reports/slice';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BalanceReport: React.FC = () => {
  const dispatch = useDispatch();
  const balanceReport = useSelector((state: RootState) => selectBalanceReport(state));
  console.log('BalanceReport balanceReport:', balanceReport); // Отладочный лог

  const data = balanceReport?.data || [];
  const period = balanceReport?.period || 'year';

  useEffect(() => {
    // Здесь можно добавить загрузку данных, если нужно
  }, [dispatch]);

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setBalancePeriod(e.target.value));
  };

  const chartData = {
    labels: data.map((item) => item.article),
    datasets: [
      {
        label: 'Сумма (₽)',
        data: data.map((item) => item.amount),
        backgroundColor: '#3498db',
        borderColor: '#2980b9',
        borderWidth: 1,
      },
    ],
  };

  return (
    <ErrorBoundary>
      <ReportContainer>
        <ReportHeader>
          <ReportTitle>Отчет по балансу</ReportTitle>
          <ReportPeriodSelector>
            <ReportPeriodLabel>Период:</ReportPeriodLabel>
            <ReportPeriodSelect value={period} onChange={handlePeriodChange}>
              <option value="week">Неделя</option>
              <option value="month">Месяц</option>
              <option value="year">Год</option>
            </ReportPeriodSelect>
          </ReportPeriodSelector>
        </ReportHeader>
        <ReportContent>
          <ReportTableSection>
            <ReportTableSectionTitle>Баланс (Таблица)</ReportTableSectionTitle>
            <ReportTableContainer component="div">
              <Table>
                <TableHead>
                  <TableRow>
                    <ReportTableHeader>Статья</ReportTableHeader>
                    <ReportTableHeader>Сумма (₽)</ReportTableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.length > 0 ? (
                    data.map((item) => (
                      <TableRow key={item.article}>
                        <ReportTableCell>{item.article}</ReportTableCell>
                        <ReportTableCell>
                          {item.amount.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
                        </ReportTableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <ReportTableCell colSpan={2} style={{ textAlign: 'center' }}>
                        Нет данных
                      </ReportTableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ReportTableContainer>
            <ReportPagination>
              <ReportPageButton className="active">1</ReportPageButton>
              <ReportPageButton>2</ReportPageButton>
              <ReportPageButton>3</ReportPageButton>
            </ReportPagination>
          </ReportTableSection>
          <ReportChartSection>
            <ReportChartSectionTitle>Структура баланса</ReportChartSectionTitle>
            <ReportChartCanvas>
              <Bar data={chartData} options={{ responsive: true }} />
            </ReportChartCanvas>
          </ReportChartSection>
        </ReportContent>
      </ReportContainer>
    </ErrorBoundary>
  );
};

export default BalanceReport;