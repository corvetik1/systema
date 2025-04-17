// src/features/accounting/components/taxes/TaxList.tsx
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
  TaxTableContainer,
  TaxTableHeader,
  TaxTableCell,
  TaxStatusOverdue,
  TaxStatusOnTime,
  TaxStatusPending,
  TaxPagination,
  TaxPageButton,
} from '../AccountingStyles';
import TaxForm from './TaxForm';
import TaxSummary from './TaxSummary';
import TaxCalendar from './TaxCalendar';
import ErrorBoundary from '../common/ErrorBoundary';
import { RootState } from '../../../../app/store';
import { fetchTaxes, setPage } from '../../store/taxes/slice';
import { selectFilteredTaxes } from '../../store/taxes/selectors';

const TaxList: React.FC = () => {
  const dispatch = useDispatch();
  const taxes = useSelector((state: RootState) => selectFilteredTaxes(state));
  const { page, totalPages, loading } = useSelector(
    (state: RootState) => state.accounting.taxes
  );
  const [openForm, setOpenForm] = useState(false);
  const [selectedTaxId, setSelectedTaxId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchTaxes());
  }, [dispatch]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleAddTax = () => {
    setSelectedTaxId(null);
    setOpenForm(true);
  };

  const handleEditTax = (id: number) => {
    setSelectedTaxId(id);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedTaxId(null);
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

  return (
    <ErrorBoundary>
      <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Налоги
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTax}
          sx={{ mb: 2 }}
        >
          Добавить налог
        </Button>
        <TaxSummary />
        <TaxCalendar />
        <TaxTableContainer component="div">
          <Table>
            <TableHead>
              <TableRow>
                <TaxTableHeader>Название налога</TaxTableHeader>
                <TaxTableHeader>Сумма</TaxTableHeader>
                <TaxTableHeader>Срок уплаты</TaxTableHeader>
                <TaxTableHeader>Статус</TaxTableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {taxes.map((tax) => (
                <TableRow
                  key={tax.id}
                  onClick={() => handleEditTax(tax.id)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TaxTableCell>{tax.name}</TaxTableCell>
                  <TaxTableCell>
                    {tax.amount.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
                  </TaxTableCell>
                  <TaxTableCell>{tax.paymentDate}</TaxTableCell>
                  <TaxTableCell>{getStatusComponent(tax.status)}</TaxTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TaxTableContainer>
        <TaxPagination>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <TaxPageButton
              key={p}
              onClick={() => handlePageChange(p)}
              className={p === page ? 'active' : ''}
            >
              {p}
            </TaxPageButton>
          ))}
        </TaxPagination>
        <Dialog open={openForm} onClose={handleCloseForm} maxWidth="md">
          <TaxForm taxId={selectedTaxId} onClose={handleCloseForm} />
        </Dialog>
      </Box>
    </ErrorBoundary>
  );
};

export default TaxList;