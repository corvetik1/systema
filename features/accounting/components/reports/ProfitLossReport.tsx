// src/features/accounting/components/reports/ProfitLossReport.tsx
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
} from '../AccountingStyles';
import ErrorBoundary from '../common/ErrorBoundary';
import { RootState } from '../../../../app/store';
import { selectProfitLossReport } from '../../store/reports/selectors';
import { setProfitLossPeriod } from '../../store/reports/slice';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProfitLossReport: React.FC = () => {
  const dispatch = useDispatch();
  const profitLossReport = useSelector((state: RootState) => selectProfitLossReport(state));
  console.log('ProfitLossReport profitLossReport:', profitLossReport); // Отладочный лог

  const data = profitLossReport?.data || [];
  const period = profitLossReport?.period || 'year';

  useEffect(() => {
    // Здесь можно добавить загрузку данных, если нужно
  }, [dispatch]);

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setProfitLossPeriod(e.target.value));
    console.log('Выбран период:', e.target.value); // Заглушка для отладки
  };

  // Данные для графика на основе таблицы
  const chartData = {
    labels: data.map((item) => item.article),
    datasets: [
      {
        label: 'Сумма (₽)',
        data: data.map((item) => item.amount),
        backgroundColor: data.map((item) =>
          item.article === 'Чистая прибыль'
            ? '#2980b9'
            : item.amount > 0
            ? '#27ae60'
            : '#e74c3c'
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <ErrorBoundary>
      <ReportContainer>
        <ReportHeader>
          <ReportTitle>Отчет о прибылях и убытках</ReportTitle>
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
            <ReportTableSectionTitle>Финансовые показатели</ReportTableSectionTitle>
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
          </ReportTableSection>
          <ReportChartSection>
            <ReportChartSectionTitle>График отчета</ReportChartSectionTitle>
            <ReportChartCanvas>
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    title: {
                      display: true,
                      text: 'График отчета о прибылях и убытках',
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Сумма (₽)',
                      },
                    },
                    x: {
                      title: {
                        display: true,
                        text: 'Статьи',
                      },
                    },
                  },
                }}
              />
            </ReportChartCanvas>
          </ReportChartSection>
        </ReportContent>
      </ReportContainer>
    </ErrorBoundary>
  );
};

export default ProfitLossReport;