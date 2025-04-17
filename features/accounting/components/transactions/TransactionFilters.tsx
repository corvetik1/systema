// src/features/accounting/components/transactions/TransactionFilters.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Select, MenuItem, InputLabel, FormControl, Typography } from '@mui/material';
import {
  TransactionFiltersContainer,
  TransactionFiltersTitle,
  TransactionFilterForm,
  TransactionFilterGroup,
  TransactionFilterLabel,
  TransactionFilterButtons,
} from '../AccountingStyles';
import { RootState } from '../../../../app/store';
import { setFilter, resetFilters } from '../../store/transactions/slice';

const TransactionFilters: React.FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.accounting.transactions.filter);

  const [formData, setFormData] = useState({
    type: filters.type || '',
    category: filters.category || '',
    counterpartyId: filters.counterpartyId || '',
    dateFrom: filters.dateFrom || '',
    dateTo: filters.dateTo || '',
    status: filters.status || '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name!]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setFilter(formData));
  };

  const handleReset = () => {
    setFormData({
      type: '',
      category: '',
      counterpartyId: '',
      dateFrom: '',
      dateTo: '',
      status: '',
    });
    dispatch(resetFilters());
  };

  return (
    <TransactionFiltersContainer>
      <TransactionFiltersTitle>Фильтры операций</TransactionFiltersTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <TransactionFilterForm>
          <TransactionFilterGroup>
            <TransactionFilterLabel>Дата от</TransactionFilterLabel>
            <TextField
              type="date"
              name="dateFrom"
              value={formData.dateFrom}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </TransactionFilterGroup>
          <TransactionFilterGroup>
            <TransactionFilterLabel>Дата до</TransactionFilterLabel>
            <TextField
              type="date"
              name="dateTo"
              value={formData.dateTo}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </TransactionFilterGroup>
          <TransactionFilterGroup>
            <TransactionFilterLabel>Тип операции</TransactionFilterLabel>
            <FormControl fullWidth>
              <InputLabel>Тип операции</InputLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                label="Тип операции"
              >
                <MenuItem value="">Все</MenuItem>
                <MenuItem value="income">Доход</MenuItem>
                <MenuItem value="expense">Расход</MenuItem>
              </Select>
            </FormControl>
          </TransactionFilterGroup>
          <TransactionFilterGroup>
            <TransactionFilterLabel>Категория</TransactionFilterLabel>
            <TextField
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Введите категорию"
              fullWidth
            />
          </TransactionFilterGroup>
          <TransactionFilterGroup>
            <TransactionFilterLabel>Контрагент ID</TransactionFilterLabel>
            <TextField
              name="counterpartyId"
              value={formData.counterpartyId}
              onChange={handleChange}
              placeholder="Введите ID контрагента"
              fullWidth
            />
          </TransactionFilterGroup>
          <TransactionFilterGroup>
            <TransactionFilterLabel>Статус</TransactionFilterLabel>
            <FormControl fullWidth>
              <InputLabel>Статус</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                label="Статус"
              >
                <MenuItem value="">Все</MenuItem>
                <MenuItem value="completed">Завершено</MenuItem>
                <MenuItem value="pending">Ожидается</MenuItem>
              </Select>
            </FormControl>
          </TransactionFilterGroup>
          <TransactionFilterButtons>
            <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: '#3498db' }}>
              Применить
            </Button>
            <Button type="reset" variant="contained" color="error" onClick={handleReset} sx={{ backgroundColor: '#e74c3c' }}>
              Сбросить
            </Button>
          </TransactionFilterButtons>
        </TransactionFilterForm>
      </Box>
    </TransactionFiltersContainer>
  );
};

export default TransactionFilters;