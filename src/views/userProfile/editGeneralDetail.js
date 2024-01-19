import React, { Component } from "react";

// Components
import Text from "../../components/Text";
import Phone from "../../components/Phone";

class EditGeneralDetail extends Component {
  // Render the form fields
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12 col-sm-12">
            <Text
              name="name"
              label="First Name"
              placeholder="Enter First Name"
              required={true}
              error=""
            />
          </div>

          <div className="col-lg-12 col-sm-12">
            <Text
              name="lastName"
              label="Last Name"
              placeholder="Enter Last Name"
              error=""
              required={true}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-sm-12">
            <Text
              name="email"
              label="Email"
              placeholder="Enter Email"
              required={true}
              error=""
            />
          </div>
        </div>
        <div className="row">

          <div className="col-lg-12 col-sm-12">
            <Phone
              name="mobile"
              label="Mobile Number"
              placeholder="Enter Mobile Number"
              error=""
              fontBolded
            />
          </div>
        </div>
      </div>
    );
  }
}

export default EditGeneralDetail;
