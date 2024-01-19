import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import Text from "../../components/Text";
import DeleteButton from "../../components/DeleteButton";
import PageTitle from "../../components/PageTitle";
import { connect } from "react-redux";
import { fetchList } from "../../actions/table";

// Components
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";

//Config
import { endpoints } from "../../api/endPoints";

// Action
import AddModal from "../../components/Modal";
import DeleteModal from "../../components/DeleteModal";
import { sprint } from "../../helpers/Sprint";
import DateSelector from "../../components/Date";
import DateTime from "../../lib/DateTime";
import Link from "../../components/Link";
import ObjectName from "../../helpers/ObjectName";

// Services
import SprintService from "../../services/SprintService";
import StatusService from "../../services/StatusService";
import Url from "../../lib/Url";
import { bindActionCreators } from "redux";

const Sprint = (props) => {
  const { history, activeTab, match, CurrentPage,
    CurrentPageSize, } = props;
  const TAB_DETAIL = "Detail";

  const [isOpen, setIsOpen] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [activeTabs, setActiveTab] = useState(TAB_DETAIL);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [sprintStatus, setSprintStatus] = useState();
  const [sprintName, setSprintName] = useState();
  const selectedId = match && match.params && match.params.id;

  const sortByOption = [
    {
      value: "name:ASC",
      label: "Name",
    },
    {
      value: "id:DESC",
      label: "Most Recent",
    },
  ];

  // Toggling the tabs and modals in respective tab
  const handleTabs = (tab) => {
    setActiveTab(tab);
  };

  const dispatch = useDispatch();

  const toggle = () => {
    setIsOpen(!isOpen);
    setCurrentData("");
    setSprintName("");
    setEndDate("")
  };

  const getStatus = async () => {
    const status = await StatusService.search(
      ObjectName.SPRINT,
      sprint.STATUS_ACTIVE_TEXT,
    );
    for (let i = 0; i < status.length; i++) {
      setSprintStatus(status[i]?.value);
    }
  }

  /**
 * Create Creation
 *
 * @param data
 */
  const sprintCreate = async (data) => {
    data.name = data?.name;
    data.start_time = data?.start_time;
    data.end_time = data?.end_time;

    const params = {}
    params.CurrentPage = CurrentPage
    params.CurrentPageSize = CurrentPageSize

    dispatch(await SprintService.create(data, params, {
      sort: Url.GetParam("sort") || "",
      sortDir: Url.GetParam("sortDir") || "",

    }));
    toggle();
  };

  const startDateChange = (e) => {
    setStartDate(e);
  };

  const endDateChange = (e) => {
    setEndDate(e);
  };

  const handleOnChange = (e) => {
    let value = e.target.value;
    setSprintName(value);
  };

  useEffect(() => {
    getStatus();
  }, []);
  
  /**
   * Update Creation
   *
   * @param data
   */

  const sprintDelete = (id) => {
    dispatch(SprintService.delete(id, {}));
  };

  const addSprintForm = (
    <>
      <Text
        name="name"
        label="Sprint Name"
        placeholder="Enter Sprint Name..."
        error=""
        fontBolded
        onChange={handleOnChange}
        required={true}
      />
      <div className="d-flex justify-content-between">
        <div className="mr-2">
          <DateSelector
            label="Start Date"
            name="start_date"
            format="dd-MMM-yyyy"
            required
            onChange={startDateChange}
          />
        </div>
        <DateSelector
          label="End Date"
          name="end_date"
          format="dd-MMM-yyyy"
          required
          onChange={endDateChange}
        />
      </div>
    </>
  );

  const sprintFooter = (
    <div className="container-fluid">
      <div className="col-sm-12 text-center">
        {currentData && (
          <DeleteButton
            className="pl-3"
            label={"Delete"}
            onClick={() => {
              setDeleteModal(true);
              setIsOpen(false);
            }}
          />
        )}
        <Button type="submit" label="" className="ml-4 h6-5-important">
          {currentData ? "Update" : "Add"}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <DeleteModal
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Sprint"
        id={currentData.id}
        label={currentData.name}
        deleteFunction={sprintDelete}
      />
      <AddModal
        isOpen={isOpen}
        toggle={toggle}
        toggleModalClose={toggle}
        modalTitle={"Add New Sprint"}
        modalBody={addSprintForm}
        modalFooter={sprintFooter}
        initialValues={{
          name: sprintName,
          start_date: startDate ? startDate : new Date(),
          end_date: endDate ? endDate : "",
        }}
        onSubmit={(values) => {
          {
            sprintCreate(values);
          }
        }}
        hideDefaultButtons
      />

      <PageTitle
        label="Sprints"
        buttonHandler={(e) => {
          toggle();
        }}
        buttonLabel="Add New"
        className={"pt-3"}
      />
      <div className="mt-4">
        <ReduxTable
          id="sprint"
          showHeader
          searchPlaceholder="Search"
          apiURL={`${endpoints().sprintAPI}/search`}
          newTableHeading
          history={props.history}
          paramsToUrl={true}
          sortByOptions={sortByOption}
        >
          <ReduxColumn
            type="link"
            isClickable="true"
            field="name"
            sortBy="name"
            width="140px"
            minWidth="140px"
            maxWidth="140px"
            renderField={(row) => (
              <Link text={row.name} url={`/Sprint/${row.id}`} />
            )}
          >
            Name
          </ReduxColumn>
          <ReduxColumn
            isClickable="true"
            field="start_time"
            sortBy="start_date"
            width="110px"
            minWidth="110px"
            maxWidth="110px"
            renderField={(row) => (
              <span>{DateTime.getDate(row.start_date)}</span>
            )}
          >
            Start Time
          </ReduxColumn>
          <ReduxColumn
            isClickable="true"
            field="end_time"
            sortBy="end_date"
            width="110px"
            minWidth="110px"
            maxWidth="110px"
            renderField={(row) => (
              <span>{DateTime.getDate(row.end_date)}</span>
            )}
          >
            End Time
          </ReduxColumn>
          <ReduxColumn
            field="status"
            sortBy="status"
            width="120px"
            minWidth="120px"
            maxWidth="120px"
            renderField={(row) => (
              <div
                className={`status-input text-center rounded text-white fw-600 custom-font-size text-uppercase my-3 mx-auto ${row.status && row.status === sprint.STATUS_ACTIVE_TEXT
                  ? "bg-success"
                  : row.status === sprint.STATUS_INACTIVE_TEXT
                    ? "bg-secondary"
                    : ""
                  }`}
              >
                <p>{row.status}</p>
              </div>
            )}
          >
            Status
          </ReduxColumn>
        </ReduxTable>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  const reduxTable = state.table;
  const CurrentPage =
    reduxTable["sprint"] && !reduxTable["sprint"].isFetching ? reduxTable["sprint"].currentPage : 1;

  const CurrentPageSize =
    reduxTable["sprint"] && !reduxTable["sprint"].isFetching ? reduxTable["sprint"].pageSize : 25;


  return {
    CurrentPage,
    CurrentPageSize
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sprint);
