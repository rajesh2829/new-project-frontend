import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  TabContent,
  TabPane,
} from "reactstrap";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

// Components Base
import AddModal from "../../components/Modal";
import PageTitle from "../../components/PageTitle";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import Text from "../../components/Text";
import toast from "../../components/Toast";

// Configs
import { endpoints } from "../../api/endPoints";
// Helper
import { isLoggedIn } from "../../lib/Helper";
import Url from "../../lib/Url";

// Actions
import { fetchList } from "../../actions/table";
import { addProductCategory } from "../../actions/productCategory";

// Constant
import * as statusConstant from "../../components/constants/status";

// Api client
import { apiClient } from "../../apiClient";
import { isBadRequest } from "../../lib/Http";
import "../../scss/_custom.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { PAGE } from "../../helpers/Status";
export const Tab = { ALL: "All" };
const AllCategory = "allCategory";

const productCategory = (props) => {
  const {
    ActiveCurrentPage,
    ActiveCurrentPageSize,
  } = props;

  // To set the toggle Open/close in state
  const [isOpen, setIsOpen] = useState(false);

  // To set the active tab in state
  const [activeTab, setActiveTab] = useState(
    Tab.ALL
  );
  const [page, setPage] = useState(Url.GetParam("page"));


  // To use dispatch from useDispatch
  const dispatch = useDispatch();

  // Sort By Option Values
  const sortByOption = [
    {
      value: "name:ASC",
      label: "Name",
    },
    {
      value: "updatedAt:DESC",
      label: "Most recent",
    },
  ];

  // Toggle for add modal
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // Use Effect
  useEffect(() => {
    isLoggedIn();
  }, []);

  // Toggle tab for defining the selected category tab
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  // Handle status change for the selected category tab
  const _handleStatusChange = (tabStatus) => {
    props.history.push(`/categories?tab=${tabStatus}`);
  };

  /**
   * Add Product ProductCategory
   *
   * @param data
   */
  const productAdd = (values) => {
    const data = new FormData();
    data.append("name", values.name.trim() || "");
    dispatch(addProductCategory(data, toggle, {}, {}));
  };

  // To Update the Product ProductCategory status
  const updateProductCategoryStatus = (id, status) => {
    let data = {};
    data.status = status;
    apiClient
      .put(`${endpoints().categoryAPI}/status/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList("All", `${endpoints().categoryAPI}/search`, 1, 25, {
            search: Url.GetParam("search") || "",
          })
        );
      })
      .catch((error) => {
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          ActiveCurrentPage, ActiveCurrentPageSize;
          toast.error(error.response.data.message);
          console.error(errorMessage);
        }
      });
  };

  // Add Product ProductCategory Form in Add modal
  const addProductCategoryForm = (
    <Text label="Name" name="name" placeholder="Name" required />
  );

  // Product ProductCategory Footer for Add Modal
  const productCategoryFooter = <Button type="submit">Add</Button>;

  const statusOptions = [
    {
      value: statusConstant.ACTIVE,
      label: statusConstant.ACTIVE,
    },
    {
      value: statusConstant.IN_ACTIVE,
      label: statusConstant.IN_ACTIVE,
    },
    {
      value: "",
      label: statusConstant.ALL,
    },
  ];

  return (
    <>
      {/* Page Title */}
      <PageTitle
        label="Categories"
        buttonHandler={(_e) => {
          toggle();
        }}
        buttonLabel="Add New"
      />

      {/* Add Modal */}
      <AddModal
        isOpen={isOpen}
        toggle={toggle}
        toggleModalClose={toggle}
        modalTitle="Add Category"
        modalBody={addProductCategoryForm}
        modalFooter={productCategoryFooter}
        initialValues={{ name: "" }}
        onSubmit={(values) => {
          productAdd(values);
        }}
        hideDefaultButtons
      />

      {/* / To render the ProductCategory table */}
      <TabContent activeTab={activeTab}>
        <TabPane tabId={Tab.ALL} className="w-100">
          <div className="mt-4">
            <ReduxTable
              id="AllCategory"
              showHeader
              newTableHeading
              searchPlaceholder="Search Categories..."
              apiURL={`${endpoints().categoryAPI}/search`}
              sortByOptions={sortByOption}
              onRowClick
              history={props.history}
              statusOptions={statusOptions}
              showStatusOptions={true}
              params={{
                tab: Tab.ALL,
                page: page ? page : PAGE
              }}
              paramsToUrl={true}
              icon={<FontAwesomeIcon icon={faLayerGroup} />}
              message="You can start by clicking on Add New"
              setPage={setPage}

            >
              <ReduxColumn
                field="name"
                width={"550px"}
                minWidth="550px"
                maxWidth="550px"
                type="link"
                isClickable="true"
                sortBy="name"
                renderField={(row) => (
                  <Link to={`/category/${row.id}`}>{row.name}</Link>
                )}
              >
                Name
              </ReduxColumn>

              <ReduxColumn
                field="status"
                width={"120px"}
                minWidth="120px"
                maxWidth="120px"
                sortBy="status"
                renderField={(row) => (
                  <div
                    className={`status-input text-center rounded text-white fw-600 custom-font-size text-uppercase mx-auto ${row.status && row.status === "Active"
                      ? "bg-success"
                      : row.status === "InActive"
                        ? "bg-secondary"
                        : ""
                      }`}
                  >
                    <p>{row.status}</p>
                  </div>
                )}
              >
                Status
              </ReduxColumn>
            </ReduxTable>
          </div>
        </TabPane>
      </TabContent>
    </>
  );
};

// Map Dispatch to props
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch),
  };
}

// Map State to props
const mapStateToProps = (state) => {
  const { customer } = state.table;
  const reduxTable = state.table;

  const AllCount =
    reduxTable[AllCategory] && reduxTable[AllCategory].isFetching == false
      ? reduxTable[AllCategory].totalCount
      : 0;
  const sort =
    customer && !customer.isFetching ? customer.sort : statusConstant.SORT;

  const sortDir =
    customer && !customer.isFetching
      ? customer.sortDir
      : statusConstant.SORT_DIR;

  const pageSize =
    customer && !customer.isFetching
      ? customer.pageSize
      : statusConstant.PAGESIZE;

  const currentPage =
    customer && !customer.isFetching
      ? customer.currentPage
      : statusConstant.PAGE;

  const search = customer && !customer.isFetching ? customer.search : "";

  const status =
    customer && !customer.isFetching ? customer.status : statusConstant.ACTIVE;


  return {
    sort,
    sortDir,
    pageSize,
    currentPage,
    search,
    status,
    AllCount,

  };
};

export default connect(() => {
  return mapStateToProps;
}, mapDispatchToProps)(productCategory);
