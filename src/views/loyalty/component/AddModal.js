import React from "react";
import { Button } from "reactstrap";
// Components
import AddModal from "../../../components/Modal";
import Text from "../../../components/Text";

import { useDispatch } from "react-redux";

//action
import LoyaltyCategoryService from "../../../services/loyaltyCategoryService";
import { endpoints } from "../../../api/endPoints";
import { fetchList } from "../../../actions/table";

const AddCategoryModal = ({ toggle, onModalClose, isOpen }) => {
  const dispatch = useDispatch();

  // Handle Project Category form submit
  const handleSubmit = async (values) => {
    const data = new FormData();
    data.append("category_name", values?.name);
    try {
      dispatch(await LoyaltyCategoryService.add(data, (res) => {
        if (res) {
          dispatch(
            fetchList(
              "loyaltyCategory",
              `${endpoints().loyaltyCategory}/search`,
              1,
              25,
              {}
            )
          );
          toggle();
          
        }

      }));
    } catch (err) {}
  };

  // Form initial values
  const initialValues = {
    name: "",
  };

  // Modal Body for Add Product Category Form
  const addForm = (
    <>
      <Text
        label="Category Name"
        name="name"
        placeholder="Category Name"
        required
      />
    </>
  );

  // Modal Footer For Add Button
  const categoryFooter = <Button type="submit">Add</Button>;

  return (
    <>
      {/* Add Modal */}
      <AddModal
        isOpen={isOpen}
        toggle={toggle}
        toggleModalClose={onModalClose}
        modalTitle="Add Category"
        modalBody={addForm}
        modalFooter={categoryFooter}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        hideDefaultButtons
      />
    </>
  );
};

export default AddCategoryModal;
