import { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios for HTTP requests

const NaverLogin = () => {
  const [apiUrl, setApiUrl] = useState('');
  const [code] = useState('');
  const [state] = useState('12345'); // Random string
  const client_id = 'SOuP1wryN6wmT06434A7'; // Your Client ID
  const redirectURI = encodeURI('http://localhost:5173');
  
  
  const handleNaverLogin = () => {
      const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirectURI}&state=${state}`;
      setApiUrl(url);
    };
    
    const handleCallback = () => {
        axios.get(`/callback?code=${code}&state=${state}`)
        .then(response => {
            console.log(response.data);
            // Handle response data as needed
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    useEffect(() => {
      // Handle callback when the component mounts or when the callback URL is triggered
      handleCallback();
    }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      <button onClick={handleNaverLogin}>
        <img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG' alt='Naver Login'/>
      </button>
      {apiUrl && (
        <div>
          <a href={apiUrl}>Naver Login</a>
        </div>
      )}
    </div>
  );
};

export default NaverLogin;