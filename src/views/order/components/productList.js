import React from "react";
import { Link } from "react-router-dom";

// Components
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";

import ProductCard from "../../product/components/productCard";

import { endpoints } from "../../../api/endPoints";



const ProductList = (props) => {
  const BulkSelect = (values) => {
    props.MultiSelectProduct(values);

  };

  return (
    <>
      <ReduxTable
        id="Product"
        bulkSelect
        showScroll
        onBulkSelect={BulkSelect}
        showHeader
        showDropdown={true}
        showStatusOptions={false}
        params={{
        }}
        searchPlaceholder="Search"
        apiURL={`${endpoints().storeProductAPI}/search/${props.storeId}`}
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
export default ProductList;
