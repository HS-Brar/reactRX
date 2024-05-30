import React, { useContext, useState } from 'react';
import { Box, IconButton, Typography, Menu, MenuItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { ColorModeContext, tokens } from '../../theme';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import { useNavigate } from 'react-router-dom';
import UnitSelect from '../../components/Unit';
import LogoutIcon from '@mui/icons-material/Logout'; // Import LogoutIcon from material-ui/icons

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const history = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
    history('/login');
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullScreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullScreen(false);
      });
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUpdatePassword = () => {
    console.log('Update Password');
    handleMenuClose();
  };

  return (
    <Box backgroundColor={colors.primary[400]} display="flex" justifyContent="space-between" p={0}>
      {/* <Box display="flex" alignItems="center">
        <LocationOnIcon sx={{ color: '#e91e63', m: 1 }} />
        <Typography sx={{ m: 1 }}>{localStorage.getItem('entityName')}</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <MeetingRoomOutlinedIcon sx={{ color: '#e91e63', m: 1 }} />
        <UnitSelect />
      </Box> */}
      <Box display="flex" alignItems="center">
        {/* <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? (
            <DarkModeOutlinedIcon sx={{ color: '#e91e63' }} />
          ) : (
            <LightModeOutlinedIcon sx={{ color: '#e91e63' }} />
          )}
        </IconButton> */}
        <IconButton onClick={toggleFullScreen}>
          <FullscreenOutlinedIcon sx={{ color: '#e91e63' }} />
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon sx={{ color: '#e91e63' }} />
        </IconButton>
      </Box>
      <Box display="flex" alignItems="center" >
        <IconButton onClick={handleMenuOpen}>
          <ArrowDropDownIcon sx={{ color: '#e91e63' }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          
        >
          <MenuItem onClick={handleUpdatePassword} sx={{ backgroundColor: 'lightgray' }}>
            <ListItemText primary="Update Password" />
          </MenuItem>
          <MenuItem onClick={handleLogout} sx={{ backgroundColor: 'lightgray' }}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: '#e91e63' }}/>
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;