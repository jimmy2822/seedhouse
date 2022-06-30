import React from 'react';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
 
const FavoriteButton = (props) => {
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);
  const queryClient = useQueryClient();
  const accessToken = queryClient.getQueryData('accessToken');

  const createFavorite = async () => {
    return await fetch('api/v1/favorites', {
      method: 'POST',
      headers: {
        'Authorization': accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'property_id': props.propertyId})
    }).then(data => data.json())
      .then(data => data.data.favorite_property_ids);
  };

  const deleteFavorite = async () => {
    return await fetch('api/v1/favorites', {
      method: 'DELETE',
      headers: {
        'Authorization': accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'property_id': props.propertyId})
    }).then(data => data.json())
      .then(data => data.data.favorite_property_ids);
  };

  const handleAddFavorite = useMutation(createFavorite, {
    onSuccess: (data) => {
      queryClient.setQueryData('favoriteIds', data);
      setIsFavorite(true);
    }
  });

  const handleRemoveFavorite = useMutation(deleteFavorite,{
    onSuccess: (data) => {
      queryClient.setQueryData('favoriteIds', data);
      setIsFavorite(false);
    }
  });

  if (accessToken === undefined) return (
      <Link className="bg-cyan-500 hover:bg-cyan-700 text-white absolute right-2 top-2
                       font-bold py-2 px-4 border border-cyan-700 rounded"
            to='/users/sign_in'>
      Add To Favorite
      </Link>
  )

  if (isFavorite) {
    return (
      <div>
        <button className="bg-yellow-500 hover:bg-yellow-700 text-white absolute right-2 top-2
                       font-bold py-2 px-4 border border-cyan-700 rounded"
        onClick={handleRemoveFavorite.mutate}>
        Remove Favorite
        </button>
      </div>
    )
  } else {
    return (
      <div>
        <button className="bg-cyan-500 hover:bg-cyan-700 text-white absolute right-2 top-2
                       font-bold py-2 px-4 border border-cyan-700 rounded"
        onClick={handleAddFavorite.mutate}>
        Add To Favorite
        </button>
      </div>
    )
  }
};

export default FavoriteButton;
