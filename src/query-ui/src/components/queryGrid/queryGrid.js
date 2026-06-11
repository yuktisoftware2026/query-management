import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";

import StatusCard from "./StatusCard";
import FilterSection from "./FilterSection";
import DataGridComponent from "./DataGridComponent";

import { calculateAnalytics } from "../../utils/calculateAnalytics";
import { handleFilter } from "../../utils/handleFilter";

import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const QueryGrid = (props) => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [analytics, setAnalytics] = useState({
    OPEN: 0,
    INPROGRESS: 0,
    ARCHIVED: 0,
    CLOSED: 0,
  });
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const refreshGrid = props.refreshGrid;

  const theme = useTheme();
  const navigate = useNavigate();

  

  const fetchTableData = () => {
    axios
      .get("http://localhost:9999/queries")
      .then((result) => {
        const cleanData = result.data
          .filter((row) => row.id && row.status) // Ensure necessary fields are present
          .map((row) => ({
            ...row,
            id: row.id, // Use queryId as the unique identifier
          }));

        setRows(cleanData);
        setFilteredRows(cleanData);
        calculateAnalytics(cleanData, setAnalytics);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchTableData();
  }, [refreshGrid]);

  useEffect(() => {
    handleFilter(rows, statusFilter, searchText, setFilteredRows);
  }, [rows, statusFilter, searchText]);

  const handleDelete = (queryId) => {
    console.log("Deleting queryId:", queryId);

    axios
      .delete(`http://localhost:9999/queries/${queryId}`)
      .then(() => {
        const updatedRows = filteredRows.filter((row) => row.id !== queryId);
        setFilteredRows(updatedRows);
        setRows(updatedRows);
        calculateAnalytics(updatedRows, setAnalytics);
        console.log("Successfully deleted queryId:", queryId);
      })
      .catch((error) => {
        console.error("Error deleting queryId:", error);
      });
  };

  const handleEditForm = (queryId) => {
    axios
      .get(`http://localhost:9999/queries/${queryId}`)
      .then((response) => {
        const queryData = response.data;
        navigate("/add-form", { state: { queryData } });
      })
      .catch((error) => {
        console.error("Error fetching query data:", error);
      });
  };

  const handleProfileDetails = (userId) => {
    axios
      .get(`http://localhost:9999/queries/${userId}`)
      .then((response) => {
        const profileData = response.data;
        navigate(`/analytics/profile/${userId}`, { state: { profileData } });
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  };

  const handleUpdateStatus = (id, newStatus) => {
    console.log("Updating status for ID:", id, "to:", newStatus);

    axios
      .put(`http://localhost:9999/queries/${id}`, { status: newStatus })
      .then(() => {
        const updatedRows = filteredRows.map((row) =>
          row.id === id ? { ...row, status: newStatus } : row
        );

        setFilteredRows(updatedRows);
        setRows(updatedRows);
        console.log("Successfully updated status for ID:", id);
      })
      .catch((error) => {
        console.error("Error updating status for ID:", id, error);
      });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          padding: 4,
          margin: "auto",
          minHeight: "100vh",
          width: "90%",
          background: theme.palette.background.paper,
          
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >    <StatusCard analytics={analytics} />
          <FilterSection
            searchText={searchText}
            setSearchText={setSearchText}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        </Box>

       

        <DataGridComponent
          filteredRows={filteredRows}
          handleDelete={handleDelete}
          handleProfileDetails={handleProfileDetails}
          handleEditForm={handleEditForm}
        />
      </Box>
    </>
  );
};

export default QueryGrid;
