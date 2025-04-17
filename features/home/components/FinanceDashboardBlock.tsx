import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const FinanceDashboardBlock: React.FC = () => {
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Финансы
      </Typography>
      <Box sx={{ color: 'text.secondary' }}>
        {/* Здесь будут отображаться ключевые финансовые показатели и быстрые действия */}
        Модуль "Финансы". Данные будут подгружаться...
      </Box>
    </Paper>
  );
};

export default FinanceDashboardBlock;
