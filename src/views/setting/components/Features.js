import React, { useEffect, useState } from "react";
// Components
import DefaultContent from "../../../components/content/defaultContent";
import Form from "../../../components/Form";
import SingleCheckbox from "../../../components/SingleCheckbox";
import SubTitle from "../../../components/SubTitle";
import { getKeyValueByObject } from "../../../lib/Helper";
//Service
import * as portalConstant from "../../../helpers/PortalDetail";
import { getCompanySettings, saveSetting } from "../../../services/SettingService";

const Features = (props) => {
  const { companyData } = props;
  const [settings, setSettings] = useState({});

  const getSettings = async () => {
    const settingData = await getCompanySettings();
    setSettings(settingData);
  };
 
  useEffect(() => {
    getSettings();
  }, []);

  const initialValues = {
    enable_projects:
      settings &&
      getKeyValueByObject(settings, portalConstant.SETTINGS_ENABLE_PROJECTS) ==
        "true"
        ? "true"
        : "",
    enable_store:
      settings &&
      getKeyValueByObject(settings, portalConstant.SETTINGS_ENABLE_STORE) ==
        "true",

    enable_users:
      settings &&
      getKeyValueByObject(settings, portalConstant.SETTINGS_ENABLE_USERS) ==
        "true",
    enable_products:
      settings &&
      getKeyValueByObject(settings, portalConstant.SETTINGS_ENABLE_PRODUCTS) ==
        "true",
    enable_account:
      settings &&
      getKeyValueByObject(settings, portalConstant.SETTINGS_ENABLE_ACCOUNT) ==
        "true",
    enable_jobs:
      settings &&
      getKeyValueByObject(settings, portalConstant.SETTINGS_ENABLE_JOBS) ==
        "true",
    enable_pages:
      settings &&
      getKeyValueByObject(settings, portalConstant.SETTINGS_ENABLE_PAGES) ==
        "true",
  };
  // Portal Settings Features Section Submit Form
  const submit = (values) => {
    const data = new FormData();
    data.append(values.target.id, values.target.checked);
    // Save settings
    saveSetting(data, companyData ? companyData.id : "");
  };  

  return (
    <>
      <Form
        enableReinitialize={true}
        initialValues={initialValues}      
      >
        
        <DefaultContent>
        <SubTitle label="Accounts" />
            <div className="form-wrapper">
            <div>
                {/* Enable accounts */}
                <div className="field-wrapper">
                <SingleCheckbox
                  name={portalConstant.SETTINGS_ENABLE_ACCOUNT}
                  label="Enable accounts"
                  className="accepted-terms mb-0 pb-0 mr-3"
                  handleFeatureChange={submit}     
                />
              </div>
            </div>
              <SubTitle label="Jobs" />
            <div className="form-wrapper">
              {/* jobs accounts */}
              <div className="field-wrapper">
                <SingleCheckbox
                  name={portalConstant.SETTINGS_ENABLE_JOBS}
                  label="Enable jobs"
                  className="accepted-terms mb-0 pb-0 mr-3"
                  handleFeatureChange={submit}
                />
              </div>
            </div>
            <SubTitle label="Pages" />
            <div className="form-wrapper">
              {/* Enable accounts */}
              <div className="field-wrapper">
                <SingleCheckbox
                  name={portalConstant.SETTINGS_ENABLE_PAGES}
                  label="Enable pages"
                  className="accepted-terms mb-0 pb-0 mr-3"
                  handleFeatureChange={submit}                />
              </div>
            </div>
            <SubTitle label="Products" />
            <div className="form-wrapper">
              {/* Enable products */}
              <div className="field-wrapper">
                <SingleCheckbox
                  name={portalConstant.SETTINGS_ENABLE_PRODUCTS}
                  label="Enable products"
                  className="accepted-terms mb-0 pb-0 mr-3"
                  handleFeatureChange={submit}     
                />
              </div>
            </div>
          <div className="form-wrapper">
            <SubTitle label="Location" />
            <div className="form-wrapper">
              {/* Enable Project */}
              <div className="field-wrapper">
                <SingleCheckbox
                  name={portalConstant.SETTINGS_ENABLE_STORE}
                  label="Enable Location"
                  className="accepted-terms mb-0 pb-0 mr-3"
                  handleFeatureChange={submit}     
                />
              </div>
            </div>
            <SubTitle label="Users" />
            <div className="form-wrapper">
              {/* Enable Users */}
              <div className="field-wrapper">
                <SingleCheckbox
                  name={portalConstant.SETTINGS_ENABLE_USERS}
                  label="Enable Users"
                  className="accepted-terms mb-0 pb-0 mr-3"
                  handleFeatureChange={submit}     
                />
              </div>
            </div>
            </div>       
          </div>
        </DefaultContent>
      </Form>
    </>
  );
};

export default Features;
