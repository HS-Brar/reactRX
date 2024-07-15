import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, Paper, Button } from '@mui/material';

const Extra = () => {
  // State to manage the selected values for each data item
  const [formData, setFormData] = useState({
    data1: '',
    data2: '',
    data3: '',
    data4: '',
    data5: '',
    sotId: 0 // You may adjust this as per your requirement
  });

  // Handle change in Select component
  const handleChange = (event, key) => {
    const { value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [key]: value === 'yes' ? true : false // Convert 'yes' to true, 'no' to false
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // You can send this data to your API or perform further actions
  };

  const rows = [
    { key: 'data1', label: 'Data 1' },
    { key: 'data2', label: 'Data 2' },
    { key: 'data3', label: 'Data 3' },
    { key: 'data4', label: 'Data 4' },
    { key: 'data5', label: 'Data 5' }
  ];

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Select Yes/No</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.label}</TableCell>
                <TableCell>
                  <Select
                    value={formData[row.key] === true ? 'yes' : formData[row.key] === false ? 'no' : ''}
                    onChange={(e) => handleChange(e, row.key)}
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default Extra;
