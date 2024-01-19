import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageSearch from "../../components/PageSearch";
import PageTitle from "../../components/PageTitle";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import ObjectName from "../../helpers/ObjectName";

const StatusDetails = (props) => {
  const { history } = props;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStatusList, setFilteredStatusList] = useState([]);

  const handleSearch = () => {
    const statusList = ObjectName.Options;
    const filteredList = statusList.filter((data) => {
      return data.label.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredStatusList(filteredList);
  };

  useEffect(() => {
    handleSearch(); // Initial filtering based on search query
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <PageTitle label="Statues" />
      </div>
      <PageSearch
        onSearchClick={handleSearch}
        onChange={(event) => setSearchQuery((event.target.value).trim())}
        placeholder="Search"
        classnames="page-heading cover d-flex p-3"
      />
      <ReduxTable
        id="statusList"
        disableHeader
        dataList={filteredStatusList}
        // params={{}}
        apiURL={true}
        paramsToUrl={true}
        history={history}
        sortByDropdown={true}
      >
        <ReduxColumn
          field="name"
          type="link"
          isClickable="true"
          renderField={(row) => (
            <Link
              to={`/setting/Statues/StatusList/${row.label}?object_name=${row.label}`}
            >
              {row.label}
            </Link>
          )}
        >
          Status
        </ReduxColumn>
      </ReduxTable>
    </div>
  );
};
export default StatusDetails;
