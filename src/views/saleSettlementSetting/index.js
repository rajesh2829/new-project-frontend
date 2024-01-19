import React, { useState } from "react";
import DragAndDropTable from "../../components/StatusTable/StatusDragAndDropTable";
import ObjectName from "../../helpers/ObjectName";
import PageTitle from "../../components/PageTitle";
import { Nav, NavItem, NavLink, TabPane, TabContent } from "reactstrap";
import classNames from "classnames";
import { Tabs } from "../../helpers/Setting";
import SettingPage from "./settingPage";

const SalesSettlementSetting = (props) => {
  let { history } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(Tabs.STATUS); 
  const[row,setRow] = useState();
  const _toggle = () => {
    setIsOpen(!isOpen);
  };

  const tabToggle=(tab)=>{
    setActiveTab(tab)
  }

  return (
    <>
      <PageTitle
        label="Sales Settlement"
        buttonHandler={() => {
          _toggle();
          setRow("");
        }}
        buttonLabel="Add"
      />
      <Nav tabs className="admin-tabs mb-3">
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tabs.STATUS,
            })}
            onClick={() => {
              tabToggle(Tabs.STATUS);
            }}
          >
            {Tabs.STATUS}
          </NavLink>
        </NavItem>
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
      {activeTab === Tabs.STATUS && (
        <TabPane tabId={Tabs.STATUS}>
          <DragAndDropTable
            history={history}
            objectName={ObjectName.SALE_SETTLEMENT}
            showUrl
            _toggle={_toggle}
            isOpen={isOpen}
            row = {row}
            setRow={setRow}
          />
        </TabPane>
      )}
      <TabPane tabId={Tabs.SETTING}>
          <SettingPage
            history={history}
          />
        </TabPane>
      </TabContent>
    </>
  );
};

export default SalesSettlementSetting;
