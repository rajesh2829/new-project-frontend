import React from "react";
import Pagination from "../../../components/Pagination";
import UserCard from "../../../components/UserCard";
import DateTime from "../../../lib/DateTime";

function UserTable(props) {
  const { setPage, page, paginationValue, stockEntryList } = props;

  const currentPage = page;
  const totalCounts = paginationValue.totalCount;
  const pageSizes = paginationValue.pageSize;
  const startPage = (currentPage - 1) * paginationValue.pageSize + 1;
  const firstPage =
    startPage > paginationValue.totalCount
      ? paginationValue.totalCount
      : startPage;
  const endPage = currentPage * paginationValue.pageSize;
  const lastPage =
    endPage > paginationValue.totalCount ? paginationValue.totalCount : endPage;

  return (
    <div style={{ overflowX: "auto" }}>
      <div className="card" style={{ minHeight: "100vh" }}>
        {stockEntryList &&
          stockEntryList.length > 0 &&
          stockEntryList.map((dataList) => (
            <div key={dataList.id}>
              <div
                className="border bg-light"
                style={{
                  padding: "10px",
                  cursor: "pointer"
                }}>
                <h5 className="d-flex align-middle font-weight-bold text-primary pt-3 pb-0">
                  {" "}
                  <div className="col-5">
                    <UserCard
                      customSize={parseInt(40, 10)}
                      firstName={dataList.first_name}
                      url={dataList.media_url}
                      lastName={dataList.last_name}
                    />
                  </div>
                </h5>

              </div>
              <div className="border border-bottom-0 border-top-0">
                <div className="row">
                  <div className="col-lg-12 col-sm-12">
                    {dataList.data.map((value, index) => (
                      <div className="row mx-2 mt-2 mb-2" key={index}>
                        <div className="col-5">
                          {DateTime.getDateTimeByUserProfileTimezone(
                            value.date,
                            "DD-MMM-YYYY"
                          ) || ""}
                        </div>
                        <div className="col-5">
                          {value.locationName}
                        </div>
                        <div className="mt-1 ml-2 pt-1">{value.count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {totalCounts > 0 && (
        <div className="d-flex justify-content-between">
          <div>
            Showing {firstPage} to {lastPage} of {totalCounts} entries
          </div>
          <Pagination
            currentPage={page}
            totalCount={totalCounts}
            pageSize={pageSizes}
            onPageChange={(page) => {
              setPage(page);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default UserTable;
