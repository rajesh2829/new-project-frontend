// React imports
import React from "react";
import { useDispatch } from "react-redux";

// Components
import Form from "../../../components/Form";
import Text from "../../../components/Text";
import CancelButton from "../../../components/CancelButton";
import SaveButton from "../../../components/SaveButton";

// Actions
import LoyaltyCategoryService from "../../../services/loyaltyCategoryService";
import { fetchList } from "../../../actions/table";
import { endpoints } from "../../../api/endPoints";

// Country detail page - General tab section
const GeneralTab = (props) => {
  // General tab props
  const { history, categoryDetail } = props;

  // Dispatch from useDispatch
  const dispatch = useDispatch();
  // Initial Values
  const initialValues = {
    name: categoryDetail?.name || "",
  };

  // Handle Update on submit
  const handleUpdate = async (values) => {
    const data = new FormData();
    let id = categoryDetail?.id
    data.append("name", values?.name);
    try {
      dispatch(await LoyaltyCategoryService.update(id, data, (res) => {
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

        }

      }));
    } catch (err) { }
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
          <Text name="name" label="Category Name" required />
        </div>

        {/* Save Button */}
        <SaveButton />

        {/* Cancel Button */}
        <CancelButton
          onClick={() => {
            history.push('/setting/Loyalty');
          }}
        />
      </Form>
    </>
  );
};

export default GeneralTab;
