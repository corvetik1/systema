// src/features/accounting/components/transactions/TransactionTable.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableSortLabel,
  Button,
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
import { RootState } from '../../../../app/store';
import {
  fetchTransactions,
  setSort,
  loadMoreTransactions,
} from '../../store/transactions/slice';
import { selectFilteredTransactions } from '../../store/transactions/selectors';

const TransactionTable: React.FC = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state: RootState) =>
    selectFilteredTransactions(state)
  );
  const { sort, loading, hasMore } = useSelector(
    (state: RootState) => state.accounting.transactions
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleSort = (field: string) => {
    const isAsc = sort.field === field && sort.direction === 'asc';
    dispatch(setSort({ field: field as any, direction: isAsc ? 'desc' : 'asc' }));
  };

  const handleLoadMore = () => {
    dispatch(loadMoreTransactions());
  };

  return (
    <TransactionTableContainer component="div">
      <Table>
        <TableHead>
          <TableRow>
            <TransactionTableHeader>
              <TableSortLabel
                active={sort.field === 'type'}
                direction={sort.field === 'type' ? sort.direction : 'asc'}
                onClick={() => handleSort('type')}
              >
                Тип
              </TableSortLabel>
            </TransactionTableHeader>
            <TransactionTableHeader>
              <TableSortLabel
                active={sort.field === 'amount'}
                direction={sort.field === 'amount' ? sort.direction : 'asc'}
                onClick={() => handleSort('amount')}
              >
                Сумма
              </TableSortLabel>
            </TransactionTableHeader>
            <TransactionTableHeader>
              <TableSortLabel
                active={sort.field === 'date'}
                direction={sort.field === 'date' ? sort.direction : 'asc'}
                onClick={() => handleSort('date')}
              >
                Дата
              </TableSortLabel>
            </TransactionTableHeader>
            <TransactionTableHeader>
              <TableSortLabel
                active={sort.field === 'category'}
                direction={sort.field === 'category' ? sort.direction : 'asc'}
                onClick={() => handleSort('category')}
              >
                Категория
              </TableSortLabel>
            </TransactionTableHeader>
            <TransactionTableHeader>
              <TableSortLabel
                active={sort.field === 'counterpartyId'}
                direction={sort.field === 'counterpartyId' ? sort.direction : 'asc'}
                onClick={() => handleSort('counterpartyId')}
              >
                Контрагент
              </TableSortLabel>
            </TransactionTableHeader>
            <TransactionTableHeader>
              <TableSortLabel
                active={sort.field === 'status'}
                direction={sort.field === 'status' ? sort.direction : 'asc'}
                onClick={() => handleSort('status')}
              >
                Статус
              </TableSortLabel>
            </TransactionTableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow
              key={transaction.id}
              component={transaction.type === 'income' ? TransactionRowIncome : TransactionRowExpense}
            >
              <TransactionTableCell>{transaction.type === 'income' ? 'Доход' : 'Расход'}</TransactionTableCell>
              <TransactionTableCell>
                {transaction.amount.toLocaleString('ru-RU', {
                  style: 'currency',
                  currency: 'RUB',
                })}
              </TransactionTableCell>
              <TransactionTableCell>{transaction.date}</TransactionTableCell>
              <TransactionTableCell>{transaction.category}</TransactionTableCell>
              <TransactionTableCell>Контрагент #{transaction.counterpartyId}</TransactionTableCell>
              <TransactionTableCell>{transaction.status === 'completed' ? 'Завершено' : 'Ожидается'}</TransactionTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {hasMore && (
        <TransactionPagination>
          <TransactionLoadMoreButton onClick={handleLoadMore} disabled={loading}>
            Загрузить дополнительные операции
          </TransactionLoadMoreButton>
        </TransactionPagination>
      )}
    </TransactionTableContainer>
  );
};

export default TransactionTable;