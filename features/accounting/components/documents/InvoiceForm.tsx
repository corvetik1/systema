// src/features/accounting/components/documents/InvoiceForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import {
  DocumentFormCard,
  DocumentFormGroup,
  DocumentFormLabel,
  DocumentFormInput,
  DocumentFormButton,
  DocumentFormButtons,
  DocumentPositionsTable,
  DocumentPositionInput,
} from '../AccountingStyles';
import { addDocument } from '../../store/documents/slice';

const InvoiceForm: React.FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    docNumber: '',
    docDate: '',
    contractor: '',
    totalAmount: 0,
    positions: [{ id: 1, name: '', quantity: 1, price: 0, total: 0 }],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePositionChange = (id: number, field: string, value: string | number) => {
    setFormData((prev) => {
      const positions = prev.positions.map((pos) =>
        pos.id === id
          ? {
              ...pos,
              [field]: value,
              total:
                field === 'quantity' || field === 'price'
                  ? (field === 'quantity' ? Number(value) : pos.quantity) *
                    (field === 'price' ? Number(value) : pos.price)
                  : pos.total,
            }
          : pos
      );
      const totalAmount = positions.reduce((sum, pos) => sum + pos.total, 0);
      return { ...prev, positions, totalAmount };
    });
  };

  const addPosition = () => {
    setFormData((prev) => ({
      ...prev,
      positions: [
        ...prev.positions,
        { id: prev.positions.length + 1, name: '', quantity: 1, price: 0, total: 0 },
      ],
    }));
  };

  const removePosition = (id: number) => {
    setFormData((prev) => {
      const positions = prev.positions.filter((pos) => pos.id !== id);
      const totalAmount = positions.reduce((sum, pos) => sum + pos.total, 0);
      return { ...prev, positions, totalAmount };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addDocument(formData));
  };

  return (
    <DocumentFormCard>
      <Typography variant="h5" gutterBottom>
        Создание счета
      </Typography>
      <form onSubmit={handleSubmit}>
        <DocumentFormGroup>
          <DocumentFormLabel>Номер документа:</DocumentFormLabel>
          <DocumentFormInput
            name="docNumber"
            value={formData.docNumber}
            onChange={handleChange}
            placeholder="Введите номер документа"
            required
          />
        </DocumentFormGroup>
        <DocumentFormGroup>
          <DocumentFormLabel>Дата документа:</DocumentFormLabel>
          <DocumentFormInput
            type="date"
            name="docDate"
            value={formData.docDate}
            onChange={handleChange}
            required
          />
        </DocumentFormGroup>
        <DocumentFormGroup>
          <DocumentFormLabel>Контрагент:</DocumentFormLabel>
          <DocumentFormInput
            name="contractor"
            value={formData.contractor}
            onChange={handleChange}
            placeholder="Введите название контрагента"
            required
          />
        </DocumentFormGroup>
        <DocumentFormGroup>
          <DocumentFormLabel>Общая сумма:</DocumentFormLabel>
          <DocumentFormInput
            value={formData.totalAmount.toLocaleString('ru-RU', {
              style: 'currency',
              currency: 'RUB',
            })}
            readOnly
          />
        </DocumentFormGroup>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Позиции (товары/услуги)</Typography>
          <Button onClick={addPosition} sx={{ mb: 2 }}>
            Добавить позицию
          </Button>
          <DocumentPositionsTable component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>№</TableCell>
                  <TableCell>Наименование</TableCell>
                  <TableCell>Количество</TableCell>
                  <TableCell>Цена за единицу</TableCell>
                  <TableCell>Сумма</TableCell>
                  <TableCell>Действие</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formData.positions.map((pos) => (
                  <TableRow key={pos.id}>
                    <TableCell>{pos.id}</TableCell>
                    <TableCell>
                      <DocumentPositionInput
                        value={pos.name}
                        onChange={(e) =>
                          handlePositionChange(pos.id, 'name', e.target.value)
                        }
                        placeholder="Наименование"
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <DocumentPositionInput
                        type="number"
                        value={pos.quantity}
                        onChange={(e) =>
                          handlePositionChange(pos.id, 'quantity', e.target.value)
                        }
                        min="1"
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <DocumentPositionInput
                        type="number"
                        value={pos.price}
                        onChange={(e) =>
                          handlePositionChange(pos.id, 'price', e.target.value)
                        }
                        min="0"
                        step="0.01"
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <DocumentPositionInput
                        value={pos.total}
                        readOnly
                        type="number"
                        step="0.01"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        onClick={() => removePosition(pos.id)}
                      >
                        Удалить
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DocumentPositionsTable>
        </Box>
        <DocumentFormButtons>
          <DocumentFormButton type="submit" color="primary">
            Сохранить
          </DocumentFormButton>
          <DocumentFormButton type="reset" color="error">
            Отмена
          </DocumentFormButton>
          <DocumentFormButton
            color="warning"
            onClick={() => alert('Предпросмотр...')}
          >
            Предпросмотр
          </DocumentFormButton>
        </DocumentFormButtons>
      </form>
    </DocumentFormCard>
  );
};

export default InvoiceForm;