import React from "react";
import { Button } from "reactstrap";

// Components
import AddModal from "../../../components/Modal";
import Text from "../../../components/Text";
import toast from "../../../components/Toast";
import CategoryService from "../../../services/CategoryService";

const AddProductCategoryModal = ({ toggle, onModalClose }) => {
  // Handle Project Category form submit
  const handleSubmit = async (values) => {
    try {
      const response = await CategoryService.create(
        values
      );
      toast.success(response.message);
      onModalClose();
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  // Form initial values
  const initialValues = {
    name: "",
  };

  // Modal Body for Add Product Category Form
  const addProductCategoryForm = (
    <Text
      label="Category Name"
      name="name"
      placeholder="Category Name"
      required
    />
  );

  // Modal Footer For Add Button
  const productCategoryFooter = <Button type="submit">Add</Button>;

  return (
    <>
      {/* Add Modal */}
      <AddModal
        isOpen={toggle}
        toggle={toggle}
        toggleModalClose={onModalClose}
        modalTitle="Add Product Category"
        modalBody={addProductCategoryForm}
        modalFooter={productCategoryFooter}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        hideDefaultButtons
      />
    </>
  );
};

export default AddProductCategoryModal;
