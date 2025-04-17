import React from 'react';
import { Box } from '@mui/material';
import { useDraggable } from '@dnd-kit/core';

interface DraggableTenderCardProps {
  id: string;
  children: React.ReactNode;
}

export const DraggableTenderCard: React.FC<DraggableTenderCardProps> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      sx={{
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        opacity: isDragging ? 0.7 : 1,
        zIndex: isDragging ? 10 : 'auto',
        position: 'relative',
        transition: 'box-shadow 0.2s',
      }}
    >
      {children}
    </Box>
  );
};
