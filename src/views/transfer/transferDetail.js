import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import Form from "../../components/Form";

// Components
import Action from "../../components/Action";
import ActivityList from "../../components/ActivityList";
import BreadCrumb from "../../components/Breadcrumb";
import CancelButton from "../../components/CancelButton";
import DefaultContent from "../../components/content/defaultContent";
import DateSelector from "../../components/Date";
import PageTitle from "../../components/PageTitle";
import SaveButton from "../../components/SaveButton";
import Select from "../../components/Select";
import ObjectName from "../../helpers/ObjectName";
import TransferProduct from "./detail";

// Action
import { endpoints } from "../../api/endPoints";
import { apiClient } from "../../apiClient";
import { getStoresList } from "../../services/StoreListService";

//  Lib
import CsvDownload from "react-csv-downloader";
import { connect, useDispatch } from "react-redux";
import DeleteModal from "../../components/DeleteModal";
import Notes from "../../components/Notes";
import Permission from "../../helpers/Permission";
import Urls from "../../helpers/Url";
import ArrayList from "../../lib/ArrayList";
import Url from "../../lib/Url";
import TransferTypeService from "../../services/TransferTypeService";
import Print from "./Components/print";

import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectStore from "../../components/SelectStore";
import Spinner from "../../components/Spinner";
import Status from "../../components/Status";
import UserSelect from "../../components/UserSelect";
import DateTime from "../../lib/DateTime";
import TransferService from "../../services/TransferService";
import { hasPermission } from "../../services/UserRolePermissionService";
import CountBadge from "../../components/CountBadge";
import { bindActionCreators } from "redux";
import { fetchList } from "../../actions/table";
import Button from "../../components/Button";
import ReplenishList from "./Components/replenishList";
import { Group } from "../../helpers/Status";

export const Tab = {
  SUMMARY: "Summary",
  PRODUCTS: "Products",
  HISTORY: "History",
  REPLENISH: "Replenish"
};

const TransferDetails = (props) => {
  const [activeTab, setActiveTab] = useState(
    Url.GetParam("tAB") || Tab.SUMMARY
  );
  const [detail, setDetail] = useState();
  const [store, setStore] = useState([]);
  const [status, setStatus] = useState();
  const [PermissionList, setPermissionList] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [productDetail, setProductDetail] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [transferType, setTransferType] = useState([]);
  const dispatch = useDispatch();
  const [values, setValues] = useState();
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [editable, setEditable] = useState(true)


  let fromLocationId = props.match.params.fromLocationId;
  let toLocationId = props.match.params.toLocationId;
  let tansferId = props.match.params.id;

  let showHistory = hasPermission(Permission.TRANSFER_HISTORY_VIEW);
  let showEditButton = hasPermission(Permission.TRANSFER_EDIT);
  useEffect(() => {
    storeList();
    getDetails();
    getRolePermissions();
    getProductList();
    getType();
  }, []);

  const getType = async () => {
    const list = await TransferTypeService.search();
    setTransferType(list);
  };

  const toggle = (tab) => {
    setActiveTab(tab);
  };

  // ToGet ID
  const id = props.match.params.id;

  const _handleTabChange = (tab) => {
    props.history.push(`?tab=${tab}`);
  };

  // Get Product list in Transfer detail
  const getProductList = async () => {
    setIsLoading(true);
    let transferId = props.match.params.id;
    let productList = [];
    const response = await apiClient.get(
      `${endpoints().transferProductApi
      }/search?transferId=${transferId}&pagination=${false}`
    );
    const productDetails = response.data.data;
    if (productDetails) {
      productDetails.forEach((product) => {
        productList.push({
          product_name: product.product_name,
          quantity: product.quantity,
          status: product.status,
          productImage: product.image,
          size: product.size,
          unit: product.unit,
          brandName: product.brand_name,
          mrp: product.mrp,
          salePrice: product.sale_price
        });
      });
    }
    setProductDetail(productList);
    setIsLoading(false);
  };

  // Bread crumb list
  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    {
      label: "Transfers",
      link: Urls.TRANSFER_LIST
    },
    {
      label: activeTab,
      link: ""
    }
  ];

  const actionOptions = [
    {
      label: "Export",
      value: "Export"
    },
    {
      label: "Print",
      value: "Print"
    },
    {
      label: "Clone",
      value: "Clone"
    },
    {
      label: "Delete",
      value: "Delete"
    }
  ];

  //  Get Transfer Details
  const getDetails = async () => {
    setIsDetailLoading(true);
    const response = await TransferService.get(tansferId);
    setDetail(() => response.data);
    setIsDetailLoading(false);
  };

  //  Get Store List
  const storeList = async () => {
    try {
      let storeListArray = [];
      const stores = await getStoresList();
      if (ArrayList.isNotEmpty(stores)) {
        stores.forEach((store) => {
          storeListArray.push({
            id: store.id,
            label: store.label,
            value: store.label
          });
        });
      }
      setStore(storeListArray);
    } catch (err) {
      console.log(err);
    }
  };


  const deleteTransfer = async (id) => {
    dispatch(await TransferService.delete(id));
    props.history.push("/transfers");
  };

  // Handle form Submit
  const submit = async (values) => {
    try {
      const data = new FormData();
      data.append("fromLocationId", values?.fromLocation?.id);
      data.append("toLocationId", values?.toLocation?.id);
      data.append("date", values?.date ? DateTime.toISOStringDate(values?.date) : "");
      data.append("due_date", values?.due_date ? DateTime.toISOStringDate(values?.due_date) : "");
      data.append("type", values?.type?.value);
      data.append("notes", values?.notes);
      data.append("owner", values?.owner?.id);
      dispatch(await TransferService.update(tansferId, data));
      setEditable(true)
    } catch (err) {
      console.log(err);
      setEditable(true)
    }
  };

  const handleChange = async (e) => {
    if (e == "Export") {
      document.getElementById("csvDownload").click();
    }
    if (e == "Print") {
      document.getElementById("Print").click();
    }
    if (e == "Clone") {
      dispatch(
        await TransferService.clone(tansferId, (res) => {
          if (res) {
            props.history.push(`/transfers`);
          }
        })
      );
    }

    if (e == "Delete") {
      setDeleteModal(true);
    }
  };

  const handleChangeStatus = async (selectStatus) => {
    const data = {};
    data.status = selectStatus;
    dispatch(
      await TransferService.updateStatus(
        props.match.params.id,
        data,
        getDetails
      )
    );
  };

  //Get Role Permission
  const getRolePermissions = async () => {
    const statusPermission = hasPermission(Permission.TRANSFER_STATUS);
    setPermissionList(statusPermission);
  };

  if (isLoading || isDetailLoading) {
    return <Spinner />;
  }

  return (
    <>
      <DeleteModal
        id={detail?.id}
        label={detail?.transfer_number}
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Transfer"
        deleteFunction={() => deleteTransfer(detail?.id)}
      />
      <BreadCrumb list={breadcrumbList} />

      <div className="d-flex justify-content-between">
        <PageTitle
          label={`Transfer# ${detail?.transfer_number} (${detail?.from_location_name} -->  ${detail?.to_location_name}  )`}
        />
        <div className="pl-5">
          <div className="ml-3 d-none" id="print">
            {/* Csv Export */}
            <CsvDownload
              filename="transferProducts.csv"
              id="csvDownload"
              extension=".csv"
              datas={productDetail}
              text={
                <span href="#">
                  {/* <IconDownload /> */}
                  <FontAwesomeIcon icon={faDownload} />
                  <span>Export</span>
                </span>
              }
            />
            <Print
              id="print"
              productDetail={productDetail}
              fromLocationName={detail?.from_location_name}
              toLocationName={detail?.to_location_name}
              transferDate={detail?.date}
            />
          </div>
        </div>
        <div className="d-flex justify-content-between">
          {showEditButton && editable && (
            <Button
              label="Edit"
              loadingLabel="Editable"
              className="mr-1"
              disabled={editable == false ? true : false}
              onClick={() => {
                setEditable(false);
              }}
            />
          )}
          <Status
            objectName={ObjectName.TRANSFER}
            handleChange={handleChangeStatus}
            buttonLabel={detail?.status}
            currentStatusId={detail?.statusId}
            allowed_statuses={detail?.allowed_statuses}
          />
          <div className="ml-3">
            <Action dropdownLinks={actionOptions} handleChange={handleChange} />
          </div>
        </div>
      </div>
      <Nav tabs className="admin-tabs mb-1">
        {/* SUMMARY Tab */}
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tab.SUMMARY
            })}
            onClick={() => {
              toggle(Tab.SUMMARY);
              _handleTabChange(Tab.SUMMARY);
            }}>
            Summary
          </NavLink>
        </NavItem>

        {/* PRODUCT tab */}
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tab.PRODUCTS
            })}
            onClick={() => {
              toggle(Tab.PRODUCTS);
              _handleTabChange(Tab.PRODUCTS);
            }}>
            Products
            <CountBadge count={props.count} />
          </NavLink>
        </NavItem>

        {/* History Tab */}
        <NavItem>
          {detail && detail?.statusGroup === Group.DRAFT && <NavLink
            className={classNames({
              active: activeTab === Tab.REPLENISH
            })}
            onClick={() => {
              toggle(Tab.REPLENISH);
              _handleTabChange(Tab.REPLENISH);
            }}>
            {Tab.REPLENISH}
            <CountBadge count={props.replenishCount} />

          </NavLink>}
        </NavItem>
        <NavItem>
          {showHistory && (
            <NavLink
              className={classNames({
                active: activeTab === Tab.HISTORY
              })}
              onClick={() => {
                toggle(Tab.HISTORY);
                _handleTabChange(Tab.HISTORY);
              }}>
              {Tab.HISTORY}
            </NavLink>
          )}
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={Tab.SUMMARY}>
          <DefaultContent>
            <Form
              enableReinitialize={true}
              initialValues={{
                fromLocation:
                  Array.isArray(store) &&
                  store.find((data) => data.id == detail?.from_store_id),
                toLocation:
                  Array.isArray(store) &&
                  store.find((data) => data.id == detail?.to_store_id),
                date: DateTime.getDateTimeByUserProfileTimezone(detail?.date),
                due_date: detail?.due_date ? DateTime.getDateTimeByUserProfileTimezone(detail?.due_date) : "",

                notes: detail?.notes ? detail?.notes : "",
                type:
                  transferType &&
                  transferType.find((data) => data.value == detail?.type),
                owner:
                  userList &&
                  userList.length > 0 &&
                  userList.find((data) => data?.id == detail?.owner_id)
              }}
              onSubmit={(values) => {
                submit(values);
              }}>
              <DateSelector
                name="date"
                fontBolded
                label="Date"
                disabled={editable ? editable : PermissionList ? false : true}
              />
              <div className="row ">
                <div className="col-lg-6 col-sm-12">
                  <SelectStore
                    name="fromLocation"
                    label="From Location"
                    isDisabled={editable ? editable : PermissionList ? false : true}
                  />
                </div>
                <div className="col-lg-6 col-sm-12">
                  <SelectStore
                    name="toLocation"
                    label="To Location"
                    isDisabled={editable ? editable : PermissionList ? false : true}
                  />
                </div>
              </div>

              <Select
                name="type"
                fontBolded
                label="Type"
                placeholder="Select Type"
                options={transferType}
                isDisabled={editable}
                required
              />
              <UserSelect
                name="owner"
                label="Owner"
                selectedUserId={detail?.owner_id ? detail?.owner_id : null}
                userList={setUserList}
                isDisabled={editable}
              />
              <DateSelector
                name="due_date"
                fontBolded
                label="Due Date"
                disabled={editable ? editable : PermissionList ? false : true}
              />
              <Notes name="notes" label="Notes" disabled={editable} />

              {!editable && (
                <div className="mt-2">
                  <SaveButton type="submit" label="Save" />
                  <CancelButton
                    onClick={() => {
                      history.push("/bill");
                    }}
                  />
                </div>
              )}
            </Form>
          </DefaultContent>
        </TabPane>
        {/* Product Tab Start */}
        {activeTab == Tab.PRODUCTS && <TabPane tabId={Tab.PRODUCTS}>
          <TransferProduct
            fromLocationId={detail?.from_store_id}
            toLocationId={detail?.to_store_id}
            id={tansferId}
            type={detail?.type}
            history={props.history}
          />
        </TabPane>}
        {/* History Tab Start*/}
        {showHistory && activeTab == Tab.HISTORY && (
          <TabPane tabId={Tab.HISTORY} className="w-100">
            <ActivityList
              id={id}
              objectId={id}
              object_name={ObjectName.TRANSFER}
            />
          </TabPane>
        )}
        {detail && detail?.statusGroup === Group.DRAFT && <TabPane tabId={Tab.REPLENISH} className="w-100">
          <ReplenishList
            fromLocationId={detail?.from_store_id}
            toLocationId={detail?.to_store_id}
            id={tansferId}
            type={detail?.type}
          />
        </TabPane>}
      </TabContent>
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch)
  };
}
const mapStateToProps = (state) => {
  const reduxTable = state.table;

  const pageSize =
    reduxTable["transferProduct"] &&
      reduxTable["transferProduct"].isFetching == false
      ? reduxTable["transferProduct"].pageSize
      : 25;

  const count =
    reduxTable["transferProduct"] && reduxTable["transferProduct"].isFetching == false
      ? reduxTable["transferProduct"].totalCount
      : 0;
  const currentPage =
    reduxTable["transferProduct"] &&
      reduxTable["transferProduct"].isFetching == false
      ? reduxTable["transferProduct"].currentPage
      : 1;

  const replenishCount =
    reduxTable["replenishProduct"] &&
      reduxTable["replenishProduct"].isFetching == false
      ? reduxTable["replenishProduct"].totalCount
      : 0;

  return {
    pageSize,
    currentPage,
    count,
    replenishCount
  };
};

// export default TransferDetail;

export default connect(() => {
  return mapStateToProps;
}, mapDispatchToProps)(TransferDetails);

