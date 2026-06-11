import React, { useState } from "react";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Box,
  Dialog, DialogTitle, DialogContent, DialogActions 
} from "@mui/material";
import axios from "axios";
import { Form, Formik } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import { v4 as uuidv4 } from "uuid";
import StudentInformation from "./StudentInformation";
import CustomSnackbar from "./CustomSnackbar";
import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const API_BASE_URL = "http://localhost:9999/api/queries";

// Validation Schema
// const validationSchema = Yup.object({
//   student: Yup.object({
//     name: Yup.string()
//       .required("Name is required")
//       .min(2, "Name must be at least 2 characters"),
//     mobile: Yup.string()
//       .required("Mobile is required")
//       .matches(/^[6-9]\d{9}$/, "Enter a valid mobile number"),
//     emailId: Yup.string()
//       .required("Email ID is required")
//       .email("Enter a valid email address"),
//   }),

//   academic: Yup.object({
//     college: Yup.string().required("College is required"),
//     degree: Yup.string().required("Degree is required"),
//     branch: Yup.string().required("Branch is required"),
//     semester: Yup.string().required("Semester is required"),
//     passingYear: Yup.string()
//       .required("Passing year is required")
//       .matches(/^\d{4}$/, "Enter a valid year (e.g., 2025)"),
//   }),

//   queryDescription: Yup.string().required("Query description is required"),
//   response: Yup.string().required("Query response is required"),
//   queryDate: Yup.date().required("Query date is required"),
//   priority: Yup.string().required("Priority is required"),
//   status: Yup.string().required("Status is required"),

//   query: Yup.object({
//     visitPurpose: Yup.string().required("Visit purpose is required"),
//     referralSource: Yup.string().required("Referral source is required"),
//     remark: Yup.string().required("Remark is required"),
//   }),
// });


const QueryForm = ({ refreshGridData }) => {
  const location = useLocation();
  const queryData = location.state?.queryData;
  const navigate = useNavigate();
  const theme = useTheme();
  const uniqueId = uuidv4();

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const getInitialInputs = () => ({
    id: queryData?.id || uniqueId,
    queryId: queryData?.queryId || uniqueId,
    queryDescription: queryData?.queryDescription || "",
    response: queryData?.response || "",
    status: queryData?.status || "",
    student: {
      studentId: queryData?.student?.studentId || uniqueId,
      name: queryData?.student?.name || "",
      mobile: queryData?.student?.mobile || "",
      emailId: queryData?.student?.emailId || "",
      address: queryData?.student?.address || "",
      college: queryData?.student?.college || "",
      degree: queryData?.student?.degree || "" ,
      branch: queryData?.student?.branch || "",
      semester : queryData?.student?.branch || "",
      passingYear : queryData?.student?.passingYear || "",
    },
    queryDate: queryData?.queryDate || "",
    priority: queryData?.priority || "",
    attachments: queryData?.attachments || null,
    responseTimeframe: queryData?.responseTimeframe || "",
    comments: queryData?.comments || "",
    assignedTo: queryData?.assignedTo || "",
    visitPurpose : queryData?.visitPurpose || "",
    referralSource : queryData?.referralSource || "",
    remark : queryData?.remark || "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false); // Dialog state
  const [formValues, setFormValues] = useState(null); // Store form values

  const handleFormSubmit = (values) => {
    console.log(values)

    const requestMethod = queryData ? "put" : "post";
    const url = queryData ? `${API_BASE_URL}/${queryData.id}` : API_BASE_URL;
    axios[requestMethod](url, values)
      .then((result) => {
        console.log("Query Data", result.data);
        if (refreshGridData) refreshGridData();
        setSnackbarMessage(
          queryData
            ? "Query updated successfully! ✅"
            : "Query submitted successfully! ✅"
        );
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate("/analytics");
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
        setSnackbarMessage("Error submitting query. Please try again.");
        setOpenSnackbar(true);
      });
  };

  const handleDialogConfirm = () => {
    if (formValues) {
      handleFormSubmit(formValues);
    }
    setOpenDialog(false); // Close dialog
  };

  const handleDialogCancel = () => {
    setOpenDialog(false); // Close dialog without submitting
  };

  
   

  return (
    <Box sx={{marginBottom:7}}>
      <Formik
        initialValues={getInitialInputs()}
        // validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values)=>{
          handleFormSubmit(values)
        }}
      >
        {(formik) => (
          <Form>
            {/* <StudentInformation formik={formik} /> */}
            <Grid container spacing={3} sx={{ padding: 3, background: theme.palette.background.default }}>
        {/* Section 1: Student Information */}
        <Grid item xs={12}>
          <Box
            sx={{
              border: "1px solid ",
              borderColor: "#E5E5E5 ",
              borderRadius: 2,
              padding: 3,
              boxShadow: 2,
              backgroundColor: theme.palette.background.default,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold",  }}>
              Student Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  id="name"
                  label="Name"
                  name="student.name"
                  value={formik.values.student.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  variant="outlined"
                  sx={{ backgroundColor: theme.palette.background.paper }}
                  InputLabelProps={{
                    style: { color: theme.palette.text.primary }, // Change label color
                  }}
                  error={formik.touched.student?.name && Boolean(formik.errors.student?.name)}
                  helperText={formik.touched.student?.name && formik.errors.student?.name}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  id="mobile"
                  label="Mobile"
                  name="student.mobile"
                  value={formik.values.student.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  variant="outlined"
                  sx={{ backgroundColor: theme.palette.background.paper }}
                  InputLabelProps={{
                    style: { color: theme.palette.text.primary }, // Change label color
                  }}
                  error={formik.touched.student?.mobile && Boolean(formik.errors.student?.mobile)}
                  helperText={formik.touched.student?.mobile && formik.errors.student?.mobile}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  
                  id="emailId"
                  label="Email ID"
                  name="student.emailId"
                  value={formik.values.student.emailId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  variant="outlined"
                  sx={{ backgroundColor: theme.palette.background.paper }}
                  InputLabelProps={{
                    style: { color: theme.palette.text.primary }, // Change label color
                  }}
                  error={formik.touched.student?.emailId && Boolean(formik.errors.student?.emailId)}
                  helperText={formik.touched.student?.emailId && formik.errors.student?.emailId}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>

         {/* Section 2: Academic Details */}
         <Grid item xs={12}>
  <Box
    sx={{
      border: "1px solid #E5E5E5",
      borderRadius: 2,
      padding: 3,
      boxShadow: 2,
      backgroundColor: theme.palette.background.default,
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: "bold", }}>
      Academic Details
    </Typography>

    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <TextField
          
          id="college"
          label="College"
          name="student.college"
          value={formik.values.student.college}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          variant="outlined"
          sx={{ backgroundColor: theme.palette.background.paper }}
          InputLabelProps={{
            style: { color: theme.palette.text.primary }, // Change label color
          }}
          error={formik.touched.student?.college && Boolean(formik.errors.student?.college)}
          helperText={formik.touched.student?.college && formik.errors.student?.college}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          
          id="degree"
          label="Degree"
          name="student.degree"
          value={formik.values.student.degree}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          variant="outlined"
          sx={{ backgroundColor: theme.palette.background.paper }}
          InputLabelProps={{
            style: { color: theme.palette.text.primary }, // Change label color
          }}
          error={formik.touched.student?.degree && Boolean(formik.errors.student?.degree)}
          helperText={formik.touched.student?.degree && formik.errors.student?.degree}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          
          id="branch"
          label="Branch"
          name="student.branch"
          value={formik.values.student.branch}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          variant="outlined"
          sx={{ backgroundColor: theme.palette.background.paper }}
          InputLabelProps={{
            style: { color: theme.palette.text.primary }, // Change label color
          }}
          error={formik.touched.student?.branch && Boolean(formik.errors.student?.branch)}
          helperText={formik.touched.student?.branch && formik.errors.student?.branch}
        />
      </Grid>

      <Grid item xs={12} md={4}>
  <InputLabel htmlFor="semester"   sx={{ color: theme.palette.text.primary }}>
    Semester
  </InputLabel>
  <Select
    id="semester"
    name="student.semester"
    value={formik.values.student.semester}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    fullWidth
    sx={{ backgroundColor: theme.palette.background.paper }}
    
    error={formik.touched.student?.semester && Boolean(formik.errors.student?.semester)}
  >
    {["1", "2", "3", "4", "5", "6", "7", "8", "Passed Out"].map((sem) => (
      <MenuItem key={sem} value={sem}>
        {sem}
      </MenuItem>
    ))}
  </Select>
  {formik.touched.student?.semester && formik.errors.student?.semester && (
    <Typography color="error" variant="caption">
      {formik.errors.student.semester}
    </Typography>
  )}
</Grid>


      <Grid item xs={12} md={4}>
        <TextField
          
          id="passingYear"
          label="Passing Year"
          name="student.passingYear"
          value={formik.values.student.passingYear}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          variant="outlined"
          sx={{ backgroundColor: theme.palette.background.paper }}
          InputLabelProps={{
            style: { color: theme.palette.text.primary }, // Change label color
          }}
          error={formik.touched.student?.passingYear && Boolean(formik.errors.student?.passingYear)}
          helperText={formik.touched.student?.passingYear && formik.errors.student?.passingYear}
        />
      </Grid>
    </Grid>
  </Box>
</Grid>



        {/* Section 3: Query Details */}
        <Grid item xs={12}>
          <Box
            sx={{
              border: "1px solid #E5E5E5",
              borderRadius: 2,
              padding: 3,
              boxShadow: 2,
              backgroundColor: theme.palette.background.default,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", }}>
              Query Details
            </Typography>

            <Grid container spacing={2}>

              <Grid item xs={12} md={4}>
                <TextField
                  
                  id="description"
                  label="Query Description"
                  name="queryDescription"
                  value={formik.values.queryDescription}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  variant="outlined"
                  sx={{ backgroundColor: theme.palette.background.paper }}
                  InputLabelProps={{
                    style: { color: theme.palette.text.primary }, // Change label color
                  }}
                  error={formik.touched.queryDescription && Boolean(formik.errors.queryDescription)}
                  helperText={formik.touched.queryDescription && formik.errors.queryDescription}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  
                  id="response"
                  label="Query Response"
                  name="response"
                  value={formik.values.response}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  variant="outlined"
                  sx={{ backgroundColor: theme.palette.background.paper }}
                  InputLabelProps={{
                    style: { color: theme.palette.text.primary }, // Change label color
                  }}
                  error={formik.touched.queryDescription && Boolean(formik.errors.queryDescription)}
                  helperText={formik.touched.queryDescription && formik.errors.queryDescription}
                />
              </Grid>

              

              <Grid item xs={12} md={4}>
                <TextField
                  
                  id="queryDate"
                  label="Query Date"
                  type="date"
                  name="queryDate"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.queryDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  variant="outlined"
                  sx={{ backgroundColor: theme.palette.background.paper }}
                  InputLabelProps={{
                    style: { color: theme.palette.text.primary }, // Change label color
                  }}
                  error={formik.touched.queryDate && Boolean(formik.errors.queryDate)}
                  helperText={formik.touched.queryDate && formik.errors.queryDate}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputLabel htmlFor="priority" sx={{ color: theme.palette.text.primary }}>
                  Priority
                </InputLabel>
                <Select
                  id="priority"
                  name="priority"
                  value={formik.values.priority}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  sx={{ backgroundColor: theme.palette.background.paper }}
                  error={formik.touched.priority && Boolean(formik.errors.priority)}
                >
                  <MenuItem value={"LOW"}>Low</MenuItem>
                  <MenuItem value={"MEDIUM"}>Medium</MenuItem>
                  <MenuItem value={"HIGH"}>High</MenuItem>
                </Select>
                {formik.touched.priority && formik.errors.priority && (
                  <Typography color="error" variant="caption">
                    {formik.errors.priority}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} md={4}>
                <InputLabel htmlFor="status" sx={{ color: theme.palette.text.primary }}>
                  Status
                </InputLabel>
                <Select
                  id="status"
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  sx={{ backgroundColor: theme.palette.background.paper }}
                  error={formik.touched.status && Boolean(formik.errors.status)}
                >
                  <MenuItem value={"OPEN"}>OPEN</MenuItem>
                  <MenuItem value={"INPROGRESS"}>INPROGRESS</MenuItem>
                  <MenuItem value={"ARCHIVED"}>ARCHIVED</MenuItem>
                  <MenuItem value={"CLOSED"}>CLOSED</MenuItem>
                </Select>
                {formik.touched.status && formik.errors.status && (
                  <Typography color="error" variant="caption">
                    {formik.errors.status}
                  </Typography>
                )}
              </Grid>
               {/* Section 3: Query Details */}
               <Grid item xs={12} md={4}>
        <TextField
          
          id="visitPurpose"
          label="Visit Purpose"
          name="visitPurpose"
          value={formik.values.visitPurpose}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          variant="outlined"
          sx={{ backgroundColor: theme.palette.background.paper }}
          InputLabelProps={{
            style: { color: theme.palette.text.primary }, // Change label color
          }}
          error={formik.touched.visitPurpose && Boolean(formik.errors.visitPurpose)}
          helperText={formik.touched.visitPurpose && formik.errors.visitPurpose}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <InputLabel htmlFor="referralSource"  sx={{ color: theme.palette.text.primary }} >
          Referral Source
        </InputLabel>
        <Select
          id="referralSource"
          name="referralSource"
          value={formik.values.referralSource}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          sx={{ backgroundColor: theme.palette.background.paper }}
          error={formik.touched.referralSource && Boolean(formik.errors.referralSource)}
        >
          <MenuItem value="Google">Google</MenuItem>
          <MenuItem value="Justdial">Justdial</MenuItem>
          <MenuItem value="Hoardings & Banner">Hoardings & Banner</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
        </Select>
        {formik.touched.referralSource && formik.errors.referralSource && (
          <Typography color="error" variant="caption">
            {formik.errors.referralSource}
          </Typography>
        )}
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          
          id="remark"
          label="Remark"
          name="remark"
          value={formik.values.remark}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          variant="outlined"
          sx={{ backgroundColor: theme.palette.background.paper }}
          InputLabelProps={{
            style: { color: theme.palette.text.primary }, // Change label color
          }}
          error={formik.touched.remark && Boolean(formik.errors.remark)}
          helperText={formik.touched.remark && formik.errors.remark}
        />
      </Grid>



            </Grid>
          </Box>
        </Grid>

        {/* Submit and Reset Buttons */}
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              mt: 2,
            }}
          >
            <Button
              type="button"
              variant="outlined"
              onClick={() => formik.resetForm()}
              sx={{ borderColor: "#FCA311", color: "#FCA311" }}
            >
              Reset
            </Button>
             {/* Back Button */}
             <Button
              variant="outlined"
              color="primary"
              onClick={handleBack}
              className={ {marginTop: theme.spacing(2),
                alignSelf: "flex-end"}}
            >
              Back
            </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#FCA311",
                  color: "#FFFFFF",}}
                onClick={()=>{formik.submitForm()}}
              >
                {queryData ? "Update Query" : "Submit Query"}
              </Button>
          </Box>
        </Grid>
      </Grid>
  
          </Form>
        )}
      </Formik>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleDialogCancel}>
        <DialogTitle sx={{fontWeight: "bold",}}>Confirm Submission</DialogTitle>
        <DialogContent>
          Are you sure you want to {queryData ? "update" : "submit"} the query? This action cannot be undone.
        </DialogContent>
        <DialogActions sx={{display: "flex",
      justifyContent: "space-between",}}>
          <Button onClick={handleDialogCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogConfirm} color="success">
            {queryData ? "Update" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
       
      {/* Snackbar for Feedback */}
      <CustomSnackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        severity={snackbarMessage.includes("Error") ? "error" : "success"}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default QueryForm;
