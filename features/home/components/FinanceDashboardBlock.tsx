import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, List, ListItem } from '@mui/material';
import { homeStyles } from '../styles/homeStyles';

const demoFinanceData = {
  cashFlow: [
    { date: '2025-04-01', income: 50000, expense: 20000 },
    { date: '2025-04-02', income: 30000, expense: 10000 },
  ],
  credits: [
    { bank: 'Сбербанк', amount: 200000, rate: 12.5, nextPayment: '2025-05-01' },
  ],
  investments: [
    { name: 'Депозит', amount: 100000, rate: 8.0 },
  ],
  kpi: { profit: 150000, margin: 25, ebitda: 120000 },
};

const FinanceDashboardBlock: React.FC = () => {
  const [financeData, setFinanceData] = useState<typeof demoFinanceData | null>(null);

  useEffect(() => {
    setTimeout(() => setFinanceData(demoFinanceData), 500);
  }, []);

  if (!financeData) {
    return (
      <Paper sx={homeStyles.dashboardBlock} elevation={2}>
        <Typography>Загрузка...</Typography>
      </Paper>
    );
  }

  const { cashFlow, credits, investments, kpi } = financeData;

  return (
    <Paper sx={homeStyles.dashboardBlock} elevation={2}>
      <Typography variant="h5" gutterBottom sx={homeStyles.sectionTitle}>
        Финансы
      </Typography>

      <Typography variant="subtitle1" gutterBottom sx={homeStyles.sectionTitle}>
        Движение денежных средств
      </Typography>
      <TableContainer component={Paper} sx={homeStyles.tableContainer}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Дата</TableCell>
              <TableCell>Поступления</TableCell>
              <TableCell>Расходы</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cashFlow.map(item => (
              <TableRow key={item.date}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.income.toLocaleString()} ₽</TableCell>
                <TableCell>{item.expense.toLocaleString()} ₽</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="subtitle1" gutterBottom sx={homeStyles.sectionTitle}>
        Кредиты
      </Typography>
      <List dense>
        {credits.map((c, idx) => (
          <ListItem key={idx} sx={homeStyles.listItem}>
            {c.bank}: {c.amount.toLocaleString()} ₽, ставка: {c.rate}%, след. платеж: {c.nextPayment}
          </ListItem>
        ))}
      </List>

      <Typography variant="subtitle1" gutterBottom sx={homeStyles.sectionTitle}>
        Инвестиции
      </Typography>
      <List dense>
        {investments.map((inv, idx) => (
          <ListItem key={idx} sx={homeStyles.listItem}>
            {inv.name}: {inv.amount.toLocaleString()} ₽, ставка: {inv.rate}%
          </ListItem>
        ))}
      </List>

      <Typography variant="subtitle1" gutterBottom sx={homeStyles.sectionTitle}>
        Ключевые показатели
      </Typography>
      <Box sx={homeStyles.statRow}>
        <Typography>Прибыль: {kpi.profit.toLocaleString()} ₽</Typography>
        <Typography>Маржа: {kpi.margin}%</Typography>
        <Typography>EBITDA: {kpi.ebitda.toLocaleString()} ₽</Typography>
      </Box>
    </Paper>
  );
};

export default FinanceDashboardBlock;
