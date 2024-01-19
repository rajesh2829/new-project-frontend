import React from "react";
import { Label } from "reactstrap";
import Form from "../../../components/Form";

import { portalTemplate } from "../../../helpers/Support";
import CancelButton from "../../../components/CancelButton";
import Hint from "../../../components/Hint";
import SaveButton from "../../../components/SaveButton";
import Text from "../../../components/Text";
import Select from "../../../components/Select";
import HorizontalSpace from "../../../components/HorizontalSpace";
import URL from "../../../components/Url";

const GeneralTab = (props) => {
  const {
    companyData,
    logoRef,
    companyLogoUrl,
    userImageRemove,
    handleUpdate,
    initialValue,
    history,
  } = props;

  return (
    <>
      <Form
        enableReinitialize={true}
        initialValues={{
          ...initialValue,
        }}
        onSubmit={(values) => {
          handleUpdate(values);
        }}
      >
        <div className="card bg-white mt-3">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <div className="row field-wrapper">
                  <div className="col-lg-12 mt-2 col-sm-12">
                    <Text
                      className="w-100"
                      id="company_name"
                      name="company_name"
                      label="Company Name"
                      required={true}
                    />
                  </div>
                </div>
                <div className="row field-wrapper">
                  <div className="col-lg-12 col-sm-12">
                    <URL
                      className="w-100"
                      id="portal_url"
                      name="portal_url"
                      label="Portal Url"
                      required={true}
                    />
                  </div>
                </div>

                <div className="row field-wrapper">
                  <div className="col-lg-12 col-sm-12">
                    <URL
                      className="w-100"
                      id="portal_api_url"
                      name="portal_api_url"
                      label="Portal Api Url"
                      required={true}
                    />
                  </div>
                </div>

                <div className="row field-wrapper">
                  <div className="col-lg-12 col-sm-12">
                    <Select
                      name="template"
                      label="Template"
                      placeholder="Select Template..."
                      options={portalTemplate}
                      error=""
                      required={true}
                    />
                  </div>
                </div>
              </div>
            </div>
            <HorizontalSpace bottom="2">
              <SaveButton label="Save" />
              <CancelButton
                onClick={() => {
                  history.push(`/supportPortal/company`);
                }}
              />
            </HorizontalSpace>
          </div>
        </div>
      </Form>
    </>
  );
};
export default GeneralTab;
