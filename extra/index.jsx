import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Extra1 = () => {
  const [saveForm, setSaveForm] = useState({
    userId: 1,
    json: {
      gppJson28Fields: [],
      gppMatch: 0,
      gppNotMatch: 0
    }
  });
  const [bulkReview, setBulkReview] = useState(''); // Separate state for bulk review
  const [selectedIds, setSelectedIds] = useState([]); // Separate state for selected rows

  useEffect(() => {
    // Hardcoded mock data with status
    const mockData = [
      { Sn: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'Matched', note: '' },
      { Sn: 2, name: 'Jane Smith', email: 'jane.smith@example.com', status: 'Not Matched', note: '' },
      { Sn: 3, name: 'Emily Johnson', email: 'emily.johnson@example.com', status: 'Matched', note: '' },
      { Sn: 4, name: 'Michael Brown', email: 'michael.brown@example.com', status: 'Not Matched', note: '' },
      { Sn: 5, name: 'Sarah Davis', email: 'sarah.davis@example.com', status: 'Matched', note: '' },
      { Sn: 6, name: 'David Wilson', email: 'david.wilson@example.com', status: 'Not Matched', note: '' },
      { Sn: 7, name: 'Laura Martinez', email: 'laura.martinez@example.com', status: 'Matched', note: '' },
      { Sn: 8, name: 'James Lee', email: 'james.lee@example.com', status: 'Not Matched', note: '' },
      { Sn: 9, name: 'Linda Taylor', email: 'linda.taylor@example.com', status: 'Matched', note: '' },
      { Sn: 10, name: 'Robert Anderson', email: 'robert.anderson@example.com', status: 'Not Matched', note: '' }
    ];

    // Calculate initial gppMatch and gppNotMatch
    const gppMatch = mockData.filter(row => row.status == 'Matched').length;
    const gppNotMatch = mockData.filter(row => row.status == 'Not Matched').length;

    setSaveForm({
      userId: 1,
      json: {
        gppJson28Fields: mockData.map(row => ({ ...row, review: '' })), // Initialize review state
        gppMatch: gppMatch,
        gppNotMatch: gppNotMatch
      }
    });
  }, []);

  const handleReviewChange = (Sn, newReview) => {
    setSaveForm(prevState => {
      const updatedFields = prevState.json.gppJson28Fields.map(row => {
        if (row.Sn == Sn) {
          return { ...row, review: newReview }; // Track review changes without altering status
        }
        return row;
      });

      return {
        ...prevState,
        json: {
          ...prevState.json,
          gppJson28Fields: updatedFields
        }
      };
    });
  };

  const handleNoteChange = (Sn, newNote) => {
    setSaveForm(prevState => {
      const updatedFields = prevState.json.gppJson28Fields.map(row => {
        if (row.Sn == Sn) {
          return { ...row, note: newNote }; // Track note changes without altering status
        }
        return row;
      });

      return {
        ...prevState,
        json: {
          ...prevState.json,
          gppJson28Fields: updatedFields
        }
      };
    });
  };

  const handleBulkUpdate = () => {
    setSaveForm(prevState => {
      const updatedFields = prevState.json.gppJson28Fields.map(row => {
        if (selectedIds.includes(row.Sn) && row.status == 'Not Matched') {
          return { ...row, review: bulkReview }; // Apply bulk review to selected rows with "Not Matched" status
        }
        return row;
      });

      // Update counts based on bulk update
      const newGppMatch = updatedFields.filter(row => row.status == 'Matched').length;
      const newGppNotMatch = updatedFields.filter(row => row.status == 'Not Matched').length;

      return {
        ...prevState,
        json: {
          ...prevState.json,
          gppJson28Fields: updatedFields,
          gppMatch: newGppMatch,
          gppNotMatch: newGppNotMatch
        }
      };
    });
  };

  const handleCalculation = () => {
    // Create a copy of the current saveForm state
    const newSaveForm = { ...saveForm };

    // Apply the logic to update the status and counts
    const updatedFields = newSaveForm.json.gppJson28Fields.map(row => {
      if (row.review === 'Review Pass') {
        return { ...row, status: 'Matched' }; // Update status only on save
      }
      return row;
    });

    const gppMatch = updatedFields.filter(row => row.status === 'Matched').length;
    const gppNotMatch = updatedFields.filter(row => row.status === 'Not Matched').length;

    // Update the copy with the new data
    newSaveForm.json = {
      ...newSaveForm.json,
      gppJson28Fields: updatedFields,
      gppMatch: gppMatch,
      gppNotMatch: gppNotMatch
    };

    // Update the state with the newSaveForm
    setSaveForm(newSaveForm);

    // Return the updated saveForm if needed
    return newSaveForm;
  };

  const handleSave = async () => {
    const temp = handleCalculation();

    // Simulate an API call
    setTimeout(() => {
      console.log("Updated saveForm state:", temp);
    }, 500);
  };



  const handleSelectionChange = (newSelection) => {
    setSelectedIds(newSelection);
  };

  const columns = [
    { field: 'Sn', headerName: 'Sn', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'review',
      headerName: 'Review',
      width: 180,
      renderCell: (params) => (
        <TextField
          select
          value={params.row.review || ''}
          onChange={(event) => handleReviewChange(params.row.Sn, event.target.value)}
          fullWidth
          disabled={params.row.status !== 'Not Matched'} // Disable if status is not "Not Matched"
        >
          <MenuItem value="Review Pass">Review Pass</MenuItem>
          <MenuItem value="Fix Needed">Fix Needed</MenuItem>
        </TextField>
      )
    },
    {
      field: 'note',
      headerName: 'Note',
      width: 200,
      renderCell: (params) => (
        <TextField
          value={params.row.note || ''}
          onChange={(event) => handleNoteChange(params.row.Sn, event.target.value)}
          fullWidth
          disabled={params.row.status !== 'Not Matched'} // Disable if status is not "Not Matched"
        />
      )
    }
  ];

  return (
    <Box sx={{ height: 650, width: '100%' }}>
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Bulk Review</InputLabel>
          <Select
            value={bulkReview}
            onChange={(e) => setBulkReview(e.target.value)}
          >
            <MenuItem value="">Select Review</MenuItem>
            <MenuItem value="Review Pass">Review Pass</MenuItem>
            <MenuItem value="Fix Needed">Fix Needed</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleBulkUpdate}
          sx={{ mt: 2 }}
        >
          Apply to Selected
        </Button>
      </Box>
      <DataGrid
        rows={saveForm.json.gppJson28Fields}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        onSelectionModelChange={(newSelection) => handleSelectionChange(newSelection)}
        selectionModel={selectedIds}
        getRowId={(row) => row.Sn} // Specify Sn as the unique id for each row
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={{ mt: 2 }}
      >
        Save
      </Button>
    </Box>
  );
};

export default Extra1;
