import React from 'react';
import { Paper, Typography } from '@mui/material';

const AnalyticsDashboardBlock: React.FC = () => (
  <Paper sx={{ p: 3, mb: 4 }} elevation={2}>
    <Typography variant="h5" fontWeight={600} gutterBottom>
      Аналитика
    </Typography>
    <Typography color="text.secondary">
      Здесь будет отображаться информация из модуля аналитики.
    </Typography>
  </Paper>
);

export default AnalyticsDashboardBlock;
