import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Components
import PageTitle from "../../components/PageTitle";

import Form from "../../components/Form";

import SaveButton from "../../components/SaveButton";
import CancelButton from "../../components/CancelButton";
import { deleteAccounts } from "../../actions/paymentAccount";

// Lib
import Url from "../../lib/Url";
import DeleteModal from "../../components/DeleteModal";
import BreadCrumb from "../../components/Breadcrumb";
import AccountForm from "./components/paymentAccountForm";
import Action from "../../components/Action";
import { paymentAccounts } from "../../helpers/AccountEntry";
import PaymentAccountService from "../../services/PaymentAccountService";


const Detail = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  const [primary, setPrimary] = useState();
  const [detail, setDetail] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  // Bread crumb list
  const breadcrumbList = [
    { label: "Home", link: "/accountDashboard" },
    { label: "PaymentAccount", link: "/paymentAccount" },
    { label: "Payment Account Detail", link: "" },
  ];


  // sales entry id
  const id = Url.GetParam("id");

  // Get sales Details
  const getDetails = async () => {
    const response = await PaymentAccountService.get(id);
    if (response && response.data) {
      setDetail(() => response.data);
      setPrimary(() => response.data.primary);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  const deleteAccount = async () => {
    const id = Url.GetParam("id");
    dispatch(await PaymentAccountService.delete(id, {}));
    history.push("/paymentAccount");
  };

  // Handle form Submit
  const handleSubmit = async (values) => {
    try {
      const data = new FormData();
      data.append("payment_account_type", values?.payment_account_type.value);

      // date
      data.append("payment_account_name", values?.payment_account_name);

      // Shift
      data.append("payment_account_number", values?.payment_account_number);

      // Type
      data.append("bank_name", values?.bank_name);
      data.append("ifsc", values?.ifsc);
      data.append("description", values.description);
      // Amount
      data.append("primary", primary);

      await PaymentAccountService.update(id, data);

    } catch (err) {
      console.log(err);
    }
  };

  // Form initial values
  const initialValues = {
    payment_account_type: paymentAccounts.find(
      (account) => account.value === detail?.payment_account_type
    ),
    payment_account_name: detail?.payment_account_name,
    payment_account_number: detail?.payment_account_number,
    bank_name: detail?.bank_name,
    ifsc: detail?.ifsc,
    description: detail?.description,
    primary: detail?.primary,
  };

  //Handle Actions Change
  const handleActionChange = (e) => {
    if (e == "Delete") {
      setDeleteModal(true);
    }
  };

  //Actions Menu List
  const actionsMenuList = [
    {
      value: "Delete",
      label: "Delete",
    }
  ]

  return (
    <>
      <DeleteModal
        id={detail?.id}
        label={detail?.payment_account_name}
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Account"
        deleteFunction={deleteAccount}
      />

      {/* Breadd Crumb Section */}
      <BreadCrumb list={breadcrumbList} />

      {/* Page title and Action Button */}
      <div className="row mx-1 justify-content-between">
        <PageTitle
          label="Payment Account Detail"
        />
        <div className="d-flex">
          <Action
            buttonLabel="Actions"
            hideCaret
            dropdownLinks={actionsMenuList}
            handleChange={handleActionChange}
          />
        </div>
      </div>
      {/* Form */}
      <div className="card mt-3">
        <div className="card-body ">
          <Form
            enableReinitialize
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            <AccountForm primary={primary} setPrimary={setPrimary} />
            <div>
              <SaveButton label="Save" />
              <CancelButton onClick={() => props.history.push("/paymentAccount")} />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Detail;
