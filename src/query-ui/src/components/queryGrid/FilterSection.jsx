import React from "react";
import { TextField, MenuItem, Box } from "@mui/material";
import { ThemeContext } from "@emotion/react";
import { useTheme } from "@mui/material/styles";

const FilterSection = ({ searchText, setSearchText, statusFilter, setStatusFilter }) => {
   const theme = useTheme();

  return (
    <Box sx={{ display: "flex",
      gap: "16px",
      marginBottom: "16px",}}>
      <TextField
        label="Search"
        variant="outlined"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        InputLabelProps={{
          style: { color: theme.palette.text.primary }, // Change label color
        }}
        sx={{  width: "100%",  "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#ccc", // Light border color
          },
          "&:hover fieldset": {
            borderColor: "#3f51b5", // Change border color on hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "#3f51b5", // Focused border color
          },
        }, }}
      />
      <TextField
        label="Status"
        variant="outlined"
        select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        InputLabelProps={{
          style: { color: theme.palette.text.primary }, // Change label color
        }}
        sx={{  width: "150px",  "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#ccc", // Light border color
          },
          "&:hover fieldset": {
            borderColor: "#3f51b5", // Change border color on hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "#3f51b5", // Focused border color
          },
        }, }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="OPEN">Open</MenuItem>
        <MenuItem value="INPROGRESS">In Progress</MenuItem>
        <MenuItem value="ARCHIVED">Archived</MenuItem>
        <MenuItem value="CLOSED">Closed</MenuItem>
      </TextField>
    </Box>
  );
};

export default FilterSection;
