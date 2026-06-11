import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Typography,
  Grid,
  useMediaQuery,
} from "@mui/material";
import {
  AccessAlarm,
  CheckCircle,
  Error,
  Archive,
  ChevronRightRounded as ChevronRightIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const StatusCard = ({ analytics }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  
  const styles = {
    iconColors: {
      OPEN: "#d32f2f", // Error color (red)
      INPROGRESS: "#f9a825", // Warning color (yellow)
      ARCHIVED: "#757575", // Archived color (medium gray)
      CLOSED: "#2e7d32", // Success color (green)
    },
  };

  const getStatusIcon = (status) => {
    const color = styles.iconColors[status];
    switch (status) {
      case "OPEN":
        return <Error sx={{ color }} />;
      case "INPROGRESS":
        return <AccessAlarm sx={{ color }} />;
      case "ARCHIVED":
        return <Archive sx={{ color }} />;
      case "CLOSED":
        return <CheckCircle sx={{ color }} />;
      default:
        return null;
    }
  };

  return (
    <Grid container spacing={2}>
      {Object.entries(analytics).map(([status, count]) => (
        <Grid item xs={12} sm={6} md={3} key={status}>
          <Card sx={{ height: "100%",
      border: "2px solid #1976d2", // Primary color (blue)
      borderRadius: "8px",
      transition: "transform 0.2s, box-shadow 0.2s",
      "&:hover": {
        transform: "scale(1.05)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      },
      background: theme.palette.background.paper,}}>
            <CardHeader
              avatar={getStatusIcon(status)}
              title={
                <Typography component="h2" variant="subtitle1" sx={{ fontWeight: 600,
                  color: theme.palette.text.primary,}}>
                  {status}
                </Typography>
              }
            />
            <CardContent>
              <Typography variant="h4" sx={{fontWeight: "bold",
      color: theme.palette.text.primary,}}>
                {count}
              </Typography>
              <Button
                variant="text"
                size="small"
                color="primary"
                endIcon={<ChevronRightIcon />}
                fullWidth={isSmallScreen}
                sx={{marginTop: "16px",}}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatusCard;
