import React from "react";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import PageTitle from "../../components/PageTitle";

//Config
import { endpoints } from "../../api/endPoints";
import ProductCard from "../product/components/productCard";
import BreadCrumb from "../../components/Breadcrumb";

const storeProductNoOrderReport = (props) => {
  const { history } = props;

  //Sort By Option Values
  const sortByOption = [
    {
      value: "quantity:DESC",
      label: "Quantity",
    },
    {
      value: "product_name:ASC",
      label: "Name",
    },
    {
      value: "mrp:DESC",
      label: "mrp",
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
      label: " Store Product - No Order Report",
      link: "",
    },
  ];

  return (
    <>
      <BreadCrumb list={breadcrumbList} />

      <div className="d-flex justify-content-between mb-2">
        <PageTitle label=" Store Product - No Order Report" />
      </div>
      <ReduxTable
        id="storeProductNoOrderReport"
        searchPlaceholder="Search"
        newTableHeading
        showHeader
        apiURL={`${endpoints().storeProductNoOrderReportAPI}/search`}
        sortByOptions={sortByOption}
        paramsToUrl={true}
        history={history}
        params={{}}
        showDateFilter
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

        <ReduxColumn field="quantity" sortBy="quantity" className="text-center">
          Quantity
        </ReduxColumn>
      </ReduxTable>
    </>
  );
};

export default storeProductNoOrderReport;
