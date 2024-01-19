import React from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { bindActionCreators } from "redux";

// Components
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";

import ProductCard from "../product/components/productCard";
// Actions
import { fetchList } from "../../actions/table";
// Constant
import * as VendorProduct from "../../helpers/Product";

import { endpoints } from "../../api/endPoints";
import { useState } from "react";
import { Brand } from "../../helpers/Brand";
import Url from "../../lib/Url";

const publishedProducts = "publishedProducts";

const VendorProductList = (props) => {

  const [category, setCategory] = useState();
  const [brand, setBrand] = useState();
  const BulkSelect = (values) => {
    try {
      props.MultiSelectProduct(values);
    } catch (error) { }
  };

  const dispatch = useDispatch()
  const handleBrandChange = (values) => {

    const data = values?.values?.BrandSelect?.value
    setBrand(data ? data : "");
    dispatch(
      fetchList(
        "publishedProducts",
        `${endpoints().accountAPI}/productList/search`,
        1,
        25,
        {
          brand: data ? data : "",
          status: Brand.STATUS_ACTIVE,
          category: category ? category : "",
          search: Url.GetParam("search") || "",
          id: props?.vendorId,
          pagination: true,
        }
      )
    );

  };

  const handleCategoryChange = (values) => {
    const data = values?.values?.CategorySelect?.value
    setCategory(data ? data : "");
    dispatch(
      fetchList(
        "publishedProducts",
        `${endpoints().accountAPI}/productList/search`,
        1,
        25,
        {
          brand: brand ? brand : "",
          status: Brand.STATUS_ACTIVE,
          category: data ? data : "",
          search: Url.GetParam("search") || "",
          id: props?.vendorId,
          pagination: true,
        }
      )
    );

  };
  return (
    <div>
      <ReduxTable
        id="publishedProducts"
        bulkSelect
        onBulkSelect={BulkSelect}
        showHeader
        newTableHeading
        showScroll
        showDropdown
        showStatusOptions={false}
        params={{
          status: VendorProduct.Product.STATUS_ACTIVE,
          id: props?.vendorId,
          brand: brand ? brand : "",
          category: category ? category : "",
        }}
        sortByDropdown={true}
        searchPlaceholder="Search"
        apiURL={`${endpoints().accountAPI}/productList/search`}
        onCategoryChange={handleCategoryChange}
        onBrandChange={handleBrandChange}
        history={props.history}
        paramsToUrl={true}
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
                  productName={row.name}
                  url={row.image}
                  brandName={row.brand}
                  salePrice={row.sale_price}
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
    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(VendorProductList);
