import React from "react";
import { useState, useEffect } from 'react';
import {
  generatePath,
  useParams
} from 'react-router';
import Navbar from '../components/layouts/navbar.jsx';
import Pagination from '../components/layouts/pagination.jsx';
import PropertyList from '../components/properties/property_list.jsx';

const Properties = () => {
  let { page } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchProperties(page);
  }, []);

  const fetchProperties = (page=1) => {
    const url = generatePath('api/v1/properties?') + new URLSearchParams({page: page});

    fetch(url)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <main className='container mx-auto px-5 md:px-60'>
      <Navbar />
      <PropertyList data={data} />
      <Pagination data={data}/>
    </main>
   )
};

export default Properties;
