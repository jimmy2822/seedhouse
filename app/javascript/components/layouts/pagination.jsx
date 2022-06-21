import React from 'react';
import {
  useState,
  useEffect
} from 'react';
import {
  useNavigate
} from 'react-router-dom';

const Pagination = (props) => {
  if (props.data === null) return;
  const navigate = useNavigate();
  const totalPages = props.data.data.pagination.total_pages;
  [currentPage, setCurrentPage] = useState(props.data.data.pagination.current_page);

  useEffect(() => {
    navigate(`/properties?page=${currentPage}`);
    console.log('EFFECT!!!!!!!!!!!!');
  }, [currentPage]);

  const prevPageHandler = () => {
    setCurrentPage(currentPage - 1);
  };

  const nextPageHandler = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex justify-around my-5">
      { currentPage === 1 ? null : <div onClick={prevPageHandler} >Prev</div> }
      <div>Current Page: {currentPage}</div>
      { currentPage < totalPages ? <div onClick={nextPageHandler}>Next</div> : null }
    </div>
  )
};

export default Pagination;
