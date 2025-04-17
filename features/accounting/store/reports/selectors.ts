// src/features/accounting/store/reports/selectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store';
import { Report } from '../../types/report';

const selectReportsState = (state: RootState) => state.accounting?.reports || {};

export const selectFilteredReports = createSelector(
  [selectReportsState],
  (reportsState) => {
    const { reports, page, filters } = reportsState;
    const rowsPerPage = 3;

    let filteredReports = [...reports];

    if (filters.filterDate) {
      filteredReports = filteredReports.filter((report) =>
        report.date.includes(filters.filterDate)
      );
    }
    if (filters.filterType) {
      filteredReports = filteredReports.filter(
        (report) => report.type === filters.filterType
      );
    }
    if (filters.filterCounterparty) {
      filteredReports = filteredReports.filter((report) =>
        report.name.toLowerCase().includes(filters.filterCounterparty.toLowerCase())
      );
    }

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredReports.slice(start, end);
  }
);

export const selectDebtReport = createSelector(
  [selectReportsState],
  (reportsState) => {
    console.log('selectDebtReport reportsState:', reportsState);
    return reportsState.debtReport || { data: [], period: 'year' };
  }
);

export const selectBalanceReport = createSelector(
  [selectReportsState],
  (reportsState) => {
    console.log('selectBalanceReport reportsState:', reportsState);
    return reportsState.balanceReport || { data: [], period: 'year' };
  }
);

export const selectProfitLossReport = createSelector(
  [selectReportsState],
  (reportsState) => {
    console.log('selectProfitLossReport reportsState:', reportsState);
    return reportsState.profitLossReport || { data: [], period: 'year' };
  }
);