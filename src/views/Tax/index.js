import classNames from "classnames";
import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabPane } from "reactstrap";
import PageTitle from "../../components/PageTitle";
import TagDetail from "../../components/TagList";

export const Tabs = {
  TYPES: "Types",
};

export const Type = {
  TAX: "Tax",
};

const Tax = (props) => {
  const [activeTab, setActiveTab] = useState(Tabs.TYPES);
  const [isOpen, setIsOpen] = useState(false);

  const _toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <PageTitle
        label="Tax"
        buttonHandler={() => {
          _toggle();
        }}
        buttonLabel="Add"
      />
      <Nav tabs className="admin-tabs mb-3">
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab,
            })}
          >
            {Tabs.TYPES}
          </NavLink>
        </NavItem>
      </Nav>
      {activeTab === Tabs.TYPES && (
        <TabPane>
          <TagDetail
            noTagDetail
            __toggle={_toggle}
            isModel={isOpen}
            history={props.history}
            tagType={Type.TAX}
            showPageTitle={true}
            showTagTypefield={true}
          />
        </TabPane>
      )}
    </>
  );
};
export default Tax;
