import React from "react";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import ProductCard from "../../product/components/productCard";
import { endpoints } from "../../../api/endPoints";
import formatCurrency from "../../../lib/Currency";
import { Tabs } from "..";
import { Link } from "react-router-dom";
import DateTime from "../../../lib/DateTime";

const PurchaseProductList = (props) => {
  const { history, tab, params } = props
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
    <>
      <div className="mt-4">
        <ReduxTable
          id="purchaseProduct"
          showHeader
          searchPlaceholder="Search"
          paramsToUrl={true}
          history={history}
          apiURL={`${endpoints().purchaseProductAPI}/search`}
          newTableHeading
          sortByOptions={sortByOption}
          params={{
            tab: Tabs.PURCHASE_PRODUCTS,
            ...params
          }}
          showDateFilter
          showBrandFilter
          showCategoryFilter
          showAccountFilter
          showProductFilter
        >
          <ReduxColumn
            field="purchaseNumber"
            width="120px"
            minWidth="120px"
            className="text-center"
            maxWidth="220px"
            type="link"
            sortBy="purchase_number"
            isClickable="true"
            renderField={(row) => (
              <Link to={`/purchase/${row.id}`}>{row.purchase_number}</Link>
            )}>
            Purchase#
          </ReduxColumn>
          <ReduxColumn
            className="text-center"
            width="80px"
            minWidth="100px"
            maxWidth="80px"
            sortBy="purchase_date"
            renderField={(row) => (
              <span>{DateTime.getDate(row.purchase_date)}</span>
            )}
          >
            Date
          </ReduxColumn>
          <ReduxColumn
            className="ellipsis text-center"
            field="vendor_name"
            sortBy="vendor_name"

          >
            Vendor
          </ReduxColumn>
          <ReduxColumn
            field="product_name"
            sortBy="product_name"
            width="400px"
            minWidth="400px"
            maxWidth="400px"
            className="ellipsis text-wrap"
            type="link"
            isClickable="false"
            renderField={(row) => (
              <>
                <ProductCard
                  productImageIcon
                  square
                  param={row}
                  productName={row.product_name}
                  brandName={row.brand_name}
                  productLink={row.image}
                  url={row.image}
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
            {" "}
            Product
          </ReduxColumn>
          <ReduxColumn
            className="ellipsis text-center"
            field="quantity"
            sortBy="quantity"
          >
            Quantity
          </ReduxColumn>
          <ReduxColumn
            className="ellipsis text-right"
            field="unit_price"
            sortBy="unit_price"
            renderField={(row) => (
              <span>{formatCurrency.Format(row.unit_price)}</span>
            )}
          >
            Unit Price
          </ReduxColumn>
          <ReduxColumn
            className="ellipsis text-right"
            field="netAmount"
            sortBy="netAmount"
            renderField={(row) => (
              <span>{formatCurrency.Format(row.netAmount)}</span>
            )}
          >
            Net Amount
          </ReduxColumn>
        </ReduxTable>
      </div>
    </>
  );
};

export default PurchaseProductList;
