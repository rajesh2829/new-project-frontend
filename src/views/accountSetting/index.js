import React, { useState } from "react";
import { Nav, TabPane } from "reactstrap";
import PageTitle from "../../components/PageTitle";
import DragAndDropTable from "../../components/StatusTable/StatusDragAndDropTable";
import Tab from "../../components/Tab";
import ObjectName from "../../helpers/ObjectName";
import { Tabs } from "../../helpers/Setting";
import CustomFields from "../../components/customFields/CustomFields";

const AccountSetting = (props) => {
  let { history } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(Tabs.STATUS);
  const [row, setRow] = useState();

  const _toggle = () => {
    setIsOpen(!isOpen);

  };

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  
  return (
    <>
      <PageTitle
        label="Account"
        buttonHandler={() => {
          _toggle();
          setRow("");
        }}
        buttonLabel="Add"
      />
      <Nav tabs className="admin-tabs mb-3">
        <Tab
          name={Tabs.STATUS}
          active={activeTab}
          handleChange={(e) => toggle(e)}
          toggle={toggle}
        />
        <Tab
          name={Tabs.CUSTOMFIELDS}
          active={activeTab}
          handleChange={(e) => toggle(e)}
          toggle={toggle}
        />
      </Nav>
      {activeTab === Tabs.STATUS && (
        <TabPane>
          <DragAndDropTable
            history={history}
            objectName={ObjectName.ACCOUNT}
            showUrl
            _toggle={_toggle}
            isOpen={isOpen}
            row={row}
            setRow={setRow}
          />
        </TabPane>
      )}
      {activeTab === Tabs.CUSTOMFIELDS && (
        <TabPane>
          <CustomFields
            showBreadCrumb={true}
            _toggle={_toggle}
            objectName={ObjectName.ACCOUNT}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </TabPane>
      )}
    </>
  );
};

export default AccountSetting;
