import React from 'react';
import { useState } from 'react';
import FavoriteButton from '../favorites/favorite_button.jsx'

const PropertyItem = (props) => {
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);
  return (
    <div className="relative flex flex-col w-full md:w-1/2 md:m-0 m-2 p-2 border border-gray-200">
      <FavoriteButton isFavorite={isFavorite} propertyId={props.data.id}/>
      <img className="md:h-80 h-48" src={props.data.image} alt='image'>
      </img>
      <div className="text-xl h-30">{props.data.title}</div>
      <div className="flex text-lg h-30">
        <div className="text-red-600">
          NT$ {props.data.amount_in_cent / 100 * 30}
        </div>
        <span className="ml-2">/ month</span>
      </div>
      <div className="text-gray-500">
        {props.data.address_line}
      </div>
      <div className="mt-2 border-t-2"></div>
      {
        props.data.mrt_line ? <div>MRT: {props.data.mrt_line}</div> : ""
      }
    </div>
  )
};

export default PropertyItem;
