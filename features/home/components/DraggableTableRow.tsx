import React from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { TableRow } from '@mui/material';

interface DraggableTableRowProps {
  id: string;
  stage: string;
  children: React.ReactNode;
}

export const DraggableTableRow: React.FC<DraggableTableRowProps> = ({ id, stage, children }) => {
  const { setNodeRef, attributes, listeners, isDragging } = useDraggable({ id });
  const { setNodeRef: setDroppableRef, isOver } = useDroppable({ id: stage });

  // Объединяем ref для drag и drop
  const combinedRef = (node: HTMLElement | null) => {
    setNodeRef(node);
    setDroppableRef(node);
  };

  return (
    <TableRow
      ref={combinedRef}
      hover
      {...attributes}
      {...listeners}
      sx={{
        opacity: isDragging ? 0.5 : 1,
        background: isOver ? '#e3f2fd' : undefined,
        cursor: 'grab',
      }}
    >
      {children}
    </TableRow>
  );
};
