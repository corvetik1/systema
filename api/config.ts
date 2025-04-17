import api from './index';

export const getTenders = () => api.getTenders();
export const addTender = (tenderData: any) => api.addTender(tenderData);
export const updateTender = (id: number, tenderData: any) => api.updateTender(id, tenderData);
export const deleteTender = (id: number) => api.deleteTender(id);
export const getTenderBudget = (tenderId: number) => api.getTenderBudget(tenderId);
export const getHeaderNote = () => api.getHeaderNote();
export const saveHeaderNote = (content: string) => api.saveHeaderNote(content);