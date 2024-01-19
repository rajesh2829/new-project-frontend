import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";

// Components
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import ProductCard from "../../product/components/productCard";

// Actions
import { fetchList } from "../../../actions/table";

// Constant
import * as StoreProduct from "../../../helpers/Product";

// ApiClient
import { apiClient } from "../../../apiClient";

//Config
import { isBadRequest } from "../../../lib/Http";
import { addStore } from "../../../actions/storeList";
import { endpoints } from "../../../api/endPoints";
import Url from "../../../lib/Url";

// Defining the product status as Published, Draft and All.
const publishedProducts = "publishedProducts";

const Product = (props) => {
  const [selectedIds, setSeletedIds] = useState([0]);
  const [openBulkUpdateModal, setOpenBulkUpdateModal] = useState(false);
  const [brandId, setBrandId] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const handleBrandChange = (values) => {
    let statusObj = values;
    let statusArray = [];
    const selectedStatusArrays = Object.entries(statusObj);
    if (selectedStatusArrays.length > 0) {
      selectedStatusArrays.forEach(async (selectedStatusArray) => {
        if (selectedStatusArray && selectedStatusArray.length > 0) {
          const value = selectedStatusArray[1];
          let brandIds = [];
          if (value && value.BrandSelect) {
            brandIds.push(value.BrandSelect.value);
          };

          statusArray.push(brandIds);
          setBrandId(brandIds);
          dispatch(
            fetchList(
              "Products",
              `${endpoints().locationAPI}/productList/search/${props.storeId}`,
              1,
              25,
              {
                category: categoryId,
                brand: brandIds,
                search: Url.GetParam("search") || "",

              }
            )
          );
        }
      });
    }
  };

  const handleCategoryChange = (values) => {
    let statusObj = values;
    let statusArray = [];
    const selectedStatusArrays = Object.entries(statusObj);
    if (selectedStatusArrays.length > 0) {
      selectedStatusArrays.forEach(async (selectedStatusArray) => {
        if (selectedStatusArray && selectedStatusArray.length > 0) {
          const value = selectedStatusArray[1];
          let categoryIds = [];
          if (value && value.CategorySelect) {
            categoryIds.push(value.CategorySelect.value);
          }
          statusArray.push(categoryIds);
          setCategoryId(categoryIds);
          dispatch(
            fetchList(
              "Products",
              `${endpoints().locationAPI}/productList/search/${props.storeId}`,
              1,
              25,
              {
                brand: brandId,
                category: categoryIds,
                search: Url.GetParam("search") || "",

              }
            )
          );
        }
      });
    }
  };
  
  // Use Effect
  useEffect(() => {
    getProductList();
  }, []);

  // Toggling the Bulk Update Modal
  const toggleBulkUpdateModal = () => {
    setOpenBulkUpdateModal(!openBulkUpdateModal);
  };

  const dispatch = useDispatch();

  const BulkSelect = (values) => {
    props.MultiSelectProduct(values);
    try {
      // dispatch(addStore(data));
    } catch (error) { }
  };

  // Getting the active store details in the multi select dropdowns.
  const getProductList = async () => {
    try {
      const response = await apiClient.get(`${endpoints().productAPI}/search`);

      const data = response && response.data && response.data.data;
      if (data && data.length > 0) {
        const productList = [];
        data.forEach((product) => {
          if (product.status !== tabConstant.ProductStoreStatus.INACTIVE)
            productList.push({
              id: product.id,
              name: product.name,
              category: product.category,
              brand: product.brand,
              cost: product.cost,
              price: product.price,
              sale_price: product.sale_price,
              quantity: product.quantity,
              status: product.status,
            });
        });
        setExportData(productList);
      }
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

  return (
    <>
      <ReduxTable
        id="Products"
        bulkSelect
        showScroll
        onBulkSelect={BulkSelect}
        showHeader
        showDropdown={true}
        showStatusOptions={false}
        params={{
          status: StoreProduct.Product.STATUS_ACTIVE,
          brand: brandId == 0 ? "" : brandId,
          category: categoryId == 0 ? "" : categoryId,
          sort: Url.GetParam("sort") ? Url.GetParam("sort") : "name",
          sortDir: Url.GetParam("sortDir") ? Url.GetParam("sortDir") : "sortDir"
        }}
        onBrandChange={handleBrandChange}
        onCategoryChange={handleCategoryChange}
        sortByDropdown={true}
        history={props.history}
        searchPlaceholder="Search"
        apiURL={`${endpoints().locationAPI}/productList/search/${props.storeId}`}
        newTableHeading
        showNoRecord
        message="You can start by clicking on Add New"
      >
        <ReduxColumn
          // field="name"
          type="link"
          isClickable="true"
          sortBy="name"
          renderField={(row) => (
            <>
              <Link>
                <ProductCard
                  productImageIcon
                  square
                  brandName={row.brand}
                  salePrice={row.sale_price}
                  productName={row.name}
                  url={row.image}
                  size={row.size}
                  unit={row.unit}
                  mrp={row.mrp}
                />
              </Link>
            </>
          )}
        >
          Product
        </ReduxColumn>
      </ReduxTable>
    </>
  );
};

// Map State to props
function mapStateToProps(state) {
  const reduxTable = state.table;

  // Get Published products count
  const PublishedProducts =
    reduxTable[publishedProducts] &&
      reduxTable[publishedProducts].isFetching == false
      ? reduxTable[publishedProducts].totalCount
      : 0;

  return {
    PublishedProducts,
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
