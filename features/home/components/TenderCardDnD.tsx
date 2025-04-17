import React from 'react';
import { Box } from '@mui/material';
import { useDraggable } from '@dnd-kit/core';

interface TenderCardDnDProps {
  id: string;
  children: React.ReactNode;
}

export const TenderCardDnD: React.FC<TenderCardDnDProps> = ({ id, children }) => {
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
      {/* drag listeners на всю карточку */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div style={{ position: 'absolute', inset: 0 }} {...listeners} {...attributes} />
    </Box>
  );
};
