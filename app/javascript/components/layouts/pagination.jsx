import React from 'react';
import {
  useState,
  useEffect
} from 'react';

const Pagination = (props) => {
  if (props.currentPage === null || props.totalPages === null) return;

  const totalPages = props.totalPage;
  const [currentPage, setCurrentPage] = useState(props.currentPage);

  useEffect(() => {
    setCurrentPage(props.currentPage);
  });

  const prevPageHandler = () => {
    props.onChangeCurrentPage(currentPage - 1);
  };

  const nextPageHandler = () => {
    props.onChangeCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex justify-around text-center my-5 md:text-lg text-sm">
      { currentPage === 1 ? <div className="w-1/3 bg-gray-400 rounded-full">Prev</div> : <button className="w-1/3 bg-sky-300 hover:bg-sky-500 rounded-full" onClick={prevPageHandler} >Prev</button> }
      <div className="w-1/3">Page: {currentPage}</div>
      { currentPage < totalPages ? <button className="w-1/3  bg-sky-300 hover:bg-sky-500 rounded-full" onClick={nextPageHandler}>Next</button> : <div className="w-1/3 bg-gray-400 rounded-full">Next</div> }
    </div>
  )
};

export default Pagination;
