// src/features/tenders/components/TendersPage.tsx
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Dialog,
  Button,
  Alert,
  DialogTitle,
  DialogContent,
  Snackbar,
} from '@mui/material';
import { useTheme } from '@mui/system';
import TenderMenu from './TenderMenu';
import TenderTable from './TenderTable';
import ReportModal from './ReportModal';
import TenderFilters from './TenderFilters';
import TenderAdvancedFilters from './TenderAdvancedFilters';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../app/store';
import { tenderService } from '../services/tenderService';
import { fetchTenders, addTender, updateTender, deleteTender } from '../tenderActions';
import { setSelectedRows, setSortConfig, updateHeaderNote, addTenderRealtime, loadDemoTenders } from '../store/tendersSlice';
import logger from '../../../utils/logger';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { MAX_IMPORT_ROWS } from '../../../config/constants'; // Используем MAX_IMPORT_ROWS из constants
import { BudgetBox, FilterPanelBox, TableContainerBox, PageContainerBox, HeaderContainerBox, NoteBox } from '../styles';

/**
 * Демо-данные для тендеров.
 * Имитируют структуру реальных тендеров для тестирования без подключения к серверу.
 */
const demoTenders = [
  {
    id: 1,
    stage: 'Подал ИП',
    subject: 'Поставка офисной мебели',
    purchase_number: '采购123',
    end_date: '2025-04-15',
    note: 'Тестовая заметка 1: Поставка офисной мебели для нового офиса.',
    note_input: 'Офисная мебель',
    platform_name: 'Закупки РФ',
    start_price: '500000',
    winner_price: '450000',
    winner_name: 'ООО Победа',
    risk_card: 'Низкий риск',
    contract_security: '50000',
    platform_fee: '10000',
    color_label: '#FF0000',
    user_id: 1,
    total_amount: '500000',
  },
  {
    id: 2,
    stage: 'Победил ИП',
    subject: 'Ремонт оборудования',
    purchase_number: '采购124',
    end_date: '2025-04-20',
    note: 'Тестовая заметка 2: Ремонт производственного оборудования на заводе.',
    note_input: 'Ремонт',
    platform_name: 'ТендерПро',
    start_price: '300000',
    winner_price: '280000',
    winner_name: 'ИП Иванов',
    risk_card: 'Средний риск',
    contract_security: '30000',
    platform_fee: '5000',
    color_label: '#00FF00',
    user_id: 1,
    total_amount: '280000',
  },
  {
    id: 3,
    stage: 'Исполнено',
    subject: 'Поставка компьютеров',
    purchase_number: '采购125',
    end_date: '2025-03-30',
    note: 'Тестовая заметка 3: Поставка компьютеров для IT-отдела.',
    note_input: 'Компьютеры',
    platform_name: 'ГосЗакупки',
    start_price: '1000000',
    winner_price: '950000',
    winner_name: 'ООО Техно',
    risk_card: 'Высокий риск',
    contract_security: '100000',
    platform_fee: '20000',
    color_label: '#0000FF',
    user_id: 1,
    total_amount: '950000',
  },
];

/**
 * Главный компонент страницы тендеров.
 * Управляет отображением тендеров, фильтрацией, редактированием заметок и уведомлениями.
 * @returns {JSX.Element} Компонент страницы тендеров.
 */
const TendersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const { userId, token } = useSelector((state: RootState) => state.auth);
  const tenderState = useSelector((state: RootState) => state.tenders);
  const { error: saveError, setTemporaryError } = useErrorHandler();

  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [headerNoteEditorState, setHeaderNoteEditorState] = useState(() => EditorState.createEmpty());
  const [isNoteExpanded, setIsNoteExpanded] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleNotify = useCallback((message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
    logger.debug('TendersPage: Уведомление отображено', { message, severity });
  }, []);

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  useEffect(() => {
    if (token && userId) {
      logger.info('TendersPage: Инициализация с демо-данными', { userId });
      // dispatch(fetchTenders()); // Раскомментировать для реального API
    } else {
      logger.warn('TendersPage: Отсутствует токен или userId для загрузки данных');
    }
  }, [dispatch, token, userId]);

  useEffect(() => {
    try {
      if (tenderState.headerNote) {
        const contentState = convertFromRaw(JSON.parse(tenderState.headerNote));
        setHeaderNoteEditorState(EditorState.createWithContent(contentState));
      }
    } catch (e) {
      logger.error('TendersPage: Ошибка парсинга headerNote', e);
      setHeaderNoteEditorState(EditorState.createEmpty());
      handleNotify('Ошибка при загрузке заметки в шапке', 'error');
    }
  }, [tenderState.headerNote, handleNotify]);

  const calculateBudgetMemo = useMemo(() => {
    const executionStages = ['Победил ИП', 'Подписание контракта', 'Исполнение', 'Ожидание оплаты', 'Исполнено'];
    const reserved = tenderState.tenders.allIds
      .map((id) => tenderState.tenders.byId[id])
      .filter((tender) => tender.stage === 'Подал ИП')
      .reduce((sum, tender) => sum + (parseFloat(tender.total_amount || '0') || 0), 0);
    const spent = tenderState.tenders.allIds
      .map((id) => tenderState.tenders.byId[id])
      .filter((tender) => executionStages.includes(tender.stage || ''))
      .reduce((sum, tender) => sum + (parseFloat(tender.total_amount || '0') || 0), 0);
    const totalBudget = parseFloat(tenderState.tenderBudgets[0]?.available || '0') || 0;
    const available = totalBudget - reserved - spent;
    return { available, reserved, spent };
  }, [tenderState.tenders, tenderState.tenderBudgets]);

  const handleLoadFromDB = useCallback(() => {
    dispatch(loadDemoTenders(demoTenders));
    logger.debug('TendersPage: Демо-данные загружены');
    handleNotify(`Демо-данные загружены (${demoTenders.length} тендера)`, 'success');
  }, [dispatch, handleNotify]);

  const handleCellChange = useCallback(
    async (id: string, field: string, value: any) => {
      try {
        await tenderService.updateTender(parseInt(id), { [field]: value });
        dispatch(updateTender({ id: parseInt(id), tenderData: { [field]: value } }));
        handleNotify(`Поле "${field}" обновлено`, 'success');
      } catch (error) {
        logger.error('TendersPage: Ошибка при обновлении тендера', error);
        handleNotify(`Ошибка при обновлении поля "${field}"`, 'error');
      }
    },
    [dispatch, handleNotify]
  );

  const handleColorLabelSelect = useCallback(
    (id: string, color: string | null) => {
      dispatch(updateTender({ id: parseInt(id), tenderData: { color_label: color ?? undefined } }));
      logger.debug('TendersPage: Цвет метки изменён для тендера', { id, color });
      handleNotify('Цвет метки обновлён', 'success');
    },
    [dispatch, handleNotify]
  );

  const handleLoadFromExcel = useCallback(
    async (importedData: any[]) => {
      if (!Array.isArray(importedData)) {
        setTemporaryError('Некорректный формат данных Excel');
        return;
      }

      if (importedData.length > MAX_IMPORT_ROWS) {
        const errorMsg = `Превышено максимальное количество строк для импорта (${MAX_IMPORT_ROWS}). Обнаружено: ${importedData.length}`;
        setTemporaryError(errorMsg);
        logger.info('TendersPage: Импорт Excel прерван: слишком много строк');
        return;
      }

      const formattedData = importedData.slice(1).map((row: any[]) => ({
        stage: row[0] || 'Не участвую',
        subject: row[1] || '',
        purchase_number: row[2] || '',
        platform_name: row[3] || '',
        platforms: row[4] || '',
        customer_region: row[5] || '',
        customer_name: row[6] || '',
        end_date: row[7] || '',
        law: row[8] || '44-ФЗ',
        start_price: row[9] || '',
        note: row[10] || '',
        note_input: row[10] ? `Заголовок для ${row[1] || 'тендера'}` : '',
        winner_price: row[11] || '',
        winner_name: row[12] || '',
        risk_card: row[13] || '',
        contract_security: row[14] || '',
        platform_fee: row[15] || '',
      }));

      if (formattedData.length === 0) {
        setTemporaryError('Нет корректных данных для загрузки в файле.');
        return;
      }

      try {
        const addPromises = formattedData.map((tender) => dispatch(addTender(tender)).unwrap());
        await Promise.all(addPromises);
        logger.debug('TendersPage: Тендеры загружены из Excel', { count: formattedData.length });
        handleNotify(`Загружено ${formattedData.length} тендеров из Excel`, 'success');
      } catch (error) {
        logger.error('TendersPage: Ошибка при добавлении тендеров из Excel', error);
        setTemporaryError(`Не удалось загрузить данные из Excel: ${(error as any).message}`);
      }
    },
    [dispatch, setTemporaryError, handleNotify]
  );

  const handleExportToExcel = useCallback(() => {
    try {
      const exportData = tenderState.tenders.allIds.map((id) => {
        const tender = tenderState.tenders.byId[id];
        return [
          tender.stage,
          tender.subject || '',
          tender.purchase_number || '',
          tender.platform_name || '',
          tender.platforms || '',
          tender.customer_region || '',
          tender.customer_name || '',
          tender.end_date || '',
          tender.law || '',
          tender.start_price || '',
          tender.note_input || '',
          tender.winner_price || '',
          tender.winner_name || '',
          tender.risk_card || '',
          tender.contract_security || '',
          tender.platform_fee || '',
        ];
      });
      const headers = [
        'Этап',
        'Предмет закупки',
        'Номер закупки',
        'Название площадки',
        'Площадки',
        'Регион заказчика',
        'Название заказчика',
        'Дата окончания',
        'Закон',
        'НМЦК',
        'Заголовок примечания',
        'Цена победителя',
        'Победитель',
        'Карта рисков',
        'Обеспечение контракта',
        'Комиссия площадки',
      ];
      const ws = XLSX.utils.aoa_to_sheet([headers, ...exportData]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Тендеры');
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, 'Тендеры.xlsx');
      logger.debug('TendersPage: Экспорт в Excel выполнен');
      handleNotify('Данные успешно экспортированы в Excel', 'success');
    } catch (error) {
      logger.error('TendersPage: Ошибка при экспорте в Excel', error);
      handleNotify('Ошибка при экспорте в Excel', 'error');
    }
  }, [tenderState.tenders, handleNotify]);

  const handleCreateReport = useCallback(() => {
    setReportModalOpen(true);
    logger.debug('TendersPage: Открыт модальный отчёт');
  }, []);

  const handleDeleteTender = useCallback(async () => {
    if (tenderState.selectedRows.length === 0) {
      setTemporaryError('Нет выбранных строк для удаления.');
      return;
    }
    try {
      const promises = tenderState.selectedRows.map((id) => dispatch(deleteTender(id)).unwrap());
      await Promise.all(promises);
      logger.debug('TendersPage: Удалены тендеры', { count: tenderState.selectedRows.length });
      handleNotify(`Удалено ${tenderState.selectedRows.length} тендеров`, 'success');
    } catch (error) {
      logger.error('TendersPage: Ошибка при удалении тендеров', error);
      setTemporaryError(`Не удалось удалить тендеры: ${(error as any).message}`);
    }
  }, [dispatch, tenderState.selectedRows, setTemporaryError, handleNotify]);

  const handleRowSelect = useCallback(
    (id: string) => {
      const newSelectedRows = tenderState.selectedRows.includes(parseInt(id))
        ? tenderState.selectedRows.filter((rowId) => rowId !== parseInt(id))
        : [...tenderState.selectedRows, parseInt(id)];
      dispatch(setSelectedRows(newSelectedRows));
      logger.debug('TendersPage: Выбран/снят выбор с тендера', { id });
    },
    [dispatch, tenderState.selectedRows]
  );

  const handleSort = useCallback(
    (key: string) => {
      const existing = tenderState.sortConfig.find((entry) => entry.key === key);
      let newSortConfig;
      if (existing) {
        const newDirection = existing.direction === 'asc' ? 'desc' : 'asc';
        newSortConfig = tenderState.sortConfig.map((entry) =>
          entry.key === key ? { key, direction: newDirection } : entry
        );
      } else {
        newSortConfig = [...tenderState.sortConfig, { key, direction: 'asc' }];
      }
      dispatch(setSortConfig(newSortConfig));
      logger.debug('TendersPage: Мультисортировка изменена', { sortConfig: newSortConfig });
    },
    [dispatch, tenderState.sortConfig]
  );

  const handleUpdateNote = useCallback(
    async (id: string, note: string) => {
      try {
        await tenderService.updateTender(parseInt(id), { note });
        dispatch(updateTender({ id: parseInt(id), tenderData: { note } }));
        handleNotify('Заметка обновлена', 'success');
      } catch (error) {
        logger.error('TendersPage: Ошибка при обновлении заметки', error);
        handleNotify('Ошибка при обновлении заметки', 'error');
      }
    },
    [dispatch, handleNotify]
  );

  const handleHeaderNoteChange = useCallback(
    (newEditorState: EditorState) => {
      setHeaderNoteEditorState(newEditorState);
      const contentState = newEditorState.getCurrentContent();
      let noteText = '';
      if (contentState.hasText()) {
        const rawContentState = convertToRaw(contentState);
        noteText = JSON.stringify(rawContentState);
      }
      if (noteText !== tenderState.headerNote) {
        dispatch(updateHeaderNote(noteText));
        handleNotify('Заметка в шапке обновлена', 'success');
      }
    },
    [dispatch, tenderState.headerNote, handleNotify]
  );

  const toggleNote = useCallback(() => {
    setIsNoteExpanded((prev) => !prev);
    logger.debug('TendersPage: Заметка свёрнута/развёрнута', { isExpanded: !isNoteExpanded });
  }, [isNoteExpanded]);

  const handleNoteClick = useCallback((note: string) => {
    if (note) {
      try {
        const contentState = convertFromRaw(JSON.parse(note));
        setEditorState(EditorState.createWithContent(contentState));
      } catch (error) {
        logger.error('TendersPage: Ошибка при загрузке заметки', error);
        setEditorState(EditorState.createEmpty());
        handleNotify('Ошибка при загрузке заметки', 'error');
      }
    } else {
      setEditorState(EditorState.createEmpty());
    }
    setNoteModalOpen(true);
    logger.debug('TendersPage: Открыт просмотр заметки');
  }, [handleNotify]);

  const handleNoteClose = useCallback(() => {
    setNoteModalOpen(false);
    logger.debug('TendersPage: Закрыт просмотр заметки');
  }, []);

  const formatBudgetWithSpaces = useCallback((value: number): string => {
    if (value === null || value === undefined || value === 0) return '0,00';
    return value.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }, []);

  const filteredTenders = useMemo(() => {
    let list = tenderState.tenders.allIds.map((id) => tenderState.tenders.byId[id]);

    // Фильтрация по этапам
    if (tenderState.selectedStages.length > 0) {
      list = list.filter((t) => t.stage && tenderState.selectedStages.includes(t.stage));
    }

    // Расширенные фильтры
    const { filters } = tenderState;
    if (filters.search) {
      const search = String(filters.search).toLowerCase();
      list = list.filter((t) => JSON.stringify(t).toLowerCase().includes(search));
    }
    if (filters.endDateFrom) {
      list = list.filter((t) => t.end_date && new Date(t.end_date) >= new Date(filters.endDateFrom));
    }
    if (filters.endDateTo) {
      list = list.filter((t) => t.end_date && new Date(t.end_date) <= new Date(filters.endDateTo));
    }
    if (filters.startPriceMin) {
      list = list.filter((t) => t.start_price && parseFloat(t.start_price) >= Number(filters.startPriceMin));
    }
    if (filters.startPriceMax) {
      list = list.filter((t) => t.start_price && parseFloat(t.start_price) <= Number(filters.startPriceMax));
    }
    if (filters.customerRegion) {
      list = list.filter((t) =>
        t.customer_region && t.customer_region.toLowerCase().includes(String(filters.customerRegion).toLowerCase())
      );
    }
    if (filters.customerName) {
      list = list.filter((t) =>
        t.customer_name && t.customer_name.toLowerCase().includes(String(filters.customerName).toLowerCase())
      );
    }

    // Сортировка по мульти-ключам
    const sortConfigList = tenderState.sortConfig;
    if (sortConfigList && sortConfigList.length > 0) {
      list = [...list].sort((a, b) => {
        for (const { key, direction } of sortConfigList) {
          const aVal = a[key];
          const bVal = b[key];
          if (aVal == null || bVal == null) {
            if (aVal == null && bVal != null) return direction === 'asc' ? -1 : 1;
            if (aVal != null && bVal == null) return direction === 'asc' ? 1 : -1;
            continue;
          }
          if (typeof aVal === 'string' && typeof bVal === 'string') {
            const comp = aVal.localeCompare(bVal, undefined, { numeric: true });
            if (comp !== 0) return direction === 'asc' ? comp : -comp;
          } else {
            const comp = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
            if (comp !== 0) return direction === 'asc' ? comp : -comp;
          }
        }
        return 0;
      });
    }

    return list;
  }, [tenderState.tenders, tenderState.selectedStages, tenderState.filters, tenderState.sortConfig]);

  return (
    <PageContainerBox>
      {tenderState.errors.fetch && (
        <Alert severity="error" sx={{ position: 'fixed', top: 10, left: '50%', transform: 'translateX(-50%)', zIndex: 1300 }}>
          Глобальная ошибка: {tenderState.errors.fetch}
        </Alert>
      )}
      {saveError && (
        <Alert severity="error" sx={{ position: 'fixed', top: 50, left: '50%', transform: 'translateX(-50%)', zIndex: 1300 }}>
          {saveError}
        </Alert>
      )}
      <Box sx={{ flexGrow: 1, padding: 3, overflowY: 'auto', height: 'calc(100vh - 64px)' }}>
        <HeaderContainerBox>
          <TenderMenu
            handleDeleteTender={handleDeleteTender}
            handleLoadFromExcel={handleLoadFromExcel}
            handleExportToExcel={handleExportToExcel}
            handleCreateReport={handleCreateReport}
            handleLoadFromDB={handleLoadFromDB}
            onNotify={handleNotify}
          />
          <NoteBox sx={{ maxHeight: isNoteExpanded ? '400px' : '40px', backgroundColor: 'white' }}>
            <Button
              onClick={toggleNote}
              fullWidth
              sx={{
                textAlign: 'left',
                padding: '10px 16px',
                backgroundColor: '#1DE9B6', // turquoise
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: isNoteExpanded ? '16px 16px 0 0' : '16px',
                '&:hover': { backgroundColor: '#17C4A5' },
              }}
            >
              {isNoteExpanded ? 'Свернуть заметку' : 'Развернуть заметку'}
            </Button>
            <Box sx={{ padding: 2, maxHeight: '340px', overflowY: 'auto', display: isNoteExpanded ? 'block' : 'none' }}>
              <Editor
                editorState={headerNoteEditorState}
                onEditorStateChange={handleHeaderNoteChange}
                wrapperStyle={{}}
                editorStyle={{ minHeight: '150px' }}
                toolbarStyle={{}}
              />
            </Box>
          </NoteBox>
        </HeaderContainerBox>
        <TableContainerBox>
          <FilterPanelBox>
            <BudgetBox>
              <Typography
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  '& span': {
                    marginLeft: '8px',
                    fontWeight: 600,
                    color: theme.palette.mode === 'dark' ? theme.palette.warning.light : theme.palette.warning.main,
                    transition: 'color 0.2s ease',
                  },
                }}
              >
                В резерве: <span>{formatBudgetWithSpaces(calculateBudgetMemo.reserved)} ₽</span>
              </Typography>
              <Typography
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  '& span': {
                    marginLeft: '8px',
                    fontWeight: 600,
                    color: theme.palette.mode === 'dark' ? theme.palette.success.light : theme.palette.success.main,
                    transition: 'color 0.2s ease',
                  },
                }}
              >
                Доступный бюджет: <span>{formatBudgetWithSpaces(calculateBudgetMemo.available)} ₽</span>
              </Typography>
              <Typography
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  '& span': {
                    marginLeft: '8px',
                    fontWeight: 600,
                    color: theme.palette.mode === 'dark' ? theme.palette.error.light : theme.palette.error.main,
                    transition: 'color 0.2s ease',
                  },
                }}
              >
                Потрачено: <span>{formatBudgetWithSpaces(calculateBudgetMemo.spent)} ₽</span>
              </Typography>
            </BudgetBox>
            <TenderFilters />
            <TenderAdvancedFilters />
            <TenderTable
              selectedRows={tenderState.selectedRows.map((id) => id.toString())}
              handleRowSelect={handleRowSelect}
              handleColorLabelSelect={handleColorLabelSelect}
              sortConfig={tenderState.sortConfig}
              handleSort={handleSort}
              errors={{}}
              handleUpdateNote={handleUpdateNote}
              tenders={filteredTenders}
              onNotify={handleNotify}
            />
          </FilterPanelBox>
        </TableContainerBox>
        <ReportModal
          open={reportModalOpen}
          onClose={() => setReportModalOpen(false)}
          handleCellChange={handleCellChange}
          handleNoteClick={handleNoteClick}
        />
        <Dialog open={noteModalOpen} onClose={handleNoteClose}>
          <DialogTitle sx={{ color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#1976d2' }}>
            Просмотр заметки
          </DialogTitle>
          <DialogContent>
            <Editor
              editorState={editorState}
              readOnly
              toolbarHidden
            />
          </DialogContent>
        </Dialog>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: '100%',
            backgroundColor: theme.palette.mode === 'dark' ? '#333333' : undefined,
            color: theme.palette.mode === 'dark' ? '#e0e0e0' : undefined,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageContainerBox>
  );
};

export default TendersPage;