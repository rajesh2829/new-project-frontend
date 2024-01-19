import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import { Table, TabPane } from "reactstrap";
import { bindActionCreators } from "redux";
import { fetchList } from "../../actions/table";
import * as tabConstant from "../../helpers/StoreList";
import { PAGESIZE, SORT_DIR, PAGE } from "../../helpers/Status";

// Components
import PageTitle from "../../components/PageTitle";
import ActiveStore from "../salesSettlementReport/components/salesBarChart";

//css
import "../../scss/_custom.scss";
import { isLoggedIn } from "../../lib/Helper";
import Url from "../../lib/Url";

import Filter from "../salesSettlementReport/components/Filter";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Currency from "../../lib/Currency";
import AvatarCard from "../product/components/productCard";
import { endpoints } from "../../api/endPoints";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import BreadCrumb from "../../components/Breadcrumb";
import ProductCard from "../../views/product/components/productCard";
import DateTime from "../../lib/DateTime";
import PurchaseProductService from "../../services/PurchaseProductService";
import { TagTypeName } from "../../helpers/Tag";
const activeStore = "activeStore";

const Report = (props) => {

  const sortByOption = [
    {
      value: "id:DESC",
      label: "Quantity",
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
      label: "Purchase Products Report",
      link: "",
    },
  ];


  return (
    <>
      <BreadCrumb list={breadcrumbList} />
      <div className="d-flex justify-content-between mb-3">
        <PageTitle label="Purchase Products Report" />
      </div>

      <div className="mt-4">
        <ReduxTable
          id="productReport"
          showHeader
          newTableHeading
          searchPlaceholder="Search"
          paramsToUrl={true}
          sortByOptions={sortByOption}
          params={{}}
          apiURL={`${endpoints().purchaseProductReportAPI}/search`}
          showDateFilter
          showStoreFilter
          showAccountFilter
          showCategoryFilter
          showBrandFilter
          tagFilterType={{ type: TagTypeName.PRODUCT }}
          showTagFilter
          history={props.history}
        >
          <ReduxColumn field="vendor">
            Vendor
          </ReduxColumn>
          <ReduxColumn
            field="product_name"
            sortBy="product_name"
            renderField={(row) => (
              <>
                <ProductCard
                  productImageIcon
                  square
                  productName={row.product_name}
                  brandName={row.brand_name}
                  salePrice={row.sale_price}
                  size={row.size}
                  unit={row.unit}
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
            field="quantity"
            className="text-center"

          >
            Quantity
          </ReduxColumn>
        </ReduxTable>
      </div>
      {/* Graph Table End */}
    </>
  );
};


export default Report;
