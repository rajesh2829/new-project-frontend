import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Components
import Avatar from '../../components/Avatar';
import BreadCrumb from '../../components/Breadcrumb';
import PageTitle from '../../components/PageTitle';
import DeleteModal from '../../components/DeleteModal';
import UpdateForm from './components/UpdateForm';
import Form from '../../components/Form';
import SaveButton from '../../components/SaveButton';
import CancelButton from '../../components/CancelButton';
import Action from '../../components/Action';

// Services
import StatusService from '../../services/StatusService';
import UserService from '../../services/UserService';
import ActivityService from '../../services/ActivityService';
import ActivityTypeService from '../../services/ActivityTypeService';

// Helpers
import ObjectName from "../../helpers/ObjectName";

// Lib
import String from '../../lib/String';
import Number from '../../lib/Number';

const ActivityDetail = (props) => {
  // Use States
  const [deleteModal, setDeleteModal] = useState(false);
  const [activityDetail, setActivityDetail] = useState("");
  const [usersList, setUsersList] = useState("");
  const [activityList, setActivityList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const { history } = props;

  // Use Dispatch
  const dispatch = useDispatch();

  // UseEffect
  useEffect(() => {
    getActivityDetail();
    getUsersList();
    getStatusList();
    getActivityList();
  }, []);

  //   Get Status List

  const getStatusList = async () => {
    const data = await StatusService.search(ObjectName.ACTIVITY, null);

    const value = [];
    data.forEach((statusValue) => {
      value.push({
        value: statusValue.id,
        label: statusValue.name,
        id: statusValue.id,
      });
      setStatusList(value);
    });


  };

  //Get Activity Details
  const getActivityList = async () => {
    let response = await ActivityTypeService.search();
    let data = response && response.data && response.data.data;
    // Split the activity options
    if (data && data.length > 0) {
      const activityList = [];
      data
        .sort((a, b) => parseFloat(a.sort) - parseFloat(b.sort))
        .forEach((activityData) => {
          activityList.push({
            value: activityData.id,
            label: activityData.name,
          });
        });
      // Set Activity Options List in state
      setActivityList(activityList);
    }

    return data;
  };

  const getUserName = (media_url, firstName, lastName) => {
    return (<div className="d-flex">
      <Avatar id="avatar"
        firstName={firstName}
        lastName={lastName}
        url={media_url}
      />
      <div className="m-2">
        {firstName} {lastName}
      </div>
    </div>)
  }

  // Getting Users list for user dropdown
  const getUsersList = async () => {
    const response = await UserService.get();
    const userList = response && response.data;
    const data = [];
    userList &&
      userList.length > 0 &&
      userList.forEach((list) => {
        data.push({
          label: getUserName(list.avatarUrl, list.first_name, list.last_name),
          value: list.first_name,
          id: list.id,
        });
      });
    setUsersList(data);
  };

  // Breadcrumb list
  const breadcrumbList = [
    { label: "Home", link: "/admin/dashboard" },
    { label: "Activity", link: "/activity" },
    { label: "Activity Detail", link: "" },
  ];

  const deleteActivity = async (id) => {
    await ActivityService.delete(id);
    props.history.push("/activity");
  }

  const getActivityDetail = async () => {
    let id = props.match.params.id
    let response = await ActivityService.get(id);
    if (response && response.data) {
      setActivityDetail(response.data);
    }
  };

  // Handle on update
  const handleUpdate = async (id, values) => {
    let data = new FormData();

    data.append("activity_type", values.activity_type && values.activity_type.value);

    if (values.actual_hours) {
      data.append("actual_hours", Number.Get(values.actual_hours));
    }

    if (values.cost) {
      data.append("cost", Number.Get(values.cost));
    }

    if (values.date) {
      data.append("date", values.date ? values.date : "");
    }

    if (values.estimated_hours) {
      data.append("estimated_hours", Number.Get(values.estimated_hours));
    }

    if (values?.end_date) {
      data.append("end_date", values?.end_date ? values?.end_date : "");
    }

    if (values.start_date) {
      data.append("start_date", values.start_date ? values.start_date : "");
    }

    data.append("explanation", String.Get(values.explanation));
    data.append("notes", values.notes ? values.notes : "");
    data.append("status", values.status ? values.status.value : "");
    data.append("owner", values.owner ? values.owner.id : ""
    );
    dispatch(await ActivityService.update(id, data, {}));
  };

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

  // Initial Values
  const initialValues = {
    date: activityDetail && activityDetail.date,
    owner: activityDetail && usersList && usersList.find((data) => data.id == activityDetail.user_id),
    activity_type: activityDetail && activityList && activityList.find((data) => data.value == activityDetail.activity_type_id),
    status: activityDetail && statusList && statusList.find((data) => data.value == activityDetail.status),
    start_date: activityDetail && activityDetail.start_date ? activityDetail.start_date : "",
    end_date: activityDetail && activityDetail.end_date,
    cost: activityDetail && activityDetail.cost,
    estimated_hours: activityDetail && activityDetail.estimated_hours,
    actual_hours: activityDetail && activityDetail.actual_hours,
    explanation: activityDetail && activityDetail.explanation,
    notes: activityDetail && activityDetail.notes,
  };

  return (
    <div>
      <BreadCrumb list={breadcrumbList} />
      <div className="d-flex justify-content-between">
        <PageTitle label="Activity Detail" />
        <div className="pl-2">
          <Action
            dropdownLinks={actionsMenuList}
            handleChange={handleActionChange}
          />
        </div>
      </div>
      <DeleteModal
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Activity"
        id={props.match.params.id}
        label="Activity"
        deleteFunction={deleteActivity}
      />
      <div className="row card-body">
        <div className="col-lg-12 col-sm-12 col-md-12 card card-body">
          <Form enableReinitialize initialValues={initialValues} onSubmit={(values) => {
            handleUpdate(props.match.params.id, values)
          }}>
            <UpdateForm
              activityDetail={activityDetail}
              id={props.match.params.id}
              history={props.history}
              usersList={usersList}
              activityList={activityList}
              statusList={statusList}
            />

            <SaveButton label="Save" />

            <CancelButton onClick={() => { history.push("/activity") }} />
          </Form>
        </div>
      </div>
    </div>
  )
};
export default ActivityDetail;