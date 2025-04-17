// src/features/accounting/components/analytics/Charts.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Chart as ChartJS, LineElement, BarElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { ChartsSection, ChartsTitle, PeriodSelector, PeriodLabel, ChartGrid, ChartWrapper } from '../AccountingStyles';
import { RootState } from '../../../../app/store';
import { setPeriod } from '../../store/analytics/slice';

ChartJS.register(LineElement, BarElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const Charts: React.FC = () => {
  const dispatch = useDispatch();
  const analytics = useSelector((state: RootState) => state.accounting?.analytics);
  const chartData = analytics?.chartData;
  const selectedPeriod = analytics?.selectedPeriod || 'year';

  const handlePeriodChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(setPeriod(event.target.value as 'week' | 'month' | 'year'));
  };

  // Проверка наличия данных
  if (!chartData || !chartData[selectedPeriod]) {
    return (
      <ChartsSection>
        <ChartsTitle>Аналитика за выбранный период</ChartsTitle>
        <Typography color="error">Данные для графиков недоступны</Typography>
      </ChartsSection>
    );
  }

  const lineData = {
    labels: chartData[selectedPeriod].labels,
    datasets: [
      {
        label: 'Доход',
        data: chartData[selectedPeriod].income,
        borderColor: '#27ae60',
        backgroundColor: 'rgba(39, 174, 96, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Расход',
        data: chartData[selectedPeriod].expense,
        borderColor: '#e74c3c',
        backgroundColor: 'rgba(231, 76, 60, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Налоги',
        data: chartData[selectedPeriod].taxes,
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const barData = {
    labels: chartData[selectedPeriod].labels,
    datasets: [
      {
        label: 'Доход',
        data: chartData[selectedPeriod].income,
        backgroundColor: '#27ae60',
      },
      {
        label: 'Расход',
        data: chartData[selectedPeriod].expense,
        backgroundColor: '#e74c3c',
      },
      {
        label: 'Налоги',
        data: chartData[selectedPeriod].taxes,
        backgroundColor: '#3498db',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: '' },
    },
    scales: {
      x: { title: { display: true, text: 'Период' } },
      y: { title: { display: true, text: 'Сумма (₽)' } },
    },
  };

  return (
    <ChartsSection>
      <ChartsTitle>Аналитика за выбранный период</ChartsTitle>
      <PeriodSelector>
        <PeriodLabel htmlFor="period-select">Выберите период:</PeriodLabel>
        <FormControl variant="outlined" size="small">
          <InputLabel id="period-select-label">Период</InputLabel>
          <Select
            labelId="period-select-label"
            id="period-select"
            value={selectedPeriod}
            onChange={handlePeriodChange}
            label="Период"
          >
            <MenuItem value="week">Неделя</MenuItem>
            <MenuItem value="month">Месяц</MenuItem>
            <MenuItem value="year">Год</MenuItem>
          </Select>
        </FormControl>
      </PeriodSelector>
      <ChartGrid>
        <ChartWrapper>
          <Line
            data={lineData}
            options={{ ...options, plugins: { ...options.plugins, title: { ...options.plugins.title, text: 'Линейный график: Доходы, Расходы, Налоги' } } }}
          />
        </ChartWrapper>
        <ChartWrapper>
          <Bar
            data={barData}
            options={{ ...options, plugins: { ...options.plugins, title: { ...options.plugins.title, text: 'Столбчатый график: Доходы, Расходы, Налоги' } } }}
          />
        </ChartWrapper>
      </ChartGrid>
    </ChartsSection>
  );
};

export default Charts;