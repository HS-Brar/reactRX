import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';

const Extra = () => {
  const [data, setData] = useState({
    networkList: [
      { 0: "net 1", 1: "net1" },
      { 0: "net 2", 1: "net2" },
      { 0: "net 3", 1: "net3" },
    ],
  });

  const handleInputChange = (event, index) => {
    const { value } = event.target;
    const updatedNetworkList = data.networkList.map((network, i) => {
      if (i === index) {
        return { ...network, 1: value };
      }
      return network;
    });

    setData({ networkList: updatedNetworkList });
  };

  const handleSave = () => {
    console.log(data.networkList);
  };

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Network Name</TableCell>
              <TableCell>Network ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.networkList.map((network, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {network[0]}
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    value={network[1]}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default Extra;
