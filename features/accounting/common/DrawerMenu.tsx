// src/features/accounting/components/common/DrawerMenu.tsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  DrawerMenu,
  DrawerToggle,
  MenuItem,
} from '../components/AccountingStyles';
import {
  List,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AnalyticsIcon from '@mui/icons-material/Assessment';
import CounterpartyIcon from '@mui/icons-material/Business';
import TransactionIcon from '@mui/icons-material/MonetizationOn';
import DocumentIcon from '@mui/icons-material/Description';
import TaxIcon from '@mui/icons-material/AccountBalance';
import ReportIcon from '@mui/icons-material/BarChart';
import KudirIcon from '@mui/icons-material/Book';
import SettingsIcon from '@mui/icons-material/Settings';

const DrawerMenuComponent: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: 'Аналитика', path: '/accounting', icon: <AnalyticsIcon />, exact: true },
    { text: 'Контрагенты', path: '/accounting/counterparties', icon: <CounterpartyIcon /> },
    { text: 'Операции', path: '/accounting/transactions', icon: <TransactionIcon /> },
    { text: 'Документы', path: '/accounting/documents', icon: <DocumentIcon /> },
    { text: 'Налоги', path: '/accounting/taxes', icon: <TaxIcon /> },
    { text: 'Отчеты', path: '/accounting/reports', icon: <ReportIcon /> },
    { text: 'КУДиР', path: '/accounting/kudir', icon: <KudirIcon /> },
    { text: 'Настройки', path: '/accounting/settings', icon: <SettingsIcon /> },
  ];

  return (
    <>
      <DrawerToggle onClick={toggleDrawer}>
        <IconButton>
          <MenuIcon />
        </IconButton>
      </DrawerToggle>
      <DrawerMenu className={open ? 'active' : ''}>
        <List>
          {menuItems.map((item) => (
            <MenuItem key={item.text}>
              <NavLink
                to={item.path}
                end={item.exact} // Точное соответствие для /accounting
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </NavLink>
            </MenuItem>
          ))}
        </List>
      </DrawerMenu>
    </>
  );
};

export default DrawerMenuComponent;