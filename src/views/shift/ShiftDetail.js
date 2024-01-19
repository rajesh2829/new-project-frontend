import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PageTitle from "../../components/PageTitle";

//components
import CancelButton from "../../components/CancelButton";
import Form from "../../components/Form";
import HorizontalSpace from "../../components/HorizontalSpace";
import SaveButton from "../../components/SaveButton";
import Select from "../../components/Select";
import Text from "../../components/Text";
import TimeSelector from "../../components/TimeSelector";

//actions
import { endpoints } from "../../api/endPoints";
import { apiClient } from "../../apiClient";
import Action from "../../components/Action";
import BreadCrumb from "../../components/Breadcrumb";
import DeleteModal from "../../components/DeleteModal";
import Customer from "../../helpers/Customer";
import { isBadRequest } from "../../lib/Http";
import ShiftService from "../../services/ShiftService";

const shiftDetail = (props) => {
  const { match, history } = props;
  const shiftId = props.match.params.id;
  const dispatch = useDispatch();

  const [shiftDetails, setShiftDetails] = useState();
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [checkinAllowedFrom, setCheckinAllowedFrom] = useState(null);
  const [checkinAllowedTill, setCheckinAllowedTill] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);
  //status options
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

  useEffect(() => {
    getShiftDetails(match.params.id);
  }, [props]);

  //get the shift details
  const getShiftDetails = () => {
    let id = props.match.params.id;

    try {
      return apiClient
        .get(`${endpoints().shiftAPI}/${id}`)
        .then((response) => {
          const data = response.data;
          setShiftDetails(data);
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
    name: shiftDetails?.name,
    status:
      shiftStatusOptions &&
      shiftStatusOptions.find((option) => option.label == shiftDetails?.status),
    start_time: startTime ? startTime : shiftDetails?.start_time,
    end_time: endTime ? endTime : shiftDetails?.end_time,
    checkinAllowedFrom: checkinAllowedFrom
      ? checkinAllowedFrom
      : shiftDetails?.checkin_allowed_from,
    checkinAllowedTill: checkinAllowedTill
      ? checkinAllowedTill
      : shiftDetails?.checkin_allowed_till,
  };

  //Handle Update userRole Details
  const handleUpdate = (id, values) => {
    const data = new FormData();
    data.append("name", values && values.name ? values.name : "");
    data.append(
      "status",
      values && values.status ? values.status.value : "Active"
    );
    if (startTime || startTime === "") {
      data.append("start_time", values.start_time ? values.start_time : "");
    }
    if (endTime || endTime === "") {
      data.append("end_time", values.end_time ? values.end_time : "");
    }
    if (checkinAllowedFrom || checkinAllowedFrom === "") {
      data.append(
        "checkin_allowed_from",
        values.checkinAllowedFrom ? values.checkinAllowedFrom : ""
      );
    }
    if (checkinAllowedTill || checkinAllowedTill === "") {
      data.append(
        "checkin_allowed_till",
        values.checkinAllowedTill ? values.checkinAllowedTill : ""
      );
    }

    ShiftService.update(id, data, (res) => {
      if (res) {
        setStartTime(null)
        setEndTime(null)
        setCheckinAllowedFrom(null)
        setCheckinAllowedTill(null)
        getShiftDetails()
      }
    });
  };

  const DateFieldOnchange = (e) => {
    setStartDate(e);
    let date = {
      start_time: e,
    };
  };

  const handleShiftDelete = (id, params) => {
    try {
      ShiftService.delete(id);
      props.history.push("/setting/Shifts");
    } catch (err) {
      console.log(err);
    }
  };

  const breadcrumbList = [
    { label: "Settings", link: "/setting/Shifts" },
    {
      label: "Shifts",
      link: "/setting/Shifts",
    },
    {
      label: Customer.GetDisplayName(shiftDetails?.name),
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

  const handleStartTime = (values) => {
    setStartTime(values ? values : "");
  };

  const handleEndTime = (values) => {
    setEndTime(values ? values : "");
  };

  const handleCheckinAllowedFrom = (values) => {
    setCheckinAllowedFrom(values ? values : "");
  };

  const handleCheckinAllowedTill = (values) => {
    setCheckinAllowedTill(values ? values : "");
  };

  return (
    <>
      <DeleteModal
        id={shiftId}
        label={shiftDetails?.name}
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Product "
        deleteFunction={handleShiftDelete}
      />
      <div>
        <BreadCrumb list={breadcrumbList} />
        <div className="d-flex justify-content-between mb-3">
          <PageTitle label={shiftDetails?.name} />

          <div className="pl-2">
            <Action
              dropdownLinks={actionsMenuList}
              handleChange={handleActionChange}
            />
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
                label="Shift Name"
                placeholder="Enter Shift Name..."
                required
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
                    placeholder="Start Date"
                    isClearable
                    onChange={handleStartTime}
                  />
                </div>
                <div className="col">
                  <TimeSelector
                    label="End Time"
                    name="end_time"
                    placeholder="End Date"
                    isClearable
                    onChange={handleEndTime}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <TimeSelector
                    label="Check-In Allowed From"
                    name="checkinAllowedFrom"
                    isClearable
                    onChange={handleCheckinAllowedFrom}
                  />
                </div>
                <div className="col">
                  <TimeSelector
                    label="Check-In Allowed Till"
                    name="checkinAllowedTill"
                    isClearable
                    onChange={handleCheckinAllowedTill}
                  />
                </div>
              </div>
              <HorizontalSpace bottom="3">
                <SaveButton label="Save" />
                <CancelButton
                  onClick={() => {
                    history.push({ pathname: "/setting/Shifts" });
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

export default shiftDetail;
