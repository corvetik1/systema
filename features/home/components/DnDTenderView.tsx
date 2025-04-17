import React, { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { COLORS } from '../../../config/constants';

// Типы тендера и этапа
interface Tender {
  id: string;
  name: string;
  stage: string;
  [key: string]: any;
}

interface DnDTenderViewProps {
  stages: string[];
  tenders: Tender[];
  onTendersChange: (tenders: Tender[]) => void;
}

const DnDTenderView: React.FC<DnDTenderViewProps> = ({ stages, tenders, onTendersChange }) => {
  // Группировка тендеров по этапам
  const tendersByStage: Record<string, Tender[]> = {};
  stages.forEach(stage => {
    tendersByStage[stage] = tenders.filter(t => t.stage === stage);
  });

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const sourceStage = result.source.droppableId;
    const destStage = result.destination.droppableId;
    const sourceIdx = result.source.index;
    const destIdx = result.destination.index;

    // Копия массива
    const updated = [...tenders];
    // Найти и удалить перетаскиваемый тендер
    const [moved] = updated.splice(updated.findIndex(t => t.stage === sourceStage && tendersByStage[sourceStage][sourceIdx]?.id === t.id), 1);
    // Изменить этап, если нужно
    moved.stage = destStage;
    // Вставить в нужное место
    const insertIdx = updated.findIndex((t, i) => t.stage === destStage && i === destIdx);
    if (insertIdx === -1) {
      // В конец этапа
      let lastIdx = -1;
      updated.forEach((t, i) => { if (t.stage === destStage) lastIdx = i; });
      updated.splice(lastIdx + 1, 0, moved);
    } else {
      updated.splice(insertIdx, 0, moved);
    }
    onTendersChange(updated);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        {stages.map(stage => (
          <Droppable droppableId={stage} key={stage}>
            {(provided, snapshot) => (
              <Paper ref={provided.innerRef} {...provided.droppableProps} sx={{ minWidth: 260, p: 2, background: snapshot.isDraggingOver ? '#e3f2fd' : '#f7fafd', borderRadius: 3, boxShadow: 2 }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: 'primary.main' }}>{stage}</Typography>
                {tendersByStage[stage].map((tender, idx) => (
                  <Draggable draggableId={tender.id} index={idx} key={tender.id}>
                    {(provided, snapshot) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                          p: 2,
                          mb: 2,
                          background: snapshot.isDragging ? '#bbdefb' : 'white',
                          borderRadius: 2,
                          boxShadow: snapshot.isDragging ? 5 : 1,
                          transition: 'box-shadow 0.2s',
                          cursor: 'grab',
                        }}
                      >
                        {tender.name}
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Paper>
            )}
          </Droppable>
        ))}
      </Box>
    </DragDropContext>
  );
};

export default DnDTenderView;
