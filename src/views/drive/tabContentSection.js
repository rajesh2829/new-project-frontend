import React from "react";
import { List, TabContent, TabPane } from "reactstrap";
import DocsList from "./docsList";

const TabContentSection = (props) => {
  const { activeTab, history, data, match, activeSubTab, List } = props;

  return (
    <div>
      <TabContent activeTab={activeTab} className="h-100">
        <TabPane tabId={activeTab}>
          <div className="tab-content-wrapper">
            <DocsList
              activeTab={activeSubTab}
              history={history}
              match={match}
              List={List}
            />
          </div>
        </TabPane>
      </TabContent>
    </div>
  );
};
export default TabContentSection;
