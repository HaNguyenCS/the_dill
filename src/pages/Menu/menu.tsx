import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React from 'react';

function Menu() {
    const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="All" value="1" />
            <Tab label="Banh Mi" value="2" />
            <Tab label="Drinks" value="3" />
            <Tab label="Sides" value="4" />
            <Tab label="Desserts" value="5" />
            <Tab label="Combo" value="5" />
          </TabList>
        </Box>
        <TabPanel value="1">All</TabPanel>
        <TabPanel value="2">Banh Mi</TabPanel>
        <TabPanel value="3">Drinks</TabPanel>
        <TabPanel value="4">Sides</TabPanel>
        <TabPanel value="5">Desserts</TabPanel>
        <TabPanel value="5">Combo</TabPanel>
      </TabContext>
    </Box>
  );
}
export default Menu;