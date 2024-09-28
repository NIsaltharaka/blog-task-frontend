import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Alert, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { dotWave } from 'ldrs';

dotWave.register();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '300px',
          p: 4,
          boxShadow: 3,
          bgcolor: '#fff',
          borderRadius: '8px',
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          type="email"
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          margin="normal"
          type="password"
          size="small"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Box display="flex" justifyContent="center" mt={2}>
          <Typography variant="body2">
            <Link
              href="#"
              onClick={() => navigate('/forgot-password')}
              underline="none"
              color="primary"
            >
              Forgot Password?
            </Link>
          </Typography>
        </Box>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Login
        </Button>

        {loading && (
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 1000,
          }}>
            <l-dot-wave
              size="47"
              speed="1"
              color="red"
            ></l-dot-wave>
          </Box>
        )}

        <Box display="flex" justifyContent="center" mt={2}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link
              href="#"
              onClick={() => navigate('/register')}
              underline="none"
              color="primary"
            >
              Register here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
