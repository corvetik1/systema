// src/api/index.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
});

const api = {
  // Tenders
  getTenders: () => apiClient.get('/tenders').then(res => res.data),
  addTender: (tenderData: any) => apiClient.post('/tenders', tenderData).then(res => res.data),
  updateTender: (id: number, tenderData: any) => apiClient.put(`/tenders/${id}`, tenderData).then(res => res.data),
  deleteTender: (id: number) => apiClient.delete(`/tenders/${id}`).then(res => res.data),
  getTenderBudget: (tenderId: number) => apiClient.get(`/tenders/${tenderId}/budget`).then(res => res.data),
  getHeaderNote: () => apiClient.get('/tenders/header-note').then(res => res.data),
  saveHeaderNote: (content: string) => apiClient.post('/tenders/header-note', { content }).then(res => res.data),
  // Получить все финансовые данные для пользователя (заглушка)
  getAllFinanceData: (userId: number) =>
    apiClient.get(`/finance/all?userId=${userId}`).then(res => res.data),
  // Accounts
  getAccounts: () => apiClient.get('/accounts').then(res => res.data),
  addAccount: (data: any) => apiClient.post('/accounts', data).then(res => res.data),
  updateAccount: (id: number, data: any) => apiClient.put(`/accounts/${id}`, data).then(res => res.data),
  deleteAccount: (id: number, type: 'debit' | 'credit') => apiClient.delete(`/accounts/${id}?type=${type}`),

  // Transactions
  getTransactions: () => apiClient.get('/transactions').then(res => res.data),
  addTransaction: (data: any) => apiClient.post('/transactions', data).then(res => res.data),
  updateTransaction: (id: number, data: any) => apiClient.put(`/transactions/${id}`, data).then(res => res.data),
  deleteTransaction: (id: number) => apiClient.delete(`/transactions/${id}`),

  // Debts
  getDolgTable: () => apiClient.get('/debts').then(res => res.data),
  addDebt: (data: any) => apiClient.post('/debts', data).then(res => res.data),
  updateDebt: (id: number, data: any) => apiClient.put(`/debts/${id}`, data).then(res => res.data),
  deleteDebt: (id: number) => apiClient.delete(`/debts/${id}`),

  // Loans
  getLoans: () => apiClient.get('/loans').then(res => res.data),
  addLoan: (data: any) => apiClient.post('/loans', data).then(res => res.data),
  updateLoan: (id: number, data: any) => apiClient.put(`/loans/${id}`, data).then(res => res.data),
  deleteLoan: (id: number) => apiClient.delete(`/loans/${id}`),

  // Credit Cards
  addCreditCard: (data: any) => apiClient.post('/credit-cards', data).then(res => res.data),
  updateCreditCard: (id: number, data: any) => apiClient.put(`/credit-cards/${id}`, data).then(res => res.data),

  // Debit Cards
  addDebitCard: (data: any) => apiClient.post('/debit-cards', data).then(res => res.data),

  // Toggle Paid Status
  toggleDebtPaid: (id: number, paid: boolean) => apiClient.patch(`/debts/${id}/toggle-paid`, { paid }).then(res => res.data),
  toggleCreditCardPaid: (id: number, paid: boolean) => apiClient.patch(`/credit-cards/${id}/toggle-paid`, { paid }).then(res => res.data),
  toggleLoanPaid: (id: number, paid: boolean) => apiClient.patch(`/loans/${id}/toggle-paid`, { paid }).then(res => res.data),
  // ... Добавьте остальные методы по необходимости
};

export default api;