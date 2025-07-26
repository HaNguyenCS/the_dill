// src/components/ToastAlerts.tsx
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';

interface ToastAlertProps extends Omit<AlertProps, 'onClose'> {
  open: boolean;
  onClose: () => void;
  duration?: number;
}

export function ToastAlert({
  open,
  onClose,
  severity,
  children,
  duration = 4000,
}: ToastAlertProps) {
  return (
    <Snackbar
      sx={{ 
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: 'auto',
        minWidth: '300px',
        maxWidth: '80%',
        textAlign: 'right',
      }} 
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
    >
      <Alert elevation={6} onClose={onClose} severity={severity}>
        {children}
      </Alert>
    </Snackbar>
  );
}