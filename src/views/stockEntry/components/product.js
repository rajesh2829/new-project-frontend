import React, { useState, useEffect } from "react";
import Form from "../../../components/Form";
import ProductCard from "../../product/components/productCard";
import Currency from "../../../lib/Currency";
import Number from "../../../lib/Number";
import String from "../../../lib/String";
import { apiClient } from "../../../apiClient";
import { endpoints } from "../../../api/endPoints";
import ArrayList from "../../../lib/ArrayList";

// Components
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import { DropdownItem } from "reactstrap";
import MoreDropdown from "../../../components/authentication/moreDropdown";
import DeleteModal from "../../../components/DeleteModal";
import Spinner from "../../../components/Spinner";
import Quantity from "../../../components/Quantity";
import { useDispatch } from "react-redux";
import { StockEntryProduct } from "../../../helpers/StockEntryProduct";
import Url from "../../../lib/Url";
import StockEntryProductService from "../../../services/StockProductEntryService";
import StatusText from "../../../components/StatusText";

const Product = (props) => {

  const [storeProductList, setStoreProductList] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [scannedProductCode, setScannedProductCode] = useState("");
  const [scannedProduct, setScannedProduct] = useState("");
  const [storeName, setStoreName] = useState("");
  const [stockEntryNumber, setStockEntryNumber] = useState("");
  const dispatch = useDispatch();
  const [detail, setDetail] = useState(null);
  const [productValue, setProductValue] = useState();
  const [unitValue, setUnitValue] = useState();
  const [amountValue, setAmountValue] = useState();
  const [quantityValue, setQuantityValue] = useState();
  const [quantityLabels, setQuantityLabels] = useState();
  const [brand, setBrand] = useState(Url.GetParam("brand"));
  const [category, setCategory] = useState(Url.GetParam("category"));

  useEffect(() => {
    getStoreProducts();
    getStoreDetails();
    getDetails();
  }, []);

  //  Get Stock Entry Details
  const getDetails = async () => {
    let id = props.id;

    // setIsLoading(true);
    const response = await apiClient.get(
      `${endpoints().stockEntry}/${id}`
    );
    setDetail(() => response.data);
    setIsLoading(false);
  };

  // useEffect(() => {
  //     getProductDetail();
  // }, [scannedProductCode]);

  // useEffect(() => {
  //     removeScannedCode()
  // }, [scannedProduct]);

  // const removeScannedCode = () => {
  //     setScannedProductCode(null);
  // }

  const getStoreDetails = async () => {
    let storeId = props.storeId;


    if (storeId) {
      //get store products
      let response = await apiClient.get(`${endpoints().locationAPI}/${storeId}`);

      if (response && response.data && response.data.data) {
        let storeDetails = response.data.data;
        setStoreName(storeDetails.name);
        setStockEntryNumber(storeDetails.id);
        // setStockEntryDate(storeDetails.date)
      }
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

  // const getProductDetail = () => {
  //     if (storeProductList && storeProductList.length > 0 && scannedProductCode) {
  //         let scannedProduct = storeProductList.find((data) => data.barcode == scannedProductCode);
  //         setScannedProduct(scannedProduct);
  //     }
  // }

  // const getScannedProductCode = (value) => {
  //     try {
  //         if (value) {
  //             setScannedProductCode(value)
  //         }
  //     } catch (err) {
  //         console.log(err);
  //     }
  // }



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
        brandName={brandName}
        url={productImage}
        size={size != "null" ? size : ""}
        unit={unit != "null" ? unit : ""}
        salePrice={salePrice != "null" ? salePrice : ""}
        mrp={mrp != "null" ? mrp : ""}
      />

    );
  };

  const getStoreProducts = async () => {
    try {
      //get store product list
      let storeProductList = new Array();

      let storeId = props.storeId;

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
          if (storeProducts && ArrayList.isNotEmpty(storeProducts)) {
            //loop the store rpdocuts
            for (let i = 0; i < storeProducts.length; i++) {
              let productDetails;
              storeProducts[i].productIndex.map((item) => {
                productDetails = item;
              });
              //push the store prroducts
              if (productDetails.status !== StockEntryProduct.DRAFT)
                storeProductList.push({
                  label: getProductDetails(
                    productDetails.product_display_name,
                    storeProducts[i].image,
                    productDetails.brand_name,
                    productDetails.size,
                    productDetails.unit,
                    productDetails.sale_price,
                    productDetails.mrp),
                  value: productDetails.product_display_name + productDetails.barcode,
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

  const AddStockProductEntry = (values) => {

    try {
      setIsLoading(true);
      //create stock entry data
      let stockEntryData = new Object();

      //get store Id in params
      let storeId = props.storeId;

      //get stock entry Id
      let stockEntryId = props.id;

      //get store Id from params
      stockEntryData.storeId = storeId;

      //appens the stock entry Id
      stockEntryData.stockEntryId = stockEntryId;

      //appende the store product Id
      stockEntryData.productId =
        values && values.storeProduct && values.storeProduct.id;

      //append the quantiry
      stockEntryData.quantity =
        values && values.quantity && values.quantity.value;
      stockEntryData.amount =
        amountValue && amountValue;
      stockEntryData.unit_price =
        unitValue && unitValue;
      setIsLoading(false);
      //validate stock entry Id exist or not
      if (stockEntryId) {
        //cretae parms,
        let params = { storeId: storeId, stockEntryId: stockEntryId, pagination: true };
        //add stock product entry data
        dispatch(StockEntryProductService.create(stockEntryData, params, setProductValue(""), setQuantityLabels("")));
        getStoreProducts();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const DeleteStockProductEntry = () => {
    try {
      //validate selected prodect exist or not
      if (selectedProduct) {
        let storeId = props.storeId;

        let stockEntryId = props.id;

        //cretae parms
        let params = { storeId: storeId, stockEntryId: stockEntryId, pagination: true };

        dispatch(
          StockEntryProductService.delete(selectedProduct.id, params, closeDeleteModal)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (id, value, product_id) => {
    try {
      let storeId = props.storeId;
      let stockEntryId = props?.id;
      let quantity = value?.values.quantity?.value ? value?.values.quantity?.value : null;
      let body = { quantity: quantity, product_id: product_id, store_id: storeId, stock_entry_date: props.stock_entry_date };
      let params = {
        storeId: storeId, stockEntryId: stockEntryId, product_id: product_id, pagination: true, sort: "id",
        sortDir: "DESC",
      };
      dispatch(StockEntryProductService.update(id, body, params));
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

  const sortByOption = [
    {
      value: "id:DESC",

      label: "Most Recent",
    },
    {
      value: "product_name:ASC",
      label: "Name",
    },
  ];

  return (
    <div>
      {/* Delete confirmation Modal */}
      <DeleteModal
        isOpen={openDeleteModal}
        label={selectedProduct.product_name}
        toggle={closeDeleteModal}
        title="Delete Stock Product Entry"
        deleteFunction={DeleteStockProductEntry}
      />

      {/* Stock Product Entry List */}
      <div className="mt-4">
        <ReduxTable
          id="stockProductEntry"
          showHeader
          searchPlaceholder="Search"
          paramsToUrl={true}
          history={props.history}
          apiURL={`${endpoints().stockProductEntry}/search`}
          newTableHeading={true}
          params={{
            storeId: props.storeId,
            stockEntryId: props.id,
          }}
          sortByOptions={sortByOption}
          showStatus
          showBrandFilter
          showCategoryFilter
        >
          <ReduxColumn
            field="product_id"
            sortBy="product_name"
            type="link"
            width="400px"
            minWidth="400px"
            maxWidth="400px"
            isClickable="true"
            className="ellipsis text-wrap"
            renderField={(row) => (
              <>
                <ProductCard
                  productImageIcon
                  square
                  productName={row.product_name}
                  brandName={row.brand_name}
                  size={Number.Get(row.size)}
                  unit={String.Get(row.unit)}
                  salePrice={Currency.Get(row.sale_price)}
                  mrp={Currency.Get(row.mrp)}
                  url={row.image}
                  id={row.product_id}
                  brand_id={row.brand_id}
                  packSize={row.pack_size}
                />
              </>
            )}
          >
            Product
          </ReduxColumn>
          <ReduxColumn
            field="quantity"
            width="180px"
            sortBy="quantity"
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
                    onChange={(e) => handleUpdate(row.id, e, row.product_id)}
                  />
                </Form>
              </div>
            )}
          >
            Quantity
          </ReduxColumn>
          <ReduxColumn
            field="systemQuantity"
            className="text-center"
            sortBy="system_quantity"
            width="180px"
          >
            System Quantity
          </ReduxColumn>
          <ReduxColumn
            field="status"
            width="110px"
            maxWidth="110px"
            minWidth="110px"
            disableOnClick
            renderField={(row) => (
              <StatusText backgroundColor={row.statusColor} status={row.status} />
            )}>
            Status
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
      </div>
    </div>
  );
};

export default Product;
