import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Box } from '@mui/material';

interface DroppableTenderStageProps {
  id: string;
  children: React.ReactNode;
}

export const DroppableTenderStage: React.FC<DroppableTenderStageProps> = ({ id, children }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <Box
      ref={setNodeRef}
      sx={{
        background: isOver ? 'rgba(25, 118, 210, 0.08)' : undefined,
        transition: 'background 0.2s',
        minHeight: 50,
      }}
    >
      {children}
    </Box>
  );
};
