import React, { useState, useEffect } from 'react';
import { Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import TenderDashboardBlock from './TenderDashboardBlock';
import AccountingDashboardBlock from './AccountingDashboardBlock';
import FinanceDashboardBlock from './FinanceDashboardBlock';
import InvestmentsDashboardBlock from './InvestmentsDashboardBlock';
import AnalyticsDashboardBlock from './AnalyticsDashboardBlock';
import NotesDashboardBlock from './NotesDashboardBlock';

interface BlocksVisibility {
  tender: boolean;
  accounting: boolean;
  finance: boolean;
  investments: boolean;
  analytics: boolean;
  notes: boolean;
}

const defaultVisibility: BlocksVisibility = {
  tender: true,
  accounting: true,
  finance: true,
  investments: true,
  analytics: true,
  notes: true,
};

const HomePage: React.FC = () => {
  const [blocks, setBlocks] = useState<BlocksVisibility>(defaultVisibility);
  const [openSettings, setOpenSettings] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('homePageBlocks');
    if (stored) setBlocks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('homePageBlocks', JSON.stringify(blocks));
  }, [blocks]);

  const handleToggle = (key: keyof BlocksVisibility) => {
    setBlocks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Box sx={{ p: { xs: 2, md: 6 }, maxWidth: '1200px', mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <IconButton onClick={() => setOpenSettings(true)}>
          <SettingsIcon />
        </IconButton>
      </Box>
      <Dialog open={openSettings} onClose={() => setOpenSettings(false)}>
        <DialogTitle>Настройки отображения блоков</DialogTitle>
        <DialogContent>
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={blocks.tender} onChange={() => handleToggle('tender')} />} label="Тендеры" />
            <FormControlLabel control={<Checkbox checked={blocks.accounting} onChange={() => handleToggle('accounting')} />} label="Бухгалтерия" />
            <FormControlLabel control={<Checkbox checked={blocks.finance} onChange={() => handleToggle('finance')} />} label="Финансы" />
            <FormControlLabel control={<Checkbox checked={blocks.investments} onChange={() => handleToggle('investments')} />} label="Инвестиции" />
            <FormControlLabel control={<Checkbox checked={blocks.analytics} onChange={() => handleToggle('analytics')} />} label="Аналитика" />
            <FormControlLabel control={<Checkbox checked={blocks.notes} onChange={() => handleToggle('notes')} />} label="Заметки" />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSettings(false)}>Закрыть</Button>
        </DialogActions>
      </Dialog>

      {blocks.tender && <TenderDashboardBlock />}
      {blocks.accounting && <AccountingDashboardBlock />}
      {blocks.finance && <FinanceDashboardBlock />}
      {blocks.investments && <InvestmentsDashboardBlock />}
      {blocks.analytics && <AnalyticsDashboardBlock />}
      {blocks.notes && <NotesDashboardBlock />}
    </Box>
  );
};

export default HomePage;
