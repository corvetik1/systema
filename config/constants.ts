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
    { id: 'id', label: 'Идентификатор', visible: true }, // Уникальный ID тендера
    { id: 'stage', label: 'Этапы', visible: true }, // Этап тендера (например, "Победил ИП")
    { id: 'subject', label: 'Предмет закупки', visible: true }, // Предмет закупки (аналог note_input)
    { id: 'purchase_number', label: 'Номер закупки', visible: true }, // Номер закупки
    { id: 'end_date', label: 'Дата окончания', visible: true }, // Дата окончания тендера
    { id: 'note', label: 'Примечание', visible: true }, // Заметка тендера
    { id: 'platform_name', label: 'Название площадки', visible: true }, // Название платформы
    { id: 'start_price', label: 'Начальная цена', visible: true }, // Начальная максимальная цена (НМЦК)
    { id: 'winner_price', label: 'Цена победителя', visible: true }, // Цена победителя
    { id: 'winner_name', label: 'Победитель', visible: true }, // Имя победителя
    { id: 'risk_card', label: 'Карта рисков', visible: false }, // Карта рисков (по умолчанию скрыта)
    { id: 'contract_security', label: 'Обеспечение контракта', visible: false }, // Обеспечение контракта (по умолчанию скрыто)
    { id: 'platform_fee', label: 'Комиссия площадки', visible: true }, // Комиссия площадки
    { id: 'color_label', label: 'Цвет метки', visible: true }, // Цветовая метка тендера
    // Дополнительные поля из интерфейса Tender и компонентов
    { id: 'total_amount', label: 'Общая сумма', visible: true }, // Добавлено из TendersPage.tsx для бюджета
    { id: 'user_id', label: 'ID пользователя', visible: false }, // ID пользователя (по умолчанию скрыто)
  ];
  
  export const FINANCE_TRANSACTION_TYPES = [
  { value: 'income', label: 'Доход' },
  { value: 'expense', label: 'Расход' },
  { value: 'transfer_in', label: 'Перевод' },
];

export const FINANCE_TRANSACTION_TYPES_ARRAY = [
  { value: 'income', label: 'Доход' },
  { value: 'expense', label: 'Расход' },
  { value: 'transfer_in', label: 'Перевод' },
];

export const COLORS = [
  { label: 'Красный', value: '#f44336' },
  { label: 'Зелёный', value: '#4caf50' },
  { label: 'Синий', value: '#1976d2' },
  { label: 'Жёлтый', value: '#ffeb3b' },
  { label: 'Серый', value: '#bdbdbd' },
  { label: 'Без цвета', value: '' },
];

export const TENDER_STAGE_LIST = [
  { key: 'Подал ИП', label: 'Подал', color: '#1976d2', icon: 'business', groups: ['ИП'] },
  { key: 'Участвую', label: 'Участвую', color: '#1976d2', icon: 'business', groups: ['ИП'] },
  { key: 'Просчет ИП', label: 'Просчет', color: '#2196f3', icon: 'settings', groups: ['ИП'] },
  { key: 'В работе', label: 'В работе', color: '#43a047', icon: 'check_circle', groups: ['ИП'] },
  { key: 'Выиграл', label: 'Выиграл', color: '#43a047', icon: 'check_circle', groups: ['ИП'] },
  { key: 'Подписание контракта', label: 'Подписание контракта', color: '#43a047', icon: 'check_circle', groups: ['ИП'] },
  { key: 'Исполнение', label: 'Исполнение', color: '#43a047', icon: 'check_circle', groups: ['ИП'] },
  { key: 'Ожидание оплаты', label: 'Ожидание оплаты', color: '#43a047', icon: 'check_circle', groups: ['ИП'] },
  { key: 'Исполнено', label: 'Исполнено', color: '#43a047', icon: 'check_circle', groups: ['ИП'] },
  { key: 'Просчет ТА', label: 'Просчет', color: '#fb8c00', icon: 'assignment', groups: ['ТА'] },
  { key: 'В работе ТА', label: 'В работе', color: '#fb8c00', icon: 'assignment', groups: ['ТА'] },
  { key: 'Отправил ТА', label: 'Отправил', color: '#fb8c00', icon: 'assignment', groups: ['ТА'] },
  { key: 'Исполнение ТА', label: 'Исполнение', color: '#fb8c00', icon: 'assignment', groups: ['ТА'] },
  { key: 'Исполнено ТА', label: 'Исполнено', color: '#fb8c00', icon: 'assignment', groups: ['ТА'] },
  { key: 'Проиграл', label: 'Проиграл', color: '#fb8c00', icon: 'assignment', groups: ['ТА'] },
];

export const TENDER_STAGES = [
  {
    group: 'ИП',
    color: '#1976d2',
    participationOrder: ['Просчет ИП', 'В работе', 'Участвую', 'Подал ИП'],
    postWinOrder: ['Выиграл', 'Подписание контракта', 'Исполнение', 'Ожидание оплаты', 'Исполнено'],
  },
  {
    group: 'ТА',
    color: '#fb8c00',
    participationOrder: ['Просчет ТА', 'В работе ТА', 'Отправил ТА'],
    postWinOrder: ['Исполнение ТА', 'Исполнено ТА'],
  },
];

export const TENDER_LAWS = [
  '44-ФЗ',
  '223-ФЗ',
  '615-ПП',
];

export const FINANCE_INCOME_CATEGORIES = [
  'Зарплата',
  'Подарок',
  'Продажа',
  'Другое',
];

export const FINANCE_EXPENSE_CATEGORIES = [
  'Еда',
  'Транспорт',
  'Жильё',
  'Развлечения',
  'Другое',
];

export const FINANCE_CATEGORIES = [
  ...FINANCE_EXPENSE_CATEGORIES,
  ...FINANCE_INCOME_CATEGORIES,
];

export const MAX_IMPORT_ROWS = 1000;

export default initialVisibleColumns;