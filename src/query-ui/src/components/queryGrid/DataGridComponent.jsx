import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import HelpIcon from "@mui/icons-material/Help";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";

const DataGridComponent = ({ filteredRows, handleDelete, handleEditForm, handleProfileDetails }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleOpenDialog = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedId(null);
  };

  const confirmDelete = () => {
    handleDelete(selectedId);
    handleCloseDialog();
  };

  const columns = [
    {
      field: "queryId",
      headerName: "ID",
      width: 90,
      renderCell: (params) => {
        return params.row.id;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        let icon;
        switch (params.value) {
          case "OPEN":
            icon = <HelpIcon style={{ color: "orange" }} />;
            break;
          case "CLOSED":
            icon = <CheckCircleIcon style={{ color: "green" }} />;
            break;
          case "INPROGRESS":
            icon = <ErrorIcon style={{ color: "red" }} />;
            break;
          case "ARCHIVED":
            icon = <CheckCircleIcon style={{ color: "gray" }} />;
            break;
          default:
            icon = null;
        }
        return (
          <Box sx={{ display: "flex",
            alignItems: "center",}}>
            {icon}
            <span style={{ marginLeft: "5px",}}>{params.value}</span>
          </Box>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      renderCell: (params) => {
        return params.row.student ? params.row.student.name : "N/A";
      },
    },
    {
      field: "mobile",
      headerName: "Mobile",
      width: 150,
      renderCell: (params) => {
        return params.row.student ? params.row.student.mobile : "N/A";
      },
    },
    {
      field: "emailId",
      headerName: "Email",
      width: 150,
      renderCell: (params) => {
        return params.row.student ? params.row.student.emailId : "N/A";
      },
    },
    {
      field: "queryDescription",
      headerName: "Query Description",
      width: 250,
      editable: true,
    },
    {
      field: "response",
      headerName: "Response",
      width: 250,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <IconButton onClick={() => handleProfileDetails(params.row.id)}>
              <AccountCircleIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => handleOpenDialog(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => handleEditForm(params.row.id)}>
              <EditIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const csvOptions = {
    fileName: "exported_data",
    delimiter: ",",
    utf8WithBom: true,
    allColumns: true,
    fields: [
      "queryId",
      "status",
      "studentName",
      "studentMobile",
      "studentEmail",
      "queryDescription",
      "response",
    ],
    processRow: (row) => {
      const formattedRow = { ...row };
      if (row.student) {
        formattedRow.studentName = row.student.name || "";
        formattedRow.studentMobile = row.student.mobile || "";
        formattedRow.studentEmail = row.student.emailId || "";
      } else {
        formattedRow.studentName = "";
        formattedRow.studentMobile = "";
        formattedRow.studentEmail = "";
      }
      return formattedRow;
    },
  };

  return (
    <Box sx={{ height: "400px",
      width: "100%",}}>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        slots={{
          toolbar: GridToolbar,
        }}
        slotProps={{
          toolbar: {
            csvOptions: csvOptions,
          },
        }}
        sx={{
          "& .MuiDataGrid-toolbarContainer": {
            justifyContent: "flex-end",
          },
        }}
      />
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

 
 

export default DataGridComponent;
