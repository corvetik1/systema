import React from 'react';
import { Paper, Typography } from '@mui/material';

const InvestmentsDashboardBlock: React.FC = () => (
  <Paper sx={{ p: 3, mb: 4 }} elevation={2}>
    <Typography variant="h5" fontWeight={600} gutterBottom>
      Инвестиции
    </Typography>
    <Typography color="text.secondary">
      Здесь будет отображаться информация из модуля инвестиций.
    </Typography>
  </Paper>
);

export default InvestmentsDashboardBlock;
