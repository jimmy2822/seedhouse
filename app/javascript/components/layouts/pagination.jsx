import React from 'react';

const Pagination = (props) => {
  if (props.data != null ) {
    const total_pages = props.data.data.pagination.total_pages;
    const current_page = props.data.data.pagination.current_page;
  }
};

export default Pagination;
