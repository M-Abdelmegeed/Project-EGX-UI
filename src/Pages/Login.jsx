import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Image from "../Assets/PharaohStocks.jpg";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import { useUserAuth } from "../UserAuthContext";
import { useDispatch } from "react-redux";
import { setCredentials } from "../Redux/loginReducer";
import { styled } from "@mui/system";
import { GiEgyptianSphinx } from "react-icons/gi";

const defaultTheme = createTheme();

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
    color: "gold",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "gold",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "gold",
    },
    "& input": {
      color: "white",
    },
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
}));

export default function Login() {
  const { logIn } = useUserAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    try {
      const userCredential = await logIn(
        data.get("email"),
        data.get("password")
      );
      const user = userCredential.user;
      console.log("Response object uid" + user.uid);
      dispatch(
        setCredentials({
          email: user.email,
          name: user.displayName,
          uid: user.uid,
        })
      );
      navigate("/Chatbot");
      console.log("Login Successfull");
    } catch (err) {
      console.log("The following error has occurred: " + err);
    }
    // navigate("/home");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{ height: "100vh", overflow: "hidden" }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Image})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[900]
                : t.palette.grey[900],
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          sx={{ backgroundColor: "#212121" }}
          square
        >
          <Box
            sx={{
              backgroundColor: "#212121",
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "gold" }}>
              <GiEgyptianSphinx color="black" />
            </Avatar>
            <Typography sx={{ color: "white" }} component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <CustomTextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleEmailChange}
                error={error}
              />
              <CustomTextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "gold", color: "black" }}
              >
                Sign In
              </Button>
            </Box>
            {/* <a href="/signup">Don't have an account? Sign Up</a> */}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
