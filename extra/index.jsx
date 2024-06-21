import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import dayjs from 'dayjs';

const Extra = () => {
  const [searchForm, setSearchForm] = useState({
    userName: '',
    fromDate: null,
    toDate: null,
  });
  const [error, setError] = useState({
    userName: '',
    fromDate: '',
    toDate: '',
    api: '',
  });
  const [searchResult, setSearchResult] = useState(null);

  const isValidDate = (date) => {
    return dayjs(date, ['YYYY-MM-DD', 'MM/DD/YYYY'], true).isValid();
  };

  const validateForm = () => {
    let isValid = true;

    if (!searchForm.userName.trim()) {
      setError((prevError) => ({
        ...prevError,
        userName: 'Please fill in the Username field.',
      }));
      isValid = false;
    } else {
      setError((prevError) => ({
        ...prevError,
        userName: '',
      }));
    }

    if (searchForm.fromDate && !isValidDate(searchForm.fromDate)) {
      setError((prevError) => ({
        ...prevError,
        fromDate: 'Invalid date format for From Date.',
      }));
      isValid = false;
    } else {
      setError((prevError) => ({
        ...prevError,
        fromDate: '',
      }));
    }

    if (searchForm.toDate && !isValidDate(searchForm.toDate)) {
      setError((prevError) => ({
        ...prevError,
        toDate: 'Invalid date format for To Date.',
      }));
      isValid = false;
    } else {
      setError((prevError) => ({
        ...prevError,
        toDate: '',
      }));
    }

    return isValid;
  };

  const handleSearch = async () => {
    if (!validateForm()) {
      return; // Exit early if form validation fails
    }

    const { userName, fromDate, toDate } = searchForm;

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
      setError((prevError) => ({
        ...prevError,
        api: '',
      }));
      console.log('Search result:', data);
    } catch (error) {
      setError((prevError) => ({
        ...prevError,
        api: 'Error performing search. Please try again.',
      }));
      console.error('Error:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Search Form
      </Typography>
      {error.api && <Alert severity="error">{error.api}</Alert>}
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={searchForm.userName}
        onChange={(e) => setSearchForm({ ...searchForm, userName: e.target.value })}
        error={!!error.userName}
        helperText={error.userName}
      />
      <TextField
        type="date"
        label="From Date"
        fullWidth
        margin="normal"
        value={searchForm.fromDate || ''}
        onChange={(e) => setSearchForm({ ...searchForm, fromDate: e.target.value })}
        InputLabelProps={{
          shrink: true,
        }}
        error={!!error.fromDate}
        helperText={error.fromDate}
      />
      <TextField
        type="date"
        label="To Date"
        fullWidth
        margin="normal"
        value={searchForm.toDate || ''}
        onChange={(e) => setSearchForm({ ...searchForm, toDate: e.target.value })}
        InputLabelProps={{
          shrink: true,
        }}
        error={!!error.toDate}
        helperText={error.toDate}
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
