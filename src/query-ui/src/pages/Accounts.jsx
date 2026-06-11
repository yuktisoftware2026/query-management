import React from "react";
import {
  Grid,
  Typography,
  Avatar,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  Sync,
  Close,
  Visibility,
  Print,
  GetApp,
  Share,
  Money,
  School,
  Wallet,
  Edit,
} from "@mui/icons-material";
import AccountsForms from "./profile/AccountsForm";
import { useLocation } from "react-router-dom";

const Accounts = () => {
  const location = useLocation();
  const profileData = location.state?.profileData;

  const columns = [
    { field: "id", headerName: "ID No", flex: 1 },
    { field: "expenseType", headerName: "Expense Type", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Typography color={params.value === "Due" ? "error" : "primary"}>
          {params.value}
        </Typography>
      ),
    },
    { field: "email", headerName: "E-mail", flex: 2 },
    { field: "date", headerName: "Date", flex: 1 },
  ];

  const rows = [
    {
      id: "3055",
      expenseType: "Salary",
      amount: "$300.00",
      status: "Due",
      email: "kazifahim93@gmail.com",
      date: "20/06/2017",
    },
    {
      id: "3056",
      expenseType: "Office Rent",
      amount: "$1000.00",
      status: "Paid",
      email: "admin@example.com",
      date: "22/07/2017",
    },
  ];

  return (
    <Grid
      container
      spacing={2}
      sx={{ height: "100vh", padding: { xs: 1, sm: 2 }, flexWrap: "wrap",  overflow: "auto", }}
    >
      {/* Left Column - Student Info */}
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Card sx={{ flex: 1, p: 2, borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" color="primary">
              Student Information
            </Typography>
            <Avatar
              src="https://placehold.co/100x100"
              sx={{ width: 80, height: 80, mt: 2, mb: 2 }}
            />
            <Grid container spacing={1}>
              {["name", "emailId", "mobile", "studentId", "college", "degree", "branch", "semester", "passingYear", "address"].map(
                (field) => (
                  <Grid item xs={12} sm={6} key={field}>
                    <Typography variant="body1">
                      <strong>
                        {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) =>
                          str.toUpperCase()
                        )}:
                      </strong>{" "}
                      {profileData?.student?.[field] || "N/A"}
                    </Typography>
                  </Grid>
                )
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Right Column - Stats & Expense Table */}
      <Grid item xs={12} md={7} container spacing={2} >
        {/* Stats Cards */}
        {[
     { icon: <Money />, label: "₹15,000 Total Fees", color: "#e57373" },
     { icon: <Edit />, label: "₹5,000 Paid Fees", color: "#81c784" },
     { icon: <School />, label: "₹10,000 Pending Fees", color: "#64b5f6" },
     { icon: <Wallet />, label: "Next Due: 15th March", color: "#4db6ac" },
  ].map((stat, index) => (
    <Grid
      item
      xs={12} 
      sm={6} 
      md={3} 
      key={index} 
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Card
        sx={{
          bgcolor: stat.color,
          color: "white",
          p: 2,
          borderRadius: 2,
          boxShadow: 3,
          display: "flex",
          alignItems: "center",
          gap: 1,
          width: "100%",
          justifyContent: "center",
        }}
      >
        {stat.icon}
        <Typography
          variant="body2"
          sx={{ fontSize: { xs: "0.8rem", sm: "1rem" }, textAlign: "center" }}
        >
          {stat.label}
        </Typography>
      </Card>
    </Grid>
  ))}

        {/* Expense Table */}
        <Grid item xs={12} sx={{ flexGrow: 1 }}>
          <Card sx={{ borderRadius: 2, boxShadow: 3, height: "100%" }}>
            <CardContent sx={{ height: "100%" }}>
              <Typography variant="h6">All Expenses</Typography>
              <div>
                <IconButton>
                  <Sync color="success" />
                </IconButton>
                <IconButton>
                  <Close color="error" />
                </IconButton>
                <AccountsForms />
              </div>
              <div style={{ width: "100%", height: "auto" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSizeOptions={[5, 10]}
                  disableRowSelectionOnClick
                  autoHeight
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Accounts;
