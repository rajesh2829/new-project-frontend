import React, {useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";

// Components
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import ProductCard from "../../product/components/productCard";

// Actions
import { fetchList } from "../../../actions/table";


import { endpoints } from "../../../api/endPoints";
import Url from "../../../lib/Url";
import { Product } from "../../../helpers/Product";
// Defining the product status as Published, Draft and All.

const publishedProducts = "purchaseOrderProduct";

const ProductList = (props) => {
  
  const {history} = props;

  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  
  const dispatch = useDispatch();

  const BulkSelect = (values) => {
    try {
      props.MultiSelectProduct(values);
      // dispatch(addStore(data));
    } catch (error) {}
  };

  const handleCategoryChange = (values) => {
    if (
      values?.values?.CategorySelect &&
      values?.values?.CategorySelect !== undefined
    ) {
      setCategory(
        values.values.CategorySelect?.value
      );
    } else  {
      setCategory("");
    }
    dispatch(
      fetchList(
        "purchaseOrderProduct",
        `${endpoints().purchaseOrderAPI}/productList`,
        1,
        25,
        {
          brand: brand ? brand : "",
          category: values?.values?.CategorySelect?.value
            ? values?.values?.CategorySelect?.value
            : "",
          pagination: true,
          vendor_id: props.vendorId ? props.vendorId : "",
          purchaseOrderId: props.purchaseOrderId,
          search:Url.GetParam("search")
        }
      )
    );
  };

  // Handle Brand Change
  const handleBrandChange = (values) => {
    if (
      values?.values?.BrandSelect &&
      values?.values?.BrandSelect !== undefined
    ) {
      setBrand(
        values?.values?.BrandSelect?.value
      );
    } else  {
      setBrand("");
    }
    dispatch(
      fetchList(
        "purchaseOrderProduct",
        `${endpoints().purchaseOrderAPI}/productList`,
        1,
        25,
        {
          brand: values?.values?.BrandSelect?.value
            ? values?.values?.BrandSelect?.value
            : "",
          category: category ? category : "",
          pagination: true,
          vendor_id: props.vendorId ? props.vendorId : "",
          purchaseOrderId: props.purchaseOrderId,
          search:Url.GetParam("search")

        }
      )
    );
  };

  return (
    <div>
      <ReduxTable
        id="purchaseOrderProduct"
        bulkSelect
        onBulkSelect={BulkSelect}
        showHeader
        showScroll
        showDropdown={true}
        showStatusOptions={false}
        onCategoryChange={handleCategoryChange}
        onBrandChange={handleBrandChange}
        params={{
          category: category == 0 ? "" : category,
          pagination: true,
          brand: brand == 0 ? "" : brand,
          vendor_id: props.vendorId,
          purchaseOrderId: props.purchaseOrderId,
          search:Url.GetParam("search"),
          status:Product.STATUS_ACTIVE
        }}
        sortByDropdown={true}
        searchPlaceholder="Search"
        apiURL={`${endpoints().purchaseOrderAPI}/productList`}
        newTableHeading
        history={history}
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
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
