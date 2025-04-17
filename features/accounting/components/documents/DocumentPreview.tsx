// src/features/accounting/components/documents/DocumentPreview.tsx
import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import {
  DocumentPreviewContainer,
  DocumentPreviewControls,
  DocumentPreviewIframe,
} from '../AccountingStyles';

interface DocumentPreviewProps {
  document: any;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ document }) => {
  const [scaleFactor, setScaleFactor] = useState(1);
  const minScale = 0.5;
  const maxScale = 2;
  const zoomStep = 0.1;

  const handleZoomIn = () => {
    if (scaleFactor < maxScale) {
      setScaleFactor((prev) => Math.min(prev + zoomStep, maxScale));
    }
  };

  const handleZoomOut = () => {
    if (scaleFactor > minScale) {
      setScaleFactor((prev) => Math.max(prev - zoomStep, minScale));
    }
  };

  const handleResetZoom = () => {
    setScaleFactor(1);
  };

  return (
    <DocumentPreviewContainer>
      <DocumentPreviewControls>
        <Button onClick={handleZoomOut}>−</Button>
        <Typography>{Math.round(scaleFactor * 100)}%</Typography>
        <Button onClick={handleZoomIn}>+</Button>
        <Button onClick={handleResetZoom}>Reset</Button>
      </DocumentPreviewControls>
      <Box sx={{ position: 'relative', height: '600px', overflow: 'auto' }}>
        <DocumentPreviewIframe
          src={document.url || 'sample.pdf'}
          style={{ transform: `scale(${scaleFactor})` }}
        />
      </Box>
    </DocumentPreviewContainer>
  );
};

export default DocumentPreview;