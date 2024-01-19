import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Nav,
  NavItem,
} from "reactstrap";
//assets
import { PlusIcon } from "../../assets/icons";
import Text from "../../components/Text";
// Action
import * as API from "../../actions/drive";
// import * as API from "";
import { getDocsList } from "../../services/DriveService";
// Component
import SideNavBarItem from "./sideNavBarItem";
import AddModal from "../../components/Modal";

const SideNavBar = (props) => {
  const { activeTab, data, history, match, activeSubTab } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [navList, setNavList] = useState([]);
  const [slug, setSlug] = useState("");
  const docsNavList = getDocsList();
  const dispatch = useDispatch();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const getList = async () => {
    const List = await getDocsList();
    setNavList(List);
  };

  useEffect(() => {
    getList();
  }, []);

  const handleChange = (e) => {
    const name = e.target.value;
    const slug = name.split(" ").join("-").toLowerCase();
    setSlug(slug);
  };

  /**
   * Create Portal
   *
   * @param data
   */
  const DocsCreate = (values) => {
    const data = new FormData();
    data.append("title", values.title || "");
    data.append("slug", slug || "");
    data.append(
      "project_id",
      (values.project_id && values.project_id.value) || ""
    );
    data.append(
      "portal_id",
      (values.portal_id && values.portal_id.value) || ""
    );
    dispatch(API.createDocsPage(data, {}));
    toggle();
    getList();
  };

  const addPageForm = (
    <div className="mt-2 mb-3">
      <div>
        <Text
          name="title"
          label=""
          placeholder="Title"
          onChange={handleChange}
          error=""
          fontBolded
          required={true}
        />
      </div>
    </div>
  );

  const pageFooter = (
    <div className="container-fluid">
      <div className="col-sm-12 text-center">
        <Button type="submit" label="" className="ml-3 h6-5-important">
          Create
        </Button>
      </div>
    </div>
  );

  // Return docs nav lsit
  return (
    <Nav tab vertical pills>
      <NavItem className="p-3 pt-4">
        <div>
          <span
            onClick={() => {
              toggle();
            }}
          >
            <div className="d-flex justify-content-between flex-wraps">
              <h5 className="text-left font-weight-bold">Pages</h5>
              <div>
                <PlusIcon />
              </div>
            </div>
          </span>
        </div>
      </NavItem>
      <AddModal
        isOpen={isOpen}
        toggle={toggle}
        toggleModalClose={toggle}
        modalTitle="New Pages"
        modalBody={addPageForm}
        modalFooter={pageFooter}
        initialValues={{
          title: "",
        }}
        onSubmit={(values) => {
          DocsCreate(values);
        }}
        hideDefaultButtons
      />

      {/* Nav List Start */}
      {navList &&
        navList.length >= 0 &&
        navList.map((docsNavItem, key) => (
          <SideNavBarItem
            key={key}
            data={data}
            activeTab={activeTab}
            activeSubTab={activeSubTab}
            tabName={docsNavItem.title}
            listId={docsNavItem.id}
            defaultSubTab={docsNavItem.defaultSubTab}
            defaultSubSection={docsNavItem && docsNavItem.defaultSubSection}
            match={props.match}
          />
        ))}
      {/* Nav List End */}
    </Nav>
  );
};
export default SideNavBar;
