import React from 'react';
import PropertyItem from './property_item.jsx'

const PropertyList = (props) => {
  if (props.data === null) return

  return (
    <div className="flex flex-wrap">
      {listItems(props)}
    </div>
  )
}

const listItems = (props) => {
 if (props.data != null) {
    return props.data.data.items.map((item, index) => {
      return <PropertyItem key={index} data={item} />
    })
  } else {
    return <div>Not found.</div>
  }
}

export default PropertyList;
