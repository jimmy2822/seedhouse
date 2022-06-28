import React from 'react';
import useEffect from 'react';
import Navbar from '../components/layouts/navbar.jsx';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import PropertyList from '../components/properties/property_list.jsx'

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
    );
  };

  const fetchFavorites = async () => {
    return await fetch('api/v1/favorites', {
      headers: {
        'authorization': accessToken
      }
    }).then(data => data.json());
  };

  useQuery(['favorites'], fetchFavorites);
  const data = queryClient.getQueryData('favorites');

  return (
    <main className='container mx-auto px-5 md:px-60'>
      <Navbar />
      <div className="my-5">
        <div className="text-center font-bold">My Favorites</div>
      </div>
     { data?.data?.items?.length === 0 ? <div className='text-center'>Grab some favorites...</div> : <PropertyList data={data}/> }
    </main>
  );
};

export default Favorites;
