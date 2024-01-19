import React from "react";
import { toast } from "react-toastify";
import { apiClient } from "../../apiClient";
import { isBadRequest } from "../../lib/Http";
import Button from "../../components/Button";
import Form from "../../components/Form";
import SingleCheckbox from "../../components/SingleCheckbox";
import Heading4 from "../../components/static/header/heading4";
import Text from "../../components/Text";
import { endpoints } from "../../api/endPoints";
import icon from "../assets/icons/envelope.png";

function ContactForm() {
  //Handle Update Platform
  const platformUpdate = (values) => {
    const data = new FormData();
    data.append("name", values && values.name ? values.name : "");
    data.append("subject", values && values.subject ? values.subject : "");
    data.append("email", values && values.email ? values.email : "");
    data.append(
      "salesenquiries",
      values && values.salesenquiries ? values.salesenquiries : ""
    );
    data.append(
      "supportenquiries",
      values && values.supportenquiries ? values.supportenquiries : ""
    );
    data.append(
      "generalenquiries",
      values && values.generalenquiries ? values.generalenquiries : ""
    );
    data.append("phone", values && values.phone ? values.phone : "");
    handleSave(data);
  };
  // Add Status
  const handleSave = (data) => {
    apiClient
      .post(`${endpoints().contactAPI}`, data)
      .then((response) => {
        if (response.data) {
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          console.error(errorMessage);
        }
      });
  };
  return (
    <div>
      <div className="container py-5">
        <Form
          enableReinitialize={true}
          initialValues={{}}
          onSubmit={(values) => {
            platformUpdate(values);
          }}
        >
          <div className="card py-4">
            <Heading4
              className="mx-5 font-weight-bold"
              style={{ color: "#113b95" }}
              heading="Please let us know if you have a question, want to leave a comment,
or would like further information about us"
            />

            <hr></hr>

            <div className="row mx-5">
              <div className="col-md-6">
                <div className="d-flex py-2">
                  <img className="" src={icon} width="25px" height="25px" />
                  <Heading4
                    className=" mx-2 font-weight-bold"
                    style={{ color: "#113b95" }}
                    heading="GET IN TOUCH"
                  />
                </div>

                <Text
                  ClassName="form-control"
                  name="name"
                  label="Name*"
                  placeholder="Enter Your Name"
                  className="py-2"
                />

                <Text
                  name="email"
                  label="E-mail*"
                  placeholder="Enter Your Name"
                  className="py-2"
                />

                <Text
                  name="phone"
                  label="Phone*"
                  placeholder="Enter pone number"
                  className="py-2"
                />
              </div>
              <div className="col-md-6 py-5 my-1">
                <Text
                  name="subject"
                  label="Subject"
                  className="py-2"
                  placeholder="Subject"
                />
                <div className="form-wrapper">
                  <div className="field-wrapper">
                    <p>Get in touch with one of our enquiry departments</p>
                    <SingleCheckbox
                      label="General Enquiries"
                      name="generalenquiries"
                      className="accepted-terms mb-0 pb-2 mr-3"
                    />
                    <SingleCheckbox
                      label="Support Enquiries"
                      name="supportenquiries"
                      className="accepted-terms mb-0 pb-2 mr-3"
                    />
                    <SingleCheckbox
                      label="Payments Enquiries"
                      name="salesenquiries"
                      className="accepted-terms mb-0 pb-2 mr-3"
                    />
                  </div>
                </div>
                <div className="form-group py-3">
                  <label for="exampleFormControlTextarea1">Your Message</label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    placeholder="How can we can help you?"
                    rows="3"
                  ></textarea>
                  <p>We respect your privacy. We promise we won't spam:)</p>
                </div>
              </div>
              <div className="mx-auto">
                <Button label="Submit" type="submit" className="text-center" />
              </div>
            </div>
          </div>
        </Form>
        <Heading4
          className="mx-5 py-5 text-center font-weight-bold"
          style={{ color: "#113b95" }}
          heading="* For Job Related Queries Click Here !"
        />
      </div>
    </div>
  );
}

export default ContactForm;
