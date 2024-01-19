import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  DropdownItem
} from "reactstrap";
import PageTitle from "../../components/PageTitle";
import Text from "../../components/Text";

// Components
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";

//Config
import { endpoints } from "../../api/endPoints";

// Action
import * as API from "../../actions/Shift";
import { fetchList } from "../../actions/table";
import DeleteModal from "../../components/DeleteModal";
import Drawer from "../../components/Drawer";
import Link from "../../components/Link";
import SaveButton from "../../components/SaveButton";
import Select from "../../components/Select";
import TimeSelector from "../../components/TimeSelector";
import MoreDropdown from "../../components/authentication/moreDropdown";
import { shift } from "../../helpers/Shift";
import DateTime from "../../lib/DateTime";
import Url from "../../lib/Url";
import ShiftService from "../../services/ShiftService";
import ShiftDetails from "./ShiftDetail";

const Shift = (props) => {
  const { history, activeTab, match } = props;
  const TAB_DETAIL = "Detail";
  const [isOpen, setIsOpen] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [activeTabs, setActiveTab] = useState(TAB_DETAIL);
  const selectedId = match && match.params && match.params.id;
  const [row, setRowValue] = useState()
  const [isSubmit, setIsSubmit] = useState(true);

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
  };

  const shiftStatusOptions = [
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "InActive",
      label: "InActive",
    },
  ];

  /**
   * Create Creation
   *
   * @param data
   */
  const shiftCreate = (data) => {
    setIsSubmit(false)
    data.status = data?.status?.value

    dispatch(API.createShift(data, { sort: Url.GetParam("sort"), sortDir: Url.GetParam("sortDir") }));
    toggle();
    setIsSubmit(true)
  };

  /**
   * Update Creation
   *
   * @param data
   */
  const shiftUpdate = async (id, data) => {
    await ShiftService.update(id, data, (res) => {
      if (res) {
        dispatch(
          fetchList(
            "shift",
            `${endpoints().shiftAPI}/search`,
            1,
            25,
            {}
          )
        );
      }

    });

    toggle();
  };

  const shiftDelete = (id) => {
    ShiftService.delete(id)
  };

  const addShiftForm = (
    <>
      <Text
        name="name"
        label="Shift Name"
        placeholder="Enter Shift Name..."
        error=""
        fontBolded
        required={true}
      />
      <Select
        fullWidth={true}
        label="Status"
        name="status"
        isClearable
        options={shiftStatusOptions}
        required
      />
      <div className="row">
        <div className="col">
          <TimeSelector
            label="Start Time"
            name="start_time"
          />
        </div>
        <div className="col">
          <TimeSelector
            label="End Time"
            name="end_time"
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TimeSelector
            label="Check-In Allowed From"
            name="checkinAllowedFrom"
          />
        </div>
        <div className="col">
          <TimeSelector
            label="Check-In Allowed Till"
            name="checkinAllowedTill"
          />
        </div>
      </div>
    </>
  );

  const ShiftFooter = (
    <SaveButton type="submit" loading={isSubmit == false} label={row?.id ? "Save " : "Add"} />
  );

  return (
    <>
      {!selectedId ? (
        <>
          <>
            <DeleteModal
              isOpen={deleteModal}
              toggle={() => {
                setDeleteModal(false);
              }}
              title="Delete Shift"
              id={currentData.id}
              label={currentData.name}
              deleteFunction={shiftDelete}
            />

            <Drawer
              handleOpenModal={toggle}
              handleCloseModal={toggle}
              handleDrawerClose={toggle}
              isModalOpen={isOpen}
              enableReinitialize
              initialValues={{
                name: row?.name,
                status:
                  shiftStatusOptions &&
                  shiftStatusOptions.find((option) => option.label == row?.status),
                start_time: row?.start_time,
                end_time: row?.end_time,
                checkinAllowedFrom: row?.checkin_allowed_from,
                checkinAllowedTill: row?.checkin_allowed_till,
              }}
              DrawerBody={addShiftForm}
              DrawerFooter={ShiftFooter}
              modelTitle={row?.id ? "Edit Shift" : "Add Shift"}
              onSubmit={(values) => {
                {
                  const data = new FormData();
                  data.append("name", values && values.name ? values.name : "");
                  data.append(
                    "status",
                    values && values.status ? values.status.value : "Active"
                  );
                  data.append("start_time", values.start_time ? values.start_time : "");
                  data.append("end_time", values.end_time ? values.end_time : "");
                  data.append("checkin_allowed_from", values.checkinAllowedFrom ? values.checkinAllowedFrom : "");
                  data.append("checkin_allowed_till", values.checkinAllowedTill ? values.checkinAllowedTill : "");
                  row && row.id
                    ? shiftUpdate(row && row?.id, data)
                    : shiftCreate(data);
                }
              }}
            />
          </>
          <PageTitle
            label="Shifts"
            buttonHandler={(e) => {
              setRowValue("")
              toggle();
            }}
            buttonLabel="Add New"
            className={"pt-3"}
          />
          <div className="mt-4">
            <ReduxTable
              id="shift"
              showHeader
              searchPlaceholder="Search"
              apiURL={`${endpoints().shiftAPI}/search`}
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
                  <Link text={row.name} url={`/setting/Shifts/${row.id}`} />
                )}>

                Name
              </ReduxColumn>

              <ReduxColumn
                isClickable="true"
                field="start_time"
                sortBy="start_time"
                width="110px"
                className="text-center"
                minWidth="110px"
                maxWidth="110px"
                renderField={(row) => (
                  <span>{DateTime.getUserTimeZoneTime(row.start_time)}</span>
                )}
              >
                Start Time
              </ReduxColumn>
              <ReduxColumn
                isClickable="true"
                field="end_time"
                sortBy="end_time"
                width="110px"
                minWidth="110px"
                className="text-center"
                maxWidth="110px"
                renderField={(row) => (
                  <span>{DateTime.getUserTimeZoneTime(row.end_time)}</span>
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
                    className={`status-input text-center rounded text-white fw-600 custom-font-size text-uppercase my-3 mx-auto ${row.status && row.status === shift.STATUS_ACTIVE_TEXT
                      ? "bg-success"
                      : row.status === shift.STATUS_INACTIVE_TEXT
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
              <ReduxColumn
                field="Action"
                disableOnClick
                width="70px"
                renderField={(row) => (
                  <>
                    <div className="d-flex justify-content-center align-items-center row">
                      <div className="text-dark landing-group-dropdown">
                        <MoreDropdown>
                          <DropdownItem
                            onClick={() => {
                              toggle()
                              setRowValue(row);
                            }}
                          >
                            Quick View
                          </DropdownItem>
                        </MoreDropdown>
                      </div>
                    </div>
                  </>
                )}
              >

                Action
              </ReduxColumn>
            </ReduxTable>
          </div>
        </>
      ) : (
        <div>
          {/* Detail tab */}
          <ShiftDetails
            history={history}
            data={currentData}
            match={match}
            activeTab={activeTab}
          />
        </div>
      )}
    </>
  );
};

export default Shift;
