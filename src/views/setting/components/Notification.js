import React, { useState } from "react";

import DefaultContent from "../../../components/content/defaultContent";

import Form from "../../../components/Form";
import PageTitle from "../../../components/PageTitle";
import SaveButton from "../../../components/SaveButton";

import { saveSetting } from "../../../services/SettingService";

import { getKeyValueByObject } from "../../../lib/Helper";

import Url from "../../../lib/Url";

import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

import classnames from "classnames";


import Email from "../../../components/Email";

import Text from "../../../components/Text";

import { Setting } from "../../../helpers/Setting";

import SlackTab from "./SlackTab";

import { fetchSettings } from "../../../actions/settings";

import { useDispatch } from "react-redux";

import WhatsAppTab from "./WhatsAppTab";

// Tabs Constants
export const Tab = { EMAIL: "EMAIL", SLACK: "SLACK", WHATSAPP: "WHATSAPP" };
const Notification = (props) => {

  const { settings, history } = props;

  const [activeTab, setActiveTab] = useState(Url.GetParam("tab") || Tab.EMAIL);

  const dispatch = useDispatch();

  const submit = (values) => {
    //create new form data
    const data = new FormData();
    data.append(Setting.FROM_EMAIL, values && values.from_email ? values.from_email : "");
    data.append(
      Setting.FROM_EMAIL_DISPLAY_NAME,
      values && values.from_email_display_name ? values.from_email_display_name : "");
      data.append(
        Setting.TECHNICAL_SUPPORT_EMAIL,
        values && values.technical_support_email ? values.technical_support_email : "");
        data.append(Setting.TO_EMAIL, values && values.to_email ? values.to_email : "");
    // Save settings
    saveSetting(data, null, ()=> {
      dispatch(fetchSettings());
    });
  };

  const _handleTabChange = (tab) => {
    props.history.push(`?tab=${tab}`);
  };

  const toggle = (tab) => {
    setActiveTab(tab);
  };



  const initialValues = {    
    from_email: settings && getKeyValueByObject(settings, Setting.FROM_EMAIL),
    from_email_display_name: settings && getKeyValueByObject(settings, Setting.FROM_EMAIL_DISPLAY_NAME),
  technical_support_email:settings && getKeyValueByObject(settings, Setting.TECHNICAL_SUPPORT_EMAIL),
  to_email:settings && getKeyValueByObject(settings, Setting.TO_EMAIL)
  };

  return (
    <>
      <PageTitle label="Notifications" />
      <Nav tabs className="admin-tabs mb-1">

        {/* Email tab */}
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Tab.EMAIL,
            })}
            onClick={() => {
              toggle(Tab.EMAIL);
              _handleTabChange(Tab.EMAIL);
            }}
          >
            Email
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Tab.SLACK,
            })}
            onClick={() => {
              toggle(Tab.SLACK);
              _handleTabChange(Tab.SLACK);
            }}
          >
            Slack
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === Tab.WHATSAPP,
            })}
            onClick={() => {
              toggle(Tab.WHATSAPP);
              _handleTabChange(Tab.WHATSAPP);
            }}
          >
            Whats App
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>

        <TabPane tabId={Tab.EMAIL}>
          <DefaultContent>
            <Form
              enableReinitialize={true}
              initialValues={initialValues}
              onSubmit={(values) => {
                submit(values);
              }}
            >
              <div className="row field-wrapper">
                <div className="col-lg-12 col-sm-12">
                  <Email
                    className="w-100"
                    name={Setting.FROM_EMAIL}
                    placeholder="Enter From Email"
                    label="From Email"
                    fontBolded
                  />
                </div>

                <div className="col-lg-12 col-sm-12">
                  <Text
                    name={Setting.FROM_EMAIL_DISPLAY_NAME}
                    label="From Email Display Name"
                    fontBolded
                  />
                </div>
                <div className="col-lg-12 col-sm-12">
                  <Email
                    className="w-100"
                    name={Setting.TECHNICAL_SUPPORT_EMAIL}
                    placeholder="Enter Technical Support Email"
                    label="Technical Support Email"
                    fontBolded
                  />
                </div>
                <div className="col-lg-12 col-sm-12">
                  <Email
                    className="w-100"
                    name={Setting.TO_EMAIL}
                    placeholder="Enter To Email"
                    label="To Email"
                    fontBolded
                  />
                </div>
                <div className="btn-wrapper pt-3 px-3">
                  <SaveButton />
                 
                </div>
              </div>
            </Form>
          </DefaultContent>
        </TabPane>
        <TabPane tabId={Tab.SLACK}>
          <SlackTab history={props.history} settings={settings} />
        </TabPane>

        <TabPane tabId={Tab.WHATSAPP}>
          <WhatsAppTab history={props.history} settings={settings} />
        </TabPane>

      </TabContent >
    </>
  );
};

export default Notification;
