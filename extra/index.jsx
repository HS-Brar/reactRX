import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import dayjs from 'dayjs';

const Extra = () => {
  const [searchForm, setSearchForm] = useState({
    userName: '',
    fromDate: null,
    toDate: null,
  });
  const [userNameError, setUserNameError] = useState('');
  const [fromDateError, setFromDateError] = useState('');
  const [toDateError, setToDateError] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);

  const isValidDate = (date) => {
    return dayjs(date, ['YYYY-MM-DD', 'MM/DD/YYYY'], true).isValid();
  };

  const handleFromDateChange = (e) => {
    const date = e.target.value;
    if (isValidDate(date)) {
      setSearchForm({ ...searchForm, fromDate: date });
      setFromDateError('');
    } else {
      setFromDateError('Invalid date format for From Date.');
    }
  };

  const handleToDateChange = (e) => {
    const date = e.target.value;
    if (isValidDate(date)) {
      setSearchForm({ ...searchForm, toDate: date });
      setToDateError('');
    } else {
      setToDateError('Invalid date format for To Date.');
    }
  };

  const handleSearch = async () => {
    const { userName, fromDate, toDate } = searchForm;

    if (!userName.trim()) {
      setUserNameError('Please fill in the Username field.');
      setFromDateError(''); // Reset other error states
      setToDateError('');
      return; // Exit early if username is empty
    } else {
      setUserNameError('');
    }

    // Validate dates only if they are provided
    if (fromDate && !isValidDate(fromDate)) {
      setFromDateError('Invalid date format for From Date.');
      return; // Exit early if fromDate is invalid
    } else {
      setFromDateError('');
    }

    if (toDate && !isValidDate(toDate)) {
      setToDateError('Invalid date format for To Date.');
      return; // Exit early if toDate is invalid
    } else {
      setToDateError('');
    }

    try {
      const response = await fetch('your-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          fromDate,
          toDate,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSearchResult(data);
      setError(null);
      console.log('Search result:', data);
    } catch (error) {
      setError('Error performing search. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Search Form
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={searchForm.userName}
        onChange={(e) => setSearchForm({ ...searchForm, userName: e.target.value })}
        error={!!userNameError}
        helperText={userNameError}
      />
      <TextField
        type="date"
        label="From Date"
        fullWidth
        margin="normal"
        value={searchForm.fromDate || ''}
        onChange={handleFromDateChange}
        InputLabelProps={{
          shrink: true,
        }}
        error={!!fromDateError}
        helperText={fromDateError}
      />
      <TextField
        type="date"
        label="To Date"
        fullWidth
        margin="normal"
        value={searchForm.toDate || ''}
        onChange={handleToDateChange}
        InputLabelProps={{
          shrink: true,
        }}
        error={!!toDateError}
        helperText={toDateError}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>

      {searchResult && (
        <Box mt={2}>
          <Typography variant="h5">Search Result</Typography>
          {/* Display your search result data here */}
        </Box>
      )}
    </Box>
  );
};

export default Extra;
