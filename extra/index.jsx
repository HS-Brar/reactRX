import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/system';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-columnHeaders': {
    background: 'linear-gradient(to right, #FF612B, #FFCC80)', // Lighter shades
    color: 'black', // Text color for better visibility
  },
}));

const Extra = () => {
  // Dummy data for users
  const rows = [
    { id: 1, username: 'johndoe', email: 'john@example.com', age: 25 },
    { id: 2, username: 'janedoe', email: 'jane@example.com', age: 30 },
    { id: 3, username: 'bobsmith', email: 'bob@example.com', age: 22 },
    { id: 4, username: 'alicejohnson', email: 'alice@example.com', age: 27 },
    { id: 5, username: 'mikebrown', email: 'mike@example.com', age: 35 },
  ];

  // Column definitions for the DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'age', headerName: 'Age', type: 'number', width: 110 },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <StyledDataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        rowHeight={40} // Adjust the row height here
      />
    </Box>
  );
};

export default Extra;
