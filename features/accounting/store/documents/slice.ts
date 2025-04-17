// src/features/accounting/store/documents/slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Document } from '../../types/document';

interface DocumentState {
  documents: Document[];
  filters: {
    docType: string;
    docDate: string;
    contractor: string;
    sortBy: string;
  };
  loading: boolean;
  error: string | null;
}

const initialState: DocumentState = {
  documents: [
    {
      id: 1,
      number: '102',
      date: '2023-10-04',
      type: 'Счет',
      contractor: 'ООО Рога и Копыта',
      amount: '12 000 ₽',
      url: 'sample.pdf',
    },
    {
      id: 2,
      number: '101',
      date: '2023-09-28',
      type: 'Накладная',
      contractor: 'ЗАО Пример',
      amount: '8 500 ₽',
      url: 'sample.pdf',
    },
    {
      id: 3,
      number: '103',
      date: '2023-10-06',
      type: 'Акт выполненных работ',
      contractor: 'ИП Иванов',
      amount: '15 750 ₽',
      url: 'sample.pdf',
    },
    {
      id: 4,
      number: '100',
      date: '2023-09-20',
      type: 'Счет',
      contractor: 'ООО Новые Технологии',
      amount: '20 000 ₽',
      url: 'sample.pdf',
    },
  ],
  filters: {
    docType: '',
    docDate: '',
    contractor: '',
    sortBy: '',
  },
  loading: false,
  error: null,
};

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    fetchDocuments(state) {
      state.loading = true;
    },
    fetchDocumentsSuccess(state, action: PayloadAction<Document[]>) {
      state.documents = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchDocumentsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addDocument(state, action: PayloadAction<any>) {
      state.documents.push({
        id: state.documents.length + 1,
        number: action.payload.docNumber,
        date: action.payload.docDate,
        type: 'Счет',
        contractor: action.payload.contractor,
        amount: `${action.payload.totalAmount.toLocaleString('ru-RU')} ₽`,
        url: 'sample.pdf',
      });
    },
    setFilter(state, action: PayloadAction<{ field: keyof DocumentState['filters']; value: string }>) {
      state.filters[action.payload.field] = action.payload.value;
    },
  },
});

export const {
  fetchDocuments,
  fetchDocumentsSuccess,
  fetchDocumentsFailure,
  addDocument,
  setFilter,
} = documentsSlice.actions;
export default documentsSlice.reducer;