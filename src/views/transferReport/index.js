import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { endpoints } from "../../api/endPoints";
import BreadCrumb from "../../components/Breadcrumb";
import PageTitle from "../../components/PageTitle";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import Url from "../../lib/Url";
import ProductCard from "../product/components/productCard";

const TransferReportList = (props) => {

  const sortByOption = [
    {
      value: "id:DESC",
      label: "Most Recent",
    },
  ];

  // Bread crumb list
  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    { label: "Reports", link: "/report" },
    { label: "Transfer Product Report", link: "" },
  ];

  let from_location = Url.GetParam("fromLocation");
  let to_location = Url.GetParam("toLocation");
  let type = Url.GetParam("type");


  return (
    <>
      <BreadCrumb list={breadcrumbList} />
      <PageTitle label="Transfer Product Report" />

      <ReduxTable
        id="transferReport"
        showHeader
        searchPlaceholder="Search"
        apiURL={`${endpoints().transferProductApi}/report`}
        newTableHeading
        icon={<FontAwesomeIcon icon={faStar} />}
        message="You can start by clicking add."
        sortByOptions={sortByOption}
        params={{
        }}
        sortByDropdown
        paramsToUrl={true}
        showFromToLocationFilter
        showDateFilter
        showTypeFilter
        showBrandFilter
        showCategoryFilter
        history={props.history}
      >
        {/* From Store Column*/}
        {from_location && (
          <ReduxColumn
            field="from_location_name"
            sortBy="from_location_name"
            className="text-center"
          >
            From Location
          </ReduxColumn>
        )}

        {/* TO Location Column */}
        {to_location && (
          <ReduxColumn
            field="to_location_name"
            sortBy="to_location_name"
            className="text-center"
          >
            To Location
          </ReduxColumn>
        )}
        {/* Type Column */}
        {type && (
          <ReduxColumn
            field="transfer_type"
            sortBy="transfer_type"
            className="text-center"
          >
            Type
          </ReduxColumn>
        )}
        <ReduxColumn
          field="product_name"
          sortBy="product_name"
          renderField={(row) => (
            <>
              <ProductCard
                productImageIcon
                square
                productName={row.product_name}
                url={row.image}
                brandName={row.brand_name}
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
          Product
        </ReduxColumn>
        {/* Quantity Column */}
        <ReduxColumn field="quantity" sortBy="quantity" className="text-center">
          Quantity
        </ReduxColumn>
      </ReduxTable>
    </>
  );
};

export default TransferReportList;
