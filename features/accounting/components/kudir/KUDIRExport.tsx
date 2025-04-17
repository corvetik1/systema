// src/features/accounting/components/kudir/KUDIRExport.tsx
import React from 'react';
import { Box, Button } from '@mui/material';
import { KUDIRExportPanel, KUDIRExportButton } from '../AccountingStyles';

const KUDIRExport: React.FC = () => {
  const handleExportPDF = () => {
    alert('Здесь будет экспорт в PDF (например, через jsPDF)');
  };

  const handleExportExcel = () => {
    alert('Здесь будет экспорт в Excel (например, через SheetJS)');
  };

  return (
    <KUDIRExportPanel>
      <KUDIRExportButton
        variant="contained"
        onClick={handleExportPDF}
        sx={{ backgroundColor: '#e74c3c', '&:hover': { backgroundColor: '#c0392b' } }}
      >
        <span className="material-icons">picture_as_pdf</span>
        Экспорт в PDF
      </KUDIRExportButton>
      <KUDIRExportButton
        variant="contained"
        onClick={handleExportExcel}
        sx={{ backgroundColor: '#27ae60', '&:hover': { backgroundColor: '#1e8449' } }}
      >
        <span className="material-icons">grid_on</span>
        Экспорт в Excel
      </KUDIRExportButton>
    </KUDIRExportPanel>
  );
};

export default KUDIRExport;