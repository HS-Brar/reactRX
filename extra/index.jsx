import React, { useState } from 'react';
import { Button, Grid, Tabs, Tab, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Ntwk4 from '../Ntwk4';
import Ntwk28 from '../Ntwk28';
import Ntwk10 from '../Ntwk10';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const Extra = ({ data }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [tabs, setTabs] = useState([]);

  const handleButtonClick = (label) => {
    const sotId = "8";
    if (!tabs.some(tab => tab.label === label)) {
      setTabs([...tabs, { label, sotId }]);
      setTabIndex(tabs.length + 1);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleCloseTab = (index) => {
    const newTabs = tabs.filter((tab, tabIndex) => tabIndex !== index - 1);
    setTabs(newTabs);
    setTabIndex(0);
  };

  const renderTabContent = (tab) => {
    const { label, sotId } = tab;
    switch (label) {
      case '4-Ntwk':
        return <Ntwk4 sotId={sotId} />;
      case '28-Ntwk':
        return <Ntwk28 sotId={sotId} />;
      case '10-Ntwk':
        return <Ntwk10 sotId={sotId} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Home" />
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={
              <span>
                {tab.label}
                <IconButton
                  size="small"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleCloseTab(index + 1);
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </span>
            }
          />
        ))}
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button variant="contained" onClick={() => handleButtonClick('4-Ntwk')}>4-Ntwk</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => handleButtonClick('28-Ntwk')}>28-Ntwk</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => handleButtonClick('10-Ntwk')}>10-Ntwk</Button>
          </Grid>
        </Grid>
      </TabPanel>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={tabIndex} index={index + 1}>
          {renderTabContent(tab)}
        </TabPanel>
      ))}
    </div>
  );
};

export default Extra;
