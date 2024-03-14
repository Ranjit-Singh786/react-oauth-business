import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import Home from './components/Home';
  
function App() {
    useEffect(() => {
      const isAuthenticated = !!localStorage.getItem('accessToken');
      const currentPath = window.location.pathname;
      // Check if the route is /login and the access token exists
      if (currentPath === '/login' && isAuthenticated) {
        window.location.href = '/'; // Redirect to home page
      }
    }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('accessToken');

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default App;
