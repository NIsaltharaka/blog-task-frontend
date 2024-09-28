// AllBlogs.js
import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  TablePagination,
  Input,
  Snackbar,
  Alert,
  Box
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { dotWave } from 'ldrs';

dotWave.register();
const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editedBlog, setEditedBlog] = useState({ title: '', contents: '', author: '', image: null });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [loading, setLoading] = useState(false);

  const [blogToDelete, setBlogToDelete] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/get-blog-data');
      setBlogs(response.data.blog);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setSnackbarMessage('Error fetching blogs. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (blog) => {
    setSelectedBlog(blog);
    setOpenViewDialog(true);
  };

  const handleEdit = (blog) => {
    setEditedBlog({ title: blog.title, contents: blog.contents, author: blog.author, image: null });
    setSelectedBlog(blog);
    setOpenEditDialog(true);
  };

  const handleDelete = (blog) => {
    setBlogToDelete(blog);
    setOpenConfirmDeleteDialog(true);
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://127.0.0.1:8000/api/delete-blog/${blogToDelete.id}`);
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id));
      setSnackbarMessage('Blog deleted successfully.');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error('Error deleting blog:', error);
      setSnackbarMessage('Error deleting blog. Please try again.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
      setOpenConfirmDeleteDialog(false);
      setLoading(false);
    }
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleCloseConfirmDeleteDialog = () => {
    setOpenConfirmDeleteDialog(false);
    setBlogToDelete(null);
  };

  const handleEditBlogChange = (e) => {
    setEditedBlog({ ...editedBlog, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setEditedBlog({ ...editedBlog, image: e.target.files[0] });
  };

  const handleSaveEdit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', editedBlog.title);
      formData.append('contents', editedBlog.contents);
      formData.append('author', editedBlog.author);
      if (editedBlog.image) {
        formData.append('image', editedBlog.image);
      }

      await axios.post(`http://127.0.0.1:8000/api/update-blog/${selectedBlog.id}`, formData);
      const updatedBlogs = blogs.map(blog =>
        blog.id === selectedBlog.id ? { ...blog, ...editedBlog, image: editedBlog.image ? URL.createObjectURL(editedBlog.image) : blog.image } : blog
      );
      setBlogs(updatedBlogs);
      setSnackbarMessage('Blog updated successfully.');
      setSnackbarSeverity('success');
      handleCloseEditDialog();
    } catch (error) {
      console.error('Error updating blog:', error);
      setSnackbarMessage('Error updating blog. Please try again.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
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
      <Box style={{ padding: '16px' }}>
        <Typography variant="h5" gutterBottom>
          All Blogs
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

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Author</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <img
                      src={`http://127.0.0.1:8000/storage/${blog.image}`}
                      alt={blog.title}
                      style={{ width: '100px', height: 'auto' }}

                    />
                  </TableCell>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>{blog.author}</TableCell>
                  <TableCell>
                    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <IconButton onClick={() => handleView(blog)} color="primary">
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(blog)} color="secondary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(blog)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="Box"
          count={blogs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <Dialog open={openViewDialog} onClose={handleCloseViewDialog}>
          <DialogTitle>View Blog</DialogTitle>
          <DialogContent>
            {selectedBlog && (
              <Box>
                <img
                  src={`http://127.0.0.1:8000/storage/${selectedBlog.image}`}
                  alt={selectedBlog.title}
                  style={{ width: '100%', height: 'auto' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400';
                  }}
                />
                <Typography variant="h6">{selectedBlog.title}</Typography>
                <Typography variant="body1">{selectedBlog.contents}</Typography>
                <Typography variant="caption">By {selectedBlog.author}</Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseViewDialog}>Close</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle>Edit Blog</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              name="title"
              value={editedBlog.title}
              onChange={handleEditBlogChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Author"
              name="author"
              value={editedBlog.author}
              onChange={handleEditBlogChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Contents"
              name="contents"
              value={editedBlog.contents}
              onChange={handleEditBlogChange}
              fullWidth
              margin="dense"
              multiline
              rows={4}
            />

            <input
              accept="image/*"
              type="file"
              onChange={handleImageChange}
              style={{ marginTop: '20px' }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog}>Cancel</Button>
            <Button onClick={handleSaveEdit} color="primary">Save</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openConfirmDeleteDialog} onClose={handleCloseConfirmDeleteDialog}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this blog?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmDeleteDialog}>Cancel</Button>
            <Button onClick={confirmDelete} color="error">Delete</Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default AllBlogs;
