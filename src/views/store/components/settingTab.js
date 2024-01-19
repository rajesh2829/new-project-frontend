import React from "react";
import Form from "../../../components/Form";

import { useDispatch } from "react-redux";
import { updateStore } from "../../../actions/storeList";
import SaveButton from "../../../components/SaveButton";
import SingleCheckbox from "../../../components/SingleCheckbox";

const SettingsTab = (props) => {
  const { storeId, productData } = props;

  const dispatch = useDispatch();

  const handleUpdate = async (values) => {
    try {

      const data = new FormData();

      data.append(
        "sales_settlement_required",
        values.sales_settlement_required
      );
      data.append("allow_sale", values.allow_sale);

      data.append("allow_replenishment", values.allow_replenishment);

      data.append("allow_purchase", values.allow_purchase);

      dispatch(updateStore(storeId, data, {}));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (values) => {

    let data = new FormData();

    data.append(
      "sales_settlement_required",
      values.sales_settlement_required
    );
    data.append("allow_sale", values.allow_sale);

    data.append("allow_replenishment", values.allow_replenishment);

    data.append("allow_purchase", values.allow_purchase);
    dispatch(updateStore(storeId, data, {}));
  };


  return (
    <Form
      enableReinitialize={true}
      initialValues={{
        sales_settlement_required: productData?.data?.sales_settlement_required,
        allow_sale: productData?.data?.allow_sale,
        allow_replenishment: productData.data?.allow_replenishment,
        allow_purchase: productData?.data?.allow_purchase,
      }}
      onSubmit={handleSubmit}
    >
      <div className="card bg-white mt-3 col-lg-12">
        <div className="card-body">
          <div className="form-wrapper">
            <div className="field-wrapper">
              <SingleCheckbox
                name="sales_settlement_required"
                label="Sales Settlement Required"
                className="accepted-terms"
                handleOnChangeSubmit={(value, name) =>
                  handleUpdate(value, name)
                }
              />
            </div>
          </div>
          <div className="form-wrapper">
            <div className="field-wrapper">
              <SingleCheckbox
                name="allow_sale"
                label="Allow Sale"
                className="accepted-terms"
                handleOnChangeSubmit={(value, name) =>
                  handleUpdate(value, name)
                }
              />
            </div>
          </div>
          <div className="form-wrapper">
            <div className="field-wrapper">
              <SingleCheckbox
                name="allow_replenishment"
                label="Allow Replenishment"
                className="accepted-terms"
                handleOnChangeSubmit={(value, name) =>
                  handleUpdate(value, name)
                }
              />
            </div>
          </div>
          <div className="form-wrapper">
            <div className="field-wrapper">
              <SingleCheckbox
                name="allow_purchase"
                label="Allow Purchase"
                className="accepted-terms"
                handleOnChangeSubmit={(value, name) =>
                  handleUpdate(value, name)
                }
              />
            </div>
          </div>
          <SaveButton />
        </div>
      </div>
    </Form>
  );
};

export default SettingsTab;
