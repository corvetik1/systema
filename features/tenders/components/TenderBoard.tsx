import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Avatar,
  Button,
  useTheme,
  Stack,
} from '@mui/material';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

// Типы тендера и этапа (можно заменить своими)
type Tender = {
  id: string;
  title: string;
  customer: string;
  budget: number;
  stage: string;
};

type Stage = {
  id: string;
  title: string;
  color: string;
};

interface TenderBoardProps {
  tenders: Tender[];
  stages: Stage[];
  onStageChange: (tenderId: string, newStage: string) => void;
}

const TenderBoard: React.FC<TenderBoardProps> = ({ tenders, stages, onStageChange }) => {
  const theme = useTheme();

  // Группируем тендеры по этапам
  const tendersByStage: Record<string, Tender[]> = React.useMemo(() => {
    const grouped: Record<string, Tender[]> = {};
    stages.forEach((stage) => {
      grouped[stage.id] = [];
    });
    tenders.forEach((tender) => {
      if (grouped[tender.stage]) grouped[tender.stage].push(tender);
    });
    return grouped;
  }, [tenders, stages]);

  // Обработка перетаскивания
  const onDragEnd = (result: DropResult) => {
    const { draggableId, destination, source } = result;
    if (!destination) return;
    const newStage = destination.droppableId;
    if (newStage !== source.droppableId) {
      onStageChange(draggableId, newStage);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box display="flex" gap={3} overflow="auto" pb={2}>
        {stages.map((stage) => {
          const safeColor = stage.color && /^#([0-9A-F]{3}){1,2}$/i.test(stage.color) ? stage.color : '#1976d2';
          return (
            <Droppable droppableId={stage.id} key={stage.id}>
              {(provided, snapshot) => (
                <Paper
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{
                    minWidth: 320,
                    background: snapshot.isDraggingOver ? theme.palette.action.hover : safeColor,
                    borderRadius: 3,
                    boxShadow: 3,
                    p: 2,
                    transition: 'background 0.2s',
                  }}
                >
                  <Typography variant="h6" fontWeight={700} mb={2} color={theme.palette.getContrastText(safeColor)}>
                    {stage.title}
                  </Typography>
                  <Stack spacing={2}>
                    {tendersByStage[stage.id].map((tender, idx) => (
                      <Draggable draggableId={tender.id} index={idx} key={tender.id}>
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              boxShadow: snapshot.isDragging ? 8 : 2,
                              borderRadius: 2,
                              background: theme.palette.background.paper,
                              transition: 'box-shadow 0.2s',
                              cursor: 'grab',
                            }}
                          >
                            <CardContent>
                              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                                {tender.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Заказчик: {tender.customer}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Бюджет: {tender.budget.toLocaleString()} ₽
                              </Typography>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Stack>
                </Paper>
              )}
            </Droppable>
          );
        })}
      </Box>
    </DragDropContext>
  );
};

export default TenderBoard;
