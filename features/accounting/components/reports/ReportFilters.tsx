// src/features/accounting/components/reports/ReportFilters.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, TextField, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';
import {
  ReportFiltersContainer,
  ReportFiltersTitle,
  ReportFilterForm,
  ReportFilterGroup,
  ReportFilterLabel,
  ReportFilterButtons,
} from '../AccountingStyles';
import { setFilters } from '../../store/reports/slice';

const ReportFilters: React.FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    filterDate: '',
    filterType: '',
    filterCounterparty: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name!]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setFilters(formData));
  };

  const handleReset = () => {
    const resetData = {
      filterDate: '',
      filterType: '',
      filterCounterparty: '',
    };
    setFormData(resetData);
    dispatch(setFilters(resetData));
  };

  return (
    <ReportFiltersContainer>
      <ReportFiltersTitle>Фильтры отчетов</ReportFiltersTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <ReportFilterForm>
          <ReportFilterGroup>
            <ReportFilterLabel>Дата отчета</ReportFilterLabel>
            <TextField
              type="date"
              name="filterDate"
              value={formData.filterDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </ReportFilterGroup>
          <ReportFilterGroup>
            <ReportFilterLabel>Тип отчета</ReportFilterLabel>
            <FormControl fullWidth>
              <InputLabel>Тип отчета</InputLabel>
              <Select
                name="filterType"
                value={formData.filterType}
                onChange={handleChange}
              >
                <MenuItem value="">Все</MenuItem>
                <MenuItem value="balance">Баланс</MenuItem>
                <MenuItem value="profitLoss">Прибыли/убытки</MenuItem>
                <MenuItem value="debt">Задолженности</MenuItem>
              </Select>
            </FormControl>
          </ReportFilterGroup>
          <ReportFilterGroup>
            <ReportFilterLabel>Контрагент</ReportFilterLabel>
            <TextField
              name="filterCounterparty"
              value={formData.filterCounterparty}
              onChange={handleChange}
              placeholder="Введите название контрагента"
              fullWidth
            />
          </ReportFilterGroup>
          <ReportFilterButtons>
            <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: '#3498db', '&:hover': { backgroundColor: '#2980b9' } }}>
              Применить
            </Button>
            <Button type="reset" variant="contained" color="error" onClick={handleReset} sx={{ backgroundColor: '#e74c3c', '&:hover': { backgroundColor: '#c0392b' } }}>
              Сбросить
            </Button>
          </ReportFilterButtons>
        </ReportFilterForm>
      </Box>
    </ReportFiltersContainer>
  );
};

export default ReportFilters;