import React, { useEffect, useState } from "react";

import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import CancelButton from "../../components/CancelButton";
import Form from "../../components/Form";
import PageTitle from "../../components/PageTitle";
import SaveButton from "../../components/SaveButton";
import Select from "../../components/Select";
import { getCompanySettings, saveSetting } from "../../services/SettingService";
import { getKeyValueByObject } from "../../lib/Helper";
import { Setting } from "../../helpers/Setting";
import ArrayList from "../../lib/ArrayList";
import classNames from "classnames";
import DragAndDropTable from "../../components/StatusTable/StatusDragAndDropTable";
import ObjectName from "../../helpers/ObjectName";
import TransferTypeService from "../../services/TransferTypeService";
import TransferType from "../transferType";
import AddButton from "../../components/AddButton";
import { Tabs } from "react-bootstrap";

export const Tab = {
  SETTING: "Settings",
  STATUS: "Status",
  TYPES: "Types",
};

const TransferSetting = (props) => {
  const [settings, setSettings] = useState({});

  const [transferType, transferTypeList] = useState([]);
  const [activeTab, setActiveTab] = useState(Tab.TYPES);
  const [isOpen, setIsOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [row, setRow] = useState()
  useEffect(() => {
    getSettings();
    getTransferType();
  }, []);

  const getSettings = async () => {
    //get company setting
    const settingData = await getCompanySettings();
    //set setting in state
    setSettings(settingData);
  };

  const submit = (values) => {
    //create new form data
    const data = new FormData();

    //validate value exist or not
    if (values.transferType !== undefined) {
      //append the value
      data.append(
        Setting.SETTING_REPLENISH_TRANSFER_TYPE,
        values.transferType ? values.transferType.id : ""
      );
    }
    // Save settings
    saveSetting(data, "");
  };

  const getTransferType = async () => {
    let transferType = await TransferTypeService.search();
    transferTypeList(transferType);
  };

  const initialValues = {
    transferType:
      settings &&
      ArrayList.isNotEmpty(transferType) &&
      transferType.find(
        (data) =>
          data.id ==
          getKeyValueByObject(settings, Setting.SETTING_REPLENISH_TRANSFER_TYPE)
      ),
  };

  const toggle = (tab) => {
    setActiveTab(tab);
  };

  const _toggle = (x) => {
    setIsOpen(!isOpen);
  };

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <PageTitle
          label={Tab.TRANSFER}
        />
        {activeTab == Tab.STATUS && (
          <AddButton
            onClick={(e) => {
              _toggle();
              setRow("")
            }}
            label="Add New"
          />
        )}
        {activeTab == Tab.TYPES && (
          <AddButton
            onClick={(e) => {
              setCurrentData("")
              toggleAddModal();
            }}
            label="Add New"
          />
        )}</div>
      <Nav tabs className="admin-tabs mt-2">
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tab.TYPES,
            })}
            onClick={() => {
              toggle(Tab.TYPES);
            }}
          >
            {Tab.TYPES}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tab.STATUS,
            })}
            onClick={() => {
              toggle(Tab.STATUS);
            }}
          >
            {Tab.STATUS}
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tab.SETTING,
            })}
            onClick={() => {
              toggle(Tab.SETTING);
            }}
          >
            {Tab.SETTING}
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={Tab.SETTING}>
          <div className="card card-body">
            <Form
              enableReinitialize={true}
              initialValues={initialValues}
              onSubmit={(values) => {
                submit(values);
              }}
            >
              <div className="row field-wrapper">
                <div className="col-lg-12 col-sm-12">
                  <Select
                    label="Replenish Transfer Type"
                    name={"transferType"}
                    placeholder="Select Transfer Type"
                    options={transferType}
                  />
                  <SaveButton />
                  <CancelButton onClick={() => props.history.goBack()} />
                </div>
              </div>
            </Form>
          </div>
        </TabPane>
        <TabPane tabId={Tab.STATUS}>
          <div>
            <DragAndDropTable
              history={props.history}
              objectName={ObjectName.TRANSFER}
              showUrl
              _toggle={_toggle}
              isOpen={isOpen}
              row={row}
              setRow={setRow}
            />
          </div>
        </TabPane>
        <TabPane tabId={Tab.TYPES}>
          <div>
            <TransferType
              isAddModalOpen={isAddModalOpen}
              toggleAddModal={toggleAddModal}
              history={props.history}
              currentData={currentData}
              setCurrentData={setCurrentData}
            />
          </div>
        </TabPane>
      </TabContent>
    </>
  );
};

export default TransferSetting;
