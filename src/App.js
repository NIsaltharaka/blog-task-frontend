import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home'; 
import Login from './Components/Auth/Login'; 
import Register from './Components/Auth/Register'; 
import Dashboard from './Components/Dashboard/Dashboard'; 
import Addblogs from './Components/Dashboard/AddBlogs'; 
import Allblogs from './Components/Dashboard/AllBlogs'; 
import DrawerWrapper from './Components/Dashboard/DrawerWrapper'; 
import BlogDetail from './Components/Home/BlogDetail'; 
import Forgot from './Components/Auth/Forgot';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/blog-detail" element={<BlogDetail />} />
          {/* Wrap Addblogs and Allblogs with DrawerWrapper */}
          <Route path="/dashboard" element={<DrawerWrapper><Dashboard /></DrawerWrapper>} />
          <Route path="/addblogs" element={<DrawerWrapper><Addblogs /></DrawerWrapper>} />
          <Route path="/allblogs" element={<DrawerWrapper><Allblogs /></DrawerWrapper>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
