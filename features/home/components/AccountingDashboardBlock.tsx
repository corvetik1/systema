import React from 'react';
import { Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, List, ListItem } from '@mui/material';
import { homeStyles } from '../styles/homeStyles';

const demoAccountingData = {
  accounts: [
    { name: 'Основной счет', balance: 123456.78, currency: '₽' },
    { name: 'Резервный счет', balance: 54321.0, currency: '₽' },
  ],
  receivables: 35000.0,
  payables: 18000.0,
  incomeMonth: 120000.0,
  expenseMonth: 95000.0,
  taxesDue: [
    { type: 'НДС', amount: 15000.0, dueDate: '2025-04-25' },
    { type: 'УСН', amount: 8000.0, dueDate: '2025-05-10' },
  ],
  lastOperations: [
    { date: '2025-04-18', description: 'Поступление от клиента', amount: 20000.0 },
    { date: '2025-04-17', description: 'Оплата поставщику', amount: -15000.0 },
    { date: '2025-04-16', description: 'Начисление зарплаты', amount: -30000.0 },
  ],
  reportingStatus: [
    { period: '1 квартал 2025', status: 'Сдано', date: '2025-04-10' },
    { period: '2024 год', status: 'Сдано', date: '2025-01-15' },
  ],
  payroll: { amount: 30000.0, nextPayDate: '2025-04-30' },
};

const AccountingDashboardBlock: React.FC = () => {
  const {
    accounts,
    receivables,
    payables,
    incomeMonth,
    expenseMonth,
    taxesDue,
    lastOperations,
    reportingStatus,
    payroll,
  } = demoAccountingData;

  return (
    <Paper sx={homeStyles.dashboardBlock} elevation={2}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Бухгалтерия
      </Typography>

      <Typography variant="subtitle1" gutterBottom sx={homeStyles.sectionTitle}>
        Остатки на счетах
      </Typography>
      <TableContainer component={Paper} sx={homeStyles.tableContainer}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Счет</TableCell>
              <TableCell>Баланс</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map(acc => (
              <TableRow key={acc.name}>
                <TableCell>{acc.name}</TableCell>
                <TableCell>{acc.balance.toLocaleString()} {acc.currency}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={homeStyles.statRow}>
        <Typography>Дебиторская задолженность: {receivables.toLocaleString()} ₽</Typography>
        <Typography>Кредиторская задолженность: {payables.toLocaleString()} ₽</Typography>
      </Box>

      <Box sx={homeStyles.statRow}>
        <Typography>Доходы за месяц: {incomeMonth.toLocaleString()} ₽</Typography>
        <Typography>Расходы за месяц: {expenseMonth.toLocaleString()} ₽</Typography>
      </Box>

      <Typography variant="subtitle1" gutterBottom sx={homeStyles.sectionTitle}>
        Налоги к уплате
      </Typography>
      <List dense>
        {taxesDue.map((tax, idx) => (
          <ListItem key={idx} sx={homeStyles.listItem}>
            {tax.type}: {tax.amount.toLocaleString()} ₽ (до {tax.dueDate})
          </ListItem>
        ))}
      </List>

      <Typography variant="subtitle1" gutterBottom sx={homeStyles.sectionTitle}>
        Последние операции
      </Typography>
      <List dense>
        {lastOperations.map((op, idx) => (
          <ListItem key={idx} sx={homeStyles.listItem}>
            {op.date} — {op.description} — {op.amount.toLocaleString()} ₽
          </ListItem>
        ))}
      </List>

      <Typography variant="subtitle1" gutterBottom sx={homeStyles.sectionTitle}>
        Статус отчетности
      </Typography>
      <List dense>
        {reportingStatus.map((r, idx) => (
          <ListItem key={idx} sx={homeStyles.listItem}>
            {r.period}: {r.status} ({r.date})
          </ListItem>
        ))}
      </List>

      <Typography variant="subtitle1" gutterBottom sx={homeStyles.sectionTitle}>
        Зарплатный фонд
      </Typography>
      <Typography sx={homeStyles.payroll}>
        Сумма: {payroll.amount.toLocaleString()} ₽, следующая выплата: {payroll.nextPayDate}
      </Typography>
    </Paper>
  );
};

export default AccountingDashboardBlock;
