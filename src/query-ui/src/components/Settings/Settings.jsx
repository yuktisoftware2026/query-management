import React from "react";
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { useThemeContext } from "../../context/ThemeContext";
import { useTheme } from '@mui/material/styles';

const Settings = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();

  const theme = useTheme(); 

  // Example handlers for other settings
  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  const handleReset = () => {
    alert("Settings reset to defaults");
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor:theme.palette.background.default,
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      {/* Title */}
      <Typography variant="h5" sx={{ color:theme.palette.text.primary , fontWeight: "bold", mb: 2 }}>
        Settings
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Dark Mode Toggle */}
      <Box sx={{ color:theme.palette.text.primary, mb: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={isDarkMode}
              onChange={toggleTheme}
              color="primary"
            />
          }
          label="Enable Dark Mode"
        />
      </Box>

      {/* Email Notifications */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ color:theme.palette.text.primary, mb: 1 }}>
          Email Notifications
        </Typography>
        <Grid container spacing={2} >
          <Grid item xs={12} md={6}>
            <TextField
              label="Notification Email"
              variant="outlined"
              fullWidth
              placeholder="e.g., example@mail.com"
              
            />
          </Grid>
        </Grid>
      </Box>

      {/* System Preferences */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ color:theme.palette.text.primary,mb: 1 }}>
          System Preferences
        </Typography>
        <FormControlLabel sx={{color:theme.palette.text.primary}}
          control={<Switch color="secondary" />}
          label="Enable Auto-save"
        />
      </Box>

      {/* Save and Reset Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "primary.main",
            color: "white",
          }}
          onClick={handleSave}
        >
          Save Changes
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderColor: "secondary.main",
            color: "secondary.main",
          }}
          onClick={handleReset}
        >
          Reset to Defaults
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;
