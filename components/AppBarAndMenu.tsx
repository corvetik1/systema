import React, { useState, useMemo, useCallback } from 'react';
import { Box, IconButton, Typography, Button, CircularProgress } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faHouse,
  faGavel,
  faCoins,
  faChartLine,
  faFileInvoice,
  faNoteSticky,
  faImage,
  faUserCog,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import logger from '../utils/logger';
import { RootState } from '../app/store';
import { AccountCircle } from '@mui/icons-material';

interface AuthState {
  isAuthenticated: boolean;
  user?: {
    username: string;
  };
}

interface AppBarAndMenuProps {
  onLogout: () => Promise<void>;
}

const AppBarAndMenu: React.FC<AppBarAndMenuProps> = React.memo(({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth || {}) as AuthState;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const token = localStorage.getItem('token');
  const decodedToken = useMemo(() => {
    try {
      return token ? JSON.parse(atob(token.split('.')[1])) : {};
    } catch (error) {
      const err = error as Error;
      logger.error('Ошибка декодирования токена:', err.message);
      return {};
    }
  }, [token]);
  const userRole = decodedToken.role || 'user';
  const isAdmin = userRole === 'admin';

  const t = {
    home: 'Главная',
    tenders: 'Тендеры',
    finance: 'Финансы',
    analytics: 'Аналитика',
    accounting: 'Бухгалтерия',
    investments: 'Инвестиции',
    notes: 'Заметки',
    admin: 'Админка',
    gallery: 'Галерея',
    logout: 'Выйти',
  };

  const menuItems = useMemo(
    () => [
      { label: t.home, path: '/home', icon: faHouse, pageId: 'home' },
      { label: t.tenders, path: '/tenders', icon: faGavel, pageId: 'tenders' },
      { label: t.finance, path: '/finance', icon: faCoins, pageId: 'finance' },
      { label: t.analytics, path: '/analytics', icon: faChartLine, pageId: 'analytics' },
      { label: t.accounting, path: '/accounting', icon: faFileInvoice, pageId: 'accounting' },
      { label: t.investments, path: '/investments', icon: faChartLine, pageId: 'investments' }, // Добавлена иконка
      { label: t.notes, path: '/notes', icon: faNoteSticky, pageId: 'notes' },
      { label: t.gallery, path: '/gallery', icon: faImage, pageId: 'gallery' },
      ...(isAdmin ? [{ label: t.admin, path: '/users', icon: faUserCog, pageId: 'users' }] : []),
    ],
    [t, isAdmin]
  );

  const handleMobileMenuToggle = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
    logger.debug('Мобильное меню переключено:', !mobileMenuOpen);
  }, [mobileMenuOpen]);

  const handleLogout = useCallback(async () => {
    setIsLoggingOut(true);
    try {
      await onLogout();
      navigate('/home');
      logger.debug('Успешный выход из системы');
    } catch (error) {
      logger.error('Ошибка при выходе:', (error as Error).message);
    } finally {
      setIsLoggingOut(false);
    }
  }, [onLogout, navigate]);

  return (
    <Box>
      {/* Верхнее меню */}
      <Box
        sx={{
          background: 'linear-gradient(90deg, #e0f7fa, #80deea)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 20px',
          color: '#004d40',
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1100, // Увеличен zIndex для приоритета над контентом
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <Box sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}></Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '16px' }}>
          {menuItems.map((item) => (
            <Box
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                color: location.pathname === item.path ? '#004d40' : '#004d40',
                textDecoration: 'none',
                padding: '8px 12px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'background 0.2s ease',
                backgroundColor: location.pathname === item.path ? 'rgba(0, 77, 64, 0.2)' : 'transparent',
                '&:hover': {
                  background: 'rgba(0, 77, 64, 0.1)',
                },
              }}
            >
              <FontAwesomeIcon icon={item.icon} />
              {item.label}
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: '6px', md: '12px' }, flexShrink: 0 }}>
          {isAuthenticated && user && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                padding: '2px 8px',
                borderRadius: '16px',
              }}
            >
              <AccountCircle sx={{ color: '#004d40', fontSize: '1.2rem' }} />
              <Typography sx={{ color: '#004d40', fontSize: '0.75rem' }}>
                {user.username} ({userRole})
              </Typography>
            </Box>
          )}
          {isAuthenticated && (
            <Button
              color="inherit"
              onClick={handleLogout}
              disabled={isLoggingOut}
              sx={{
                fontSize: '0.75rem',
                padding: '2px 8px',
                border: '1px solid #004d40',
                color: '#004d40',
              }}
              aria-label={t.logout}
            >
              {isLoggingOut ? (
                <>
                  <CircularProgress size={12} sx={{ color: '#004d40' }} />
                  {t.logout}...
                </>
              ) : (
                t.logout
              )}
            </Button>
          )}
          <IconButton
            sx={{
              display: { xs: 'block', md: 'none' },
              fontSize: '1.5rem',
              color: '#004d40',
            }}
            onClick={handleMobileMenuToggle}
            aria-label="Открыть мобильное меню"
          >
            <FontAwesomeIcon icon={faBars} />
          </IconButton>
        </Box>
      </Box>

      {/* Мобильное меню */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: mobileMenuOpen ? 0 : '-250px',
          width: '250px',
          height: '100%',
          background: 'linear-gradient(to bottom, #b2ebf2, #e0f7fa)',
          boxShadow: mobileMenuOpen ? '2px 0 5px rgba(0,0,0,0.2)' : 'none',
          transition: 'left 0.3s ease',
          paddingTop: '60px',
          zIndex: 1000,
          overflowY: 'auto',
        }}
      >
        {menuItems.map((item) => (
          <Box
            key={item.path}
            component={Link}
            to={item.path}
            sx={{
              display: 'block',
              padding: '12px 16px',
              color: '#004d40',
              textDecoration: 'none',
              margin: '6px 12px',
              borderRadius: '6px',
              transition: 'background 0.2s ease',
              backgroundColor: location.pathname === item.path ? 'rgba(0, 77, 64, 0.2)' : 'transparent',
              '&:hover': {
                background: 'rgba(0, 77, 64, 0.1)',
              },
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <FontAwesomeIcon icon={item.icon} style={{ marginRight: '8px' }} />
            {item.label}
          </Box>
        ))}
      </Box>
    </Box>
  );
});

AppBarAndMenu.displayName = 'AppBarAndMenu';

export default AppBarAndMenu;
