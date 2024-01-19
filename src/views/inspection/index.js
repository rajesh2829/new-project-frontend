import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DropdownItem } from "reactstrap";
import { endpoints } from "../../api/endPoints";
import DeleteModal from "../../components/DeleteModal";
import AddModal from "../../components/Modal";
import PageTitle from "../../components/PageTitle";
import SelectStore from "../../components/SelectStore";
import MoreDropdown from "../../components/authentication/moreDropdown";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import InspectionService from "../../services/InspectionService";
import TagSelect from "../../components/TagSelect";
import SaveButton from "../../components/SaveButton";


const Forms = (props) => {

  const [addModalOpen, setAddModalOpen] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedRow, setSelectedRow] = useState("");

  const [isSubmit, setIsSubmit] = useState(true);

  const dispatch = useDispatch();

  const { history } = props;

  const sortOptions = [
    {
      value: "id:DESC",
      label: "Most Recent",
    },
    {
      value: "location:ASC",
      label: "Location",
    },
  ];

  const inspectionForm = (
    <>
      <TagSelect
        name="type"
        label="Type"
        placeholder="Type"
        params={{ type: "Custom Field" }}
      />

      <SelectStore
        label="Location"
        name="store_id"
        required={true}
      />
    </>
  );

  const inspectionFormFooter = (
    <>
      <div className="container-fluid">
        <div className="col-sm-12 text-center">
          <SaveButton type="submit" label="Add" loading={isSubmit == false} className="h6-5-important" />
        </div>
      </div>
    </>
  );

  const AddNewInspection = () => {
    setAddModalOpen(true);
    setIsSubmit(true)
  }

  const toggle = () => {
    setAddModalOpen(false);
    setIsSubmit(true)
  }

  const handleSubmit = async (values) => {
    try {
      setIsSubmit(true)
      let bodyData = {
        storeId: values && values.store_id && values.store_id.value,
        tagId: values && values.type && values.type.value,
      }
      dispatch(await InspectionService.create(bodyData, {}, () => { toggle() }));
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmit(false)
    }
  }

  const deleteInspection = async () => {
    if (selectedRow) {
      dispatch(InspectionService.delete(selectedRow.id, {}, () => {
        setDeleteModalOpen(false);
        setSelectedRow("");
      }));
    }
  }

  return (
    <div>
      <AddModal
        isOpen={addModalOpen}
        toggle={toggle}
        toggleModalClose={toggle}
        modalTitle="Add Inspection"
        initialValues={{
          type: "",
          store_id: ""
        }}
        modalBody={inspectionForm}
        modalFooter={inspectionFormFooter}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        hideDefaultButtons
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        title="Delete Inspection"
        label={selectedRow && selectedRow?.location}
        toggle={() => {
          setDeleteModalOpen(false);
        }}
        deleteFunction={() => deleteInspection()}
      />

      <div className="pb-4">
        <PageTitle
          label="Inspections"
          buttonLabel="Add New"
          buttonHandler={(_e) => {
            AddNewInspection();
          }}
        />
      </div>

      <ReduxTable
        id="inspections"
        showHeader
        newTableHeading
        apiURL={`${endpoints().inspectionAPI}/search`}
        sortByOptions={sortOptions}
        message="You can start by clicking Add New"
        paramsToUrl={true}
        params={{}}
        history={history}
        searchPlaceholder="Search"
      >
        <ReduxColumn field="locationName" sortBy="location"
          className="text-center"
          renderField={(row) => (
            <Link to={`/inspections/detail/${row.id}?tagId=${row.tag_id}&location=${row.locationName}`}>{row.locationName}</Link>
          )}
        >
          Location
        </ReduxColumn>
        <ReduxColumn field="typeName" sortBy="type"
          className="text-center"
        >
          Type
        </ReduxColumn>
        <ReduxColumn field="ownerName" sortBy="owner"
          className="text-center"
        >
          Owner
        </ReduxColumn>
        <ReduxColumn field="createdAt" sortBy="createdAt"
          className="text-center"
        >
          CreatedAt
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
                      className=" text-danger cursor-pointer"
                      onClick={() => {
                        setDeleteModalOpen(true);
                        setSelectedRow(row);
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
      </ReduxTable>
    </div>
  );
};

export default Forms;
