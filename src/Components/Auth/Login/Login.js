// Hooks
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

// MUI Components
import { Stack, Paper, Typography } from "@mui/material";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Snackbar, Alert, AlertTitle } from "@mui/material";
import { CircularProgress } from "@mui/material";

// Custom Css
import "./Login.css";

// MUI Icons
import MailIcon from "@mui/icons-material/Mail";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PasswordIcon from "@mui/icons-material/Lock";
import ErrorIcon from "@mui/icons-material/ErrorOutline";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";

// verify email is correct or not
const checkEmail = (email) => {
  if (!email.includes("@")) return false;

  const domainIIITL = "iiitl.ac.in";
  let emailDomain = email.split("@");
  emailDomain = emailDomain[1];

  if (domainIIITL !== emailDomain) return false;
  return true;
};

const Login = () => {
  // Login Data States
  const [params, setParams] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  // Loading States
  const [LoginLoad, setLoginLoad] = useState(false);
  const [open, setOpen] = useState(false);

  // Error States
  const [validMail, setValidMail] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setpasswordErrorMsg] = useState("");
  const [defaultError, setDefaultError] = useState({ title: "", body: "" });

  // Handle params change
  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
    if (e.target.name === "email") {
      setValidMail(checkEmail(e.target.value));
    }
  };

  // show or hide password
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // check if mail is valid & password is not empty
  const preCheck = () => {
    return validMail && params.password.length;
  };

  const handleLogin = () => {
    if (preCheck()) {
    } else {
      setOpen(true);
      setDefaultError({
        title: "Fill All Fields",
        body: "Please fill all fields correctly and try again",
      });
    }
  };

  return (
    <Stack justifyContent="center" alignItems="center" className="Login-container">
      <Stack spacing={4} justifyContent="center" alignItems="center">
        <img src="/logo.png" height="100px" width="auto" alt="Placement Portal IIIT Lucknow" />
        <Paper className="Login-box">
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography textAlign="center" sx={{ fontFamily: "Staatliches" }} variant="h4">
                Welcome
              </Typography>
              <Typography textAlign="center" variant="caption" sx={{ fontFamily: "Nunito" }}>
                Enter your credentials to access Portal
              </Typography>
            </Stack>
            <Stack spacing={1}>
              <TextField
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        {emailError ? (
                          <ErrorIcon color="error" />
                        ) : validMail ? (
                          <DoneAllIcon color="success" />
                        ) : (
                          <DoneIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                name="email"
                value={params.email}
                onChange={handleChange}
                helperText={emailError ? emailErrorMsg : " "}
                error={emailError}
                autoComplete="email"
              />
              <TextField
                variant="outlined"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePassword}>
                        {passwordError ? (
                          <ErrorIcon />
                        ) : showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                name="password"
                value={params.password}
                onChange={handleChange}
                helperText={passwordError ? passwordErrorMsg : " "}
                error={passwordError}
                autoComplete="password"
              />
              <Button
                className="Login-btn"
                variant="contained"
                onClick={handleLogin}
                endIcon={LoginLoad ? <CircularProgress color="inherit" size={15} /> : null}
                disabled={LoginLoad}
              >
                Sign In
              </Button>
            </Stack>
            <Typography variant="caption" sx={{ fontFamily: "Nunito" }}>
              Forgot Your Password ?{" "}
              <Link to={params.email ? `/Recovery/${params.email}` : "/Recovery"}>
                <strong>Reset Password</strong>
              </Link>
            </Typography>
          </Stack>
        </Paper>
        <Typography variant="body2" sx={{ fontFamily: "Nunito" }}>
          <Link to="/Signup">
            <strong>Create Account Instead</strong>
          </Link>
        </Typography>
      </Stack>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={(e, reason) => {
          if (reason === "clickaway") return;
          setOpen(false);
        }}
      >
        <Alert onClose={() => setOpen(false)} severity="error">
          <AlertTitle>
            <strong>{defaultError.title}</strong>
          </AlertTitle>
          {defaultError.body}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Login;
