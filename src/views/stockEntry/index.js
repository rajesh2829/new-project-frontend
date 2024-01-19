import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchList } from "../../actions/table";
import "../../scss/_custom.scss";

// Components
import AddModal from "../../components/Modal";
import PageTitle from "../../components/PageTitle";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import { deleteStockEntry } from "../../actions/stockEntry";
import { endpoints } from "../../api/endPoints";
import { apiClient } from "../../apiClient";
import {
  faBoxesPacking
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { Link } from "react-router-dom";
import {
  DropdownItem,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import CountBadge from "../../components/CountBadge";
import DeleteModal from "../../components/DeleteModal";
import SaveButton from "../../components/SaveButton";
import SelectStore from "../../components/SelectStore";
import StatusText from "../../components/StatusText";
import MoreDropdown from "../../components/authentication/moreDropdown";
import ObjectName from "../../helpers/ObjectName";
import Permission from "../../helpers/Permission";
import * as location from "../../helpers/StoreList";
import DateTime from "../../lib/DateTime";
import { isLoggedIn } from "../../lib/Helper";
import Url from "../../lib/Url";
import StatusService from "../../services/StatusService";
import StockEntryService from "../../services/StockEntryService";
import { hasPermission } from "../../services/UserRolePermissionService";
import CompanyUserService from "../../services/UserService";
import StockEntryDetailPage from "./stockEntryDetailPage";
import StockEntryProductService from "../../services/StockProductEntryService";
import { HttpStatus } from "../../helpers/HttpStatus";
import AvatarCard from "../../components/AvatarCard";

let stockEntrys = "stockEntry";

export const Tabs = {
  ACTIVE: "Active",
  ALL: "All",
  DRAFT: "Draft",
  COMPLETED: "Completed",
  STOCK_ENTRY: "Stock Entry",
  STOCK_ENTRY_PRODUCT: "Stock Entry Product",
};

const StockEntry = (props) => {
  const [StockEntry, setStockEntry] = useState();

  const [isDeleteModel, setIsDeleteModel] = useState(false);

  const [currentData, setCurrentData] = useState();

  const [storeModalOpen, setStoreModalOpen] = useState(false);

  const [storeList, setStoreList] = useState([]);

  const [ownerValue, setownerValue] = useState();

  const [StockOwner, setStockOwner] = useState();

  const [statusList, setStatusList] = useState([]);

  const [selectedProducts, setSelectedProduct] = useState([]);

  const [PermissionList, setPermissionList] = useState();

  const [statusDropdownList, setStatus] = useState([]);


  const [selectedCheckBox, setSelectedCheckBox] = useState(true);

  const [isLoading, setIsLoading] = useState(false);


  const [activeTab, setActiveTab] = useState(
    Url.GetParam("tab") || Tabs.STOCK_ENTRY
  );

  const { history } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    isLoggedIn();
    getStoreList();
    getUserDetail();
    getUserRoleValue();
    getRolePermission();
    getStatus()
  }, []);

  //   Get Status List
  const getStatusList = async (currentStatusId) => {
    let lists = [];

    if (currentStatusId) {
      const data = await StatusService.nextStatusSearch(
        ObjectName.STOCK_ENTRY_PRODUCT,
        currentStatusId,
      );

      if (data && data.length > 0) {
        setStatusList(data);
      }
    } else {
      const statusLists = await StatusService.search(
        ObjectName.STOCK_ENTRY_PRODUCT,
      );

      if (statusLists && statusLists.length > 0) {
        statusLists.forEach((statusList) => {
          lists.push({
            value: statusList.id,
            label: statusList.name,
            sort_order: statusList.sort_order
          });
        });

        setStatus(lists);
      }
    }
  };

  //   Get Status List
  const getStatus = async () => {
    let lists = [];
    const statusLists = await StatusService.search(
      ObjectName.STOCK_ENTRY_PRODUCT,
    );
    if (statusLists && statusLists.length > 0) {
      statusLists.forEach((statusList) => {
        lists.push({
          value: statusList.id,
          label: statusList.name,
          sort_order: statusList.sort_order
        });
      });

      setStatus(lists);
    }
  };

  //Sort By Option Values
  const sortByOption = [
    {
      value: "id:DESC",
      label: "Most Recent",
    },
    {
      value: "date:ASC",
      label: "Date",
    },
  ];

  const getRolePermission = async () => {
    const statusPermission = hasPermission(Permission.STOCK_ENTRY_MANAGE_OTHERS)
    setPermissionList(statusPermission);
  };

  const StoreSelectModal = () => {
    setStoreModalOpen(!storeModalOpen);
  };

  const getUserDetail = async () => {
    try {
      let response = await CompanyUserService.search();
      const createdBy = response.id;
      setStockOwner(createdBy);
    } catch (error) {
      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        console.error(errorMessage);
      }
    }
  };

  const getUserRoleValue = async () => {
    const userRole = await CompanyUserService.list();
    const data = [];
    userRole &&
      userRole.length > 0 &&
      userRole.forEach((list) => {
        data.push({
          label: list.first_name,
          value: list.id,
        });
      });
    setownerValue(data);
  };

  const getStoreList = async () => {
    try {
      //create new array for location list

      //get location list
      let response = await apiClient.get(`${endpoints().locationAPI}/search`);
      let lists = [];
      let stores = response.data.data;
      if (stores && stores.length > 0) {
        stores.forEach((storesList) => {
          storesList.status == location.ACTIVE_STORE_TAB &&
            lists.push({
              id: storesList.id,
              value: storesList.id,
              label: storesList.name,
            });
        });
      }
      setStoreList(lists);
      if (lists && lists.length > 0) return lists;
    } catch (err) { }
  };

  const AddStockEntry = (values) => {
    try {
      //create stock entry data
      let stockEntryData = new Object();

      let storeId = values.location.value;

      stockEntryData.storeId = values && values.location && values.location.value;

      stockEntryData.owner_id = StockOwner;

      stockEntryData.storeProductId =
        values && values.storeProduct && values.storeProduct.value;

      stockEntryData.quantity = values.quantity;

      let params = { pagination: true };
      //add new stock entry
      dispatch(
        StockEntryService.create(stockEntryData, params, (response) => {
          //validate response exist or not
          if (response && response.stockEntryDetails) {
            //get stock entry details
            let stockEntryDetails = response.stockEntryDetails;
            //validate stock entry details exist or not
            if (stockEntryDetails) {
              history.push(`/stockEntry/${stockEntryDetails.id}`);
            }
          }
        })
      );
    } catch (err) { }
  };

  const addStoreForm = (
    <SelectStore
      name="location"
      label="Location"
      placeholder="Select Location"
      required
    />
  );

  const addStoreFooter = (
    <div className="container-fluid">
      <div className="col-sm-12 text-center">
        <SaveButton
          type="submit"
          label="Next"
          className="ml-3 h6-5-important"
        />
      </div>
    </div>
  );

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const BulkSelect = (selectedProducts) => {
    setSelectedProduct(selectedProducts)
  }

  const handleChange = (value) => {
    setIsLoading(true)
    if (selectedProducts && selectedProducts.length > 0) {
      let body = { selectedIds: selectedProducts, status: value }
      dispatch(StockEntryProductService.updateStatus(body,
        {
          sort: "id",
          sortDir: "DESC",
          search: Url.GetParam("search") || "",
          page: Url.GetParam("page") || "",
          pageSize: Url.GetParam("pageSize") || "",
          brand: Url.GetParam("brand"),
          category: Url.GetParam("category"),
          stockEntryProductType: Url.GetParam("stockEntryProductType"),
          location: Url.GetParam("location"),
          productTag: Url.GetParam("productTag"),
          startDate: Url.GetParam("startDate"),
          endDate: Url.GetParam("endDate"),
          status: Url.GetParam("status"),
        }, (res) => {
          if (res.status == HttpStatus.OK) {
            setIsLoading(false)
            setSelectedCheckBox(false)
            setSelectedCheckBox(true)
          }
        }));

    }
  }

  const _handleStatusChange = (tabStatus) => {
    props.history.push(`/stockEntry?tab=${tabStatus}&&startDate=${DateTime.getToday()}&&endDate=${DateTime.getToday()}`);
  };

  const sample = (id) => {
    dispatch(
      deleteStockEntry(
        id,
        {
          pagination: true,
          sort: "id",
          sortDir: "DESC",
          search: Url.GetParam("search") || "",
          page: Url.GetParam("page") || "",
          pageSize: Url.GetParam("pageSize") || "",
        },
        props.stockEntryCurrentpage,
        props.stockEntryPageSize
      )
    );
    setIsDeleteModel(false);
  };

  return (
    <>
      <DeleteModal
        isOpen={isDeleteModel}
        toggle={() => {
          setIsDeleteModel(false);
        }}
        title="Stock Entry"
        label={currentData?.stock_entry_number}
        deleteFunction={() => sample(currentData?.id)}
      />

      <AddModal
        isOpen={storeModalOpen}
        toggle={StoreSelectModal}
        toggleModalClose={StoreSelectModal}
        modalTitle="Select Location"
        modalBody={addStoreForm}
        modalFooter={addStoreFooter}
        hideDefaultButtons
        buttonLobel={"Add"}
        onSubmit={AddStockEntry}
        showAddButton={true}
        initialValues={{
          location: "",
        }}
      />

      <PageTitle
        label="Stock Entry"
        dropdownLinks={activeTab === Tabs.STOCK_ENTRY_PRODUCT ? statusDropdownList : null}
        handleChange={handleChange}
        buttonHandler={(_e) => {
          StoreSelectModal();
        }}
        buttonLabel="Add New"
        actionLabel="Status"
      />

      <Nav tabs className="admin-tabs mb-1">
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tabs.STOCK_ENTRY,
            })}
            onClick={() => {
              toggleTab(Tabs.STOCK_ENTRY);
              _handleStatusChange(Tabs.STOCK_ENTRY);
            }}>
            Stock Entry
            <CountBadge count={props.stockEntryCount} />
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tabs.STOCK_ENTRY_PRODUCT,
            })}
            onClick={() => {
              toggleTab(Tabs.STOCK_ENTRY_PRODUCT);
              _handleStatusChange(Tabs.STOCK_ENTRY_PRODUCT);
            }}>
            Stock Entry Products
            <CountBadge count={props.stockEntryProductCount} />
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        {/* Stock Entry Tab */}
        {activeTab == Tabs.STOCK_ENTRY && (
          <TabPane tabId={Tabs.STOCK_ENTRY}>
            <div className="tab-content-wrapper">
              <div className="mt-4">
                <ReduxTable
                  id="stockEntry"
                  newTableHeading
                  searchPlaceholder="Search Stock Entry"
                  icon={<FontAwesomeIcon icon={faBoxesPacking} />}
                  apiURL={`${endpoints().stockEntry}/search`}
                  history={history}
                  sortByOptions={sortByOption}
                  paramsToUrl={true}
                  showHeader
                  params={{
                    objectName: ObjectName.STOCK_ENTRY,
                    sort: Url.GetParam("sort")
                      ? Url.GetParam("sort")
                      : "id",
                    sortDir: Url.GetParam("sortDir")
                      ? Url.GetParam("sortDir")
                      : "DESC",
                  }}
                  showDateFilter
                  showStoreFilter
                  showUserFilter
                  showStatusFilter>
                  <ReduxColumn
                    className="text-center"
                    field="stock_entry_number"
                    sortBy="stock_entry_number"
                    isClickable="true"
                    type="link"
                    width="110px"
                    maxWidth="110px"
                    minWidth="110px"
                    renderField={(row) => (
                      <Link to={`/stockEntry/${row.id}`}>
                        {row.stock_entry_number}
                      </Link>
                    )}>
                    Stock Entry#
                  </ReduxColumn>
                  <ReduxColumn
                    sortBy="date"
                    width="110px"
                    maxWidth="110px"
                    minWidth="110px"
                    className="text-center"
                    renderField={(row) => (
                      <span>{DateTime.getDate(row.date)}</span>
                    )}>
                    Date
                  </ReduxColumn>
                  <ReduxColumn
                    field="location"
                    sortBy="location"
                    width="110px"
                    maxWidth="110px"
                    minWidth="110px">
                    Location
                  </ReduxColumn>
                  <ReduxColumn
                    field="productCount"
                    sortBy="productCount"
                    width="110px"
                    maxWidth="110px"
                    minWidth="110px"
                    className="text-center">
                    Product Count
                  </ReduxColumn>
                  {PermissionList && (
                    <ReduxColumn
                      renderField={(row) => (
                        <>
                          <div className="d-flex text-break">
                            <AvatarCard
                              id="avatar"
                              firstName={row.owner_first_name}
                              lastName={row.owner_last_name}
                              url={row.media_url}
                            />
                          </div>
                        </>
                      )}
                    >
                      Owner
                    </ReduxColumn>
                  )}
                  <ReduxColumn
                    field="status"
                    width="110px"
                    maxWidth="110px"
                    minWidth="110px"
                    renderField={(row) => (
                      <StatusText backgroundColor={row.statusColor} status={row.status} />
                    )}>
                    Status
                  </ReduxColumn>
                  <ReduxColumn
                    field="Action"
                    width="110px"
                    maxWidth="110px"
                    minWidth="110px"
                    className="text-center"
                    disableOnClick
                    renderField={(row) => (
                      <div className="">
                        <MoreDropdown
                          onClick={() => {
                            setStatusList([]);
                            getStatusList(row.statusId);
                          }}>
                          {statusList &&
                            statusList.length > 0 &&
                            statusList.map((data) => {
                              return (
                                <DropdownItem
                                  onClick={() => {
                                    dispatch(
                                      StockEntryService.updateStatus(
                                        row.id,
                                        data.value,
                                        {
                                          pagination: true,
                                          sort: "id",
                                          sortDir: "DESC",
                                          search: Url.GetParam("search") || "",
                                          page: Url.GetParam("page") || "",
                                          pageSize:
                                            Url.GetParam("pageSize") || "",
                                          location: Url.GetParam("location") || "",
                                          status: Url.GetParam("status") || "",
                                          user: Url.GetParam("user") || "",
                                          startDate: Url.GetParam("startDate"),
                                          endDate: Url.GetParam("endDate")
                                        },
                                        props.stockEntryCurrentpage,
                                        props.stockEntryPageSize
                                      )
                                    );
                                  }}>
                                  {data.label}
                                </DropdownItem>
                              );
                            })}
                        </MoreDropdown>
                      </div>
                    )}>
                    Action
                  </ReduxColumn>
                </ReduxTable>
              </div>
            </div>
          </TabPane>
        )}

        {/* Stock Entry Product Tab */}
        {activeTab == Tabs.STOCK_ENTRY_PRODUCT && (
          <TabPane tabId={Tabs.STOCK_ENTRY_PRODUCT}>
            <StockEntryDetailPage
              history={props.history}
              BulkSelect={BulkSelect}
              selectedCheckBox={selectedCheckBox}
              isLoading={isLoading} />
          </TabPane>
        )}
      </TabContent>
    </>
  );
};

function mapStateToProps(state) {
  const reduxTable = state.table;
  // Get Published products count
  const stockEntryCount =
    reduxTable[Tabs.ORDER] && reduxTable[Tabs.ORDER].isFetching == false
      ? reduxTable[Tabs.ORDER].totalCount
      : 0;

  const stockEntryProductCount =
    reduxTable["stockEntryProduct"] &&
      reduxTable["stockEntryProduct"].isFetching == false
      ? reduxTable["OrderProduct"].totalCount
      : 0;
  const stockEntryCurrentpage =
    reduxTable[stockEntrys] && reduxTable[stockEntrys].isFetching == false
      ? reduxTable[stockEntrys].currentPage
      : 1;
  const stockEntryPageSize =
    reduxTable[stockEntrys] && reduxTable[stockEntrys].isFetching == false
      ? reduxTable[stockEntrys].pageSize
      : 25;
  // Get Draft Products count
  return {
    stockEntryCount,
    stockEntryProductCount,
    stockEntryCurrentpage,
    stockEntryPageSize,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StockEntry);
