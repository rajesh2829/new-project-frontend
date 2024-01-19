import React, { useState } from "react";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import { endpoints } from "../../api/endPoints";
import Drawer from "../../components/Drawer";
import PageTitle from "../../components/PageTitle";
import Text from "../../components/Text";
import Select from "../../components/Select";
import Number from "../../components/Number";
import SaveButton from "../../components/SaveButton";
import AttendanceTypeService from "../../services/AttendanceTypeService";
import { useDispatch } from "react-redux";
import { Status, statusOptions, typeOptions } from "../../helpers/AttendanceType";
import { fetchList } from "../../actions/table";
import MoreDropdown from "../../components/authentication/moreDropdown";
import { DropdownItem } from "reactstrap";
import DeleteModal from "../../components/DeleteModal";
import Link from "../../components/Link";
import DetailPage from "./detailPage"

const AttendanceType = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rowValue, setRowValue] = useState(null)
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const dispatch = useDispatch();
  const selectedId = props.match && props.match.params && props.match.params.id;

  const Toggle = () => {
    setIsOpen(!isOpen);
  };

  const ToggleClose = () => {
    setIsOpen(!isOpen);
    setRowValue(null)
  };

  const handleAttendanceType = async (values) => {
    let data = new FormData();

    data.append("name", values && values?.name ? values?.name : "");
    data.append("type", values && values?.type ? values?.type?.value : "");
    data.append(
      "status",
      values && values?.status ? values?.status?.value : ""
    );
    data.append(
      "days_count",
      values && values?.days_count ? values?.days_count : ""
    );
    data.append("type_name", values && values?.type_name ? values?.type_name?.label : "");


    if (rowValue) {
      dispatch(await AttendanceTypeService.update(rowValue.id, data, (res) => {
        if (res) {
          dispatch(
            fetchList("attendanceType", `${endpoints().attendanceTypeAPI}/search`, 1, 25, {})
          );
          ToggleClose()
        }
      }));
    } else {
      dispatch(await AttendanceTypeService.create(data, (res) => {
        if (res) {
          dispatch(
            fetchList("attendanceType", `${endpoints().attendanceTypeAPI}/search`, 1, 25, {})
          );
          ToggleClose()
        }
      }));
    }
  };


  const FormBody = (
    <>
      <Text name="name" label="Name" />
      <Select name="type" label="Type" options={typeOptions} />
      <Number name="days_count" label="Days Count" />
      <Select name="status" label="Status" options={statusOptions} />
    </>
  );

  const FormFooter = (
    <>
      {" "}
      <SaveButton type="submit" label={rowValue ? "Update" : "Add"} />
    </>
  );

  const deleteToggle = () => {
    setDeleteIsOpen(!deleteIsOpen)
    setRowValue(null)
  }

  const deleteFunction = async () => {
    dispatch(await AttendanceTypeService.delete(rowValue.id, (res) => {
      if (res) {
        dispatch(
          fetchList("attendanceType", `${endpoints().attendanceTypeAPI}/search`, 1, 25, {})
        );
        deleteToggle()
      }
    }));
  }

  return (
    <>
      <DeleteModal
        isOpen={deleteIsOpen}
        toggle={deleteToggle}
        title="Delete"
        label={rowValue?.id}
        deleteFunction={deleteFunction}
      />
      <Drawer
        DrawerBody={FormBody}
        DrawerFooter={FormFooter}
        modelTitle={rowValue ? "Edit" : "Add"}
        onSubmit={(values) => {
          handleAttendanceType(values);
        }}
        initialValues={{
          name: rowValue ? rowValue?.name : "",
          type: rowValue ? rowValue?.type : "",
          days_count: rowValue ? rowValue?.days_count : "",
          status: rowValue ? rowValue?.status : "",
        }}
        handleOpenModal={Toggle}
        handleCloseModal={ToggleClose}
        handleDrawerClose={ToggleClose}
        isModalOpen={isOpen}
      />
      {!selectedId ? (<> <PageTitle
        label="Attendance Type"
        buttonHandler={() => {
          Toggle();
        }}
        buttonLabel="Add"
      />
        <ReduxTable
          id="attendanceType"
          showHeader
          searchPlaceholder="Search"
          paramsToUrl={true}
          history={props.history}
          apiURL={`${endpoints().attendanceTypeAPI}/search`}
          newTableHeading
          sortByDropdown
        >
          <ReduxColumn
            field="name"
            sortBy="name"
            renderField={(row) => (
              <Link text={row.name} url={`/setting/AttendanceTypes/${row.id}`} />
            )}
          >
            Name
          </ReduxColumn>
          <ReduxColumn
            field="status"
            sortBy="status"
            width={"120px"}
            minWidth="120px"
            maxWidth="120px"
            className="column-status"
            renderField={(row) => (
              <div
                className={`status-input text-center rounded text-white fw-600 custom-font-size text-uppercase ${row.status?.value && row.status?.value === Status.STATUS_ACTIVE
                  ? "bg-success"
                  : row.status?.value === Status.STATUS_INACTIVE
                    ? "bg-secondary"
                    : ""
                  }`}
              >
                <p>{row.status?.label}</p>
              </div>
            )}
          >
            Status
          </ReduxColumn>
          <ReduxColumn
            field="type"
            sortBy="type"
            className="text-center"
            renderField={(row) => <span>{row?.type?.label}</span>}
          >
            Type
          </ReduxColumn>
          <ReduxColumn
            field="days_count"
            sortBy="days_count"
            className="text-center"
          >
            Days Count
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
                          setRowValue(row);
                          Toggle();
                        }}
                      >
                        Quick View
                      </DropdownItem>
                      <DropdownItem
                        className="text-danger"
                        onClick={() => {
                          setRowValue(row);
                          setDeleteIsOpen(true);
                        }}
                      >
                        Delete
                      </DropdownItem>
                    </MoreDropdown>
                  </div>
                </div>
              </>
            )}
          >
            Action
          </ReduxColumn>
        </ReduxTable></>) : (
        <DetailPage {...props} />
      )}
    </>
  );
};

export default AttendanceType;
