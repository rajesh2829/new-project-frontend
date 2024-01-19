import React from "react";
import { Link } from "react-router-dom";

// Configs
import { endpoints } from "../../../api/endPoints";

// Helper
import Currency from "../../../lib/Currency";

// Component
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";

import ProductCard from "../../product/components/productCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";

const ProductOrderList = ({
  onBulkSelect,
  selectedPageSize,
  sortByOptions,
  selectedSort,
  searchTerm,
  params,
  currentPage,
  id,
  history
}) => {
  return (
    <ReduxTable
      bulkSelect
      id={id}
      showHeader
      searchPlaceholder="Search Products..."
      newTableHeading
      apiURL={`${endpoints().vendorProduct}/search`}
      sortByOptions={sortByOptions}
      isClickable="true"
      onBulkSelect={onBulkSelect}
      selectedPageSize={selectedPageSize}
      selectedSort={selectedSort}
      searchTerm={searchTerm}
      params={params}
      icon={<FontAwesomeIcon icon={faTruckFast}/>}
      message="You can start by clicking on Add New"
      currentPage={currentPage}
    >
      <ReduxColumn
        renderField={(row) => (
          <Link to={`/vendor/product/detail/${row.id}`}>
            <ProductCard square productName={row.name} url={row.image} />
          </Link>
        )}
        field="name"
        type="link"
        sortBy="name"
        isClickable="true"
      >
        Name
      </ReduxColumn>
      <ReduxColumn field="vendor" sortBy="vendor_id">
        Vendor
      </ReduxColumn>
      <ReduxColumn field="category" sortBy="category_id">
        Category
      </ReduxColumn>
      <ReduxColumn field="brand" sortBy="brand_id">
        Brand
      </ReduxColumn>
      <ReduxColumn
        field="price"
        sortBy="price"
        renderField={(row) => <span>{Currency.Format(row.price)}</span>}
      >
        Price
      </ReduxColumn>
      <ReduxColumn
        field="sale_price"
        sortBy="sale_price"
        renderField={(row) => (
          <span>{Currency.Format(row.sale_price)}</span>
        )}
      >
        Sale Price
      </ReduxColumn>
      <ReduxColumn field="size" sortBy="size">
        Size
      </ReduxColumn>
      <ReduxColumn field="unit" sortBy="unit">
        Unit
      </ReduxColumn>

      <ReduxColumn field="status" sortBy="status">
        Status
      </ReduxColumn>

      <ReduxColumn field="last_updated_at" sortBy="lastUpdatedAt">
        Updated At
      </ReduxColumn>
    </ReduxTable>
  );
};

export default ProductOrderList;
