import classNames from "classnames";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DropdownItem } from "reactstrap";
import Permission from "../../helpers/Permission";
import ArrayList from "../../lib/ArrayList";

// Configs
import { getStoresList } from "../../services/StoreListService";

import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { endpoints } from "../../api/endPoints";
import CancelButton from "../../components/CancelButton";
import DateSelector from "../../components/Date";
import DefaultContent from "../../components/content/defaultContent";
import Url from "../../lib/Url";
import TransferTypeService from "../../services/TransferTypeService";

// Components
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import SaveButton from "../../components/SaveButton";
import MoreDropdown from "../../components/authentication/moreDropdown";
import DeleteModal from "../../components/DeleteModal";
import Spinner from "../../components/Spinner";
import Quantity from "../../components/Quantity";
import Form from "../../components/Form";
import PageTitle from "../../components/PageTitle";
import Select from "../../components/Select";
import BreadCrumb from "../../components/Breadcrumb";
import ProductCard from "../product/components/productCard";
import Notes from "../../components/Notes";

// Actions
import { updateTransferStatus, } from "../../actions/transferProduct";

// Helper
import SelectStore from "../../components/SelectStore";
import Status from "../../components/Status";
import UserSelect from "../../components/UserSelect";
import ProductSearch from "../../components/productSearch";
import ObjectName from "../../helpers/ObjectName";
import { Transfer } from "../../helpers/Transfer";
import Urls from "../../helpers/Url";
import Currency from "../../lib/Currency";
import Number from "../../lib/Number";
import StoreProductService from "../../services/StoreProductService";
import StoreService from "../../services/StoreService";
import TransferProductService from "../../services/TransferProductService";
import TransferService from "../../services/TransferService";
import { hasPermission } from "../../services/UserRolePermissionService";
import DateTime from "../../lib/DateTime";
import { bindActionCreators } from "redux";
import { fetchList } from "../../actions/table";
import CountBadge from "../../components/CountBadge";

export const Tab = { SUMMARY: "Summary", PRODUCTS: "Products" };

const TransferAdd = (props) => {
  const [storeProductList, setStoreProductList] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [scannedProductCode, setScannedProductCode] = useState("");
  const [scannedProduct, setScannedProduct] = useState("");
  const [locationName, setName] = useState("");
  const [transferNumber, setTransferNumber] = useState("");
  const [detail, setDetail] = useState();
  const [PermissionList, setPermissionList] = useState();
  const [store, setStore] = useState([]);
  const [status, setStatus] = useState();
  const [fromLocationId, setFromStoreId] = useState();
  const [tostoreId, settoStoreId] = useState();
  const [type, setType] = useState();
  const [transferTypeData, setTransferTypeData] = useState();
  const [transferType, setTransferType] = useState();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(
    Url.GetParam("tab") || Tab.SUMMARY
  );
  const [unitPrice, setUnitPrice] = useState();
  const [quantityLabels, setQuantityLabels] = useState();
  const [value, setValue] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const [quantity, setQuantity] = useState();
  const [values, setValues] = useState();
  const [userList, setUserList] = useState([]);


  useEffect(() => {
    getStoreDetails();
    getDetails();
    getRolePermissions();
    storeList();
    getType();
  }, []);

  const getProductDetails = (
    productName,
    productImage,
    brandName,
    size,
    unit,
    salePrice,
    mrp
  ) => {
    return (
      <ProductCard
        productImageIcon
        square
        productName={productName}
        url={productImage}
        brandName={brandName}
        size={size != "null" ? size : ""}
        unit={unit != "null" ? unit : ""}
        salePrice={salePrice != "null" ? salePrice : ""}
        mrp={mrp != "null" ? mrp : ""}
      />
    );
  };



  const getType = async () => {
    const list = await TransferTypeService.search();
    setTransferType(list);
  }

  const toggle = (tab) => {
    setActiveTab(tab);
  };

  const _handleTabChange = (tab) => {
    props.history.push(`?tab=${tab}`);
  };

  //  Get Transfer Details
  const getDetails = async () => {
    let id = props.match.params.id;
    const response = await TransferService.get(id);
    const fromLocationId = response?.data?.from_store_id;
    setDetail(() => response.data);
    getStoreProducts(fromLocationId);
    setIsLoading(false);
  };

  useEffect(() => {
    getProductDetail();
  }, [scannedProductCode]);

  useEffect(() => {
    removeScannedCode();
  }, [scannedProduct]);

  const removeScannedCode = () => {
    setScannedProductCode(null);
  };

  const getStoreDetails = async () => {
    let storeId = props.match.params.fromLocationId;

    if (storeId) {
      //get store products
      const response = await StoreService.get(storeId)
      if (response && response.data && response.data.data) {
        let storeDetails = response.data.data;
        setName(storeDetails.name);
        setTransferNumber(storeDetails.id);
      }
    }
  };

  const getProductDetail = () => {
    if (storeProductList && storeProductList.length > 0 && scannedProductCode) {
      let scannedProduct = storeProductList.find(
        (data) => data.barcode == scannedProductCode
      );
      setScannedProduct(scannedProduct);
    }
  };

  const storeList = async () => {
    try {
      let storeListArray = [];
      const stores = await getStoresList();
      if (ArrayList.isNotEmpty(stores)) {
        stores.forEach((store) => {
          storeListArray.push({
            id: store.id,
            label: store.label,
            value: store.id,
          });
        });
      }
      setStore(storeListArray);
    } catch (err) {
      console.log(err);
    }
  };

  // Bread crumb list
  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    {
      label: "Transfer",
      link: Urls.TRANSFER_LIST,
    },
    {
      label: " Transfer Add",
    },
  ];

  const getStoreProducts = async (id) => {
    try {
      //get store product list
      let storeProductList = new Array();
      // let storeId = props.match.params.fromLocationId;

      //validate store Id exist or not
      if (id) {

        let param = {
          pagination: false,
          store_id: id
        }
        //get store products
        const response = await StoreProductService.search(param)

        //validate response exist or not
        if (response && response.data && response.data.data) {
          //get store products
          let storeProducts = response.data.data;

          //validate store products
          if (storeProducts && storeProducts.length > 0) {
            //loop the store rpdocuts
            for (let i = 0; i < storeProducts.length; i++) {
              let productDetails;
              productDetails = storeProducts[i]
              //push the store prroducts
              storeProductList.push({
                label: getProductDetails(
                  productDetails.product_display_name,
                  storeProducts[i].image,
                  productDetails.brand_name,
                  productDetails.size,
                  productDetails.unit,
                  productDetails.sale_price,
                  productDetails.mrp
                ),
                value: productDetails.product_display_name,
                id: storeProducts[i].productId,
                barcode: storeProducts[i].barcode,
              });
            }
          }
          //set value in state
          setStoreProductList(storeProductList);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const AddTransferProduct = async (values) => {
    setIsLoading(true);

    try {
      //create Transfer data
      let TransferData = new Object();

      //get store Id in params
      let storeId = props.match.params.fromLocationId;

      // from store id
      let fromLocationId = props.match.params.fromLocationId;

      // To store id 
      let toLocationId = props.match.params.toLocationId;

      TransferData.from_store_id = fromLocationId;
      TransferData.to_store_id = toLocationId;
      TransferData.type = detail?.type;


      //get Transfer Id
      let transferProductId = props.match.params.id;

      //get store Id from params
      TransferData.storeId = storeId;


      //append the amount
      TransferData.amount =
        totalAmount && totalAmount;
      //appens the Transfer Id
      TransferData.id = transferProductId;

      //appende the store product Id
      TransferData.productId =
        values && values.storeProduct && values.storeProduct.id;

      //append the quantiry
      TransferData.quantity =
        values && values.quantity && values.quantity.value;

      TransferData.unit_price = unitPrice && unitPrice;

      //validate Transfer Id exist or not
      if (transferProductId) {
        //cretae parms
        let params = {
          fromLocationId: storeId,
          transferId: transferProductId,
          pagination: true,
        };

        //add Transfer product data
        dispatch(await TransferProductService.add(TransferData, params, setValue, setQuantityLabels));

        getStoreProducts();

        setScannedProduct([]);

        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const DeleteTransferProduct = async () => {
    try {
      //validate selected prodect exist or not
      if (selectedProduct) {
        let storeId = props.match.params.fromLocationId;

        let transferId = props.match.params.id;

        //cretae parms
        let params = { storeId: storeId, transferId: transferId };

        dispatch(
          await TransferProductService.delete(selectedProduct.id, params, closeDeleteModal)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeStatus = async (selectStatus) => {
    dispatch(await TransferService.updateStatus(props.match.params.id, { status: selectStatus }, getDetails));
  };

  // Handle form Submit
  const submit = async (values) => {
    setFromStoreId(values?.fromLocation?.value);
    settoStoreId(values?.toLocation?.value);
    try {
      const data = new FormData();
      data.append("fromLocationId", values?.fromLocation?.value);
      data.append("toLocationId", values?.toLocation?.value);
      data.append("due_date", values?.due_date ? DateTime.toISOStringDate(values?.due_date) : "");
      data.append("date", values?.date);
      data.append("type", values?.type?.value);
      data.append("notes", values?.notes);
      data.append("owner", values?.owner?.id);

      dispatch(await TransferService.update(props.match.params.id, data, getDetails, getStoreDetails, getStoreProducts))
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = async (id, value) => {
    try {
      let quantity = value && value.values && value.values.quantity.value;
      let body = { quantity: quantity };
      let storeId = props.match.params.fromLocationId;
      let transferId = props.match.params.id;
      let params = { storeId: storeId, transferId: transferId };
      dispatch(await TransferProductService.update(id, body, params));
    } catch (err) {
      console.log(err);
    }
  };

  const onInputChange = (e) => {
    const value = e?.values?.storeProduct;
    const unitValue = value?.label?.props?.salePrice;
    const amount = Number.Get(unitValue) * Number.Get(quantity)
    setTotalAmount(amount);
    setUnitPrice(unitValue);
    setValue(value);
  };

  const onChange = (e) => {
    const value = e?.values?.quantity;
    const quantity = value?.value;
    const amount = Number.Get(quantity) * Number.Get(unitPrice);
    setQuantityLabels(value);
    setTotalAmount(amount);
    setQuantity(quantity);
  }

  const closeDeleteModal = () => {
    //close modal
    setOpenDeleteModal(!openDeleteModal);
  };

  const getRolePermissions = async () => {
    const statusPermission = hasPermission(Permission.TRANSFER_STATUS)
    setPermissionList(statusPermission);
  };

  if (isLoading) {
    return <Spinner />;
  }

  // Form initial values
  return (
    <div>
      {/* Delete confirmation Modal */}
      <DeleteModal
        isOpen={openDeleteModal}
        label={selectedProduct.product_name}
        toggle={closeDeleteModal}
        title="Delete Transfer Product"
        deleteFunction={DeleteTransferProduct}
      />

      {/* Bread Crumb section */}
      <BreadCrumb list={breadcrumbList} />

      {/* Page Title */}
      <div className="d-flex justify-content-between">
        <div className="col-6">
          <PageTitle
            label={`Transfer# ${detail?.transfer_number} (${detail?.from_location_name} -->  ${detail?.to_location_name}  )`}
          />
        </div>
        <div className="mr-2 ml-2">
          {activeTab == Tab.SUMMARY ? (
            <Status
              objectName={ObjectName.TRANSFER}
              handleChange={handleChangeStatus}
              buttonLabel={detail?.status}
              currentStatusId={detail?.statusId}
              allowed_statuses={detail?.allowed_statuses}
            />
          ) : ""}
        </div>
      </div>
      <Nav tabs className="admin-tabs mb-1">
        {/* SUMMARY Tab */}
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tab.SUMMARY,
            })}
            onClick={() => {
              toggle(Tab.SUMMARY);
              _handleTabChange(Tab.SUMMARY);
            }}
          >
            Summary
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
            <CountBadge count={props.count} />
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={Tab.SUMMARY}>
          <DefaultContent>
            <Form
              enableReinitialize={true}
              initialValues={{
                fromLocation: {
                  value: detail?.from_store_id,
                  label: detail?.from_location_name,
                },
                toLocation: {
                  value: detail?.to_store_id,
                  label: detail?.to_location_name,
                },
                date: detail?.date,
                notes: detail?.notes,
                type: transferType && transferType.find((data) => detail?.type == data.value),
                owner:
                  userList &&
                  userList.length > 0 &&
                  userList.find((data) => data?.id == detail?.owner_id),
                due_date: detail?.due_date ? DateTime.getDateTimeByUserProfileTimezone(
                  detail?.due_date
                ) : "",

              }}
              onSubmit={(values) => {
                submit(values);
              }}
            >
              <DateSelector
                name="date"
                fontBolded
                label="Date"
                disabled={PermissionList ? false : true}
              />
              <div className="row">
                <div className="col-6">
                  <SelectStore
                    name="fromLocation"
                    label="From Location"
                    isDisabled={PermissionList ? false : true}
                  />
                </div>
                <div className="col-6">
                  <SelectStore
                    name="toLocation"
                    label="To Location"
                    isDisabled={PermissionList ? false : true}
                  />
                </div>
              </div>
              <Select
                name="type"
                fontBolded
                label="Type"
                placeholder="Select Type"
                options={transferType}
                required
              />

              <UserSelect name="owner" label="Owner" selectedUserId={detail?.owner_id ? detail?.owner_id : null} userList={setUserList} />
              <DateSelector
                name="due_date"
                fontBolded
                label="Due Date"
                disabled={PermissionList ? false : true}
              />
              <Notes name="notes" label="Notes" />
              <div className="btn-wrapper">
                <SaveButton />
                <CancelButton onClick={() => props.history.push(`/transfer`)} />
              </div>
            </Form>
          </DefaultContent>
        </TabPane>
        {/* Transfer Form */}
        <TabPane tabId={Tab.PRODUCTS}>
          <div className="card mt-2 mb-3 p-3">
            <Form
              enableReinitialize={true}
              initialValues={{
                storeProduct: value ? value : "",
                quantity: quantityLabels ? quantityLabels : "",
              }}
              onSubmit={(values) => {
                AddTransferProduct(values);
              }}
            >
              <div className="row">
                {/* <div className="col-5"> */}
                <ProductSearch storeProductList={storeProductList} className={"col-5"}
                  onInputChange={onInputChange} />
                {/* </div> */}
                <div className="col">
                  <Quantity maxQuantity={100} label="Quantity" onChange={onChange} />
                </div>
                <div className="col pt-4">
                  <SaveButton type="submit" label="Add" className="mt-2" />
                </div>

              </div>
              <div class="ml-2">{`Date: ${moment(new Date(detail?.date)).format(
                "DD MMM, Y h:mm A"
              )}`}</div>
            </Form>
          </div>

          {/* Transfer Product List */}
          <div className="mt-4">
            <ReduxTable
              id="transferProduct"
              showHeader
              searchPlaceholder="Search"
              paramsToUrl={true}
              history={props.history}
              apiURL={`${endpoints().transferProductApi}/search`}
              newTableHeading
              sortByDropdown
              showPageSize={false}
              params={{
                fromLocationId: props.match.params.fromLocationId,
                transferId: props.match.params.id,
              }}
            >
              <ReduxColumn
                field="product_name"
                sortBy="product_name"
                type="link"
                width="400px"
                isClickable="true"
                className="text-wrap"
                renderField={(row) => (
                  <>
                    <Link to={`/product/${row.product_id}`}>
                      <ProductCard
                        productImageIcon
                        square
                        productName={row.product_name}
                        url={row.image}
                        size={row.size}
                        brandName={row.brand_name}
                        unit={row.unit}
                        salePrice={row.sale_price}
                        mrp={row.mrp}
                      />
                    </Link>
                  </>
                )}
              >
                Product
              </ReduxColumn>
              <ReduxColumn
                field="quantity"
                width="150px"
              >
                Quantity
              </ReduxColumn>
              <ReduxColumn
                field="transfer_type"
                className="text-center"
              >
                Type
              </ReduxColumn>
              <ReduxColumn className="ellipsis" field="amount" sortBy="amount" renderField={(row) => (
                <span>{Currency.Format(row.amount)}</span>
              )}>
                Amount
              </ReduxColumn>

              <ReduxColumn
                field="status"
                sortBy="status"
                width="90px"
                className="brand-all"
                renderField={(row) => (
                  <div
                    className={`status-input text-center rounded text-white fw-600 custom-font-size text-uppercase my-3 mx-auto ${row.status && row.status === Transfer.STATUS_DRAFT_TEXT
                      ? "bg-secondary"
                      : row.status === Transfer.STATUS_PENDING_TEXT
                        ? "bg-warning"
                        : row.status === Transfer.STATUS_COMPLETED_TEXT
                          ? "bg-success"
                          : ""
                      }`}
                  >
                    <p>{row.status}</p>
                  </div>
                )}
              >
                Status
              </ReduxColumn>
              <ReduxColumn
                field="Action"
                disableOnClick
                width="120px"
                minWidth="80px"
                maxWidth="80px"
                renderField={(row) => (
                  <div className="text-center action-group-dropdown">
                    <MoreDropdown>
                      {row.status !== Transfer.STATUS_DRAFT_TEXT ? (
                        <DropdownItem
                          // className={"text-danger"}
                          onClick={() => {
                            dispatch(
                              updateTransferStatus(
                                row.id,
                                Transfer.STATUS_DRAFT_TEXT,
                                { pagination: true }
                              )
                            );
                          }}
                        >
                          Draft
                        </DropdownItem>
                      ) : (
                        <DropdownItem
                          onClick={() => {
                            dispatch(
                              updateTransferStatus(
                                row.id,
                                Transfer.STATUS_PENDING_TEXT,
                                { pagination: true }
                              )
                            );
                          }}
                        >
                          Pending
                        </DropdownItem>
                      )}
                      <DropdownItem
                        // className={"text-danger"}
                        onClick={() => {
                          dispatch(
                            updateTransferStatus(
                              row.id,
                              Transfer.STATUS_COMPLETED_TEXT,
                              { pagination: true }
                            )
                          );
                        }}
                      >
                        Completed
                      </DropdownItem>

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
                )}
              >
                Action
              </ReduxColumn>
            </ReduxTable>
          </div>
        </TabPane>
      </TabContent>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch),
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

  return {
    pageSize,
    currentPage,
    count
  };
};

export default connect(() => {
  return mapStateToProps;
}, mapDispatchToProps)(TransferAdd);

