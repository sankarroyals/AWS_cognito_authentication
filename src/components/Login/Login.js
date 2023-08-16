import React, { useContext, useState } from 'react'
import { AccountContext } from '../ContextApi/Account';
import { Box, Button, Container, CssBaseline, FormControlLabel, Grid, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const defaultTheme = createTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {BaseApi, setStatus} = useContext(AccountContext)
    const navigate = useNavigate('')
    const [error, setError] = useState(false)
    const onSubmit = (e) => {
      e.preventDefault();
      if(email!=='' && password!==''){
        axios.get(`${BaseApi}/users`).then((res)=>{
          if(res.data.length>0){
            res.data.map((re)=>{
              if(re?.email == email && re.password==password){
                setStatus(true)
                localStorage.setItem('loginStatus', true)
                navigate('/')
              }
            })
          }
        })
      } else {
        setError(true)
      }
      // navigate('/')
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
              // autoComplete="email"
              autoFocus
              value={email}
              onChange={(e)=>{
                setEmail(e.target.value)
              }}
              error={error&&email===''}
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
              error={error&&password===''}

              // autoComplete="current-password"
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