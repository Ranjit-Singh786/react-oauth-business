import React,{ useEffect, useState } from 'react';
// import ReactStars from 'react-stars';
import "./Home.css";
// import { useNavigate } from 'react-router-dom';
import ReviewListing from './ReviewListing';
import Logout from './Logout';
function Home() {
  const [accounts, setAccounts] = useState([]);
  const bearerToken = localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAccounts(data.accounts);
        // setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
        // setLoading(false)
      }
    };
  
    fetchData();
  }, [bearerToken]); // Empty dependency array ensures useEffect runs only once

  
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <div>
            <Logout />
          </div>
        </div>
        <div className="container">
          <ReviewListing accounts={accounts} />
        </div>
      </div>
    );
}

export default Home;