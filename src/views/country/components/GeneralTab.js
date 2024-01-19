// React imports
import React from "react";
import { useDispatch } from "react-redux";

// Components
import Form from "../../../components/Form";
import Text from "../../../components/Text";
import CancelButton from "../../../components/CancelButton";
import SaveButton from "../../../components/SaveButton";

// Actions
import { updateCountry } from "../../../actions/country";

// Country detail page - General tab section
const GeneralTab = (props) => {
  // General tab props
  const { history, countryDetail } = props;

  // Dispatch from useDispatch
  const dispatch = useDispatch();
  // Initial Values
  const initialValues = {
    country_name: countryDetail?.country_name || "",
  };

  // Handle Update on submit
  const handleUpdate = (values) => {
    const id = countryDetail?.id;
    dispatch(updateCountry(id, values));
  };

  return (
    <>
      {/* Form */}
      <Form
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values) => {
          handleUpdate(values);
        }}
      >
        <div className="card p-3">
          {/* Company Name */}
          <Text name="country_name" label="Country Name" required />
        </div>

        {/* Save Button */}
        <SaveButton />

        {/* Cancel Button */}
        <CancelButton
          onClick={() => {
            history.push('/setting/Countries');
          }}
        />
      </Form>
    </>
  );
};

export default GeneralTab;
