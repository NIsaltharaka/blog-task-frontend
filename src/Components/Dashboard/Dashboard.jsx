import React, { useState, useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material';
import axios from 'axios';

const Dashboard = () => {
  const [blogCount, setBlogCount] = useState(0);

  useEffect(() => {
    const fetchBlogCount = async () => {
      try {
        const response = await axios.get('/blog-count'); 
        setBlogCount(response.data.count);
      } catch (error) {
        console.error('Error fetching blog count:', error);
      }
    };

    fetchBlogCount();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        WELCOME TO ADMIN PANEL
      </Typography>
    </Container>
  );
};

export default Dashboard;
