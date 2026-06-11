import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from "@mui/material/styles";
 

const Footer = () => {
  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: theme.palette.primary.main }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 , color : theme.palette.text.secondary }}>
            &#169; Yukti Softwares 2024
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Footer;
