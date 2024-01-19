import React, { useEffect, useState } from "react";
import Select from "./Select";
import ArrayList from "../lib/ArrayList";
import PaymentAccountService from "../services/PaymentAccountService";

const PaymentAccountSelect = (props) => {
  let { name, label, required, handleChange, isDisabled, placeholder, detail, setpaymentAccountName } = props;

  useEffect(() => {
    getPaymentAccountList()
  }, [detail])

  const [paymentList, setPaymentList] = useState([]);

  const getPaymentAccountList = async () => {
    PaymentAccountService.getList((response, err) => {
      const paymentAccountDetails = response?.data?.data;
      let paymentAccountList = [];
      paymentAccountDetails.forEach((PaymentAccount) => {
        paymentAccountList.push({
          label: PaymentAccount.payment_account_name,
          value: PaymentAccount.id,
        });
      });
      setPaymentList(paymentAccountList);
      setpaymentAccountName && setpaymentAccountName(paymentAccountList)
    });
  };

  const onFocus = () => {
    if (ArrayList.isEmpty(paymentList)) {
      getPaymentAccountList();
    }
  }
  
  return (
    <>
      <Select
        name={name ? name : "PaymentAccount"}
        placeholder={placeholder ? placeholder : "Select Payment Account"}
        options={paymentList}
        handleChange={handleChange}
        label={label}
        required={required}
        isDisabled={isDisabled}
        autoFocus={onFocus}
        menuPortal={props.menuPortal}
      />
    </>
  )
}
export default PaymentAccountSelect;