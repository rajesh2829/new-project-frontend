import React, { useEffect } from "react";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import PageTitle from "../../components/PageTitle";
import ProductCard from "../product/components/productCard";
import { endpoints } from "../../api/endPoints";
import Url from "../../lib/Url";
import BreadCrumb from "../../components/Breadcrumb";

const purchaseRecommendationReport = (props) => {
  useEffect(() => { }, []);

  const sortByOption = [
    {
      value: "product_name:ASC",
      label: "Product Name",
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
      label: "Purchase Recommendation Report",
      link: "",
    },
  ];

  return (
    <>
      <BreadCrumb list={breadcrumbList} />

      <div className="row mx-1 justify-content-between mb-2">
        <PageTitle label="Purchase: Recommendation Report" />
      </div>

      <div className="mt-4">
        <ReduxTable
          id="purchaseRecommendationReport"
          showHeader={true}
          apiURL={`${endpoints().purchaseRecommendationReportAPI}/search`}
          searchPlaceholder="Search"
          sortByOptions={sortByOption}
          paramsToUrl={true}
          history={props.history}
          params={{
            sort: Url.GetParam("sort")
              ? Url.GetParam("sort")
              : "required_quantity",
            sortDir: Url.GetParam("sortDir") ? Url.GetParam("sortDir") : "DESC",
            pageSize: Url.GetParam("pageSize") ? Url.GetParam("pageSize") : "",
          }}
          newTableHeading
          showAccountFilter
          showBrandFilter
          showSingleDateFilter
        >
          <ReduxColumn
            field="product"
            sortBy="product_name"
            renderField={(row) => (
              <>
                <ProductCard
                  productImageIcon
                  square
                  productName={row.product_name}
                  brandName={row.brand}
                  size={row.size}
                  unit={row.unit}
                  url={row.image}
                  id={row.product_id}
                  brand_id={row.brand_id}
                  salePrice={row.sale_price}
                  mrp={row.mrp}
                  packSize={row.pack_size}
                />
              </>
            )}
          >
            Product
          </ReduxColumn>
          <ReduxColumn
            field="total_order_quantity"
            sortBy="total_order_quantity"
            className="text-center"
          >
            Order Quantity
          </ReduxColumn>
        </ReduxTable>
      </div>
    </>
  );
};

export default purchaseRecommendationReport;
