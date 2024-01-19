import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { updateSync } from "../../actions/schedulerJob";

// Components
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import AddSchedulerModal from "./addModal";
import Button from "../../components/Button";
import PageTitle from "../../components/PageTitle";
import toast from "../../components/Toast";
import { Status } from "../../helpers/SchedulerJob";
import DateTime from "../../lib/DateTime";
import { fetchList } from "../../actions/table";
import SchedulerJobService from "../../services/SchedulerJobService";
import { Link } from "react-router-dom";
//Config
import { endpoints } from "../../api/endPoints";

//AP Client
import { apiClient } from "../../apiClient";
import Url from "../../lib/Url";
import { bindActionCreators } from "redux";
import MoreDropdown from "../../components/authentication/moreDropdown";
import { DropdownItem } from "reactstrap";
import DeleteModal from "../../components/DeleteModal";

const SchedulerJob = (props) => {
  const [schedulerModalOpen, setIsSchedulerModalOpen] = useState(false);

  const [selectedSchedulerJob, setSelectedSchedulerJob] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [row, setRow] = useState("");
  const [isDeleteModel, setIsDeleteModel] = useState(false)
  const sortByOption = [
    {
      value: "1",
      label: "Active",
    },
    {
      value: "2",
      label: "InActive",
    },
  ];

  const toggle = () => {
    setIsSchedulerModalOpen(!schedulerModalOpen);
  };

  //dispatch
  const dispatch = useDispatch();

  const handleJobRun = async (row, Id) => {
    try {
      let response = await apiClient.post(`${row.api_url}/manualRun?id=${Id}`);
      if (response && response.data) {
        toast.success(response.data.message);
        dispatch(
          fetchList(
            "schedulerJob",
            `${endpoints().schedulerJobAPI}/list`,
            Url.GetParam("page") ? Url.GetParam("page") : 1,
            25,
            {
              sort: Url.GetParam("sort"),
              sortDir: Url.GetParam("sortDir"),
              status: Url.GetParam("status"),
              search: Url.GetParam("search"),
            }
          )
        );
      }
    } catch (err) { }
  };

  const getIntervalTime = (value) => {
    if (value) {
      let interval = DateTime.getSchedulerTime().find(
        (data) => data.value == value
      );

      return interval ? interval.label : "";
    }
  };
  const actionsMenuList = [
    {
      value: "Force Stop",
      label: "Force Stop",
    },
  ];
  const actionMenuChange = async (selectedValue) => {
    if (selectedIds && selectedIds.length > 0) {
      let bodydata = { ScheduleJobIds: selectedIds, forceStop: true };
      dispatch(await SchedulerJobService.bulkUpdate(bodydata))
    }
  }
  const handleBulkSelect = async (selectedIds) => {
    setSelectedIds(selectedIds);
  };

  const handleBulkDelete = async () => {
    dispatch(
      await SchedulerJobService.bulkDeleteSchedulerJob(selectedIds, ""),
      setSelectedIds({ selectedIds: [] })
    );
  };
  const deleteSchedulerJob = async (id) => {
    try {
      dispatch(await SchedulerJobService.deleteJob(id));
    } catch (err) {

    }
  };
  return (
    <>
      {/* Add Scheduler Modal */}
      <AddSchedulerModal
        toggle={toggle}
        isOpen={schedulerModalOpen}
        onModalClose={toggle}
        hideDefaultButtons
        row={row}
      />
      <DeleteModal
        isOpen={isDeleteModel}
        toggle={() => {
          setIsDeleteModel(false);
        }}
        title="Delete Scheduler Job"
        id={row?.id}
        label={row?.name}
        deleteFunction={() => deleteSchedulerJob(row?.id)}
      />
      {/* /.page-heading */}
      <div className="mb-1">
        <PageTitle
          label="Scheduler Jobs"
          buttonHandler={() => {
            setRow("");
            toggle();

          }}
          buttonLabel="Add New"
          dropdownLinks={actionsMenuList}
          handleChange={actionMenuChange}
          DeleteButtonLabel="Delete"
          deletebuttonHandler={handleBulkDelete}
          loading={
            selectedIds &&
              selectedIds &&
              selectedIds.length > 0
              ? false
              : true
          }
        />
      </div>

      {/* Redux table*/}
      <ReduxTable
        id="schedulerJob"
        showHeader
        searchPlaceholder="Search"
        paramsToUrl={true}
        history={props.history}
        apiURL={`${endpoints().schedulerJobAPI}/list`}
        newTableHeading
        params={{ status: Url.GetParam("status") }}
        selectedStatus={String(Status.ACTIVE)}
        showStatusOptions={true}
        sortByDropdown
        bulkSelect
        onBulkSelect={handleBulkSelect}
        statusOptions={sortByOption}>
     
        <ReduxColumn
          field="name"
          sortBy="name"
          width="110px"
          minWidth="110px"
          maxWidth="110px"
          renderField={(row) => (
            <div onClick={() => setSelectedSchedulerJob(row)}>
              <Link to={`/schedulerJobs/detail/${row.id}`}>{row.name}</Link>
              {
                <span className="text-danger">
                  {row.status === Status.INACTIVE && "  (InActive)"}
                </span>
              }
            </div>
          )}
       >
          Name
        </ReduxColumn>
        <ReduxColumn
          className="text-center"
          field="recurring_type"
          width="110px"
          minWidth="110px"
          maxWidth="110px"
          renderField={(row) => (
            <span>{row.type}</span>
          )}>
          Recurring Type
        </ReduxColumn>
        <ReduxColumn
          className="text-center"
          field="date"
          width="110px"
          minWidth="110px"
          maxWidth="110px"
          renderField={(row) => (
            <span>{row.date}</span>
          )}>
          Recurring Date
        </ReduxColumn>
        <ReduxColumn
          className="text-center"
          field="last_executed_at"
          sortBy="last_executed_at"
          width="110px"
          minWidth="110px"
          maxWidth="110px"
          renderField={(row) => (
            <span>{DateTime.getUserTimeZoneTime(row.startTime)}</span>
          )}>
          Start Time
        </ReduxColumn>
        <ReduxColumn
          className="text-center"
          field="end_time"
          sortBy="end_time"
          width="110px"
          minWidth="110px"
          maxWidth="110px"
          renderField={(row) => (
            <span>{DateTime.getUserTimeZoneTime(row.endTime)}</span>
          )}>
          End Time
        </ReduxColumn>
        <ReduxColumn
          className="text-center"
          field="execution_started_at"
          sortBy="execution_started_at"
          width="110px"
          minWidth="110px"
          maxWidth="110px"
          renderField={(row) => <span>{getIntervalTime(row.interval)}</span>}>
          Interval
        </ReduxColumn>
        <ReduxColumn
          field="started_at"
          sortBy="started_at"
          width="110px"
          minWidth="110px"
          maxWidth="110px"
          renderField={(row) => (
            <span>{DateTime.getDateTimeByUserProfileTimezone(row.started_at)}</span>
          )}>
          Started At
        </ReduxColumn>
        <ReduxColumn
          field="completed_at"
          sortBy="completed_at"
          width="110px"
          minWidth="110px"
          maxWidth="110px"
          renderField={(row) => (
            <span>{DateTime.getDateTimeByUserProfileTimezone(row.completed_at)}</span>
          )}>
          Completed At
        </ReduxColumn>
        <ReduxColumn
          width="110px"
          minWidth="110px"
          maxWidth="110px"
          renderField={(row) => (
            <><div className=" d-flex justify-content-center landing-group-dropdown">
              <Button
                id={row.id}
                label={"Run"}
                loadingLabel="Running..."
                width="100px"
                disabled={row && !row.started_at ? false : row.started_at && row.completed_at ? false : true}
                className="text-center"
                icon
                onClick={() => {
                  handleJobRun(row, row.id);
                }} />




            </div></>
          )}>
          Action
        </ReduxColumn>
        <ReduxColumn
          width="110px"
          minWidth="110px"
          maxWidth="110px"
          renderField={(row) => (
            <><div className="d-flex justify-content-center align-items-center row">
              <div className="text-dark landing-group-dropdown">
                <MoreDropdown>
                  <DropdownItem
                    onClick={() => {
                      setRow(row);
                      toggle();
                    }}
                  >
                    Quick View
                  </DropdownItem>
                  <DropdownItem
                    className=" text-danger  cursor-pointer"
                    onClick={() => {
                      setIsDeleteModel(true);
                      setRow(row);
                    }}
                  >
                    Delete
                  </DropdownItem>
                </MoreDropdown>
              </div>
            </div></>
          )}>
        </ReduxColumn>
      </ReduxTable>
    </>
  );
};

function mapStateToProps(state) {
  const reduxTable = state.table;

  const CurrentPage =
    reduxTable["schedulerJob"] && !reduxTable["schedulerJob"].isFetching
      ? reduxTable["schedulerJob"].currentPage
      : 1;

  const CurrentPageSize =
    reduxTable["schedulerJob"] && !reduxTable["schedulerJob"].isFetching
      ? reduxTable["schedulerJob"].pageSize
      : 25;

  return {
    CurrentPage,
    CurrentPageSize,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SchedulerJob);
