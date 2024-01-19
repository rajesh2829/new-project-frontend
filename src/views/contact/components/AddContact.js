import React, { useState } from "react";
import Email from "../../../components/Email";
import Form from "../../../components/Form";
import Phone from "../../../components/Phone";
import Text from "../../../components/Text";
const AddContact = (props) => {

  return (
    <>
        <div>
          <Text
            label="First Name"
            name="first_name"
            className="fw-bold-text"
            placeholder="Enter First Name"
            required
            error=""
          />
          <Text
            label="Last Name"
            name="last_name"
            className="fw-bold-text"
            placeholder="Enter Last Name"
            error=""
          />
          <Email
            label="Email Address"
            name="email"
            placeholder="Enter Email Address"
            notify="error"
            
          />
          <Phone
            label="Mobile Number"
            name="mobile"
            placeholder="Enter Mobile Number"
            error=""
          />
          <Phone
            label="Work Phone"
            name="work_phone"
            placeholder="Enter Work Number"
            error=""
          />
          <Text
            label="Designation"
            name="designation"
            placeholder="Enter Designation"
          />
        </div>
      
    </>
  );
};

export default AddContact;
