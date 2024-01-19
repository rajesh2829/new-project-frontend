import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DropdownItem } from "reactstrap";
import { fetchList } from "../../actions/table";
import { endpoints } from "../../api/endPoints";
import Action from "../../components/Action";
import AddButton from "../../components/AddButton";
import BreadCrumb from "../../components/Breadcrumb";
import DeleteModal from "../../components/DeleteModal";
import PageTitle from "../../components/PageTitle";
import SaveButton from "../../components/SaveButton";
import Spinner from "../../components/Spinner";
import StatusComponent from "../../components/Status";
import Text from "../../components/Text";
import MoreDropdown from "../../components/authentication/moreDropdown";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import ObjectName from "../../helpers/ObjectName";
import DateTime from "../../lib/DateTime";
import TimeSheetDetailService from "../../services/TimeSheetDetailService";
import TimeSheetService from "../../services/TimeSheetService";
import DurationSelect from "../../components/DurationSelect";
import Drawer from "../../components/Drawer";

const buttonLabel = true;

const TimeSheetDetailPage = (props) => {
  let timesheetNumber = props?.match?.params?.id;
  let { history } = props;
  let dispatch = useDispatch();

  const [deleteModelOpen, setDeleteModelOpen] = useState(false);
  const [detail, setDetail] = useState([]);
  const [values, setValues] = useState("");
  const [required, setRequired] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timeValidation, setTimeValidation] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState("");
  const [timeSheetList, setTimeSheetList] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [deleteModel, setDeleteModel] = useState(false);

  useEffect(() => {
    getTimeSheetDetailList();
    getTimeSheetList();
  }, []);

  const handleOpenModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const breadcrumbList = [
    { label: "Home", link: "/people/dashboard" },
    {
      label: "Timesheet",
      link: "/timesheet",
    },
    {
      label: "DetailPage",
      link: "",
    },
  ];

  const getTimeSheetDetailList = async () => {
    let param = {
      timesheet_number: timesheetNumber,
    };
    let { data } = await TimeSheetDetailService.search(param);
    setDetail(data);
  };

  const getTimeSheetList = async () => {
    let param = {
      timesheet_number: timesheetNumber,
    };
    let { data } = await TimeSheetService.search(param);
    setTimeSheetList(data && data[0]);
  };

  const deleteToggle = () => {
    setDeleteModelOpen(!deleteModelOpen);
  };

  const deleteOpenToggle = () => {
    setDeleteModel(!deleteModel);
  };

  const timesheetDeleteFunction = async () => {
    dispatch(
      await TimeSheetService.delete(timesheetNumber, (res) => {
        if (res) {
          history.push("/timesheet");
        }
      })
    );
  };

  let currentEditableInput = null;
  function handleDoubleClick(e) {
    const input = e?.target;

    if (currentEditableInput && currentEditableInput !== input) {
      currentEditableInput.setAttribute("disabled", true);
      currentEditableInput.classList.remove("editable");
    }
    input.removeAttribute("disabled");
    input.classList.add("editable");
    currentEditableInput = input;
  }
  document.addEventListener("dblclick", handleDoubleClick);

  const handleAddValue = async (value) => {
    let data = new FormData();
    data.append("task", value.task);
    data.append("timesheet_number", timesheetNumber);
    data.append("duration", value.duration.value);

    dispatch(
      await TimeSheetDetailService.create(data, (res) => {
        if (res) {
          getTimeSheetDetailList();
          setSelectedDuration("");
          handleCloseModal();
          dispatch(
            fetchList(
              "timesheetNumber",
              `${endpoints().TimeSheetDetailAPI}/search`,
              1,
              25,
              { timesheet_number: timesheetNumber }
            )
          );
        }
      })
    );
    handleCloseModal();
  };

  const handleActionChange = (e) => {
    if (e == "Delete") {
      deleteToggle(true);
    }
  };

  const handleDelete = async (value) => {
    let data = new FormData();
    data.append("id", value && value);

    dispatch(
      await TimeSheetDetailService.delete(data, (res) => {
        if (res) {
          getTimeSheetDetailList();
          deleteOpenToggle();
          dispatch(
            fetchList(
              "timesheetNumber",
              `${endpoints().TimeSheetDetailAPI}/search`,
              1,
              25,
              { timesheet_number: timesheetNumber }
            )
          );
        }
      })
    );
  };

  const onStatusChange = async (value) => {
    let data = {
      status: value,
    };
    dispatch(await TimeSheetService.statusUpdate(timesheetNumber, data));
  };

  const DrawerBody = (
    <>
      <div className="row">
        <div className="col-12">
          <Text name="task" label="Task" placeholder="Task" required />
        </div>
        <div className="col-12">
          <DurationSelect label="Duration"></DurationSelect>
        </div>
      </div>
    </>
  );

  const DrawerFooter = (
    <>
      <SaveButton type="submit" label="Create" />
    </>
  );

  const initialValues = {
    // summary: "",
    description: "",
  };

  const actionOptions = [
    {
      label: "Delete",
      value: "Delete",
    },
  ];

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <DeleteModal
        isOpen={deleteModelOpen}
        toggle={deleteToggle}
        deleteFunction={timesheetDeleteFunction}
        title="Delete Timesheet"
        id={timesheetNumber}
        label={timeSheetList?.user_name}
      />
      <BreadCrumb list={breadcrumbList} />
      <div className="d-flex justify-content-between">
        <PageTitle
          label={`${timeSheetList?.user_name ? timeSheetList?.user_name : ""
            }${" "}${timeSheetList?.date
              ? `(${DateTime.getDate(timeSheetList?.date)})`
              : ""
            }`}
        />
        {timeSheetList && (
          <div className="d-flex justify-content-evenly">
            <div className="mx-2">
              <AddButton
                label={"Add New"}
                onClick={handleOpenModal}
                variant="contained"
                color="primary"
              />
            </div>
            <div className="mx-2 mb-2">
              <StatusComponent
                objectName={ObjectName.TIMESHEET}
                handleChange={onStatusChange}
                buttonLabel={timeSheetList?.status}
                currentStatusId={timeSheetList?.status_id}
              /></div>

            <div className="mx-2 mb-2">
              <Action
                dropdownLinks={actionOptions}
                handleChange={handleActionChange}
              />
            </div>
          </div>
        )}
      </div>
      <DeleteModal
        isOpen={deleteModel}
        toggle={deleteOpenToggle}
        deleteFunction={handleDelete}
        title="Delete Timesheet"
        id={selectedId.id}
        label={selectedId.task}
      />

      <Drawer
        modelTitle="Add Task"
        DrawerBody={DrawerBody}
        DrawerFooter={DrawerFooter}
        onSubmit={(values) => {
          handleAddValue(values);
        }}
        initialValues={initialValues}
        enableReinitialize
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleOpenModal}
        handleDrawerClose={handleOpenModal}
        isModalOpen={isModalOpen}
        buttonLabel={buttonLabel}
      />

      <ReduxTable
        id="timesheetNumber"
        disableHeader
        totalHours
        paramsToUrl={true}
        params={{
          timesheet_number: timesheetNumber,
        }}
        apiURL={`${endpoints().TimeSheetDetailAPI}/search`}
        history={props.history}
      >
        <ReduxColumn field="task" sortBy="task" className="text-center">
          Task
        </ReduxColumn>
        <ReduxColumn field="duration" sortBy="duration" className="text-center">
          Hours Spent
        </ReduxColumn>
        <ReduxColumn
          field="Action"
          disableOnClick
          width="120px"
          minWidth="80px"
          maxWidth="80px"
          renderField={(row) => (
            <div className=" text-center action-group-dropdown">
              <MoreDropdown>
                <DropdownItem
                  className=" text-danger cursor-pointer"
                  onClick={() => {
                    setDeleteModel(true);
                    setSelectedId(row);
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

export default TimeSheetDetailPage;
