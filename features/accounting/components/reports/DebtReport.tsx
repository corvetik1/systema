// src/features/accounting/components/reports/DebtReport.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Table, TableBody, TableHead, TableRow, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  TaxStatusOverdue,
  TaxStatusOnTime,
  TaxStatusPending,
  ReportChartSection,
  ReportChartSectionTitle,
  ReportChartCanvas,
  ReportPagination,
  ReportPageButton,
} from '../AccountingStyles';
import ErrorBoundary from '../common/ErrorBoundary';
import { RootState } from '../../../../app/store';
import { selectDebtReport } from '../../store/reports/selectors';
import { setDebtPeriod } from '../../store/reports/slice';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DebtReport: React.FC = () => {
  const dispatch = useDispatch();
  const debtReport = useSelector((state: RootState) => selectDebtReport(state));
  console.log('DebtReport debtReport:', debtReport); // Отладочный лог

  const data = debtReport?.data || [];
  const period = debtReport?.period || 'year';

  useEffect(() => {
    // Здесь можно добавить загрузку данных, если нужно
  }, [dispatch]);

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setDebtPeriod(e.target.value));
  };

  const getStatusComponent = (status: string) => {
    switch (status) {
      case 'overdue':
        return <TaxStatusOverdue>Просрочен</TaxStatusOverdue>;
      case 'on-time':
        return <TaxStatusOnTime>Своевременно</TaxStatusOnTime>;
      case 'pending':
        return <TaxStatusPending>Ожидается</TaxStatusPending>;
      default:
        return <Typography>{status}</Typography>;
    }
  };

  // Динамическое построение данных для графика на основе данных таблицы
  const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
  const monthlySums = months.map((_, index) => {
    const month = (index + 1).toString().padStart(2, '0');
    return data
      .filter((debt) => debt.date.startsWith(`2023-${month}`))
      .reduce((sum, debt) => sum + debt.amount, 0);
  });

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Сумма задолженностей (₽)',
        data: monthlySums,
        borderColor: '#e74c3c',
        backgroundColor: 'rgba(231, 76, 60, 0.1)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <ErrorBoundary>
      <ReportContainer>
        <ReportHeader>
          <ReportTitle>Отчет по задолженностям</ReportTitle>
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
            <ReportTableSectionTitle>Задолженности (Таблица)</ReportTableSectionTitle>
            <ReportTableContainer component="div">
              <Table>
                <TableHead>
                  <TableRow>
                    <ReportTableHeader>Контрагент</ReportTableHeader>
                    <ReportTableHeader>Сумма долга (₽)</ReportTableHeader>
                    <ReportTableHeader>Дата задолженности</ReportTableHeader>
                    <ReportTableHeader>Статус</ReportTableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.length > 0 ? (
                    data.map((debt) => (
                      <TableRow key={debt.id}>
                        <ReportTableCell>{debt.counterparty}</ReportTableCell>
                        <ReportTableCell>
                          {debt.amount.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
                        </ReportTableCell>
                        <ReportTableCell>{debt.date}</ReportTableCell>
                        <ReportTableCell>{getStatusComponent(debt.status)}</ReportTableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <ReportTableCell colSpan={4} style={{ textAlign: 'center' }}>
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
            <ReportChartSectionTitle>Динамика задолженностей</ReportChartSectionTitle>
            <ReportChartCanvas>
              <Line data={chartData} options={{ responsive: true }} />
            </ReportChartCanvas>
          </ReportChartSection>
        </ReportContent>
      </ReportContainer>
    </ErrorBoundary>
  );
};

export default DebtReport;