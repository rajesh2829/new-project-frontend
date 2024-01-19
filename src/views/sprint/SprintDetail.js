import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

//components
import Form from "../../components/Form";
import HorizontalSpace from "../../components/HorizontalSpace";
import SaveButton from "../../components/SaveButton";
import Select from "../../components/Select";
import Text from "../../components/Text";
import CancelButton from "../../components/CancelButton";
import BreadCrumb from "../../components/Breadcrumb";
import DeleteModal from "../../components/DeleteModal";
import PageTitle from "../../components/PageTitle";
import DateSelector from "../../components/Date";
import StatusComponent from "../../components/Status";
import ObjectName from "../../helpers/ObjectName";

// Endpoints
import { endpoints } from "../../api/endPoints";

// Lib
import { isBadRequest } from "../../lib/Http";

// Helpers
import Customer from "../../helpers/Customer";

// API Client
import { apiClient } from "../../apiClient";

// Services
import SprintService from "../../services/SprintService";
import DeleteButton from "../../components/DeleteButton";
import Url from "../../lib/Url";
import SelectDropdown from "../../components/SelectDropdown";
import Action from "../../components/Action";

const sprintDetail = (props) => {
  const { match, history } = props;
  const sprintId = props.match.params.id;
  const dispatch = useDispatch();

  const [sprintDetails, setSprintDetails] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [deleteModal, setDeleteModal] = useState(false);
  //status options
  const sprintStatusOptions = [
    {
      value: 1,
      label: "Active",
    },
    {
      value: 2,
      label: "InActive",
    },
  ];

  useEffect(() => {
    getSprintDetails(match.params.id);
  }, [props]);

  //get the sprint details
  const getSprintDetails = () => {
    let id = props.match.params.id;

    try {
      return apiClient
        .get(`${endpoints().sprintAPI}/${id}`)
        .then((response) => {
          const data = response.data;
          setSprintDetails(data);
        })
        .catch((error) => {
          if (isBadRequest(error)) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            console.error(errorMessage);
          }
        });
    } catch (error) {
      console.log(err);
    }
  };

  // Initial values
  const initialValues = {
    name: sprintDetails?.name,
    status:
      sprintStatusOptions &&
      sprintStatusOptions.find((option) => option.label == sprintDetails?.status),
    start_date: startDate ? startDate : sprintDetails?.start_date,
    end_date: endDate ? endDate : sprintDetails?.end_date,
  };

  //Handle Update userRole Details
  const handleUpdate = async (id, values) => {
    const data = new FormData();
    data.append("name", values && values.name ? values.name : "");
    data.append("start_date", values.start_date ? values.start_date : "");
    data.append("end_date", values.end_date ? values.end_date : "");

    await SprintService.update(id, data, {
      sort: Url.GetParam("sort") || "",
      sortBy: Url.GetParam("sortDir") || "",
    });

    history.push({ pathname: "/sprint" })
  };

  const handleSprintDelete = (id) => {
    try {
      SprintService.delete(id);
      props.history.push("/sprint");
    } catch (err) {
      console.log(err);
    }
  };

  const startDateChange = (e) => {
    setStartDate(e);
  }

  const endDateChange = (e) => {
    setEndDate(e);
  }

  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    {
      label: "Sprints",
      link: "/sprint",
    },
    {
      label: "Sprint Details",
      link: "",
    },

  ];
  const actionsMenuList = [
    {
      value: "delete",
      label: "Delete",
    },
  ];

  const handleActionChange = (e) => {
    if (e == "delete") {
      setDeleteModal(true);
    }

  };
  const onStatusChange = async (value) => {
    const data = {};
    data.status = value
    const id = props.match.params.id
    await SprintService.updateStatus(id, data)
  }
  return (
    <>
      <DeleteModal
        id={sprintId}
        label={sprintDetails?.name}
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Sprint"
        deleteFunction={handleSprintDelete}
      />
      <div>
        <BreadCrumb list={breadcrumbList} />
        <div className="mb-3 d-flex justify-content-between">
          <PageTitle
            label={sprintDetails?.name}
          />
          <div className="float-right d-flex">
            <div className="mx-2">
              <SelectDropdown
                buttonLabel={sprintDetails?.status ? sprintDetails?.status : "Status"}
                hideCaret
                dropdownLinks={sprintStatusOptions}
                handleChange={(values) => onStatusChange(values)}
              />
            </div>
            <div className="pl-2">
              <Action
                dropdownLinks={actionsMenuList}
                handleChange={handleActionChange}
              />
            </div>
          </div>
        </div>
        <Form
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={(values) => {
            let id = props.match.params.id;
            handleUpdate(id, values);
          }}
        >
          <div className="card bg-white">
            <div className="card-body">
              <Text
                name="name"
                label="Sprint Name"
                placeholder="Enter Sprint Name..."
                required
              />
              <div className="d-flex justify-content-start">
                <DateSelector
                  label="Start Date"
                  name="start_date"
                  format="dd-MMM-yyyy"
                  required
                  onChange={startDateChange}
                />

                <div className="ml-1">
                  <DateSelector
                    label="End Date"
                    name="end_date"
                    format="dd-MMM-yyyy"
                    required
                    onChange={endDateChange}
                  />
                </div>
              </div>
              <HorizontalSpace bottom="2">
                <SaveButton label="Save" />
                <CancelButton
                  onClick={() => {
                    history.push({ pathname: "/sprint" });
                  }}
                />
              </HorizontalSpace>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default sprintDetail;
