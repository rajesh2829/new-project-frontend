import React, { useEffect } from "react";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import PageTitle from "../../components/PageTitle";
import ProductCard from "../product/components/productCard";
import { endpoints } from "../../api/endPoints";
import Url from "../../lib/Url";
import BreadCrumb from "../../components/Breadcrumb";
import Pdf from "./pdf"
import ReportType from "../../helpers/stockReport";

const storeProductReport = (props) => {

  useEffect(() => {
  }, []);

  const sortByOption = [
    {
      value: "product_name:ASC",
      label: "Product Name",
    },
    {
      value: "location:ASC",
      label: "Location Name",
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
      label: "Store Product Report",
      link: "",
    },
  ];

  const actionOptions = [
    {
      label: "Download As PDF",
      value: "Download As PDF",
    }
  ];

  const reportTypes = [
    { label: "Low Stock", value: ReportType.LOW_STOCK },
    { label: "High Stock", value: ReportType.HIGH_STOCK },
  ];

  return (
    <>
      <BreadCrumb list={breadcrumbList} />

      <div className="row mx-1 justify-content-between mb-2">
        <PageTitle label="Store Product Report" />
        <Pdf actionOptions={actionOptions} />
      </div>
      <div className="mt-4">
        <ReduxTable
          id="storeProductReport"
          showHeader={true}
          apiURL={`${endpoints().storeProductReportAPI}/search`}
          searchPlaceholder="Search"
          sortByOptions={sortByOption}
          paramsToUrl={true}
          history={props.history}
          params={{
            sort: Url.GetParam("sort") ? Url.GetParam("sort") : "product_name",
            sortDir: Url.GetParam("sortDir") ? Url.GetParam("sortDir") : "ASC",
            pageSize: Url.GetParam("pageSize") ? Url.GetParam("pageSize") : ""
          }}
          newTableHeading
          showBrandFilter
          showCategoryFilter
          showStoreFilter
          showTypeFilter
          customTypeOption={reportTypes}
          showStockReportFilter>
          <ReduxColumn field="location" sortBy="location" className="text-left">
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
                  productName={row.product}
                  brandName={row.brand}
                  size={row.size}
                  unit={row.unit}
                  url={row.image}
                  id={row.product_id}
                  brand_id={row.brand_id}
                  salePrice={row.sale_price}
                  mrp={row.mrp}

                />
              </>
            )}>
            Product
          </ReduxColumn>
          <ReduxColumn
            field="quantity"
            sortBy="quantity"
            className="text-center"
          >
            Quantity
          </ReduxColumn>
          <ReduxColumn
            field="order_quantity"
            sortBy="order_quantity"
            className="text-center"
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
            field="last_stock_entry_date"
            sortBy="last_stock_entry_date">
            Last Stock Entry Date
          </ReduxColumn>
          <ReduxColumn field="last_order_date"
            sortBy="last_order_date"
            className="text-center"
          >
            Last Order Date
          </ReduxColumn>
        </ReduxTable>
      </div>
    </>
  );
};

export default storeProductReport;
