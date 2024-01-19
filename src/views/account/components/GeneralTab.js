import React, { useState } from "react";
import Form from "../../../components/Form";
import HorizontalSpace from "../../../components/HorizontalSpace";
import SaveButton from "../../../components/SaveButton";
import CancelButton from "../../../components/CancelButton";
import String from "../../../lib/String";
import AccountForm from "./accountForm";
import { typeOption, vendorStatusOptions } from "../../../helpers/Vendor";

const General = (props) => {
  let { vendorDetails, handleSubmit, history } = props;
  const [status, setStatus] = useState("");
  const [type, setType] = useState(vendorDetails?.data?.type || "");
  const [paymentAccountName, setpaymentAccountName] = useState([])
  const [paymentAccountId, setpaymentAccountId] = useState('')
  const [vendorValue, setVendorValue] = useState();

  const handleEditorChange = (editorState) => {
    setEditorState(editorState)
  };

  // Handle Vendor Status Change
  const handleStatusChange = (selectStatus) => {
    if (selectStatus && selectStatus.value) {
      setStatus(selectStatus.value);
    }
  };

  const handleTypeChange = (e) => {
    setType(e?.values?.type?.value);
  };

  const handlePaymentAccountChange = (e) => {
    setpaymentAccountId(e)
  }

  const initialValue = {
    id: vendorDetails && vendorDetails?.data?.vendorId,
    vendor_name:
      vendorValue ? String.Get(vendorValue) : vendorDetails && String.Get(vendorDetails?.data?.vendorName),
    vendor_url:
      vendorDetails && String.Get(vendorDetails.data?.vendorUrl),
    status: {
      label: vendorDetails && vendorDetails?.data?.status,
      value: vendorDetails && vendorDetails?.data?.status,
    },
    status: vendorDetails?.data?.status
      ? vendorStatusOptions.find((data) => data.value == vendorDetails?.data?.status)
      : "",
    gst_number: vendorDetails && vendorDetails?.data?.gstNumber,
    type: type ? typeOption.find(
      (data) => data.value == type
    ) : typeOption.find(
      (data) => data.value == vendorDetails?.data?.type
    ),
    cash_discount: vendorDetails && vendorDetails?.data?.cash_discount,
    return_terms: vendorDetails && vendorDetails?.data?.return_terms ? vendorDetails?.data?.return_terms : "",
    payment_terms: vendorDetails && vendorDetails?.data?.payment_terms,
    payment_account: paymentAccountId ? {
      label: paymentAccountId?.label,
      value: paymentAccountId?.value
    } : paymentAccountName.find((items) => items?.value == vendorDetails?.data?.payment_account)
  }

  const vendorChange = (e) => {
    let data = e?.target?.value;
    setVendorValue(data);
  };

  return (
    <>
      <Form
        enableReinitialize
        initialValues={initialValue}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        <AccountForm
          vendorChange={vendorChange}
          handlePaymentAccountChange={handlePaymentAccountChange}
          handleStatusChange={handleStatusChange}
          handleTypeChange={handleTypeChange}
          type={type}
          vendorDetails={vendorDetails}
          setpaymentAccountName={setpaymentAccountName}
          editorState={props?.editorState}
          handleEditorChange={props?.handleEditorChange}
          editable={props?.editable}
        />
        {!props.editable && <HorizontalSpace>
          <SaveButton label="Save" />
          <CancelButton
            onClick={() => {
              history.goBack();
            }}
          />
        </HorizontalSpace>}
      </Form>
    </>
  );
};

export default General;
