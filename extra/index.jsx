import React, { useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Extra = () => {
  const [data, setData] = useState({
    "Acc": "qq",
    "Assd": "qqww",
    "Adsds": "eeee",
    "Adsdsd": "acffffnds",
    "asdasdc": "acddddnds",
    "sdas": "adsd",
    "sddsf": "asdsad",
    "Acdassssdas": "asdas",
    "fff": "asdsa",
    "sfssd": "dsff",
    "xZX": "dsfff",
    "sfrs": "asdsd"
  });
  const [showAllRows, setShowAllRows] = useState(false);

  const handleToggleShowAllRows = () => {
    setShowAllRows(!showAllRows);
  };

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(data).slice(0, showAllRows ? undefined : 5).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                {/* Editable cell for the value */}
                <TableCell>
                  <input type="text" defaultValue={value} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Button to toggle showing all rows */}
      <Button onClick={handleToggleShowAllRows}>
        {showAllRows ? 'Show Less' : 'Show More'}
      </Button>
    </Box>
  );
};

export default Extra;
