import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DropdownItem } from "reactstrap";
import CsvDownload from "react-csv-downloader";

// Components
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import PageTitle from "../../components/PageTitle";
import AddModal from "../../components/Modal";
import TextArea from "../../components/TextArea";
import Select from "../../components/Select";
import AddButton from "../../components/AddButton";
import { TagTypeName } from "../../helpers/Tag";
import Form from "../../components/Form";

// Endpoints
import { endpoints } from "../../api/endPoints";

// Lib
import Currency from "../../lib/Currency";

// Services
import PaymentAccountService from "../../services/PaymentAccountService";
import AccountEntryService from "../../services/AccountEntryService";

// Icons
import { IconDownload } from "../../assets/icons";

import ImportAccountEntry from "./components/ImportAccountEntry";

import DateTime from "../../lib/DateTime";

import Account from "../../helpers/Account";

import toast from "../../components/Toast";
import TagTypeService from "../../services/TagTypeService";
import TagSelect from "../../components/TagSelect";
import Number from "../../lib/Number";
import TagService from "../../services/TagService";
import ArrayList from "../../lib/ArrayList";
import AccountSelect from "../../components/AccountSelect";
import BillList from "./components/billList";
import Action from "../../components/Action";
import Date from "../../lib/Date";
import SaveButton from "../../components/SaveButton";
import Drawer from "../../components/Drawer";
import AccountForm from "./components/accountEntryForm";
import MoreDropdown from "../../components/authentication/moreDropdown";
import OutlineButton from "../../components/OutlineButton";
import Amount from "../../components/Currency";
import ObjectName from "../../helpers/ObjectName";
import CancelButton from "../../components/CancelButton";
import { fetchList } from "../../actions/table";
import StatusSelect from "../../components/SelectStatus";
import Url from "../../lib/Url";

const AccountEntry = (props) => {
  const { history } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [currentData, setCurrentData] = useState();
  const [bankList, setBankList] = useState();
  const [accountEntryDetails, setAccountEntryDetails] = useState();
  const [tagId, setTypeId] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [isBillModel, setIsBillModel] = useState();
  const [row, setRow] = useState("");
  const [tag, setTag] = useState("");
  const [paymentAccount, setPaymentAccount] = useState("");
  const [isSubmit, setIsSubmit] = useState(true);
  const [isBulkModelOpen, setIsBulkModelOpen] = useState(false)
  const [bulkSelectIds, setBulkSelectIds] = useState([])
  const [data, setData] = useState();
  const [statusList, setStatusList] = useState([]);
  let hiddenFileInput = React.useRef(null);

  const toggle = () => {
    setIsOpen(!isOpen);
    setIsSubmit(true);
  };

  useEffect(() => {
    getBankList();
    getProductList();
    getTags();
    getTagType();
  }, []);

  const typeList = [
    {
      value: "Credit",
      label: "Credit",
    },
    {
      value: "Debit",
      label: "Debit",
    },
  ];

  const getBankList = async () => {
    PaymentAccountService.getList((response, err) => {
      const bankDetails = response?.data?.data;
      let bankList = [];
      if (bankDetails) {
        bankDetails.forEach((bank) => {
          bankList.push({
            label: bank.payment_account_name,
            value: bank.id,
          });
          setBankList(bankList);
        });
        setBankList(bankList);
      }
    });
  };

  // Get AccountEntry List
  const getProductList = async () => {
    AccountEntryService.getAccountEntry((response, err) => {
      let AccountEntryList = [];
      const accountEntryDetails = response?.data?.data;

      if (accountEntryDetails) {
        accountEntryDetails.forEach((accountEntry) => {
          AccountEntryList.push({
            id: accountEntry.id,
            bank: accountEntry.bank,
            description: accountEntry.description,
            amount: accountEntry.amount,
            unit: accountEntry.unit,
            notes: accountEntry.notes,
            status: accountEntry.status,
            type: accountEntry.type,
            date: accountEntry.date,
          });
        });
      }
      setAccountEntryDetails(AccountEntryList);
    });
  };

  const getTags = async () => {
    let tagList = [];
    let params = { type: TagTypeName.ACCOUNT_ENTRY_CATEGORY };
    const response = await TagService.list(params);
    const tag = response.data.data;
    if (ArrayList.isNotEmpty(tag)) {
      tag.forEach((tag) => {
        tagList.push({
          id: tag.id,
          value: tag.id,
          label: tag.name,
        });
      });
    }
    setCategoryList(tagList);
  };

  //   Get Status List
  const getTagType = async () => {
    const response = await TagTypeService.search(
      TagTypeName.ACCOUNT_ENTRY_CATEGORY
    );
    const userRole = response && response?.data && response?.data?.data;
    let id = [];
    if (userRole && userRole.length > 0) {
      for (let i = 0; i < userRole.length; i++) {
        const values = userRole[i];
        id.push(values?.id);
      }
    }
    setTypeId(id);
  };

  const dispatch = useDispatch();

  const sortByOption = [
    {
      value: "date:DESC",
      label: "Date",
    },
    {
      value: "id:DESC",
      label: "Most Recent",
    },
  ];

  /**
   * Create Page
   *
   * @param data
   */
  const handleCreate = async (values) => {
    setIsSubmit(false);
    try {
      let amount = values.amount.slice(1);
      const datas = new FormData();
      datas.append("payment_account", values?.payment_account?.value);
      datas.append("date", DateTime.toISOStringDate(values?.date));

      datas.append("amount", isFinite(values.amount) ? values.amount : amount);
      datas.append("type", values?.type.value);

      datas.append("notes", values?.notes);
      datas.append("description", values.description);
      datas.append(
        "account_entry_category",
        Number.Get(values?.account_entry_category?.value)
      );
      datas.append("account", Number.Get(values?.account?.value));

      datas.append("bank_reference_number", values?.bank_reference_number);

      datas.append("bank_description", values?.bank_description);

      if (data?.id) {
        dispatch(await AccountEntryService.update(data?.id, datas));
        toggle();
        setIsSubmit(true);
      } else {
        dispatch(
          await AccountEntryService.create(datas, setIsSubmit, {}, (res) => {
            if (res) {
              toggle();
            }
          })
        );

        setIsSubmit(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  function convertObjectKeysToLowercase(obj) {
    const convertedObject = {};

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const lowercaseKey = key.toLowerCase();
        convertedObject[lowercaseKey] = obj[key];
      }
    }

    return convertedObject;
  }

  const fileImport = async (data) => {
    //this console for file colum name
    const bankEntryList = new Array();
    let accountData;
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        accountData = convertObjectKeysToLowercase(data[i]);

        if (accountData) {
          if (accountData["withdrawal amt."] || accountData["deposit amt."]) {
            bankEntryList.push({
              date: accountData.date
                ? Date.convertDateFormat(accountData.date)
                : "",
              payment_account: paymentAccount ? paymentAccount : null,
              amount: accountData["withdrawal amt."]
                ? accountData["withdrawal amt."].trim()
                : accountData["deposit amt."]
                  ? accountData["deposit amt."].trim()
                  : null,
              type: accountData["deposit amt."]
                ? Account.TYPE_CREDIT
                : accountData["withdrawal amt."]
                  ? Account.TYPE_DEBIT
                  : "",
              bank_description: accountData.narration
                ? accountData.narration.trim()
                : "",
              bank_reference_number: accountData["chq./ref.no."]
                ? accountData["chq./ref.no."].trim()
                : "",
            });
          }
        }
      }
      if (bankEntryList && bankEntryList.length > 0) {
        dispatch(await AccountEntryService.import(bankEntryList, history, {}));
      } else {
        toast.error("Select Valid Data File");
      }
    } else {
      toast.error("File Data Not Found");
    }
  };

  const handleChange = async (id, values) => {
    try {
      const data = new FormData();
      data.append(
        "account_entry_category",
        Number.Get(values?.values?.account_entry_category?.value)
      );

      dispatch(await AccountEntryService.update(id, data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleAccountChange = async (id, values) => {
    try {
      const data = new FormData();
      data.append("account", Number.Get(values?.value));
      data.append("account_entry_category", Number.Get(tag));
      dispatch(await AccountEntryService.update(id, data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleActionMenuChange = (selectedMenu) => {
    setPaymentAccount(selectedMenu);
    hiddenFileInput.current.value = null;
    hiddenFileInput.current.click();
  };

  const billList = (
    <>
      <BillList toggle={setIsBillModel} row={row} />{" "}
    </>
  );

  const addAccountEntryForm = <AccountForm bankList={bankList} />;

  const accountEntryFooter = (
    <SaveButton
      type="submit"
      loading={isSubmit == false}
      label={data?.id ? "Save" : "Add"}
    />
  );

  const AddBillModal = () => {
    setIsBillModel(!isBillModel);
  };

  const type = [
    {
      value: "Credit",
      label: "Credit",
    },
    {
      value: "Debit",
      label: "Debit",
    },
  ];

  const bulkUpdateForm = (
    <>
      <Select
        label="Type"
        name="type"
        options={type} />
      <Amount
        label="Amount"
        name="amount" />
      <Select
        name="payment_account"
        label="Payment Account"
        placeholder="Select Account Name"
        options={bankList}
      />
      <StatusSelect
        label="Status"
        name="status"
        objectName={ObjectName.ACCOUNT_ENTRY} />
      <TagSelect
        name="account_entry_category"
        label="Category"
        placeholder="Select Category"
        params={{ type: TagTypeName.ACCOUNT_ENTRY_CATEGORY }}
      />
      <AccountSelect
        name="account"
        label="Account"
        placeholder="Select Account"
      />
      <TextArea name="notes" label="Notes" placeholder="Enter Notes..." />
    </>
  )

  let bulkUpdateFooter = (
    <>
      <CancelButton
        onClick={() => {
          bulkCloseToggle();
        }}
      />
      <SaveButton />
    </>
  )

  let initialValues = {
    type: "",
    amount: "",
    payment_account: "",
    status: "",
    account_entry_category: "",
    account: "",
    notes: ""
  }
  const bulkCloseToggle = () => {
    setIsBulkModelOpen(!isBulkModelOpen)
  }

  const handleBulkSelect = (e) => {
    setBulkSelectIds(e)
  }

  const handleBulkUpdate = async (values) => {
    let data = new FormData();

    if (values?.account && values?.account !== "") {
      data.append("account", values?.account?.value)
      data.append("accountName", values?.account?.label)
    }

    if (values?.account_entry_category && values?.account_entry_category !== "") {
      data.append("account_entry_category", values?.account_entry_category?.value);
      data.append("account_entry_category_name", values?.account_entry_category?.label);
    }

    if (values?.amount && values?.amount !== "") {
      data.append("amount", values?.amount);
    }

    if (values?.notes && values?.notes !== "") {
      data.append("notes", values?.notes);
    }

    if (values?.payment_account && values?.payment_account !== "") {
      data.append("payment_account", values?.payment_account?.value);
      data.append("payment_account_name", values?.payment_account?.label);
    }

    if (values?.status && values?.status !== "") {
      data.append("status", values?.status?.value);
      data.append("statusName", values?.status?.label);
    }

    if (values?.type && values?.type !== "") {
      data.append("type", values?.type?.value);
      data.append("typeName", values?.type?.label);
    }


    dispatch(await AccountEntryService.bulkUpdate(bulkSelectIds, data, (res) => {
      if (res) {
        dispatch(
          fetchList(
            "accountEntry",
            `${endpoints().accountEntryAPI}/list`,
            Url.GetParam("page") ? Url.GetParam("page") : 1,
            Url.GetParam("pageSize") ? Url.GetParam("pageSize") : 25,
            {
              sort: Url.GetParam("sort"),
              sortDir: Url.GetParam("sortDir"),
            }
          )
        );
        bulkCloseToggle()
        setBulkSelectIds([])
      }
    }));
  }

  return (
    <>
      <AddModal
        isOpen={isBulkModelOpen}
        toggleModalClose={bulkCloseToggle}
        modalTitle="Bulk Update"
        modalBody={bulkUpdateForm}
        modalFooter={bulkUpdateFooter}
        initialValues={initialValues}
        onSubmit={(values) => {
          handleBulkUpdate(values);
        }}
        style={{ maxWidth: "800PX" }}
        hideDefaultButtons
      />
      <Drawer
        modelTitle={data?.id ? "Edit Account Entry" : "Add Account Entry"}
        DrawerBody={addAccountEntryForm}
        DrawerFooter={accountEntryFooter}
        onSubmit={(values) => {
          handleCreate(values);
        }}
        initialValues={{
          payment_account:
            bankList &&
            bankList.find((data1) => data1?.value === data?.paymentAccountId),

          date: data
            ? DateTime.getDateTimeByUserProfileTimezone(data?.date)
            : "",
          amount: data ? data?.amount : "",
          type: data
            ? {
              label: data?.type,
              value: data?.type,
            }
            : "",
          description: data ? data?.description : "",
          account_entry_category: data
            ? {
              label: data?.account_category,
              value: data?.account_entry_category_id,
            }
            : "",
          account: data
            ? {
              label: data?.account,
              value: data?.accoun_id,
            }
            : "",
          notes: data ? data.notes : "",

          bank_reference_number: data ? data.bank_reference_number : "",

          bank_description: data ? data.bank_description : "",
        }}
        enableReinitialize
        handleOpenModal={toggle}
        handleCloseModal={toggle}
        handleDrawerClose={toggle}
        isModalOpen={isOpen}
      // buttonLabel={buttonLabel}
      />

      <AddModal
        isOpen={isBillModel}
        toggle={AddBillModal}
        toggleModalClose={AddBillModal}
        modalTitle="Add Bill"
        hideDefaultButtons
        modalBody={billList}
        initialValues={{
          bill_id: "",
        }}
        enableReinitialize={true}
      />
      <div className="d-flex justify-content-between mb-3">
        <PageTitle label="Account Entry" />
        <div className="d-flex">
          <OutlineButton
            label="Bulk Update"
            onClick={() => {
              setIsBulkModelOpen(true)
            }}
            backgroundColor="var(--bulkUpdate-button-bg-color)"
            borderColor="var(--bulkUpdate-button-border-color)"
            color="var(--bulkUpdate-button-text-color)"
            className="float-right"
            disabled={bulkSelectIds && bulkSelectIds.length > 0 ? false : true}
          />
          <div className="mr-2">
            <ImportAccountEntry
              fileImport={fileImport}
              hiddenFileInput={hiddenFileInput}
            />
          </div>

          <div className="mr-2">
            <Action
              buttonLabel={"Import"}
              dropdownLinks={bankList}
              handleChange={handleActionMenuChange}
            />
          </div>

          <CsvDownload
            filename="transferProducts.csv"
            id="csvDownload"
            extension=".csv"
            datas={accountEntryDetails}
            text={
              <span href="#">
                <IconDownload />
                <span>Export</span>
              </span>
            }
          />
          <AddButton
            className=" ml-2 mr-1"
            label="Add New"
            onClick={(e) => {
              setData("");
              toggle();
            }}
          />
        </div>
      </div>

      <ReduxTable
        id="accountEntry"
        showHeader
        newTableHeading
        apiURL={`${endpoints().accountEntryAPI}/list`}
        sortByOptions={sortByOption}
        searchPlaceholder="Search"
        paramsToUrl={true}
        history={history}
        params={{}}
        showDateFilter
        showTagFilter
        tagPlaceholder="Select Category"
        showPaymentAccountFilter
        showTypeFilter
        showAccountFilter
        customTypeOption={typeList}
        customTagOption={categoryList}
        bulkSelect
        onBulkSelect={handleBulkSelect}
      >
        <ReduxColumn
          sortBy="account_entry_number"
          isClickable="true"
          type="link"
          minWidth="170px"
          renderField={(row) => (
            <Link to={`/accountEntry/details/${row.id}`}>
              {row.account_entry_number}
            </Link>
          )}
        >
          AccountEntry#
        </ReduxColumn>
        <ReduxColumn field="date" sortBy="date" minWidth="170px">
          Date
        </ReduxColumn>
        <ReduxColumn field="type" sortBy="type" minWidth="170px">
          Type
        </ReduxColumn>
        <ReduxColumn field="description" sortBy="description" minWidth="170px">
          Description
        </ReduxColumn>
        <ReduxColumn
          field="bank_description"
          sortBy="bank_description"
          minWidth="170px"
        >
          Bank Description
        </ReduxColumn>
        <ReduxColumn
          field="amount"
          sortBy="amount"
          renderField={(row) => (
            <span className="float-right">{Currency.Format(row.amount)}</span>
          )}
          minWidth="170px"
        >
          Amount
        </ReduxColumn>
        <ReduxColumn
          field="payment_account"
          sortBy="payment_account"
          minWidth="170px"
        >
          Payment Account
        </ReduxColumn>
        <ReduxColumn
          field="bank_reference_number"
          sortBy="bank_reference_number"
          minWidth="170px"
        >
          Bank Reference Number
        </ReduxColumn>

        <ReduxColumn
          field="account_category"
          sortBy="name"
          className="tezt-nowrap"
          minWidth="170px"
          renderField={(row) => (
            <div className="d-flex justify-content-center align-items-center">
              <Form
                // enableReinitialize={true}
                initialValues={{
                  account_entry_category: {
                    label: row?.account_category,
                    value: row?.account_entry_category_id,
                  },
                }}
              >
                <TagSelect
                  name="account_entry_category"
                  params={{ type: TagTypeName.ACCOUNT_ENTRY_CATEGORY }}
                  width="100%"
                  onChange={(e) => handleChange(row.id, e)}
                  placeholder="Select Category"
                />
              </Form>
            </div>
          )}
        >
          Category
        </ReduxColumn>

        <ReduxColumn
          field="bill_id"
          sortBy="bill_id"
          className="text-center"
          minWidth="170px"
          renderField={(row) => (
            <>
              {row.bill_id ? (
                row.bill_id
              ) : (
                <span
                  style={{
                    cursor: "pointer",
                    color: "blue",
                    textDecoration: "underline",
                  }}
                  onClick={() => {
                    setRow(row), AddBillModal();
                  }}
                >
                  Select
                </span>
              )}
            </>
          )}
        >
          Bill#
        </ReduxColumn>

        <ReduxColumn
          field="account"
          sortBy="account"
          className="text-center"
          minWidth="170px"
          renderField={(row) => (
            <div className="d-flex justify-content-center align-items-center">
              <Form
                // enableReinitialize={true}
                initialValues={{
                  vendor:
                    {
                      label: row?.account,
                      value: row?.account_id,
                    } || "",
                }}
              >
                <AccountSelect
                  width="100%"
                  handleVendorChange={(e) => handleAccountChange(row.id, e)}
                />
              </Form>
            </div>
          )}
        >
          Account
        </ReduxColumn>
        <ReduxColumn
          field="status"
          renderField={(row) => (
            <div
              className={`status-input text-center rounded text-white fw-600 custom-font-size text-uppercase mx-auto ${row.status ? "bg-success" : ""
                }`}
            >
              <p>{row.status}</p>
            </div>
          )}
          sortBy="status"
          minWidth="170px"
        >
          Status
        </ReduxColumn>
        <ReduxColumn field="notes" sortBy="notes" minWidth="170px">
          Notes
        </ReduxColumn>
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
                        setData(row);
                        toggle();
                      }}
                    >
                      Quick View
                    </DropdownItem>
                  </MoreDropdown>
                </div>
              </div>
            </>
          )}
        >
          Action
        </ReduxColumn>
      </ReduxTable>
    </>
  );
};

export default AccountEntry;
