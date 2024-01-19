// React Packages
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DropdownItem } from "reactstrap";

// Configs
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { endpoints } from "../../api/endPoints";
import { apiClient } from "../../apiClient";
import CancelButton from "../../components/CancelButton";
import DateSelector from "../../components/Date";
import DefaultContent from "../../components/content/defaultContent";
import Url from "../../lib/Url";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Components
import jsPDF from 'jspdf';
import { fetchList } from "../../actions/table";
import AccountSelect from "../../components/AccountSelect";
import Action from "../../components/Action";
import ActivityList from "../../components/ActivityList";
import AddButton from "../../components/AddButton";
import BreadCrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";
import DeleteModal from "../../components/DeleteModal";
import Form from "../../components/Form";
import PageTitle from "../../components/PageTitle";
import ProductSelectModal from "../../components/ProductSelectModal";
import Quantity from "../../components/Quantity";
import SaveButton from "../../components/SaveButton";
import Select from "../../components/Select";
import Spinner from "../../components/Spinner";
import StatusComponent from "../../components/Status";
import TextArea from "../../components/TextArea";
import Toast from "../../components/Toast";
import UserSelect from "../../components/UserSelect";
import MoreDropdown from "../../components/authentication/moreDropdown";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import ObjectName from "../../helpers/ObjectName";
import Permission from "../../helpers/Permission";
import PurchaseOrder from "../../helpers/PurchaseOrder";
import Urls from "../../helpers/Url";
import Currency from "../../lib/Currency";
import DateTime from "../../lib/DateTime";
import { isBadRequest } from "../../lib/Http";
import AddressService from "../../services/AddressService";
import CompanyService from "../../services/CompanyService";
import PurchaseOrderProductService from "../../services/PurchaseOrderProductService";
import PurchaseOrderService from "../../services/PurchaseOrderService";
import { hasPermission } from "../../services/UserRolePermissionService";
import AccountService from "../../services/AccountService";
import ProductCard from "../product/components/productCard";
import ProductPrint from "./components/ProductPrint";
import PurchaseOrderDownload from "./components/PurchaseOrderDownload";
import ProductList from "./components/productList";
import StatusService from "../../services/StatusService";
import StatusText from "../../components/StatusText";

export const Tab = {
  GENERAL: "General",
  PRODUCTS: "Products",
  HISTORY: "History",
};
const PurchaseOrderDetail = (props) => {
  const { history } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [detail, setDetail] = useState(null);
  const [vendorList, setVendorList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [MultiSelectProduct, setMultiSelectProduct] = useState([]);
  const [isToggle, setIsToggle] = useState(false);
  const [addStoreModal, setAddProductModal] = useState(false);
  const [productName, setProductName] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [PermissionList, setPermissionList] = useState();
  const [values, setValues] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [productDetail, setProductDetail] = useState(null);
  const [billingAddress, setBillingAddress] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [vendorAddress, setVendorAddress] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [Address, setAddress] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const Param = new URLSearchParams(props.history.location.search);
  const tab = Param.get("tab");
  const [activeTab, setActiveTab] = useState(tab ? tab : Tab.GENERAL);
  let showHistory = hasPermission(Permission.PURCHASE_ORDER_HISTORY_VIEW)
  const [statusList, setStatusList] = useState([]);


  useEffect(() => {
    getDetails();
    getVendorList();
    getRolePermissions();
    getProductList();
    fetchCompanyDetail();
    getAddress();
  }, []);

  useEffect(() => {
    getVendorAddress();
    getbillingAddress();
  }, [vendor]);

  //   Get Status List
  const getStatusList = async (currentStatusId) => {
    if (currentStatusId) {
      const data = await StatusService.nextStatusSearch(
        ObjectName.PURCHASE_ORDER_PRODUCT,
        currentStatusId,
      );

      if (data && data.length > 0) {
        setStatusList(data);
      }
    }


  };
  const dispatch = useDispatch();

  const actionOptions = [
    {
      label: "Clone",
      value: "Clone",
    },
    {
      label: "Export",
      value: "Export",
    },
    {
      label: "Print",
      value: "Print",
    },
    {
      label: "Delete",
      value: "Delete",
    }, {
      label: "Download As PDF",
      value: "Download As PDF",
    }
  ];

  if (activeTab === Tab.PRODUCTS) {
    actionOptions.push(
      { label: PurchaseOrder.ADD_RECOMMENDED_PRODUCTS, value: PurchaseOrder.ADD_RECOMMENDED_PRODUCTS }

    );
  }

  let purchaseOrderId = props.match.params.purchaseOrderId;
  const toggle = (tab) => {
    setIsOpen(!isOpen);
    setActiveTab(tab);
  };

  //  Get purchaseOrder Details
  const getDetails = async () => {
    setIsLoading(true);
    const response = await apiClient.get(
      `${endpoints().purchaseOrderAPI}/${purchaseOrderId}`
    );
    setIsLoading(false);

    const vendorId = response?.data?.vendorId;
    setDetail(response.data);
    setVendor(response.data?.vendor_id);
    setIsLoading(false);
  };

  // Get vendors list
  const getVendorList = async () => {
    try {
      let vendorLists = [];
      const vendor = await AccountService.searchVendor();
      let vendors = vendor.data;
      if (vendors && vendors.length > 0) {
        for (let i = 0; i < vendors.length; i++) {
          vendorLists.push({
            value: vendors[i].id,
            label: vendors[i].vendorName,
          });
        }
      }
      setVendorList(vendorLists);
    } catch (err) {
      console.log(err);
    }
  };

  // Bread crumb list
  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    {
      label: "Purchase Orders",
      link: Urls.PURCHASE_ORDER_LIST,
    },
    {
      label: " Purchase Order Detail",
    },
  ];

  // Status Option
  const statusOptions = [
    {
      value: PurchaseOrder.STATUS_DRAFT_VALUE,
      label: "Draft",
    },
    {
      value: PurchaseOrder.STATUS_NEED_APPROVAL_VALUE,
      label: "Need Approval",
    },
    {
      value: PurchaseOrder.STATUS_APPROVED_VALUE,
      label: "Approve",
    },
    {
      value: PurchaseOrder.STATUS_COMPLETED_VALUE,
      label: "Complete",
    },
  ];
  if (isLoading) {
    return <Spinner />;
  }

  // Handle form Submit
  const submit = async (values) => {
    try {
      const data = new FormData();
      data.append("vendor_id", values?.vendor?.value);
      data.append("date", DateTime.toISOStringDate(values?.date));
      data.append(
        "status",
        values?.status?.value ? values?.status?.value : detail.statusValue
      );
      data.append(
        "delivery_date",
        values?.delivery_date ? values?.delivery_date : ""
      );

      data.append("owner", values?.owner?.id ? values?.owner?.id : "");
      data.append(
        "billingAddress",
        values?.billingAddress?.value ? values?.billingAddress?.value : ""
      );
      data.append(
        "deliveryAddress",
        values?.deliveryAddress?.value ? values?.deliveryAddress?.value : ""
      );
      data.append(
        "description",
        values?.description ? values?.description : ""
      );

      PurchaseOrderService.update(purchaseOrderId, data);
    } catch (err) {
      console.log(err);
    }
  };

  // Add store modal toggling
  const addProductToggle = () => {
    setAddProductModal(false);
    setProductName("");
  };

  const _toggle = (id) => {
    setIsToggle(!isToggle);
  };

  const multiselect = (values) => {
    setMultiSelectProduct(values);
  };

  const handleSubmit = async (values) => {
    const createData = new FormData();
    createData.append("productIds", MultiSelectProduct);
    createData.append("purchaseOrderId", props.match.params.purchaseOrderId);
    createData.append("vendorId", detail?.vendor_id);

    try {
      const response = await apiClient.post(
        `${endpoints().purchaseOrderProductAPI}`,
        createData
      );
      if (response) {
        Toast.success(response.data.message);
        setAddProductModal(false);
        setMultiSelectProduct("");
      }
      dispatch(
        fetchList(
          "purchaseProduct",
          `${endpoints().purchaseOrderProductAPI}/search`,
          1,
          25,
          {
            purchaseOrderId: props.match.params.purchaseOrderId,
            pagination: true,
          }
        )
      );
    } catch (error) {
      if (isBadRequest(error)) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        Toast.error(error.response.data.message);
        console.error(errorMessage);
      }
    }
  };

  // Modal Body of Add Store
  const addStoreForm = (
    <ProductList
      vendorId={detail?.vendor_id}
      MultiSelectProduct={multiselect}
      purchaseOrderId={purchaseOrderId}
      history={props.history}
    />
  );
  // Modal Footer of Add Store
  const productFooter = (
    <Button
      label="Add Products"
      className="h6-5-important"
      onClick={(values) => {
        handleSubmit(values);
      }}
    />
  );

  const handleChange = async (id, value) => {
    try {
      let quantity = value && value.values && value.values.quantity.value;
      let body = { quantity: quantity };
      let purchase_order_id = purchaseOrderId;
      let params = { purchaseOrderId: purchase_order_id, pagination: true };

      dispatch(
        PurchaseOrderProductService.updatePurchaseOrder(
          id,
          body,
          params,
          props.purchaseProductCurrentpage,
          props.purchaseProductPageSize
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  // function to generate a PDF from the HTML content of a component
  const generatePDF = () => {
    // create a new jsPDF format of A4 and unit of points
    const pdf = new jsPDF({
      format: "a4",
      unit: "pt"
    });
    // get the HTML content of the component with ID "download"
    const element = document.getElementById('download');
    const html = element.innerHTML;
    // generate the PDF from the HTML content
    pdf.html(html, {
      // use a callback function to save the PDF after it has been generated
      callback: function (pdf) {
        // get the current date in a formatted string
        const today = new Date();
        const options = { day: "numeric", month: "short", year: "numeric" };
        const formattedDate = today.toLocaleDateString("en-US", options);
        // save the PDF with a filename that includes the current date
        pdf.save(`Purchase Order ${formattedDate}.pdf`);
      }
    });
  };

  const handleCreate = async () => {
    let data = { account_id: detail?.vendor_id, purchaseOrderId: purchaseOrderId }
    let params = { purchaseOrderId: purchaseOrderId, pagination: true };

    dispatch(
      await PurchaseOrderService.addRecommendedProducts(data, params, () => { })
    );
  };
  const actionOnChange = (value) => {
    if (value == "Clone") {
      PurchaseOrderService.clone(purchaseOrderId, {});
    }
    if (value == "Print") {
      document.getElementById("Print").click();
    }
    if (value == "Delete") {
      setDeleteModal(true);
    }
    if (value == "Download As PDF") {
      generatePDF();
    }
    if (value == PurchaseOrder.ADD_RECOMMENDED_PRODUCTS) {
      handleCreate();
    }
  };
  const onStatusChange = (value) => {
    if (value) {
      handleStatusChange(value);
    }
  };

  // Handle status change
  const handleStatusChange = (status) => {
    const data = new FormData();

    data.append("status", status ? status : "");

    dispatch(
      PurchaseOrderService.updateStatus(purchaseOrderId, data, getDetails, {})
    );
  };

  const closeDeleteModal = () => {
    //close modal
    setOpenDeleteModal(!openDeleteModal);
  };

  const DeletePurchaseOrderProduct = () => {
    try {
      //validate selected prodect exist or not
      if (selectedProduct) {
        let purchase_Order_id = purchaseOrderId;

        //cretae parms
        let params = { purchaseOrderId: purchase_Order_id, pagination: true };

        dispatch(
          PurchaseOrderProductService.deleteProduct(
            selectedProduct.id,
            params,
            props.purchaseProductCurrentpage,
            props.purchaseProductPageSize,
            closeDeleteModal
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  //Get Role Permission
  const getRolePermissions = async () => {
    const statusPermission = hasPermission(Permission.PURCHASE_ORDER_STATUS_UPDATE)
    setPermissionList(statusPermission);
  };

  // DeletePurchaseOrderId Delete
  const DeletePurchaseOrderId = () => {
    const id = detail?.id;

    dispatch(
      PurchaseOrderService.delete(id, closeDelete),
      props.history.push("/purchaseorders")
    );
  };

  const closeDelete = () => {
    //close modal
    setDeleteModal(!deleteModal);
  };

  // Get Product list in purchase order detail
  const getProductList = async () => {
    let productList = [];
    const response = await apiClient.get(
      `${endpoints().purchaseOrderProductAPI
      }/search?purchaseOrderId=${purchaseOrderId}`
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
          salePrice: product.sale_price,
        });
      });
    }
    setProductDetail(productList);
  };

  // Get company detail of login company
  const fetchCompanyDetail = async () => {
    let data = await CompanyService.get();
    if (data) {
      setCompanyName(data.company_name);
    }
  };

  // Get company detail of login company
  const getVendorAddress = async () => {
    setIsLoading(true);
    let vendorAddress = await AddressService.get(
      null,
      ObjectName.VENDOR,
      vendor
    );
    const list = vendorAddress.data.data;
    setIsLoading(false);
    setVendorAddress(list);
  };

  // Get company detail of login company
  const getAddress = async () => {
    setIsLoading(true);
    let addressList = [];
    const response = await AddressService.search();

    const details = response.data.data;

    if (details) {
      details.forEach((address) => {
        addressList.push({
          label:
            address?.title +
            " " +
            ` (${address?.name +
            ", " +
            address?.address1 +
            ", " +
            address?.address2 +
            " ," +
            address?.city +
            ", " +
            address?.state +
            ", " +
            address?.pin_code
            })`,
          value: address.id,
        });
      });
    }
    setIsLoading(false);
    setAddress(addressList);
  };

  // Get company detail of login company
  const getbillingAddress = async () => {
    setIsLoading(true);

    if (detail?.billingAddressId) {
      let response = await AddressService.get(detail?.billingAddressId);
      const list = response.data;
      setIsLoading(false);
      setBillingAddress(list);
    }
    if (detail?.deliveryAddressId) {
      let response = await AddressService.get(detail?.deliveryAddressId);
      const list = response.data;
      setIsLoading(false);
      setDeliveryAddress(list);
    }
  };

  const _handleTabChange = (tab) => {
    props.history.push(`?tab=${tab}`);
  };

  return (
    <>
      <div id="download" className="d-none">
        <PurchaseOrderDownload
          data={productDetail}
          vendorName={detail?.vendor_name}
          purchaseOrderDate={detail?.date}
          companyName={companyName}
          purchaseOrderNumber={detail?.purchase_order_number}
          vendorAddress={vendorAddress}
          date={detail?.date}
          deliveryAddress={deliveryAddress}
          billingAddress={billingAddress} />
      </div>
      <ProductSelectModal
        modalOpen={addStoreModal}
        toggle={_toggle}
        toggleModalClose={addProductToggle}
        handleSubmit={handleSubmit}
        BulkSelect={multiselect}
        history={history}
        apiURL={`${endpoints().purchaseOrderAPI}/productList`}
        params={{ vendor_id: detail?.vendor_id, purchaseOrderId: purchaseOrderId }}
        showBrandFilter
        showCategoryFilter

      />
      <div>
        {/* Delete Modal DropDown */}
        <DeleteModal
          isOpen={deleteModal}
          label={detail?.purchase_order_number}
          toggle={closeDelete}
          id={detail?.id}
          title="Delete Purchase Product"
          deleteFunction={DeletePurchaseOrderId}
        />

        <DeleteModal
          isOpen={openDeleteModal}
          label={selectedProduct.product_name}
          toggle={closeDeleteModal}
          title="Delete Purchase Product"
          deleteFunction={DeletePurchaseOrderProduct}
        />
        {/* Bread Crumb section */}
        <BreadCrumb list={breadcrumbList} />

        {/* Page Title */}
        <div className="d-flex justify-content-between">
          <PageTitle
            label={`Purchase Order # ${detail?.purchase_order_number}`}
          />
          <div className="d-flex">
            {activeTab == Tab.PRODUCTS ? (
              <AddButton
                label={"Add Product"}
                onClick={() => {
                  setAddProductModal(true);
                }}
              />
            ) : (
              ""
            )}
            <div className="ml-2 d-none" id="print">
              <ProductPrint
                id="print"
                productDetail={productDetail}
                vendorName={detail?.vendor_name}
                purchaseOrderDate={detail?.date}
                companyName={companyName}
                purchaseOrderNumber={detail?.purchase_order_number}
                vendorAddress={vendorAddress}
                date={detail?.date}
                deliveryAddress={deliveryAddress}
                billingAddress={billingAddress}
              />
            </div>
            <div className="ml-2">
              <StatusComponent
                objectName={ObjectName.PURCHASE_ORDER}
                handleChange={onStatusChange}
                buttonLabel={detail?.status}
                currentStatusId={detail?.statusValue}

              />
            </div>
            <div className="ml-2">
              <Action
                dropdownLinks={actionOptions}
                handleChange={actionOnChange}
              />
            </div>
          </div>
        </div>
        <Nav tabs className="admin-tabs mb-1">
          {/* GENERAL Tab */}
          <NavItem>
            <NavLink
              className={classNames({
                active: activeTab === Tab.GENERAL,
              })}
              onClick={() => {
                toggle(Tab.GENERAL);
                _handleTabChange(Tab.GENERAL);
              }}
            >
              General
            </NavLink>
          </NavItem>

          {/* PRODUCT tab */}
          <NavItem>
            <NavLink
              className={classNames({
                active: activeTab === Tab.PRODUCTS,
              })}
              onClick={() => {
                toggle(Tab.PRODUCTS);
                _handleTabChange(Tab.PRODUCTS);
              }}
            >
              Products
            </NavLink>
          </NavItem>
          {/* HISTORY tab */}
          {showHistory && <NavItem>
            <NavLink
              className={classNames({
                active: activeTab === Tab.HISTORY,
              })}
              onClick={() => {
                toggle(Tab.HISTORY);
                _handleTabChange(Tab.HISTORY);
              }}
            >
              History
            </NavLink>
          </NavItem>}
        </Nav>
        <TabContent activeTab={activeTab}>
          {activeTab == Tab.GENERAL &&
            <TabPane tabId={Tab.GENERAL}>
              <DefaultContent>
                <Form
                  enableReinitialize={true}
                  initialValues={{
                    vendor: {
                      value: detail?.vendor_id,
                      label: detail?.vendor_name,
                    },
                    date: detail?.date ? DateTime.getDateTimeByUserProfileTimezone(detail?.date) : "",

                    delivery_date: detail?.delivery_date
                      ? detail?.delivery_date
                      : "",
                    status: {
                      label: detail?.status,
                    },
                    owner:
                      values &&
                      values.find((values) => values.id === detail?.owner_id),
                    billingAddress: {
                      label: detail?.billingAddress,
                    },
                    deliveryAddress: { label: detail?.deliveryAddress },
                    description: detail?.description,
                  }}
                  onSubmit={(values) => {
                    submit(values);
                  }}
                >
                  <DateSelector name="date" fontBolded label="Date" />
                  <AccountSelect label="Vendor" />
                  <DateSelector
                    name="delivery_date"
                    fontBolded
                    label="Delivery Date"
                  />
                  <UserSelect name="owner" label="Owner" selectedUserId={detail?.owner_id ? detail?.owner_id : null} />

                  <Select
                    name="billingAddress"
                    fontBolded
                    label="Billing Address"
                    options={Address}
                  />
                  <Select
                    name="deliveryAddress"
                    fontBolded
                    label="Delivery Address"
                    options={Address}
                  />
                  <TextArea
                    name="description"
                    label="Description"
                    placeholder="Enter Description..."
                    error=""
                    fontBolded
                  />

                  <div className="btn-wrapper">
                    <SaveButton />
                    <CancelButton
                      onClick={() => props.history.push(`/purchaseOrder`)}
                    />
                  </div>
                </Form>
              </DefaultContent>
            </TabPane>}
          {activeTab == Tab.PRODUCTS &&
            <TabPane tabId={Tab.PRODUCTS}>
              <div className="mt-4">
                <ReduxTable
                  id="purchaseProduct"
                  totalAmount
                  showHeader
                  searchPlaceholder="Search"
                  apiURL={`${endpoints().purchaseOrderProductAPI}/search`}
                  newTableHeading
                  history={history}
                  paramsToUrl={true}
                  sortByDropdown
                  params={{
                    purchaseOrderId: props.match.params.purchaseOrderId,
                    search: Url.GetParam("search"),
                    tab: Url.GetParam("tab"),
                  }}
                >
                  <ReduxColumn
                    field="product_name"
                    sortBy="product_name"
                    type="link"
                    width="250px"
                    minWidth="250px"
                    maxWidth="250px"
                    isClickable="true"
                    renderField={(row) => (
                      <>
                        <ProductCard
                          productImageIcon
                          square
                          productName={row.product_name}
                          url={row.image}
                          brandName={row.brand_name}
                          salePrice={row.sale_price}
                          packSize={row.pack_size}
                          mrp={row.mrp}
                          size={row.size}
                          unit={row.unit}
                          id={row.product_id}
                          brand_id={row.brand_id}
                        />
                      </>
                    )}
                  >
                    Product
                  </ReduxColumn>
                  <ReduxColumn
                    width="80px"
                    minWidth="100px"
                    className="text-right"
                    renderField={(row) => (
                      <span>{Currency.Format(row.unit_price)}</span>
                    )}
                  >
                    Cost Price
                  </ReduxColumn>
                  <ReduxColumn
                    field="quantity"
                    width="180px"
                    renderField={(row) => (
                      <div className="d-flex justify-content-center align-items-center">
                        <Form
                          enableReinitialize={true}
                          initialValues={{
                            quantity: {
                              value: row.quantity,
                              label: row.quantity,
                            },
                          }}
                        >
                          <Quantity
                            width={"100px"}
                            maxQuantity={100}
                            onChange={(e) => handleChange(row.id, e)}
                          />
                        </Form>
                      </div>
                    )}
                  >
                    Quantity
                  </ReduxColumn>
                  <ReduxColumn
                    className="ellipsis text-right"
                    field="amount"
                    sortBy="amount"
                    renderField={(row) => (
                      <span>{Currency.Format(row.amount)}</span>
                    )}
                  >
                    Amount
                  </ReduxColumn>


                  <ReduxColumn
                    field="status"
                    // sortBy="productCount"
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
                                      PurchaseOrderProductService.updatPurchaseStatus(
                                        row.id,
                                        { status: data.value },
                                        {
                                          purchaseOrderId: purchaseOrderId,
                                          currentPage:
                                            props.purchaseProductCurrentpage,
                                          pageSize: props.purchaseProductPageSize,
                                          pagination: true,
                                        }

                                      )
                                    );
                                  }}>
                                  {data.label}
                                </DropdownItem>
                              );
                            })}
                          <DropdownItem
                            className=" text-danger cursor-pointer"
                            onClick={() => {
                              setOpenDeleteModal(true);
                              setSelectedProduct(row);
                            }}
                          >
                            Delete
                          </DropdownItem>
                        </MoreDropdown>
                      </div>
                    )}>
                    Action
                  </ReduxColumn>

                </ReduxTable>
              </div>
            </TabPane>}
          {showHistory && activeTab == Tab.HISTORY &&
            <TabPane tabId={Tab.HISTORY} className="w-100 ">
              <ActivityList
                id={purchaseOrderId}
                objectId={purchaseOrderId}
                object_name={ObjectName.PURCHASE_ORDER}
              />
            </TabPane>}
        </TabContent>
      </div>
    </>
  );
};
function mapStateToProps(state) {
  const reduxTable = state.table;
  // Get Published products count
  const purchaseProductCurrentpage =
    reduxTable["purchaseProduct"] &&
      reduxTable["purchaseProduct"].isFetching == false
      ? reduxTable["purchaseProduct"].currentPage
      : 1;
  const purchaseProductPageSize =
    reduxTable["purchaseProduct"] &&
      reduxTable["purchaseProduct"].isFetching == false
      ? reduxTable["purchaseProduct"].pageSize
      : 25;

  //get All
  return {
    purchaseProductCurrentpage,
    purchaseProductPageSize,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchaseOrderDetail);
