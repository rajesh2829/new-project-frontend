import React, { useState, useEffect } from "react";

// Components
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import AddCountryModal from "./AddModal";
import PageTitle from "../../../components/PageTitle";
import DeleteModal from "../../../components/DeleteModal";

//Config
import { endpoints } from "../../../api/endPoints";

//AP Client
import MoreDropdown from "../../../components/authentication/moreDropdown";
import { DropdownItem } from "reactstrap";
import { useDispatch } from "react-redux";
import { deleteCountry } from "../../../actions/country";
import { Link } from "react-router-dom";

const Country = (props) => {
  const [countryModalOpen, setCountryModalOpen] = useState();

  const [countryData, setCountryData] = useState();

  const [deleteModal, setDeleteModal] = useState(false);

  const dispatch = useDispatch();

  const sortByOption = [
    {
      value: "country_name",
      label: "Name",
    },
    {
      value: "id:DESC",
      label: "Most Recent",
    },
  ];

  const toggle = () => {
    setCountryModalOpen(!countryModalOpen);
  };

  const handledelete = (id) => {
    dispatch(deleteCountry(id, {}));
  };

  return (
    <>
      {/* Add Scheduler Modal */}
      <AddCountryModal
        toggle={toggle}
        isOpen={countryModalOpen}
        onModalClose={toggle}
        hideDefaultButtons
      />

      <DeleteModal
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Country"
        id={countryData?.id}
        label={countryData?.name}
        deleteFunction={handledelete}
      />

      {/* /.page-heading */}
      <PageTitle
        label="Countries"
        buttonHandler={toggle}
        buttonLabel="Add New"
      />

      {/* Redux table*/}
      {/* Country list Table */}
      <ReduxTable
        id="country"
        showHeader
        newTableHeading
        searchPlaceholder="Search"
        apiURL={`${endpoints().countryAPI}/search`}
        sortByOptions={sortByOption}
        history={props.history}
        paramsToUrl={true}
        sortByDropdown
        showPageSize
      >
        <ReduxColumn field="name" sortBy="country_name"

          renderField={(row) => (
            <Link to={`/admin/settings/country/${row.id}`}>{row.name}</Link>
          )}
        >
          Name
        </ReduxColumn>
        <ReduxColumn
          field="Action"
          disableOnClick
          renderField={(row) => (
            <div className="text-center action-group-dropdown">
              <MoreDropdown>
                <DropdownItem
                  className="text-danger"
                  onClick={() => {
                    setCountryData(row);
                    setDeleteModal(true);
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
export default Country;
