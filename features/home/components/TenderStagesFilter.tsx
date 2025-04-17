import React, { useState } from 'react';
import { Box, Paper, Typography, Tabs, Tab, Checkbox, FormControlLabel } from '@mui/material';
import { TENDER_STAGES, TENDER_STAGE_LIST } from '../../../config/constants';
import BusinessIcon from '@mui/icons-material/Business';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Divider from '@mui/material/Divider';

// Тип этапа (можно вынести в types/constants при необходимости)
type StageType = typeof TENDER_STAGE_LIST[number];

const ICONS: Record<string, JSX.Element> = {
  business: <BusinessIcon fontSize="small" sx={{ mr: 0.5 }} />,
  settings: <SettingsIcon fontSize="small" sx={{ mr: 0.5 }} />,
  check_circle: <CheckCircleIcon fontSize="small" sx={{ mr: 0.5 }} />,
  assignment: <AssignmentIcon fontSize="small" sx={{ mr: 0.5 }} />,
};

interface TenderStagesFilterProps {
  selectedStages: string[];
  onChangeSelectedStages: (selected: string[]) => void;
}

const TenderStagesFilter: React.FC<TenderStagesFilterProps> = ({ selectedStages, onChangeSelectedStages }) => {
  const [tab, setTab] = useState(0);

  const groups = TENDER_STAGES;
  const currentGroup = groups[tab];

  // Получаем этапы для текущей группы
  const filterStagesByGroup = (keys: string[]) =>
    keys
      .map((key) => TENDER_STAGE_LIST.find((s) => s.key === key))
      .filter(Boolean) as StageType[];

  // Обработка клика по чекбоксу этапа
  const handleStageChange = (stageKey: string) => {
    let newSelected: string[];
    if (selectedStages.includes(stageKey)) {
      newSelected = selectedStages.filter((k) => k !== stageKey);
    } else {
      newSelected = [...selectedStages, stageKey];
    }
    onChangeSelectedStages(newSelected);
  };

  const participationStages = filterStagesByGroup(currentGroup.participationOrder);
  const postWinStages = filterStagesByGroup(currentGroup.postWinOrder);

  // Функция для рендера этапов с чекбоксами и стрелками
  const renderStagesSequence = (stages: StageType[]) => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
        {stages.map((stage, idx) => {
          if (!stage) return null;
          return (
            <React.Fragment key={stage.key}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedStages.includes(stage.key)}
                    onChange={() => handleStageChange(stage.key)}
                    size="small"
                    sx={{ color: stage.color }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {ICONS[stage.icon]}
                    <Box sx={{ display: 'inline-block', ml: 0.5 }}>
                      <span style={{ fontWeight: selectedStages.includes(stage.key) ? 700 : 400, color: selectedStages.includes(stage.key) ? stage.color : undefined }}>{stage.label}</span>
                      <Box
                        component="span"
                        sx={{
                          display: 'inline-block',
                          verticalAlign: 'super',
                          ml: 0.5,
                          fontSize: '0.75em',
                          minWidth: 18,
                          height: 18,
                          borderRadius: '50%',
                          bgcolor: '#f5f5f5',
                          color: '#757575',
                          textAlign: 'center',
                          lineHeight: '18px',
                          fontWeight: 500,
                          px: 0.5,
                        }}
                      >
                        {stage.groups.join(', ')}
                      </Box>
                    </Box>
                  </Box>
                }
                sx={{ mr: 1, ml: 0 }}
              />
              {idx < stages.length - 1 && (
                <ArrowForwardIcon sx={{ color: '#bdbdbd', mx: 0.5, fontSize: 20 }} />
              )}
            </React.Fragment>
          );
        })}
      </Box>
    );
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }} elevation={1}>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Этапы тендеров
      </Typography>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2 }}
      >
        {groups.map((g) => (
          <Tab key={g.group} label={g.group} sx={{ color: g.color, fontWeight: 600 }} />
        ))}
      </Tabs>
      {/* Блок участия */}
      <Typography variant="body2" fontWeight={500} color="text.secondary" sx={{ mb: 1, ml: 1 }}>
        {currentGroup.group === 'ИП' ? 'Участие' : 'Участие ТА'}
      </Typography>
      {renderStagesSequence(participationStages)}
      {(currentGroup.group === 'ИП' || currentGroup.group === 'ТА') && postWinStages.length > 0 && (
        <>
          <Divider sx={{ my: 2 }}>
            <Typography variant="caption" color="text.secondary">
              {currentGroup.group === 'ИП' ? 'После победы' : 'После победы ТА'}
            </Typography>
          </Divider>
          {renderStagesSequence(postWinStages)}
        </>
      )}
    </Paper>
  );
};

export default TenderStagesFilter;
