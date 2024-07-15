import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, Paper, Button } from '@mui/material';

const Extra = () => {
  // State to manage the selected values for each data item
  const [inParaForm, setInParaForm] = useState({
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
    setInParaForm(prevState => ({
      ...prevState,
      [key]: value === 'yes' // Set directly to true or false based on 'yes' or 'no'
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inParaForm); // You can send this data to your API or perform further actions
  };

  const inPara = [
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
            {inPara.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.label}</TableCell>
                <TableCell>
                  <Select
                    value={inParaForm[row.key] ? 'yes' : 'no'} // Directly set 'yes' or 'no'
                    onChange={(e) => handleChange(e, row.key)}
                  >
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
