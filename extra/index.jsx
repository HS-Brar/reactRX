import React, { useState, useEffect } from 'react';
import { Box, MenuItem, TextField, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

// Define options for the review dropdown
const reviewOptions = ['Pass', 'Fail'];

const Extra1 = () => {
  const [data, setData] = useState({
    gppJson28Fields: [
      { sn: 1, g: "ggggg", h: "hhhhh", i: "iiiii", status: 'not match', review: '' },
      { sn: 2, g: "aaaaa", h: "bbbbb", i: "ccccc", status: 'match', review: '' },
      { sn: 3, g: "ddddd", h: "eeeee", i: "fffff", status: 'not match', review: '' },
      { sn: 4, g: "wwwww", h: "xxxxx", i: "yyyyy", status: 'match', review: '' },
      { sn: 5, g: "zzzzz", h: "wwwww", i: "ttttt", status: 'not match', review: '' }
    ],
    match: 2,
    notMatch: 3
  });

  // useEffect to simulate fetching or processing data on component mount
  useEffect(() => {
    console.log('Component mounted, data:', data);
  }, [data]);

  // Define columns for DataGrid including the new review column
  const columns = [
    { field: 'sn', headerName: 'Sn', width: 90 },
    { field: 'g', headerName: 'G', width: 150 },
    { field: 'h', headerName: 'H', width: 150 },
    { field: 'i', headerName: 'I', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'review',
      headerName: 'Review',
      width: 200,
      renderCell: (params) => {
        const { status, review } = params.row;

        return (
          <TextField
            select
            value={review || ''} // Ensure the selected value is displayed
            onChange={(event) => handleReviewChange(event, params.row.sn, event.target.value)}
            disabled={status === 'match'} // Disable if status is "match"
            fullWidth
            variant="outlined"
            size="small"
          >
            {reviewOptions.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        );
      }
    }
  ];

  // Handler for changing review and updating global counts
  const handleReviewChange = (event, rowId, newValue) => {
    setData(prevData => {
      let newMatchCount = prevData.match;
      let newNotMatchCount = prevData.notMatch;

      const updatedFields = prevData.gppJson28Fields.map(item => {
        if (item.sn === rowId) {
          const currentReview = item.review;
          const updatedItem = { ...item, review: newValue };

          // Adjust counts based on review value changes
          if (currentReview === 'Pass' && newValue !== 'Pass') {
            newMatchCount -= 1;
            newNotMatchCount += 1;
          } else if (currentReview !== 'Pass' && newValue === 'Pass') {
            newMatchCount += 1;
            newNotMatchCount -= 1;
          }

          return updatedItem;
        }
        return item;
      });

      return {
        ...prevData,
        gppJson28Fields: updatedFields,
        match: newMatchCount,
        notMatch: newNotMatchCount
      };
    });
  };

  // Map the data to the format required by DataGrid
  const rows = data.gppJson28Fields.map(item => ({
    sn: item.sn,
    g: item.g,
    h: item.h,
    i: item.i,
    status: item.status,
    review: item.review || '' // Initialize review with an empty string if not set
  }));

  // Function to handle submit button click
  const handleSubmit = () => {
    console.log('Submitted data:', data.gppJson28Fields);
    console.log('Match count:', data.match);
    console.log('Not Match count:', data.notMatch);
    // Here you can also display the data in a dialog, alert, or another component
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row.sn} // Use serial number as the unique identifier
      />
      <Box sx={{ marginTop: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Extra1;
