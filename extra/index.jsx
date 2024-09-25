import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');

    if (code) {
      // Here you can send the code to your backend to exchange for tokens
      const fetchToken = async () => {
        try {
          const response = await axios.post('https://your-token-endpoint', {
            code,
            redirect_uri: 'http://localhost:4000/login/',
            client_id: 'hbApp',
            grant_type: 'authorization_code'
          });
          console.log('Token response:', response.data);
          // Handle tokens (e.g., save to local storage, update user state)
        } catch (error) {
          console.error('Error exchanging code for token:', error);
        }
      };

      fetchToken();
    } else {
      console.error('No authorization code found in the URL.');
    }
  }, [location.search]);

  return (
    <div>
      <h1>Logging in...</h1>
    </div>
  );
};

export default Login;
