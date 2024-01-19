import React, { useState } from "react";
import DragAndDropTable from "../../components/StatusTable/StatusDragAndDropTable";
import ObjectName from "../../helpers/ObjectName";
import PageTitle from "../../components/PageTitle";
import { Nav, NavItem, NavLink, TabPane } from "reactstrap";
import classNames from "classnames";
import { Tabs } from "../../helpers/Setting";
import SettingPage from "./components/settingPage.";

const OrderSetting = (props) => {
  let { history } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(Tabs.STATUS); 
  const[row,setRow] = useState();
  const _toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleTabChange = (tab)=>{
    setActiveTab(tab)
  }

  return (
    <>
      <PageTitle
        label="Order"
        buttonHandler={() => {
          _toggle();
          setRow("")
        }}
        buttonLabel="Add"
      />
      <Nav tabs className="admin-tabs mb-3">
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tabs.STATUS,
            })}
            onClick={()=>{
              handleTabChange(Tabs.STATUS)
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
            onClick={()=>{
              handleTabChange(Tabs.SETTING)
            }}
          >
            {Tabs.SETTING}
          </NavLink>
        </NavItem>
      </Nav>
      {activeTab === Tabs.STATUS && (
        <TabPane>
          <DragAndDropTable
            history={history}
            objectName={ObjectName.ORDER}
            showUrl
            _toggle={_toggle}
            isOpen={isOpen}
           row = {row}
           setRow={setRow}

          />
        </TabPane>
      )}
        {activeTab === Tabs.SETTING && (
        <TabPane>
          <SettingPage
            history={history}
            objectName={ObjectName.ORDER}
          />
        </TabPane>
      )}
    </>
  );
};

export default OrderSetting;
