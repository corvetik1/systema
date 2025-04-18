import { SxProps, Theme } from '@mui/material';

export const homeStyles: Record<string, SxProps<Theme>> = {
  dashboardBlock: {
    p: 3,
    mb: 4,
    borderRadius: 3,
    boxShadow: 2,
    background: '#f7fafd',
  },
  sectionTitle: {
    fontWeight: 600,
    mb: 1,
    color: 'primary.main',
    fontSize: '1rem',
  },
  tableContainer: {
    mb: 2,
    background: '#fff',
    borderRadius: 2,
    boxShadow: 1,
  },
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    mb: 2,
    fontSize: 15,
  },
  listItem: {
    py: 0.5,
    fontSize: 15,
  },
  payroll: {
    mt: 1,
    fontWeight: 500,
  },
};
