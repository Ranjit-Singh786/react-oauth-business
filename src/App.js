import React, { useEffect } from 'react';
import router from './Router';
import { RouterProvider } from 'react-router-dom';
import './App.css';


  
function App() {
  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem('accessToken');
    const currentPath = window.location.pathname;
    // Check if the route is /login and the access token exists
    if (currentPath === '/login' && isAuthenticated) {
      window.location.href = '/'; // Redirect to home page
    }
  }, [])

  return (
    <>
    <div className="App">
			<RouterProvider router={router}/>
    </div>
		</>
  );
}

export default App;
