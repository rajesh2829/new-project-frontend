import React, { useState } from "react";
import PageTitle from "../../components/PageTitle";
import { Nav, NavItem, NavLink, TabPane, TabContent } from "reactstrap";
import classNames from "classnames";
import { Tabs } from "../../helpers/Setting";
import SettingPage from "./visitorSetting";

const VisitorType = (props) => {
  let { history } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(Tabs.SETTING);
  const [row, setRow] = useState();
  const _toggle = () => {
    setIsOpen(!isOpen);
  };

  const tabToggle = (tab) => {
    setActiveTab(tab)
  }

  return (
    <>
      <PageTitle label="Visitor Type" />
      
      <Nav tabs className="admin-tabs mb-3">
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tabs.SETTING,
            })}
            onClick={() => {
              tabToggle(Tabs.SETTING);
            }}
          >
            {Tabs.SETTING}
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={Tabs.SETTING}>
          <SettingPage
            history={history}
          />
        </TabPane>
      </TabContent>
    </>
  );
};

export default VisitorType;
