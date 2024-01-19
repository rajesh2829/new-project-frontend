import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// Components
import Account from "../../../helpers/Account";
import Drawer from "../../../components/Drawer";
import String from "../../../lib/String";
import AccountForm from "./accountForm";
import { useState } from "react";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import SaveButton from "../../../components/SaveButton";
import AccountService from "../../../services/AccountService";
import Toast from "../../../components/Toast";
import { fetchList } from "../../../actions/table";
import { endpoints } from "../../../api/endPoints";
import Url from "../../../lib/Url";
import Vendor, { typeOption, vendorStatusOptions } from "../../../helpers/Vendor";

const AddAccountModal = ({
  toggle,
  onModalClose,
  rows,
  setRows,
  handleCloseModal,
  name,
  editorState,
  setEditorState,
  pathName,
  activeTab
}) => {

  const [status, setStatus] = useState("");
  const [type, setType] = useState(rows?.type || "");
  const [paymentAccountName, setpaymentAccountName] = useState([]);
  const [paymentAccountId, setpaymentAccountId] = useState();
  const [vendorValue, setVendorValue] = useState("");

  const [url, setUrl] = useState();
  const [cashDiscount, setCashDiscount] = useState();
  const [returnTerms, setReturnTerms] = useState();
  const [paymentTerms, setPaymentTerms] = useState();
  const [isSubmit, setIsSubmit] = useState()
  const dispatch = useDispatch();

  // Handle Project vendor form submit
  const handleSubmit = async (values) => {
    setIsSubmit(false)
    let rawComment;
    if (editorState) {
      rawComment = convertToRaw(editorState.getCurrentContent());
    }
    values.gst_number = values.gst_number ? values.gst_number : "";
    values.payment_account = values?.payment_account?.value
      ? values?.payment_account?.value
      : "";
    const newValues = Object.assign({}, values);
    newValues.status = status
      ? status
      : typeof newValues.status === "object"
        ? newValues.status.value
        : null;
    newValues.type = pathName == "/customers" ? Vendor.TYPE_CUSTOMER_VALUE : pathName == "/vendor" ? Vendor.TYPE_VENDOR_VALUE : values && values?.type ? values?.type.value : "";
    newValues.notes = JSON.stringify(rawComment)
      ? JSON.stringify(rawComment)
      : "";
    newValues.tab = activeTab;

    let params = {};

    if (pathName == "/customers") {
      params.type = Account.TYPE_CUSTOMER
    }
    if (pathName == "/vendor") {
      params.type = Account.TYPE_VENDOR
    }
    params.activeTab = activeTab
    let param = {
      status: Url.GetParam("status") ? Url.GetParam("status") : Vendor.STATUS_ACTIVE_VALUE,
      pagination: true,
      sort: Url.GetParam("sort"),
      sortDir: Url.GetParam("sortDir"),
      search : Url.GetParam("search"),
    }

    if (rows && rows?.id) {
      try {
        const response = await AccountService.updateVendor(rows?.id, newValues);
        dispatch(
          fetchList("activeCustomers", pathName == "/accounts"
            ? `${endpoints().accountAPI}/search`
            : pathName == "/customers"
              ? `${endpoints().accountAPI}/search`
              : `${endpoints().accountAPI}/vendorSearch`, 1, 25, {
            ...param,
            type: Account.TYPE_CUSTOMER,
            ...params
          })
        );
        dispatch(
          fetchList(
            "activeEmployees",
            pathName == "/accounts"
              ? `${endpoints().accountAPI}/search`
              : pathName == "/customers"
                ? `${endpoints().accountAPI}/search`
                : `${endpoints().accountAPI}/vendorSearch`, 1, 25, {
            ...param,
            type: Account.TYPE_EMPLOYEE,
            ...params
          }
          )
        );
        dispatch(
          fetchList(
            "activeVendors",
            pathName == "/accounts"
              ? `${endpoints().accountAPI}/search`
              : pathName == "/customers"
                ? `${endpoints().accountAPI}/search`
                : `${endpoints().accountAPI}/vendorSearch`, 1, 25, {
            ...param,
            type: Account.TYPE_VENDOR,
            ...params
          }
          )
        );
        dispatch(
          fetchList("allVendor", pathName == "/accounts"
            ? `${endpoints().accountAPI}/search`
            : pathName == "/customers"
              ? `${endpoints().accountAPI}/search`
              : `${endpoints().accountAPI}/vendorSearch`, 1, 25, {
            ...param,
            ...params
          })
        );
        Toast.success(response.message);
        onModalClose();
        setIsSubmit(true)
      } catch (err) {
        const res = err.response;
        res && Toast.error(res.data.message);
        setIsSubmit(true)
      }
    } else {
      try {
        const response = await AccountService.createVendor(newValues, activeTab);
        dispatch(
          fetchList("activeCustomers", pathName == "/accounts"
            ? `${endpoints().accountAPI}/search`
            : pathName == "/customers"
              ? `${endpoints().accountAPI}/search`
              : `${endpoints().accountAPI}/vendorSearch`, 1, 25, {
            ...param,
            type: Account.TYPE_CUSTOMER,
            ...params
          })
        );
        dispatch(
          fetchList(
            "activeEmployees",
            pathName == "/accounts"
              ? `${endpoints().accountAPI}/search`
              : pathName == "/customers"
                ? `${endpoints().accountAPI}/search`
                : `${endpoints().accountAPI}/vendorSearch`, 1, 25, {
            ...param,
            type: Account.TYPE_EMPLOYEE,
            ...params
          }
          )
        );
        dispatch(
          fetchList(
            "activeVendors",
            pathName == "/accounts"
              ? `${endpoints().accountAPI}/search`
              : pathName == "/customers"
                ? `${endpoints().accountAPI}/search`
                : `${endpoints().accountAPI}/vendorSearch`, 1, 25, {
            ...param,
            type: Account.TYPE_VENDOR,
            ...params
          }
          )
        );
        dispatch(
          fetchList("allVendor", pathName == "/accounts"
            ? `${endpoints().accountAPI}/search`
            : pathName == "/customers"
              ? `${endpoints().accountAPI}/search`
              : `${endpoints().accountAPI}/vendorSearch`, 1, 25, {
            ...param,
            ...params
          })
        );
        Toast.success(response.message);
        onModalClose();
        setIsSubmit(true)
      } catch (err) {
        const res = err.response;
        res && Toast.error(res.data.message);
        setIsSubmit(true)
      }

    }
  };

  useEffect(() => {
    setType("");
    setpaymentAccountName([]);
    setpaymentAccountId(null);
    setVendorValue("");
    setUrl("");
    setCashDiscount(null);
    setReturnTerms(null);
    setPaymentTerms(null);
    setStatus("");
  }, [toggle]);

  const handleStatusChange = (selectStatus) => {
    if (selectStatus && selectStatus.value) {
      setStatus(selectStatus.value);
    }
  };
  const handleTypeChange = (e) => {
    setType(e?.values?.type?.value);
  };

  const handlePaymentAccountChange = (e) => {
    setpaymentAccountId(e);
  };

  const vendorChange = (e) => {
    let data = e?.target?.value;
    setVendorValue(data);
  };
  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
  };
  const handleChange = (e) => {
    let data = e?.target?.value;
    setUrl(data);
  };

  const handleCashDiscount = (e) => {
    setCashDiscount(e?.values?.cash_discount);
  };
  const handleReturnTerms = (e) => {
    setReturnTerms(e?.target?.value);
  };

  const handlePaymentTerms = (e) => {
    setPaymentTerms(e?.target?.value);
  };

  const addVendorForm = (
    <AccountForm
      vendorChange={vendorChange}
      handlePaymentAccountChange={handlePaymentAccountChange}
      handleStatusChange={handleStatusChange}
      handleTypeChange={handleTypeChange}
      type={type}
      row={rows}
      setpaymentAccountName={setpaymentAccountName}
      editorState={editorState}
      handleEditorChange={handleEditorChange}
      vendorValue={vendorValue}
      handleChange={handleChange}
      handleCashDiscount={handleCashDiscount}
      handleReturnTerms={handleReturnTerms}
      handlePaymentTerms={handlePaymentTerms}
      name={name}
    />
  );
 

  const initialValue = {
    id: rows && rows?.vendorId,
    vendor_name: vendorValue
      ? String.Get(vendorValue)
      : rows && String.Get(rows?.vendorName),
    vendor_url: url ? url : rows && String.Get(rows.vendorUrl),
    status: status
      ? vendorStatusOptions.find((data) => data.value == status)
      : vendorStatusOptions.find((data) => data.label == rows?.status),
    gst_number: rows && rows?.gst_number,
    type: type
      ? typeOption.find((data) => data.value == type)
      : typeOption.find((data) => data.value == rows?.typeId),
    cash_discount: cashDiscount ? cashDiscount : rows && rows?.cash_discount,
    return_terms: returnTerms
      ? returnTerms
      : rows && rows?.return_terms
        ? rows?.return_terms
        : "",
    payment_terms: paymentTerms
      ? paymentTerms
      : rows && rows?.payment_terms
        ? rows?.payment_terms
        : "",
    payment_account: paymentAccountId
      ? {
        label: paymentAccountId?.label,
        value: paymentAccountId?.value,
      }
      : paymentAccountName.find((items) =>
        items?.value == rows?.payment_account ? rows?.payment_account : ""
      ),
  };

  const vendorFooter = (
    <SaveButton type="submit" loading={isSubmit == false} label={rows?.id ? "Save" : "Add"} />
  );

  return (
    <>
      <Drawer
        modelTitle={rows?.id
          ? `Edit ${activeTab === Account.TAB_CUSTOMER ? "Customer" : activeTab === Account.TAB_EMPLOYEE ? "Employee" : pathName == "/vendor" ? "Vendor" : "Vendor"}`
          : `Add ${activeTab === "Customers" ? "Customer" : activeTab === "Employees" ? "Employee" : pathName == "/vendor" ? "Vendor" : "Vendor"}`}
        DrawerBody={addVendorForm}
        DrawerFooter={vendorFooter}
        onSubmit={handleSubmit}
        initialValues={initialValue}
        handleOpenModal={onModalClose}
        handleCloseModal={onModalClose}
        handleDrawerClose={onModalClose}
        isModalOpen={toggle}
        enableReinitialize
      />
    </>
  );
};

export default AddAccountModal;
