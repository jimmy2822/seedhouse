import React from 'react';
import useEffect from 'react';
import Navbar from '../components/layouts/navbar.jsx';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';

const Favorites = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const accessToken = queryClient.getQueryData('accessToken');

  if (accessToken === undefined) {
    return (
      <main className='container mx-auto px-5 md:px-60'>
        <Navbar />
        <div>Please sign in to get your favorites.</div>
      </main>
    )
  }

  return (
    <main className='container mx-auto px-5 md:px-60'>
      <Navbar />
      <div className="my-5">
        <div className="text-center font-bold">My Favorites</div>
      </div>
    </main>
  )
};

export default Favorites;
