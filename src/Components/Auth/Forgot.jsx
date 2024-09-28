import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Alert, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { dotWave } from 'ldrs';

dotWave.register();

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/forgot-password', {
        email,
      });

      navigate('/login'); 
    } catch (error) {
      setError(error.response?.data?.message || 'password reset failed. Please try again.');
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
          Password Reset
        </Typography>
        <Typography  gutterBottom align="center">
          You can reset your password here.enter your email address.we'll send the reset link to your email.
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
       

        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Reset Password
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
            Back To?{' '}
            <Link
              href="#"
              onClick={() => navigate('/login')}
              underline="none"
              color="primary"
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Forgot;
