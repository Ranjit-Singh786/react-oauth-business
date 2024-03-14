import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from "@react-oauth/google";
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID_RANJIT || "";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId={CLIENT_ID}>
    <App/>
    </GoogleOAuthProvider>
  
);
reportWebVitals();
