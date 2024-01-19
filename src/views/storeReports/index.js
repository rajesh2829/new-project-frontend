import React, { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import { TabPane } from "reactstrap";
import { bindActionCreators } from "redux";
import { fetchList } from "../../actions/table";
import * as tabConstant from "../../constants/StoreList";

// Components 
import PageTitle from "../../components/PageTitle";
import ActiveStore from "./components/Active";

//css
import "../../scss/_custom.scss";
import { isLoggedIn } from "../../lib/Helper";

const activeStore = "activeStore";

const Reports = (props) => {
  const param = new URLSearchParams(props.history.location.search);
  const role = param.get("section");
  const search = window.location.search;
  const pathParams = new URLSearchParams(search);
  const searchItem = pathParams.get("search");
  const { history, searchTerm, InactiveBrand, activeStore, AllStore } = props;
  const [searchitem, setSearchTerm] = useState(searchItem);
  const dispatch = useDispatch();
  const params = {
    section: tabConstant.ACTIVE_STORE_TAB,
    searchItem: searchTerm,
  };
  // Use Effect
  useEffect(() => {

    isLoggedIn();
  }, []);
  const _handleStatusChange = (tabStatus) => {
    props.history.push(`/location?section=${tabStatus}`);
    setSearchTerm(searchItem);
  };

  return (
    <>
      <PageTitle label="Reports" />
      <div className="tab-content-wrapper">
        <div className="mt-4">
          <TabPane tabId={tabConstant.ALL_STORE_TAB} className="w-100">
            <ActiveStore history={history} searchTerm={searchitem} />
          </TabPane>
        </div>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  const reduxTable = state.table;

  //Get Active stores
  const ActiveStore = reduxTable[activeStore] && reduxTable[activeStore].isFetching == false
    ? reduxTable[activeStore].totalCount
    : 0;
  return {
    ActiveStore,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList }, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Reports);
