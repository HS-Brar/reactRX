// ConfirmationDialog.js
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import CustomButton from './CustomButton'; // Adjust the path as necessary

const ConfirmationDialog = ({ open, onClose, onConfirm, title, message }) => {
  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      sx={{ '& .MuiDialog-paper': { borderRadius: '16px', padding: '20px', backgroundColor: '#f5f5f5' } }}
    >
      <DialogTitle>
        <Typography variant="h6" color="primary" fontWeight="bold">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" color="textSecondary">
          {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <CustomButton
          onClick={() => onClose(false)}
          variant="outlined"
          color="secondary"
          sx={{ borderRadius: '8px', fontWeight: 'bold' }}
        >
          Cancel
        </CustomButton>
        <CustomButton
          onClick={() => {
            onConfirm();
            onClose(true);
          }}
          variant="contained"
          color="primary"
          sx={{ borderRadius: '8px', fontWeight: 'bold' }}
        >
          Save
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
