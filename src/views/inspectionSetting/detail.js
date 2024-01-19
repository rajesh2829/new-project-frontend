import React, { useState } from "react";
import { Nav, TabPane } from "reactstrap";
import Tab from "../../components/Tab";
import { Tabs } from "../../helpers/Setting";
import CustomFields from "../../components/customFields/CustomFields";
import PageTitle from "../../components/PageTitle";
import ObjectName from "../../helpers/ObjectName";
import BreadCrumb from "../../components/Breadcrumb";
import Url from "../../lib/Url";
import AddButton from "../../components/AddButton";

const InspectionSetting = (props) => {
  let { history } = props;
  const [activeTab, setActiveTab] = useState(Tabs.CUSTOMFIELDS);
  const [isOpen, setIsOpen] = useState(false);

  const tagId = props.match.params.id;

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const _toggle = () => {
    setIsOpen(!isOpen);
  };

  const typeName = Url.GetParam("typeName");

  const breadcrumbList = [
    { label: "Setting", link: "/setting/Account" },
    {
      label: "Inspection",
      link: "/setting/Inspection?type=Custom Field",
    },
    { label: typeName, link: "" },
  ];

  return (
    <>
      <div className="d-flex justify-content-between">
        <BreadCrumb list={breadcrumbList} />
        <AddButton onClick={() => {
          _toggle();
        }}
          label="Add"
        />
      </div>
      <Nav tabs className="admin-tabs mb-3">
        <Tab
          name={Tabs.CUSTOMFIELDS}
          active={Tabs.CUSTOMFIELDS}
          handleChange={(e) => toggle(e)}
          toggle={toggle}
        />
      </Nav>
      {activeTab === Tabs.CUSTOMFIELDS && (
        <TabPane>
          <CustomFields
            _toggle={_toggle}
            objectName={ObjectName.INSPECTION}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            tagId={tagId}
          />
        </TabPane>
      )}
    </>
  );
};

export default InspectionSetting;
