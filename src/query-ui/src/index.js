import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider , useThemeContext } from "./context/ThemeContext";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import { lightTheme} from "./utils/theme";

const Root = () => {
  return (
    <ThemeProvider>
      <AppWrapper />
    </ThemeProvider>
  );
};

const AppWrapper = () => {
  const { isDarkMode } = useThemeContext();
  const theme = createTheme(lightTheme);

  return (
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

reportWebVitals();
