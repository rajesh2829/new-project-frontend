import React, { useState } from "react";

// Components
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import { endpoints } from "../../../api/endPoints";
import DeleteModal from "../../../components/DeleteModal";
import CountryService from "../../../services/CountryService";
import MoreDropdown from "../../../components/authentication/moreDropdown";
import { DropdownItem } from "reactstrap";
import Spinner from "../../../components/Spinner";

const StateList = (props) => {
  let { countryId } = props;
  const [selectedState, setSelectedState] = useState();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const closeDeleteModal = () => {
    //close modal
    setOpenDeleteModal(!openDeleteModal);
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    await CountryService.stateDelete(id, selectedState.country_id);
    setIsLoading(false);
  };

  if (isLoading) {
    return <Spinner />
  }


  const sortOptions = [
    {
      value: "name:ASC",
      label: "Name",
    },
    {
      value: "id:DESC",
      label: "Most Recent",
    },
  ];

  return (
    <>
      <DeleteModal
        isOpen={openDeleteModal}
        label={selectedState?.name}
        toggle={closeDeleteModal}
        title="Delete State"
        deleteFunction={() => handleDelete(selectedState?.id)}
      />
      {/* Table */}
      <ReduxTable
        id="stateList"
        newTableHeading
        showHeader
        sortByOptions={sortOptions}
        searchPlaceholder="Search"
        apiURL={`${endpoints().countryAPI}/${countryId}`}
        params={{
          stateList: true,
          pagination: true,
        }}
      >
        <ReduxColumn field="name">State Name</ReduxColumn>
        <ReduxColumn
          field="Action"
          disableOnClick
          width="170px"
          renderField={(row) => (
            <>
              <div className="d-flex justify-content-center align-items-center row">
                <div className="text-dark landing-group-dropdown">
                  <MoreDropdown>
                    <DropdownItem
                      className=" text-danger cursor-pointer"
                      onClick={() => {
                        setOpenDeleteModal(true);
                        setSelectedState(row);
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
    </>
  );
};

export default StateList;
