import React, { useState } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { TenderView } from './TenderView';
import TenderStagesFilter from './TenderStagesFilter';

const TenderDashboardBlock: React.FC = () => {
  const [selectedStages, setSelectedStages] = useState<string[]>([]);

  return (
    <Paper sx={{ p: 3, mb: 4 }} elevation={2}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Тендеры
      </Typography>
      <TenderStagesFilter
        selectedStages={selectedStages}
        onChangeSelectedStages={setSelectedStages}
      />
      <Box sx={{ mt: 2 }}>
        <TenderView selectedStages={selectedStages} />
      </Box>
    </Paper>
  );
};

export default TenderDashboardBlock;
