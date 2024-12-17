import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  Button,
  Box,
} from '@mui/material';
import Popup from '../../components/Popup';

const Extra4 = () => {
  const [ntwkIdPopup, setNtwkIdPopup] = useState(true);
  const [idList] = useState(["INCCP", "OCMHLD", "CVS-EX", "OCMHCM", "*COVD2"]);
  const [validateForm] = useState({
    networkList: [
      { "0": "BHSGEN", "1": "BHSGEN" },
      { "0": "Optum Mail Networks, if present", "1": "OPTUML" },
      { "0": "Optum Specialty Networks", "1": "SALVEO" },
      { "0": "Optum-managed Retailed Networks", "1": "IRX9CT" },
      { "0": "TALD", "1": "TALD" },
    ],
  });

  // Initialize mappedNetworks to have the same structure as validateForm.networkList
  const [mappedNetworks, setMappedNetworks] = useState(
    idList.map((id) => ({ "0": "", "1": id }))
  );

  // Handle dropdown change
  const handleDropdownChange = (id, selectedNetworkName) => {
    const selectedNetwork = validateForm.networkList.find(
      (network) => network["0"] === selectedNetworkName
    );

    if (selectedNetwork) {
      setMappedNetworks((prev) =>
        prev.map((network) =>
          network["1"] === id
            ? { ...network, "0": selectedNetwork["0"] }
            : network
        )
      );
    }
  };

  // Save button handler
  const handleSave = () => {
    console.log("Mapped Networks:", mappedNetworks);
    // Add your API call or further logic here
    setNtwkIdPopup(false); // Close popup after saving
  };

  return (
    <Popup
      title="Map Network IDs"
      openPopup={ntwkIdPopup}
      setOpenPopup={setNtwkIdPopup}
      popupWidth={"md"}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Network Name</TableCell>
              <TableCell>Network ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mappedNetworks.map((mappedNetwork) => (
              <TableRow key={mappedNetwork["1"]}>
                <TableCell>
                  <FormControl fullWidth>
                    <Select
                      value={mappedNetwork["0"] || ""}
                      onChange={(e) =>
                        handleDropdownChange(mappedNetwork["1"], e.target.value)
                      }
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        Select Network Name
                      </MenuItem>
                      {validateForm.networkList.map((network, index) => (
                        <MenuItem key={index} value={network["0"]}>
                          {network["0"]}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>{mappedNetwork["1"]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ textAlign: "right", marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>
    </Popup>
  );
};

export default Extra4;
