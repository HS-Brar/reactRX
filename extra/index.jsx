import React from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

// Sample data for demonstration
const rows = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', age: 30, status: 'Match' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', age: 25, status: 'Not Match' },
  { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', age: 35, status: 'Match' },
];

// Column definitions for the DataGrid
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'age', headerName: 'Age', width: 100 },
  { field: 'status', headerName: 'Status', width: 150 },
];

const Extra1 = () => {
  // Function to handle export
  const handleExport = async () => {
    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // Define column headers with styling
    worksheet.columns = columns.map(col => ({
      header: col.headerName,
      key: col.field,
      width: col.width / 10, // Adjust width for readability
    }));

    // Style header row
    worksheet.getRow(1).eachCell({ includeEmpty: true }, (cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFF00' } // Yellow background color
      };
    });

    // Add rows data and style the status column
    rows.forEach((row) => {
      const excelRow = worksheet.addRow(row);

      // Style the status cell
      const statusCell = excelRow.getCell(columns.findIndex(col => col.field === 'status') + 1);
      if (row.status === 'Match') {
        statusCell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '00FF00' } // Green background color
        };
      } else if (row.status === 'Not Match') {
        statusCell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF0000' } // Red background color
        };
      }
    });

    // Convert workbook to buffer and save as file
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'UserInfo.xlsx');
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleExport} 
        sx={{ marginBottom: 2 }}
      >
        Export as Excel
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
  );
};

export default Extra1;
