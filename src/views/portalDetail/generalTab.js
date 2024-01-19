import React from "react";
import { Label } from "reactstrap";
import CancelButton from "../../components/CancelButton";
import Form from "../../components/Form";
import Hint from "../../components/Hint";
import HorizontalSpace from "../../components/HorizontalSpace";
import SaveButton from "../../components/SaveButton";
import Text from "../../components/Text";
import TextArea from "../../components/TextArea";
import Select from "../../components/Select";
import Url from "../../components/Url";

import { portalTemplate } from "../../constants/Support";

const GeneralTab = (props) => {
  const {
    companyLogoChange,
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
                <div className="row">
                  <div className="field-wrapper d-flex mt-1 ml-1 mb-3 col-lg-12 col-sm-12">
                    <div>
                      <div>
                        <Label className="ml-1">Company Logo</Label>
                      </div>
                      <div className="upload-field d-inline-block">
                        <input
                          name="file"
                          className="form-control d-none"
                          type="file"
                          id="portalLogo"
                          placeholder="Banner Image"
                          accept="image/png,image/gif,image/jpeg"
                          onChange={(e) => {
                            companyLogoChange(e);
                          }}
                          ref={logoRef}
                        />
                        <span className="profilePicOverlay d-block ">
                          <label
                            htmlFor="portalLogo"
                            className="profile-img-sm mb-0"
                          >
                            <span className="text-decoration-none cursor-pointer text-primary">
                              Upload Company Logo
                            </span>
                          </label>
                        </span>
                      </div>
                      {/* Remove image */}
                      {companyLogoUrl && (
                        <span
                          className="text-decoration-none cursor-pointer text-primary text-danger ml-md-1"
                          onClick={userImageRemove}
                        >
                          (Remove)
                        </span>
                      )}
                      <div className="field-wrapper">
                        <Hint
                          id="bannerRequirements"
                          hintText="We recommended using 400 x 400 image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row field-wrapper">
                  <div className="col-lg-12 col-sm-12">
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
                    <Text
                      className="w-100"
                      id="portal_url"
                      name="portal_url"
                      label="Portal Url"
                      required={true}
                    />
                  </div>
                </div>

                <Text
                  className="w-100"
                  name="portal_api_url"
                  label="Portal API Url"
                  required={true}
                />

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

                <div className="row field-wrapper">
                  <div className="col-lg-12 col-sm-12">
                    <Url
                      id="websiteurl"
                      name="websiteurl"
                      label="Website Url"
                    />
                  </div>
                </div>
                <div className="row field-wrapper">
                  <div className="col-lg-12 col-sm-12">
                    <TextArea
                      name="description"
                      label="About"
                      placeholder="Enter Description..."
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
