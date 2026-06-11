// src/components/Body.js
import React, { useState } from 'react';
import { Box, Grid2, Typography } from '@mui/material';
import QueryForm from './queryForm/queryForm';
import QueryGrid from './queryGrid/queryGrid';
import Settings from './Settings/Settings'
import { useTheme } from '@mui/material/styles';



const Body = ({ selectedView , toggleTheme, isDarkMode }) => {
  const [refreshGrid, setRefreshGrid] = useState(false);

  const refreshGridData = () => {
    setRefreshGrid(!refreshGrid);
  };

  const theme = useTheme(); 
   

  return (
   <>
     
     
    
    <Box
      sx={{
        minHeight: '80vh',
        height: '100%',
        background: theme.palette.background.default,
        overflow: 'auto',
        flex: 1,
        padding: '10px',
        
      }}
    
    >
      <Grid2 container spacing={2}>
        <Grid2 item xs={12}>
          {/* Conditional rendering based on selectedView */}
          {selectedView === 'Add Form' && <QueryForm refreshGridData={refreshGridData} />}
          {selectedView === 'analytics' && <QueryGrid refreshGrid={refreshGrid} />}
          {selectedView === 'Settings' &&  <Settings toggleTheme={toggleTheme} isDarkMode={isDarkMode}  ></Settings>}
          {selectedView === 'Help' && <Typography variant="h6">Help Component</Typography>}
        </Grid2>
      </Grid2>
    </Box>
    </>
  );
};

export default Body; 