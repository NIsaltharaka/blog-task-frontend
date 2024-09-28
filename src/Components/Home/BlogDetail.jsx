import React from 'react';
import { useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BlogDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { blog } = location.state || {};

  const handleClose = () => {
    navigate('/');
  };

  if (!blog) {
    return <Typography variant="h6">No blog data available.</Typography>;
  }

  return (
    <Box>
      <AppBar position="static" sx={{ bgcolor: 'black' }}>
        <Toolbar>
          <Typography variant="h6" component="Box" sx={{ flexGrow: 1 }}>
            {blog.title}
          </Typography>
          <Button color="inherit" onClick={handleClose}>Back</Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '95%',
          maxWidth: 'auto',
          margin: 'auto',
          boxShadow: 1,
          padding: '10px',
          borderRadius: '5px',
          bgcolor: 'background.paper',
          marginTop: '30px',
          position: 'relative'
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img
            src={`http://127.0.0.1:8000/storage/${blog.image}`}
            alt={blog.title}
            style={{ maxWidth: '50%', maxHeight: '50vh', objectFit: 'cover', marginBottom: '20px' }}
          />
        </Box>
        <Typography variant="h6" component="Box" color="text.secondary" gutterBottom>
          by {blog.author}
        </Typography>
        <Typography variant="body1" component="Box" paragraph>
          {blog.contents}
        </Typography>
      </Box>
    </Box>
  );
};

export default BlogDetail;
