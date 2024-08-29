import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CustomButton from '../../components/CustomButton';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import { Button } from 'react-bootstrap';

const Extra2 = () => {
  const [openDialog, setOpenDialog] = useState(false);

  // Data provided
  const data = {
    "auditorReportList": [
      // your data here
    ],
    "totalClosed": 7,
    "totalPending": 9,
    "totalSendToBOM": 18,
    "totalWIP": 16
  };

  const columns = [
    // your columns here
  ];

  const rows = data.auditorReportList.map((item) => ({
    id: item.Sn,
    ...item,
    total: item.closed + item.pending + item.sendToBOM + item.wip
  }));

  const grandTotal = {
    id: 'grandTotal',
    Sn: '',
    name: '',
    closed: data.totalClosed,
    pending: data.totalPending,
    sendToBOM: data.totalSendToBOM,
    wip: data.totalWIP,
    total: data.totalClosed + data.totalPending + data.totalSendToBOM + data.totalWIP
  };

  const rowsWithGrandTotal = [...rows, grandTotal];

  const handleSaveClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = (confirmed) => {
    setOpenDialog(false);
    if (confirmed) {
      // Handle save logic here
      console.log('Data saved!');
    } else {
      console.log('Save action cancelled.');
    }
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rowsWithGrandTotal}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row.id}
      />
      <Button
        onClick={handleSaveClick}
        sx={{ marginTop: 2, borderRadius: '8px', fontWeight: 'bold' }}
      >
        Save
      </Button>

      <ConfirmationDialog
        open={openDialog}
        onClose={handleDialogClose}
        onConfirm={() => console.log('Data saved!')} // Pass the save function if necessary
        title="Confirm Save"
        message="Are you sure you want to save the changes?"
      />
    </Box>
  );
};

export default Extra2;
