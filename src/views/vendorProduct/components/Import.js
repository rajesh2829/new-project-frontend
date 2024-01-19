import React, { useState } from "react";
import { toast } from "react-toastify";

// Services
import { VendorProductService } from "../../../services/VendorProductService";

// Components
import SaveButton from "../../../components/SaveButton";
import AddModal from "../../../components/Modal";

// Redux
import { useDispatch } from "react-redux";

// Api
import { fetchList } from "../../../actions/table";
import { endpoints } from "../../../api/endPoints";
import URL from "../../../components/Url";
import { PRODUCT_STATUS_EXCLUDED, PRODUCT_STATUS_EXPORTED, PRODUCT_STATUS_NEW } from "../../../lib/Products";

const ImportModal = ({ toggle, onModalClose }) => {
  const [submitResponse, setsubmitResponse] = useState(false);
  let dispatch = useDispatch();

  // Handle form submit
  const handleSubmit = async ({ url }) => {
    try {
      // Import and create new vendor product
      const response = await VendorProductService.import(url);
      toast.success(response.message);
      setsubmitResponse(!submitResponse);
      // Close model
      onModalClose();
      // To update in list
      if (response)
        dispatch(
          fetchList(
            "vendorProducts",
            `${endpoints().vendorProduct}/search`,
            1,
            25,
          )
        );
      dispatch(
        fetchList(
          "NewVendorProducts",
          `${endpoints().vendorProduct}/search`,
          1,
          25,
          {
            status: PRODUCT_STATUS_NEW
          }
        )
      );
      dispatch(
        fetchList(
          "ExportedVendorProducts",
          `${endpoints().vendorProduct}/search`,
          1,
          25,
          {
            status: PRODUCT_STATUS_EXPORTED
          }
        )
      );
      dispatch(
        fetchList(
          "ExcludedVendorProducts",
          `${endpoints().vendorProduct}/search`,
          1,
          25,
          {
            status: PRODUCT_STATUS_EXCLUDED
          }
        )
      );
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  // Form initial values
  const initialValues = {
    url: "",
  };

  const modalBody = (
    <>
      <URL name="url" label="Vendor Product Page Url" required placeholder="Enter Vendor Product Page Url" />
    </>
  );

  const Footer = (
    <>
      {submitResponse ? (
        <SaveButton label="Importing" disabled="disabled" />
      ) : (
        <SaveButton label="Add" />
      )}
    </>
  );

  return (
    <>
      <AddModal
        isOpen={toggle}
        toggleModalClose={onModalClose}
        modalBody={modalBody}
        modalTitle={"Add Vendor Product"}
        onSubmit={handleSubmit}
        modalFooter={Footer}
        initialValues={initialValues}
        hideDefaultButtons
      />
    </>
  );
};

export default ImportModal;
