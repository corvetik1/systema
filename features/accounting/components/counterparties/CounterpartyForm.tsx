// src/features/accounting/components/counterparties/CounterpartyForm.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField } from '@mui/material';
import {
  CounterpartyFormContainer,
  CounterpartyFormTitle,
  CounterpartyFormField,
  CounterpartyFormLabel,
  CounterpartyFormButtons,
} from '../AccountingStyles';
import { RootState } from '../../../../app/store';
import { addCounterparty, updateCounterparty } from '../../store/counterparties/slice';

interface CounterpartyFormProps {
  counterpartyId: number | null;
  onClose: () => void;
}

const CounterpartyForm: React.FC<CounterpartyFormProps> = ({ counterpartyId, onClose }) => {
  const dispatch = useDispatch();
  const counterparty = useSelector((state: RootState) =>
    counterpartyId
      ? state.accounting.counterparties.counterparties.find((c) => c.id === counterpartyId)
      : null
  );

  const [formData, setFormData] = useState({
    name: '',
    inn: '',
    details: '',
    address: '',
    phone: '',
    email: '',
    status: 'active',
  });

  useEffect(() => {
    if (counterparty) {
      setFormData({
        name: counterparty.name,
        inn: counterparty.inn,
        details: counterparty.details || '',
        address: counterparty.address || '',
        phone: counterparty.phone,
        email: counterparty.email || '',
        status: counterparty.status,
      });
    }
  }, [counterparty]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (counterpartyId) {
      dispatch(updateCounterparty({ id: counterpartyId, ...formData }));
    } else {
      dispatch(addCounterparty(formData));
    }
    onClose();
  };

  const handleReset = () => {
    if (counterparty) {
      setFormData({
        name: counterparty.name,
        inn: counterparty.inn,
        details: counterparty.details || '',
        address: counterparty.address || '',
        phone: counterparty.phone,
        email: counterparty.email || '',
        status: counterparty.status,
      });
    } else {
      setFormData({
        name: '',
        inn: '',
        details: '',
        address: '',
        phone: '',
        email: '',
        status: 'active',
      });
    }
  };

  return (
    <CounterpartyFormContainer>
      <CounterpartyFormTitle>
        {counterpartyId ? 'Редактировать контрагента' : 'Создать контрагента'}
      </CounterpartyFormTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <CounterpartyFormField>
          <CounterpartyFormLabel htmlFor="name">Название компании</CounterpartyFormLabel>
          <TextField
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Введите название компании"
            required
            fullWidth
          />
        </CounterpartyFormField>
        <CounterpartyFormField>
          <CounterpartyFormLabel htmlFor="inn">ИНН</CounterpartyFormLabel>
          <TextField
            id="inn"
            name="inn"
            value={formData.inn}
            onChange={handleChange}
            placeholder="Введите ИНН"
            inputProps={{ pattern: '\\d{10}|\\d{12}' }}
            required
            fullWidth
          />
        </CounterpartyFormField>
        <CounterpartyFormField>
          <CounterpartyFormLabel htmlFor="details">Реквизиты компании</CounterpartyFormLabel>
          <TextField
            id="details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            placeholder="Введите реквизиты компании"
            multiline
            rows={3}
            fullWidth
          />
        </CounterpartyFormField>
        <CounterpartyFormField>
          <CounterpartyFormLabel htmlFor="address">Адрес</CounterpartyFormLabel>
          <TextField
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Введите адрес"
            required
            fullWidth
          />
        </CounterpartyFormField>
        <CounterpartyFormField>
          <CounterpartyFormLabel htmlFor="phone">Телефон</CounterpartyFormLabel>
          <TextField
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Введите телефон"
            type="tel"
            required
            fullWidth
          />
        </CounterpartyFormField>
        <CounterpartyFormField>
          <CounterpartyFormLabel htmlFor="email">Email</CounterpartyFormLabel>
          <TextField
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Введите email"
            type="email"
            required
            fullWidth
          />
        </CounterpartyFormField>
        <CounterpartyFormButtons>
          <Button type="submit" className="save-btn">
            Сохранить
          </Button>
          <Button type="reset" className="cancel-btn" onClick={handleReset}>
            Отмена
          </Button>
        </CounterpartyFormButtons>
      </Box>
    </CounterpartyFormContainer>
  );
};

export default CounterpartyForm;