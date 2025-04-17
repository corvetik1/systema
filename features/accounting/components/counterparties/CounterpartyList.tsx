// src/features/accounting/components/counterparties/CounterpartyList.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableSortLabel,
  Button,
  Typography,
  Dialog,
} from '@mui/material';
import {
  CounterpartyTableContainer,
  CounterpartyTableHeader,
  CounterpartyTableCell,
  CounterpartyPagination,
  CounterpartyPageButton,
} from '../AccountingStyles';
import CounterpartyFilters from './CounterpartyFilters';
import CounterpartyCard from './CounterpartyCard';
import CounterpartyForm from './CounterpartyForm';
import { RootState } from '../../../../app/store';
import {
  fetchCounterparties,
  setSort,
  setPage,
} from '../../store/counterparties/slice';
import { selectFilteredCounterparties } from '../../store/counterparties/selectors';

const CounterpartyList: React.FC = () => {
  const dispatch = useDispatch();
  const counterparties = useSelector((state: RootState) =>
    selectFilteredCounterparties(state)
  );
  const { sortBy, sortOrder, page, totalPages, loading } = useSelector(
    (state: RootState) => state.accounting.counterparties
  );
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [openForm, setOpenForm] = useState(false);
  const [selectedCounterpartyId, setSelectedCounterpartyId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchCounterparties());
  }, [dispatch]);

  const handleSort = (field: string) => {
    const isAsc = sortBy === field && sortOrder === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    dispatch(setSort({ field, order: isAsc ? 'desc' : 'asc' }));
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleDetailsClick = (id: number) => {
    setSelectedCounterpartyId(id);
    setOpenForm(true);
  };

  const handleAddCounterparty = () => {
    setSelectedCounterpartyId(null);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedCounterpartyId(null);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Контрагенты
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddCounterparty}
        sx={{ mb: 2 }}
      >
        Добавить контрагента
      </Button>
      <CounterpartyFilters />
      <CounterpartyTableContainer component="div">
        <Table>
          <TableHead>
            <TableRow>
              <CounterpartyTableHeader>
                <TableSortLabel
                  active={sortBy === 'name'}
                  direction={sortBy === 'name' ? sortDirection : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Название
                </TableSortLabel>
              </CounterpartyTableHeader>
              <CounterpartyTableHeader>
                <TableSortLabel
                  active={sortBy === 'inn'}
                  direction={sortBy === 'inn' ? sortDirection : 'asc'}
                  onClick={() => handleSort('inn')}
                >
                  ИНН
                </TableSortLabel>
              </CounterpartyTableHeader>
              <CounterpartyTableHeader>
                <TableSortLabel
                  active={sortBy === 'contactPerson'}
                  direction={sortBy === 'contactPerson' ? sortDirection : 'asc'}
                  onClick={() => handleSort('contactPerson')}
                >
                  Контактное лицо
                </TableSortLabel>
              </CounterpartyTableHeader>
              <CounterpartyTableHeader>
                <TableSortLabel
                  active={sortBy === 'phone'}
                  direction={sortBy === 'phone' ? sortDirection : 'asc'}
                  onClick={() => handleSort('phone')}
                >
                  Телефон
                </TableSortLabel>
              </CounterpartyTableHeader>
              <CounterpartyTableHeader>
                <TableSortLabel
                  active={sortBy === 'email'}
                  direction={sortBy === 'email' ? sortDirection : 'asc'}
                  onClick={() => handleSort('email')}
                >
                  Email
                </TableSortLabel>
              </CounterpartyTableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {counterparties.map((counterparty) => (
              <TableRow
                key={counterparty.id}
                onClick={() => handleDetailsClick(counterparty.id)}
                sx={{ cursor: 'pointer' }}
              >
                <CounterpartyTableCell>{counterparty.name}</CounterpartyTableCell>
                <CounterpartyTableCell>{counterparty.inn}</CounterpartyTableCell>
                <CounterpartyTableCell>{counterparty.contactPerson || '-'}</CounterpartyTableCell>
                <CounterpartyTableCell>{counterparty.phone}</CounterpartyTableCell>
                <CounterpartyTableCell>{counterparty.email || '-'}</CounterpartyTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CounterpartyTableContainer>
      <CounterpartyPagination>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <CounterpartyPageButton
            key={p}
            onClick={() => handlePageChange(p)}
            className={p === page ? 'active' : ''}
          >
            {p}
          </CounterpartyPageButton>
        ))}
      </CounterpartyPagination>
      <Dialog open={openForm} onClose={handleCloseForm} maxWidth="md">
        <CounterpartyForm
          counterpartyId={selectedCounterpartyId}
          onClose={handleCloseForm}
        />
      </Dialog>
    </Box>
  );
};

export default CounterpartyList;