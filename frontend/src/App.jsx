import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Service from './pages/Service';
import Contact from './pages/Contact';

import DashboardLogin from './pages/DashboardLogin';
import DashboardLanding from './pages/DashboardLanding';
import DashboardBlogs from './pages/DashboardBlogs';
import DashboardProjects from './pages/DashboardProjects';
import DashboardTeam from './pages/DashboardTeam';
import DashboardServices from './pages/DashboardServices';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />

        {/* Dashboard Routes */}
        <Route
          path="/dashboard/login"
          element={<DashboardLogin setToken={setToken} />}
        />
        {/* Dashboard Landing Page (private) */}
        <Route
          path="/dashboard"
          element={
            token ? (
              <DashboardLanding />
            ) : (
              <Navigate to="/dashboard/login" replace />
            )
          }
        />
        {/* Other Dashboard Private Routes */}
        <Route
          path="/dashboard/blogs"
          element={
            token ? (
              <DashboardBlogs token={token} />
            ) : (
              <Navigate to="/dashboard/login" replace />
            )
          }
        />
        <Route
          path="/dashboard/projects"
          element={
            token ? (
              <DashboardProjects token={token} />
            ) : (
              <Navigate to="/dashboard/login" replace />
            )
          }
        />
        <Route
          path="/dashboard/team"
          element={
            token ? (
              <DashboardTeam token={token} />
            ) : (
              <Navigate to="/dashboard/login" replace />
            )
          }
        />
        <Route
          path="/dashboard/services"
          element={
            token ? (
              <DashboardServices token={token} />
            ) : (
              <Navigate to="/dashboard/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;