import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CancelButton from "../../components/CancelButton";
import Email from "../../components/Email";
import Text from "../../components/Text";

const RegisterWithEmail = (props) => {
  const { next, isOpen, toggle, id } = props;
  return (
    <Modal
      id={id}
      isOpen={isOpen}
      toggle={toggle}
      className={["edit-task-modal"].join(" ")}
    >
      <ModalHeader toggle={toggle}>
        <h4 className={["font-weight-bold"].join(" ")}>Signup with Email</h4>
      </ModalHeader>
      <ModalBody className={["mb-4"].join(" ")}>
        <div className="form-wrapper justify-content-center d-flex flex-column">
          <div className="field-wrapper">
            <Email
              name="email"
              label="Email Address"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="field-wrapper">
            <Text
              name="firstName"
              label="First Name"
              placeholder="Enter first name"
              required={true}
              error=""
            />
            <Text
              name="lastName"
              label="Last Name"
              placeholder="Enter last name"
              required={true}
              error=""
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter className={["justify-content-center"].join(" ")}>
        <div className="btn-wrapper">
          <button
            id={id}
            className="btn btn-primary"
            onClick={() => {
              toggle();
              next();
            }}
          >
            Continue
          </button>
          <CancelButton id={id} onClick={toggle} />
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default RegisterWithEmail;
