import React from 'react';
import { useState } from 'react';
import {
  useQuery,
  useQueryClient 
} from 'react-query';

import PropertyItem from './property_item.jsx'


const PropertyList = (props) => {
  const queryClient = useQueryClient();
  const accessToken = queryClient.getQueryData('accessToken');

  const fetchFavoriteIds = async () => {
    return await fetch('api/v1/favorites', {
      headers: {
        'authorization': accessToken
      }
    }).then(data => data.json())
      .then(data => data?.data?.items?.map(item => item.id))
  };

  if (accessToken != undefined) {
    useQuery(['favoriteIds'], fetchFavoriteIds)
  }

  if (props.data === null) return

  const listItems = (props) => {
    if (props.data != null) {
      const favoriteIds = queryClient.getQueryData('favoriteIds') || [];
      return props.data.data.items.map((item, index) => {
        if (accessToken) {
          const isFavorite = favoriteIds.find(id => id === item.id) ? true : false;
          return <PropertyItem key={index} data={item} isFavorite={isFavorite}/>;
        } else {
          return <PropertyItem key={index} data={item} isFavorite={false}/>;
        }
      });
    } else {
      return <div>Not found.</div>;
    }
  }

  return (
    <div className="flex flex-wrap">
      {listItems(props)}
    </div>
  );
}

export default PropertyList;
