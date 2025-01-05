import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PostDetails from "./components/Postdetails";
import AuthorProfile from './components/AuthorProfile';
import Category from './components/Catagory';
import Archiveblogs from "./components/Archiveblogs";
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';

import Login from './pages/Login';
import Registration from './pages/Registration';

// Categories

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      {/* Navbar with Sidebar Toggle */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* Sidebar with Open/Close State */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content - Shifted when Sidebar is Open */}
      <div className={`p-24 ${sidebarOpen ? 'ml-64' : ''} transition-all duration-300`}>
        <Routes>
          {/* Home page */}
          <Route path="/" element={<Home />} />

          {/* Blog-related pages */}
          <Route path="/:archiveblogs" element={<Archiveblogs />} />

          {/* User-related pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />

          {/* Category pages */}
          <Route path="/category/:categoryName" element={<Category />} />
          {/* Author profile page */}
          <Route path="/:authorName" element={<AuthorProfile />} />

          {/* Blog post details by title */}
          <Route path="/post/:title" element={<PostDetails />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;

