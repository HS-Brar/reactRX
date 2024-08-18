import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

// Define columns
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'age', headerName: 'Age', width: 110 },
  {
    field: 'status',
    headerName: 'Status',
    width: 110,
    valueGetter: (params) => params.row.status || 'N', // Default to 'N' if status is not defined
  },
  {
    field: 'review',
    headerName: 'Review',
    width: 150,
    editable: true,
    renderCell: (params) => (
      <TextField
        select
        disabled={params.row.status === 'Y'}
        variant="outlined"
        size="small"
        fullWidth
        value={params.value || ''}
        onChange={(event) => {
          const newValue = event.target.value;
          const updatedRow = { ...params.row, review: newValue };
          params.api.updateRows([{ id: params.id, ...updatedRow }]);
        }}
      >
        <MenuItem value="Pass">Pass</MenuItem>
        <MenuItem value="Fail">Fail</MenuItem>
      </TextField>
    ),
  },
  {
    field: 'note',
    headerName: 'Note',
    width: 150,
    editable: true,
    renderCell: (params) => (
      <TextField
        variant="outlined"
        disabled={params.row.status === 'Y'}
        size="small"
        fullWidth
        value={params.value || ''}
        onChange={(event) => {
          const newValue = event.target.value;
          params.api.setEditCellValue({ id: params.id, field: params.field, value: newValue });
        }}
      />
    ),
  },
];

const Extra1 = () => {
  const [saveForm, setSaveForm] = useState({
    userId: 1,
    json: [],
  });
  const [reviewValue, setReviewValue] = useState('Pass');
  const [selectedRows, setSelectedRows] = useState([]);

  // Handle Save button click
  const handleSave = () => {
    console.log('Saving data:', saveForm.json);
    // Add your saving logic here (e.g., make an API call)
  };

  // Apply review to selected rows
  const applyReviewToSelected = () => {
    const updatedRows = saveForm.json.map((row) =>
      selectedRows.includes(row.id)
        ? { ...row, review: reviewValue }
        : row
    );
    setSaveForm({ ...saveForm, json: updatedRows });
  };

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      // Fake data returned from the API
      const fetchedData = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', age: 28, note: '', status: 'N', review: 'Fail' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', age: 34, note: '', status: 'N', review: 'Fail' },
        { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', age: 45, note: '', status: 'Y', review: 'Pass' },
        { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com', age: 52, note: '', status: 'N', review: 'Fail' },
      ];

      // Update state with the fetched data
      setSaveForm(prevState => ({
        ...prevState,
        json: fetchedData,
      }));
    }, 1000); // Simulate a 1-second delay
  }, []);

  return (
    <Box sx={{ height: 600, width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
        <TextField
          select
          label="Review Value"
          value={reviewValue}
          onChange={(event) => setReviewValue(event.target.value)}
          variant="outlined"
          size="small"
          sx={{ mr: 2 }}
        >
          <MenuItem value="Pass">Pass</MenuItem>
          <MenuItem value="Fail">Fail</MenuItem>
        </TextField>
        <Button
          variant="contained"
          color="secondary"
          onClick={applyReviewToSelected}
        >
          Apply Review
        </Button>
      </Box>
      <Box sx={{ flex: 1, mb: 2 }}>
        <DataGrid
          rows={saveForm.json}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);
          }}
          processRowUpdate={(newRow) => {
            const updatedRows = saveForm.json.map((row) =>
              row.id === newRow.id ? { ...row, ...newRow } : row
            );
            setSaveForm({ ...saveForm, json: updatedRows });
            return newRow;
          }}
          experimentalFeatures={{ newEditingApi: true }} // Use new editing API for better support
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default Extra1;
