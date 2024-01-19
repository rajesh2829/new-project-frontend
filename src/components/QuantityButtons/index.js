import React from "react";

// Components
import { Field } from "formik";

import Number from "../../lib/Number";

const QuantityButtons = ({
  handleChangeQuantity,
  quantity,
  label,
}) => {

  const handleQuantityChange = (event) => {
    if (event && event.target && event.target.value) {
      handleChangeQuantity(Number.Get(event.target.value));
    }
  }

  return (
    <>
      <div className="border border-dark rounded m-0">
        <button
          type="button"
          className=" rounded-0 btn btn-primary"
          onClick={() => handleChangeQuantity(quantity - 1)}
        >
          -
        </button>

        <span>
          {/* {quantity} */}
          <Field
            className="cart-text"
            name="quantity"
            placeholder="Qty"
            onBlur={(e) => handleQuantityChange(e)}
          />
        </span>

        <button
          type="button"
          className=" rounded-0 btn btn-primary"
          onClick={() => handleChangeQuantity(quantity + 1)}
        >
          +
        </button>
      </div>
    </>
  );
};

export default QuantityButtons;
