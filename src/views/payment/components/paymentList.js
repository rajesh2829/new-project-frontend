import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DropdownItem } from "reactstrap";
import { fetchList } from "../../../actions/table";
import { endpoints } from "../../../api/endPoints";
import AccountSelect from "../../../components/AccountSelect";
import Currency from "../../../components/Currency";
import DateSelector from "../../../components/Date";
import Drawer from "../../../components/Drawer";
import MediaCarousel from "../../../components/MediaCarousel";
import PaymentAccountSelect from "../../../components/PaymentAccountSelect";
import SaveButton from "../../../components/SaveButton";
import Select from "../../../components/Select";
import Spinner from "../../../components/Spinner";
import StatusText from "../../../components/StatusText";
import Text from "../../../components/Text";
import TextArea from "../../../components/TextArea";
import UserSelect from "../../../components/UserSelect";
import MoreDropdown from "../../../components/authentication/moreDropdown";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import Media from "../../../helpers/Media";
import ObjectName from "../../../helpers/ObjectName";
import currency from "../../../lib/Currency";
import DateTime from "../../../lib/DateTime";
import Url from "../../../lib/Url";
import MediaService from "../../../services/MediaService";
import PaymentService from "../../../services/PaymentService";
import StatusService from "../../../services/StatusService";
import { AccountService } from "../../../services/AccountService";
import Number from "../../../lib/Number";

const buttonLabel = true;

const PaymentList = (props) => {
  const {
    params,
    history,
    options,
    paymentTab,
    isOpen,
    toggles,
    billData,
    showAccountFilter,
    showPaymentAccountFilter,
    showUserFilter,
    assigneePlaceholder,
    handleOpenModal,
    handleCloseModal,
    setRowValue,
    rowValue = null,
    setDetail,
    detail,
    setIsSubmitting,
    isSubmitting,
    notesValue,
    setOpenDeleteModal,
    purchaseAcountId,
    purchaseOwnerId,
    apiUrl
  } = props;
  const [amount, setAmount] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  const [accountValue, setAccountValue] = useState("");
  const [PaymentAccount, setPaymentAccount] = useState("");
  const [statusList, setStatusList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [descriptionChange, setDescriptionChange] = useState();
  const [notesChange, setNotesChange] = useState();
  const [imageurl, setImageUrl] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [dueDate, setDueDate] = useState();
  const [date, setDate] = useState();
  const [accountList, setAccountList] = useState([]);
  const [accountId, setAccountId] = useState("");
  const [paymentAccountName, setpaymentAccountName] = useState([]);
  const [userList, setUserList] = useState([]);
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();

  const sortByOption = [
    {
      value: "id:DESC",
      label: "Most Recent",
    },
  ];

  useEffect(() => {
    getStatusList();
    getAccountDetail();
  }, []);

  useEffect(() => {
    getDetails();
  }, [rowValue]);

  useEffect(() => {
    if (selectedFile) {
      getUrl();
    }
  }, [isLoading, selectedFile]);

  const getDetails = async () => {
    const data = await PaymentService.get(rowValue && rowValue?.id);
    if (data) {
      setDetail(data);
    }
  };

  const getUrl = () => {
    let url = [];
    for (let i = 0; i < selectedFile.length; i++) {
      const file = selectedFile[i];
      const imageUrl = URL.createObjectURL(file && file[0]);
      url.push({ url: imageUrl, image_id: file.id });
    }
    setImageUrl(url);
  };

  const handleAmountChange = (e) => {
    let value = parseFloat(e.values?.amount ? e.values?.amount : 0) || 0;
    setAmount(value);
  };

  const handlePaymenyAccount = (e) => {
    let value = e;
    setPaymentAccount(value);
    if (value == null) {
      setAccountId("");
    }
  };

  const handleAccountChange = (e) => {
    setAccountValue(e);
    setAccountId(e.paymentAccount);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    setSelectedFile("");
  };

  const handleDescriptionChange = (e) => {
    let value = e?.target?.value ? e?.target?.value : "";
    setDescriptionChange(value);
  };

  const handleNotesChange = (e) => {
    let value = e?.target?.value ? e?.target?.value : "";
    setNotesChange(value);
  };

  const onDrop = (selectedFile) => {
    setSelectedFile(selectedFile && selectedFile[0]);
  };

  let account_id = accountValue
    ? accountValue
    : rowValue
      ? rowValue?.accountId
      : billData
        ? billData?.account?.id
        : purchaseAcountId ? purchaseAcountId : params?.account ? params?.account : ""

  const getAccountDetail = async () => {
    let params = { id: account_id };
    const list = await AccountService.getOption(params);
    setAccountList(list);
  };

  const getStatusList = async () => {
    const getStatus = [];
    const status = await StatusService.search(ObjectName.PAYMENT);
    for (let i = 0; i < status.length; i++) {
      getStatus.push({
        label: status[i].name,
        value: status[i].id,
        default_owner: status[i]?.default_owner,
      });
    }
    setStatusList(getStatus);
  };

  const _toggle = () => {
    setDueDate("");
    setRowValue("");
    setSelectedFile("");
    setImageUrl("");
    setAmount("");
    setImageUrl("");
    setNotesChange("");
    setAccountId("");
    setInvoiceNumber("");
    setAccountValue("");
    setStatus("");
    handleCloseModal();
  };

  let ownerId = rowValue && rowValue.owner_id ? rowValue.owner_id : purchaseOwnerId ? purchaseOwnerId : status && status?.default_owner ? status?.default_owner : null

  const initialValues = {
    due_date: dueDate
      ? dueDate
      : rowValue?.due_date
        ? rowValue?.due_date
        : new Date()
          ? DateTime.getTodayDateByUserTimeZone(props.dueDate)
          : rowValue?.due_date
            ? rowValue?.due_date
            : "",

    date: date ? date : rowValue?.date
      ? rowValue?.date
      : DateTime.getTodayDateByUserTimeZone(new Date()) || "",
    status: status
      ? status
      : rowValue
        ? {
          label: rowValue?.status,
          value: rowValue?.statusId,
        }
        : statusList
          ? {
            label: statusList[0]?.label,
            value: statusList[0]?.value,
          }
          : "",
    amount:
      amount === 0
        ? ""
        : amount
          ? amount
          : rowValue?.amount
            ? rowValue?.amount
            : billData?.net_amount,
    account: accountValue ? accountValue : accountList && accountList.find(value => value.id == account_id || params?.account),
    payment_account: PaymentAccount
      ? PaymentAccount
      : rowValue
        ? {
          label: rowValue?.paymentAccount,
          value: rowValue?.paymentAccountId,
        }
        : accountList && accountList.length > 0
          ? paymentAccountName.find(
            (data) => data.value === accountList[0].paymentAccount
          )
          : accountId && accountId
            ? paymentAccountName.find((data) => data.value === accountId)
            : "",
    description: descriptionChange
      ? descriptionChange
      : detail?.description
        ? detail?.description
        : "",
    notes: notesChange ? notesChange : notesValue ? notesValue : "",
    invoice_number: invoiceNumber
      ? invoiceNumber

      : rowValue?.invoice_number
        ? rowValue?.invoice_number
        : billData?.invoice_number
          ? billData?.invoice_number
          : "",

    owner_id: userList && userList.find(
      data => data.id == ownerId
    ),
  };

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(false);
      const data = new FormData();
      let param = {
        sort: Url.GetParam("sort"),
        sortDir: Url.GetParam("sortDir"),
        startDate: Url.GetParam("startDate"),
        endDate: Url.GetParam("endDate"),
        status: Url.GetParam("status"),
      };
      if (params && params?.bill_id) {
        param.bill_id = params && params?.bill_id;
      }
      if (params && params?.purchaseId) {
        param.purchaseId = params && params?.purchaseId;
      }
      if(params && params.account){
        param.account = params && params?.account
      }

      if (rowValue && rowValue?.id) {
        data.append("date", new Date(values.date));
        data.append("amount", values && values.amount);
        data.append("status", values && values.status.value);

        data.append("account", values && values.account.value);
        data.append(
          "payment_account",
          values?.payment_account?.value ? values?.payment_account?.value : ""
        );
        data.append(
          "description",
          values.description ? values.description : ""
        );
        data.append("notes", values.notes ? values.notes : "");
        data.append("due_date", values.due_date ? values?.due_date : "");
        data.append(
          "invoice_number",
          values?.invoice_number ? values?.invoice_number : ""
        );
        data.append("owner_id", values?.owner_id ? values?.owner_id?.id : "");
        data.append("bill_id", rowValue?.bill_id ? rowValue?.bill_id : "");
        await PaymentService.update(rowValue?.id, data, setIsSubmitting, (res) => {
          if (res) {
            let valueProps = {
              sort: Url.GetParam("sort"),
              sortDir: Url.GetParam("sortDir"),
              purchaseId: param && param.purchaseId ? param.purchaseId : ""
            };
            if (billData && billData?.id) {
              valueProps.bill_id = billData?.id;
            }
            if(params && params.account){
              valueProps.account = params && params?.account
            }
            dispatch(
              fetchList(
                "payment",
                `${endpoints().paymentAPI}/search`,
                1,
                25,
                valueProps
              )
            );
            setPaymentAccount("");
            setAccountValue("");
            setSelectedFile("");
            setAmount("");
            setInvoiceNumber("")
            handleCloseModal();
            setIsSubmitting(true);
          }
        });
      } else {
        data.append("date", new Date(values.date));
        data.append("amount", values && values.amount);
        data.append("status", values && values.status.value);

        data.append("account", values && values.account.value);
        data.append(
          "payment_account",
          values.payment_account.value ? values.payment_account.value : ""
        );

        data.append("notes", values.notes ? values.notes : "");
        if (params?.bill_id) {
          data.append("bill_id", params && params?.bill_id);
        }
        data.append("due_date", values?.due_date ? values?.due_date : "");
        data.append(
          "invoice_number",
          values?.invoice_number ? values?.invoice_number : ""
        );
        data.append("purchaseId", params && params.purchaseId ? Number.Get(params.purchaseId) : "")
        data.append(
          "owner_id",
          status?.default_owner
            ? status?.default_owner
            : values?.owner_id
              ? values?.owner_id?.id
              : ""
        );

        dispatch(
          await PaymentService.create(data, param, toggles, (response) => {
            if (response) {

              setIsSubmitting(true);
              uploadFile(response?.data.id);
              setPaymentAccount("");
              setAccountValue("");
              setSelectedFile("");
              setInvoiceNumber("")
              setAmount("");
              handleCloseModal();
              _toggle();
            }
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDueDateChange = (e) => {
    setDueDate(e);
  };
  const handleDateChange=(e)=>{
    setDate(e);
  }

  const uploadFile = async (objectId, showToastMessage = false) => {
    try {
      if (selectedFile && selectedFile.length > 0 && objectId) {
        for (let i = 0; i < selectedFile.length; i++) {
          const File = selectedFile[i];
          const mediaFile = File ? File[0] : "";
          const media = File[0]?.name;

          const data = new FormData();

          if (mediaFile) {
            data.append([Media.MEDIA_FILE], mediaFile ? mediaFile : "");
          }
          if (media !== undefined) {
            data.append([Media.MEDIA_NAME], media ? media : "");
          }
          data.append("object", ObjectName.PAYMENT);

          data.append("object_id", objectId);

          data.append([Media.MEDIA_VISIBILITY], Media.VISIBILITY_PUBLIC);

          await MediaService.saveImage(data, showToastMessage);
          setImageUrl("");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatusChange = (values) => {
    setStatus(values?.values?.status ? values?.values?.status : "");
  };

  const onDropImage = (images) => {
    handleImageValue({
      ...images,
      id: selectedFile.length + 1,
    });
  };

  const handleImageValue = (images) => {
    setSelectedFile((prevFileList) => [...prevFileList, { ...images }]);
  };

  const handleImageRemove = (deletedvalue) => {
    setIsLoading(true);
    const updatedImageUrlArray = selectedFile.filter(
      (item) => item.id !== deletedvalue.image_id
    );
    setSelectedFile(updatedImageUrlArray);
    setIsLoading(false);
  };

  const onInvoicNumberChange = (e) => {
    let value = e.target.value;
    setInvoiceNumber(value);
  };

  const addPaymentForm = (
    <>
      <DateSelector label="Date" name="date" format="dd-MMM-yyyy"  onChange={handleDateChange} required />

      <AccountSelect
        name="account"
        label="Account"
        placeholder="Select Account"
        handleVendorChange={handleAccountChange}
        required
        isDisabled={billData?.account?.id ? true : false}
      />

      <PaymentAccountSelect
        handleChange={handlePaymenyAccount}
        setpaymentAccountName={setpaymentAccountName}
        name={"payment_account"}
        label={"Payment Account"}
        required
      />
      <Text
        label="Invoice Number"
        name="invoice_number"
        onChange={onInvoicNumberChange}
        required
      />

      <Currency
        label="Amount"
        name="amount"
        onInputChange={handleAmountChange}
        required
      />
      <Select
        name="status"
        label="Status"
        placeholder="Select Status"
        onInputChange={handleStatusChange}
        options={statusList}
        required
      />
      <div className="row">
        <div className="col-6">
          <UserSelect
            name="owner_id"
            label="Owner"
            userList={setUserList}
            selectedUserId={
              ownerId
            }
            showLoggedInUser={!rowValue?.id && props.showLoggedInUser}
          />
        </div>
        <div className="col-6">
          <DateSelector
            label="Due Date"
            name="due_date"
            isClearable
            onChange={handleDueDateChange}
          />
        </div>
      </div>
      <TextArea
        name="notes"
        label="Notes"
        placeholder="Enter Notes..."
        error=""
        fontBolded
        onChange={handleNotesChange}
      />

      {!rowValue && (
        <div className="col-12">
          <MediaCarousel
            showCarasoul
            Attachments
            onDropImage={onDropImage}
            imageUrl={imageurl}
            handleImageRemove={handleImageRemove}
          />
        </div>
      )}

      {rowValue && rowValue?.id && (
        <MediaCarousel
          showCarasoul
          objectName={ObjectName.PAYMENT}
          objectId={rowValue && rowValue.id}
          history={history}
          attachmentsList={true}
          Attachments={"Attachments"}
        />
      )}
    </>
  );

  const paymentFooter = (
    <SaveButton type="submit" loading={isSubmitting == false} />
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Drawer
        modelTitle={rowValue?.id ? "Edit Payment " : "Add Payment"}
        DrawerBody={addPaymentForm}
        DrawerFooter={paymentFooter}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        initialValues={initialValues}
        handleOpenModal={handleOpenModal}
        handleCloseModal={_toggle}
        handleDrawerClose={_toggle}
        isModalOpen={isOpen}
        buttonLabel={buttonLabel}
        enableReinitialize
      />

      <ReduxTable
        id="payment"
        showHeader
        newTableHeading
        searchPlaceholder="Search"
        apiURL={apiUrl ? apiUrl : `${endpoints().paymentAPI}/search`}
        history={history}
        params={params ? params : ""}
        sortByOptions={sortByOption}
        showDateFilter
        showStatusFilter
        totalAmount
        disableHeader={paymentTab ? true : false}
        paramsToUrl={true}
        showAccountFilter={showAccountFilter}
        showPaymentAccountFilter={showPaymentAccountFilter}
        showUserFilter={showUserFilter}
        assigneePlaceholder={assigneePlaceholder}
      >
        <ReduxColumn
          field="payment_number"
          sortBy="id"
          className="text-center"
          renderField={(row) => (
            <Link to={`/payment/detail/${row.payment_number}`}>
              {row.payment_number}
            </Link>
          )}
        >
          Payment#
        </ReduxColumn>
        <ReduxColumn 
        field="date" 
        sortBy="date" 
        className="text-center"
        renderField={(row) => (
          <span>
            {DateTime.getDate(row.date)}
          </span>
        )}
        >
          Date
        </ReduxColumn>
        <ReduxColumn
          field="paymentAccount"
          sortBy="payment_account_name"
          className="text-center"
        >
          Payment Account
        </ReduxColumn>
        <ReduxColumn field="account" sortBy="name" className="text-left">
          Account
        </ReduxColumn>
        <ReduxColumn
          field="amount"
          sortBy="amount"
          className="text-right"
          renderField={(row) => <span>{currency.Format(row.amount)}</span>}
        >
          Amount
        </ReduxColumn>
        <ReduxColumn
          field="status"
          sortBy="status"
          className="text-center"
          renderField={(row) => (
            <StatusText backgroundColor={row.statusColor} status={row.status} />
          )}
        >
          Status
        </ReduxColumn>

        {/* )} */}
        <ReduxColumn
          field="Action"
          disableOnClick
          width="70px"
          renderField={(row) => (
            <>
              <div className="d-flex justify-content-center align-items-center row">
                <div className="text-dark landing-group-dropdown">
                  <MoreDropdown>
                    <DropdownItem
                      onClick={() => {
                        setRowValue && setRowValue(row);
                        toggles();
                        setIsLoading(true);
                        getDetails();
                        setIsLoading(false);
                      }}
                    >
                      Quick View
                    </DropdownItem>
                    <DropdownItem
                      className=" text-danger cursor-pointer"
                      onClick={() => {
                        setOpenDeleteModal(true);
                        setRowValue(row);
                      }}
                    >
                      Delete
                    </DropdownItem>
                  </MoreDropdown>
                </div>
              </div>
            </>
          )}
        >
          Actions
        </ReduxColumn>
      </ReduxTable>
    </>
  );
};

export default PaymentList;
