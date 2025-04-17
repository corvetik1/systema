// src/features/accounting/components/documents/DocumentList.tsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from '@mui/material';
import {
  DocumentTableContainer,
  DocumentTableHeader,
  DocumentTableCell,
  DocumentViewButton,
  DocumentFilterForm,
  DocumentFilterGroup,
} from '../AccountingStyles';
import { RootState } from '../../../../app/store';
import { fetchDocuments, setFilter } from '../../store/documents/slice';
import DocumentModal from './DocumentModal';

const DocumentList: React.FC = () => {
  const dispatch = useDispatch();
  const { documents, filters, loading } = useSelector((state: RootState) => state.accounting.documents);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  const handleView = (document: any) => {
    setSelectedDocument(document);
    setOpenModal(true);
  };

  const handleFilterChange = (field: string, value: string) => {
    dispatch(setFilter({ field, value }));
  };

  const handleSort = (field: string) => {
    dispatch(setFilter({ field: 'sortBy', value: field }));
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Список документов
      </Typography>
      <DocumentFilterForm>
        <DocumentFilterGroup>
          <FormControl fullWidth>
            <InputLabel>Тип документа</InputLabel>
            <Select
              value={filters.docType}
              onChange={(e) => handleFilterChange('docType', e.target.value)}
              label="Тип документа"
            >
              <MenuItem value="">Все</MenuItem>
              <MenuItem value="invoice">Счет</MenuItem>
              <MenuItem value="delivery">Накладная</MenuItem>
              <MenuItem value="act">Акт выполненных работ</MenuItem>
              <MenuItem value="torg12">ТОРГ-12</MenuItem>
            </Select>
          </FormControl>
        </DocumentFilterGroup>
        <DocumentFilterGroup>
          <TextField
            type="date"
            label="Дата"
            value={filters.docDate}
            onChange={(e) => handleFilterChange('docDate', e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </DocumentFilterGroup>
        <DocumentFilterGroup>
          <TextField
            label="Контрагент"
            value={filters.contractor}
            onChange={(e) => handleFilterChange('contractor', e.target.value)}
            placeholder="Введите контрагента"
            fullWidth
          />
        </DocumentFilterGroup>
      </DocumentFilterForm>
      <DocumentTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <DocumentTableHeader onClick={() => handleSort('number')}>
                Номер
              </DocumentTableHeader>
              <DocumentTableHeader onClick={() => handleSort('date')}>
                Дата
              </DocumentTableHeader>
              <DocumentTableHeader onClick={() => handleSort('type')}>
                Тип документа
              </DocumentTableHeader>
              <DocumentTableHeader onClick={() => handleSort('contractor')}>
                Контрагент
              </DocumentTableHeader>
              <DocumentTableHeader onClick={() => handleSort('amount')}>
                Сумма
              </DocumentTableHeader>
              <DocumentTableHeader>Действие</DocumentTableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <DocumentTableCell>{doc.number}</DocumentTableCell>
                <DocumentTableCell>{doc.date}</DocumentTableCell>
                <DocumentTableCell>{doc.type}</DocumentTableCell>
                <DocumentTableCell>{doc.contractor}</DocumentTableCell>
                <DocumentTableCell>{doc.amount}</DocumentTableCell>
                <DocumentTableCell>
                  <DocumentViewButton onClick={() => handleView(doc)}>
                    Просмотр
                  </DocumentViewButton>
                </DocumentTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DocumentTableContainer>
      {openModal && selectedDocument && (
        <DocumentModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          document={selectedDocument}
        />
      )}
    </Box>
  );
};

export default DocumentList;