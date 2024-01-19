import React, { useState } from "react";
import Select from "../../../components/Select";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";

// Components
import AddModal from "../../../components/Modal";

// Services
const BulkUpdateModal = ({
  toggle,
  onModalClose,
  selectedProductIds,
  ...props
}) => {
  const productStatusOptions = [
    { label: "New", value: "New" },
    { label: "Exported", value: "Exported" },
    { label: "Excluded", value: "Excluded" }
  ];

  const [submitResponse, setsubmitResponse] = useState(false);

  const initialValues = {
    statusUpdate: ""
  };

  // Export
  const handleFormSubmit = async data => {
    setsubmitResponse(!submitResponse);
    const status = data.statusUpdate.value;

    try {
      const response = await props.bulkUpdateReduxAction({
        ids: selectedProductIds,
        status
      });
      setsubmitResponse(false);
      toast.success(response.message);
      onModalClose();
      window.location.reload();
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  const modalBody = (
    <>
      <Select
        label="Status"
        name="statusUpdate"
        placeholder="Select Status"
        options={productStatusOptions}
      />
    </>
  );

  return (
    <>
      <AddModal
        isOpen={toggle}
        toggle={onModalClose}
        toggleModalClose={onModalClose}
        modalBody={modalBody}
        modalTitle={"Bulk Update"}
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
      />
    </>
  );
};

export default BulkUpdateModal;
