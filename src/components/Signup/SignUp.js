import React, { useState, useContext } from "react";
import { Box, Button, Container, CssBaseline, FormControlLabel, Grid, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { AccountContext } from "../ContextApi/Account";
import axios from "axios";

const SignUp = () => {
  // Api variable
  const {BaseApi} = useContext(AccountContext)

  // Used for navigating pages
  const navigate = useNavigate();

  const defaultTheme = createTheme();

  // Variable to store
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");

  // decides error messages
  const [error, setError] = useState(false)

  // calling backend api
  const onSubmit = async (e) => {
    e.preventDefault();
    if(email!=='' && password!=='' && name !=='' && number!==''){
        axios.post(`${BaseApi}/signup`, {'name': name, 'email': email, 'password': password, 'mobile': number}).then((res)=>{
            console.log(res)
            navigate('/login')
        }).catch((err)=>{
            document.getElementsByClassName('error')[0].textContent = 'Internal server error Occured'
            setTimeout(()=>{
              document.getElementsByClassName('error')[0].textContent = ''
            }, 3000)
          })
    }
    else{
      setError(true)
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Typography className='error' style={{color: 'red'}}></Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="off"
            autoFocus
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            error = {error && email===''}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="off"
            value={name}
            onChange={(e)=>{
              setname(e.target.value)
            }}
            error = {error && name===''}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="number"
            label="Number"
            name="number"
            autoComplete= 'off'
            value={number}
            onChange={(e)=>{
              setNumber(e.target.value)
            }}
            error = {error && number===''}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            
            autoComplete= 'off'
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            error = {error && password===''}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/login" variant="body2">
                {"Do you already have an account? Login In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
  );
};

export default SignUp;
