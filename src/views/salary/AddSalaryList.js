import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Components
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";

// Actions
import { fetchList } from "../../actions/table";

import { endpoints } from "../../api/endPoints";
import { User } from "../../helpers/User";
import UserCard from "../../components/UserCard";

const publishedProducts = "publishedProducts";

const SalaryAddList = (props) => {

  return (
    <div>
      <ReduxTable
        id="activeUser"
        bulkSelect
        onBulkSelect={props.BulkSelect}
        showPageSize={false}
        sortByDropdown={true}
        showStatusOptions={false}
        customStatus={{ status: User.STATUS_ACTIVE_VALUE ? User.STATUS_ACTIVE_VALUE : "" }}
        refreshButton={true}
        showSearch={true}
        showScroll
        params={{
          status: User.STATUS_ACTIVE_VALUE
        }}
        searchPlaceholder="Search"
        apiURL={`${endpoints().userAPI}/search`}
        history={props.history}
        paramsToUrl={true}
      >
        <ReduxColumn
          type="link"
          isClickable="true"
          sortBy="name"
          renderField={(row) => (
            <>
              <UserCard
                customSize={parseInt(50, 10)}
                firstName={row.first_name}
                url={row.avatarUrl}
                lastName={row.last_name}
              />
            </>
          )}
        >
          User
        </ReduxColumn>
      </ReduxTable>
    </div>
  );
};

// Map State to props
function mapStateToProps(state) {
  const reduxTable = state.table;

  // Get Published products count
  const PublishedProducts =
    reduxTable[publishedProducts] &&
      reduxTable[publishedProducts].isFetching == false
      ? reduxTable[publishedProducts].totalCount
      : 0;

  return {
    PublishedProducts,
  };
}

// Map Dispatch to props
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch),
  };
}
// export default ;
export default connect(mapStateToProps, mapDispatchToProps)(SalaryAddList);
