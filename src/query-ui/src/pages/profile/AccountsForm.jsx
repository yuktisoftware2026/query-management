import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Grid,
  Button,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {profileFormInitialValues} from './profileconstant'

// API Endpoint
const API_BASE_URL = "http://localhost:9999/queries";

// Validation Schema
const validationSchema = Yup.object({
  studentName: Yup.string().required("Student Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  enrolledDate: Yup.date().required("Enrolled Date is required"),
  courseName: Yup.string().required("Course Name is required"),
  validity: Yup.string().required("Course Validity is required"),
  totalAmount: Yup.number().required("Total Amount is required").min(0, "Must be positive"),
  paidAmount: Yup.number().required("Paid Amount is required").min(0, "Must be positive"),
  status: Yup.string().required("Student Status is required"),
});

const AccountsForm = ({ refreshGridData }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (values, { setSubmitting }) => {
    const balanceAmount = values.totalAmount - values.paidAmount;

    const requestData = {
      ...values,
      balanceAmount,
    };

    axios
      .post(API_BASE_URL, requestData)
      .then((response) => {
        console.log("Account Data:", response.data);
        if (refreshGridData) refreshGridData();
        setOpen(false);
      })
      .catch((error) => console.error("Error submitting data:", error))
      .finally(() => setSubmitting(false));
  };

  return (
    <>
      {/* + Button to Open Popup */}
      <IconButton color="primary" onClick={() => setOpen(true)}>
        <AddIcon fontSize="large" />
      </IconButton>

      {/* Pop-up Form */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Student Account Management</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={profileFormInitialValues.values}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form>
                <Grid container spacing={2}>
                  {/* Student Info */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Student Name"
                      name="studentName"
                      value={values.studentName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.studentName && Boolean(errors.studentName)}
                      helperText={touched.studentName && errors.studentName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.phone && Boolean(errors.phone)}
                      helperText={touched.phone && errors.phone}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Enrolled Date"
                      name="enrolledDate"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={values.enrolledDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.enrolledDate && Boolean(errors.enrolledDate)}
                      helperText={touched.enrolledDate && errors.enrolledDate}
                    />
                  </Grid>

                  {/* Course Details */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Course Name"
                      name="courseName"
                      value={values.courseName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.courseName && Boolean(errors.courseName)}
                      helperText={touched.courseName && errors.courseName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Course Validity"
                      name="validity"
                      value={values.validity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.validity && Boolean(errors.validity)}
                      helperText={touched.validity && errors.validity}
                    />
                  </Grid>

                  {/* Payment Info */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Total Amount"
                      name="totalAmount"
                      type="number"
                      value={values.totalAmount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.totalAmount && Boolean(errors.totalAmount)}
                      helperText={touched.totalAmount && errors.totalAmount}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Paid Amount"
                      name="paidAmount"
                      type="number"
                      value={values.paidAmount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.paidAmount && Boolean(errors.paidAmount)}
                      helperText={touched.paidAmount && errors.paidAmount}
                    />
                  </Grid>

                  {/* Status */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      select
                      label="Student Status"
                      name="status"
                      value={values.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.status && Boolean(errors.status)}
                      helperText={touched.status && errors.status}
                    >
                      <MenuItem value="Query Student">Query Student</MenuItem>
                      <MenuItem value="Demo Requested">Demo Requested</MenuItem>
                      <MenuItem value="Enrolled">Enrolled</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>

                <DialogActions sx={{ mt: 2 }}>
                  <Button onClick={() => setOpen(false)} color="secondary">
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AccountsForm;
