// src/features/accounting/components/reports/ReportList.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Button,
  Typography,
} from '@mui/material';
import {
  ReportTableContainer,
  ReportTableHeader,
  ReportTableCell,
  ReportStatusCompleted,
  ReportStatusPending,
  ReportStatusFailed,
  ReportPagination,
  ReportPageButton,
} from '../AccountingStyles';
import ErrorBoundary from '../common/ErrorBoundary';
import ReportFilters from './ReportFilters';
import { RootState } from '../../../../app/store';
import { fetchReports, setPage } from '../../store/reports/slice';
import { selectFilteredReports } from '../../store/reports/selectors';

const ReportList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reports = useSelector((state: RootState) => selectFilteredReports(state));
  const { page, totalPages, loading } = useSelector(
    (state: RootState) => state.accounting.reports
  );

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleCreateReport = () => {
    alert('Открыть форму создания нового отчета'); // Временная заглушка
  };

  const getStatusComponent = (status: string) => {
    switch (status) {
      case 'completed':
        return <ReportStatusCompleted>Завершен</ReportStatusCompleted>;
      case 'pending':
        return <ReportStatusPending>Ожидается</ReportStatusPending>;
      case 'failed':
        return <ReportStatusFailed>Провален</ReportStatusFailed>;
      default:
        return <Typography>{status}</Typography>;
    }
  };

  return (
    <ErrorBoundary>
      <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
          <Typography variant="h4">Список отчетов</Typography>
          <Button variant="contained" color="primary" onClick={handleCreateReport}>
            Создать новый отчет
          </Button>
        </Box>
        <ReportFilters />
        <ReportTableContainer component="div">
          <Table>
            <TableHead>
              <TableRow>
                <ReportTableHeader>Название отчета</ReportTableHeader>
                <ReportTableHeader>Дата</ReportTableHeader>
                <ReportTableHeader>Тип</ReportTableHeader>
                <ReportTableHeader>Статус</ReportTableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.length > 0 ? (
                reports.map((report) => (
                  <TableRow
                    key={report.id}
                    onClick={() =>
                      navigate(
                        `/accounting/reports/${
                          report.type === 'profitLoss' ? 'profit-loss' : report.type
                        }`
                      )
                    }
                    sx={{ cursor: 'pointer' }}
                  >
                    <ReportTableCell>{report.name}</ReportTableCell>
                    <ReportTableCell>{report.date}</ReportTableCell>
                    <ReportTableCell>{report.type}</ReportTableCell>
                    <ReportTableCell>{getStatusComponent(report.status)}</ReportTableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <ReportTableCell colSpan={4} style={{ textAlign: 'center' }}>
                    Нет отчетов
                  </ReportTableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ReportTableContainer>
        <ReportPagination>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <ReportPageButton
              key={p}
              onClick={() => handlePageChange(p)}
              className={p === page ? 'active' : ''}
            >
              {p}
            </ReportPageButton>
          ))}
        </ReportPagination>
      </Box>
    </ErrorBoundary>
  );
};

export default ReportList;