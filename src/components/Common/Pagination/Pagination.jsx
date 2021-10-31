import React from 'react';
import Pagination from 'react-js-pagination';

import './Pagination.scss';

const PaginationComponent = ({
  page,
  pageSize,
  totalFilms,
  handlePageClick,
}) => {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={pageSize}
      totalItemsCount={totalFilms}
      hideNavigation={true}
      onChange={handlePageClick}
    />
  );
};

export default PaginationComponent;
