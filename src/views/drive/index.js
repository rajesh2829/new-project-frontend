import React, { useState, useEffect } from "react";
import { Row } from "reactstrap";
import * as driveConstant from "../../helpers/Drive";
import SideNavBar from "./sideNavBar";
import TabContentSection from "./tabContentSection";
import { getDocsList } from "../../services/DriveService";

const Docs = (props) => {
  const { history, match } = props;

  const [list, setList] = useState([]);

  const toggle = (tab, subtab = "") => {
    const activeTab = match.params.tab;
    const activeSubTab = match.params.subtab;
    const activeSection = match.params.section;
    if (activeTab !== tab || activeSubTab !== subtab || activeSection) {
      history.push(`/${tab}${subtab ? "/" + subtab : ""}`);
    }
  };
  const activeTab = match.params.tab;
  const activeSubTab = match.params.subtab;
  const activeSection = match.params.section;
  const getList = async () => {
    const List = await getDocsList();
    setList(List);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <Row className="mt-n3 mt-md-n4 admin-setting">
        <div className="sidemenu">
          <SideNavBar
            activeTab={activeTab || driveConstant.Navlist.DOCS_NAV_DETAILS}
            List={list}
            activeSubTab={activeSubTab}
            toggleTabs={toggle}
            history={history}
            match={match}
          />
        </div>
        {activeTab && (
          <div className="col bg-white d-inline-block">
            <TabContentSection
              activeTab={activeTab || driveConstant.Navlist.DOCS_NAV_DETAILS}
              activeSubTab={activeSubTab}
              List={list}
              activeSection={activeSection}
              toggleTabs={toggle}
              history={history}
              match={match}
            />
          </div>
        )}
      </Row>
    </>
  );
};
export default Docs;
