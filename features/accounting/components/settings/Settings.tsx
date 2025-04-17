// src/features/accounting/components/settings/Settings.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, Typography } from '@mui/material';
import { RootState } from '../../../../app/store';
import { setCurrency, setDateFormat, setNotifications } from '../../store/settings/slice';
import { Content } from '../AccountingStyles';

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.accounting?.settings);
  const currency = settings?.currency || 'RUB';
  const dateFormat = settings?.dateFormat || 'DD.MM.YYYY';
  const notifications = settings?.notifications || { email: true, push: false };

  return (
    <Content>
      <Typography variant="h4" gutterBottom>
        Настройки
      </Typography>
      <Box sx={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Валюта</InputLabel>
          <Select
            value={currency}
            onChange={(e) => dispatch(setCurrency(e.target.value as 'RUB' | 'USD' | 'EUR'))}
            label="Валюта"
          >
            <MenuItem value="RUB">Рубль (₽)</MenuItem>
            <MenuItem value="USD">Доллар ($)</MenuItem>
            <MenuItem value="EUR">Евро (€)</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Формат даты</InputLabel>
          <Select
            value={dateFormat}
            onChange={(e) => dispatch(setDateFormat(e.target.value as 'DD.MM.YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD'))}
            label="Формат даты"
          >
            <MenuItem value="DD.MM.YYYY">ДД.ММ.ГГГГ</MenuItem>
            <MenuItem value="MM/DD/YYYY">ММ/ДД/ГГГГ</MenuItem>
            <MenuItem value="YYYY-MM-DD">ГГГГ-ММ-ДД</MenuItem>
          </Select>
        </FormControl>
        <Box>
          <Typography variant="subtitle1">Уведомления</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={notifications.email}
                onChange={(e) => dispatch(setNotifications({ email: e.target.checked }))}
              />
            }
            label="По email"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={notifications.push}
                onChange={(e) => dispatch(setNotifications({ push: e.target.checked }))}
              />
            }
            label="Push-уведомления"
          />
        </Box>
      </Box>
    </Content>
  );
};

export default Settings;