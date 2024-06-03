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
  TextField,
  Button,
} from '@mui/material';

const Extra = () => {
  const [saveForm, setSaveForm] = useState({});
  const data = {
    networkList: [
      { "net 1": "net1" },
      { "net 2": "net2" },
      { "net 3": "net3" },
    ],
  };

  const handleInputChange = (event, networkName) => {
    const { value } = event.target;
    setSaveForm((prevSaveForm) => ({
      ...prevSaveForm,
      [networkName]: value,
    }));
  };

  const handleSave = () => {
    console.log(saveForm);
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
            {data.networkList.map((network, index) => {
              const networkName = Object.keys(network)[0];
              const networkID = network[networkName];
              return (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {networkName}
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={saveForm[networkName] || networkID}
                      onChange={(event) => handleInputChange(event, networkName)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
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
