import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Typography, IconButton, Grid, Button, Box } from '@mui/material';
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Img from '../Home/bg1.jpg';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/get-blog-data');
      setBlogs(response.data.blog);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handlePersonClick = () => {
    navigate('/login');
  };

  const handleSeeMoreClick = (blog) => {
    navigate('/blog-detail', { state: { blog } });
  };

  return (
    <div>
      <AppBar position="static" sx={{ bgcolor: 'black' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Blog Task
          </Typography>
          <IconButton edge="end" color="inherit" onClick={handlePersonClick}>
            <Person />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          position: 'relative',
          height: { xs: '60vh', md: '80vh' }, // Responsive height
          backgroundImage: `url(${Img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        />
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            color: 'white',
            px: 2,
          }}
        >
          <Typography variant="h3" component="div" gutterBottom>
            Welcome to Our Blog
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            "Discover, Learn, and Engage with Every Post"
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          mt: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            fontSize: '2rem',
            color: 'text.primary',
          }}
        >
          ALL BLOGS
        </Typography>
      </Box>

      <Grid
        container
        spacing={2}
        sx={{
          marginTop: 2,
          mb: 2,
          maxWidth: '100%',
          mx: 'auto',
          px: { xs: 2, md: 3 },
        }}
      >
        {blogs.map((blog) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={blog.id}
          >
            <Box
              sx={{
                boxShadow: 3,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                },
                width: '100%',
                mx: 'auto',
              }}
            >
              <img
                src={`http://127.0.0.1:8000/storage/${blog.image}`}
                alt={blog.title}
                width="100%"
                height="auto"
                style={{ objectFit: 'cover' }}
                onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
              />
              <Box p={2}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  {blog.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    textAlign: 'center',
                    fontSize: { xs: '0.9rem', md: '1rem' }
                  }}
                >
                  {blog.author}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleSeeMoreClick(blog)}
                  sx={{
                    marginTop: 1,
                    width: 'auto',
                    fontSize: { xs: '0.65rem', md: '0.75rem' },
                    padding: '4px 8px',
                    borderColor: 'black',
                    color: 'black',
                    transition: 'background-color 0.3s ease, color 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'black',
                      color: 'white',
                      borderColor: 'black',
                    },
                  }}
                >
                  Read
                </Button>


              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
