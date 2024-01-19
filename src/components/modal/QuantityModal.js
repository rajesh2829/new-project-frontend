import React from "react";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

// Components
import Form from "../../components/Form";
import CancelButton from "../../components/CancelButton";
import Submit from "../../components/Submit";
import Quantity from "../../components/Quantity";

const QuantityModal = (props) => {

  const { toggle, onModalClose, handleSubmit, modalTitle, confirmLabel, quantity } = props;

  // Form initial values
  const initialValues = {
    quantity: { label: quantity , value: quantity},
  };

  return (
    <>
      <Modal isOpen={toggle} centered={true} >
        <ModalHeader
        toggle={onModalClose}
        close={
          <button className="close" onClick={onModalClose}>
            ×
          </button>
        }
        cssModule={{ "modal-title": "w-100 text-center" }}
      >
        <span className="text-center">{modalTitle}</span>
      </ModalHeader>
        <Form initialValues={initialValues} onSubmit={handleSubmit}>
          <ModalBody>
            <Quantity label="Quantity" required={true} />
          </ModalBody>
          <ModalFooter>
            <Submit label={confirmLabel} />
            <CancelButton onClick={onModalClose} />
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}

export default QuantityModal;