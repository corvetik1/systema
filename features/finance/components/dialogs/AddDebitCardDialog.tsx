import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../app/store';
import { addDebitCard } from '../../store/financeActions';
import logger from '../../../../utils/logger';
import { setSnackbar } from '../../../../auth/authSlice';
import { StyledDialog } from '../FinanceStyles';
import { Box, Button, TextField, Typography } from '@mui/material';

interface AddDebitCardDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddDebitCardDialog: React.FC<AddDebitCardDialogProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useSelector((state: RootState) => state.auth);

  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSave = useCallback(async () => {
    if (!name.trim()) {
      setError('Название карты обязательно');
      return;
    }
    if (userId == null) {
      dispatch(setSnackbar({ message: 'Пользователь не авторизован', severity: 'error' }));
      return;
    }
    try {
      await dispatch(addDebitCard({ name: name.trim(), user_id: userId })).unwrap();
      setName('');
      dispatch(setSnackbar({ message: 'Дебетовая карта добавлена', severity: 'success' }));
      logger.info('AddDebitCardDialog: Дебетовая карта добавлена', { name });
      onClose();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Ошибка при добавлении карты';
      dispatch(setSnackbar({ message: msg, severity: 'error' }));
      logger.error('AddDebitCardDialog: Ошибка при добавлении', err);
    }
  }, [name, userId, dispatch, onClose]);

  const handleCancel = useCallback(() => {
    setName('');
    setError('');
    onClose();
  }, [onClose]);

  if (!open) return null;

  return (
    <StyledDialog open={open} onClose={handleCancel}>
      <Box className="dialog" sx={{ p: 2 }}>
        <Typography variant="h6">Добавить дебетовую карту</Typography>
        <TextField
          label="Название карты"
          value={name}
          onChange={(e) => { setName(e.target.value); setError(''); }}
          error={Boolean(error)}
          helperText={error}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
          <Button onClick={handleCancel}>Отмена</Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Добавить
          </Button>
        </Box>
      </Box>
    </StyledDialog>
  );
};

export default AddDebitCardDialog;
