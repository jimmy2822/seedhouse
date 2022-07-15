import { render } from '@testing-library/react';
import React from 'react';
import App from './app.jsx';


describe('Render sign in button or sign out button', () => {
  test('when user has not logged in it should display sign in button', () => {
    render(
      <App />
    );
    expect(screen.queryByText('Sign In')).toBeTruthy;
  })
});
