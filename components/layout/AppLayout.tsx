import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import AppBarAndMenu from '../AppBarAndMenu';

interface AppLayoutProps {
  onLogout: () => Promise<void>;
}

const AppLayout: React.FC<AppLayoutProps> = ({ onLogout }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      {/* Верхнее меню */}
      <AppBarAndMenu onLogout={onLogout} />
      {/* Контент */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: { xs: '60px', md: '64px' }, // Отступ под меню (высота AppBar)
          p: 3,
        }}
      >
        <Outlet /> {/* Рендеринг страниц */}
      </Box>
    </Box>
  );
};

export default AppLayout;
