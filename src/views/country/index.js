import React from "react";
import { Row } from "reactstrap";
import SideNavBar from "../../components/sideNavbar/sideNavBar";
import TabContentSection from "./components/TabContentSection";

// Country Constant
export const COUNTRIES = "Countries";

const setting = (props) => {
  const { history, match } = props;

  const toggle = (tab, subtab = "") => {
    const activeTab = match.params.tab;
    const activeSubTab = match.params.subtab;
    const activeSection = match.params.section;
    if (activeTab !== tab || activeSubTab !== subtab || activeSection) {
      history.push(`/admin/settings/${tab}${subtab ? "/" + subtab : ""}`);
    }
  };

  const navList = getNavList();
  const activeTab = match.params.tab;
  const activeSubTab = match.params.subtab;
  const activeSection = match.params.section;

  function getNavList() {
    let userNavList = [];

    // Return User Nav Object

    const getSettingsNavList = (tab, subtab, subSection, link) => {
      return {
        name: tab,

        defaultSubTab: subtab,

        defaultSubSection: subSection,

        link: link,
      };
    };

    const link = "/admin/settings";
    userNavList = [...userNavList, getSettingsNavList(COUNTRIES, "", "", link)];

    // Return Portal Details Nav List

    return userNavList;
  }
  return (
    <>
      <Row className="mt-n3 mt-md-n4 admin-setting">
        <div className="sidemenu">
          <SideNavBar
            activeTab={activeTab || COUNTRIES}
            activeSubTab={activeSubTab}
            toggleTabs={toggle}
            history={history}
            match={match}
            navList={navList}
            navItemLabel={"Settings"}
          />
        </div>
        <div className="col">
          <TabContentSection
            activeTab={activeTab || COUNTRIES}
            activeSubTab={activeSubTab}
            activeSection={activeSection}
            toggleTabs={toggle}
            history={history}
            match={match}
          />
        </div>
      </Row>
    </>
  );
};

export default setting;
