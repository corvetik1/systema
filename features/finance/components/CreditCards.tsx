// src/features/finance/components/CreditCards.tsx
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Fade,
  IconButton,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { formatNumber } from '../../../utils/formatUtils';
import { format, parse } from 'date-fns';
import { ru } from 'date-fns/locale';
import EditCreditCardDialog from './dialogs/EditCreditCardDialog';
import { AccountCard } from './FinanceStyles';
import { RootState, AppDispatch } from '../../../app/store';
import { deleteTransaction, saveCreditCard, fetchAccounts } from '../store/financeActions';
import logger from '../../../utils/logger';
import { setSnackbar } from '../../../auth/authSlice';
import { Account, Transaction } from '../store/financeSlice';
import CreditCard from './CreditCard';

const CreditCards: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { accounts, transactions } = useSelector((state: RootState) => state.finance);

  useEffect(() => { dispatch(fetchAccounts()); }, [dispatch]);

  const [expandedAccount, setExpandedAccount] = useState<number | null>(null);
  const [expandedMonths, setExpandedMonths] = useState<{ [key: number]: { [key: string]: boolean } }>({});
  const [editingAccountId, setEditingAccountId] = useState<number | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [editedCreditCard, setEditedCreditCard] = useState<Account | null>(null);
  const [accountNames, setAccountNames] = useState<{ [key: number]: string }>(
    Object.values(accounts.byId).reduce((acc, account) => {
      acc[account.id] = account.name;
      return acc;
    }, {} as { [key: number]: string })
  );

  const accountsArray = useMemo(() => Object.values(accounts.byId).filter((account) => account.type === 'credit'), [accounts]);

  const transactionsByAccountId = useMemo(() => {
    const grouped: { [key: number]: Transaction[] } = {};
    Object.values(transactions.byId).forEach((tx) => {
      const accountId =
        tx.debit_card_id ||
        tx.credit_card_id ||
        tx.transfer_to_debit_card_id ||
        tx.transfer_to_credit_card_id;
      if (accountId) {
        if (!grouped[accountId]) grouped[accountId] = [];
        grouped[accountId].push(tx);
      }
    });
    return grouped;
  }, [transactions]);

  const handleExpandAccount = useCallback((accountId: number) => {
    setExpandedAccount((prev) => (prev === accountId ? null : accountId));
  }, []);

  const toggleMonthExpansion = useCallback((accountId: number, monthKey: string) => {
    setExpandedMonths((prev) => {
      const accountExpanded = prev[accountId] || {};
      return {
        ...prev,
        [accountId]: {
          ...accountExpanded,
          [monthKey]: !accountExpanded[monthKey],
        },
      };
    });
  }, []);

  const handleEditCardTitle = useCallback((accountId: number) => {
    setEditingAccountId(accountId);
  }, []);

  const handleSaveCardTitle = useCallback((accountId: number, newName: string) => {
    if (newName.trim()) {
      setAccountNames((prev) => ({
        ...prev,
        [accountId]: newName.trim(),
      }));
      setEditingAccountId(null);
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

  const handleOpenEditDialog = useCallback((account: Account) => {
    // Clone the account and include type and balance for editing
    setEditedCreditCard({
      ...account,
      credit_limit: account.credit_limit ?? 0,
      debt: account.debt ?? 0,
      grace_period: account.grace_period ?? '',
      min_payment: account.min_payment ?? 0,
      payment_due_date: account.payment_due_date ?? '',
    });
    setEditDialogOpen(true);
  }, []);

  const handleCloseEditDialog = useCallback(() => {
    setEditDialogOpen(false);
    setEditedCreditCard(null);
  }, []);

  const handleSaveCreditCard = useCallback(async () => {
    if (!editedCreditCard) {
      dispatch(setSnackbar({ message: 'Нет данных кредитной карты для сохранения', severity: 'error' }));
      return;
    }
    if (!editedCreditCard.name || editedCreditCard.debt === undefined) {
      dispatch(setSnackbar({ message: 'Заполните все обязательные поля кредитной карты', severity: 'error' }));
      return;
    }
    try {
      logger.info('CreditCards: Сохранение кредитной карты', { accountId: editedCreditCard.id });
      await dispatch(saveCreditCard({ accountId: editedCreditCard.id!, creditCardData: editedCreditCard })).unwrap();
      setAccountNames((prev) => ({
        ...prev,
        [editedCreditCard.id]: editedCreditCard.name,
      }));
      setEditDialogOpen(false);
      setEditedCreditCard(null);
      dispatch(setSnackbar({ message: 'Кредитная карта успешно обновлена', severity: 'success' }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
      logger.error('CreditCards: Ошибка сохранения кредитной карты', { error: errorMessage });
      dispatch(setSnackbar({ message: `Ошибка при сохранении кредитной карты: ${errorMessage}`, severity: 'error' }));
    }
  }, [dispatch, editedCreditCard]);

  const groupedTransactions = useMemo(() => {
    return accountsArray.map((account) => {
      const accountTxs = transactionsByAccountId[account.id] || [];

      const byMonth = accountTxs.reduce(
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
        ...account,
        monthlyGroups: Object.values(byMonth).sort((a, b) =>
          b.transactions[0].date.localeCompare(a.transactions[0].date)
        ),
      };
    });
  }, [accountsArray, transactionsByAccountId]);

  return (
    <Fade in={true} timeout={500}>
      <Box className="account-cards">
        {accountsArray.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
            <CreditCard
              creditLimit={100000}
              debt={25000}
              gracePeriod="50"
              minPayment={5000}
              paymentDueDate="30.04.2025"
            />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            {accountsArray.map((account) => (
              <CreditCard
                key={account.id}
                creditLimit={account.credit_limit ?? 0}
                debt={account.debt ?? 0}
                gracePeriod={account.grace_period ?? ''}
                minPayment={account.min_payment ?? 0}
                paymentDueDate={account.payment_due_date ?? ''}
              />
            ))}
          </Box>
        )}
        <EditCreditCardDialog
          open={editDialogOpen}
          onClose={handleCloseEditDialog}
          editedCreditCard={editedCreditCard}
          setEditedCreditCard={setEditedCreditCard}
          handleSaveCreditCard={handleSaveCreditCard}
        />
      </Box>
    </Fade>
  );
};

export default CreditCards;