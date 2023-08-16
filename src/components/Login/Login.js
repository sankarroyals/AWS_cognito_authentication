import React, { useContext, useState } from 'react'
import UserPool from '../../UserPool';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { AccountContext } from '../ContextApi/Account';
import { Box, Button, Container, CssBaseline, FormControlLabel, Grid, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const Login = () => {
  const defaultTheme = createTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {authenticate} = useContext(AccountContext)
    const onSubmit = (e) => {
      e.preventDefault();
      console.log(email, password);
      authenticate(email, password).then((data)=>{
        console.log('logged in', data)
      }).catch((err)=>{
        console.error(err)
      })
     
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
            Log In
          </Typography>
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    );
}

export default Login