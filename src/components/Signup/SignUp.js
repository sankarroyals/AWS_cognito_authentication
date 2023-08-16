import React, { useState, useContext } from "react";
import { Box, Button, Container, CssBaseline, FormControlLabel, Grid, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { AccountContext } from "../ContextApi/Account";
import axios from "axios";

const SignUp = () => {
  
  const defaultTheme = createTheme();
  const [email, setEmail] = useState("");
  
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {BaseApi} = useContext(AccountContext)

  const [error, setError] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if(email!=='' && password!=='' && name !==''){

      let existingUser = 0
      await axios.get(`${BaseApi}/users`).then((res)=>{
        if(res.data.length>0){
          res.data.map((re)=>{
            if(re?.email === email || re.name===name){
              existingUser+=1
            }
          })
        }
      })
     //  checking user already present in the db
     if(existingUser===0){
      axios.post(`${BaseApi}/users`, {email: email, password: password, name: name}).then(()=>{
        document.getElementsByClassName('error')[0].textContent = ''
        navigate('/login')
      })
     } else {
      document.getElementsByClassName('error')[0].textContent = 'Email/Name already exists'
      setTimeout(()=>{
        document.getElementsByClassName('error')[0].textContent = ''

      }, 2000)
     }
    } else { 
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
            autoComplete="email"
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
            autoComplete="name"
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
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            autoComplete="current-password"
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
