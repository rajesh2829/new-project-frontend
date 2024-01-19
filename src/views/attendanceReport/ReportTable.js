import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import DateTime from "../../lib/DateTime";
import UserCard from "../../components/UserCard";
import { Attendance } from "../../helpers/Attendance";
import { Link } from "react-router-dom";

function ReportTable(props) {
  const { detail, detailValue, setPage, page } = props;
  const currentPage = page;
  const totalCounts = detailValue.totalCount;
  const pageSizes = detailValue.pageSize;
  const startPage = (currentPage - 1) * detailValue.pageSize + 1;
  const firstPage = startPage > detailValue.totalCount ? detailValue.totalCount : startPage;
  const endPage = currentPage * detailValue.pageSize;
  const lastPage = endPage > detailValue.totalCount ? detailValue.totalCount : endPage;

  const [nameToggles, setNameToggles] = useState({});

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
          detail?.location?.length > 0 &&
          detail?.location.map((dataList) => (
            <div key={dataList.id}>
              <div
                className="border bg-light"
                style={{
                  padding: "10px",
                  cursor: "pointer"
                }}
                onClick={() => toggleName(dataList.id)}
              >
                {detail && detail?.attendance.some((list) => list?.location_id == dataList?.locationId) == true ? (
                  <h5 className="d-flex align-middle font-weight-bold text-primary pt-3 pb-0">
                    {" "}
                    {dataList.locationName}
                  </h5>
                ) :
                  <h5 className="d-flex align-middle font-weight-bold text-danger pt-3 pb-0">
                    {" "}
                    {dataList.locationName}
                  </h5>
                }
              </div>
              <div className="border border-bottom-0 border-top-0">
                <div className="row">
                  <div className="col-lg-12 col-sm-12">
                    {detail &&
                      detail?.attendance?.length > 0 &&
                      detail?.attendance.map((value, index) => {
                        const isMatched = value?.location_id == dataList?.locationId;

                        return isMatched ? (
                          <div className="row mx-1 mt-2" key={index}>
                            <Link to={`/attendance/${value.attendanceId}`}>
                              <UserCard
                                customSize={parseInt(40, 10)}
                                firstName={value?.name}
                                url={value?.media_url ? value?.media_url : value?.image}
                                lastName={value?.last_name}
                              />
                            </Link>
                            <div className="mt-1 pt-1">
                              {":"}{" "}
                              {DateTime.getUserTimeZoneTime(value?.loginTime)}
                              {value.logoutTime && (
                                <>
                                  <span className="mx-1">-</span>
                                  <span className="mx-1">
                                    {DateTime.getUserTimeZoneTime(value?.logoutTime)}
                                  </span>
                                </>
                              )}
                              {" ("}
                              {value.shiftName}
                              {")"}
                              {value.type === Attendance.TYPE_ADDITIONAL_DAY && (
                                <>
                                  <span className="mx-1">-</span>
                                  <span className="mx-1 text-danger">{value.type}</span>
                                </>
                              )}
                            </div>
                          </div>
                        ) : null;
                      })}
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
