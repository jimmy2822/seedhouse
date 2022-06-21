import React from "react";
import {
  useState,
  useEffect
} from 'react';
import {
  generatePath,
  useParams
} from 'react-router';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/layouts/navbar.jsx';
import Pagination from '../components/layouts/pagination.jsx';
import PropertyList from '../components/properties/property_list.jsx';
import QueryForm from '../components/layouts/query_form.jsx';

const Properties = () => {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchProperties();
  }, [currentPage, searchParams]);

  const fetchProperties = () => {
    let queryParams = new URLSearchParams({
      page: currentPage,
      title: searchParams.get('title') || '',
      address_city: searchParams.get('city') || '',
    })
    const url = generatePath('api/v1/properties?') + queryParams;

    fetch(url)
      .then(res => res.json())
      .then((data) => {
        setData(data);
        setTotalPages(data.data.pagination.total_pages);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <main className='container mx-auto px-5 md:px-60'>
      <Navbar />
      <QueryForm onChangeSearchParams={params => setSearchParams(params)}/>
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
