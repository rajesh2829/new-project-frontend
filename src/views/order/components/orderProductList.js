import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { endpoints } from "../../../api/endPoints";
import StatusText from "../../../components/StatusText";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import ObjectName from "../../../helpers/ObjectName";
import Currency from "../../../lib/Currency";
import DateTime from "../../../lib/DateTime";
import Url from "../../../lib/Url";
import { DEFAULT_PAGE } from "../../product";
import ProductCard from "../../product/components/productCard";
import { Order } from "../../../helpers/Order";

const OrderProductList = (props) => {
  let { handleBulkSelect } = props;

  const [page, setPage] = useState(Url.GetParam("page"));




  const orderSortOptions = [
    {
      value: "id:DESC",
      label: "Most Recent",
    },
    {
      value: "product_display_name:ASC",
      label: "Name",
    },
  ];
  const typeOptions = [
    {
      label: Order.TYPE_DELIVERY_TEXT,
      value: Order.TYPE_DELIVERY,
    },
  ];


  return (
    <>
      <ReduxTable
        id="OrderProduct"
        showHeader
        newTableHeading
        apiURL={`${endpoints().orderProductAPI}/search`}
        searchPlaceholder="Search"
        paramsToUrl={true}
        sortByOptions={orderSortOptions}
        history={props.history}
        icon={<FontAwesomeIcon icon={faCartShopping} />}
        message="You can start by clicking on Add Order"
        showDateFilter
        showCategoryFilter
        showBrandFilter
        showStoreFilter
        showStatusFilter
        showTimeFilter
        customTypeOption={typeOptions}
        showProductFilter
        bulkSelect
        onBulkSelect={handleBulkSelect}
        params={{
          isWeb: true,
          tab: Url.GetParam("tab"),
          search: Url.GetParam("search"),
          pageSize: Url.GetParam("pageSize"),
          page: page ? page : DEFAULT_PAGE,
          objectName: ObjectName.ORDER_PRODUCT,
          type : Url.GetParam("type")
        }}
        setPage={setPage}
      >
        <ReduxColumn
          type="link"
          width={"110px"}
          minWidth="110px"
          maxWidth="110px"
          sortBy="order_id"
          renderField={(row) => (
            <Link to={`/order/${row.order_id}`}>{row.order_number}</Link>
          )}>
          Order#
        </ReduxColumn>
        <ReduxColumn
          field="orderDate"
          sortBy="order_date"
          renderField={(row) => (
            <span>
              {row.orderDate &&
                DateTime.getDateTimeByUserProfileTimezone(row.orderDate)}
            </span>
          )}
        >
          Date
        </ReduxColumn>
        <ReduxColumn
          field="locationName"
          sortBy="location"
        >Location</ReduxColumn>
        <ReduxColumn
          field="product"
          type="link"
          sortBy="product_display_name"
          renderField={(row) => (
            <>
              <ProductCard
                productImageIcon
                square
                productName={row.product_name}
                brandName={row.brand_name}
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
        <ReduxColumn field="quantity" sortBy="quantity" className="text-center">
          Quantity
        </ReduxColumn>
        <ReduxColumn
          field="unit_price"
          renderField={(row) => (
            <span className="float-right">
              {Currency.Format(row.unit_price)}
            </span>
          )}
          sortBy="unit_price"
        >
          Unit Price
        </ReduxColumn>
        <ReduxColumn
          field="amount"
          renderField={(row) => (
            <span className="float-right">{Currency.Format(row.amount)}</span>
          )}
          sortBy="price"
        >
          Amount
        </ReduxColumn>
        <ReduxColumn
          field="cost_price"
          renderField={(row) => (
            <span className="float-right">{Currency.Format(row.cost_price)}</span>
          )}
          sortBy="cost_price"
        >
          Cost Price
        </ReduxColumn>
        <ReduxColumn
          field="profit_amount"
          sortBy="profit_amount"
          renderField={(row) => (
            <span className="float-right">{Currency.Format(row.profit_amount)}</span>
          )}
        >
          Profit Amount
        </ReduxColumn>
        <ReduxColumn
          field="status"
          width={"120px"}
          minWidth="120px"
          maxWidth="120px"
          className="column-status"
          renderField={(row) => (
            <StatusText backgroundColor={row?.colourCode} status={row?.status} />
          )}>
          Status
        </ReduxColumn>
      </ReduxTable>
    </>
  );
};

export default OrderProductList;
