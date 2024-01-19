import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { TabPane } from "reactstrap";
//Helper
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import AvatarCard from "./productCard";
const ProductTab = (props) => {
  const {
    id,
    tabName,
    activeTab,
    history,
    sortByOption,
    handleBulkDelete,
    icon,
    apiURL,
  } = props;

  return (
    <TabPane tabId={tabName} className="w-100">
      <ReduxTable
        id={id}
        bulkSelect
        onBulkSelect={handleBulkDelete}
        showHeader
        searchPlaceholder="Search"
        apiURL={apiURL}
        onRowClick={(row) => {
          history.push(`/product/${row.id}`);
        }}
        newTableHeading
        params={{
          section: activeTab,
          status: tabName,
        }}
        icon={<FontAwesomeIcon icon={faBoxOpen} />}
        sortByOptions={sortByOption}
        history={history}
        paramsToUrl={true}
      >
        <ReduxColumn
          field="name"
          type="link"
          isClickable="true"
          sortBy="name"
          renderField={(row) => (
            <>
              <Link to={`/product/${row.id}`}>
                <AvatarCard
                  productImageIcon
                  square
                  productName={row.name}
                  url={row.avatar_url}
                />
              </Link>
            </>
          )}
        >
          Name
        </ReduxColumn>
        <ReduxColumn field="category" sortBy="category_id">
          Category
        </ReduxColumn>

        <ReduxColumn
          field="mrp"
          renderField={(row) => <span>{row.mrp}</span>}
          sortBy="mrp"
        >
          MRP
        </ReduxColumn>
        <ReduxColumn
          field="sale_price"
          renderField={(row) => <span>{row.sale_price}</span>}
          sortBy="sale_price"
        >
          Sale Price
        </ReduxColumn>
        <ReduxColumn field="max_quantity" sortBy="max_quantity">
          Max Quantity
        </ReduxColumn>
        <ReduxColumn field="max_quantity" sortBy="max_quantity">
          Min Quantity
        </ReduxColumn>

        <ReduxColumn
          field="status"
          sortBy="status"
          renderField={(row) => (
            <div
              className={`user-list text-white fw-600 text-uppercase text-center bg-primary rounded ${row.status && row.status === "Active"
                  ? "bg-success"
                  : row.status === "Draft"
                    ? "bg-secondary"
                    : row.status === "Archived"
                      ? "bg-primary"
                      : ""
                }`}
            >
              {row.status}
            </div>
          )}
        >
          Status
        </ReduxColumn>
        <ReduxColumn field="updatedAt" sortBy="updatedAt">
          Date Deleted
        </ReduxColumn>
      </ReduxTable>
    </TabPane>
  );
};

export default ProductTab;
