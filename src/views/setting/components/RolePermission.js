import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import DeleteButton from "../../../components/DeleteButton";
import PageTitle from "../../../components/PageTitle";
// Components
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import Text from "../../../components/Text";
//Config
import { endpoints } from "../../../api/endPoints";
// Action
import * as API from "../../../actions/userSetting";
import AddModal from "../../../components/Modal";
import DeleteModal from "../../../components/DeleteModal";

const RolePermission = (props) => {
  const { history, activeTab, match } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);

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

  const dispatch = useDispatch();

  const toggle = () => {
    setIsOpen(!isOpen);
    setCurrentData("");
  };

  /**
   * Create Creation
   *
   * @param data
   */
  const userPermissionCreate = (data) => {
    dispatch(API.createPermission(data, {}));
    toggle();
  };

  /**
   * Update Creation
   *
   * @param data
   */
  const userPermissionUpdate = (id, data) => {
    dispatch(API.updatePermission(id, data, {}));
    toggle();
  };

  /**
   * Delte Creation
   *
   * @param data
   */
  const userPermissionDelete = (id) => {
    dispatch(API.deletePermission(id, {}));
    // toggle();
  };

  const addBrandForm = (
    <div className="mt-2 mb-3">
      <div>
        <Text
          name="name"
          label="Permission Name"
          placeholder="Enter Permission Name..."
          error=""
          fontBolded
          required={true}
        />
      </div>
    </div>
  );

  const brandFooter = (
    <div className="container-fluid">
      <div className="col-sm-12 text-center">
        {currentData && (
          <DeleteButton
            className="pl-3"
            label={"Delete"}
            onClick={() => {
              setDeleteModal(true);
              setIsOpen(false);
            }}
          />
        )}
        <Button type="submit" label="" className="ml-4 h6-5-important">
          {currentData ? "Update" : "Save"}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <DeleteModal
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Permission"
        id={currentData.id}
        label={currentData.name}
        deleteFunction={userPermissionDelete}
      />
      <AddModal
        isOpen={isOpen}
        toggle={toggle}
        toggleModalClose={toggle}
        modalTitle={`${currentData ? "Edit Permission" : "Create a New Permission"
          }`}
        modalBody={addBrandForm}
        modalFooter={brandFooter}
        initialValues={{ name: currentData ? currentData.name : "" }}
        onSubmit={(values) => {
          {
            currentData && currentData.id
              ? userPermissionUpdate(currentData && currentData.id, values)
              : userPermissionCreate(values);
          }
        }}
        hideDefaultButtons
      />

      {/* /.page-heading */}
      <PageTitle
        label="Permission"
        buttonHandler={(e) => {
          toggle();
        }}
        buttonLabel="Add New"
        className={"pt-3"}
      />
      <div className="mt-4">
        <ReduxTable
          id="userPermission"
          showHeader
          searchPlaceholder="Search Permission"
          apiURL={`${endpoints().userPermissionAPI}/search`}
          newTableHeading
          onRowClick={(row) => {
            setCurrentData(row);
            setIsOpen(!isOpen);
          }}
          sortByOptions={sortByOption}
        >
          <ReduxColumn
            type="link"
            field="name"
            sortBy="name"
            isClickable="true"
          >
            Permission Name
          </ReduxColumn>
        </ReduxTable>
      </div>
    </>
  );
};
export default RolePermission;
