import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Components
import PageTitle from "../../components/PageTitle";
import Form from "../../components/Form";
import CancelButton from "../../components/CancelButton";
import SaveButton from "../../components/SaveButton";
import BreadCrumb from "../../components/Breadcrumb";
import DeleteModal from "../../components/DeleteModal";
import HorizontalSpace from "../../components/HorizontalSpace";
import StatusComponent from "../../components/Status";
import Toast from "../../components/Toast";
import ObjectName from "../../helpers/ObjectName";
import Number from "../../lib/Number";
import AccountEntryService from "../../services/AccountEntryService";
import PaymentAccountService from "../../services/PaymentAccountService";
import AccountEntryForm from "./components/accountEntryForm";
import Permission from "../../helpers/Permission";
import DateTime from "../../lib/DateTime";
import PermissionLocalStorage from "../../lib/Permission";
import Action from "../../components/Action";
import { Nav, NavItem, NavLink } from "reactstrap";
import classNames from "classnames";
import ActivityList from "../../components/ActivityList";

const Tab = {
  SUMMARY: "Summary",
  HISTORY: "History",
};

const Detail = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  const [detail, setDetail] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [bankList, setBankList] = useState([]);
  const [activeTab, setActiveTab] = useState(Tab.SUMMARY)


  // Bread crumb list
  const breadcrumbList = [
    { label: "Home", link: "/accountDashboard" },
    { label: "Account Entry", link: "/accountEntry" },
    { label: "Account Entry", link: "" },
  ];

  // Account entry id
  const id = props.match.params.id;

  const data = localStorage.getItem(PermissionLocalStorage.USER_ROLE);
  const canDelete = data ? data.includes(Permission.ACCOUNT_ENTRY_DELETE) : false;
  const canEdit = data ? data.includes(Permission.ACCOUNT_ENTRY_EDIT) : false;

  useEffect(() => {
    getBankList();
    getDetails();
  }, []);

  const getDetails = async () => {

    AccountEntryService.get(id, (response => {
      if (response && response?.data) {
        setDetail(() => response.data);
      }
    }))
  };

  const deleteAccountEntry = async () => {
    dispatch(await AccountEntryService.delete(id, history, {}));
  };

  const getBankList = async () => {
    try {
      let bankList = [];
      await PaymentAccountService.getList((callback) => {
        const bankDetails = callback.data.data;
        if (bankDetails) {
          bankDetails.forEach((bank) => {
            bankList.push({
              label: bank.payment_account_name,
              value: bank.payment_account_name,
              id: bank?.id
            });
          });
        }
        setBankList(bankList);
      })

    } catch (err) {
      const res = err.response;
      res && Toast.error(res.data.message);
    }
  };

  // Handle form Submit
  const handleSubmit = async (values) => {
    try {
      let amount = values.amount.slice(1);
      const data = new FormData();
      data.append("payment_account", values?.payment_account?.id);
      data.append("date", DateTime.toISOStringDate(values?.date));


      data.append("amount", isFinite(values.amount) ? values.amount : amount);
      data.append("type", values?.type.value);

      data.append("notes", values?.notes);
      data.append("description", values.description);
      data.append(
        "account_entry_category", Number.Get(values?.account_entry_category?.value)

      );
      data.append(
        "account", Number.Get(values?.account?.value)

      );

      data.append(
        "bank_reference_number", values?.bank_reference_number

      );

      data.append(
        "bank_description", values?.bank_description

      );
      dispatch(await AccountEntryService.update(id, data))
    } catch (err) {
      console.log(err);
    }
  };

  // Form initial values
  const initialValues = {
    payment_account: bankList.find((data) => data?.id == detail?.payment_account),

    date: detail ? DateTime.getDateTimeByUserProfileTimezone(detail?.date) : "",
    amount: detail ? detail?.amount : "",
    type: {
      label: detail?.type,
      value: detail?.type,
    },
    description: detail ? detail?.description : "",
    account_entry_category: {
      label: detail?.account_entry_category,
      value: detail?.account_entry_category_id,
    },
    account: {
      label: detail?.accountName,
      value: detail?.accountId,
    },
    notes: detail ? detail.notes : "",

    bank_reference_number: detail ? detail.bank_reference_number : "",

    bank_description: detail ? detail.bank_description : ""
  };

  const onStatusChange = (value) => {
    let data = {};
    data.status = value;
    dispatch(AccountEntryService.updateStatus(id, data));
    getDetails()
  }

  const actionsMenuList = [
    {
      value: "delete",
      label: "Delete",
    },
  ];

  const handleActionChange = (e) => {
    if (e == "delete") {
      setDeleteModal(true);
    }

  };

  return (
    <>
      <DeleteModal
        id={props.match.params.id}
        label={props.match.params.id}
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Account Entry"
        deleteFunction={deleteAccountEntry}
      />

      {/* Bread Crumb Section */}
      <BreadCrumb list={breadcrumbList} />

      {/* Page title */}
      <div className="d-flex justify-content-between">
        <div>
          <PageTitle label="Account Entry Detail" DeleteButtonLabel="Delete" />
        </div>
        <div className="d-flex">
          <HorizontalSpace paddingleft="2" />
          <StatusComponent
            objectName={ObjectName.ACCOUNT_ENTRY}
            handleChange={onStatusChange}
            buttonLabel={detail?.statusName}
            currentStatusId={detail?.status}
            color={detail?.colorCode}
          />
          <div className="pl-2">
            <Action
              dropdownLinks={actionsMenuList}
              handleChange={handleActionChange}
            />
          </div>
        </div>
      </div>

      <Nav tabs className="admin-tabs">
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tab.SUMMARY,
            })}
            onClick={() => {
              setActiveTab(Tab.SUMMARY);
            }}
          >
            {Tab.SUMMARY}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tab.HISTORY,
            })}
            onClick={() => {
              setActiveTab(Tab.HISTORY);
            }}
          >
            {Tab.HISTORY}
          </NavLink>
        </NavItem>
      </Nav>

      {/* Form */}
      {activeTab == Tab.SUMMARY && (
        <div className="card mt-3">
          <div className="card-body ">
            <Form
              enableReinitialize
              initialValues={initialValues}
              onSubmit={handleSubmit}
            >
              <AccountEntryForm bankList={bankList} />
              <div>
                <SaveButton label="Save" loading={!canEdit} />
                <CancelButton
                  onClick={() => props.history.push("/accountEntry")}
                />
              </div>
            </Form>
          </div>
        </div>
      )}
      {activeTab == Tab.HISTORY &&
        <ActivityList
          id={id}
          objectId={id}
          object_name={ObjectName.ACCOUNT_ENTRY}
          history={history}
        />}
    </>
  );
};

export default Detail;
