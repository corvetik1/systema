// src/config/visibleColumnsConfig.ts

/**
 * Начальная конфигурация видимых колонок для таблицы тендеров.
 * Массив объектов, где каждый объект описывает колонку.
 * @property {string} id - Уникальный идентификатор колонки (ключ в данных тендера).
 * @property {string} label - Заголовок колонки для отображения в UI.
 * @property {boolean} visible - Начальная видимость колонки в таблице.
 */
export interface ColumnConfig {
    id: string;
    label: string;
    visible: boolean;
  }
  
  export const initialVisibleColumns: ColumnConfig[] = [
    { id: 'stage', label: 'Этапы', visible: true }, // Этап тендера (например, "Победил ИП")
    { id: 'subject', label: 'Предмет закупки', visible: true }, // Предмет закупки (аналог note_input)
    { id: 'purchase_number', label: 'Номер закупки', visible: true }, // Номер закупки
    { id: 'end_date', label: 'Дата окончания', visible: true }, // Дата окончания тендера
    { id: 'note', label: 'Примечание', visible: true }, // Заметка тендера
    { id: 'platform_name', label: 'Название площадки', visible: true }, // Название платформы
    { id: 'start_price', label: 'Начальная цена', visible: true }, // Начальная максимальная цена (НМЦК)
    { id: 'risk_card', label: 'Карта рисков', visible: false }, // Карта рисков (по умолчанию скрыта)
    { id: 'contract_security', label: 'Обеспечение контракта', visible: false }, // Обеспечение контракта (по умолчанию скрыто)
    { id: 'platform_fee', label: 'Комиссия площадки', visible: true }, // Комиссия площадки
    { id: 'taxes', label: 'Налоги', visible: false }, // Налоговые затраты
    // Дополнительные поля из интерфейса Tender и компонентов
    { id: 'total_amount', label: 'Общая сумма', visible: true }, // Добавлено из TendersPage.tsx для бюджета
  ];
  
  export default initialVisibleColumns;