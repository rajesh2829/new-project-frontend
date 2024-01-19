import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

//components
import Form from "../../components/Form";
import HorizontalSpace from "../../components/HorizontalSpace";
import SaveButton from "../../components/SaveButton";
import Select from "../../components/Select";
import Text from "../../components/Text";
import CancelButton from "../../components/CancelButton";

//actions
import { updateUserRole } from "../../actions/userSetting";
import { apiClient } from "../../apiClient";
import { endpoints } from "../../api/endPoints";
import MultiSelect from "../../components/Multiselect";
import ShiftService from "../../services/ShiftService";
import StoreSelector from "../store/components/storeSelector";
import MultiselectCreatable from "../../components/MultiselectCreatable";
import { isBadRequest } from "../../lib/Http";

const userRoleDetail = (props) => {
  const { match, history } = props;

  const dispatch = useDispatch();

  const [userDetail, SetUserDetails] = useState();
  const [shiftList, setShiftList] = useState([]);


  //status options
  const userStatusOptions = [
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
    getUserRoleDetails(match.params.id);
    getShifts()
  }, [props]);

  const getShifts = async () => {
    const list = await ShiftService.getShiftList();
    setShiftList(list);
  };

  //get the userRole details
  const getUserRoleDetails = () => {
    let id = props.match.params.id;

    try {
      return apiClient
        .get(`${endpoints().userRoleAPI}/${id}`)
        .then((response) => {
          const data = response.data;
          SetUserDetails(data);
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
    role_name: userDetail?.data?.role_name,
    status:
      userStatusOptions &&
      userStatusOptions.find(
        (option) => option.label == userDetail?.data?.status
      ),
  };

  //Handle Update userRole Details
  const handleUpdate = (id, values) => {
    const data = new FormData();
    data.append(
      "role_name",
      values && values.role_name ? values.role_name : ""
    );
    data.append(
      "status",
      values && values.status ? values.status.value : "Active"
    );
    dispatch(updateUserRole(id, data, {}));
  };

  return (
    <div>
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
            <div className=" field-wrapper ">
              <Text
                name="role_name"
                label="Role Name"
                placeholder="Enter Role Name..."
                required
              />
              <Select
                fullWidth={true}
                label="Status"
                name="status"
                isClearable
                options={userStatusOptions}
                required
              />

              <HorizontalSpace bottom="2">
                <SaveButton label="Save" />
                <CancelButton
                  onClick={() => {
                    history.push({ pathname: "/admin/roles" });
                  }}
                />
              </HorizontalSpace>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default userRoleDetail;
