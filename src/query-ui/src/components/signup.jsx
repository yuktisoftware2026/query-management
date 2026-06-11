import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  TextField,
  Link,
  Typography,
  CssBaseline,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

const SignUp = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Sign up form submitted');
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#f0f4f8',
          padding: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '100%',
            maxWidth: 400,
          }}
        >
          <TextField
            label="Full Name"
            type="text"
            fullWidth
            required
            variant="outlined"
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            variant="outlined"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            variant="outlined"
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            required
            variant="outlined"
          />
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="I agree to the Terms and Conditions"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
          <Divider>or</Divider>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={() => alert('Sign up with Google')}
          >
            Sign up with Google
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<FacebookIcon />}
            onClick={() => alert('Sign up with Facebook')}
          >
            Sign up with Facebook
          </Button>
          <Typography align="center">
            Already have an account?{' '}
            <Link href="#" variant="body2">
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
