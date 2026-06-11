import React from "react";
import {
  Box,
  Container,
  Grid,
  Avatar,
  Typography,
  Button,
  Link,
  TextField,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: theme.palette.primary.paper,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    flexDirection: "column",
    maxWidth: 1200,
    width: "100%",
    overflow: "hidden",
  },
  profileSection: {
    borderRight: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginBottom: theme.spacing(2),
  },
  profileStats: {
    width: "100%",
    marginBottom: theme.spacing(4),
  },
  statItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
  },
  settingsSection: {
    padding: theme.spacing(3),
    flexGrow: 1,
  },
  formField: {
    marginBottom: theme.spacing(3),
  },
  backButton: {
    marginTop: theme.spacing(2),
    alignSelf: "flex-end",
  },
}));

const ProfilePage = () => {
  const classes = useStyles();
  const location = useLocation();
  const profileData = location.state?.profileData;
  const navigate = useNavigate(); 
  const theme = useTheme();

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };
   
  const handleAccountDetails = () => { 
    console.log(profileData)
    const userId = profileData?.id; // Extract studentId

    if (!userId) {
      console.error("User ID is missing in the profile data!");
      return;
    }
    
    axios
   
      .get(`http://localhost:9999/queries/${userId}`)
      .then((response) => {
        console.log( `http://localhost:9999/queries/${userId}`)
        const profileData = response.data;
        navigate(`/accounts/profile/${userId}`, { state: { profileData } });
      })
      .catch((error) => {
        console.error("Error fetching account data:", error);
      });
};


  return (
    <Box className={classes.root}>
      <Container className={classes.container}>
        <Grid container>
          {/* Back Button */}
          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleBack}
              className={classes.backButton}
            >
              Back
            </Button>
          </Grid>

          {/* Profile Section */}
          <Grid item md={4} className={classes.profileSection}>
            <Avatar
              alt={profileData?.student?.name || "User Name"}
              src="https://storage.googleapis.com/a1aa/image/Wo6pp5uLK054A1yPpfDAefLahxxVNVyqtxsostkbKjlFk0AoA.jpg"
              className={classes.avatar}
            />
            <Typography variant="h6" fontWeight="bold">
              {profileData?.student?.name || "User Name"}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {profileData?.queryDescription || "Description not available"}
            </Typography>

            <Box className={classes.profileStats}>
              <Box className={classes.statItem}>
                <Typography>Query ID</Typography>
                <Typography color="secondary">
                  {profileData?.queryId || "N/A"}
                </Typography>
              </Box>
              <Box className={classes.statItem}>
                <Typography>Priority</Typography>
                <Typography color="primary">
                  {profileData?.priority || "N/A"}
                </Typography>
              </Box>
              <Box className={classes.statItem}>
                <Typography>Status</Typography>
                <Typography color="primary">
                  {profileData?.status || "N/A"}
                </Typography>
              </Box>
            </Box>

            <Button onClick={handleAccountDetails} variant="contained" color="primary" fullWidth>
              Show Accounts 
            </Button>

             
          </Grid>

          {/* Settings Section */}
          <Grid item md={8} className={classes.settingsSection}>
            <Tabs value={0} textColor="primary" indicatorColor="primary">
              <Tab label="Account Settings" />
              <Tab label="Response History" />
              <Tab label="Query Tracking" />
            </Tabs>
            <Divider sx={{ marginY: 2 }} />

            <form>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Name"
                    defaultValue={profileData?.student?.name || ""}
                    fullWidth
                    className={classes.formField} 
                    InputLabelProps={{
                      style: { color: theme.palette.text.primary }, // Change label color
                    }} 
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Email"
                    defaultValue={profileData?.student?.emailId || ""}
                    fullWidth
                    className={classes.formField} 
                    InputLabelProps={{
                      style: { color: theme.palette.text.primary }, // Change label color
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Phone Number"
                    defaultValue={profileData?.student?.mobile || ""}
                    fullWidth
                    className={classes.formField} 
                    InputLabelProps={{
                      style: { color: theme.palette.text.primary }, // Change label color
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Query Description"
                    defaultValue={profileData?.queryDescription || ""}
                    fullWidth
                    className={classes.formField} 
                    InputLabelProps={{
                      style: { color: theme.palette.text.primary }, // Change label color
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Priority"
                    defaultValue={profileData?.priority || ""}
                    fullWidth
                    className={classes.formField} 
                    InputLabelProps={{
                      style: { color: theme.palette.text.primary }, // Change label color
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Status"
                    defaultValue={profileData?.status || ""}
                    fullWidth
                    className={classes.formField} 
                    InputLabelProps={{
                      style: { color: theme.palette.text.primary }, // Change label color
                    }}
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" color="primary" >
                Update
              </Button>
              
            </form>
            
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfilePage;
