// src/features/accounting/store/kudir/selectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store';
import { KUDIRRecord } from './types';

const selectKUDIRState = (state: RootState) => state.accounting?.kudir || {};

export const selectFilteredKUDIR = createSelector(
  [selectKUDIRState],
  (kudirState) => {
    const { records, page, filters } = kudirState;
    const rowsPerPage = 3;

    let filteredRecords: KUDIRRecord[] = [...records];

    if (filters.dateFrom) {
      filteredRecords = filteredRecords.filter(
        (record) => new Date(record.date) >= new Date(filters.dateFrom)
      );
    }
    if (filters.dateTo) {
      filteredRecords = filteredRecords.filter(
        (record) => new Date(record.date) <= new Date(filters.dateTo)
      );
    }
    if (filters.sumFrom !== undefined) {
      filteredRecords = filteredRecords.filter(
        (record) => record.amount >= filters.sumFrom
      );
    }
    if (filters.sumTo !== undefined) {
      filteredRecords = filteredRecords.filter(
        (record) => record.amount <= filters.sumTo
      );
    }
    if (filters.category) {
      filteredRecords = filteredRecords.filter(
        (record) => record.type === filters.category
      );
    }

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredRecords.slice(start, end);
  }
);