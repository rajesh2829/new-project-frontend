import React, { useEffect, useState } from "react";
import { DropdownItem, Nav, NavItem, NavLink, TabPane, TabContent } from "reactstrap";
import PageTitle from "../../components/PageTitle";
import TagDetail from "../../components/TagList";
import { TagsIcon } from "../../assets/icons";

export const Type = {
  MOBILE: "Mobile", 
};

import Tab from "../../components/Tab";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import { endpoints } from "../../api/endPoints";
import { Link } from "react-router-dom";
import AvatarCard from "../../components/AvatarCard";
import DateTime from "../../lib/DateTime";
import MoreDropdown from "../../components/authentication/moreDropdown";
import Settings from "../setting/components/Message";
import classNames from "classnames";
import DeviceList from "./deviceList";
import AddButton from "../../components/AddButton";

const MobileApp = (props) => {
  const Tabs={
    VERSIONS:"Versions",
    DEVICES:"Devices",
    SETTINGS:"Settings"
  }
  const [isOpen, setIsOpen] = useState(false);
 const [activeTab ,setActiveTab] = useState(Tabs.VERSIONS);
  const [isTypeModelOpen,setIsTypeModelOpen]=useState(false)

  const statusOption = [
    {
      value: 1,
      label: "Pending",
    },
    {
      value: 2,
      label: "Approved",
    },
    {
      value: 3,
      label: "Blocked",
    }
  ]

const toggle = (tab)=>{
setActiveTab(tab)
props.history.push(`?tab=${activeTab}`)
}

const  _toggles = () => {
  setIsTypeModelOpen(!isTypeModelOpen);
};
const sortByOption = [
  {
    value: "id:DESC",
    label: "Most Recent",
  },
  {
    value: "name:ASC",
    label: "Name",
  }

];

  return (
  <>
 <div className="d-flex justify-content-between">
        <div>
          <PageTitle label="Mobile App" />
        </div>

        <div className="d-flex align-items-center">
          {activeTab === Tabs.VERSIONS && (
            <AddButton
              label="Add New"
              onClick={(e) => {
                _toggles();
              }}
            />
          )}
        </div>
      </div>
  <Nav tabs className="admin-tabs mb-3">

<NavItem>
  <NavLink
    className={classNames({
      active: activeTab === Tabs.VERSIONS,
    })}
    onClick={() => {
      toggle(Tabs.VERSIONS);
    }}
  >
    {Tabs.VERSIONS}
  </NavLink>
</NavItem>
<NavItem>

  <NavLink
    className={classNames({
      active: activeTab === Tabs.DEVICES,
    })}
    onClick={() => {
      toggle(Tabs.DEVICES);
    }}
  >
    {Tabs.DEVICES}
  </NavLink>
</NavItem>
  <NavItem>
  <NavLink
    className={classNames({
      active: activeTab === Tabs.SETTINGS,
    })}
    onClick={() => {
      toggle(Tabs.SETTINGS);
    }}
  >
    {Tabs.SETTINGS}
  </NavLink>
 </NavItem>




</Nav>
      
      <TabContent activeTab={activeTab}>
      <TabPane tabId={Tabs.VERSIONS}>
    <TagDetail
      noTagDetail
      showPageTitle
      __toggle={_toggles}
      isModel={isTypeModelOpen}
      history={props?.history}
      showTagTypefield={true}
      tagType={Type.MOBILE}
      mobileApp
      columnName='Version'
      label = 'Version'
      props={props}
    />
      </TabPane>
      <TabPane tabId={Tabs.DEVICES}>
          <DeviceList/>

        </TabPane>
        <TabPane tabId={Tabs.SETTINGS}>
          <Settings
            history={props.history}
          />
        </TabPane>
      </TabContent>

    </>
  )

};
export default MobileApp;
