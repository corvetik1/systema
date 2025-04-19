// Стили для модуля тендеров
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import { ToggleButtonGroup } from '@mui/material';

// Карточка бюджета тендеров (пример)
export const BudgetBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)',
  padding: theme.spacing(2),
  borderRadius: '16px',
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  backdropFilter: 'blur(10px)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  },
}));

// Пример: стили для фильтров тендеров
export const FilterPanelBox = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? '#23272e' : 'linear-gradient(135deg, #f7fafc 60%, #e3e8ee 100%)',
  borderRadius: 16,
  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

// Пример: стили для таблицы тендеров
export const TableContainerBox = styled(Box)(({ theme }) => ({
  borderRadius: 16,
  background: theme.palette.mode === 'dark' ? '#181c23' : '#fff',
  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
  padding: theme.spacing(2),
  height: 'calc(100vh - 300px)',
  display: 'flex',
  flexDirection: 'column',
}));

// Контейнер всей страницы тендеров
export const PageContainerBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  height: '100vh',
  backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#f0f2f5',
}));

// Верхний контейнер с меню и заметкой (sticky)
export const HeaderContainerBox = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 1100,
  backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#f0f2f5',
}));

// Контейнер для заметки в шапке
export const NoteBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff', // always white
  borderRadius: '16px',
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  backdropFilter: 'blur(10px)',
  width: '100%',
  marginTop: theme.spacing(1),
  zIndex: 1099,
  overflow: 'hidden',
  transition: 'max-height 0.3s ease-in-out',
}));

// Контейнер расширенных фильтров
export const AdvancedFiltersBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

// Контейнер для групп фильтров этапов
export const StageFilterGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  flexWrap: 'wrap',
}));

// Обёртка для компонента TenderTable
export const TableWrapperBox = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 300px)',
  display: 'flex',
  flexDirection: 'column',
}));

// Контейнер для кнопки выбора колонок в таблице
export const ColumnToggleBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: theme.spacing(1),
}));

// Контейнер для всплывающего выбора цвета метки
export const ColorPopoverBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.5),
  maxWidth: 150,
}));

// Можно добавить другие стили, например для шапки таблицы, фильтров, модалок и т.д.
