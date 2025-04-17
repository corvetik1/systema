import React from 'react';
import { Box } from '@mui/material';
import { useDraggable } from '@dnd-kit/core';

interface TenderCardDnDProps {
  id: string;
  children: React.ReactNode;
}

interface TenderCardDnDProps {
  id: string;
  children: React.ReactNode;
  renderHeader?: (dragProps: any) => React.ReactNode;
}

export const TenderCardDnD: React.FC<TenderCardDnDProps> = ({ id, children, renderHeader }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  return (
    <Box
      ref={setNodeRef}
      sx={{
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        opacity: isDragging ? 0.7 : 1,
        zIndex: isDragging ? 10 : 'auto',
        position: 'relative',
        transition: 'box-shadow 0.2s',
      }}
    >
      {/* Если есть renderHeader — рендерим drag-зону только на header */}
      {renderHeader ? renderHeader({ ...listeners, ...attributes }) : null}
      {/* Остальные элементы карточки */}
      {children}
    </Box>
  );
};
