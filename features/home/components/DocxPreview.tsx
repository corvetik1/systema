import React, { useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { renderAsync } from 'docx-preview';

interface DocxPreviewProps {
  file: File;
}

const DocxPreview: React.FC<DocxPreviewProps> = ({ file }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    if (containerRef.current && file) {
      // Очищаем контейнер
      containerRef.current.innerHTML = '';
      renderAsync(file, containerRef.current, undefined, {
        className: 'docx-preview',
        inWrapper: false,
        ignoreWidth: true,
        ignoreHeight: true,
        ignoreFonts: true,
        breakPages: false,
        experimental: true,
      }).catch(() => {
        if (!disposed && containerRef.current)
          containerRef.current.innerHTML = '<p>Ошибка предпросмотра docx</p>';
      });
    }
    return () => {
      disposed = true;
    };
  }, [file]);

  return (
    <Box ref={containerRef} sx={{ maxHeight: 500, overflow: 'auto', p: 2, bgcolor: '#f8fafc', borderRadius: 1 }}>
      <Typography variant="body2" color="text.secondary">Загрузка docx...</Typography>
    </Box>
  );
};

export default DocxPreview;
