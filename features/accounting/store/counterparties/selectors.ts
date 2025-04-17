// src/features/accounting/store/counterparties/selectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store';

const selectCounterpartiesState = (state: RootState) => state.accounting.counterparties;

export const selectCounterparties = createSelector(
  [selectCounterpartiesState],
  (counterpartiesState) => counterpartiesState.counterparties
);

export const selectFilteredCounterparties = createSelector(
  [selectCounterpartiesState],
  (counterpartiesState) => {
    const { counterparties, filters, sortBy, sortOrder, page } = counterpartiesState;
    const rowsPerPage = 3;

    let filtered = [...counterparties];

    // Применение фильтров
    if (filters.name) {
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.inn) {
      filtered = filtered.filter((c) => c.inn.includes(filters.inn));
    }
    if (filters.status) {
      filtered = filtered.filter((c) => c.status === filters.status);
    }

    // Сортировка
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof typeof a];
      let bValue: any = b[sortBy as keyof typeof b];

      aValue = aValue?.toLowerCase() || '';
      bValue = bValue?.toLowerCase() || '';

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    // Пагинация
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filtered.slice(start, end);
  }
);