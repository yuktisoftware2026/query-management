import React from "react";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const StudentInformation = ({ formik }) => {
  const theme = useTheme();

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3} sx={{ padding: 3, background: theme.palette.background.default }}>
        {/* Section 1: Student Information */}
        <Grid item xs={12}>
          <Box
            sx={{
              border: "1px solid ",
              borderColor: "#E5E5E5",
              borderRadius: 2,
              padding: 3,
              boxShadow: 2,
              backgroundColor: theme.palette.background.default,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.text.secondary }}>
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
                  error={formik.touched.student?.mobile && Boolean(formik.errors.student?.mobile)}
                  helperText={formik.touched.student?.mobile && formik.errors.student?.mobile}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  id="emailId"
                  label="Email ID"
                  name="student.emailId"
                  value={formik.values.student.emailId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  variant="outlined"
                  sx={{ backgroundColor: theme.palette.background.paper }}
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
    <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.text.secondary }}>
      Academic Details
    </Typography>

    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <TextField
          required
          id="college"
          label="College"
          name="student.college"
          value={formik.values.student.college}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          variant="outlined"
          sx={{ backgroundColor: theme.palette.background.paper }}
          error={formik.touched.student?.college && Boolean(formik.errors.student?.college)}
          helperText={formik.touched.student?.college && formik.errors.student?.college}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          required
          id="degree"
          label="Degree"
          name="student.degree"
          value={formik.values.student.degree}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          variant="outlined"
          sx={{ backgroundColor: theme.palette.background.paper }}
          error={formik.touched.student?.degree && Boolean(formik.errors.student?.degree)}
          helperText={formik.touched.student?.degree && formik.errors.student?.degree}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          required
          id="branch"
          label="Branch"
          name="student.branch"
          value={formik.values.student.branch}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          variant="outlined"
          sx={{ backgroundColor: theme.palette.background.paper }}
          error={formik.touched.student?.branch && Boolean(formik.errors.student?.branch)}
          helperText={formik.touched.student?.branch && formik.errors.student?.branch}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <InputLabel htmlFor="semester" sx={{ color: theme.palette.text.secondary }}>
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
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <MenuItem key={sem} value={sem}>
              {sem}
            </MenuItem>
          ))}
          <MenuItem value="Passed Out">Passed Out</MenuItem>
        </Select>
        {formik.touched.student?.semester && formik.errors.student?.semester && (
          <Typography color="error" variant="caption">
            {formik.errors.student.semester}
          </Typography>
        )}
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          required
          id="passingYear"
          label="Passing Year"
          name="student.passingYear"
          value={formik.values.student.passingYear}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          variant="outlined"
          sx={{ backgroundColor: theme.palette.background.paper }}
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
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.text.secondary }}>
              Query Details
            </Typography>

            <Grid container spacing={2}>

              <Grid item xs={12} md={4}>
                <TextField
                  required
                  id="description"
                  label="Query Description"
                  name="queryDescription"
                  value={formik.values.queryDescription}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  variant="outlined"
                  sx={{ backgroundColor: theme.palette.background.paper }}
                  error={formik.touched.queryDescription && Boolean(formik.errors.queryDescription)}
                  helperText={formik.touched.queryDescription && formik.errors.queryDescription}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  required
                  id="response"
                  label="Query Response"
                  name="response"
                  value={formik.values.response}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  variant="outlined"
                  sx={{ backgroundColor: theme.palette.background.paper }}
                  error={formik.touched.queryDescription && Boolean(formik.errors.queryDescription)}
                  helperText={formik.touched.queryDescription && formik.errors.queryDescription}
                />
              </Grid>

              

              <Grid item xs={12} md={4}>
                <TextField
                  required
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
                <InputLabel htmlFor="status" sx={{ color: theme.palette.text.secondary }}>
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
          required
          id="visitPurpose"
          label="Visit Purpose"
          name="visitPurpose"
          value={formik.values.visitPurpose}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          variant="outlined"
          sx={{ backgroundColor: theme.palette.background.paper }}
          error={formik.touched.visitPurpose && Boolean(formik.errors.visitPurpose)}
          helperText={formik.touched.visitPurpose && formik.errors.visitPurpose}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <InputLabel htmlFor="referralSource" sx={{ color: theme.palette.text.primary }}>
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
          required
          id="remark"
          label="Remark"
          name="remark"
          value={formik.values.remark}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          variant="outlined"
          sx={{ backgroundColor: theme.palette.background.paper }}
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
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default StudentInformation;
