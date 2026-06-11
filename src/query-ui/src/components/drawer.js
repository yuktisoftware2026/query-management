import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import AnalyticsIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import ListSubheader from "@mui/material/ListSubheader";
import { Divider, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // Import useTheme to access theme properties
import { NavLink } from "react-router-dom";

const DrawerComponent = ({ selectedView, setSelectedView, toggleDrawer }) => {
  // Use the MUI theme to get the palette colors
  const theme = useTheme();

  // Grouped drawer items
  const drawerSections = [
    {
      title: "Forms",
      items: [
        {
          text: "Add Form",
          icon: <AddIcon />,
          view: "Add Form",
          path: "/add-form",
        },
      ],
    },
    {
      title: "Analytics",
      items: [
        {
          text: "Analytics",
          icon: <AnalyticsIcon />,
          view: "Analytics",
          path: "/analytics",
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          text: "Settings",
          icon: <SettingsIcon />,
          view: "Settings",
          path: "/settings",
        },
        { text: "Help", icon: <HelpIcon />, view: "Help", path: "/help" },
      ],
    },
  ];

  return (
    <Box
      sx={{
        width: 250,
        backgroundColor: theme.palette.background.default, // Dynamic background color
        padding: "16px",
        height: "100%",
        boxShadow: `0 2px 10px ${theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.3)"}`, // Shadow based on theme
      }}
      role="presentation"
    >
      <Typography
        variant="h5"
        component="div"
        sx={{
          mb: 2,
          fontWeight: "bold",
          color: theme.palette.text.primary, // Dynamic text color
        }}
      >
        Menu
      </Typography>
      <Divider sx={{ backgroundColor: theme.palette.text.secondary }} />{" "}
      {/* Dynamic divider color */}
      <List>
        {drawerSections.map((section) => (
          <React.Fragment key={section.title}>
            <ListSubheader
              sx={{
                backgroundColor: theme.palette.background.paper, // Dynamic primary color
                fontWeight: "bold",
                color: theme.palette.secondary.main, // Dynamic secondary color
              }}
            >
              {section.title}
            </ListSubheader>

            {section.items.map((item) => (
              <NavLink
              key={item.text} to={item.path} onClick={toggleDrawer(false)}
              >
                <ListItem
                  button
                  key={item.text}
                  onClick={() => {
                    if (setSelectedView) {
                      setSelectedView(item.view);
                    }
                    toggleDrawer(false);
                  }}
                  selected={selectedView === item.view}
                  sx={{
                    padding: "12px 16px", // Increased padding for better touch targets
                    borderRadius: "4px", // Slightly rounded corners
                    transition: "background-color 0.3s ease",
                    color: theme.palette.text.primary, // Dynamic text color
                    "&.Mui-selected": {
                      backgroundColor: theme.palette.secondary.main, // Highlight selected item
                      color: theme.palette.background.default, // Change text color for selected item
                    },
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main, // Hover effect color
                      color: theme.palette.background.paper, // Text color on hover
                    },
                  }}
                >
                  {item.icon}
                  <ListItemText primary={item.text} sx={{ ml: 2 }} />{" "}
                  {/* Added margin for spacing */}
                </ListItem>
              </NavLink>
            ))}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default DrawerComponent;
