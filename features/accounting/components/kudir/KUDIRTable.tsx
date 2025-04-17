// src/features/accounting/components/kudir/KUDIRTable.tsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Table, TableBody, TableHead, TableRow, Button, Typography } from '@mui/material';
import {
  KUDIRTableContainer,
  KUDIRTableHeader,
  KUDIRTableCell,
  KUDIRRowIncome,
  KUDIRRowExpense,
  KUDIRPagination,
  KUDIRPageButton,
} from '../AccountingStyles';
import ErrorBoundary from '../common/ErrorBoundary';
import KUDIRFilters from './KUDIRFilters';
import KUDIRExport from './KUDIRExport';
import { RootState } from '../../../../app/store';
import { selectFilteredKUDIR } from '../../store/kudir/selectors';
import { setKUDIRPage } from '../../store/kudir/slice';
import { KUDIRRecord } from '../../store/kudir/types';

const KUDIRTable: React.FC = () => {
  const dispatch = useDispatch();
  const kudirRecords = useSelector((state: RootState) => selectFilteredKUDIR(state));
  const { page, totalPages } = useSelector((state: RootState) => state.accounting.kudir);

  const [sortConfig, setSortConfig] = useState<{
    key: keyof KUDIRRecord | null;
    direction: 'asc' | 'desc' | null;
  }>({ key: null, direction: null });

  useEffect(() => {
    // Здесь можно добавить загрузку данных
  }, [dispatch]);

  const handleSort = (key: keyof KUDIRRecord) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setKUDIRPage(newPage));
  };

  const sortedRecords = [...kudirRecords].sort((a, b) => {
    if (!sortConfig.key || !sortConfig.direction) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (sortConfig.key === 'date') {
      return sortConfig.direction === 'asc'
        ? new Date(aValue).getTime() - new Date(bValue).getTime()
        : new Date(bValue).getTime() - new Date(aValue).getTime();
    }
    if (sortConfig.key === 'amount') {
      return sortConfig.direction === 'asc'
        ? aValue - bValue
        : bValue - aValue;
    }
    return sortConfig.direction === 'asc'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  return (
    <ErrorBoundary>
      <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 2 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 2.5 }}>
          Список КУДиР
        </Typography>
        <KUDIRFilters />
        <KUDIRExport />
        <KUDIRTableContainer component="div">
          <Table>
            <TableHead>
              <TableRow>
                <KUDIRTableHeader onClick={() => handleSort('date')}>
                  Дата{sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? ' ▲' : ' ▼')}
                </KUDIRTableHeader>
                <KUDIRTableHeader onClick={() => handleSort('recordNumber')}>
                  Номер записи{sortConfig.key === 'recordNumber' && (sortConfig.direction === 'asc' ? ' ▲' : ' ▼')}
                </KUDIRTableHeader>
                <KUDIRTableHeader onClick={() => handleSort('amount')}>
                  Сумма{sortConfig.key === 'amount' && (sortConfig.direction === 'asc' ? ' ▲' : ' ▼')}
                </KUDIRTableHeader>
                <KUDIRTableHeader onClick={() => handleSort('type')}>
                  Доход/Расход{sortConfig.key === 'type' && (sortConfig.direction === 'asc' ? ' ▲' : ' ▼')}
                </KUDIRTableHeader>
                <KUDIRTableHeader>Описание</KUDIRTableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRecords.length > 0 ? (
                sortedRecords.map((record) => (
                  <TableRow
                    key={record.id}
                    component={record.type === 'income' ? KUDIRRowIncome : KUDIRRowExpense}
                  >
                    <KUDIRTableCell>{record.date}</KUDIRTableCell>
                    <KUDIRTableCell>{record.recordNumber}</KUDIRTableCell>
                    <KUDIRTableCell>
                      {record.type === 'income' ? '+' : '-'}
                      {record.amount.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
                    </KUDIRTableCell>
                    <KUDIRTableCell>{record.type === 'income' ? 'Доход' : 'Расход'}</KUDIRTableCell>
                    <KUDIRTableCell>{record.description}</KUDIRTableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <KUDIRTableCell colSpan={5} style={{ textAlign: 'center' }}>
                    Нет записей
                  </KUDIRTableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </KUDIRTableContainer>
        <KUDIRPagination>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <KUDIRPageButton
              key={p}
              onClick={() => handlePageChange(p)}
              className={p === page ? 'active' : ''}
            >
              {p}
            </KUDIRPageButton>
          ))}
        </KUDIRPagination>
      </Box>
    </ErrorBoundary>
  );
};

export default KUDIRTable;