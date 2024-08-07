import React from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Extra1 = () => {
  // Define columns for the DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'First name', width: 150 },
    { field: 'lastName', headerName: 'Last name', width: 150 },
    { field: 'age', headerName: 'Age', type: 'number', width: 110 },
  ];

  // Define rows of user data
  const rows = [
    { id: 1, firstName: 'John', lastName: 'Doe', age: 25 },
    { id: 2, firstName: 'Jane', lastName: 'Smith', age: 30 },
    { id: 3, firstName: 'Michael', lastName: 'Johnson', age: 45 },
    { id: 4, firstName: 'Emily', lastName: 'Davis', age: 35 },
  ];

  // Function to export data to Excel
  const exportToExcel = () => {
    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

    // Convert the workbook to a binary string
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Create a Blob and save it using file-saver
    const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'users.xlsx');
  };

  return (
    <Box width="100%" height={400}>
      <Button
        variant="contained"
        color="primary"
        onClick={exportToExcel}
        style={{ marginBottom: 16 }}
      >
        Export to Excel
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </Box>
  );
};

export default Extra1;
