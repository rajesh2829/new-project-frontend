import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// Components
import PageTitle from "../../components/PageTitle";
import BillForm from "./components/billForm";
import BillList from "./components/billList";
import SaveButton from "../../components/SaveButton";
// Lib
import String from "../../lib/String";
// Services
import StatusService from "../../services/StatusService";
import BillService from "../../services/BillService";
// Helpers
import ObjectName from "../../helpers/ObjectName";
import Url from "../../lib/Url";
import Media from "../../helpers/Media";
import MediaService from "../../services/MediaService";
import DateTime from "../../lib/DateTime";
import Drawer from "../../components/Drawer";

const Bill = (props) => {
  const { history } = props;
  const [storeModalOpen, setStoreModalOpen] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState();
  const [billValue, setBillValue] = useState();
  const [netAmount, setNetAmount] = useState();
  const [accountValue, setAccountValue] = useState();
  const [statusId, setStatusId] = useState(null);
  const [invoiceDate, setInvoiceDate] = useState();
  const [selectedFile, setSelectedFile] = useState("");
  const [discountPercentage, setDicountPercentage] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [invoiceAmount, setInvoiceAmount] = useState(0);
  const [otherDeductionAmount, setOtherDeductionAmount] = useState(0);
  const [dueDate, setDueDate] = useState();
  const [rowValue, setRowValue] = useState(null);
  const [paybleAmount, setPaymentAmount] = useState()
  const [returnItemAmount, setReturnItemAmount] = useState("")
  const [cashDiscountAmountUse, setCashDiscountAmountUse] = useState()
  const [isSubmit, setIsSubmit] = useState(true);
  const [expiryReturnProductAmount, setExpiryReturnProductAmount] = useState("")
  const dispatch = useDispatch();

  useEffect(() => {
    getStatus();
  }, []);

  const StoreSelectModal = () => {
    setStoreModalOpen(!storeModalOpen);
    setAccountValue("");
    setInvoiceNumber("");
    setBillValue("");
    setInvoiceDate("");
    setNetAmount("");
    setDiscountAmount("");
    setDicountPercentage("");
    setInvoiceAmount("");
    setOtherDeductionAmount("");
    setReturnItemAmount("")
    setIsSubmit(true);
  };
  const billName = (values) => {
    const value = values?.values?.billing_name;
    setBillValue(value);
  };

  const onInvoiceNumberChange = (e) => {
    const value = e.target.value;
    setInvoiceNumber(value);
  };

  const onAccountChange = (e) => {
    const value = e;
    setAccountValue(value);
    setDicountPercentage(e?.cash_discount);
    const data = paybleAmount * (e?.cash_discount / 100)
    setCashDiscountAmountUse(data)
  };

  const invoiceDateChange = (e) => {
    setInvoiceDate(e);
  };

  const discountPercetageChange = (e) => {
    let value = parseFloat(e.target.value ? e.target.value : 0);
    setDicountPercentage(value);
  };

  const handleInvoiceAmount = (e) => {
    const value = parseFloat(e.target.value ? e.target.value : 0);
    setInvoiceAmount(value);
  };

  const handleOtherDeductionAmount = (e) => {
    const value = parseFloat(e.target.value ? e.target.value : 0);
    setOtherDeductionAmount(value);
  };

  const dueDateChange = (e) => {
    setDueDate(e);
  };

  const handleReturnedAmount = (e) => {
    const value = parseFloat(e.target.value ? e.target.value : 0);
    setReturnItemAmount(value)
  }

  const handleExpiryReturnedProductAmount = (e) => {
    const value = parseFloat(e.target.value ? e.target.value : 0);
    setExpiryReturnProductAmount(value)
  }

  useEffect(() => {
    const invoiceAmountUse = invoiceAmount ? invoiceAmount : rowValue?.invoice_amount
    const returnAmountUse = returnItemAmount ? returnItemAmount : rowValue?.rejectedProductAmount ? rowValue?.rejectedProductAmount : 0
    const otherDeductionAmountUse = otherDeductionAmount ? otherDeductionAmount : rowValue?.other_deduction_amount ? rowValue?.other_deduction_amount : 0
    const paybleAmountuse = invoiceAmountUse - (returnAmountUse + otherDeductionAmountUse)
    setPaymentAmount(paybleAmountuse)
  }, [invoiceAmount, returnItemAmount, otherDeductionAmount, rowValue?.other_deduction_amount, rowValue?.rejectedProductAmount, rowValue?.invoice_amount])

  useEffect(() => {
    const cashDicountAmountUse = paybleAmount * (discountPercentage / 100)
    setCashDiscountAmountUse(cashDicountAmountUse)
  }, [paybleAmount, discountPercentage])

  useEffect(() => {
    const netAmountUse = paybleAmount - cashDiscountAmountUse - expiryReturnProductAmount
    setNetAmount(netAmountUse)
  }, [paybleAmount, cashDiscountAmountUse, expiryReturnProductAmount])

  const addBillForm = (
    <BillForm
      history={history}
      billValue={billName}
      onInvoiceNumberChange={onInvoiceNumberChange}
      onAccountChange={onAccountChange}
      invoiceDate={invoiceDateChange}
      handleDueDateChange={dueDateChange}
      setSelectedFiles={setSelectedFile}
      selectedFiles={selectedFile}
      handleCashDiscountPerentage={discountPercetageChange}
      handleInvoiceAmount={handleInvoiceAmount}
      handleOtherDeductionAmount={handleOtherDeductionAmount}
      handleReturnedAmount={handleReturnedAmount}
      handleExpiryReturnedProductAmount={handleExpiryReturnedProductAmount}
    />
  );

  const addBillFooter = (
    <>
      <SaveButton type="submit" label={rowValue?.id ? "Save" : "Create"} loading={isSubmit == false} />
    </>
  );

  const getStatus = async () => {
    const status = await StatusService.search(ObjectName.BILL);
    for (let i = 0; i < status.length; i++) {
      setStatusId(status[i]?.value);
      break;
    }
  };

  const uploadFile = async (objectId) => {
    try {
      if (selectedFile && objectId) {
        const mediaFile = selectedFile ? selectedFile : "";

        const media = selectedFile?.name;

        const data = new FormData();

        if (mediaFile) {
          data.append([Media.MEDIA_FILE], mediaFile ? mediaFile : "");
        }
        if (media !== undefined) {
          data.append([Media.MEDIA_NAME], media ? media : "");
        }
        data.append("object", ObjectName.BILL);

        data.append("object_id", objectId);

        data.append([Media.MEDIA_VISIBILITY], Media.VISIBILITY_PUBLIC);

        const response = await MediaService.saveImage(data);

        if (response && response.id) {
          setSelectedFile("");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleSubmit = async (values) => {
    try {
      setIsSubmit(true);
      const data = new FormData();
      data.append("date", new Date(values?.invoice_date));
      data.append(
        "billing_name",
        values && String.Get(values?.billing_name?.label)
      );
      data.append("invoice_number", values && String.Get(values.invoice_number));
      data.append("account_name", values && String.Get(values?.account?.label));
      data.append("account_id", values && values?.account?.value);
      data.append("net_amount", values.net_amount && parseInt(values.net_amount));
      data.append(
        "cash_discount_amount",
        values?.cashDiscountAmount && parseInt(values?.cashDiscountAmount)
      );
      data.append(
        "cash_discount_percentage",
        values.cash_discount_percentage &&
        parseInt(values.cash_discount_percentage)
      );
      data.append(
        "invoice_amount",
        values.invoice_amount && parseInt(values?.invoice_amount)
      );
      data.append(
        "otherDeductionAmount",
        values.otherDeductionAmount && parseInt(values?.otherDeductionAmount)
      );
      data.append("due_date", values?.due_date ? DateTime.toISOStringDate(values.due_date) : "");
      data.append("rejectedProductAmount", values?.rejectedProductAmount && parseInt(values?.rejectedProductAmount));
      data.append("expiryReturnedProductAmount", values?.expiryReturnedProductAmount && parseInt(values?.expiryReturnedProductAmount))
      if (rowValue && rowValue?.id) {
        await dispatch(BillService.update(rowValue?.id, data, {}));
        setStoreModalOpen(false);
        setRowValue();
      } else {
        dispatch(
          await BillService.create(
            data,

            {
              sort: Url.GetParam("sort"),
              sortDir: Url.GetParam("sortDir"),
            },
            setIsSubmit,
            (res) => {
              if (res) {
                setStoreModalOpen(false);
                StoreSelectModal();
                uploadFile(res?.id);
              } else {
                setIsSubmit(false);
              }
            }
          )
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <>
      <Drawer
        modelTitle={rowValue?.id ? "Edit Bill" : "Add Bill"}
        DrawerBody={addBillForm}
        DrawerFooter={addBillFooter}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        initialValues={{

          due_date: dueDate
            ? DateTime.getTodayDateByUserTimeZone(dueDate)
            : rowValue?.due_date ? rowValue?.due_date : new Date(),

          invoice_date: invoiceDate
            ? DateTime.getTodayDateByUserTimeZone(invoiceDate)
            : rowValue?.bill_date
              ? rowValue?.bill_date
              : DateTime.getTodayDateByUserTimeZone(new Date()),
          status: "",
          billing_name:
            billValue?.label && billValue?.value
              ? {
                label: billValue?.label,
                value: billValue?.value,
              }
              : rowValue?.billing_name
                ? {
                  label: rowValue?.billing_name,
                  value: rowValue?.billing_name,
                  id: rowValue?.billing_name
                } : "",
          account:
            accountValue?.label && accountValue?.value
              ? {
                label: accountValue?.label,
                value: accountValue?.value,
              }
              : rowValue
                ? {
                  label: rowValue?.account_name,
                  value: rowValue?.account_id,
                }
                : "",
          invoice_number: invoiceNumber
            ? invoiceNumber
            : rowValue?.invoice_number
              ? rowValue?.invoice_number
              : "",
          net_amount: netAmount
            ? netAmount
            : rowValue?.net_amount
              ? rowValue?.net_amount
              : "",
          cash_discount_percentage: discountPercentage
            ? discountPercentage
            : rowValue?.cash_discount_percentage
              ? rowValue?.cash_discount_percentage
              : "",
          cashDiscountAmount: cashDiscountAmountUse
            ? cashDiscountAmountUse
            : rowValue?.cash_discount_amount
              ? rowValue?.cash_discount_amount
              : "",
          invoice_amount: invoiceAmount
            ? invoiceAmount
            : rowValue?.invoice_amount
              ? rowValue?.invoice_amount
              : "",
          otherDeductionAmount: otherDeductionAmount
            ? otherDeductionAmount
            : rowValue?.other_deduction_amount
              ? rowValue?.other_deduction_amount
              : "",
          rejectedProductAmount: returnItemAmount ? returnItemAmount : rowValue?.rejectedProductAmount ? rowValue?.rejectedProductAmount : "",
          expiryReturnedProductAmount: expiryReturnProductAmount ? expiryReturnProductAmount : rowValue?.expiryReturnedProductAmount ? rowValue?.expiryReturnedProductAmount : "",
        }}
        enableReinitialize
        handleOpenModal={StoreSelectModal}
        handleCloseModal={StoreSelectModal}
        handleDrawerClose={StoreSelectModal}
        isModalOpen={storeModalOpen}
      // buttonLabel={buttonLabel}
      />
      <PageTitle
        label="Bills"
        buttonHandler={(_e) => {
          StoreSelectModal();
          setRowValue("")
          setDueDate("");
        }}
        buttonLabel="Add New"
      />
      <BillList
        history={history}
        StoreSelectModal={StoreSelectModal}
        setRowValue={setRowValue}
        rowValue={rowValue}
      />
    </>
  );
};
export default Bill;
