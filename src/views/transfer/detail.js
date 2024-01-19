//React Package
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Form from "../../components/Form";
import PageTitle from "../../components/PageTitle";
import ProductCard from "../product/components/productCard";
import { endpoints } from "../../api/endPoints";

// Components
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import SaveButton from "../../components/SaveButton";
import { DropdownItem } from "reactstrap";
import MoreDropdown from "../../components/authentication/moreDropdown";
import DeleteModal from "../../components/DeleteModal";
import Spinner from "../../components/Spinner";
import Quantity from "../../components/Quantity";
import { Link } from "react-router-dom";
import {
  updateTransferProduct,
  updateTransferStatus,
} from "../../actions/transferProduct";
import { Transfer } from "../../helpers/Transfer";
import Number from "../../lib/Number";
import Currency from "../../lib/Currency";
import ProductSearch from "../../components/productSearch";
import { fetchList } from "../../actions/table";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TransferProductService from "../../services/TransferProductService";
import StoreProductService from "../../services/StoreProductService";
import TransferService from "../../services/TransferService";
import StoreService from "../../services/StoreService";
import StatusText from "../../components/StatusText";
import DateTime from "../../lib/DateTime";
import UserCard from "../../components/UserCard";
import Url from "../../lib/Url";

const transferProduct = "transferProduct";

const TransferDetail = (props) => {
  const { pageSize, currentPage } = props;
  const [storeProductList, setStoreProductList] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [scannedProductCode, setScannedProductCode] = useState("");
  const [scannedProduct, setScannedProduct] = useState("");
  const [locationName, setName] = useState("");
  const dispatch = useDispatch();
  const [detail, setDetail] = useState(null);
  const [unitPrice, setUnitPrice] = useState();
  const [quantityLabels, setQuantityLabels] = useState();
  const [value, setValue] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const [quantity, setQuantity] = useState();

  useEffect(() => {
    getStoreProducts();
    getStoreDetails();
    getDetails();
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

  //  Get Transfer Details
  const getDetails = async () => {
    let transferId = props.id;
    const response = await TransferService.get(transferId);
    setDetail(() => response.data);
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

  const handleActionChange = (e) => {
    if (e == "Export") {
      document.getElementById("csvDownload").click();
    }

    if (e == "Print") {
      document.getElementById("Print").click();
    }
  };

  const getStoreDetails = async () => {
    let storeId = props.fromLocationId;

    if (storeId) {
      //get store products

      const response = await StoreService.get(storeId);

      if (response && response.data && response.data.data) {
        let storeDetails = response.data.data;
        setName(storeDetails.name);
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

  const getStoreProducts = async () => {
    try {
      //get store product list
      let storeProductList = new Array();
      let storeId = props.fromLocationId;

      //validate store Id exist or not
      if (storeId) {
        //get store products
        let param = {
          pagination: false,
          store_id: storeId,
        };
        const response = await StoreProductService.search(param);

        //validate response exist or not
        if (response && response.data && response.data.data) {
          //get store products
          let storeProducts = response.data.data;
          //validate store products
          if (storeProducts && storeProducts.length > 0) {
            //loop the store products
            for (let i = 0; i < storeProducts.length; i++) {
              let productDetails;
              productDetails = storeProducts[i];

              //push the store products
              storeProductList.push({
                label: getProductDetails(
                  productDetails.productName,
                  storeProducts[i].image,
                  productDetails.brand_name,
                  productDetails.size,
                  productDetails.unit,
                  productDetails.sale_price,
                  productDetails.mrp
                ),
                value:
                  productDetails.product_display_name + productDetails.barcode,
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
      let storeId = props.fromLocationId;

      let fromLocationId = props.fromLocationId;
      let toLocationId = props.toLocationId;
      let type = props.type;

      TransferData.from_store_id = fromLocationId;
      TransferData.to_store_id = toLocationId;
      TransferData.type = type;
      //get Transfer Id
      let transferProductId = props.id;

      //get store Id from params
      TransferData.storeId = storeId;

      //appens the Transfer Id
      TransferData.id = transferProductId;

      //appende the store product Id
      TransferData.productId =
        values && values.storeProduct && values.storeProduct.id;

      //append the amount
      TransferData.amount = totalAmount && totalAmount;
      //append the unitPrice
      TransferData.unitPrice = unitPrice && unitPrice;

      //append the quantiry
      TransferData.quantity =
        values && values.quantity && values.quantity.value;

      //validate Transfer Id exist or not
      if (transferProductId) {
        //create params
        let params = {
          fromLocationId: storeId,
          transferId: transferProductId,
          pagination: true,
        };

        //add Transfer product data
        dispatch(
          await TransferProductService.add(
            TransferData,
            params,
            setValue,
            setQuantityLabels
          )
        );

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
        let storeId = props.fromLocationId;

        let transferId = props.id;

        //create params
        let params = { storeId: storeId, transferId: transferId };

        dispatch(
          await TransferProductService.delete(
            selectedProduct.id,
            params,
            closeDeleteModal
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = async (id, value) => {
    try {
      let quantity = value && value.values && value.values.quantity.value;
      let body = { quantity: quantity };
      let storeId = props.fromLocationId;
      let transferId = props.id;
      let params = { storeId: storeId, transferId: transferId };

      dispatch(updateTransferProduct(id, body, params));
    } catch (err) {
      console.log(err);
    }
  };

  const closeDeleteModal = () => {
    //close modal
    setOpenDeleteModal(!openDeleteModal);
  };

  if (isLoading) {
    return <Spinner />;
  }

  const onInputChange = (e) => {
    const value = e?.values?.storeProduct;
    const unitValue = value?.label?.props?.salePrice;
    const amount = Number.Get(unitValue) * Number.Get(quantity);
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
  };

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

      {/* Page Title */}
      <div className="row d-flex">
        <div className=" d-block d-sm-none col-6">
          <PageTitle label={`(${locationName} )`} />
        </div>
      </div>

      {/* Transfer Form */}
      <div className=" card mt-2 mb-3 p-3">
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
            <ProductSearch
              storeProductList={storeProductList}
              className={"col-5"}
              onInputChange={onInputChange}
            />
            <div className="col-2">
              <Quantity
                maxQuantity={100}
                label="Quantity"
                onChange={onChange}
              />
            </div>
            <div className="col-3 pt-4">
              <SaveButton type="submit" label="Add" className="mt-2" />
            </div>
          </div>
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
          params={{
            fromLocationId: props.fromLocationId,
            transferId: props.id,
            page: Url.GetParam("page"),
            pageSize: Url.GetParam("pageSize")

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
                  size={row.size}
                  unit={row.unit}
                  salePrice={row.sale_price}
                  mrp={row.mrp}
                  id={row.product_id}
                  brand_id={row.brand_id}
                />
              </>
            )}
          >
            Product
          </ReduxColumn>
          {/* Unit Column */}
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
          <ReduxColumn
            field="reasonForTransfer"
            sortBy="reason_for_transfer"
            className="text-center"
          >
            Reason
          </ReduxColumn>
          <ReduxColumn
            field="status"
            sortBy="status"
            className="brand-all"
            renderField={(row) => (
              <StatusText
                backgroundColor={row.statusColor}
                status={row.status}
              />
            )}
          >
            Status
          </ReduxColumn>
          <ReduxColumn field="createdBy" sortBy="createdBy"
            renderField={(row) => (
              <>
                <UserCard
                  customSize={parseInt(50, 10)}
                  firstName={row.createdByName}
                  url={row.avatarUrl}
                  lastName={row.createdByLastName}
                />
              </>
            )}
          >
            Created By
          </ReduxColumn>
          <ReduxColumn
            sortBy="createdAt"
            minWidth="200px"
            className="text-center"
            renderField={(row) => (
              <span>
                {DateTime.getDateTimeByUserProfileTimezone(row?.createdAt)}
              </span>
            )}
          >
            Created At
          </ReduxColumn>
          <ReduxColumn
            field="Action"
            disableOnClick
            width="120px"
            minWidth="80px"
            maxWidth="80px"
            renderField={(row) => (
              <div className=" text-center action-group-dropdown">
                <MoreDropdown>
                  {row.status !== Transfer.STATUS_DRAFT_TEXT ? (
                    <DropdownItem
                      // className={"text-danger"}
                      onClick={() => {
                        dispatch(
                          updateTransferStatus(
                            row.id,
                            Transfer.STATUS_DRAFT_TEXT,
                            { transferId: props.id, pagination: true },
                            Url.GetParam("pageSize") ? Url.GetParam("pageSize") : pageSize,
                            Url.GetParam("page") ? Url.GetParam("page") : currentPage,
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
                            { transferId: props.id, pagination: true },
                            Url.GetParam("pageSize") ? Url.GetParam("pageSize") : pageSize,
                            Url.GetParam("page") ? Url.GetParam("page") : currentPage,
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
                          { transferId: props.id, pagination: true },
                          Url.GetParam("pageSize") ? Url.GetParam("pageSize") : pageSize,
                          Url.GetParam("page") ? Url.GetParam("page") : currentPage,
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
    reduxTable[transferProduct] &&
      reduxTable[transferProduct].isFetching == false
      ? reduxTable[transferProduct].pageSize
      : 25;

  const Count =
    reduxTable[transferProduct] && reduxTable[transferProduct].isFetching == false
      ? reduxTable[transferProduct].totalCount
      : 0;
  const currentPage =
    reduxTable[transferProduct] &&
      reduxTable[transferProduct].isFetching == false
      ? reduxTable[transferProduct].currentPage
      : 1;

  return {
    pageSize,
    currentPage,
    Count
  };
};

// export default TransferDetail;

export default connect(() => {
  return mapStateToProps;
}, mapDispatchToProps)(TransferDetail);
