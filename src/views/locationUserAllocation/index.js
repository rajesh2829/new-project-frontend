import React, { useState } from "react";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import Drawer from "../../components/Drawer";
import { useDispatch } from "react-redux";
import LocationUserAllocationService from "../../services/LocationUserAllocationService";
import SelectStore from "../../components/SelectStore";
import ShiftSelect from "../../components/ShiftSelect";
import UserSelect from "../../components/UserSelect";
import PageTitle from "../../components/PageTitle";
import SaveButton from "../../components/SaveButton";
import DateSelector from "../../components/Date";
import { endpoints } from "../../api/endPoints";
import UserCard from "../../components/UserCard";
import { fetchList } from "../../actions/table";
import MoreDropdown from "../../components/authentication/moreDropdown";
import { DropdownItem } from "reactstrap";
import DeleteModal from "../../components/DeleteModal";
import SelectDropdown from "../../components/SelectDropdown";
import DateTime from "../../lib/DateTime";
import AddModal from "../../components/Modal";

const locationUserAllocation = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isAllLocationOpen, setIsAllLocationOpen] = useState(false);
  const [isUserModelOpen, setIsUserModelOpen] = useState(false);
  let dispatch = useDispatch();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const deleteToggle = () => {
    setIsModelOpen(!isModelOpen);
    setRowData(null);
  };

  const allLocationToggle = () => {
    setIsAllLocationOpen(!isAllLocationOpen);
  };

  const userToggle = () => {
    setIsUserModelOpen(!isUserModelOpen);
    setRowData(null);
  };

  let DrawerBody = (
    <>
      <DateSelector name="date" placeholder="Date" isClearable />
      <SelectStore label="Location" name="location" />
      <ShiftSelect label="Shift" name="shift" />
      <UserSelect label="User" name="user" />
    </>
  );

  let DrawerFooter = (
    <>
      <SaveButton label="Add" />
    </>
  );

  let initialValues = {
    location: "",
    shift: "",
    user: "",
    date: new Date() || "",
  };

  const handleAdd = async (values) => {
    let data = new FormData();
    data.append(
      "location_id",
      values && values?.location ? values?.location?.value : ""
    );
    data.append(
      "shift_id",
      values && values?.shift ? values?.shift?.value : ""
    );
    data.append("user_id", values && values?.user ? values?.user?.id : "");
    data.append("date", values && values?.date ? values?.date : "");
    dispatch(
      await LocationUserAllocationService.create(data, (res) => {
        if (res) {
          dispatch(
            fetchList(
              "locationUserAllocation",
              `${endpoints().LocationUserAllocationAPI}/search`,
              1,
              25,
              {}
            )
          );
          toggle();
        }
      })
    );
  };

  const handleDelete = async () => {
    dispatch(
      await LocationUserAllocationService.delete(rowData?.id, (res) => {
        if (res) {
          dispatch(
            fetchList(
              "locationUserAllocation",
              `${endpoints().LocationUserAllocationAPI}/search`,
              1,
              25,
              {}
            )
          );
          deleteToggle();
        }
      })
    );
  };

  const handleChanges = (e) => {
    if (e === "Add") {
      toggle();
    }
    if (e === "Add Shft from All Location") {
      allLocationToggle();
    }
  };

  let allLocationBody = (
    <>
      <DateSelector name="date" placeholder="Date" isClearable />
      <ShiftSelect label="Shift" name="shift" />
    </>
  );

  let allLocationFooter = (
    <>
      <SaveButton label="Add" />
    </>
  );

  const handleSubmit = async (values) => {
    let data = new FormData();
    data.append("date", values && values?.date);
    data.append("shift", values && values?.shift ? values?.shift?.id : "");
    dispatch(
      await LocationUserAllocationService.bulkCreate(data, (res) => {
        if (res) {
          dispatch(
            fetchList(
              "locationUserAllocation",
              `${endpoints().LocationUserAllocationAPI}/search`,
              1,
              25,
              {}
            )
          );
          allLocationToggle();
        }
      })
    );
  };

  let userForm = (
    <>
      <UserSelect name="user" label="User" />
    </>
  );
  let userFooter = (
    <>
      <SaveButton label="Update" />
    </>
  );

  let handleUpdate = async (values) => {
    let data = new FormData();
    data.append("user_id", values && values?.user && values?.user?.id);
    dispatch(
      await LocationUserAllocationService.update(rowData?.id, data, (res) => {
        if (res) {
          dispatch(
            fetchList(
              "locationUserAllocation",
              `${endpoints().LocationUserAllocationAPI}/search`,
              1,
              25,
              {}
            )
          );
          userToggle();
        }
      })
    );
  };

  return (
    <div>
      <AddModal
        isOpen={isUserModelOpen}
        toggle={userToggle}
        toggleModalClose={userToggle}
        modalTitle="Change User"
        modalBody={userForm}
        modalFooter={userFooter}
        initialValues={{
          user: "",
        }}
        onSubmit={handleUpdate}
        hideDefaultButtons
      />
      <Drawer
        DrawerBody={DrawerBody}
        DrawerFooter={DrawerFooter}
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleAdd}
        handleOpenModal={toggle}
        handleCloseModal={toggle}
        handleDrawerClose={toggle}
        isModalOpen={isOpen}
        hideAddButton
        modelTitle="Add User Allocation"
      />
      <Drawer
        DrawerBody={allLocationBody}
        DrawerFooter={allLocationFooter}
        initialValues={{
          date: new Date() || "",
          shift: "",
        }}
        enableReinitialize
        onSubmit={handleSubmit}
        handleOpenModal={allLocationToggle}
        handleCloseModal={allLocationToggle}
        handleDrawerClose={allLocationToggle}
        isModalOpen={isAllLocationOpen}
        hideAddButton
        modelTitle="Add User Allocation From All Location"
      />

      <DeleteModal
        isOpen={isModelOpen}
        toggle={deleteToggle}
        deleteFunction={handleDelete}
        label={rowData?.id}
      />

      <div className="d-flex justify-content-between">
        <PageTitle label="Location User Allocation" />
        <div className="mb-2">
          <SelectDropdown
            buttonLabel={"Add New"}
            hideCaret
            dropdownLinks={[
              {
                value: "Add",
                label: "Add",
              },
              {
                value: "Add Shft from All Location",
                label: "Add Shft from All Location",
              },
            ]}
            handleChange={(e) => handleChanges(e)}
          />
        </div>
      </div>

      <ReduxTable
        id="locationUserAllocation"
        showHeader
        newTableHeading
        showDropdown
        params={{}}
        sortByDropdown={true}
        searchPlaceholder="Search"
        apiURL={`${endpoints().LocationUserAllocationAPI}/search`}
        history={props.history}
        paramsToUrl={true}
        showUserFilter
        showStoreFilter
        showShiftFilter
        showSingleDateFilter
      >
        <ReduxColumn
          field="date"
          sortBy="date"
          className="text-center"
          renderField={(row) => <span>{DateTime.getDate(row.date)}</span>}
        >
          Date
        </ReduxColumn>
        <ReduxColumn field="location" sortBy="location">
          Location
        </ReduxColumn>
        <ReduxColumn field="shift" sortBy="shift">
          Shift
        </ReduxColumn>
        <ReduxColumn
          field="user"
          sortBy="user"
          renderField={(row) => (
            <>
              <UserCard
                firstName={row.first_name}
                url={row.media_url}
                lastName={row.last_name}
              />
            </>
          )}
        >
          User
        </ReduxColumn>
        <ReduxColumn
          field="Action"
          disableOnClick
          renderField={(row) => (
            <div className="text-center action-group-dropdown">
              <MoreDropdown>
                <DropdownItem
                  onClick={() => {
                    setRowData(row);
                    setIsUserModelOpen(true);
                  }}
                >
                  Change User
                </DropdownItem>
                <DropdownItem
                  className="text-danger"
                  onClick={() => {
                    setRowData(row);
                    setIsModelOpen(true);
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
    </div>
  );
};

export default locationUserAllocation;
