import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const columns = [
  { field: 'userName', headerName: 'User Name', width: 150 },
  { field: 'age', headerName: 'Age', width: 100 },
  { field: 'gender', headerName: 'Gender', width: 100 },
  { field: 'information', headerName: 'Information', width: 250 },
];

const rows = [
  { id: 1, userName: 'JohnDoe', age: 30, gender: 'Male', information: 'Some information about John' },
  { id: 2, userName: 'JaneSmith1', age: 25, gender: 'Female', information: 'Some information about Jane' },
  { id: 3, userName: 'JaneSmith2', age: 25, gender: 'Female', information: 'Some information about Jane Some information about Jane Some information about Jane Some information about Jane Some information about Jane Some information about Jane' },
  { id: 4, userName: 'JaneSmith2', age: 25, gender: 'Female', information: 'Some information about Jane Some information about Jane Some information about Jane Some information about Jane Some information about Jane Some information about Jane' },
  { id: 5, userName: 'JaneSmith2', age: 25, gender: 'Female', information: 'Some information about Jane Some information about Jane Some information about Jane Some information about Jane Some information about Jane Some information about Jane' },
  { id: 6, userName: 'JaneSmith2', age: 25, gender: 'Female', information: 'Some information about Jane Some information about Jane Some information about Jane Some information about Jane Some information about Jane Some information about Jane' },
  { id: 7, userName: 'JaneSmith2', age: 25, gender: 'Female', information: 'Some information about Jane Some information about Jane Some information about Jane Some information about Jane Some information about Jane Some information about Jane' },
  { id: 8, userName: 'JaneSmith2', age: 25, gender: 'Female', information: 'Some information about Jane Some information about Jane Some information about Jane Some information about Jane Some information about Jane Some information about Jane' },
  { id: 9, userName: 'JaneSmith2', age: 25, gender: 'Female', information: 'Some information about Jane Some information about Jane Some information about Jane Some information about Jane Some information about Jane Some information about Jane' },
  { id: 10, userName: 'JaneSmith2', age: 25, gender: 'Female', information: 'Some information about Jane Some information about Jane Some information about Jane Some information about Jane Some information about Jane Some information about Jane' },
  { id: 11, userName: 'JaneSmith2', age: 25, gender: 'Female', information: 'Some information about Jane Some information about Jane Some information about Jane Some information about Jane Some information about Jane Some information about Jane' },
  { id: 12, userName: 'JaneSmith2', age: 25, gender: 'Female', information: 'Some information about Jane Some information about Jane Some information about Jane Some information about Jane Some information about Jane Some information about Jane' },
  { id: 13, userName: 'JaneSmith2', age: 25, gender: 'Female', information: 'Some information about Jane Some information about Jane Some information about Jane Some information about Jane Some information about Jane Some information about Jane' },
  { id: 14, userName: 'ASHU', age: 25, gender: 'Female', information: 'Some information about Jane Some information about Jane Some information about Jane Some information about Jane Some information about Jane Some information about Jane' },
  // Add more rows as needed
];

const Extra = () => {
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('User Information', 14, 20);
    doc.autoTable({
      head: [['User Name', 'Age', 'Gender', 'Information']],
      body: rows.map(row => [row.userName, row.age, row.gender, row.information]),
      startY: 30,
    });
    doc.save('user_information.pdf');
  };

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        User Information
      </Typography>
      <Button variant="contained" color="primary" onClick={exportPDF} sx={{ mb: 2 }}>
        Export as PDF
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#1976d2', // Customize the header color here
            color: '#fff', // Customize the header text color here
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold', // Optionally customize the header text font weight
          },
        }}
      />
    </Box>
  );
};

export default Extra;
