import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = process.env.REACT_APP_SECRET_KEY;

// console.log("clientID",clientId)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
 <App />
    </GoogleOAuthProvider>;
   
  </React.StrictMode>
);


reportWebVitals();
