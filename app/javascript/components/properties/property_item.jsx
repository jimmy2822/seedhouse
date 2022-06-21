import React from 'react';

const PropertyItem = (props) => {
  return (
    <div className="flex flex-col w-full md:w-1/2 md:m-0 m-2 p-2 border border-gray-200">
      <img className="md:h-60 h-48" src={props.data.image} alt='image' />
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
