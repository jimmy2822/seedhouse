import React from "react";
import {
  useState,
  useEffect
} from 'react';
import {
  generatePath,
  useParams
} from 'react-router';
import Navbar from '../components/layouts/navbar.jsx';
import Pagination from '../components/layouts/pagination.jsx';
import PropertyList from '../components/properties/property_list.jsx';

const Properties = () => {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  let params = useParams();


  useEffect(() => {
    fetchProperties(currentPage);
  }, [currentPage]);

  const fetchProperties = (page) => {
    const url = generatePath('api/v1/properties?') + new URLSearchParams({page: page});

    fetch(url)
      .then(res => res.json())
      .then((data) => {
        setData(data);
        setTotalPages(data.data.pagination.total_pages);
        console.log('Fetch current page: ', currentPage)
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <main className='container mx-auto px-5 md:px-60'>
      <Navbar />
      <PropertyList data={data} />
      <Pagination
        totalPage={totalPages}
        currentPage={currentPage}
        onChangeCurrentPage={page => setCurrentPage(page)}
      />
    </main>
   )
};

export default Properties;
