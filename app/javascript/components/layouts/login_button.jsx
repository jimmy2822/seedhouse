import React from 'react';
import {
  Link,
  useNavigate
} from 'react-router-dom';
import { useQueryClient } from 'react-query';

const LoginButton = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const accessToken = queryClient.getQueryData('accessToken');

  const clearAccessToken = () => {
    queryClient.setQueryData('accessToken', undefined);
    navigate('/');
  };

  const signInButton = <Link to='/users/sign_in'>Sign In</Link>
  const signOutButton = <button onClick={clearAccessToken}>Sign Out</button>


  return (
    <div>
      { accessToken === undefined ? signInButton : signOutButton }
    </div>
  )
};

export default LoginButton;
