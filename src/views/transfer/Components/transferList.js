import { faCubes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DropdownItem } from "reactstrap";
import { updateTransferStatus } from "../../../actions/transfer";
import { endpoints } from "../../../api/endPoints";
import StatusText from "../../../components/StatusText";
import MoreDropdown from "../../../components/authentication/moreDropdown";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import ObjectName from "../../../helpers/ObjectName";
import { PAGE } from "../../../helpers/Status";
import DateTime from "../../../lib/DateTime";
import Url from "../../../lib/Url";
import StatusService from "../../../services/StatusService";

const TransferPage = (props) => {

  const [page, setPage] = useState(Url.GetParam("page"));
  const [statusList, setStatusList] = useState([])

  const { id, history, setCurrentData, setOrder, setIsDeleteModel, onBulkSelect } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    getStatusList()
  }, [])

  //Sort By Option Values
  const sortByOption = [
    {
      value: "id:DESC",
      label: "Most Recent",
    },
  ];

  const getStatusList = async (currentStatusId, allowed_statuses) => {
    if (currentStatusId) {
      const data = await StatusService.nextStatusSearch(
        ObjectName.TRANSFER,
        currentStatusId,
        "",
        "",
        allowed_statuses
      );

      if (data && data.length > 0) {
        setStatusList(data);
      }
    }
  }

  return (
    <>
      <ReduxTable
        id="transfer"
        showHeader
        searchPlaceholder="Search"
        newTableHeading
        icon={<FontAwesomeIcon icon={faCubes} />}
        message="You can start by clicking on Add New"
        apiURL={`${endpoints().transferApi}/search`}
        params={{
          page: page ? page : PAGE,
          pageSize: Url.GetParam("pageSize"),
          objectName: ObjectName.TRANSFER
        }}
        sortByOptions={sortByOption}
        paramsToUrl={true}
        history={history}
        bulkSelect
        onBulkSelect={onBulkSelect}
        showTypeFilter
        showFromToLocationFilter
        showDateFilter
        showStatusFilter
        showUserFilter
        setPage={setPage}
      >
        <ReduxColumn
          field="transfer_number"
          sortBy="transfer_number"
          isClickable="true"
          width="110px"
          minWidth="110px"
          maxWidth="110px"
          type="link"
          className="text-center"
          renderField={(row) => (
            <Link
              to={`/transfer/${row.id}`}
            >
              {row.transfer_number}
            </Link>
          )}
        >
          Transfer#
        </ReduxColumn>
        <ReduxColumn
          field="date"
          sortBy="date"
          className="text-center"
          width="110px"
          minWidth="110px"
          maxWidth="110px"
          renderField={(row) => <span>{DateTime.getDate(row.date)}</span>}
        >
          Date
        </ReduxColumn>
        <ReduxColumn
          field="fromLocationName"
          sortBy="from_store_id"
          width="110px"
          minWidth="110px"
          maxWidth="110px"
        >
          From Location
        </ReduxColumn>
        <ReduxColumn
          field="toLocationName"
          sortBy="to_store_id"
          width="110px"
          minWidth="110px"
          maxWidth="110px"
        >
          To Location
        </ReduxColumn>
        <ReduxColumn
          field="product_count"
          sortBy="product_count"
          className="text-center"
          width="110px"
          minWidth="110px"
          maxWidth="110px"
        >
          Product Count
        </ReduxColumn>
        <ReduxColumn
          className="text-center"
          field="type"
          sortBy="type"
          width="110px"
          minWidth="110px"
          maxWidth="110px"
        >
          Type
        </ReduxColumn>
        <ReduxColumn
          className="text-break"
          field="owner"
          sortBy="owner"
          width="110px"
          minWidth="110px"
          maxWidth="110px"
        >
          Owner
        </ReduxColumn>
        <ReduxColumn
          field="status"
          // sortBy="productCount"
          width="110px"
          maxWidth="110px"
          minWidth="110px"
          renderField={(row) => (
            <StatusText backgroundColor={row?.statusColor} status={row?.status} />
          )}
        >
          Status
        </ReduxColumn>
        <ReduxColumn
          field="Action"
          className="text-center"
          width="110px"
          minWidth="110px"
          maxWidth="110px"
          disableOnClick
          renderField={(row) => (
            <div className="action-group-dropdown">
              <MoreDropdown
                onClick={() => {
                  setStatusList([]);
                  getStatusList(row.currentStatusId, row.allowed_statuses);
                }}
              >
                {statusList &&
                  statusList.length > 0 &&
                  statusList.map((data) => {
                    return (
                      <DropdownItem
                        onClick={() => {
                          dispatch(
                            updateTransferStatus(
                              row.id,
                              data.value,
                              {
                                search: Url.GetParam("search") || "",
                                page: Url.GetParam("page") || props.currentPage,
                                pageSize:
                                  Url.GetParam("pageSize") ||
                                  props.currentPageSize,
                              },
                              props.allCurrentPage,
                              props.allCurrentPageSize
                            )
                          );
                        }}>
                        {data.label}
                      </DropdownItem>
                    );
                  })}
                <DropdownItem
                  className=" text-danger  cursor-pointer"
                  onClick={() => {
                    setCurrentData(row);
                    setOrder(row?.transfer_number);
                    setIsDeleteModel(true);
                  }}
                >
                  Delete
                </DropdownItem>
              </MoreDropdown>
            </div>
          )}
        >
          Action
        </ReduxColumn>
      </ReduxTable>
    </>
  );
};

export default TransferPage;
