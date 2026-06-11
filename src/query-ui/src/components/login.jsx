import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { Email, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: "linear-gradient(to right, #1d3557, #457b9d)",
  padding: "16px",
});

const StyledCard = styled(Box)({
  width: "100%",
  maxWidth: "900px",
  display: "flex",
  flexDirection: "column",
  borderRadius: "12px",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  overflow: "hidden",
  backgroundColor: "#FFFFFF",

  "@media (min-width: 768px)": {
    flexDirection: "row",
  },
});

const StyledLeftSection = styled(Box)({
  flex: 1,
  background: "linear-gradient(to bottom, #1d3557, #457b9d)",
  color: "#FFFFFF",
  padding: "40px 24px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
});

const StyledRightSection = styled(Box)({
  flex: 1,
  padding: "40px",
  backgroundColor: "#f1faff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
});

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const fixedEmail = "admin@example.com";
    const fixedPassword = "123";

    if (email === fixedEmail && password === fixedPassword) {
      setIsAuthenticated(true);
      navigate("/analytics");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <StyledContainer>
      <StyledCard>
        {/* Left Section */}
        <StyledLeftSection>
          <Box>
            <img
              src="https://placehold.co/120x120"
              alt="Admin Avatar"
              style={{ marginBottom: "16px", borderRadius: "50%" }}
            />
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Welcome Back!
            </Typography>
            <Typography variant="body1">
              Log in to access your dashboard and manage your projects effortlessly.
            </Typography>
          </Box>
        </StyledLeftSection>

        {/* Right Section */}
        <StyledRightSection>
          <Box>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              style={{ marginBottom: "16px" }}
            >
              Dream. Build. Achieve.
            </Typography>
            <Typography
              variant="body1"
              style={{
                fontStyle: "italic",
                lineHeight: "1.5",
                marginBottom: "40px",
              }}
            >
              Join us in redefining innovation and achieving unparalleled growth
              with cutting-edge solutions.
            </Typography>
          </Box>

          <form
            style={{ width: "100%", maxWidth: "400px" }}
            onSubmit={handleLogin}
          >
            {/* Email Field */}
            <Box marginBottom={3}>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="textPrimary"
                marginBottom={1}
              >
                Email Address
              </Typography>
              <Box display="flex" alignItems="center" position="relative">
                <Email
                  style={{
                    position: "absolute",
                    left: "10px",
                    color: "#757575",
                  }}
                />
                <TextField
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  variant="outlined"
                  style={{ paddingLeft: "40px" }}
                  required
                />
              </Box>
            </Box>

            {/* Password Field */}
            <Box marginBottom={3}>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="textPrimary"
                marginBottom={1}
              >
                Password
              </Typography>
              <Box display="flex" alignItems="center" position="relative">
                <Lock
                  style={{
                    position: "absolute",
                    left: "10px",
                    color: "#757575",
                  }}
                />
                <TextField
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  variant="outlined"
                  style={{ paddingLeft: "40px" }}
                  required
                />
              </Box>
            </Box>

            {/* Error Message */}
            {error && (
              <Typography
                variant="body2"
                color="error"
                style={{ marginBottom: "16px" }}
              >
                {error}
              </Typography>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              style={{
                backgroundColor: "#1d3557",
                color: "#FFFFFF",
                fontWeight: "bold",
                padding: "10px 0",
                transition: "all 0.3s",
              }}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "#457b9d")
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "#1d3557")
              }
            >
              Login
            </Button>
          </form>
        </StyledRightSection>
      </StyledCard>
    </StyledContainer>
  );
};

export default Login;
