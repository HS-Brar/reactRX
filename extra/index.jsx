import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, MenuItem, Select, Checkbox, ListItemText, FormControl, InputLabel, Button } from '@mui/material';

const Extra = () => {
  const [masterData, setMasterData] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [permissionList, setPermissionList] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  useEffect(() => {
    // Simulating fetch call
    const masterData = [
      {
        permissions: [
          { permissionName: 'Upload', permissionRid: 1 },
          { permissionName: 'Audit', permissionRid: 2 },
        ],
        roleName: 'Admin',
        roleRid: 1,
      },
      {
        permissions: [
          { permissionName: 'Sot', permissionRid: 3 },
          { permissionName: 'Audit', permissionRid: 2 },
          { permissionName: 'Validate', permissionRid: 4 },
        ],
        roleName: 'Manager',
        roleRid: 2,
      },
      {
        permissions: [
          { permissionName: 'Validate', permissionRid: 4 },
          { permissionName: 'Audit', permissionRid: 3 },
        ],
        roleName: 'Author',
        roleRid: 3,
      },
    ];

    const permissionList = [
      { permissionName: 'Upload', permissionRid: 1 },
      { permissionName: 'Audit', permissionRid: 2 },
      { permissionName: 'Sot', permissionRid: 3 },
      { permissionName: 'Validate', permissionRid: 4 },
    ];

    setMasterData(masterData);
    setPermissionList(permissionList);
  }, []);

  const handleRoleChange = (event) => {
    const selectedRoleId = event.target.value;
    setSelectedRole(selectedRoleId);
    const selectedRoleData = masterData.find((role) => role.roleRid === selectedRoleId);
    setSelectedPermissions(selectedRoleData ? selectedRoleData.permissions.map(p => p.permissionRid) : []);
  };

  const handlePermissionsChange = (event) => {
    const updatedPermissions = event.target.value;
    setSelectedPermissions(updatedPermissions);

    // Update masterData with the modified permissions for the selected role
    setMasterData(prevMasterData =>
      prevMasterData.map(role =>
        role.roleRid === selectedRole
          ? { ...role, permissions: updatedPermissions.map(permissionRid => permissionList.find(permission => permission.permissionRid === permissionRid)) }
          : role
      )
    );
  };

  const handleSave = () => {
    console.log("Updated Master Data:", masterData);
  };

  return (
    <Box>
      <Typography variant="h6">Select a Role</Typography>
      <TextField
        select
        label="Role"
        value={selectedRole}
        onChange={handleRoleChange}
        fullWidth
        variant="outlined"
        margin="normal"
      >
        {masterData.map((role) => (
          <MenuItem key={role.roleRid} value={role.roleRid}>
            {role.roleName}
          </MenuItem>
        ))}
      </TextField>
      
      {selectedRole && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Permissions</InputLabel>
          <Select
            multiple
            value={selectedPermissions}
            onChange={handlePermissionsChange}
            renderValue={(selected) => selected.map(rid => {
              const permission = permissionList.find(p => p.permissionRid === rid);
              return permission ? permission.permissionName : '';
            }).join(', ')}
          >
            {permissionList.map((permission) => (
              <MenuItem key={permission.permissionRid} value={permission.permissionRid}>
                <Checkbox checked={selectedPermissions.indexOf(permission.permissionRid) > -1} />
                <ListItemText primary={permission.permissionName} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
{/*       
      <Box mt={2}>
        <Typography variant="h6">Updated Master Data:</Typography>
        <pre>{JSON.stringify(masterData, null, 2)}</pre>
      </Box> */}
    </Box>
  );
};

export default Extra;
