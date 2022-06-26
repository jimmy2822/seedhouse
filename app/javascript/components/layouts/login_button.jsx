import React from 'react';

const LoginButton = () => {
  return (
    displayButton()
  )
};

const displayButton = () => {
  const singInButton = <a href='/users/sign_in'>Sign In</a>
  const singOutButton = <a href='/users/sign_out'>Sign Out</a>

  return window.user_id === null ? singInButton : singOutButton
};

export default LoginButton;
