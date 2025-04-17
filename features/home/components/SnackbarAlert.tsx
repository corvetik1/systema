import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';

interface SnackbarAlertProps {
  open: boolean;
  message: string;
  severity?: AlertColor;
  duration?: number;
  onClose: () => void;
}

const SnackbarAlert: React.FC<SnackbarAlertProps> = ({ open, message, severity = 'info', duration = 1000, onClose }) => (
  <Snackbar
    open={open}
    autoHideDuration={1000}
    onClose={onClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    transitionDuration={1000}
  >
    <MuiAlert elevation={6} variant="filled" severity={severity} onClose={onClose} sx={{ width: '100%' }}>
      {message}
    </MuiAlert>
  </Snackbar>
);

export default SnackbarAlert;
