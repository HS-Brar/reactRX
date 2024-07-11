import React from 'react';
import { Box, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const createColumn = (field) => ({
  field,
  headerName: field,
  width: 150,  // Fixed width for each column
  valueGetter: (params) => params.row[field]?.gppValue || '',
  renderCell: (params) => (
    <Tooltip title={params.row[field]?.gppValue || ''}>
      <span style={{ color: params.row[field]?.validationStatus ? 'inherit' : 'red' }}>
        {params.row[field]?.gppValue || ''}
      </span>
    </Tooltip>
  ),
  renderHeader: (params) => (
    <Tooltip title={params.field}>
      <div>{params.field}</div>
    </Tooltip>
  ),
});

const columns = [
  { 
    field: 'Sn', 
    headerName: 'Sn', 
    width: 80, // Fixed width for the serial number column
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <span>{params.value}</span>
      </Tooltip>
    )
  },
  createColumn('Additional'),
  createColumn('ClientCost'),
  createColumn('Column4'),
  createColumn('Column5'),
  createColumn('Column6'),
  createColumn('Column7'),
  createColumn('Column8'),
  createColumn('Column9'),
  createColumn('Column10'),
  createColumn('Column11'),
  createColumn('Column12'),
  createColumn('Column13'),
  createColumn('Column14'),
  createColumn('Column15'),
  createColumn('Column16'),
  createColumn('Column17'),
  createColumn('Column18'),
  createColumn('Column19'),
  createColumn('Column20'),
  createColumn('Column21'),
  createColumn('Column22'),
];

const Extra = () => {
  const data = [
    {
      "Sn": 1,
      "Additional": { "gppValue": "aaa", "validationStatus": true },
      "ClientCost": { "gppValue": "bbb", "validationStatus": false },
      "Column4": { "gppValue": "c1", "validationStatus": true },
      "Column5": { "gppValue": "c2", "validationStatus": false },
      "Column6": { "gppValue": "c3", "validationStatus": true },
      "Column7": { "gppValue": "c4", "validationStatus": false },
      "Column8": { "gppValue": "c5", "validationStatus": true },
      "Column9": { "gppValue": "c6", "validationStatus": false },
      "Column10": { "gppValue": "c7", "validationStatus": true },
      "Column11": { "gppValue": "c8", "validationStatus": false },
      "Column12": { "gppValue": "c9", "validationStatus": true },
      "Column13": { "gppValue": "c10", "validationStatus": false },
      "Column14": { "gppValue": "c11", "validationStatus": true },
      "Column15": { "gppValue": "c12", "validationStatus": false },
      "Column16": { "gppValue": "c13", "validationStatus": true },
      "Column17": { "gppValue": "c14", "validationStatus": false },
      "Column18": { "gppValue": "c15", "validationStatus": true },
      "Column19": { "gppValue": "c16", "validationStatus": false },
      "Column20": { "gppValue": "c17", "validationStatus": true },
      "Column21": { "gppValue": "c18", "validationStatus": false },
      "Column22": { "gppValue": "c19", "validationStatus": true },
    },
    {
      "Sn": 2,
      "Additional": { "gppValue": "ccc", "validationStatus": false },
      "ClientCost": { "gppValue": "ddd", "validationStatus": true },
      "Column4": { "gppValue": "d1", "validationStatus": false },
      "Column5": { "gppValue": "d2", "validationStatus": true },
      "Column6": { "gppValue": "d3", "validationStatus": false },
      "Column7": { "gppValue": "d4", "validationStatus": true },
      "Column8": { "gppValue": "d5", "validationStatus": false },
      "Column9": { "gppValue": "d6", "validationStatus": true },
      "Column10": { "gppValue": "d7", "validationStatus": false },
      "Column11": { "gppValue": "d8", "validationStatus": true },
      "Column12": { "gppValue": "d9", "validationStatus": false },
      "Column13": { "gppValue": "d10", "validationStatus": true },
      "Column14": { "gppValue": "d11", "validationStatus": false },
      "Column15": { "gppValue": "d12", "validationStatus": true },
      "Column16": { "gppValue": "d13", "validationStatus": false },
      "Column17": { "gppValue": "d14", "validationStatus": true },
      "Column18": { "gppValue": "d15", "validationStatus": false },
      "Column19": { "gppValue": "d16", "validationStatus": true },
      "Column20": { "gppValue": "d17", "validationStatus": false },
      "Column21": { "gppValue": "d18", "validationStatus": true },
      "Column22": { "gppValue": "d19", "validationStatus": false },
    },
    {
      "Sn": 3,
      "Additional": { "gppValue": "eeee", "validationStatus": true },
      "ClientCost": { "gppValue": "ffff", "validationStatus": false },
      "Column4": { "gppValue": "e1", "validationStatus": true },
      "Column5": { "gppValue": "e2", "validationStatus": false },
      "Column6": { "gppValue": "e3", "validationStatus": true },
      "Column7": { "gppValue": "e4", "validationStatus": false },
      "Column8": { "gppValue": "e5", "validationStatus": true },
      "Column9": { "gppValue": "e6", "validationStatus": false },
      "Column10": { "gppValue": "e7", "validationStatus": true },
      "Column11": { "gppValue": "e8", "validationStatus": false },
      "Column12": { "gppValue": "e9", "validationStatus": true },
      "Column13": { "gppValue": "e10", "validationStatus": false },
      "Column14": { "gppValue": "e11", "validationStatus": true },
      "Column15": { "gppValue": "e12", "validationStatus": false },
      "Column16": { "gppValue": "e13", "validationStatus": true },
      "Column17": { "gppValue": "e14", "validationStatus": false },
      "Column18": { "gppValue": "e15", "validationStatus": true },
      "Column19": { "gppValue": "e16", "validationStatus": false },
      "Column20": { "gppValue": "e17", "validationStatus": true },
      "Column21": { "gppValue": "e18", "validationStatus": false },
      "Column22": { "gppValue": "e19", "validationStatus": true },
    },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        getRowId={(row) => row.Sn}
        columnBuffer={10}  // Number of columns to render before and after the visible area
        disableColumnMenu  // Disable column menu to save space
      />
    </Box>
  );
};

export default Extra;
