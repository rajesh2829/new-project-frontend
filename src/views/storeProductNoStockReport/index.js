import React, { useState } from "react";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import PageTitle from "../../components/PageTitle";

//Config
import { endpoints } from "../../api/endPoints";
import ProductCard from "../product/components/productCard";
import BreadCrumb from "../../components/Breadcrumb";

const storeProductNoStockReport = (props) => {
  const { history } = props;

  //Sort By Option Values
  const sortByOption = [
    {
      value: "order_quantity:DESC",
      label: "Order Quantity",
    },
    {
      value: "product_name:ASC",
      label: "Name",
    },
  ];

  // Bread crumb list
  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    {
      label: "Reports",
      link: "/report",
    },
    {
      label: " Store Product - No Stock Report",
      link: "",
    },
  ];

  return (
    <>
      <BreadCrumb list={breadcrumbList} />

      <div className="row mx-1 justify-content-between mb-2">
        <PageTitle label=" Store Product - No Stock Report" />
      </div>

      <ReduxTable
        id="storeProductNoStockReport"
        searchPlaceholder="Search"
        newTableHeading
        showHeader
        apiURL={`${endpoints().storeProductNoStockReportAPI}/search`}
        sortByOptions={sortByOption}
        paramsToUrl={true}
        history={history}
        params={{}}
        showStoreFilter
        showCategoryFilter
        showBrandFilter
        showProductFilter
      >
        <ReduxColumn field="location" sortBy="location" className="text-center">
          Location
        </ReduxColumn>

        <ReduxColumn
          field="product"
          sortBy="product_name"
          renderField={(row) => (
            <>
              <ProductCard
                productImageIcon
                square
                productName={row.product_name}
                brandName={row.brand_name}
                size={row.size}
                unit={row.unit}
                salePrice={row.sale_price}
                mrp={row.mrp}
                url={row.image}
                id={row.product_id}
                brand_id={row.brand_id}
              />
            </>
          )}
        >
          Product
        </ReduxColumn>

        <ReduxColumn
          field="order_quantity"
          sortBy="order_quantity"
          className="text-center"
        >
          Order Quantity
        </ReduxColumn>
        <ReduxColumn
          field="required_quantity"
          className="text-center"
          disableOnClick
        >
          Required Quantity
        </ReduxColumn>

      </ReduxTable>
    </>
  );
};

export default storeProductNoStockReport;
