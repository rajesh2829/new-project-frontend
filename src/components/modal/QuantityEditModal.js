import React, { useState } from "react";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

// Components
import Form from "../Form";
import CancelButton from "../CancelButton";
import Submit from "../Submit";
import QuantityButton from "../QuantityButtons";
import Label from "../Label";

const QuantityEditModal = ({ fieldlabel, toggle, onModalClose, handleSubmit, modalTitle, confirmLabel, quantity }) => {

  const [selectedQuantity, setSelectedQuantity] = useState(null);

  const handleChangeQuantity = (quantity) => {
    setSelectedQuantity(quantity);
  }

  const closeModal = () => {
    onModalClose();
    setSelectedQuantity(null)
  }

  const handleFormSubmit = (values) => {
    handleSubmit(values, setSelectedQuantity);
  }

  // Form initial values
  const initialValues = {
    quantity: selectedQuantity != null  ? selectedQuantity : quantity ,
  };

  return (
    <>
      <Modal isOpen={toggle} centered={true} >
        <ModalHeader
          toggle={closeModal}
          close={
            <button className="close" onClick={closeModal}>
              ×
            </button>
          }
          cssModule={{ "modal-title": "w-100 text-center" }}
        >
          <span className="text-center">{modalTitle}</span>
        </ModalHeader>
        <Form enableReinitialize={true} initialValues={initialValues} onSubmit={handleFormSubmit}>
          <ModalBody>
            <Label>{fieldlabel}</Label>
            <div className="d-flex justify-content-center">
              <QuantityButton quantity={selectedQuantity != null  ? selectedQuantity : quantity } handleChangeQuantity={handleChangeQuantity} />
            </div>
          </ModalBody>
          <ModalFooter>
            <Submit label={confirmLabel} />
            <CancelButton onClick={closeModal} />
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}

export default QuantityEditModal;