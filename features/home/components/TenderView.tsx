import React, { useState } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { TenderCardDnD } from './TenderCardDnD';
import { DroppableTenderStage } from './DroppableTenderStage';
import { Box, Button, IconButton, Select, MenuItem, InputLabel, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Typography } from '@mui/material';
import { homeRootSx } from './HomeStyles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import GavelIcon from '@mui/icons-material/Gavel';
import DescriptionIcon from '@mui/icons-material/Description';
import BuildIcon from '@mui/icons-material/Build';
import ComputerIcon from '@mui/icons-material/Computer';
import WarningIcon from '@mui/icons-material/Warning';
import NoteIcon from '@mui/icons-material/Note';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { COLORS } from '../../../config/constants';

// Данные тендеров (захардкожены для примера, как в HTML)
const initialTenders = [
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

interface TenderViewProps {
  selectedStages: string[];
}

const TenderView: React.FC<TenderViewProps> = ({ selectedStages }) => {
  const [allTenders, setAllTenders] = useState(initialTenders);
  const fileInputs = React.useRef<{ [key: string]: HTMLInputElement | null }>({});

  const renderStageBlocks = () => {
    if (selectedStages.length === 0) return null;
    return selectedStages.map(stageKey => {
      const tendersForStage = allTenders.filter(t => t.stage === stageKey);
      return (
        <DroppableTenderStage id={stageKey} key={stageKey}>
          <Paper sx={{ mb: 3, p: 2, background: '#f7fafd', borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: 'primary.main' }}>{stageKey}</Typography>
            {tendersForStage.length === 0 ? (
              <Typography color="text.secondary" sx={{ mb: 1 }}>Нет тендеров</Typography>
            ) : (
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
                {tendersForStage.map((tender) => (
                  <TenderCardDnD id={tender.id} key={tender.id}>
                    <Box sx={{
                      background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                      p: 3,
                      borderRadius: 4,
                      boxShadow: 3,
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'scale(1.02)' },
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {tender.icon}
                        <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                          {tender.name}
                        </Typography>
                      </Box>
                      <Box sx={{ color: 'text.secondary', fontSize: 14, mb: 1 }}>
                        {!minimalMode && <Box>Номер: {tender.number}</Box>}
                        <Box>НМЦК: {tender.nmck}</Box>
                        <Box>Цена победителя: {tender.winnerPrice}</Box>
                        <Box>Снижение: {tender.reduction}</Box>
                        {!minimalMode && (
                          <React.Fragment>
                            <Box>Дата окончания: {tender.endDate}</Box>
                            <Box>Закон: {tender.law}</Box>
                            <Box>Осталось: {tender.remaining}</Box>
                          </React.Fragment>
                        )}
                      </Box>
                      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                        {!minimalMode && (
                          <Button size="small" color="primary" sx={{ textTransform: 'none' }} onClick={() => handleOpenModal('risk', tender.id)}>Карточка рисков</Button>
                        )}
                        <Button size="small" color="primary" sx={{ textTransform: 'none' }} onClick={() => handleOpenModal('note', tender.id)}>Заметка</Button>
                      </Box>
                      {!minimalMode && (
                        <React.Fragment>
                          <Box sx={{ mt: 2 }}>
                            <InputLabel shrink sx={{ fontSize: 13 }}>Цвет метки:</InputLabel>
                            <Select
                              size="small"
                              value={tender.color}
                              displayEmpty
                              sx={{ bgcolor: '#f8fafc', borderRadius: 2, mt: 0.5, width: '100%', maxWidth: 150 }}
                              onChange={e => {
                                const value = e.target.value;
                                setAllTenders(prev => prev.map(t => t.id === tender.id ? { ...t, color: value } : t));
                              }}
                            >
                              <MenuItem value="">Без цвета</MenuItem>
                              {COLORS.map((opt) => (
                                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                              ))}
                            </Select>
                          </Box>
                          <Box sx={{ mt: 2 }}>
                            <Typography fontSize={13} mb={1}>Документы:</Typography>
                            {tender.documents.length ? (
                              <Box style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Button size="small" color="primary" sx={{ minWidth: 0, textTransform: 'none', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {tender.documents[0].name}
                                </Button>
                                <Button size="small" color="primary" sx={{ textTransform: 'none' }} onClick={() => handleOpenModal('preview', tender.id)}>Просмотр</Button>
                                <IconButton size="small" color="error"><DeleteIcon /></IconButton>
                              </Box>
                            ) : (
                              <Typography fontSize={13} color="text.secondary">Нет</Typography>
                            )}
                            <input
                              type="file"
                              ref={el => (fileInputs.current[tender.id] = el)}
                              style={{ display: 'none' }}
                              onChange={e => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setAllTenders(prev => prev.map(t =>
                                    t.id === tender.id
                                      ? { ...t, documents: [...(t.documents || []), { name: file.name, file }] }
                                      : t
                                  ));
                                }
                                e.target.value = '';
                              }}
                            />
                            <Button size="small" color="primary" sx={{ textTransform: 'none', mt: 1 }} onClick={() => fileInputs.current[tender.id]?.click()}>
                              Загрузить файл
                            </Button>
                          </Box>
                          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                            <IconButton color="warning"><ArrowForwardIcon /></IconButton>
                            <IconButton color="error" onClick={() => handleOpenModal('delete', tender.id)}> <DeleteIcon /> </IconButton>
                          </Box>
                        </React.Fragment>
                      )}
                    </Box>
                  </TenderCardDnD>
                ))}
              </Box>
            )}
          </Paper>
        </DroppableTenderStage>
      );
    });
  };

  const [viewMode, setViewMode] = useState<'cards' | 'rows'>('cards');
  const [minimalMode, setMinimalMode] = useState(false);
  const [openModal, setOpenModal] = useState<null | string>(null);
  const [selectedTender, setSelectedTender] = useState<string | null>(null);

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
    if (!over || active.id === over.id) return;
    // Найти тендер и новый этап
    const tenderId = active.id as string;
    const newStage = over.id as string;
    setAllTenders(prev => {
      const tender = prev.find(t => t.id === tenderId);
      if (!tender || tender.stage === newStage) return prev;
      // Сохраняем порядок: переносим в конец этапа
      const filtered = prev.filter(t => t.id !== tenderId);
      const idxToInsert = filtered.reduce((acc, t, i) => (t.stage === newStage ? i + 1 : acc), 0);
      const updated = [
        ...filtered.slice(0, idxToInsert),
        { ...tender, stage: newStage },
        ...filtered.slice(idxToInsert)
      ];
      return updated;
    });
  };

  return (
    <Box sx={{ ...homeRootSx, p: { xs: 2, md: 6 }, maxWidth: '1200px', mx: 'auto' }}>
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
          <Button
            id="mode-toggle"
            variant="contained"
            color={minimalMode ? 'warning' : 'primary'}
            startIcon={minimalMode ? <VisibilityOffIcon /> : <VisibilityIcon />}
            onClick={() => setMinimalMode((v) => !v)}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 500 }}
          >
            {minimalMode ? 'Полный режим' : 'Минимальный режим'}
          </Button>
        </Box>
      </Box>

      {/* Cards View */}
      {viewMode === 'cards' && (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          {renderStageBlocks()}
        </DndContext>
      )}

      {/* Table View */}
      {viewMode === 'rows' && (
        <Box>
          {selectedStages.length === 0 ? null : selectedStages.map(stageKey => {
            const tendersForStage = allTenders.filter(t => t.stage === stageKey);
            return (
              <Paper key={stageKey} sx={{ mb: 3, p: 2, background: '#f7fafd', borderRadius: 3, boxShadow: 2 }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: 'primary.main' }}>{stageKey}</Typography>
                {tendersForStage.length === 0 ? (
                  <Typography color="text.secondary" sx={{ mb: 1 }}>Нет тендеров</Typography>
                ) : (
                  <TableContainer component={Box} sx={{ borderRadius: 4, boxShadow: 0, background: 'none' }}>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ background: 'linear-gradient(90deg, #1976d2 0%, #1565c0 100%)', '&:hover': { cursor: 'grab' } }}>
                          <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Название</TableCell>
                          {!minimalMode && <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Номер</TableCell>}
                          <TableCell sx={{ color: '#fff', fontWeight: 600 }}>НМЦК</TableCell>
                          <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Цена победителя</TableCell>
                          <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Снижение</TableCell>
                          {!minimalMode && <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Дата окончания</TableCell>}
                          {!minimalMode && <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Закон</TableCell>}
                          {!minimalMode && <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Осталось</TableCell>}
                          {!minimalMode && <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Карточка рисков</TableCell>}
                          <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Заметка</TableCell>
                          {!minimalMode && <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Документы</TableCell>}
                          {!minimalMode && <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Цвет</TableCell>}
                          {!minimalMode && <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Действия</TableCell>}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tendersForStage.map((tender) => (
                          <TableRow key={tender.id} hover>
                            <TableCell>{tender.name}</TableCell>
                            {!minimalMode && <TableCell>{tender.number}</TableCell>}
                            <TableCell sx={{ color: 'primary.main', fontWeight: 500 }}>{tender.nmck}</TableCell>
                            <TableCell sx={{ color: 'primary.main', fontWeight: 500 }}>{tender.winnerPrice}</TableCell>
                            <TableCell>{tender.reduction}</TableCell>
                            {!minimalMode && <TableCell>{tender.endDate}</TableCell>}
                            {!minimalMode && <TableCell>{tender.law}</TableCell>}
                            {!minimalMode && <TableCell sx={{ color: 'orange' }}>{tender.remaining}</TableCell>}
                            {!minimalMode && (
                              <TableCell>
                                <Button size="small" color="primary" sx={{ textTransform: 'none' }} onClick={() => handleOpenModal('risk', tender.id)}>Просмотр</Button>
                              </TableCell>
                            )}
                            <TableCell>
                              <Button size="small" color="primary" sx={{ textTransform: 'none' }} onClick={() => handleOpenModal('note', tender.id)}>Просмотр</Button>
                            </TableCell>
                            {!minimalMode && (
                              <TableCell>
                                {tender.documents.length ? (
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <Button size="small" color="primary" sx={{ minWidth: 0, textTransform: 'none', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                      {tender.documents[0].name}
                                    </Button>
                                    <Button size="small" color="primary" sx={{ textTransform: 'none' }} onClick={() => handleOpenModal('preview')}>Просмотр</Button>
                                    <IconButton size="small" color="error"><DeleteIcon /></IconButton>
                                  </div>
                                ) : (
                                  <Typography fontSize={13} color="text.secondary">Нет документов</Typography>
                                )}
                                <Button size="small" color="primary" sx={{ textTransform: 'none', mt: 1 }}>Добавить</Button>
                              </TableCell>
                            )}
                            {!minimalMode && (
                              <TableCell>
                                <Select
                                  size="small"
                                  value={tender.color}
                                  displayEmpty
                                  sx={{ bgcolor: '#f8fafc', borderRadius: 2, width: '100%' }}
                                  onChange={e => {
                                    const value = e.target.value;
                                    setAllTenders(prev => prev.map(t => t.id === tender.id ? { ...t, color: value } : t));
                                  }}
                                >
                                  <MenuItem value="">Без цвета</MenuItem>
                                  {COLORS.map((opt) => (
                                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                                  ))}
                                </Select>
                              </TableCell>
                            )}
                            {!minimalMode && (
                              <TableCell>
                                <IconButton color="warning"><ArrowForwardIcon /></IconButton>
                                <IconButton color="error" onClick={() => handleOpenModal('delete')}> <DeleteIcon /> </IconButton>
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Paper>
            );
          })}
        </Box>
      )}
      {/* Модальные окна */}
      <Modal open={openModal === 'risk'} onClose={handleCloseModal}>
  <Box sx={{ p: 4, bgcolor: '#fff', borderRadius: 4, boxShadow: 6, maxWidth: 400, mx: 'auto', mt: '10vh' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
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
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
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
            <Typography color="text.secondary">Предпросмотр документа</Typography>
          </Box>
          <Box sx={{ textAlign: 'right', mt: 2 }}>
            <Button variant="outlined" onClick={handleCloseModal}>Закрыть</Button>
          </Box>
        </Box>
      </Modal>
      
    <Modal open={openModal === 'delete'} onClose={handleCloseModal}>
      <Box sx={{ p: 4, bgcolor: '#fff', borderRadius: 4, boxShadow: 6, maxWidth: 400, mx: 'auto', mt: '10vh' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
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
  </Box>
  );
};

export default TenderView;    