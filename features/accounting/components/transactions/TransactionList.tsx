// src/features/accounting/components/transactions/TransactionList.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Button,
  Typography,
  Dialog,
} from '@mui/material';
import {
  TransactionTableContainer,
  TransactionTableHeader,
  TransactionTableCell,
  TransactionRowIncome,
  TransactionRowExpense,
  TransactionPagination,
  TransactionLoadMoreButton,
} from '../AccountingStyles';
import TransactionSummary from './TransactionSummary';
import TransactionFilters from './TransactionFilters';
import TransactionForm from './TransactionForm';
import { RootState } from '../../../../app/store';
import { fetchTransactions, loadMoreTransactions } from '../../store/transactions/slice';
import { selectFilteredTransactions } from '../../store/transactions/selectors';
import ErrorBoundary from '../common/ErrorBoundary';

const TransactionList: React.FC = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state: RootState) => selectFilteredTransactions(state));
  const { loading, hasMore } = useSelector(
    (state: RootState) => state.accounting.transactions
  );
  const [openForm, setOpenForm] = useState(false);
  const [editTransactionId, setEditTransactionId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(loadMoreTransactions());
  };

  const handleAddTransaction = () => {
    setEditTransactionId(null);
    setOpenForm(true);
  };

  const handleEditTransaction = (id: number) => {
    setEditTransactionId(id);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditTransactionId(null);
  };

  return (
    <ErrorBoundary>
      <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Операции
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTransaction}
          sx={{ mb: 2 }}
        >
          Добавить операцию
        </Button>
        <TransactionSummary />
        <TransactionFilters />
        <TransactionTableContainer component="div">
          <Table>
            <TableHead>
              <TableRow>
                <TransactionTableHeader>Тип</TransactionTableHeader>
                <TransactionTableHeader>Сумма</TransactionTableHeader>
                <TransactionTableHeader>Дата</TransactionTableHeader>
                <TransactionTableHeader>Категория</TransactionTableHeader>
                <TransactionTableHeader>Контрагент</TransactionTableHeader>
                <TransactionTableHeader>Статус</TransactionTableHeader>
                <TransactionTableHeader>Действия</TransactionTableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    component={transaction.type === 'income' ? TransactionRowIncome : TransactionRowExpense}
                  >
                    <TransactionTableCell>{transaction.type === 'income' ? 'Доход' : 'Расход'}</TransactionTableCell>
                    <TransactionTableCell>
                      {transaction.amount.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
                    </TransactionTableCell>
                    <TransactionTableCell>{transaction.date}</TransactionTableCell>
                    <TransactionTableCell>{transaction.category}</TransactionTableCell>
                    <TransactionTableCell>Контрагент #{transaction.counterpartyId}</TransactionTableCell>
                    <TransactionTableCell>{transaction.status === 'completed' ? 'Завершено' : 'Ожидается'}</TransactionTableCell>
                    <TransactionTableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEditTransaction(transaction.id)}
                      >
                        Редактировать
                      </Button>
                    </TransactionTableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TransactionTableCell colSpan={7} style={{ textAlign: 'center' }}>
                    Нет операций
                  </TransactionTableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TransactionTableContainer>
        <TransactionPagination>
          {hasMore && (
            <TransactionLoadMoreButton
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? 'Загрузка...' : 'Загрузить ещё'}
            </TransactionLoadMoreButton>
          )}
        </TransactionPagination>
        <Dialog open={openForm} onClose={handleCloseForm} maxWidth="md">
          <TransactionForm transactionId={editTransactionId} onClose={handleCloseForm} />
        </Dialog>
      </Box>
    </ErrorBoundary>
  );
};

export default TransactionList;