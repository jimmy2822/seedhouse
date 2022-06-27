import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layouts/navbar.jsx';

const Users = () => {
  return (
    <main className='container mx-auto px-5 md:px-60'>
      <Navbar />
      <Outlet />
    </main>
  )
};

export default Users;
