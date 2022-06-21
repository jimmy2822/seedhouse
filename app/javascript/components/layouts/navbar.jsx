import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="flex bg-blue-300 py-3">
      <ul className='flex flex-col md:flex-row text-center md:justify-around w-full'>
        <Link to='/properties'>Property</Link>
        <Link to='/favorites'>Favorite</Link>
        <a href="/users/sign_in">Sign In</a>
      </ul>
    </div>
  )
};

export default Navbar;
