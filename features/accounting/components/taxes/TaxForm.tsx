// src/features/accounting/components/taxes/TaxForm.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import {
  TaxFormContainer,
  TaxFormTitle,
  TaxFormField,
  TaxFormLabel,
  TaxFormButtons,
} from '../AccountingStyles';
import { RootState } from '../../../../app/store';
import { addTax, updateTax } from '../../store/taxes/slice';

interface TaxFormProps {
  taxId: number | null;
  onClose: () => void;
}

interface TaxFormData {
  name: string;
  amount: string;
  paymentDate: string;
  taxType: string;
}

const TaxForm: React.FC<TaxFormProps> = ({ taxId, onClose }) => {
  const dispatch = useDispatch();
  const tax = useSelector((state: RootState) =>
    taxId ? state.accounting.taxes.taxes.find((t) => t.id === taxId) : null
  );

  const [formData, setFormData] = useState<TaxFormData>({
    name: '',
    amount: '',
    paymentDate: '',
    taxType: '',
  });

  useEffect(() => {
    if (tax) {
      setFormData({
        name: tax.name,
        amount: tax.amount.toString(),
        paymentDate: tax.paymentDate,
        taxType: tax.taxType,
      });
    }
  }, [tax]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name!]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const taxData = {
      name: formData.name,
      amount: parseFloat(formData.amount),
      paymentDate: formData.paymentDate,
      taxType: formData.taxType,
    };
    if (taxId) {
      dispatch(updateTax({ id: taxId, ...taxData }));
    } else {
      dispatch(addTax(taxData));
    }
    onClose();
  };

  const handleReset = () => {
    if (tax) {
      setFormData({
        name: tax.name,
        amount: tax.amount.toString(),
        paymentDate: tax.paymentDate,
        taxType: tax.taxType,
      });
    } else {
      setFormData({
        name: '',
        amount: '',
        paymentDate: '',
        taxType: '',
      });
    }
  };

  return (
    <TaxFormContainer>
      <TaxFormTitle>{taxId ? 'Редактировать налог' : 'Создать налог'}</TaxFormTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <TaxFormField>
          <TaxFormLabel>Название налога</TaxFormLabel>
          <TextField
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Введите название налога"
            required
            fullWidth
          />
        </TaxFormField>
        <TaxFormField>
          <TaxFormLabel>Сумма (₽)</TaxFormLabel>
          <TextField
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Введите сумму"
            inputProps={{ min: 0, step: 0.01 }}
            required
            fullWidth
          />
        </TaxFormField>
        <TaxFormField>
          <TaxFormLabel>Дата уплаты</TaxFormLabel>
          <TextField
            name="paymentDate"
            type="date"
            value={formData.paymentDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
            fullWidth
          />
        </TaxFormField>
        <TaxFormField>
          <TaxFormLabel>Тип налога</TaxFormLabel>
          <FormControl fullWidth>
            <InputLabel>Тип налога</InputLabel>
            <Select
              name="taxType"
              value={formData.taxType}
              onChange={handleChange}
              required
            >
              <MenuItem value="">Выберите тип налога</MenuItem>
              <MenuItem value="nds">НДС</MenuItem>
              <MenuItem value="profitTax">Налог на прибыль</MenuItem>
              <MenuItem value="propertyTax">Налог на имущество</MenuItem>
              <MenuItem value="excise">Акцизный сбор</MenuItem>
            </Select>
          </FormControl>
        </TaxFormField>
        <TaxFormButtons>
          <Button type="submit" variant="contained" color="primary">
            Сохранить
          </Button>
          <Button type="reset" variant="contained" color="error" onClick={handleReset}>
            Отмена
          </Button>
        </TaxFormButtons>
      </Box>
    </TaxFormContainer>
  );
};

export default TaxForm;