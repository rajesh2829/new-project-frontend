import React from "react";
import Select from "./Select";

const PaymentType = (props) => {
  const { name, label, options,handleChange } = props;

  return (
    <div>
      <Select
        name={name ? name : "paymentType"}
        fontBolded
        label={label}
        options={options}
        placeholder="Select Payment"
        handleChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default PaymentType;
