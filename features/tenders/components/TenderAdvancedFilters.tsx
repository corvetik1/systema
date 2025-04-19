// src/features/tenders/components/TenderAdvancedFilters.tsx
import React, { useCallback, useMemo } from 'react';
import { TextField, Button, Autocomplete, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../app/store';
import { setFilter, clearFilters } from '../store/tendersSlice';
import { AdvancedFiltersBox } from '../styles';

const TenderAdvancedFilters: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.tenders.filters);
  const tendersStore = useSelector((state: RootState) => state.tenders.tenders);
  const tenders = tendersStore.allIds.map((id) => tendersStore.byId[id]);
  const regionOptions = useMemo(
    () => Array.from(new Set(tenders.map((t) => t.customer_region).filter(Boolean))),
    [tenders]
  );
  const customerOptions = useMemo(
    () => Array.from(new Set(tenders.map((t) => t.customer_name).filter(Boolean))),
    [tenders]
  );

  const handleChange = useCallback(
    (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setFilter({ key, value: event.target.value }));
    },
    [dispatch]
  );

  const handleClear = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  return (
    <AdvancedFiltersBox>
      <Grid container spacing={2} alignItems="center">
        <Grid xs={12} sm={4}>
          <TextField
            label="Поиск"
            variant="outlined"
            size="small"
            fullWidth
            value={filters.search || ''}
            onChange={handleChange('search')}
          />
        </Grid>
        <Grid xs={12}><Divider /></Grid>
        <Grid xs={6} sm={2}>
          <TextField
            label="Дата с"
            type="date"
            variant="outlined"
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={filters.endDateFrom || ''}
            onChange={handleChange('endDateFrom')}
          />
        </Grid>
        <Grid xs={6} sm={2}>
          <TextField
            label="Дата по"
            type="date"
            variant="outlined"
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={filters.endDateTo || ''}
            onChange={handleChange('endDateTo')}
          />
        </Grid>
        <Grid xs={12}><Divider /></Grid>
        <Grid xs={6} sm={2}>
          <TextField
            label="Мин. сумма"
            type="number"
            variant="outlined"
            size="small"
            fullWidth
            value={filters.startPriceMin || ''}
            onChange={handleChange('startPriceMin')}
          />
        </Grid>
        <Grid xs={6} sm={2}>
          <TextField
            label="Макс. сумма"
            type="number"
            variant="outlined"
            size="small"
            fullWidth
            value={filters.startPriceMax || ''}
            onChange={handleChange('startPriceMax')}
          />
        </Grid>
        <Grid xs={12}><Divider /></Grid>
        <Grid xs={6} sm={3}>
          <Autocomplete
            options={regionOptions}
            freeSolo
            value={filters.customerRegion || ''}
            onChange={(e, value) => dispatch(setFilter({ key: 'customerRegion', value }))}
            renderInput={(params) => (
              <TextField {...params} label="Регион заказчика" variant="outlined" size="small" fullWidth />
            )}
          />
        </Grid>
        <Grid xs={6} sm={3}>
          <Autocomplete
            options={customerOptions}
            freeSolo
            value={filters.customerName || ''}
            onChange={(e, value) => dispatch(setFilter({ key: 'customerName', value }))}
            renderInput={(params) => (
              <TextField {...params} label="Заказчик" variant="outlined" size="small" fullWidth />
            )}
          />
        </Grid>
        <Grid xs={12} sm={12}>
          <Button variant="contained" color="secondary" onClick={handleClear}>
            Сброс фильтров
          </Button>
        </Grid>
      </Grid>
    </AdvancedFiltersBox>
  );
};

export default TenderAdvancedFilters;
