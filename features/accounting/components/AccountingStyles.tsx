// src/features/accounting/components/AccountingStyles.tsx
import { styled } from '@mui/material/styles';
import {
  Box,
  IconButton,
  ListItem,
  TableCell,
  Button,
  TextField,
  TableContainer,
  Typography,
} from '@mui/material';

// Стили для бокового меню и общего контента
export const DrawerContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
}));

export const DrawerMenu = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: -280,
  width: 280,
  height: '100%',
  backgroundColor: '#ffffff',
  color: '#2c3e50',
  overflowY: 'hidden',
  transition: 'left 0.3s ease',
  padding: '20px',
  paddingTop: '70px',
  paddingBottom: '35px',
  zIndex: 1000,
  boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
  borderRight: '1px solid #e0e0e0',
  [theme.breakpoints.up('md')]: {
    left: 0,
  },
  '&.active': {
    left: 0,
  },
}));

export const DrawerToggle = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  top: 20,
  left: 20,
  backgroundColor: '#3498db',
  color: '#fff',
  width: 50,
  height: 50,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1100,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'background-color 0.3s ease, transform 0.2s ease',
  '&:hover': {
    backgroundColor: '#2980b9',
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

export const MenuItem = styled(ListItem)(({ theme }) => ({
  margin: '1px 0',
  '& a': {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '6px 10px',
    borderRadius: '6px',
    color: '#2c3e50',
    fontSize: '0.9rem',
    transition: 'background-color 0.2s ease, transform 0.2s ease',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: '#ecf0f1',
      transform: 'scale(1.02)',
    },
    '&.active': {
      backgroundColor: '#ecf0f1',
    },
  },
  '& .MuiListItemIcon-root': {
    marginRight: '12px',
    color: '#3498db',
    fontSize: '20px',
  },
}));

export const Content = styled(Box)(({ theme }) => ({
  marginLeft: 0,
  padding: theme.spacing(2.5),
  transition: 'margin-left 0.3s ease',
  width: '100%',
  [theme.breakpoints.up('md')]: {
    marginLeft: 280,
  },
}));

// Стили для аналитики
export const AnalyticsContainer = styled(Box)(({ theme }) => ({
  maxWidth: 1200,
  margin: '0 auto',
  padding: theme.spacing(2.5),
}));

export const AnalyticsTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(3.75),
  color: '#2c3e50',
  fontSize: '2rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
}));

export const MetricsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: theme.spacing(2.5),
  marginBottom: theme.spacing(5),
}));

export const SummaryCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  padding: theme.spacing(2.5),
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
  },
}));

export const CardIcon = styled('span')(({ theme }) => ({
  fontSize: '36px',
  color: '#3498db',
  marginBottom: theme.spacing(1.25),
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(1.25, 0),
  fontSize: '20px',
  color: '#2c3e50',
  fontWeight: 500,
}));

export const CardValue = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 'bold',
  margin: 0,
  color: '#27ae60',
}));

export const ChartsSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  padding: theme.spacing(2.5),
  marginTop: theme.spacing(2.5),
}));

export const ChartsTitle = styled(Typography)(({ theme }) => ({
  fontSize: '22px',
  marginBottom: theme.spacing(2.5),
  color: '#2c3e50',
}));

export const PeriodSelector = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3.75),
}));

export const PeriodLabel = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  marginRight: theme.spacing(1.25),
  color: '#2c3e50',
}));

export const PeriodSelect = styled('select')(({ theme }) => ({
  padding: theme.spacing(1, 1.5),
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '16px',
  backgroundColor: '#fff',
  cursor: 'pointer',
  '&:focus': {
    outline: 'none',
    borderColor: '#3498db',
  },
}));

export const ChartGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '1fr 1fr',
  },
}));

export const ChartWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(2.5),
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
}));

export const PlaceholderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 64px)',
  backgroundColor: theme.palette.grey[50],
  borderRadius: '8px',
  padding: theme.spacing(3),
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
}));

// Стили для документов
export const DocumentTableContainer = styled(TableContainer)(({ theme }) => ({
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
}));

export const DocumentTableHeader = styled(TableCell)(({ theme }) => ({
  padding: '12px 15px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
  backgroundColor: '#3498db',
  color: '#fff',
  cursor: 'pointer',
  userSelect: 'none',
  position: 'relative',
  '&:after': {
    content: '" \\25B2\\25BC"',
    fontSize: '10px',
    position: 'absolute',
    right: '10px',
    opacity: 0.6,
  },
}));

export const DocumentTableCell = styled(TableCell)(({ theme }) => ({
  padding: '12px 15px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
  '&:hover': {
    backgroundColor: '#f1f1f1',
  },
}));

export const DocumentViewButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#2ecc71',
  color: '#fff',
  padding: '8px 12px',
  borderRadius: '4px',
  fontSize: '14px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#27ae60',
  },
}));

export const DocumentFilterForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  justifyContent: 'space-between',
  marginBottom: '20px',
}));

export const DocumentFilterGroup = styled(Box)(({ theme }) => ({
  flex: '1 1 calc(33.333% - 20px)',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    flex: '1 1 100%',
  },
}));

export const DocumentModalOverlay = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10000,
  padding: '20px',
}));

export const DocumentModalContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  maxWidth: '800px',
  width: '100%',
  maxHeight: '90%',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

export const DocumentModalHeader = styled(Box)(({ theme }) => ({
  padding: '16px 20px',
  backgroundColor: '#3498db',
  color: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexShrink: 0,
}));

export const DocumentModalContent = styled(Box)(({ theme }) => ({
  padding: '20px',
  overflowY: 'auto',
  flexGrow: 1,
  backgroundColor: '#fff',
}));

export const DocumentModalFooter = styled(Box)(({ theme }) => ({
  padding: '16px 20px',
  backgroundColor: '#f9f9f9',
  borderTop: '1px solid #ddd',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
  flexShrink: 0,
}));

export const DocumentModalClose = styled(IconButton)(({ theme }) => ({
  color: '#fff',
  '&:hover': {
    color: '#f1c40f',
  },
}));

export const DocumentModalDownloadButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#2ecc71',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#27ae60',
  },
}));

export const DocumentModalCloseButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#e74c3c',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#c0392b',
  },
}));

export const DocumentPreviewBox = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '200px',
  maxHeight: '400px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  backgroundColor: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
  color: '#999',
}));

export const DocumentPreviewContainer = styled(Box)(({ theme }) => ({
  maxWidth: '900px',
  margin: '0 auto',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
}));

export const DocumentPreviewControls = styled(Box)(({ theme }) => ({
  padding: '10px 20px',
  backgroundColor: '#3498db',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  color: '#fff',
}));

export const DocumentPreviewIframe = styled('iframe')(({ theme }) => ({
  display: 'block',
  border: 'none',
  transformOrigin: 'top left',
  width: '1000px',
  height: '1200px',
}));

export const DocumentFormCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  padding: '30px',
}));

export const DocumentFormGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  marginBottom: '20px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

export const DocumentFormLabel = styled(Typography)(({ theme }) => ({
  flex: '0 0 150px',
  fontWeight: 600,
  marginBottom: '5px',
  color: '#2c3e50',
  [theme.breakpoints.down('sm')]: {
    flex: '1 1 auto',
    marginBottom: '5px',
  },
}));

export const DocumentFormInput = styled(TextField)(({ theme }) => ({
  flex: '1 1 300px',
  '& .MuiInputBase-input': {
    padding: '10px 12px',
    fontSize: '16px',
  },
  [theme.breakpoints.down('sm')]: {
    flex: '1 1 100%',
  },
}));

export const DocumentFormButton = styled(Button)(({ theme }) => ({
  padding: '10px 20px',
  fontSize: '16px',
  fontWeight: 600,
  textTransform: 'none',
}));

export const DocumentFormButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  marginTop: '30px',
}));

export const DocumentPositionsTable = styled(TableContainer)(({ theme }) => ({
  width: '100%',
  borderCollapse: 'collapse',
  marginBottom: '15px',
  '& th': {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '10px',
    border: '1px solid #e0e0e0',
  },
  '& td': {
    padding: '10px',
    border: '1px solid #e0e0e0',
  },
  '& tr:hover': {
    backgroundColor: '#f9f9f9',
  },
}));

export const DocumentPositionInput = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    padding: '8px',
    fontSize: '15px',
  },
}));

// Стили для транзакций
export const TransactionSummaryCard = styled(Box)(({ theme }) => ({
  maxWidth: '600px',
  margin: '0 auto 20px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  padding: theme.spacing(3.75),
  textAlign: 'center',
}));

export const TransactionSummaryTitle = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  marginBottom: theme.spacing(2.5),
  color: '#2c3e50',
}));

export const TransactionMetricsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: theme.spacing(2.5),
}));

export const TransactionMetric = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const TransactionMetricLabel = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  marginBottom: theme.spacing(1.25),
  color: '#2c3e50',
}));

export const TransactionMetricValue = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 'bold',
}));

export const TransactionIncome = styled(Typography)(() => ({
  color: '#27ae60',
}));

export const TransactionExpense = styled(Typography)(() => ({
  color: '#e74c3c',
}));

export const TransactionBalance = styled(Typography)(() => ({
  color: '#2980b9',
}));

export const TransactionFiltersContainer = styled(Box)(({ theme }) => ({
  maxWidth: '800px',
  margin: '0 auto 20px',
  backgroundColor: '#fff',
  padding: theme.spacing(2.5, 3.75),
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
}));

export const TransactionFiltersTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '22px',
  marginBottom: theme.spacing(2.5),
  color: '#2c3e50',
}));

export const TransactionFilterForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2.5),
}));

export const TransactionFilterGroup = styled(Box)(({ theme }) => ({
  flex: '1 1 calc(33.333% - 20px)',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    flex: '1 1 100%',
  },
}));

export const TransactionFilterLabel = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontWeight: 600,
  color: '#2c3e50',
}));

export const TransactionFilterButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(1.25),
  width: '100%',
  marginTop: theme.spacing(2.5),
}));

export const TransactionTableContainer = styled(TableContainer)(({ theme }) => ({
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  marginBottom: theme.spacing(2.5),
}));

export const TransactionTableHeader = styled(TableCell)(({ theme }) => ({
  padding: '12px 15px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
  backgroundColor: '#3498db',
  color: '#fff',
  cursor: 'pointer',
  userSelect: 'none',
  position: 'relative',
  '&:after': {
    content: '" \\25B2\\25BC"',
    fontSize: '10px',
    position: 'absolute',
    right: '10px',
    opacity: 0.6,
  },
}));

export const TransactionTableCell = styled(TableCell)(({ theme }) => ({
  padding: '12px 15px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
  '&:hover': {
    backgroundColor: '#f1f1f1',
  },
}));

export const TransactionRowIncome = styled('tr')(() => ({
  backgroundColor: '#e8f9e9',
  '&:hover': {
    backgroundColor: '#d4f4d5',
  },
}));

export const TransactionRowExpense = styled('tr')(() => ({
  backgroundColor: '#fdecea',
  '&:hover': {
    backgroundColor: '#f9d7d4',
  },
}));

export const TransactionPagination = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2.5),
  textAlign: 'center',
}));

export const TransactionLoadMoreButton = styled(Button)(({ theme }) => ({
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#3498db',
  color: '#fff',
  borderRadius: '4px',
  fontWeight: 600,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#2980b9',
  },
}));

// Новые стили для формы операций
export const TransactionFormContainer = styled(Box)(({ theme }) => ({
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#fff',
  borderRadius: '8px',
  padding: theme.spacing(3.75),
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
}));

export const TransactionFormTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  color: '#2c3e50',
}));

export const TransactionFormField = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: theme.spacing(2),
}));

export const TransactionFormLabel = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 500,
  marginBottom: theme.spacing(0.75),
  color: '#666',
}));

export const TransactionFormButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2.5),
}));

// Стили для контрагентов
export const CounterpartyCardContainer = styled(Box)(({ theme }) => ({
  maxWidth: '400px',
  margin: '0 auto',
  marginBottom: theme.spacing(2.5),
}));

export const CounterpartyCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  padding: theme.spacing(2.5),
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
  },
}));

export const CounterpartyCardHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1.875),
}));

export const CounterpartyCardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '22px',
  color: '#2c3e50',
}));

export const CounterpartyCardBody = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1.875),
  lineHeight: 1.6,
}));

export const CounterpartyCardText = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0.75, 0),
  fontSize: '16px',
  '& strong': {
    color: '#2c3e50',
  },
}));

export const CounterpartyCardFooter = styled(Box)(({ theme }) => ({
  textAlign: 'right',
}));

export const CounterpartyDetailButton = styled(Button)(({ theme }) => ({
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#3498db',
  color: '#fff',
  borderRadius: '4px',
  fontWeight: 500,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#2980b9',
  },
}));

export const CounterpartyTableContainer = styled(TableContainer)(({ theme }) => ({
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  marginBottom: theme.spacing(2.5),
}));

export const CounterpartyTableHeader = styled(TableCell)(({ theme }) => ({
  padding: '12px 15px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
  backgroundColor: '#3498db',
  color: '#fff',
  cursor: 'pointer',
  userSelect: 'none',
  position: 'relative',
  '&:after': {
    content: '" \\25B2\\25BC"',
    fontSize: '10px',
    position: 'absolute',
    right: '10px',
    opacity: 0.6,
  },
}));

export const CounterpartyTableCell = styled(TableCell)(({ theme }) => ({
  padding: '12px 15px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
  '&:hover': {
    backgroundColor: '#f1f1f1',
  },
}));

export const CounterpartyPagination = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(2.5),
}));

export const CounterpartyPageButton = styled(Button)(({ theme }) => ({
  padding: '8px 16px',
  margin: '0 5px',
  fontSize: '16px',
  backgroundColor: '#3498db',
  color: '#fff',
  borderRadius: '4px',
  fontWeight: 500,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#2980b9',
  },
  '&.active': {
    backgroundColor: '#2980b9',
    fontWeight: 'bold',
  },
}));

export const CounterpartyFiltersContainer = styled(Box)(({ theme }) => ({
  maxWidth: '800px',
  margin: '0 auto 20px',
  backgroundColor: '#fff',
  padding: theme.spacing(2.5, 3.75),
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
}));

export const CounterpartyFiltersTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '24px',
  marginBottom: theme.spacing(2.5),
  color: '#2c3e50',
}));

export const CounterpartyFilterForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2.5),
  justifyContent: 'space-between',
}));

export const CounterpartyFilterGroup = styled(Box)(({ theme }) => ({
  flex: '1 1 calc(33.333% - 20px)',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    flex: '1 1 100%',
  },
}));

export const CounterpartyFilterLabel = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontWeight: 600,
  color: '#2c3e50',
}));

export const CounterpartyFilterButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(1.25),
  width: '100%',
  marginTop: theme.spacing(2.5),
}));

export const CounterpartyFormContainer = styled(Box)(({ theme }) => ({
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#fff',
  padding: theme.spacing(3.75),
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
}));

export const CounterpartyFormTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(2.5),
  color: '#2c3e50',
}));

export const CounterpartyFormField = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: theme.spacing(2.5),
}));

export const CounterpartyFormLabel = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 500,
  marginBottom: theme.spacing(0.75),
  color: '#2c3e50',
}));

export const CounterpartyFormButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2.5),
  marginTop: theme.spacing(2.5),
}));

// Стили для налогов
export const TaxTableContainer = styled(TableContainer)(({ theme }) => ({
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
}));

export const TaxTableHeader = styled(TableCell)(({ theme }) => ({
  padding: '12px 15px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
  backgroundColor: '#3498db',
  color: '#fff',
  cursor: 'pointer',
  userSelect: 'none',
  position: 'relative',
  '&:after': {
    content: '" \\25B2\\25BC"',
    fontSize: '10px',
    position: 'absolute',
    right: '10px',
    opacity: 0.6,
  },
}));

export const TaxTableCell = styled(TableCell)(({ theme }) => ({
  padding: '12px 15px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
  '&:hover': {
    backgroundColor: '#f1f1f1',
  },
}));

export const TaxStatusOverdue = styled(Typography)(() => ({
  fontWeight: 'bold',
  color: '#e74c3c',
}));

export const TaxStatusOnTime = styled(Typography)(() => ({
  fontWeight: 'bold',
  color: '#27ae60',
}));

export const TaxStatusPending = styled(Typography)(() => ({
  fontWeight: 'bold',
  color: '#f39c12',
}));

export const TaxPagination = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(2.5),
}));

export const TaxPageButton = styled(Button)(({ theme }) => ({
  padding: '8px 16px',
  margin: '0 5px',
  fontSize: '16px',
  backgroundColor: '#3498db',
  color: '#fff',
  borderRadius: '4px',
  fontWeight: 500,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#2980b9',
  },
  '&.active': {
    backgroundColor: '#2980b9',
    fontWeight: 'bold',
  },
}));

export const TaxCalendarContainer = styled(Box)(({ theme }) => ({
  maxWidth: '800px',
  margin: '0 auto',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  padding: theme.spacing(2.5),
}));

export const TaxCalendarHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(2.5),
}));

export const TaxCalendarTitle = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  color: '#2c3e50',
}));

export const TaxCalendarDays = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  textAlign: 'center',
  marginBottom: theme.spacing(1.25),
}));

export const TaxCalendarDayName = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: '#666',
  padding: theme.spacing(1, 0),
  borderBottom: '1px solid #e0e0e0',
}));

export const TaxCalendarGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: theme.spacing(0.625),
}));

export const TaxCalendarCell = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '80px',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  padding: theme.spacing(0.625),
  backgroundColor: '#fff',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: '#f1f1f1',
  },
}));

export const TaxCalendarDateNumber = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(0.625),
}));

export const TaxEventOverdue = styled(Box)(({ theme }) => ({
  backgroundColor: '#fdecea',
  border: '1px solid #e74c3c',
}));

export const TaxEventOnTime = styled(Box)(({ theme }) => ({
  backgroundColor: '#e8f9e9',
  border: '1px solid #27ae60',
}));

export const TaxEventPending = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff4e5',
  border: '1px solid #f39c12',
}));

export const TaxTooltip = styled(Box)(({ theme }) => ({
  visibility: 'hidden',
  opacity: 0,
  width: '200px',
  backgroundColor: '#333',
  color: '#fff',
  textAlign: 'left',
  borderRadius: '4px',
  padding: theme.spacing(1),
  position: 'absolute',
  zIndex: 10,
  bottom: '100%',
  left: '50%',
  transform: 'translateX(-50%)',
  transition: 'opacity 0.3s',
  pointerEvents: 'none',
  fontSize: '14px',
  marginBottom: theme.spacing(0.625),
  '&.visible': {
    visibility: 'visible',
    opacity: 1,
  },
}));

export const TaxFormContainer = styled(Box)(({ theme }) => ({
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#fff',
  borderRadius: '8px',
  padding: theme.spacing(3.75),
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
}));

export const TaxFormTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  color: '#2c3e50',
}));

export const TaxFormField = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: theme.spacing(2),
}));

export const TaxFormLabel = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 500,
  marginBottom: theme.spacing(0.75),
  color: '#666',
}));

export const TaxFormButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2.5),
}));

export const TaxSummaryCard = styled(Box)(({ theme }) => ({
  maxWidth: '800px',
  margin: '0 auto',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  padding: theme.spacing(3.75),
  textAlign: 'center',
}));

export const TaxSummaryTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3.75),
  color: '#2c3e50',
  fontSize: '28px',
}));

export const TaxMetricsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: theme.spacing(2.5),
}));

export const TaxMetricItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2.5),
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  backgroundColor: '#fafafa',
  transition: 'box-shadow 0.2s ease',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
}));

export const TaxMetricIcon = styled(Box)(({ theme }) => ({
  fontSize: '48px',
  marginBottom: theme.spacing(1.25),
}));

export const TaxMetricLabel = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  marginBottom: theme.spacing(1),
  color: '#2c3e50',
  fontWeight: 500,
}));

export const TaxMetricValue = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 'bold',
}));

// Стили для отчетов
export const ReportTableContainer = styled(TableContainer)(({ theme }) => ({
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  marginBottom: theme.spacing(2.5),
}));

export const ReportTableHeader = styled(TableCell)(({ theme }) => ({
  padding: '12px 15px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
  backgroundColor: '#3498db',
  color: '#fff',
  cursor: 'pointer',
  userSelect: 'none',
  position: 'relative',
  '&:after': {
    content: '" \\25B2\\25BC"',
    fontSize: '10px',
    position: 'absolute',
    right: '10px',
    opacity: 0.6,
  },
}));

export const ReportTableCell = styled(TableCell)(({ theme }) => ({
  padding: '12px 15px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
  '&:hover': {
    backgroundColor: '#f1f1f1',
  },
}));

export const ReportStatusCompleted = styled(Typography)(() => ({
  fontWeight: 'bold',
  color: '#27ae60',
}));

export const ReportStatusPending = styled(Typography)(() => ({
  fontWeight: 'bold',
  color: '#f39c12',
}));

export const ReportStatusFailed = styled(Typography)(() => ({
  fontWeight: 'bold',
  color: '#e74c3c',
}));

export const ReportStatusOverdue = styled(Typography)(() => ({
  fontWeight: 'bold',
  color: '#e74c3c',
}));

export const ReportStatusOnTime = styled(Typography)(() => ({
  fontWeight: 'bold',
  color: '#27ae60',
}));

export const ReportPagination = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(2.5),
}));

export const ReportPageButton = styled(Button)(({ theme }) => ({
  padding: '8px 16px',
  margin: '0 5px',
  fontSize: '16px',
  backgroundColor: '#3498db',
  color: '#fff',
  borderRadius: '4px',
  fontWeight: 500,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#2980b9',
  },
  '&.active': {
    backgroundColor: '#2980b9',
    fontWeight: 'bold',
  },
}));

export const ReportContainer = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto',
  backgroundColor: '#fff',
  padding: theme.spacing(3.75),
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
}));

export const ReportHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2.5),
  marginBottom: theme.spacing(3.75),
}));

export const ReportTitle = styled(Typography)(({ theme }) => ({
  fontSize: '28px',
  color: '#2c3e50',
  textAlign: 'center',
}));

export const ReportPeriodSelector = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(1.25),
}));

export const ReportPeriodLabel = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 500,
  color: '#2c3e50',
}));

export const ReportPeriodSelect = styled('select')(({ theme }) => ({
  padding: theme.spacing(1, 1.5),
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  outline: 'none',
  transition: 'border-color 0.3s ease',
  '&:focus': {
    borderColor: '#3498db',
  },
}));

export const ReportContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3.75),
}));

export const ReportTableSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#fafafa',
  borderRadius: '8px',
  padding: theme.spacing(2.5),
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
}));

export const ReportTableSectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '22px',
  marginBottom: theme.spacing(1.875),
  color: '#2c3e50',
}));

export const ReportChartSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#fafafa',
  borderRadius: '8px',
  padding: theme.spacing(2.5),
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
}));

export const ReportChartSectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '22px',
  marginBottom: theme.spacing(1.875),
  color: '#2c3e50',
}));

export const ReportChartCanvas = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '400px',
}));

export const ReportFiltersContainer = styled(Box)(({ theme }) => ({
  maxWidth: '800px',
  margin: '0 auto 20px',
  backgroundColor: '#fff',
  padding: theme.spacing(2.5, 3.75),
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
}));

export const ReportFiltersTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '24px',
  marginBottom: theme.spacing(2.5),
  color: '#2c3e50',
}));

export const ReportFilterForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2.5),
  justifyContent: 'space-between',
}));

export const ReportFilterGroup = styled(Box)(({ theme }) => ({
  flex: '1 1 calc(33.333% - 20px)',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    flex: '1 1 100%',
  },
}));

export const ReportFilterLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1),
  color: '#2c3e50',
}));

export const ReportFilterButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(1.25),
  width: '100%',
  marginTop: theme.spacing(2.5),
}));
// src/features/accounting/components/AccountingStyles.tsx (фрагмент)
export const KUDIRTableContainer = styled(TableContainer)(({ theme }) => ({
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  marginBottom: theme.spacing(2.5),
}));

export const KUDIRTableHeader = styled(TableCell)(({ theme }) => ({
  padding: '12px 15px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
  backgroundColor: '#3498db',
  color: '#fff',
  cursor: 'pointer',
  userSelect: 'none',
  position: 'relative',
  '&:after': {
    content: '" \\25B2\\25BC"',
    fontSize: '10px',
    position: 'absolute',
    right: '10px',
    opacity: 0.6,
  },
}));

export const KUDIRTableCell = styled(TableCell)(({ theme }) => ({
  padding: '12px 15px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
  '&:hover': {
    backgroundColor: '#f1f1f1',
  },
}));

export const KUDIRRowIncome = styled('tr')(() => ({
  backgroundColor: '#e8f9e9',
  '&:hover': {
    backgroundColor: '#d4f4d5',
  },
}));

export const KUDIRRowExpense = styled('tr')(() => ({
  backgroundColor: '#fdecea',
  '&:hover': {
    backgroundColor: '#f9d7d4',
  },
}));

export const KUDIRPagination = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(2.5),
}));

export const KUDIRPageButton = styled(Button)(({ theme }) => ({
  padding: '8px 16px',
  margin: '0 5px',
  fontSize: '16px',
  backgroundColor: '#3498db',
  color: '#fff',
  borderRadius: '4px',
  fontWeight: 500,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#2980b9',
  },
  '&.active': {
    backgroundColor: '#2980b9',
    fontWeight: 'bold',
  },
}));

export const KUDIRFiltersContainer = styled(Box)(({ theme }) => ({
  maxWidth: '900px',
  margin: '0 auto 20px',
  backgroundColor: '#fff',
  padding: theme.spacing(3, 4),
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
}));

export const KUDIRFiltersTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '24px',
  marginBottom: theme.spacing(3),
  color: '#2c3e50',
}));

export const KUDIRFilterForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2.5),
  justifyContent: 'space-between',
}));

export const KUDIRFilterGroup = styled(Box)(({ theme }) => ({
  flex: '1 1 calc(33.333% - 20px)',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    flex: '1 1 100%',
  },
}));

export const KUDIRFilterLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1),
  color: '#2c3e50',
}));

export const KUDIRFilterButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(1.5),
  width: '100%',
  marginTop: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
}));

export const KUDIRExportPanel = styled(Box)(({ theme }) => ({
  maxWidth: '800px',
  margin: '0 auto 20px',
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2.5),
  flexWrap: 'wrap',
}));

export const KUDIRExportButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.25),
  padding: theme.spacing(1.5, 2.5),
  fontSize: '16px',
  fontWeight: 500,
  color: '#fff',
  borderRadius: '6px',
}));