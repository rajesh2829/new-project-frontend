import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import "./styles.scss";
import DateTime from "../../lib/DateTime";
import UserCard from "../../components/UserCard";

function ReportTable(props) {
  const { detail, detailValue, setPage, page } = props;
  const currentPage = page;
  const totalCounts = detailValue.totalCount;
  const pageSizes = detailValue.pageSize;
  const startPage = (currentPage - 1) * detailValue.pageSize + 1;
  const firstPage =
    startPage > detailValue.totalCount ? detailValue.totalCount : startPage;
  const endPage = currentPage * detailValue.pageSize;
  const lastPage =
    endPage > detailValue.totalCount ? detailValue.totalCount : endPage;

  const [nameToggles, setNameToggles] = useState({}); // Use an object to store toggle states

  const toggleName = (dataListId) => {
    setNameToggles((prevToggles) => ({
      ...prevToggles,
      [dataListId]: !prevToggles[dataListId]
    }));
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <div className="card">
        {detail &&
          detail.length > 0 &&
          detail.map((dataList) => (
            <div key={dataList.id}>
              <div
                className="border bg-light"
                style={{
                  padding: "10px",
                  cursor: "pointer"
                }}
                onClick={() => toggleName(dataList.id)}
              >
                {dataList.data.length > 0 && (
                  <h5 className="d-flex align-middle font-weight-bold text-primary pt-3 pb-0">
                    {" "}
                    {dataList.storeName}
                  </h5>
                )}
                {dataList.data.length == 0 && (
                  <h5 className="d-flex align-middle font-weight-bold text-danger pt-3 pb-0">
                    {" "}
                    {dataList.storeName}
                  </h5>
                )}
              </div>
              <div className="border border-bottom-0 border-top-0">
                  <div className="row">
                    <div className="col-lg-12 col-sm-12">
                      {dataList.data.map((value, index) => (
                        <div className="row mx-2 mt-2" key={index}>
                          <UserCard
                            customSize={parseInt(40, 10)}
                            firstName={value.name}
                            url={value.image}
                            lastName={value.last_name}
                          />
                          <div className="mt-1 ml-2 pt-1">
                            {":"}{" "}
                            {DateTime.getUserTimeZoneTime(value.loginTime)} (
                            {value.shiftName})
                          </div>
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

export default ReportTable;
