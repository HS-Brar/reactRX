import React from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ExcelJS from 'exceljs';
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

  // Function to export data to Excel excluding the 'age' column and styling headers
  const exportToExcel = async () => {
    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Users');

    // Define columns for the worksheet
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'First name', key: 'firstName', width: 15 },
      { header: 'Last name', key: 'lastName', width: 15 },
    ];

    // Add rows excluding the 'age' column
    rows.forEach(({ age, ...rest }) => {
      worksheet.addRow(rest);
    });

    // Style individual header cells
    const headerStyle = {
      font: { bold: true, color: { argb: 'FFFFFF' } }, // White text
      fill: { 
        type: 'pattern', 
        pattern: 'solid', 
        fgColor: { argb: '4F81BD' } // Blue background
      }
    };

    worksheet.getCell('A1').style = headerStyle; // ID
    worksheet.getCell('B1').style = headerStyle; // First name
    worksheet.getCell('C1').style = headerStyle; // Last name

    // Generate buffer and save the file
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'users.xlsx');
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
