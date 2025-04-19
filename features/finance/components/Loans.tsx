// src/features/finance/components/Loans.tsx
import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Fade, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditLoanDialog from './dialogs/EditLoanDialog';
import LoanCard from './LoanCard';
import { RootState, AppDispatch } from '../../../app/store';
import { deleteTransaction, saveEditedLoan } from '../store/financeActions';
import logger from '../../../utils/logger';
import { setSnackbar } from '../../../auth/authSlice';
import { Loan, Transaction } from '../store/financeSlice';
import { format, parse } from 'date-fns';
import { ru } from 'date-fns/locale';

const Loans: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loans, transactions } = useSelector((state: RootState) => state.finance);

  const [expandedLoan, setExpandedLoan] = useState<number | null>(null);
  const [expandedMonths, setExpandedMonths] = useState<{ [key: number]: { [key: string]: boolean } }>({});
  const [editingLoanId, setEditingLoanId] = useState<number | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [editedLoan, setEditedLoan] = useState<Loan | null>(null);
  const [loanNames, setLoanNames] = useState<{ [key: number]: string }>(
    Object.values(loans.byId).reduce((acc, loan) => {
      acc[loan.id] = loan.name;
      return acc;
    }, {} as { [key: number]: string })
  );

  const loansArray = useMemo(() => Object.values(loans.byId), [loans]);
  // временно убрано логирование

  const transactionsByLoanId = useMemo(() => {
    const grouped: { [key: number]: Transaction[] } = {};
    Object.values(transactions.byId).forEach((tx) => {
      const loanId = tx.loan_id;
      if (loanId) {
        if (!grouped[loanId]) grouped[loanId] = [];
        grouped[loanId].push(tx);
      }
    });
    return grouped;
  }, [transactions]);

  const handleExpandLoan = useCallback((loanId: number) => {
    setExpandedLoan((prev) => (prev === loanId ? null : loanId));
  }, []);

  const toggleMonthExpansion = useCallback((loanId: number, monthKey: string) => {
    setExpandedMonths((prev) => {
      const loanExpanded = prev[loanId] || {};
      return {
        ...prev,
        [loanId]: {
          ...loanExpanded,
          [monthKey]: !loanExpanded[monthKey],
        },
      };
    });
  }, []);

  const handleEditLoanTitle = useCallback((loanId: number) => {
    setEditingLoanId(loanId);
  }, []);

  const handleSaveLoanTitle = useCallback((loanId: number, newName: string) => {
    if (newName.trim()) {
      setLoanNames((prev) => ({
        ...prev,
        [loanId]: newName.trim(),
      }));
      setEditingLoanId(null);
    } else {
      dispatch(setSnackbar({ message: 'Название не может быть пустым!', severity: 'error' }));
    }
  }, [dispatch]);

  const handleDeleteTransaction = useCallback(async (transactionId: number) => {
    try {
      await dispatch(deleteTransaction(transactionId)).unwrap();
      dispatch(setSnackbar({ message: 'Транзакция успешно удалена', severity: 'success' }));
    } catch (err) {
      logger.error('Ошибка удаления транзакции', err);
      dispatch(setSnackbar({ message: 'Ошибка при удалении транзакции', severity: 'error' }));
    }
  }, [dispatch]);

  const handleOpenEditDialog = useCallback((loan: Loan) => {
    setEditedLoan(loan);
    setEditDialogOpen(true);
  }, []);

  const handleCloseEditDialog = useCallback(() => {
    setEditDialogOpen(false);
    setEditedLoan(null);
  }, []);

  const handleSaveLoan = useCallback(async () => {
    if (!editedLoan) {
      dispatch(setSnackbar({ message: 'Нет данных займа для сохранения', severity: 'error' }));
      return;
    }
    if (!editedLoan.name || editedLoan.amount === undefined) {
      dispatch(setSnackbar({ message: 'Заполните все обязательные поля займа', severity: 'error' }));
      return;
    }
    try {
      logger.info('Loans: Сохранение изменений займа', { loanId: editedLoan.id });
      await dispatch(saveEditedLoan({ loanId: editedLoan.id!, loanData: editedLoan })).unwrap();
      setLoanNames((prev) => ({
        ...prev,
        [editedLoan.id]: editedLoan.name,
      }));
      setEditDialogOpen(false);
      setEditedLoan(null);
      dispatch(setSnackbar({ message: 'Займ успешно обновлён', severity: 'success' }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
      logger.error('Loans: Ошибка сохранения займа', { error: errorMessage });
      dispatch(setSnackbar({ message: `Ошибка при сохранении займа: ${errorMessage}`, severity: 'error' }));
    }
  }, [dispatch, editedLoan]);

  const groupedTransactions = useMemo(() => {
    return loansArray.map((loan) => {
      const loanTxs = transactionsByLoanId[loan.id] || [];

      const byMonth = loanTxs.reduce(
        (acc: { [key: string]: { monthName: string; transactions: Transaction[] } }, tx) => {
          const date = parse(tx.date, 'yyyy-MM-dd', new Date());
          const monthKey = format(date, 'yyyy-MM');
          const monthName = format(date, 'LLLL yyyy', { locale: ru });
          if (!acc[monthKey]) acc[monthKey] = { monthName, transactions: [] };
          acc[monthKey].transactions.push(tx);
          return acc;
        },
        {}
      );

      return {
        ...loan,
        monthlyGroups: Object.values(byMonth).sort((a, b) =>
          b.transactions[0].date.localeCompare(a.transactions[0].date)
        ),
      };
    });
  }, [loansArray, transactionsByLoanId]);

  return (
    <Fade in={true} timeout={500}>
      <Box className="account-cards">
        {/* Фильтр 'Тип' убран */}
        {loansArray.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
            <LoanCard
              name="Пример займа"
              amount={100000}
              interestRate={12}
              term={12}
              endDate="31.12.2025"
              monthlyPayment={8500}
            />
          </Box>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 2 }} className="cards-container">
            {groupedTransactions.map((loan) => (
              <LoanCard
                key={loan.id}
                name={loanNames[loan.id]}
                amount={loan.amount || 0}
                interestRate={loan.interest_rate}
                term={loan.term}
                endDate={loan.end_date}
                monthlyPayment={loan.monthly_payment || 0}
              />
            ))}
          </Box>
        )}
        <EditLoanDialog
          open={editDialogOpen}
          onClose={handleCloseEditDialog}
          editedLoan={editedLoan}
          setEditedLoan={setEditedLoan}
          handleSaveEditedLoan={handleSaveLoan}
        />
      </Box>
    </Fade>
  );
};

export default Loans;