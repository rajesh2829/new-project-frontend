import React from "react";
import { Button } from "reactstrap";
// Components
import AddModal from "../../../components/Modal";
import Text from "../../../components/Text";

import { useDispatch } from "react-redux";

//action
import { addCountry } from "../../../actions/country";

const AddCountryModal = ({ toggle, onModalClose, isOpen }) => {
  const dispatch = useDispatch();

  // Handle Project Category form submit
  const handleSubmit = async (values) => {
    const data = new FormData();
    data.append("country_name", values?.name);
    try {
      dispatch(addCountry(data, toggle));
    } catch (err) { }
  };

  // Form initial values
  const initialValues = {
    name: "",
  };

  // Modal Body for Add Product Category Form
  const addCountryForm = (
    <>
      <Text
        label="Country Name"
        name="name"
        placeholder="Country Name"
        required
      />
    </>
  );

  // Modal Footer For Add Button
  const countryFooter = <Button type="submit">Add</Button>;

  return (
    <>
      {/* Add Modal */}
      <AddModal
        isOpen={isOpen}
        toggle={toggle}
        toggleModalClose={onModalClose}
        modalTitle="Add Country"
        modalBody={addCountryForm}
        modalFooter={countryFooter}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        hideDefaultButtons
      />
    </>
  );
};

export default AddCountryModal;
