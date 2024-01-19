import React, { useState } from "react";
import AddButton from "../../components/AddButton";
import PageTitle from "../../components/PageTitle";
import ObjectName from "../../helpers/ObjectName";
import Payment from "../../helpers/Payment";
import PaymentList from "./components/paymentList";
import { Tabs } from "../../helpers/Tabs";
import DeleteModal from "../../components/DeleteModal";
import PaymentService from "../../services/PaymentService";
import { useDispatch } from "react-redux";

const PaymentListPage = (props) => {
  const { history, activeTab, tabId } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [rowValue, setRowValue] = useState(null);
  const [detail, setDetail] = useState();
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [dueDate, setDueDate] = useState();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setRowValue("")
    setDetail("")
    setIsSubmitting(true)
  };

  let dispatch = useDispatch()

  const closeDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const options = [
    {
      label: Payment.STATUS_NEW_TEXT,
      value: Payment.STATUS_NEW_TEXT,
    },
    {
      label: Payment.STATUS_PAID_TEXT,
      value: Payment.STATUS_PAID_TEXT,
    },
  ];

  const toggles = () => {
    setIsOpen(!isOpen);
    setDueDate("")
  };


  let params = { objectName: ObjectName.PAYMENT }
  if (props.purchase_id) {
    params.purchaseId = props.purchase_id
  }

  const paymentsDelete = async () => {
    dispatch(await PaymentService.delete(rowValue?.id, history, tabId));
    closeDeleteModal()
  };

  return (
    <>
      {activeTab !== Tabs.PAYMENTS &&
        <div className="d-flex justify-content-between pb-2">
          <PageTitle label="Payments" />
          <div >
            <AddButton
              className="pull-right"
              label={"Add"}
              onClick={handleOpenModal}
            />
          </div>
        </div>
      }
      <DeleteModal
        isOpen={openDeleteModal}
        label={rowValue?.id}
        toggle={closeDeleteModal}
        title="Delete Payment"
        deleteFunction={paymentsDelete}
      />
      <PaymentList
        history={history}
        options={options}
        isOpen={isOpen}
        toggles={toggles}
        setIsSubmitting={setIsSubmitting}
        isSubmitting={isSubmitting}
        handleCloseModal={handleCloseModal}
        showAccountFilter
        showPaymentAccountFilter
        showUserFilter
        assigneePlaceholder="Select Owner"
        params={params}
        setRowValue={setRowValue}
        rowValue={rowValue}
        setDueDate={setDueDate}
        dueDate={dueDate}
        setDetail={setDetail}
        detail={detail}
        notesValue={detail?.notes}
        showLoggedInUser
        setOpenDeleteModal={setOpenDeleteModal}
      />
    </>
  );
};

export default PaymentListPage;
