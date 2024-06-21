import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';  // Import AdapterDayjs correctly
import dayjs from 'dayjs';  // Import dayjs for date manipulation

const Extra = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
  };

  const handleReset = () => {
    setCheckInDate(null);
    setCheckOutDate(null);
  };

  const handleBook = () => {
    // Example action on book button click
    if (checkInDate && checkOutDate) {
      const nights = dayjs(checkOutDate).diff(checkInDate, 'day');
      alert(`Booking confirmed for ${nights} nights from ${dayjs(checkInDate).format('MM/DD/YYYY')} to ${dayjs(checkOutDate).format('MM/DD/YYYY')}`);
    } else {
      alert('Please select both check-in and check-out dates.');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Hotel Booking: Check-in and Check-out Dates
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Check-in Date"
          inputFormat="MM/dd/yyyy"
          value={checkInDate}
          onChange={handleCheckInDateChange}
          renderInput={(params) => <TextField {...params} />}
          sx={{ marginBottom: 2 }}
        />
        <DesktopDatePicker
          label="Check-out Date"
          inputFormat="MM/dd/yyyy"
          value={checkOutDate}
          onChange={handleCheckOutDateChange}
          renderInput={(params) => <TextField {...params} />}
          minDate={checkInDate}  // Ensure check-out date cannot be before check-in date
          sx={{ marginBottom: 2 }}
        />
      </LocalizationProvider>

      <Box sx={{ marginTop: 2 }}>
        <Button variant="contained" color="primary" onClick={handleBook} disabled={!checkInDate || !checkOutDate || dayjs(checkOutDate).diff(checkInDate, 'day') <= 0}>
          Book
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleReset} sx={{ marginLeft: 2 }}>
          Reset
        </Button>
      </Box>

      {checkInDate && checkOutDate && (
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Selected dates: {dayjs(checkInDate).format('MM/DD/YYYY')} - {dayjs(checkOutDate).format('MM/DD/YYYY')}
        </Typography>
      )}
    </Box>
  );
};

export default Extra;
