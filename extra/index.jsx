import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

const Extra2 = () => {
  // Data provided
  const data = {
    "auditorReportList": [
      {
        "Sn": 1,
        "closed": 2,
        "pending": 3,
        "sendToBOM": 4,
        "wip": 2,
        "name": "jack"
      },
      {
        "Sn": 2,
        "closed": 1,
        "pending": 2,
        "sendToBOM": 9,
        "wip": 5,
        "name": "jack2"
      },
      {
        "Sn": 3,
        "closed": 4,
        "pending": 4,
        "sendToBOM": 5,
        "wip": 9,
        "name": "jack3"
      },
    ],
    "totalClosed": 7,
    "totalPending": 9,
    "totalSendToBOM": 18,
    "totalWIP": 16
  };

  // Define columns for the DataGrid
  const columns = [
    {
      field: 'Sn',
      headerName: 'Sn',
      width: 120,
      renderCell: (params) => {
        if (params.row.id === 'grandTotal') {
          return <Typography variant="subtitle2" style={{ textAlign: 'center', width: '100%' }}>Grand Total</Typography>;
        }
        return params.value;
      }
    },
    {
      field: 'name',
      headerName: 'Auditor Name',
      width: 200,
      renderCell: (params) => {
        if (params.row.id === 'grandTotal') {
          return null; // Render nothing here
        }
        return params.value;
      }
    },
    {
      field: 'closed',
      headerName: 'Closed',
      width: 150,
    },
    {
      field: 'pending',
      headerName: 'Pending',
      width: 150,
    },
    {
      field: 'sendToBOM',
      headerName: 'Send to BOM',
      width: 150,
    },
    {
      field: 'wip',
      headerName: 'WIP',
      width: 150,
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 150,
      valueGetter: (params) => params.row.closed + params.row.pending + params.row.sendToBOM + params.row.wip
    }
  ];

  // Convert data to rows format required by DataGrid
  const rows = data.auditorReportList.map((item) => ({
    id: item.Sn, // Unique ID for each row
    ...item,
    total: item.closed + item.pending + item.sendToBOM + item.wip
  }));

  // Calculate Grand Total
  const grandTotal = {
    id: 'grandTotal', // Unique ID for the grand total row
    Sn: '', // Empty for display purposes
    name: '', // Empty for display purposes
    closed: data.totalClosed,
    pending: data.totalPending,
    sendToBOM: data.totalSendToBOM,
    wip: data.totalWIP,
    total: data.totalClosed + data.totalPending + data.totalSendToBOM + data.totalWIP
  };

  // Add Grand Total to rows
  const rowsWithGrandTotal = [...rows, grandTotal];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rowsWithGrandTotal}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowClassName={(params) => (params.row.id === 'grandTotal' ? 'grand-total-row' : '')}
      />
    </Box>
  );
};

export default Extra2;
