import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import DrawerComponent from "./drawer";
import Avatar from "@mui/material/Avatar";
import { useNavigate , Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Header = ({ selectedView, setSelectedView }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: theme.palette.primary.main,
      boxShadow: "none",}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{marginRight: 2,}}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            className="header-title header-oxanium"
            variant="h6"
            component="div"
            sx={{textAlign: "center",
              flexGrow: 1,
              color: theme.palette.text.secondary,}}
          >
            Enquiry Management
          </Typography>

          {/* {user ? (
            <Box sx={styles.userInfo}>
              <Avatar src={user.avatar} alt={user.name} sx={styles.avatar} />
              <Typography variant="body1" sx={styles.userName}>
                {user.name}
              </Typography>
              <Button onClick={handleLogout} color="inherit" sx={styles.button}>
                Logout
              </Button>
            </Box>
          ) : (
            <Button component={Link} to="/login" color="inherit" sx={styles.button}>
              Login
            </Button>
          )} */}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <DrawerComponent
          selectedView={selectedView}
          setSelectedView={setSelectedView}
          toggleDrawer={toggleDrawer}
        />
      </Drawer>

      <Box sx={{paddingTop: "64px",}}>
        {/* Main content goes here */}
      </Box>
    </Box>
  );
};

export default Header;
