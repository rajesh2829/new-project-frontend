import React, { useState } from "react";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import PageTitle from "../../components/PageTitle";
import AddModal from "../../components/Modal";
import DateSelector from "../../components/Date";
import UserSelect from "../../components/UserSelect";
import { useDispatch } from "react-redux";
import { fetchList } from "../../actions/table";
import { endpoints } from "../../api/endPoints";
import TimeSheetService from "../../services/TimeSheetService";
import StatusText from "../../components/StatusText";
import DateTime from "../../lib/DateTime";
import { Link } from "react-router-dom";
import UserCard from "../../components/UserCard";
import SaveButton from "../../components/SaveButton";

const TimeSheetListPage = (props) => {
  let { history } = props;
  const [isSubmit, setIsSubmit] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [logedInUser, setLogedInUser] = useState();
  const [user, setUser] = useState(null);
  const [DateChange, setonDateChange] = useState();

  let dispatch = useDispatch();

  const toggle = () => {
    setIsOpen(!isOpen);
    setIsSubmit(true);
    setUser("");
    setonDateChange("");
  };

  const handleUserChange = (e) => {
    let value = e.id;
    setUser(value);
  };

  const onDateChange = (e) => {
    setonDateChange(e ? e : "");
  };

  const modelBody = (
    <>
      <DateSelector label="Date" name="date" onChange={onDateChange} />
      <UserSelect
        name="user_id"
        label="User"
        showLoggedInUser
        setLogedInUser={setLogedInUser}
        handleUserChange={handleUserChange}
        selectedUserId={user}
      />
    </>
  );

  const modelFooter = (
    <SaveButton loading={isSubmit == false} type="submit" label="Add" />
  );

  let initialValues = {
    user: user ? user : logedInUser ? logedInUser : "",
    date: DateChange
      ? DateChange
      : DateTime.getTodayDateByUserTimeZone(new Date()) || "",
  };

  const handdleOnSubmit = async (values) => {
    try {
      let data = new FormData();
      data.append(
        "user_id",
        values && values?.user?.id
          ? values?.user?.id
          : values?.user
            ? values?.user
            : ""
      );
      data.append("date", values && values?.date ? values?.date : "");
      dispatch(
        await TimeSheetService.create(data, (res) => {
          if (res) {
            dispatch(
              fetchList(
                "timeSheet",
                `${endpoints().TimeSheetAPI}/search`,
                1,
                25,
                {
                  sort: "createdAt",
                  sortDir: "DESC",
                }
              )
            );
            toggle();
          }
        })
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmit(false);
    }
  };

  const sortByOption = [
    {
      label: "Most Recent",
      value: "id:DESC",
    },
  ];

  return (
    <>
      <AddModal
        toggle={toggle}
        toggleModalClose={toggle}
        isOpen={isOpen}
        modalTitle="Add"
        modalBody={modelBody}
        modalFooter={modelFooter}
        hideDefaultButtons
        onSubmit={handdleOnSubmit}
        initialValues={initialValues}
        enableReinitialize
      />
      <PageTitle
        label="Timesheet"
        buttonHandler={() => {
          toggle();
        }}
        className="mb-2"
        buttonLabel="Add"
      />
      <ReduxTable
        id="timeSheet"
        showHeader
        newTableHeading
        apiURL={`${endpoints().TimeSheetAPI}/search`}
        sortByOptions={sortByOption}
        searchPlaceholder="Search"
        paramsToUrl={true}
        history={history}
        params={{}}
      >
        <ReduxColumn
          field="timesheet_number"
          width="120px"
          minWidth="120px"
          className="text-center"
          maxWidth="220px"
          type="link"
          sortBy="timesheet_number"
          isClickable="true"
          renderField={(row) => (
            <Link to={`/timesheet/${row.timesheet_number}`}>
              {row.timesheet_number}
            </Link>
          )}
        >
          Timesheet#
        </ReduxColumn>
        <ReduxColumn
          field="date"
          sortBy="date"
          className="text-center"
          renderField={(row) => (
            <>{DateTime.getDateByUserProfileTimeZoneFrontEndFormat(row.date)}</>
          )}
        >
          Date
        </ReduxColumn>
        <ReduxColumn
          field="user_name"
          sortBy="user_name"
          className="text-center"
          renderField={(row) => (
            <UserCard
              customSize={parseInt(50, 10)}
              firstName={row.user_name}
              url={row.media_url}
            />
          )}
        >
          User
        </ReduxColumn>
        <ReduxColumn field="total_hours" className="text-center">
          Total Hours
        </ReduxColumn>
        <ReduxColumn
          field="createdAt"
          sortBy="createdAt"
          className="text-center"
          renderField={(row) => (
            <> {DateTime.getDateTimeByUserProfileTimezone(row.createdAt)}</>
          )}
        >
          CreatedAt
        </ReduxColumn>
        <ReduxColumn
          field="status"
          sortBy="status"
          className="column-status"
          renderField={(row) => (
            <StatusText
              backgroundColor={row?.color_code}
              status={row?.status}
            />
          )}
        >
          Status
        </ReduxColumn>
      </ReduxTable>
    </>
  );
};

export default TimeSheetListPage;
