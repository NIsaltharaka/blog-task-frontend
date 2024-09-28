import React, { useState } from 'react';
import axios from 'axios';
import {
    TextField,
    Button,
    Box,
    Typography,
    Snackbar,
    Alert
} from '@mui/material';
import { dotWave } from 'ldrs';

dotWave.register();


const AddBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleSubmit = async () => {
        const data = new FormData();
        data.append('title', title);
        data.append('contents', content);
        data.append('author', author);
        if (image) data.append('image', image);

        setLoading(true);

        try {
            await axios.post('http://127.0.0.1:8000/api/add-blog', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },

            });

            setTitle('');
            setContent('');
            setAuthor('');
            setImage(null);
            setUploadProgress(0);
            setSnackbarMessage('Blog added successfully!');
            setSnackbarSeverity('success');
        } catch (error) {
            console.error('Error saving data:', error.response || error.message);
            setSnackbarMessage('Error saving blog. Please try again.');
            setSnackbarSeverity('error');
        } finally {
            setLoading(false);
            setSnackbarOpen(true);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box>
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
                <Typography variant="h5">
                    Add New Blog
                </Typography>

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

                <Box sx={{ display: 'flex', marginBottom: '20px', marginTop: '20px' }}>
                    <TextField
                        label="Blog Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        variant="outlined"
                        fullWidth
                        size="small"
                        sx={{ marginRight: '10px' }}
                    />
                    <TextField
                        label="Author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        variant="outlined"
                        fullWidth
                        size="small"
                        sx={{ marginLeft: '10px' }}
                    />
                </Box>

                <Box sx={{ marginBottom: '20px' }}>
                    <TextField
                        label="Blog Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                    />
                </Box>

                <Box sx={{ marginBottom: '20px' }}>
                    <input
                        accept="image/*"
                        type="file"
                        onChange={handleImageChange}
                        style={{ marginTop: '20px' }}
                    />
                </Box>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        style={{
                            backgroundColor: 'black',
                            color: 'white',
                            marginTop: '30px',
                            borderRadius: '20px',
                            padding: '8px 24px',
                            '&:hover': {
                                backgroundColor: 'black',
                            },
                            marginBottom: { xs: '8px', sm: '0' }
                        }}
                    >
                        Add Blog
                    </Button>
                </div>
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                action={
                    <Button color="inherit" onClick={handleSnackbarClose}>
                        Close
                    </Button>
                }
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddBlog;
