import React, { useEffect, useState } from "react";
import Button from "../../components/Button";

// Components
import PageTitle from "../../components/PageTitle";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";

//Config
import { endpoints } from "../../api/endPoints";

// Action
import { useDispatch } from "react-redux";
import AccountForm from "./components/paymentAccountForm";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../../lib/Helper";
import PaymentAccountService from "../../services/PaymentAccountService";
import Url from "../../lib/Url";
import SaveButton from "../../components/SaveButton";
import Drawer from "../../components/Drawer";
import MoreDropdown from "../../components/authentication/moreDropdown";
import { DropdownItem } from "reactstrap";
import { paymentAccounts } from "../../helpers/AccountEntry";
import { fetchList } from "../../actions/table";
import Spinner from "../../components/Spinner";

const index = (props) => {
  const [isOpen, setIsOpen] = useState(0);
  const [isSubmit, setIsSubmit] = useState(true);

  const [primary, setPrimary] = useState(0);
  const [param, setParam] = useState({
    payment_account_type: "",
    payment_account_name: "",
    payment_account_number: "",
    bank_name: "",
    ifsc: "",
  });

  const [rowValue, setRowValue] = useState()
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    isLoggedIn();
  }, []);

  if (isLoading) {
    return <Spinner />
  }

  //Sort By Option Values
  const sortByOption = [
    {
      value: "payment_account_name:ASC",
      label: "Name",
    },
    {
      value: "id:DESC",
      label: "Most Recent",
    },

  ];

  const dispatch = useDispatch();

  const { history } = props;
  // Form initial values validation
  const initialValues = {
    payment_account_type: paymentAccounts && paymentAccounts?.find(
      (data) => data?.value == rowValue?.payment_account_type) || "",
    payment_account_name: rowValue?.payment_account_name ? rowValue?.payment_account_name : "",
    payment_account_number: rowValue?.payment_account_number ? rowValue?.payment_account_number : "",
    bank_name: rowValue?.bank_name ? rowValue?.bank_name : "",
    ifsc: rowValue?.ifsc ? rowValue?.ifsc : "",
    description: rowValue?.description ? rowValue?.description : "",
    primary: rowValue?.primary ? rowValue?.primary : "",
  };

  // Toggle model
  const toggle = () => {
    setIsOpen(!isOpen);
    setIsSubmit(true)
  };

  // get filter params
  const getFilterParams = (e) => {
    setParam(e);
  };

  const accountForm = <AccountForm primary={primary} setPrimary={setPrimary} />;

  const addSalesFooter = (
    <>
      <SaveButton
        type="submit"
        loading={isSubmit == false}
        label={rowValue?.id ? "Save" : "Create"}
      />
    </>
  );

  const handleSubmit = async (values) => {
    try {
      setIsSubmit(false)
      values.primary = primary;
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
      data.append("primary", values.primary);

      if (rowValue && rowValue?.id) {

        dispatch(
          await PaymentAccountService.update(rowValue?.id,
            data,
            setIsSubmit,
            (res) => {
              if (res) {
                toggle();
                setIsSubmit(false)
                setIsLoading(true);

                fetchList("payment accounts", `${endpoints().paymentAccountAPI}/search`, 1, 25,

                  { pagination: true, sort: Url.GetParam("sort"), sortDir: Url.GetParam("sortDir") },

                )

                setIsLoading(false)



              }
            }
          )
        );

      }

      else {
        dispatch(
          await PaymentAccountService.create(
            data,
            setIsSubmit,
            { pagination: true, sort: Url.GetParam("sort"), sortDir: Url.GetParam("sortDir") },
            (res) => {
              if (res) {
                toggle();
                setIsSubmit(false)
                setIsLoading(true);

                fetchList("payment accounts", `${endpoints().paymentAccountAPI}/search`, 1, 25,

                  { pagination: true, sort: Url.GetParam("sort"), sortDir: Url.GetParam("sortDir") },

                )

                setIsLoading(false)
              }
            }
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Drawer
        modelTitle={rowValue?.id ? "Edit Account" : "Add Account"}
        DrawerBody={accountForm}
        DrawerFooter={addSalesFooter}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        initialValues={initialValues}
        handleOpenModal={toggle}
        handleCloseModal={toggle}
        handleDrawerClose={toggle}
        isModalOpen={isOpen}
        enableReinitialize
      />
      <div className="row">
        <div className="col-md-12 pl-3">
          <div className="pb-4">
            <PageTitle
              label="Payment Accounts"
              buttonHandler={() => {
                setRowValue("")
                toggle();
              }}
              buttonLabel="Add New"
            />
          </div>
          <ReduxTable
            id="payment accounts"
            showHeader
            newTableHeading
            searchPlaceholder="Search"
            apiURL={`${endpoints().paymentAccountAPI}/search`}
            history={history}
            params={param}
            sortByOptions={sortByOption}
            paramsToUrl={true}
          >
            <ReduxColumn
              field="payment_account_name "
              sortBy="payment_account_name"
              isClickable="true"
              type="link"
              renderField={(row) => (
                <Link to={`/paymentAccount/detail?id=${row.id}`}>{row.payment_account_name}</Link>
              )}
              width="130px"
              maxWidth="150px"
              minWidth="150px"
            >
              Payment Account Name
            </ReduxColumn>
            <ReduxColumn
              field="payment_account_number"
              sortBy="payment_account_number"
              width="130px"
              maxWidth="170px"
              minWidth="170px"
            >
              Payment Account Number
            </ReduxColumn>
            <ReduxColumn field="bank_name" sortBy="bank_name" width="130px" maxWidth="130px" minWidth="130px">
              Bank
            </ReduxColumn>

            <ReduxColumn
              field="payment_account_type"
              sortBy="payment_account_type"
              width="150px"
              maxWidth="150px"
              minWidth="150px"
            >
              Payment Account Type
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
                            toggle()
                            setRowValue(row);
                            //  StoreSelectModal();
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
        </div>
      </div>
    </>
  );
};

export default index;
