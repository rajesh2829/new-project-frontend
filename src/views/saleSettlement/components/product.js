import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { endpoints } from "../../../api/endPoints";

// Components
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";

import { ProductIcon } from "../../../assets/icons";

import ProductCard from "../../product/components/productCard";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchList } from "../../../actions/table";
import Form from "../../../components/Form";
import ProductSearch from "../../../components/productSearch";
import Quantity from "../../../components/Quantity";
import Currency from "../../../components/Currency.js";
import SaveButton from "../../../components/SaveButton";
import { apiClient } from "../../../apiClient";
import { useDispatch } from "react-redux";
import Spinner from "../../../components/Spinner";
import { DropdownItem } from "reactstrap";
import MoreDropdown from "../../../components/authentication/moreDropdown";
import DeleteModal from "../../../components/DeleteModal";
import Number from "../../../lib/Number";
import SaleSettlementService from "../../../services/SaleSettlementService";

const saleSettlementProduct = "saleSettlementProduct";
const Product = (props) => {
  props.setProductCount(props.saleSettlementProductsCount);
  const [storeProductList, setStoreProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [packList, setPackList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [productValue, setProductValue] = useState();
  const [unitValue, setUnitValue] = useState();
  const [amountValue, setAmountValue] = useState();
  const [quantityValue, setQuantityValue] = useState();
  const [quantityLabels, setQuantityLabels] = useState();
  const { storeId, saleId } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    getSaleSettlementProducts();
    getPackListNumber(500);
  }, [storeId]);

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

  const getSaleSettlementProducts = async () => {
    try {
      //get store product list
      let storeProductList = new Array();

      //validate store Id exist or not
      if (storeId) {
        //get store products
        let response = await apiClient.get(
          `${endpoints().storeProductAPI}/search?store_id=${storeId}`
        );
        //validate response exist or not
        if (response && response.data && response.data.data) {
          //get store products
          let storeProducts = response.data.data;
          //validate store products
          if (storeProducts && storeProducts.length > 0) {
            //loop the store rpdocuts
            for (let i = 0; i < storeProducts.length; i++) {
              let productDetails;
              storeProducts[i].productIndex.map((item) => {
                productDetails = item;
              });
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
                value:
                  productDetails.product_display_name + productDetails.barcode,
                id: storeProducts[i].productId,
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

  const AddSaleSettlementsProduct = async (values) => {
    setIsLoading(true);
    let saleSettlementData = new Object();
    saleSettlementData.storeId = storeId;
    saleSettlementData.saleId = saleId;

    saleSettlementData.productId =
      values && values.storeProduct && values.storeProduct.id;

    saleSettlementData.unitPrice = unitValue && unitValue;

    saleSettlementData.quantity = quantityValue && quantityValue;

    saleSettlementData.amount = amountValue && amountValue;
    saleSettlementData.time = values && values.time;
    if (saleId) {
      let params = {
        storeId: storeId,
        saleId: saleId,
      };
      dispatch(
        await SaleSettlementService.addProduct(
          saleSettlementData,
          params,
          setProductValue,
          setUnitValue,
          setAmountValue,
          setQuantityLabels,
          { pagination: true }
        )
      );

      getSaleSettlementProducts();
      setIsLoading(false);
    }
  };

  const getPackListNumber = (maxQuantity) => {
    let packList = new Array();
    for (let i = 1; i <= maxQuantity; i++) {
      packList.push({
        label: i,
        value: i,
      });
    }
    setPackList(packList);
  };

  if (isLoading) {
    return <Spinner />;
  }

  const closeDeleteModal = () => {
    //close modal
    setOpenDeleteModal(!openDeleteModal);
  };

  const DeletesaleSettlementProduct = async () => {
    try {
      //validate selected prodect exist or not
      if (selectedProduct) {
        //cretae parms
        let params = {
          storeId: storeId,
          saleId: saleId,
          pagination: true,
        };

        dispatch(
          await SaleSettlementService.deleteProduct(selectedProduct.id, params, closeDeleteModal)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onInputChange = (x) => {
    const value = x.values.storeProduct;
    const unitValue = value?.label?.props?.salePrice;
    const productValueValue = Number.Get(unitValue) * Number.Get(quantityValue);

    setProductValue(value);
    setUnitValue(unitValue);
    setAmountValue(productValueValue);
  };

  const onChange = (x) => {
    const values = x.values.quantity;
    const value = x && x?.values?.quantity?.value;
    const quantityValue = Number.Get(unitValue) * Number.Get(value);
    setQuantityValue(value);
    setQuantityLabels(values);
    setAmountValue(quantityValue);
  };


  return (
    <div>
      <div className="card mt-2 mb-3 p-3">
        <Form
          enableReinitialize={true}
          initialValues={{
            storeProduct: productValue ? productValue : "",
            quantity: quantityLabels ? quantityLabels : "",
            amount: amountValue ? amountValue : "",
            unit_price: unitValue ? unitValue : "",
          }}
          onSubmit={(values) => {
            AddSaleSettlementsProduct(values);
          }}>
          <div className="row">
            {/* Delete confirmation Modal */}
            <DeleteModal
              isOpen={openDeleteModal}
              label={selectedProduct.product_name}
              toggle={closeDeleteModal}
              title="Delete Sales Product Entry"
              deleteFunction={DeletesaleSettlementProduct}
            />

            <ProductSearch
              storeProductList={storeProductList}
              className={"col-md-5"}
              onInputChange={onInputChange}
            />
            <div className="col">
              <Quantity
                maxQuantity={100}
                label="Quantity"
                onChange={onChange}
              />
            </div>
            <div className="col">
              <Currency label="Unit Price" name="unit_price" disabled />
            </div>
            <Currency label="Amount" name="amount" required />
          </div>

          <div>
            <SaveButton type="submit" label="Add" />
          </div>
        </Form>
      </div>

      {/* Stock Product Entry List */}
      <div className="mt-4">
        <ReduxTable
          id="saleSettlementProduct"
          showHeader
          searchPlaceholder="Search"
          paramsToUrl={true}
          icon={<ProductIcon />}
          history={props.history}
          apiURL={`${endpoints().saleProduct}/search`}
          newTableHeading
          sortByDropdown
          showPageSize={false}
          params={{ storeId: props.storeId, saleId: props.saleId }}>
          <ReduxColumn
            field="item"
            className="ellipsis text-center"
            disableOnClick>
            Item#
          </ReduxColumn>
          <ReduxColumn
            field="product_name"
            sortBy="product_name"
            className="ellipsis"
            type="link"
            width="400px"
            isClickable="true"
            renderField={(row) => (
              <>
                <Link to={`/product/${row.product_id}`}>
                  <ProductCard
                    productImageIcon
                    square
                    productName={row.product_name}
                    brandName={row.brand_name}
                    size={row.size != "null" ? row.size : ""}
                    unit={row.unit != "null" ? row.unit : ""}
                    salePrice={row.sale_price != "null" ? row.sale_price : ""}
                    mrp={row.mrp != "null" ? row.mrp : ""}
                    url={row.image}
                  />
                </Link>
              </>
            )}>
            Product
          </ReduxColumn>
          <ReduxColumn className="text-center" field="unit_price">
            Unit Price
          </ReduxColumn>
          <ReduxColumn className="ellipsis text-center" field="quantity">
            Quantity
          </ReduxColumn>
          <ReduxColumn
            field="amount"
            className="ellipsis text-right"
            renderField={(row) => <span>{row.amount}</span>}
            sortBy="amount">
            Amount
          </ReduxColumn>
          <ReduxColumn
            field="status"
            disableOnClick
            width="70px"
            renderField={(row) => (
              <>
                <div className="d-flex justify-content-center align-items-center row">
                  <div className="text-dark landing-group-dropdown">
                    <MoreDropdown>
                      <DropdownItem
                        className=" text-danger cursor-pointer"
                        onClick={() => {
                          setOpenDeleteModal(true);
                          setSelectedProduct(row);
                        }}>
                        Delete
                      </DropdownItem>
                    </MoreDropdown>
                  </div>
                </div>
              </>
            )}>
            Action
          </ReduxColumn>
        </ReduxTable>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  const reduxTable = state.table;

  // Get Published products count
  const saleSettlementProductsCount =
    reduxTable[saleSettlementProduct] && reduxTable[saleSettlementProduct].isFetching == false
      ? reduxTable[saleSettlementProduct].totalCount
      : 0;

  return {
    saleSettlementProductsCount,
  };
}

// Map Dispatch to props
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch),
  };
}
// export default ;
export default connect(mapStateToProps, mapDispatchToProps)(Product);
