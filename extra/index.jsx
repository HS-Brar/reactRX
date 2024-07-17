import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box } from '@mui/material';

const Extra = () => {
  const data = [
    {
      ADA1DT: {
        rValue: "1122r",
        sValue: "1122s",
        validationStatus: "true",
      },
      ADAECD: {
        rValue: "2222r",
        sValue: "2222s",
        validationStatus: "false",
      },
    },
    {
      ADA1DT: {
        rValue: "3333rr",
        sValue: "3333ss",
        validationStatus: "false",
      },
      ADAECD: {
        rValue: "4444rr",
        sValue: "4444ss",
        validationStatus: "true",
      },
    },
  ];

  // Prepare the rows for the DataGrid
  const rows = data.flatMap((item, index) => [
    { 
      id: `${index}-r`, 
      ADA1DT: item.ADA1DT.rValue, 
      ADAECD: item.ADAECD.rValue, 
      validationStatusADA1DT: item.ADA1DT.validationStatus, 
      validationStatusADAECD: item.ADAECD.validationStatus 
    },
    { 
      id: `${index}-s`, 
      ADA1DT: item.ADA1DT.sValue, 
      ADAECD: item.ADAECD.sValue, 
      validationStatusADA1DT: item.ADA1DT.validationStatus, 
      validationStatusADAECD: item.ADAECD.validationStatus 
    },
  ]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { 
      field: 'ADA1DT', 
      headerName: 'ADA1DT', 
      width: 150,
      renderCell: (params) => (
        <span style={{ color: params.row.validationStatusADA1DT === 'true' ? 'black' : 'red' }}>
          {params.value}
        </span>
      ),
    },
    { 
      field: 'ADAECD', 
      headerName: 'ADAECD', 
      width: 150,
      renderCell: (params) => (
        <span style={{ color: params.row.validationStatusADAECD === 'true' ? 'black' : 'red' }}>
          {params.value}
        </span>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Data Grid
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
    </Box>
  );
};

export default Extra;
