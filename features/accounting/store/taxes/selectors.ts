// src/features/accounting/store/taxes/selectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store';

const selectTaxesState = (state: RootState) => state.accounting.taxes;

export const selectTaxes = createSelector(
  [selectTaxesState],
  (taxesState) => taxesState.taxes // Возвращаем массив taxes
);

export const selectFilteredTaxes = createSelector(
  [selectTaxesState],
  (taxesState) => {
    const { taxes, page } = taxesState;
    const rowsPerPage = 4;

    // Пагинация
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return taxes.slice(start, end);
  }
);

export const selectTaxSummary = createSelector([selectTaxesState], (taxesState) => {
  const totalTax = taxesState.taxes.reduce((sum, tax) => sum + tax.amount, 0);
  const paidTax = taxesState.taxes
    .filter((tax) => tax.status === 'on-time')
    .reduce((sum, tax) => sum + tax.amount, 0);
  const dueTax = totalTax - paidTax;

  return { totalTax, paidTax, dueTax };
});