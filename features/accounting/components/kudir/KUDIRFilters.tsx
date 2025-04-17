// src/features/accounting/components/kudir/KUDIRFilters.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, TextField, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';
import {
  KUDIRFiltersContainer,
  KUDIRFiltersTitle,
  KUDIRFilterForm,
  KUDIRFilterGroup,
  KUDIRFilterLabel,
  KUDIRFilterButtons,
} from '../AccountingStyles';
import { setKUDIRFilters } from '../../store/kudir/slice';

const KUDIRFilters: React.FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    dateFrom: '',
    dateTo: '',
    sumFrom: '',
    sumTo: '',
    category: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name!]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      setKUDIRFilters({
        dateFrom: formData.dateFrom,
        dateTo: formData.dateTo,
        sumFrom: formData.sumFrom ? parseFloat(formData.sumFrom) : undefined,
        sumTo: formData.sumTo ? parseFloat(formData.sumTo) : undefined,
        category: formData.category,
      })
    );
  };

  const handleReset = () => {
    const resetData = {
      dateFrom: '',
      dateTo: '',
      sumFrom: '',
      sumTo: '',
      category: '',
    };
    setFormData(resetData);
    dispatch(setKUDIRFilters(resetData));
  };

  return (
    <KUDIRFiltersContainer>
      <KUDIRFiltersTitle>Фильтры КУДиР</KUDIRFiltersTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <KUDIRFilterForm>
          <KUDIRFilterGroup>
            <KUDIRFilterLabel>Дата от</KUDIRFilterLabel>
            <TextField
              type="date"
              name="dateFrom"
              value={formData.dateFrom}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </KUDIRFilterGroup>
          <KUDIRFilterGroup>
            <KUDIRFilterLabel>Дата до</KUDIRFilterLabel>
            <TextField
              type="date"
              name="dateTo"
              value={formData.dateTo}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </KUDIRFilterGroup>
          <KUDIRFilterGroup>
            <KUDIRFilterLabel>Сумма от</KUDIRFilterLabel>
            <TextField
              type="number"
              name="sumFrom"
              value={formData.sumFrom}
              onChange={handleChange}
              placeholder="₽"
              inputProps={{ min: 0, step: 0.01 }}
              fullWidth
            />
          </KUDIRFilterGroup>
          <KUDIRFilterGroup>
            <KUDIRFilterLabel>Сумма до</KUDIRFilterLabel>
            <TextField
              type="number"
              name="sumTo"
              value={formData.sumTo}
              onChange={handleChange}
              placeholder="₽"
              inputProps={{ min: 0, step: 0.01 }}
              fullWidth
            />
          </KUDIRFilterGroup>
          <KUDIRFilterGroup>
            <KUDIRFilterLabel>Категория</KUDIRFilterLabel>
            <FormControl fullWidth>
              <InputLabel>Категория</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <MenuItem value="">Все</MenuItem>
                <MenuItem value="income">Доход</MenuItem>
                <MenuItem value="expense">Расход</MenuItem>
              </Select>
            </FormControl>
          </KUDIRFilterGroup>
          <KUDIRFilterButtons>
            <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: '#3498db', '&:hover': { backgroundColor: '#2980b9' } }}>
              Применить
            </Button>
            <Button type="reset" variant="contained" color="error" onClick={handleReset} sx={{ backgroundColor: '#e74c3c', '&:hover': { backgroundColor: '#c0392b' } }}>
              Сбросить
            </Button>
          </KUDIRFilterButtons>
        </KUDIRFilterForm>
      </Box>
    </KUDIRFiltersContainer>
  );
};

export default KUDIRFilters;