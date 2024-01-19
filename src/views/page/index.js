import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  DropdownItem,
} from "reactstrap";
import MoreDropdown from "../../components/authentication/moreDropdown";
import DeleteModal from "../../components/DeleteModal";
import PageTitle from "../../components/PageTitle";
// Components
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import Text from "../../components/Text";
//Config
import { endpoints } from "../../api/endPoints";
// Action
import AddModal from "../../components/Modal";
import Url from "../../components/Url";
import CompanyService from "../../services/CompanyService";
import PageService from "../../services/PageService";

const Page = props => {
  const { history } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [pageId, setPageId] = useState("");
  const [currentData, setCurrentData] = useState();
  const [portalUrl, setPortalUrl] = useState();
  const [url, setUrl] = useState();

  const sortByOption = [
    {
      value: "name:ASC",
      label: "Name"
    },
    {
      value: "updatedAt:DESC",
      label: "Most Recent"
    }
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    companyDetail();
  }, []);
  //Toggle
  const toggle = id => {
    if (id) {
      setPageId(id);
    } else if (!id) {
      setPageId("");
      setCurrentData("");
    }
    setIsOpen(!isOpen);
  };

  /**
   * Create Page
   *
   * @param data
   */
  const pageCreate = async (data, toggle) => {
    data.url = url;
    dispatch(await PageService.create(data, {}, toggle));

  };

  /**
   * Update Page
   *
   * @param data
   */
  const updatePageData = async (id, data) => {
    data.url = url;
    dispatch(await PageService.update(id, data, {}));
    toggle();
  };

  /**
   * Delete Page
   *
   * @param id
   */
  const pageDelete = id => {
    dispatch(PageService.delete(id, {}));
    history.push("/pages/pagelist");
    setIsDeleteModal(false);
  };

  const companyDetail = async () => {
    const response = await CompanyService.get();
    setPortalUrl(response.portal_url)
  }

  const handleChange = (e) => {
    setUrl(`${portalUrl}/page=${e.target.value}`)
  }

  const addPageForm = (
    <div className="mt-2 mb-3">
      <div>
        <Text
          name="name"
          label="Page Name"
          placeholder="Page Name..."
          error=""
          fontBolded
          onChange={(e) => { handleChange(e) }}
          required={true}
        />
      </div>
      <div>
        {pageId && <Url
          name="url"
          label="Page URL"
          placeholder="Enter Page URL..."
          required
        />}
      </div>
    </div>
  );

  const pageFooter = (
    <div className="container-fluid">
      <div className="col-sm-12 text-center">
        <Button
          type="submit"
          label=""
          className="ml-3 h6-5-important"
        >
          {pageId ? "Update" : "Create"} Page
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <DeleteModal
        isOpen={isDeleteModal}
        toggle={() => {
          setIsDeleteModal(false);
        }}
        title="Delete Portal"
        id={currentData && currentData.id}
        label={currentData && currentData.name}
        deleteFunction={pageDelete}
      />
      <AddModal
        isOpen={isOpen}
        toggle={toggle}
        toggleModalClose={toggle}
        modalTitle={`${pageId ? "Edit " : "Add"} Page`}
        modalBody={addPageForm}
        modalFooter={pageFooter}
        initialValues={{
          ...currentData,
          name: currentData && currentData.name ? currentData.name : "",
          url: currentData && currentData.url ? currentData.url : ""
        }}
        enableReinitialize={true}
        onSubmit={values => {
          pageId ? updatePageData(pageId, values) : pageCreate(values, toggle);
        }}
        hideDefaultButtons
      />
      {/* /.page-heading */}
      <PageTitle
        label="Pages"
        buttonHandler={e => {
          toggle();
        }}
        buttonLabel="Add New"
      />
      <div className="mt-4">
        <ReduxTable
          id="page"
          showHeader
          searchPlaceholder="Search"
          paramsToUrl={true}
          history={props.history}
          apiURL={`${endpoints().pageAPI}/search`}
          newTableHeading
          onRowClick={row => {
            history.push(`/pages/pagelist/detail/${row.id}`);
          }}
          sortByOptions={sortByOption}
        >
          <ReduxColumn
            type="link"
            field="name"
            sortBy="name"
            isClickable="true"
            width="150px"
          >
            Page Name
          </ReduxColumn>
          <ReduxColumn field="status" width="150px" disableOnClick>
            Status
          </ReduxColumn>
          <ReduxColumn
            field="Action"
            disableOnClick
            width="150px"
            renderField={row => (
              <div className="text-center action-group-dropdown">
                <MoreDropdown>
                  <DropdownItem
                    onClick={() => {
                      setCurrentData(row);
                      setPageId(row.id);
                      toggle(row.id);
                    }}
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    className="text-danger"
                    onClick={() => {
                      setCurrentData(row);
                      setPageId(row.id);
                      setIsDeleteModal(true);
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
      </div>
    </>
  );
};
export default Page;
