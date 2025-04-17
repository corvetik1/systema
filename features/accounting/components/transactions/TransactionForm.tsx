// src/features/accounting/components/transactions/TransactionForm.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Select, MenuItem, InputLabel, FormControl, Typography } from '@mui/material';
import {
  TransactionFormContainer,
  TransactionFormTitle,
  TransactionFormField,
  TransactionFormLabel,
  TransactionFormButtons,
} from '../AccountingStyles';
import { RootState } from '../../../../app/store';
import { addTransaction, updateTransaction } from '../../store/transactions/slice';
import { selectCounterparties } from '../../store/counterparties/selectors';

interface TransactionFormProps {
  transactionId: number | null; // null для создания, number для редактирования
  onClose: () => void;
}

interface TransactionFormData {
  type: 'income' | 'expense' | '';
  amount: string;
  date: string;
  category: string;
  counterpartyId: string;
  description: string;
  status: 'completed' | 'pending' | '';
}

const TransactionForm: React.FC<TransactionFormProps> = ({ transactionId, onClose }) => {
  const dispatch = useDispatch();
  const counterparties = useSelector((state: RootState) => selectCounterparties(state));
  const transaction = useSelector((state: RootState) =>
    transactionId
      ? state.accounting.transactions.transactions.find((t) => t.id === transactionId)
      : null
  );

  const [formData, setFormData] = useState<TransactionFormData>({
    type: '',
    amount: '',
    date: '',
    category: '',
    counterpartyId: '',
    description: '',
    status: '',
  });

  const [errors, setErrors] = useState<Partial<TransactionFormData>>({});

  // Инициализация формы для редактирования
  useEffect(() => {
    if (transaction) {
      setFormData({
        type: transaction.type,
        amount: transaction.amount.toString(),
        date: transaction.date,
        category: transaction.category,
        counterpartyId: transaction.counterpartyId.toString(),
        description: transaction.description || '',
        status: transaction.status,
      });
    }
  }, [transaction]);

  const validateForm = () => {
    const newErrors: Partial<TransactionFormData> = {};
    if (!formData.type) newErrors.type = 'Выберите тип операции';
    if (!formData.amount || parseFloat(formData.amount) <= 0)
      newErrors.amount = 'Введите сумму больше 0';
    if (!formData.date) newErrors.date = 'Выберите дату';
    else if (new Date(formData.date) > new Date()) newErrors.date = 'Дата не может быть в будущем';
    if (!formData.category) newErrors.category = 'Выберите категорию';
    if (!formData.counterpartyId) newErrors.counterpartyId = 'Выберите контрагента';
    if (!formData.status) newErrors.status = 'Выберите статус';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name!]: value }));
    setErrors((prev) => ({ ...prev, [name!]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const transactionData = {
      type: formData.type as 'income' | 'expense',
      amount: parseFloat(formData.amount),
      date: formData.date,
      category: formData.category,
      counterpartyId: parseInt(formData.counterpartyId),
      description: formData.description || undefined,
      status: formData.status as 'completed' | 'pending',
    };

    if (transactionId) {
      dispatch(updateTransaction({ id: transactionId, ...transactionData }));
    } else {
      dispatch(addTransaction(transactionData));
    }
    onClose();
  };

  const handleReset = () => {
    if (transaction) {
      setFormData({
        type: transaction.type,
        amount: transaction.amount.toString(),
        date: transaction.date,
        category: transaction.category,
        counterpartyId: transaction.counterpartyId.toString(),
        description: transaction.description || '',
        status: transaction.status,
      });
    } else {
      setFormData({
        type: '',
        amount: '',
        date: '',
        category: '',
        counterpartyId: '',
        description: '',
        status: '',
      });
    }
    setErrors({});
  };

  return (
    <TransactionFormContainer>
      <TransactionFormTitle>
        {transactionId ? 'Редактировать операцию' : 'Создать операцию'}
      </TransactionFormTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <TransactionFormField>
          <TransactionFormLabel>Тип операции</TransactionFormLabel>
          <FormControl fullWidth error={!!errors.type}>
            <InputLabel>Тип операции</InputLabel>
            <Select name="type" value={formData.type} onChange={handleChange} required>
              <MenuItem value="">Выберите тип</MenuItem>
              <MenuItem value="income">Доход</MenuItem>
              <MenuItem value="expense">Расход</MenuItem>
            </Select>
            {errors.type && <Typography color="error">{errors.type}</Typography>}
          </FormControl>
        </TransactionFormField>
        <TransactionFormField>
          <TransactionFormLabel>Сумма (₽)</TransactionFormLabel>
          <TextField
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Введите сумму"
            inputProps={{ min: 0, step: 0.01 }}
            required
            fullWidth
            error={!!errors.amount}
            helperText={errors.amount}
          />
        </TransactionFormField>
        <TransactionFormField>
          <TransactionFormLabel>Дата операции</TransactionFormLabel>
          <TextField
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
            fullWidth
            error={!!errors.date}
            helperText={errors.date}
          />
        </TransactionFormField>
        <TransactionFormField>
          <TransactionFormLabel>Категория</TransactionFormLabel>
          <FormControl fullWidth error={!!errors.category}>
            <InputLabel>Категория</InputLabel>
            <Select name="category" value={formData.category} onChange={handleChange} required>
              <MenuItem value="">Выберите категорию</MenuItem>
              <MenuItem value="sales">Продажи</MenuItem>
              <MenuItem value="salary">Зарплата</MenuItem>
              <MenuItem value="taxes">Налоги</MenuItem>
              <MenuItem value="other">Прочее</MenuItem>
            </Select>
            {errors.category && <Typography color="error">{errors.category}</Typography>}
          </FormControl>
        </TransactionFormField>
        <TransactionFormField>
          <TransactionFormLabel>Контрагент</TransactionFormLabel>
          <FormControl fullWidth error={!!errors.counterpartyId}>
            <InputLabel>Контрагент</InputLabel>
            <Select
              name="counterpartyId"
              value={formData.counterpartyId}
              onChange={handleChange}
              required
            >
              <MenuItem value="">Выберите контрагента</MenuItem>
              {counterparties.map((counterparty) => (
                <MenuItem key={counterparty.id} value={counterparty.id}>
                  {counterparty.name}
                </MenuItem>
              ))}
            </Select>
            {errors.counterpartyId && <Typography color="error">{errors.counterpartyId}</Typography>}
          </FormControl>
        </TransactionFormField>
        <TransactionFormField>
          <TransactionFormLabel>Описание</TransactionFormLabel>
          <TextField
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Введите описание (необязательно)"
            multiline
            rows={3}
            fullWidth
          />
        </TransactionFormField>
        <TransactionFormField>
          <TransactionFormLabel>Статус</TransactionFormLabel>
          <FormControl fullWidth error={!!errors.status}>
            <InputLabel>Статус</InputLabel>
            <Select name="status" value={formData.status} onChange={handleChange} required>
              <MenuItem value="">Выберите статус</MenuItem>
              <MenuItem value="completed">Завершено</MenuItem>
              <MenuItem value="pending">Ожидается</MenuItem>
            </Select>
            {errors.status && <Typography color="error">{errors.status}</Typography>}
          </FormControl>
        </TransactionFormField>
        <TransactionFormButtons>
          <Button type="submit" variant="contained" color="primary">
            Сохранить
          </Button>
          <Button type="reset" variant="contained" color="error" onClick={handleReset}>
            Отмена
          </Button>
        </TransactionFormButtons>
      </Box>
    </TransactionFormContainer>
  );
};

export default TransactionForm;