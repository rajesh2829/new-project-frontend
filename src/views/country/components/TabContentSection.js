import React from "react";
import { TabContent, TabPane } from "reactstrap";
//Pages
import { ChevronRight } from "../../../assets/icons";
import Country from "./List";

//Config
import "../../../scss/_custom.scss";

const TabContentSection = (props) => {
  const { activeTab, history, data, match } = props;

  return (
    <div>
      {/* Breadcrumb Start */}
      <div className="d-flex align-items-center pt-3">
        <span
          className="cursor-pointer text-primary font-weight-bold"
          onClick={() => {
            history.push(`/admin/settings`);
          }}
        >
          Settings
        </span>
        <span className="text-section d-inline-flex">
          <ChevronRight />
        </span>
        <span
          className={activeTab ? "text-dark font-weight-bold " : ""}
          onClick={() => {
            history.push(`/admin/settings`);
          }}
        >
          <span>{activeTab}</span>
        </span>
      </div>
      {/* Breadcrumb End */}

      <TabContent activeTab={activeTab}>
        <TabPane tabId={"Countries"}>
          <div className="tab-content-wrapper">
            <div className="mt-3 mb-3">
              <Country history={history} />
            </div>
          </div>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default TabContentSection;
