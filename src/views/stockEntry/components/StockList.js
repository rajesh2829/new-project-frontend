import React, { useState } from "react";
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

//Config
import { endpoints } from "../../../api/endPoints";
import Url from "../../../lib/Url";

// Defining the product status as Published, Draft and All.
const publishedProducts = "publishedProducts";

const StockList = (props) => {
  let storeId = props.storeId;
  let stockEntryId = props.stockEntryId;
  const [openBulkUpdateModal, setOpenBulkUpdateModal] = useState(false);
  const [brandId, setBrandId] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const { history } = props;
  const handleBrandChange = (values) => {
    let statusObj = values;
    let statusArray = [];
    const selectedStatusArrays = Object.entries(statusObj);
    if (selectedStatusArrays.length > 0) {
      selectedStatusArrays.forEach(async (selectedStatusArray) => {
        if (selectedStatusArray && selectedStatusArray.length > 0) {
          const value = selectedStatusArray[1].BrandSelect;
          let brandIds = [];
          value &&
            value.length > 0 &&
            value.forEach((data) => {
              brandIds.push(data.value);
            });

          statusArray.push(brandIds);
          setBrandId(
            values?.values?.BrandSelect?.value
              ? values?.values?.BrandSelect?.value
              : ""
          );
          dispatch(
            fetchList(
              "publishedProducts",
              `${endpoints().locationAPI}/productList/search/${stockEntryId}`,
              1,
              25,
              {
                category: categoryId,
                brand: values?.values?.BrandSelect?.value
                  ? values?.values?.BrandSelect?.value
                  : "",
                search: Url.GetParam("search") || "",
                pagination: true,
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
          const value = selectedStatusArray[1].CategorySelect;
          let categoryIds = [];
          value &&
            value.length > 0 &&
            value.forEach((data) => {
              categoryIds.push(data.value);
            });
          statusArray.push(categoryIds);
          setCategoryId(
            values?.values?.CategorySelect?.value
              ? values?.values?.CategorySelect?.value
              : ""
          );
          dispatch(
            fetchList(
              "publishedProducts",
              `${endpoints().locationAPI}/productList/search/${stockEntryId}`,
              1,
              25,
              {
                brand: brandId,
                category: values?.values?.CategorySelect?.value
                  ? values?.values?.CategorySelect?.value
                  : "",
                search: Url.GetParam("search") || "",
                pagination: true,
              }
            )
          );
        }
      });
    }
  };

  // Toggling the Bulk Update Modal
  const toggleBulkUpdateModal = () => {
    setOpenBulkUpdateModal(!openBulkUpdateModal);
  };

  const dispatch = useDispatch();

  const BulkSelect = (values) => {
    console.log("values :>> ", values);
    props.MultiSelectProduct(values);
    try {
      // dispatch(addStore(data));
    } catch (error) { }
  };

  return (
    <>
      <ReduxTable
        id="publishedProducts"
        bulkSelect
        onBulkSelect={BulkSelect}
        showHeader
        showScroll
        showDropdown={true}
        showStatusOptions={false}
        params={{
          status: StoreProduct.Product.STATUS_ACTIVE,
          brand: brandId == 0 ? "" : brandId,
          category: categoryId == 0 ? "" : categoryId,
          store_id: storeId,
          stockEntryId: props.stockEntryId,
          search: Url.GetParam("search") || "",
        }}
        onBrandChange={handleBrandChange}
        onCategoryChange={handleCategoryChange}
        sortByDropdown={true}
        searchPlaceholder="Search"
        apiURL={`${endpoints().locationAPI}/productList/search/${stockEntryId}`}
        newTableHeading
        showNoRecord
        message="You can start by clicking on Add New"
        history={history}
        paramsToUrl={true}
      >
        <ReduxColumn
          field="name"
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
                  mrp={row.mrp}
                  size={row.size}
                  unit={row.unit}
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
export default connect(mapStateToProps, mapDispatchToProps)(StockList);
