import React, { useState } from 'react';
import { DndContext, DragOverlay, DragStartEvent, DragCancelEvent, DragEndEvent, closestCenter, PointerSensor, useSensor, useSensors, useDraggable, useDroppable } from '@dnd-kit/core';
import { TenderCardDnD } from './TenderCardDnD';
import { DroppableTenderStage } from './DroppableTenderStage';
import { Box, Button, IconButton, Select, MenuItem, InputLabel, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Typography, List, ListItem, ListItemIcon, ListItemText, LinearProgress, Tooltip, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, Alert, Stack, ButtonGroup, TextField, FormControlLabel, Checkbox } from '@mui/material';
import { homeRootSx } from './HomeStyles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import GavelIcon from '@mui/icons-material/Gavel';
import DescriptionIcon from '@mui/icons-material/Description';
import BuildIcon from '@mui/icons-material/Build';
import ComputerIcon from '@mui/icons-material/Computer';
import WarningIcon from '@mui/icons-material/Warning';
import NoteIcon from '@mui/icons-material/Note';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { COLORS } from '../../../config/constants';
import mammoth from 'mammoth';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PeopleIcon from '@mui/icons-material/People';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SettingsIcon from '@mui/icons-material/Settings';
import initialVisibleColumns from '../../../config/columns';
import { useTheme } from '@mui/material';
import { TENDER_STAGE_LIST } from '../../../config/constants';

// --- Types for documents and tenders
interface DocumentItem {
  name: string;
  file?: File;
  url?: string;
  ext?: string;
}

interface Tender {
  id: string;
  icon: React.ReactNode;
  stage: string;
  name: string;
  number: string;
  nmck: string;
  winnerPrice: string;
  reduction: string;
  endDate: string;
  law: string;
  remaining: string;
  documents: DocumentItem[];
  color: string;
}

interface Supplier {
  id: number;
  name: string;
  contact: string;
  inn: string;
  note: string;
}

// Данные тендеров (захардкожены для примера, как в HTML)
const initialTenders: Tender[] = [
  {
    id: 'tender1',
    icon: <DescriptionIcon sx={{ mr: 1, color: 'primary.main' }} />,
    stage: 'В работе',
    name: 'Тендер на поставку оборудования',
    number: 'T12345',
    nmck: '1,000,000 ₽',
    winnerPrice: '900,000 ₽',
    reduction: '10%',
    endDate: '2025-04-20',
    law: '44-ФЗ',
    remaining: '5 дней',
    documents: [{ name: 'doc1.pdf' }],
    color: '',
  },
  {
    id: 'tender2',
    icon: <BuildIcon sx={{ mr: 1, color: 'primary.main' }} />,
    stage: 'Подал ИП',
    name: 'Тендер на строительство',
    number: 'T67890',
    nmck: '2,500,000 ₽',
    winnerPrice: '2,300,000 ₽',
    reduction: '8%',
    endDate: '2025-04-18',
    law: '223-ФЗ',
    remaining: '3 дня',
    documents: [],
    color: '',
  },
  {
    id: 'tender3',
    icon: <ComputerIcon sx={{ mr: 1, color: 'primary.main' }} />,
    stage: 'Участвую',
    name: 'Тендер на ПО',
    number: 'T98765',
    nmck: '800,000 ₽',
    winnerPrice: '750,000 ₽',
    reduction: '6.25%',
    endDate: '2025-04-22',
    law: 'ЗМО',
    remaining: '7 дней',
    documents: [],
    color: '',
  },
];

const initialSuppliers: Supplier[] = [
  { id: 1, name: 'Поставщик 1', contact: 'contact@sup1.ru', inn: '1234567890', note: 'Примечание' },
];

interface TenderViewProps {
  selectedStages: string[];
}

interface DraggableStageTableProps {
  stageKey: string;
  tenders: Tender[];
  visibleColumns: string[];
  onOpenSettings: (stageKey: string) => void;
  handleOpenModal: (modal: string, tenderId?: string) => void;
  setAllTenders: React.Dispatch<React.SetStateAction<Tender[]>>;
  handleFileUpload: (tenderId: string, files: FileList | null) => void;
  handleFileDelete: (tenderId: string, idx: number) => void;
  handleFilePreview: (doc: DocumentItem) => void;
  isPreviewable: (ext?: string) => boolean;
  getFileIcon: (ext?: string) => React.ReactNode;
}

interface DraggableTenderRowProps {
  tender: Tender;
  visibleColumns: string[];
  handleOpenModal: (modal: string, tenderId?: string) => void;
  setAllTenders: React.Dispatch<React.SetStateAction<Tender[]>>;
  handleFileUpload: (tenderId: string, files: FileList | null) => void;
  handleFileDelete: (tenderId: string, idx: number) => void;
  handleFilePreview: (doc: DocumentItem) => void;
  isPreviewable: (ext?: string) => boolean;
  getFileIcon: (ext?: string) => React.ReactNode;
}

const DroppableRowZone = ({ id }: { id: string }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <TableRow
      ref={setNodeRef}
      sx={{ height: 8, p: 0, background: isOver ? 'rgba(25,118,210,0.08)' : 'transparent' }}
    />
  );
};

const RowOverlay: React.FC<{ tender: Tender }> = ({ tender }) => (
  <Box sx={{ p: 1, background: '#fff', boxShadow: 4, borderRadius: 1, opacity: 0.9, pointerEvents: 'none' }}>
    <Typography>{tender.name}</Typography>
  </Box>
);

const DraggableTenderRow: React.FC<DraggableTenderRowProps> = ({ tender, visibleColumns = [], handleOpenModal, setAllTenders, handleFileUpload, handleFileDelete, handleFilePreview, isPreviewable, getFileIcon }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: tender.id });
  const styleTransform = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : {};
  const draggingStyle = isDragging ? { opacity: 0.7, boxShadow: '0 2px 8px rgba(0,0,0,0.2)', zIndex: 999 } : {};
  const rowStyle = { ...styleTransform, ...draggingStyle };
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  return (
    <TableRow ref={setNodeRef} style={rowStyle} hover>
      <TableCell {...attributes} {...listeners} sx={{ cursor: isDragging ? 'grabbing' : 'grab' }}>{tender.name}</TableCell>
      {initialVisibleColumns
        .filter(c => visibleColumns.includes(c.id))
        .map(c => (
          <TableCell key={c.id} sx={c.id==='start_price'||c.id==='winner_price'?{color:'primary.main',fontWeight:500}:{}}>
            {(() => {
              switch(c.id) {
                case 'purchase_number': return tender.number;
                case 'start_price': return tender.nmck;
                case 'winner_price': return tender.winnerPrice;
                case 'reduction': return tender.reduction;
                case 'end_date': return tender.endDate;
                case 'law': return tender.law;
                case 'remaining': return tender.remaining;
                case 'risk_card': return (
                  <Button size="small" onClick={() => handleOpenModal('risk', tender.id)}>Карточка рисков</Button>
                );
                case 'note': return (
                  <Button size="small" onClick={() => handleOpenModal('note', tender.id)}>Заметка</Button>
                );
                default: return null;
              }
            })()}</TableCell>
        ))}
      <TableCell>
        <List dense disablePadding>
          {tender.documents.map((doc, idx) => (
            <ListItem key={idx} sx={{ p: 0, mb: 1 }}>
              <ListItemIcon>{getFileIcon(doc.ext)}</ListItemIcon>
              <ListItemText primary={doc.name} />
              {isPreviewable(doc.ext) && (
                <Tooltip title="Предпросмотр">
                  <IconButton size="small" onClick={() => handleFilePreview(doc)}><VisibilityIcon fontSize="small"/></IconButton>
                </Tooltip>
              )}
              <Tooltip title="Скачать">
                <IconButton size="small" component="a" href={doc.url ?? ''} download={doc.name}><DownloadIcon fontSize="small"/></IconButton>
              </Tooltip>
              <Tooltip title="Удалить">
                <IconButton size="small" onClick={() => handleFileDelete(tender.id, idx)}><DeleteIcon fontSize="small"/></IconButton>
              </Tooltip>
            </ListItem>
          ))}
          {!tender.documents.length && <Typography fontSize={13} color="text.secondary">Нет документов</Typography>}
        </List>
        <input type="file" multiple accept="image/*,.pdf,.txt,.docx" hidden ref={el => (fileInputRef.current = el)} onChange={e => handleFileUpload(tender.id, e.target.files)} />
        <Tooltip title="Загрузить файл">
          <IconButton size="small" onClick={() => fileInputRef.current?.click()}>
            <UploadFileIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Select
          size="small"
          value={tender.color}
          displayEmpty
          renderValue={(selected) =>
            selected
              ? <FiberManualRecordIcon sx={{ color: selected, fontSize: 20 }} />
              : <FiberManualRecordIcon sx={{ color: 'grey.400', fontSize: 20 }} />
          }
          onChange={e => setAllTenders(prev => prev.map(t => t.id === tender.id ? { ...t, color: e.target.value } : t))}
        >
          <MenuItem value="">
            <FiberManualRecordIcon sx={{ color: 'grey.400', mr: 1 }} fontSize="small" /> Без цвета
          </MenuItem>
          {COLORS.map(opt => (
            <MenuItem key={opt.value} value={opt.value}>
              <FiberManualRecordIcon sx={{ color: opt.value, mr: 1 }} fontSize="small" />
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </TableCell>
      <TableCell>
        <IconButton color="warning"><ArrowForwardIcon /></IconButton>
        <IconButton color="error" onClick={() => handleOpenModal('delete', tender.id)}><DeleteIcon /></IconButton>
      </TableCell>
    </TableRow>
  );
};

const DraggableStageTable: React.FC<DraggableStageTableProps> = ({ stageKey, tenders, visibleColumns = [], onOpenSettings, handleOpenModal, setAllTenders, handleFileUpload, handleFileDelete, handleFilePreview, isPreviewable, getFileIcon }) => {
  const theme = useTheme();
  const stageConfig = TENDER_STAGE_LIST.find(s => s.key === stageKey) || { color: theme.palette.primary.main };
  // make stage container droppable
  const { setNodeRef: setStageRef, isOver: isStageOver } = useDroppable({ id: stageKey });
  return (
    <Paper
      ref={setStageRef}
      sx={{
        mb: 4,
        p: 2,
        background: isStageOver ? 'rgba(25,118,210,0.08)' : '#fff',
        borderRadius: 3,
        boxShadow: 2,
        transition: 'background 0.2s',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight={700}>{stageKey}</Typography>
        <IconButton size="small" onClick={() => onOpenSettings(stageKey)}><SettingsIcon/></IconButton>
      </Box>
      {tenders.length > 0 ? (
        <TableContainer component={Paper} sx={{ p: 1, background: '#f7fafd', borderRadius: 2, boxShadow: 1 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: stageConfig.color }}>
                <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Название</TableCell>
                {initialVisibleColumns
                  .filter(c => visibleColumns.includes(c.id))
                  .map(c => <TableCell key={c.id} sx={{ color: '#fff', fontWeight: 600 }}>{c.label}</TableCell>)}
                <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Документы</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Цвет</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tenders.map((tender, idx) => (
                <React.Fragment key={tender.id}>
                  <DroppableRowZone id={`dropzone-${stageKey}-${idx}`} />
                  <DraggableTenderRow
                    key={tender.id}
                    tender={tender}
                    visibleColumns={visibleColumns}
                    handleOpenModal={handleOpenModal}
                    setAllTenders={setAllTenders}
                    handleFileUpload={handleFileUpload}
                    handleFileDelete={handleFileDelete}
                    handleFilePreview={handleFilePreview}
                    isPreviewable={isPreviewable}
                    getFileIcon={getFileIcon}
                  />
                </React.Fragment>
              ))}
              <DroppableRowZone id={`dropzone-${stageKey}-${tenders.length}`} />
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography color="text.secondary">Нет тендеров</Typography>
      )}
    </Paper>
  );
};

const TenderView: React.FC<TenderViewProps> = ({ selectedStages }) => {
  const theme = useTheme();
  const [allTenders, setAllTenders] = useState<Tender[]>(initialTenders);
  const fileInputs = React.useRef<{ [key: string]: HTMLInputElement | null }>({});

  const [viewMode, setViewMode] = useState<'cards' | 'rows'>('cards');
  const [openModal, setOpenModal] = useState<null | string>(null);
  const [selectedTender, setSelectedTender] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<DocumentItem | null>(null);
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  const [openSectionModal, setOpenSectionModal] = useState<'delivery'|'suppliers'|'documents'|null>(null);
  const deliveryServices = [
    { name: 'DPD', url: 'https://www.dpd.ru' },
    { name: 'Почта России', url: 'https://www.pochta.ru' },
  ];
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [isSupplierFormOpen, setSupplierFormOpen] = useState(false);
  const sectionFileInput = React.useRef<HTMLInputElement | null>(null);
  const [sectionDocuments, setSectionDocuments] = useState<DocumentItem[]>([]);
  const [columnsByStage, setColumnsByStage] = useState<Record<string,string[]>>(
    Object.fromEntries(
      selectedStages.map(stage => [
        stage,
        initialVisibleColumns.filter(c => c.visible).map(c => c.id)
      ])
    )
  );
  const [openSettingsStage, setOpenSettingsStage] = useState<string|null>(null);
  const serviceColumnIds: string[] = [];
  const userColumnIds = initialVisibleColumns.filter(c => !serviceColumnIds.includes(c.id)).map(c => c.id);
  const toggleSelectAll = (stage: string) => {
    setColumnsByStage(prev => ({
      ...prev,
      [stage]: prev[stage].length === userColumnIds.length ? [] : userColumnIds
    }));
  };
  const toggleColumn = (stage: string, col: string) => {
    setColumnsByStage(prev => ({
      ...prev,
      [stage]: prev[stage].includes(col)
        ? prev[stage].filter(id => id !== col)
        : [...prev[stage], col]
    }));
  };
  const resetColumns = (stage: string) => {
    setColumnsByStage(prev => ({
      ...prev,
      [stage]: initialVisibleColumns.filter(c => c.visible).map(c => c.id)
    }));
  };

  const handleOpenModal = (modal: string, tenderId?: string) => {
    setOpenModal(modal);
    setSelectedTender(tenderId || null);
  };
  const handleCloseModal = () => {
    setOpenModal(null);
    setSelectedTender(null);
  };

  // --- DnD-kit sensors setup
  const sensors = useSensors(useSensor(PointerSensor));

  // --- DnD-kit drag end handler
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id as string; // tender.id
    const overId = over.id as string;

    // Дроп между строками (insert)
    if (overId.startsWith('dropzone-')) {
      const [, targetStage, idxStr] = overId.split('-');
      const index = Number(idxStr);
      setAllTenders(prev => {
        const activeTender = prev.find(t => t.id === activeId);
        if (!activeTender) return prev;
        const updatedTender = { ...activeTender, stage: targetStage };
        // группируем по этапам без active
        const groups: { [key: string]: Tender[] } = {};
        selectedStages.forEach(stage => {
          groups[stage] = prev.filter(t => t.stage === stage && t.id !== activeId);
        });
        // вставляем по индексу
        const targetGroup = groups[targetStage] || [];
        groups[targetStage] = [
          ...targetGroup.slice(0, index),
          updatedTender,
          ...targetGroup.slice(index),
        ];
        // объединяем в один массив
        return selectedStages.flatMap(stage => groups[stage]);
      });
      return;
    }
    // Дроп на фон этапа — переместить строку в конец этапа
    if (selectedStages.includes(overId)) {
      setAllTenders(prev => {
        const activeTender = prev.find(t => t.id === activeId);
        if (!activeTender) return prev;
        // Удалить активный тендер
        const others = prev.filter(t => t.id !== activeId);
        // Восстановить порядок этапов, добавив активный в конец целевого этапа
        return selectedStages.flatMap(stage => {
          const group = others.filter(t => t.stage === stage);
          return stage === overId ? [...group, { ...activeTender, stage: overId }] : group;
        });
      });
      return;
    }
  };

  const handleDragStart = (event: DragStartEvent) => setActiveId(event.active.id as string);
  const handleDragCancel = () => setActiveId(null);

  // Функции для загрузки и работы с файлами
  const isPreviewable = (ext?: string) => ['pdf', 'jpg', 'jpeg', 'png', 'txt', 'docx'].includes(ext?.toLowerCase() ?? '');
  const getFileIcon = (ext?: string) => {
    const e = ext?.toLowerCase() ?? '';
    return e === 'pdf'
      ? <PictureAsPdfIcon />
      : ['jpg','jpeg','png'].includes(e)
        ? <ImageIcon />
        : <InsertDriveFileIcon />;
  };
  const handleFileUpload = (tenderId: string, files: FileList | null) => {
    if (!files) return;
    setAllTenders(prev => prev.map(t => {
      if (t.id !== tenderId) return t;
      const newDocs = Array.from(files).map(file => {
        const ext = file.name.split('.').pop()?.toLowerCase() || '';
        return { name: file.name, file, url: URL.createObjectURL(file), ext };
      });
      return { ...t, documents: [...(t.documents || []), ...newDocs] };
    }));
    setSnackbar({ open: true, message: 'Файл(ы) загружены', severity: 'success' });
  };
  const handleFileDelete = (tenderId: string, idx: number) => {
    setAllTenders(prev => prev.map(t => {
      if (t.id !== tenderId) return t;
      const docs = [...(t.documents || [])]; docs.splice(idx, 1);
      return { ...t, documents: docs };
    }));
    setSnackbar({ open: true, message: 'Файл удалён', severity: 'success' });
  };
  const handleFilePreview = (doc: DocumentItem) => {
    setPreviewFile(doc);
    setPreviewContent(null);
    const ext = doc.ext?.toLowerCase();
    if (!ext || !doc.file) return;
    if (ext === 'txt') {
      const reader = new FileReader();
      setPreviewLoading(true);
      reader.onload = () => {
        const text = reader.result as string;
        setPreviewContent(text);
        setPreviewLoading(false);
      };
      reader.onerror = () => { setPreviewContent('Ошибка чтения файла'); setPreviewLoading(false); };
      reader.readAsText(doc.file);
    } else if (ext === 'docx') {
      const reader = new FileReader();
      setPreviewLoading(true);
      reader.onload = async () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        try {
          const result = await mammoth.convertToHtml({ arrayBuffer });
          setPreviewContent(result.value);
        } catch {
          setPreviewContent('Ошибка конвертации документа');
        }
        setPreviewLoading(false);
      };
      reader.onerror = () => { setPreviewContent('Ошибка чтения файла'); setPreviewLoading(false); };
      reader.readAsArrayBuffer(doc.file);
    }
  };
  const handleClosePreview = () => setPreviewFile(null);
  const handleSnackbarClose = () => setSnackbar(prev => ({ ...prev, open: false }));

  const handleSectionOpen = (section: 'delivery'|'suppliers'|'documents') => setOpenSectionModal(section);
  const handleSectionClose = () => setOpenSectionModal(null);
  const handleAddSupplier = () => { setEditingSupplier({ id: Date.now(), name: '', contact: '', inn: '', note: '' }); setSupplierFormOpen(true); };
  const handleEditSupplier = (sup: Supplier) => { setEditingSupplier(sup); setSupplierFormOpen(true); };
  const handleDeleteSupplier = (id: number) => { setSuppliers(prev => prev.filter(s => s.id !== id)); setSnackbar({ open: true, message: 'Поставщик удалён', severity: 'success' }); };
  const handleSupplierFormSave = () => {
    if (editingSupplier) {
      setSuppliers(prev => {
        const idx = prev.findIndex(s => s.id === editingSupplier.id);
        if (idx >= 0) return prev.map(s => s.id === editingSupplier.id ? editingSupplier : s);
        return [...prev, editingSupplier];
      });
      setSupplierFormOpen(false);
      setSnackbar({ open: true, message: 'Поставщик сохранён', severity: 'success' });
    }
  };
  const handleSupplierFormCancel = () => setSupplierFormOpen(false);
  const handleSectionDocUpload = (files: FileList | null) => {
    if (!files) return;
    setSectionDocuments(prev => [...prev, ...Array.from(files).map(file => {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      return { name: file.name, file, url: URL.createObjectURL(file), ext };
    })]);
    setSnackbar({ open: true, message: 'Документ добавлен', severity: 'success' });
  };
  const handleSectionDocDelete = (idx: number) => {
    setSectionDocuments(prev => { const arr = [...prev]; arr.splice(idx, 1); return arr; });
    setSnackbar({ open: true, message: 'Документ удалён', severity: 'success' });
  };

  return (
    <Box sx={{ ...homeRootSx, p: { xs: 2, md: 6 }, maxWidth: '1200px', mx: 'auto' }}>
      <Stack direction="row" spacing={2} mb={2}>
        <Button variant="contained" startIcon={<LocalShippingIcon />} onClick={() => handleSectionOpen('delivery')}>Доставка</Button>
        <Button variant="contained" startIcon={<PeopleIcon />} onClick={() => handleSectionOpen('suppliers')}>Поставщики</Button>
        <Button variant="contained" startIcon={<DescriptionIcon />} onClick={() => handleSectionOpen('documents')}>Документы</Button>
      </Stack>
      {/* Header with toggle */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ bgcolor: '#fff', borderRadius: 2, boxShadow: 3, display: 'flex' }}>
            <IconButton
              color={viewMode === 'cards' ? 'primary' : 'default'}
              onClick={() => setViewMode('cards')}
              sx={{ borderRadius: 2 }}
            >
              <ViewModuleIcon />
            </IconButton>
            <IconButton
              color={viewMode === 'rows' ? 'primary' : 'default'}
              onClick={() => setViewMode('rows')}
              sx={{ borderRadius: 2 }}
            >
              <ViewListIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Cards View */}
      {viewMode === 'cards' && (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          {selectedStages.map(stageKey => {
            const stageConfig = TENDER_STAGE_LIST.find(s => s.key === stageKey) || { color: theme.palette.primary.main };
            return (
            <DroppableTenderStage id={stageKey} key={`cards-${stageKey}`}>
              <Paper sx={{ mb: 3, p: 2, background: '#f7fafd', borderRadius: 3, boxShadow: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight={700} sx={{ color: stageConfig.color }}>{stageKey}</Typography>
                  <IconButton size="small" onClick={() => setOpenSettingsStage(stageKey)}><SettingsIcon/></IconButton>
                </Box>
                {allTenders.filter(t => t.stage === stageKey).length === 0 ? (
                  <Typography color="text.secondary" sx={{ mb: 1 }}>Нет тендеров</Typography>
                ) : (
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
                    {allTenders.filter(t => t.stage === stageKey).map((tender) => (
                      <TenderCardDnD id={tender.id} key={tender.id}
                        renderHeader={(dragProps) => (
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, cursor: 'grab', borderRadius: 4, p: 1, px: 2 }} {...dragProps}>
                            {tender.icon}
                            <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                              {tender.name}
                            </Typography>
                          </Box>
                        )}
                      >
                        <Box sx={{
                          background: '#fff',
                          p: 3,
                          borderRadius: 4,
                          boxShadow: 3,
                          transition: 'transform 0.2s',
                          '&:hover': { transform: 'scale(1.02)' },
                        }}>
                          {/* Заголовок будет вставлен через renderHeader */}
                          <Box sx={{ color: 'text.secondary', fontSize: 14, mb: 1 }}>
                            {initialVisibleColumns
                              .filter(c => columnsByStage[stageKey]?.includes(c.id))
                              .map(c => (
                                <Box key={c.id}>
                                  {c.label}: {(() => {
                                    switch (c.id) {
                                      case 'purchase_number': return tender.number;
                                      case 'start_price': return tender.nmck;
                                      case 'reduction': return tender.reduction;
                                      case 'end_date': return tender.endDate;
                                      case 'law': return tender.law;
                                      case 'remaining': return tender.remaining;
                                      case 'risk_card': return (
                                        <Button size="small" color="primary" sx={{ textTransform: 'none' }} onClick={() => handleOpenModal('risk', tender.id)}>Карточка рисков</Button>
                                      );
                                      case 'note': return (
                                        <Button size="small" color="primary" sx={{ textTransform: 'none' }} onClick={() => handleOpenModal('note', tender.id)}>Заметка</Button>
                                      );
                                      default: return '';
                                    }
                                  })()}</Box>
                              ))}
                          </Box>
                          <Box sx={{ mt: 2 }}>
                            <InputLabel shrink sx={{ fontSize: 13 }}>Цвет метки:</InputLabel>
                            <Select
                              size="small"
                              value={tender.color}
                              displayEmpty
                              renderValue={selected =>
                                selected
                                  ? <FiberManualRecordIcon sx={{ color: selected, fontSize: 20 }} />
                                  : <FiberManualRecordIcon sx={{ color: 'grey.400', fontSize: 20 }} />
                              }
                              onChange={e => {
                                const value = e.target.value;
                                setAllTenders(prev => prev.map(t => t.id === tender.id ? { ...t, color: value } : t));
                              }}
                            >
                              <MenuItem value="">
                                <FiberManualRecordIcon sx={{ color: 'grey.400', mr: 1 }} fontSize="small" /> Без цвета
                              </MenuItem>
                              {COLORS.map((opt) => (
                                <MenuItem key={opt.value} value={opt.value}>
                                  <FiberManualRecordIcon sx={{ color: opt.value, mr: 1 }} fontSize="small" />
                                  {opt.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </Box>
                          <Box sx={{ mt: 2 }}>
                            <Typography fontSize={13} mb={1}>Документы:</Typography>
                            <List dense disablePadding>
                              {tender.documents.map((doc, idx) => (
                                <ListItem key={idx} sx={{ p: 0, mb: 1 }}>
                                  <ListItemIcon>{getFileIcon(doc.ext)}</ListItemIcon>
                                  <ListItemText primary={doc.name} />
                                  {isPreviewable(doc.ext) && (
                                    <Tooltip title="Предпросмотр">
                                      <IconButton size="small" onClick={() => handleFilePreview(doc)}><VisibilityIcon fontSize="small"/></IconButton>
                                    </Tooltip>
                                  )}
                                  <Tooltip title="Скачать">
                                    <IconButton size="small" component="a" href={doc.url ?? ''} download={doc.name}><DownloadIcon fontSize="small"/></IconButton>
                                  </Tooltip>
                                  <Tooltip title="Удалить">
                                    <IconButton size="small" onClick={() => handleFileDelete(tender.id, idx)}><DeleteIcon fontSize="small"/></IconButton>
                                  </Tooltip>
                                </ListItem>
                              ))}
                              {!tender.documents.length && <Typography fontSize={13} color="text.secondary">Нет документов</Typography>}
                            </List>
                            <input type="file" multiple accept="image/*,.pdf,.txt,.docx" ref={el => (fileInputs.current[tender.id] = el)} style={{display:'none'}} onChange={e => handleFileUpload(tender.id, e.target.files)} />
                            <Tooltip title="Загрузить файл">
                              <IconButton size="small" onClick={() => fileInputs.current[tender.id]?.click()}>
                                <UploadFileIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                            <IconButton color="warning"><ArrowForwardIcon /></IconButton>
                            <IconButton color="error" onClick={() => handleOpenModal('delete', tender.id)}><DeleteIcon /></IconButton>
                          </Box>
                        </Box>
                      </TenderCardDnD>
                    ))}
                  </Box>
                )}
              </Paper>
            </DroppableTenderStage>
          );
        })}
      </DndContext>
      )}

      {/* Table View */}
      {viewMode === 'rows' && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragCancel={handleDragCancel}
          onDragEnd={event => { handleDragEnd(event); setActiveId(null); }}
        >
          {selectedStages.map(stageKey => (
            <DraggableStageTable
              key={stageKey}
              stageKey={stageKey}
              tenders={allTenders.filter(t => t.stage === stageKey)}
              visibleColumns={columnsByStage[stageKey]}
              onOpenSettings={setOpenSettingsStage}
              handleOpenModal={handleOpenModal}
              setAllTenders={setAllTenders}
              handleFileUpload={handleFileUpload}
              handleFileDelete={handleFileDelete}
              handleFilePreview={handleFilePreview}
              isPreviewable={isPreviewable}
              getFileIcon={getFileIcon}
            />
          ))}
          <DragOverlay>
            {activeId ? <RowOverlay tender={allTenders.find(t => t.id === activeId)!} /> : null}
          </DragOverlay>
        </DndContext>
      )}
      {/* Модальные окна */}
      <Modal open={openModal === 'risk'} onClose={handleCloseModal}>
        <Box sx={{ p: 4, bgcolor: '#fff', borderRadius: 4, boxShadow: 6, maxWidth: 400, mx: 'auto', mt: '10vh' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, cursor: 'grab' }}>
            <WarningIcon sx={{ color: 'warning.main', mr: 1 }} />
            <Typography variant="h6">Карточка рисков</Typography>
          </Box>
          <Typography sx={{ mb: 4 }}>
            {selectedTender && allTenders.find(t => t.id === selectedTender)?.name ? (
              <>Риски для: <b>{allTenders.find(t => t.id === selectedTender)?.name}</b></>
            ) : 'Нет выбранного тендера'}
          </Typography>
          <Box sx={{ textAlign: 'right' }}>
            <Button variant="outlined" onClick={handleCloseModal}>Закрыть</Button>
          </Box>
        </Box>
      </Modal>
      <Modal open={openModal === 'note'} onClose={handleCloseModal}>
        <Box sx={{ p: 4, bgcolor: '#fff', borderRadius: 4, boxShadow: 6, maxWidth: 400, mx: 'auto', mt: '10vh' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, cursor: 'grab' }}>
            <NoteIcon sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="h6">Заметка</Typography>
          </Box>
          <Typography sx={{ mb: 4 }}>
            {selectedTender && allTenders.find(t => t.id === selectedTender)?.name ? (
              <>Заметка для: <b>{allTenders.find(t => t.id === selectedTender)?.name}</b></>
            ) : 'Нет выбранного тендера'}
          </Typography>
          <Box sx={{ textAlign: 'right' }}>
            <Button variant="outlined" onClick={handleCloseModal}>Закрыть</Button>
          </Box>
        </Box>
      </Modal>
      <Modal open={openModal === 'preview'} onClose={handleCloseModal}>
        <Box sx={{ p: 4, bgcolor: '#fff', borderRadius: 4, boxShadow: 6, maxWidth: 700, mx: 'auto', mt: '10vh' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Предпросмотр: doc1.pdf</Typography>
            <IconButton onClick={handleCloseModal}><DeleteIcon /></IconButton>
          </Box>
          <Box sx={{ height: '40vh', bgcolor: '#f3f4f6', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography color="text.secondary">Предпросмотр документов</Typography>
          </Box>
          <Box sx={{ textAlign: 'right', mt: 2 }}>
            <Button variant="outlined" onClick={handleCloseModal}>Закрыть</Button>
          </Box>
        </Box>
      </Modal>
      <Modal open={openModal === 'delete'} onClose={handleCloseModal}>
        <Box sx={{ p: 4, bgcolor: '#fff', borderRadius: 4, boxShadow: 6, maxWidth: 400, mx: 'auto', mt: '10vh' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, cursor: 'grab' }}>
            <DeleteIcon sx={{ color: 'error.main', mr: 1 }} />
            <Typography variant="h6">Подтверждение удаления</Typography>
          </Box>
          <Typography sx={{ mb: 4 }}>Вы уверены, что хотите удалить тендер?</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={handleCloseModal}>Отмена</Button>
            <Button variant="contained" color="error" onClick={handleCloseModal}>Удалить</Button>
          </Box>
        </Box>
      </Modal>
      {/* Модалка предпросмотра */}
      <Dialog fullScreen open={!!previewFile} onClose={handleClosePreview}>
        <DialogTitle>Предпросмотр: {previewFile?.name}</DialogTitle>
        <DialogContent>
          {previewLoading ? (
            <Box sx={{ width: '100%' }}><LinearProgress /></Box>
          ) : previewFile ? (() => {
            const ext = previewFile.ext?.toLowerCase();
            if (['jpg','jpeg','png'].includes(ext ?? '')) {
              return <img src={previewFile.url ?? ''} style={{width:'100%', height:'100%', objectFit:'contain'}} />;
            }
            if (ext === 'pdf') {
              return <iframe src={previewFile.url ?? ''} style={{width:'100%', height:'100%'}} />;
            }
            if (ext === 'txt') {
              return <pre style={{whiteSpace:'pre-wrap', wordBreak:'break-word'}}>{previewContent}</pre>;
            }
            if (ext === 'docx') {
              return <div dangerouslySetInnerHTML={{ __html: previewContent ?? '' }} />;
            }
            return <Typography>Предпросмотр не поддерживается</Typography>;
          })() : null}
        </DialogContent>
        <DialogActions><Button onClick={handleClosePreview}>Закрыть</Button></DialogActions>
      </Dialog>
      {/* Секции модалок */}
      <Dialog open={openSectionModal === 'delivery'} onClose={handleSectionClose} fullWidth maxWidth="sm">
        <DialogTitle>Доставка</DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            {deliveryServices.map((srv, i) => (
              <Button key={i} component="a" href={srv.url} target="_blank" startIcon={<OpenInNewIcon />}>{srv.name}</Button>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions><Button onClick={handleSectionClose}>Закрыть</Button></DialogActions>
      </Dialog>
      <Dialog open={openSectionModal === 'suppliers'} onClose={handleSectionClose} fullScreen>
        <DialogTitle>Поставщики</DialogTitle>
        <DialogContent>
          <Button variant="contained" onClick={handleAddSupplier}>Добавить поставщика</Button>
          <TableContainer><Table><TableHead><TableRow>
            <TableCell>Название</TableCell><TableCell>Контакты</TableCell><TableCell>ИНН</TableCell><TableCell>Примечание</TableCell><TableCell>Действия</TableCell>
          </TableRow></TableHead><TableBody>
            {suppliers.map(s => (
              <TableRow key={s.id}>
                <TableCell>{s.name}</TableCell><TableCell>{s.contact}</TableCell><TableCell>{s.inn}</TableCell><TableCell>{s.note}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => handleEditSupplier(s)}>Ред.</Button>
                  <Button size="small" color="error" onClick={() => handleDeleteSupplier(s.id)}>Удал.</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody></Table></TableContainer>
        </DialogContent>
        <DialogActions><Button onClick={handleSectionClose}>Закрыть</Button></DialogActions>
      </Dialog>
      <Dialog open={isSupplierFormOpen} onClose={handleSupplierFormCancel} fullWidth maxWidth="sm">
        <DialogTitle>{editingSupplier?.id ? 'Редактировать' : 'Добавить'} поставщика</DialogTitle>
        <DialogContent>
          <TextField label="Название" fullWidth value={editingSupplier?.name || ''} onChange={e => setEditingSupplier(prev => prev ? { ...prev, name: e.target.value } : null)} />
          <TextField label="Контакты" fullWidth value={editingSupplier?.contact || ''} onChange={e => setEditingSupplier(prev => prev ? { ...prev, contact: e.target.value } : null)} sx={{ mt: 2 }} />
          <TextField label="ИНН" fullWidth value={editingSupplier?.inn || ''} onChange={e => setEditingSupplier(prev => prev ? { ...prev, inn: e.target.value } : null)} sx={{ mt: 2 }} />
          <TextField label="Примечание" fullWidth value={editingSupplier?.note || ''} onChange={e => setEditingSupplier(prev => prev ? { ...prev, note: e.target.value } : null)} sx={{ mt: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSupplierFormCancel}>Отмена</Button>
          <Button variant="contained" onClick={handleSupplierFormSave}>Сохранить</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openSectionModal === 'documents'} onClose={handleSectionClose} fullWidth maxWidth="md">
        <DialogTitle>Документы</DialogTitle>
        <DialogContent>
          <List dense disablePadding>
            {sectionDocuments.map((doc, idx) => (
              <ListItem key={idx} sx={{ p: 0, mb: 1 }}>
                <ListItemIcon>{getFileIcon(doc.ext)}</ListItemIcon>
                <ListItemText primary={doc.name} />
                {isPreviewable(doc.ext) && <IconButton size="small" onClick={() => handleFilePreview(doc)}><VisibilityIcon fontSize="small"/></IconButton>}
                <IconButton size="small" component="a" href={doc.url ?? ''} download><DownloadIcon fontSize="small"/></IconButton>
                <IconButton size="small" onClick={() => handleSectionDocDelete(idx)}><DeleteIcon fontSize="small"/></IconButton>
              </ListItem>
            ))}
          </List>
          <input type="file" multiple accept="*/*" hidden ref={el => sectionFileInput.current = el} onChange={e => handleSectionDocUpload(e.target.files)} />
          <Button sx={{ mt: 2 }} onClick={() => sectionFileInput.current?.click()}>Добавить файл</Button>
        </DialogContent>
        <DialogActions><Button onClick={handleSectionClose}>Закрыть</Button></DialogActions>
      </Dialog>
      {/* Настройки колонок */}
      <Dialog open={Boolean(openSettingsStage)} onClose={() => setOpenSettingsStage(null)} fullWidth maxWidth="xs">
        <DialogTitle>Настройка колонок: {openSettingsStage}</DialogTitle>
        <DialogContent>
          {initialVisibleColumns.map(col => (
            <FormControlLabel
              key={col.id}
              control={<Checkbox
                checked={openSettingsStage ? columnsByStage[openSettingsStage].includes(col.id) : false}
                onChange={() => openSettingsStage && toggleColumn(openSettingsStage, col.id)}
              />}
              label={col.label}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSettingsStage(null)}>Закрыть</Button>
          <Button onClick={() => openSettingsStage && toggleSelectAll(openSettingsStage)}>
            {openSettingsStage && columnsByStage[openSettingsStage].length === userColumnIds.length ? 'Снять все' : 'Добавить все'}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Уведомления */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{width:'100%'}}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default TenderView;