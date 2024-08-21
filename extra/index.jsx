import React, { useState, useEffect } from 'react';
import { Box, Button, MenuItem, Select, FormControl, InputLabel, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const Extra1 = () => {
  const [saveForm, setSaveForm] = useState({
    userId: 1,
    json: {
      gppJson28Fields: [],
      gppMatch: 0,
      gppNotMatch: 0
    }
  });
  const [bulkReview, setBulkReview] = useState('');
  const [bulkNote, setBulkNote] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [error, setError] = useState('');
  const [highlightedRows, setHighlightedRows] = useState(new Set());

  useEffect(() => {
    const mockData = [
      { Sn: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'Matched', note: '', validation: 'true' },
      { Sn: 2, name: 'Jane Smith', email: 'jane.smith@example.com', status: 'Not Matched', note: '', validation: 'true' },
      { Sn: 3, name: 'Emily Johnson', email: 'emily.johnson@example.com', status: 'Matched', note: '', validation: 'true' },
      { Sn: 4, name: 'Michael Brown', email: 'michael.brown@example.com', status: 'Not Matched', note: '', validation: 'true' },
      { Sn: 5, name: 'Sarah Davis', email: 'sarah.davis@example.com', status: 'Matched', note: '', validation: 'false' },
      { Sn: 6, name: 'David Wilson', email: 'david.wilson@example.com', status: 'Not Matched', note: '', validation: 'false' },
      { Sn: 7, name: 'Laura Martinez', email: 'laura.martinez@example.com', status: 'Matched', note: '', validation: 'false' },
      { Sn: 8, name: 'James Lee', email: 'james.lee@example.com', status: 'Not Matched', note: '', validation: 'false' },
      { Sn: 9, name: 'Linda Taylor', email: 'linda.taylor@example.com', status: 'Matched', note: '', validation: 'false' },
      { Sn: 10, name: 'Robert Anderson', email: 'robert.anderson@example.com', status: 'Not Matched', note: '', validation: 'false' }
    ];

    const gppMatch = mockData.filter(row => row.status === 'Matched').length;
    const gppNotMatch = mockData.filter(row => row.status === 'Not Matched').length;

    setSaveForm({
      userId: 1,
      json: {
        gppJson28Fields: mockData.map(row => ({ ...row, review: '' })),
        gppMatch: gppMatch,
        gppNotMatch: gppNotMatch
      }
    });
  }, []);

  const handleReviewChange = (Sn, newReview) => {
    setSaveForm(prevState => {
      const updatedFields = prevState.json.gppJson28Fields.map(row => {
        if (row.Sn === Sn) {
          return { ...row, review: newReview };
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
        if (row.Sn === Sn) {
          return { ...row, note: newNote };
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
    if (!bulkReview) {
      setError('Please provide a review.');
      return;
    }

    // Check for missing notes and show alert
    const rowsWithMissingNotes = saveForm.json.gppJson28Fields.filter(row => 
      selectedIds.includes(row.Sn) && row.status === 'Not Matched' && !row.note
    );

    if (rowsWithMissingNotes.length > 0) {
      alert('Some selected rows have reviews but missing notes. Please provide notes for those rows.');
    }

    setSaveForm(prevState => {
      const updatedFields = prevState.json.gppJson28Fields.map(row => {
        if (selectedIds.includes(row.Sn) && row.status === 'Not Matched') {
          return { ...row, review: bulkReview, note: bulkNote || row.note }; // Preserve existing note if not provided
        }
        return row;
      });

      const newGppMatch = updatedFields.filter(row => row.status === 'Matched').length;
      const newGppNotMatch = updatedFields.filter(row => row.status === 'Not Matched').length;

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
    const newSaveForm = { ...saveForm };
    const updatedFields = newSaveForm.json.gppJson28Fields.map(row => {
      if (row.review === 'Review Pass') {
        return { ...row, status: 'Matched' };
      }
      return row;
    });

    const gppMatch = updatedFields.filter(row => row.status === 'Matched').length;
    const gppNotMatch = updatedFields.filter(row => row.status === 'Not Matched').length;

    newSaveForm.json = {
      ...newSaveForm.json,
      gppJson28Fields: updatedFields,
      gppMatch: gppMatch,
      gppNotMatch: gppNotMatch
    };

    setSaveForm(newSaveForm);
    return newSaveForm;
  };

  const handleSave = async () => {
    // Validate if any row has a review but missing note
    const rowsWithMissingNotes = saveForm.json.gppJson28Fields.filter(row => row.review && !row.note);

    if (rowsWithMissingNotes.length > 0) {
      setError('Please provide a note for all reviewed rows.');
      setHighlightedRows(new Set(rowsWithMissingNotes.map(row => row.Sn)));
      return;
    }

    setError(''); // Clear any previous error
    setHighlightedRows(new Set()); // Clear highlighted rows if no errors

    const temp = handleCalculation();
    setTimeout(() => {
      console.log("Updated saveForm state:", temp);
    }, 500);
  };

  const handleSelectionChange = (newSelection) => {
    setSelectedIds(newSelection);
  };

  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    const exportColumns = columns
      .map(col => ({
        header: col.headerName,
        key: col.field,
        width: col.width / 10 // Adjust width for readability
      }));

    worksheet.columns = exportColumns;

    worksheet.getRow(1).eachCell({ includeEmpty: true }, (cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFF00' } // Yellow background color
      };
      cell.font = { bold: true }; // Bold header text
    });

    saveForm.json.gppJson28Fields.forEach((row) => {
      const excelRow = worksheet.addRow(row);

      const nameCell = excelRow.getCell(exportColumns.findIndex(col => col.key === 'name') + 1);
      if (row.validation === 'true') {
        nameCell.font = { color: { argb: '00FF00' } }; // Green text color
      } else {
        nameCell.font = { color: { argb: 'FF0000' } }; // Red text color
      }

      const statusCell = excelRow.getCell(exportColumns.findIndex(col => col.key === 'status') + 1);
      if (row.status === 'Matched') {
        statusCell.font = { color: { argb: '4CAF50' } }; // Green text color
      } else if (row.status === 'Not Matched') {
        statusCell.font = { color: { argb: 'F44336' } }; // Red text color
      }
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'UserInfo.xlsx');
  };

  const columns = [
    { field: 'Sn', headerName: 'Sn', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      renderCell: (params) => (
        <span style={{ color: params.row.validation === 'true' ? 'green' : 'red' }}>
          {params.row.name}
        </span>
      )
    },
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
          disabled={params.row.status !== 'Not Matched'}
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
        <input
          value={params.row.note || ''}
          onChange={(event) => handleNoteChange(params.row.Sn, event.target.value)}
          fullWidth
          disabled={params.row.status !== 'Not Matched'}
          style={{
            border: highlightedRows.has(params.row.Sn) ? '2px solid red' : '1px solid #ccc'
          }}
          onKeyDown={(e) => {
            if (e.key === ' ') e.stopPropagation(); // Prevent spacebar from triggering row selection
          }}
        />
      )
    }
  ];

  return (
    <Box sx={{ height: 650, width: '100%' }}>
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
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
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Bulk Note"
            value={bulkNote}
            onChange={(e) => setBulkNote(e.target.value)}
            fullWidth
            placeholder="Enter note for bulk update"
          />
        </FormControl>
        {error && <Box sx={{ mb: 2, color: 'red' }}>{error}</Box>}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleBulkUpdate}
          sx={{ mt: 2 }}
        >
          Apply to Selected
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleExport}
          sx={{ mt: 2, ml: 2 }}
        >
          Export to Excel
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
        getRowId={(row) => row.Sn}
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
