import React, { Fragment } from "react";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import { endpoints } from "../../api/endPoints";
import ProductCard from "../product/components/productCard";
import { TagTypeName } from "../../helpers/Tag";

const StoreProductList = (props) => {

  let { history, bulkSelectId } = props;

  const sortByOption = [
    {
      value: "location_name:ASC",
      label: "Location Name",
    },
    {
      value: "product_name:ASC",
      label: "Product Name",
    },
  ];

  const StockTypeOption = [
    { label: "All", value: "All" },
    { label: "No Stock", value: "NoStock" },
    { label: "Excess", value: "Excess" },
    { label: "Shortage", value: "Shortage" }
  ]

  return (
    <Fragment>
      <ReduxTable
        id="storeProduct"
        showHeader
        newTableHeading
        history={history}
        apiURL={`${endpoints().storeProductAPI}/search`}
        params={{}}
        showStoreFilter
        bulkSelect
        onBulkSelect={bulkSelectId}
        customCheckBoxId="store_product_id"
        showBrandFilter
        showCategoryFilter
        showProductFilter
        showTagFilter
        tagFilterType={{
          type: TagTypeName.PRODUCT,
        }}
        showStockFilter
        searchPlaceholder="Search..."
        paramsToUrl={true}
        sortByOptions={sortByOption}
        ActionMenu={StockTypeOption}
      >
        <ReduxColumn field="location" sortBy="location_name">
          Location
        </ReduxColumn>
        <ReduxColumn
          field="productName"
          isClickable="true"
          sortBy="productName"
          renderField={(row) => (
            <>
              <ProductCard
                productImageIcon
                square
                productName={row?.productName}
                url={row.image}
                brandName={row.brand_name}
                salePrice={row.sale_price}
                size={row.size}
                unit={row.unit}
                id={row.id}
                brand_id={row.brand_id}
                status={row.status}
              />
            </>
          )}
        >
          Product Name
        </ReduxColumn>
        <ReduxColumn
          field="quantity"
          sortBy="quantity"
          className="ellipsis text-center"
          renderField={(row) => (
            <div className="text-dark">
              {row.quantity}
              <small>
                <div className="text-secondary">
                  {" "}
                  {row.last_stock_entry_date ? (
                    row.last_stock_entry_date
                  ) : (
                    <span className="text-danger">No Stock Info</span>
                  )}
                </div>
              </small>
            </div>
          )}
        >
          Quantity
        </ReduxColumn>
        <ReduxColumn
          field="order_quantity"
          sortBy="order_quantity"
          className="ellipsis text-center"
          renderField={(row) => (
            <div className="text-dark">
              {row.order_quantity}
              <small>
                <div className="text-secondary">
                  {" "}
                  {row.last_order_date ? (
                    row.last_order_date
                  ) : (
                    <span className="text-danger">No Order Info</span>
                  )}
                </div>
              </small>
            </div>
          )}
        >
          Order Quantity
        </ReduxColumn>
        <ReduxColumn
          field="min_quantity"
          sortBy="min_quantity"
          className="text-center"
        >
          Min Quantity
        </ReduxColumn>
        <ReduxColumn
          field="max_quantity"
          sortBy="max_quantity"
          className="text-center"
        >
          Max Quantity
        </ReduxColumn>
        <ReduxColumn
          field="min_order_quantity"
          sortBy="min_order_quantity"
          className="text-center"
        >
          Min Order Quantity
        </ReduxColumn>
        <ReduxColumn
          field="max_order_quantity"
          sortBy="max_order_quantity"
          className="text-center"
        >
          Max Order Quantity
        </ReduxColumn>
      </ReduxTable>
    </Fragment>
  );
};
export default StoreProductList;