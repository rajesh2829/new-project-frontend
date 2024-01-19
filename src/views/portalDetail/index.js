import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { apiClient } from "../apiClient";
import { isBadRequest } from "../lib/Http";
import DeleteModal from "../components/DeleteModal";

//Component
import { endpoints } from "../api/EndPoints";
import {
  clearAllCookies,
  COOKIE_SESSION_TOKEN,
} from "../lib/Cookie";
import { setCookie } from "../lib/Helper";
import { deletePortal, updatePortal } from "../admin/Action";

//Pages
import Form from "../components/Form";
import Text from "../components/Text";
import CancelButton from "../components/CancelButton";
import SaveButton from "../components/SaveButton";
import SelectDropdown from "../components/SelectDropdown";
import "./portal.scss";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PortalDetail = (props) => {
  const { history, match } = props;
  const [portalDetail, setPortalDetail] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    setDeleteModal(true);
  };

  /**
   * Delete Portal
   *
   * @param id
   */
  const portalDelete = (id) => {
    dispatch(deletePortal(id, {}));
    history.push("/admin");
  };

  // Login By Admin
  const loginByAdmin = async (data) => {
    return apiClient
      .post(`${endpoints().userAPI}/loginByAdmin/${data.id}`)
      .then((response) => {
        console.log(response);
        if (response && response.data) {
          const { token, role, userId, portalUrl } = response.data;
          clearAllCookies();
          setCookie(COOKIE_SESSION_TOKEN, token);

          if (portalUrl) {
            window.location.replace(`${portalUrl}/dashboard`);
          } else {
            window.location.replace("/dashboard");
          }
        }
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
  };

  const updatePortalData = (id, data) => {
    dispatch(updatePortal(id, data, {}));
  };

  const adminActionOptions = [
    {
      value: "Login As",
      label: "Login As",
    },
    {
      value: "Delete",
      label: "Delete",
    },
  ];

  const handleAdminAction = (value) => {
    switch (value) {
      case "Login As":
        return loginByAdmin(portalDetail);
      case "Delete":
        return handleDelete();
      default:
        return "";
    }
  };

  return (
    <>
      {/* Breadcrumb Start */}
      <div className="d-flex align-items-center pt-3">
        <span
          className="cursor-pointer"
          onClick={() => {
            history.push(`/admin`);
          }}
        >
          Portals
        </span>
        <span className="d-inline-flex portal-width">
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
        <span
          className={`${portalDetail && portalDetail.portal_name
            ? "text-dark font-weight-bold"
            : ""
            } d-inline-flex `}
        >
          <span>{portalDetail && portalDetail.portal_name}</span>
        </span>
      </div>

      {/* Breadcrumb End */}
      <div className="row">
        <div className="ml-auto mr-3 mt-2">
          <div className="d-flex align-items-center">
            <SelectDropdown
              buttonLabel="Admin Actions"
              dropdownLinks={adminActionOptions}
              color={"gray"}
              hideCaret
              selectName={"admin_action"}
              handleChange={handleAdminAction}
            />
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Portal"
        id={portalDetail.id}
        label={portalDetail.portal_name}
        deleteFunction={portalDelete}
      />
      <div>
        <div className="card bg-white mt-3">
          <div className="card-body">
            <Form
              enableReinitialize={true}
              initialValues={{ ...portalDetail }}
              onSubmit={(values) => {
                updatePortalData(portalDetail.id, values);
              }}
            >
              <div>
                <div className="field-wrapper mb-0">
                  <Text
                    name="portal_name"
                    label="Portal Name"
                    placeholder="Enter Portal Name"
                    error=""
                    fontBolded
                    required={true}
                  />
                </div>
                <Text
                  name="portal_url"
                  label="Portal Url"
                  placeholder="Enter Portal Url"
                  error=""
                  fontBolded
                  required={true}
                />
              </div>
              <div className="mb-4">
                <div className="float-left">
                  <SaveButton />
                  <CancelButton
                    onClick={() => {
                      history.push(`/admin`);
                    }}
                  />
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortalDetail;
