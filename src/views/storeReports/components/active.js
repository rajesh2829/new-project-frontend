import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Components
import ReduxTable, { ReduxColumn } from "../../../components/ReduxTable";
import AvatarCard from "../../../components/AvatarCard";

//Config
import { endpoints } from "../../../api/EndPoints";
import * as storeConstant from "../../../constants/StoreList";
import "../../../scss/_custom.scss";
import Currency from "../../../lib/Currency";

const ActiveStore = (props) => {
  const search = window.location.search;
  const pathParams = new URLSearchParams(search);
  const searchItem = pathParams.get("search");
  const { history } = props;

  //Sort By Option Values
  const sortByOption = [
    {
      value: "name:ASC",
      label: "Name",
    },
    {
      value: "id:DESC",
      label: "Most Recent",
    },
  ];

  const dispatch = useDispatch();
  const params = {
    status: storeConstant.ACTIVE_STORE_TAB,
    section: storeConstant.ACTIVE_STORE_TAB,
    searchItem: searchItem,
  };

  return (
    <>
        <ReduxTable
          id="activeStore"
          showHeader
          searchPlaceholder="Search"
          apiURL={`${endpoints().locationAPI}/search`}
          newTableHeading
          sortByOptions={sortByOption}
          paramsToUrl={true}
          params={params}
          onRowClick={(row) => {
            history.push(`/location/${row.id}`);
          }}
          history={props.history}
        >
        <ReduxColumn
          field="name"
          type="link"
          sortBy="name"
          width="300px"
          isClickable="true"
          renderField={(row) => (
            <>
              <Link to={`/location/${row.id}`}>
                <AvatarCard firstName={row.name} url={row.image} />
              </Link>
            </>
          )}
        >
          Location Name
        </ReduxColumn>
        <ReduxColumn
          field="amount"
          sortBy="amount"
          width="130px"
          renderField={(row) => (
            <span>{Currency.Format(row.totalAmount)}
            </span>
          )}
        >
          Total Amount
        </ReduxColumn>
      </ReduxTable>
    </>
  );
};
export default ActiveStore;
