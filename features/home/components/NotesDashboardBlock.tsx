import React from 'react';
import { Paper, Typography } from '@mui/material';

const NotesDashboardBlock: React.FC = () => (
  <Paper sx={{ p: 3, mb: 4 }} elevation={2}>
    <Typography variant="h5" fontWeight={600} gutterBottom>
      Заметки
    </Typography>
    <Typography color="text.secondary">
      Здесь будут отображаться важные заметки и напоминания.
    </Typography>
  </Paper>
);

export default NotesDashboardBlock;
