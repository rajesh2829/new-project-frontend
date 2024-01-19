import React, { useEffect, useState } from "react";

// Components
import Select from "../../../components/Select.js";

// Services
import LoyaltyCategoryService from "../../../services/loyaltyCategoryService.js";

// Helpers
const accountLoyaltyForm = (props) => {

  // Props
  const {
    className,
    onAccountChange,
    onPointsChange,
    rowValue
  } = props;

  const [Address, setAddress] = useState([]);

  useEffect(() => {
    getAddress();
  }, []);

  const getAddress = async () => {
    const response = await LoyaltyCategoryService.search();
    let addressList = [];
    const details = response && response.data && response.data.data;
    if (details && details.length > 0) {
      for (let i = 0; i < details.length; i++) {
        const address = details[i];
        addressList.push({
          label: address?.name,
          value: address?.id,
        });
      }
    }
    setAddress(addressList);
    props.addressValue && props.addressValue(addressList)
  };

  const numbers = Array.from({ length: 20 }, (_, index) => index + 1);

  return (
    <>
      {/* Form */}
      <div className="row">
        <div className={`${className ? className : "col-sm-12"} "card-body"`}>
          <Select
            handleVendorChange={onAccountChange}
            name="name"
            label="Category"
            options={Address}
            menuPortal=""
            required
          />
          <Select
            handlePointsChange={onPointsChange}
            name="points"
            label="Points"
            options={numbers.map((number) => ({
              value: number.toString(),
              label: number.toString(),
            }))}
            required
            menuPortal=""
          />
        </div>
      </div>
    </>
  );
};

export default accountLoyaltyForm;