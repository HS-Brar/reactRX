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
      [key]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inParaForm); // You can send this data to your API or perform further actions
  };

  const inPara = [
    { key: 'data1', label: 'Data 1', options: ['yes', 'no'] },
    { key: 'data2', label: 'Data 2', options: ['dog', 'cat'] },
    { key: 'data3', label: 'Data 3', options: ['dog', 'cat'] },
    { key: 'data4', label: 'Data 4', options: ['yes', 'no'] },
    { key: 'data5', label: 'Data 5', options: ['yes', 'no'] }
  ];

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Select Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inPara.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.label}</TableCell>
                <TableCell>
                  <Select
                    value={inParaForm[row.key]}
                    onChange={(e) => handleChange(e, row.key)}
                  >
                    {row.options.map(option => (
                      <MenuItem key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </MenuItem>
                    ))}
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
