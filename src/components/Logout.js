import React from 'react';
import { googleLogout } from '@react-oauth/google';

function Logout() {
    const handleLogout = () => {
          localStorage.removeItem('accessToken');
          googleLogout();
        window.location.href = 'http://localhost:3000/login';
      }
    return (
        <div className='p-2'>
          <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout;
