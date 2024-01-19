import classnames from "classnames";
import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import PageTitle from "../../components/PageTitle";

//Pages
import GeneralThemes from "./generalTheme";
import SocialThemes from "./socialTheme";

// Tab Constants
export const Tab = {
  PORTAL_THEME_GENERAL_TAB: "General",
  PORTAL_THEME_SOCIAL_TAB: "Social",
};

const Themes = (props) => {
  const { settings } = props;
  const [activeTab, setActiveTab] = useState(
    Tab.PORTAL_THEME_GENERAL_TAB
  );

  // Toggle Tab
  const toggle = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <PageTitle label="Themes" />
      <Nav tabs className="admin-tabs">
        {/* General Tab */}
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab == Tab.PORTAL_THEME_GENERAL_TAB,
            })}
            onClick={() => {
              toggle(Tab.PORTAL_THEME_GENERAL_TAB);
            }}
          >
            {Tab.PORTAL_THEME_GENERAL_TAB}
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={Tab.PORTAL_THEME_GENERAL_TAB}>
          <div className="tab-content-wrapper">
            <GeneralThemes settings={settings} />
          </div>
        </TabPane>
        <TabPane tabId={Tab.PORTAL_THEME_SOCIAL_TAB}>
          <div className="tab-content-wrapper">
            <SocialThemes settings={settings} />
          </div>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Themes;
