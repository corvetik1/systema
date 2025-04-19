// src/features/tenders/services/tenderService.ts
import api from '../../../api';

/**
 * Сервис для работы с тендерами через API.
 */
export const tenderService = {
  /**
   * Получение списка всех тендеров.
   */
  fetchTenders: async () => {
    return await api.getTenders();
  },

  /**
   * Добавление нового тендера.
   * @param {any} tenderData - Данные нового тендера.
   */
  addTender: async (tenderData: any) => {
    return await api.addTender(tenderData);
  },

  /**
   * Обновление существующего тендера.
   * @param {number} id - ID тендера.
   * @param {any} tenderData - Обновленные данные тендера.
   */
  updateTender: async (id: number, tenderData: any) => {
    return await api.updateTender(id, tenderData);
  },

  /**
   * Удаление тендера.
   * @param {number} id - ID тендера.
   */
  deleteTender: async (id: number) => {
    await api.deleteTender(id);
    return id;
  },
};