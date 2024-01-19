import React from "react";
import { Link } from "react-router-dom";
import { endpoints } from "../../api/endPoints";
import PageTitle from "../../components/PageTitle";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
const Inspection = (props) => { 
  
  const { history } = props;

  const sortByOption = [
    {
      value: "name:ASC",
      label: "Name",
    },
    {
      value: "updatedAt:DESC",
      label: "Most Recent",
    },
  ];

  return (
    <div>
      <div className="pb-4">
        <PageTitle label="Custom Field" />
      </div>
      <ReduxTable
        id="allTags"
        showHeader
        newTableHeading
        sortByOptions={sortByOption}
        apiURL={`${endpoints().tagApi}/search`}
        message="You can start by clicking Add New"
        paramsToUrl={true}
        params={{ type: "Custom Field" }}
        history={history}
        searchPlaceholder="Search"
      >
        <ReduxColumn
          field="name"
          sortBy="name"
          renderField={(row) => (
            <Link to={`/customField/detail/${row.id}?typeName=${row.name}`}>
              {row.name}
            </Link>
          )}
        >
          Name
        </ReduxColumn>
      </ReduxTable>
    </div>
  );
};

export default Inspection;
