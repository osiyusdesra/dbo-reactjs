import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    if (tokenString && tokenString !== 'undefined') {
        const userToken = JSON.parse(tokenString);
        return userToken
    }else{
        return
    }
  };

  const tokenValue = getToken();

  const [token, setToken] = useState(tokenValue);

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}