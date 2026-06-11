import { createTheme } from '@mui/material/styles';

// Light Theme Configuration
const lightTheme = createTheme({
  palette: {
    mode: "light",
    common: {
      black: "#000",
      white: "#fff",
    },
    primary: {
      main: "#008080", // Teal
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#FF6F61", // Coral
      contrastText: "#000000",
    },
    error: {
      main: "#D32F2F",
    },
    warning: {
      main: "#ED6C02",
    },
    info: {
      main: "#0288D1",
    },
    success: {
      main: "#2E7D32",
    },
    grey: {
      50: "#F9FAFB",
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D1D5DB",
      400: "#9CA3AF",
      500: "#6B7280",
      600: "#4B5563",
      700: "#374151",
      800: "#1F2937",
      900: "#111827",
    },
    text: {
      primary: "#000000",
      secondary: "#ffffff",
    },
    divider: "rgba(0, 0, 0, 0.12)",
    background: {
      default: "#FFFFFF",
      paper: "#F4F6F9",
    },
    action: {
      active: "#008080",
      hover: "rgba(0, 128, 128, 0.08)",
      selected: "rgba(0, 128, 128, 0.16)",
      disabled: "rgba(0, 0, 0, 0.38)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
    },
    border: {
      primary: "#FF6F61",
      secondary: "#008080",
    },
  },
});

// Dark Theme Configuration
 
export { lightTheme };
