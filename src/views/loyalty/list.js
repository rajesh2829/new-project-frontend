import React, { useState, useEffect } from "react";

// Components
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import PageTitle from "../../components/PageTitle";
import DeleteModal from "../../components/DeleteModal";

//Config
import { endpoints } from "../../api/endPoints";

//AP Client
import MoreDropdown from "../../components/authentication/moreDropdown";
import { DropdownItem } from "reactstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AddCategoryModal from "./component/AddModal";
import LoyaltyCategoryService from "../../services/loyaltyCategoryService";
import { fetchList } from "../../actions/table";

const Category = (props) => {
  const [countryModalOpen, setCountryModalOpen] = useState();

  const [data, setData] = useState();

  const [deleteModal, setDeleteModal] = useState(false);

  const dispatch = useDispatch();

  let tab = props.match.params.tab;

  const sortByOption = [
    {
      value: "name",
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
    try {
      dispatch(LoyaltyCategoryService.delete(id, (res) => {
        if (res) {
          dispatch(
            fetchList(
              "loyaltyCategory",
              `${endpoints().loyaltyCategory}/search`,
              1,
              25,
              {}
            )
          );

        }

      }));
    } catch (err) { }
  };

  return (
    <>
      <AddCategoryModal
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
        title="Delete Category"
        id={data?.id}
        label={data?.name}
        deleteFunction={handledelete}
      />

      {/* /.page-heading */}
      <PageTitle
        label="Loyalty"
        buttonHandler={toggle}
        buttonLabel="Add New"
      />

      {/* Country list Table */}
      <ReduxTable
        id="loyaltyCategory"
        showHeader
        newTableHeading
        searchPlaceholder="Search"
        apiURL={`${endpoints().loyaltyCategory}/search`}
        sortByOptions={sortByOption}
        history={props.history}
        paramsToUrl={true}
        sortByDropdown
        showPageSize
      >
        <ReduxColumn
          field="name"
          sortBy="name"
          renderField={(row) => (
            <Link to={`/admin/settings/loyalty/${row.id}`}>{row.name}</Link>
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
                    setData(row);
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
export default Category;
