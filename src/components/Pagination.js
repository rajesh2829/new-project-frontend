import React from "react";
import ReactPagination from "react-js-pagination";

class Pagination extends React.Component {
  render() {
    const { currentPage, totalCount, pageSize, onPageChange } = this.props;

    return (
      <ReactPagination
        activePage={currentPage}
        firstPageText={
          <i id={"firstpage"} className="fa fa-angle-double-left" />
        }
        lastPageText={
          <i id={"lastpage"} className="fa fa-angle-double-right" />
        }
        prevPageText={<i id={"prevpage"} className="fa fa-angle-left" />}
        nextPageText={<i id={"nextpage"} className="fa fa-angle-right" />}
        totalItemsCount={totalCount}
        itemsCountPerPage={pageSize}
        innerClass="pagination justify-content-end"
        itemClass="page-item"
        linkClass="page-link"
        onChange={(page) => onPageChange(page)}
      />
    );
  }
}

export default Pagination;
