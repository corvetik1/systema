// src/features/accounting/components/counterparties/CounterpartyFilters.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import {
  CounterpartyFiltersContainer,
  CounterpartyFiltersTitle,
  CounterpartyFilterForm,
  CounterpartyFilterGroup,
  CounterpartyFilterLabel,
  CounterpartyFilterButtons,
} from '../AccountingStyles';
import { RootState } from '../../../../app/store';
import { setFilter, resetFilters } from '../../store/counterparties/slice';

const CounterpartyFilters: React.FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.accounting.counterparties.filters);

  const handleFilterChange = (field: string, value: string) => {
    dispatch(setFilter({ field, value }));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Фильтры уже в сторе, таблица обновится автоматически
  };

  return (
    <CounterpartyFiltersContainer>
      <CounterpartyFiltersTitle>Фильтры контрагентов</CounterpartyFiltersTitle>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'contents' }}>
        <CounterpartyFilterForm>
          <CounterpartyFilterGroup>
            <CounterpartyFilterLabel htmlFor="filterName">Название компании</CounterpartyFilterLabel>
            <TextField
              id="filterName"
              value={filters.name}
              onChange={(e) => handleFilterChange('name', e.target.value)}
              placeholder="Введите название компании"
              fullWidth
            />
          </CounterpartyFilterGroup>
          <CounterpartyFilterGroup>
            <CounterpartyFilterLabel htmlFor="filterINN">ИНН</CounterpartyFilterLabel>
            <TextField
              id="filterINN"
              value={filters.inn}
              onChange={(e) => handleFilterChange('inn', e.target.value)}
              placeholder="Введите ИНН"
              fullWidth
            />
          </CounterpartyFilterGroup>
          <CounterpartyFilterGroup>
            <CounterpartyFilterLabel htmlFor="filterStatus">Статус</CounterpartyFilterLabel>
            <FormControl fullWidth>
              <InputLabel id="filterStatus-label">Статус</InputLabel>
              <Select
                labelId="filterStatus-label"
                id="filterStatus"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                label="Статус"
              >
                <MenuItem value="">Все</MenuItem>
                <MenuItem value="active">Активный</MenuItem>
                <MenuItem value="inactive">Неактивный</MenuItem>
              </Select>
            </FormControl>
          </CounterpartyFilterGroup>
          <CounterpartyFilterButtons>
            <Button type="submit" className="apply-btn">
              Применить
            </Button>
            <Button type="reset" className="reset-btn" onClick={handleReset}>
              Сбросить
            </Button>
          </CounterpartyFilterButtons>
        </CounterpartyFilterForm>
      </Box>
    </CounterpartyFiltersContainer>
  );
};

export default CounterpartyFilters;