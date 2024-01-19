import React from "react";
import CancelButton from "../../components/CancelButton";
import Country from "../../components/Country";
import Email from "../../components/Email";
import Form from "../../components/Form";
import HorizontalSpace from "../../components/HorizontalSpace";
import Phone from "../../components/Phone";
import SaveButton from "../../components/SaveButton";
import StateDropdown from "../../components/State";
import Text from "../../components/Text";
import Zipcode from "../../components/Zipcode";

const ConatctDetailTab = (props) => {
  const {
    selectedOption,
    selectedCountryId,
    selectedCountryName,
    handleCountryChange,
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
        <div className="card bg-white mb-3">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6 col-sm-6">
                <div className="col-lg-12 col-sm-12">
                  <Email
                    name="email"
                    label="Email Address"
                    placeholder="Enter Email Address"
                    error=""
                    fontBolded
                  />
                </div>

                <div className="col-lg-12 col-sm-12">
                  <Phone
                    name="mobileNumber1"
                    label="Mobile Number 1"
                    placeholder="Enter Mobile Number"
                    error=""
                    fontBolded
                  />
                </div>
                <div className="col-lg-12 col-sm-12">
                  <Phone
                    name="mobileNumber2"
                    label="Mobile Number 2"
                    placeholder="Enter Mobile Number"
                    error=""
                    fontBolded
                  />
                </div>
                <div className="col-lg-12 col-sm-12">
                  <Text
                    name="address1"
                    label="Address 1"
                    placeholder="Enter Address"
                    error=""
                    fontBolded
                  />
                </div>
                <div className="col-lg-12 col-sm-12">
                  <Text
                    name="address2"
                    label="Address 2"
                    placeholder="Enter Address"
                    error=""
                    fontBolded
                  />
                </div>
                <div className="col-lg-12 col-sm-12">
                  <Text
                    name="city"
                    label="City"
                    placeholder="Enter City"
                    error=""
                    fontBolded
                  />
                </div>

                <div className="col-lg-12 col-sm-12">
                  <Country
                    name="country"
                    label="Country"
                    placeholder="Enter Country"
                    error=""
                    onChange={handleCountryChange}
                  />
                </div>

                <div className="col-lg-12 col-sm-12">
                  <StateDropdown
                    name="state"
                    label="State"
                    placeholder="Enter State"
                    error=""
                    fontBolded
                    selectedCountry={
                      selectedOption ? selectedOption : selectedCountryId
                    }
                    selectedCountryName={
                      selectedCountryName ? selectedCountryName : ""
                    }
                  />
                </div>

                <div className="col-lg-12 col-sm-12">
                  <Zipcode
                    label="Pin Code"
                    name="pin_code"
                    placeholder="Enter Pin Code"
                    error=""
                    fontBolded
                  />
                </div>
                <div className="col-lg-12 col-sm-12">
                  <div>
                    <HorizontalSpace bottom="2">
                      <SaveButton label="Save" />
                      <CancelButton
                        onClick={() => {
                          history.push(`/admin/dashboard`);
                        }}
                      />
                    </HorizontalSpace>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};
export default ConatctDetailTab;
