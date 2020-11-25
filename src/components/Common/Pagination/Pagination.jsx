import React from "react";
import Pagination from 'react-js-pagination';

const PaginationComponent = ({page, pageSize, totalFilms, handlePageClick}) => {
    return (
        <Pagination
            activePage={page}
            itemsCountPerPage={pageSize}
            totalItemsCount={totalFilms}
            hideNavigation={true}
            onChange={handlePageClick}
        />
    )
}

export default PaginationComponent