import React, { Fragment } from "react";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { endpoints } from "../../../api/endPoints";
import ProductCard from "../../product/components/productCard";
import Currency from "../../../lib/Currency";
import DateTime from "../../../lib/DateTime";
import Url from "../../../lib/Url";
import StatusText from "../../../components/StatusText";
import ObjectName from "../../../helpers/ObjectName";

const PriceTab = (props) => {
  let { history } = props;
  const sortByOption = [
    {
      value: "product_name:ASC",
      label: "Name",
    },
    {
      value: "id:DESC",
      label: "Most Recent",
    },
  ];

  return (
    <Fragment>
      <ReduxTable
        id="priceTab"
        showHeader
        searchPlaceholder="Search"
        apiURL={`${endpoints().productAPI}/price/search`}
        newTableHeading
        params={{
          tab: Url.GetParam("tab"),
          objectName: ObjectName.PRODUCT_PRICE,
        }}
        icon={<FontAwesomeIcon icon={faBoxOpen} />}
        history={history}
        showBrandFilter
        showCategoryFilter
        showTagFilter
        showStatusFilter
        tagPlaceholder="Select Manufacture"
        tagFilterType={{
          type: "Manufacture",
        }}
        message="You can start by clicking on Add New"
        sortByOptions={sortByOption}
        paramsToUrl={true}>
        <ReduxColumn
          field="product_name"
          renderField={(row) => (
            <>
              <ProductCard
                productImageIcon
                square
                productName={row.product_name}
                brandName={row.brand_name}
                size={row.size != "null" ? row.size : ""}
                unit={row.unit != "null" ? row.unit : ""}
                salePrice={row.sale_price != "null" ? row.sale_price : ""}
                mrp={row.mrp != "null" ? row.mrp : ""}
                url={row.image}
                id={row?.product_id}
              />
            </>
          )}>
          Product name
        </ReduxColumn>
        <ReduxColumn
          field="mrp"
          className="text-center"
          renderField={(row) => <span>{Currency.Format(row.mrp)}</span>}>
          Mrp
        </ReduxColumn>
        <ReduxColumn
          field="cost"
          className="text-center"
          renderField={(row) => <span>{Currency.Format(row.cost)}</span>}>
          Cost Price
        </ReduxColumn>
        <ReduxColumn
          field="purchase_mrp"
          className="text-center"
          renderField={(row) => (
            <span>
              {row.purchase_mrp !== "" ? (
                Currency.Format(row.purchase_mrp)
              ) : (
                <span className="text-danger">No Record Found</span>
              )}
            </span>
          )}>
          Last Purchase MRP
        </ReduxColumn>
        <ReduxColumn
          field="purchase_cost"
          className="text-center"
          renderField={(row) => (
            <span>
              {row.purchase_cost !== "" ? (
                Currency.Format(row.purchase_cost)
              ) : (
                <span className="text-danger">No Record Found</span>
              )}
            </span>
          )}>
          Last Purchase Cost Price
        </ReduxColumn>
        <ReduxColumn
          field="last_purchase_date"
          renderField={(row) => (
            <span>
              {row.last_purchase_date !== "" ? (
                DateTime.getDate(row.last_purchase_date)
              ) : (
                <span className="text-danger">No Record Found</span>
              )}
            </span>
          )}>
          Last Purchase Date
        </ReduxColumn>
        <ReduxColumn
          field="statusText"
          sortBy="status"
          renderField={(row) => (
            <StatusText
              backgroundColor={row?.color_code}
              status={row?.statusText}
            />
          )}
        >
          Status
        </ReduxColumn>
      </ReduxTable>
    </Fragment>
  );
};

export default PriceTab;
