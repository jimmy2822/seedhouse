import React from 'react';
import PropertyItem from './property_item.jsx'

const PropertyList = (props) => {
  if (props.data === null) return

  const listItems = props.data.data.items.map((item, index) => {
    return <PropertyItem key={index} data={item} />
  })

  return (
    <div className="flex flex-wrap">
      {listItems}
    </div>
  )
}

export default PropertyList;
