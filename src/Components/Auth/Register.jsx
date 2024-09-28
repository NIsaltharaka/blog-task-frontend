import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Alert, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { dotWave } from 'ldrs';

dotWave.register();
const Register = () => {
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== cpassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/register', {
        name,
        email,
        password,
      });

      setSuccess('Registration successful');
      setError('');
      navigate('/login');
      setLoading(false);
    } catch (error) {
      setError('Registration failed');
      setSuccess('');
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
          Register
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Full Name"
          variant="outlined"
          margin="normal"
          size="small"
          value={name}
          onChange={(e) => setname(e.target.value)}
          required
        />

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
        <TextField
          fullWidth
          label="Confirm Password"
          variant="outlined"
          margin="normal"
          type="password"
          size="small"
          value={cpassword}
          onChange={(e) => setCpassword(e.target.value)}
          required
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Register
        </Button>

        <Box display="flex" justifyContent="center" mt={2}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Link
              href="#"
              onClick={() => navigate('/login')}
              underline="none"
              color="primary"
            >
              Login here
            </Link>
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <Typography variant="body2">
            Back to{' '}
            <Link
              href="#"
              onClick={() => navigate('/')}
              underline="none"
              color="primary"
            >
              Home
            </Link>
          </Typography>
        </Box>
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
      </Box>
    </Box>
  );
};

export default Register;
