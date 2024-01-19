import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DropdownItem } from "reactstrap";

// Components
import MoreDropdown from "../../../components/authentication/moreDropdown";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";

// Actions
import { updatePurchase } from "../../../actions/purchase";

// Endpoints
import { endpoints } from "../../../api/endPoints";

// Lib
import Url from "../../../lib/Url";
import Currency from "../../../lib/Currency";

// Font Awesome Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import ObjectName from "../../../helpers/ObjectName";
import { fetchList } from "../../../actions/table";
import StatusText from "../../../components/StatusText";
import { AccountService } from "../../../services/AccountService";
import AddModal from "../../../components/Modal";
import UserSelect from "../../../components/UserSelect";
import SaveButton from "../../../components/SaveButton";
import { HttpStatus } from "../../../helpers/HttpStatus";

const PurchaseList = (props) => {
  const {
    id,
    params,
    history,
    status,
    section,
    apiUrl
  } = props;

  const [page, setPage] = useState();
  const [vendorList, setVendorList] = useState([]);
  const dispatch = useDispatch();
  const [isSubmit, setIsSubmit] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [row, setRow] = useState();

  useEffect(() => {
    getVendorList();
  }, []);


  const handleUserChange = (e) => {
    let value = e;
    setUser(value);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
    setIsSubmit(true);
    setUser("");
    setonDateChange("");
  };

  let initialValues = {
    user: user ? user : ""
  };

  const handleOnSubmit = async (values) => {
    let data = new FormData();
    let purchaseId = row?.id;

    if (values && values.user) {
      data.append("user", values.user.id || "");
    }

    dispatch(
      updatePurchase(purchaseId, data, {}, (response) => {
        if (response.status === HttpStatus.OK) {
          toggle();

          const params = {
            sort: Url.GetParam("sort"),
            sortDir: Url.GetParam("sortDir"),
            startDate: Url.GetParam("startDate"),
            endDate: Url.GetParam("endDate"),
            objectName: ObjectName.PURCHASE,
          };

          fetchList("purchase", `${endpoints().purchaseAPI}/search`, 1, 25, params);
        }
      })
    );
  };

  const purchaseListBody = (
    <div>
      <UserSelect
        name="user"
        showLoggedInUser
        setLogedInUser={row?.owner_id}
        handleUserChange={handleUserChange}
        selectedUserId={row?.owner_id}
      />
    </div>
  )

  const purchaseListFooter = (
    <SaveButton type="submit" label="Update" />
  );

  const getVendorList = async () => {
    try {
      let vendorLists = [];
      const response = await AccountService.vendorList();
      let vendor = response.data;
      if (vendor && vendor.length > 0) {
        for (let i = 0; i < vendor.length; i++) {
          vendorLists.push({
            id: vendor[i].id,
            label: vendor[i].name,
            value: vendor[i].id,
          });
        }
      }
      setVendorList(vendorLists);
    } catch (err) {
      console.log(err);
    }
  };

  // Sort By Option Values
  const sortByOption = [
    {
      value: "purchase_date:DESC",
      label: "Date",
    },
    {
      value: "id:DESC",
      label: "Most Recent",
    },
  ];

  return (
    <>
      <AddModal
        toggle={toggle}
        toggleModalClose={toggle}
        isOpen={isOpen}
        modalTitle="Change Owner"
        modalBody={purchaseListBody}
        modalFooter={purchaseListFooter}
        hideDefaultButtons
        onSubmit={(values) => {
          handleOnSubmit(values);
        }}
        initialValues={initialValues}
        enableReinitialize
      />

      <ReduxTable
        id={props?.id ? props?.id : "purchase"}
        showHeader
        disableHeader={props?.disableHeader}
        newTableHeading
        searchPlaceholder="Search"
        apiURL={apiUrl ? apiUrl : `${endpoints().purchaseAPI}/search`}
        setPage={setPage}
        params={{
          section: section ? section : "",
          search: Url.GetParam("search") || "",
          objectName: ObjectName.PURCHASE,
          bill_id: props?.billId ? props?.billId : "",
        }}
        paramsToUrl={true}
        history={history}
        sortByOptions={sortByOption}
        totalAmount
        message="You can start by clicking on Add New"
        icon={<FontAwesomeIcon icon={faCartShopping} />}
        showStatusFilter
        showAccountFilter
        showDateFilter
        vendorPlaceholder="Select Vendor"
        accountCustomOption={vendorList}
      >
        <ReduxColumn
          field="purchaseNumber"
          width="120px"
          minWidth="120px"
          className="text-center"
          maxWidth="220px"
          type="link"
          sortBy="purchase_number"
          isClickable="true"
          renderField={(row) => (
            <Link to={`/purchase/${row.id}`}>{row.purchaseNumber}</Link>
          )}
        >
          Purchase#
        </ReduxColumn>
        <ReduxColumn
          field="purchaseDate"
          className="text-center"
          width="80px"
          minWidth="100px"
          maxWidth="80px"
          sortBy="purchase_date"
        >
          Date
        </ReduxColumn>
        <ReduxColumn
          field="vendorInvoiceDate"
          className="text-center"
          width="180px"
          minWidth="180px"
          maxWidth="180px"
          sortBy="vendorInvoiceDate"
        >
          Vendor Invoice Date
        </ReduxColumn>
        <ReduxColumn
          field="vendorName"
          sortBy="vendor_name"
          minWidth="100px"
          maxWidth="100px"
        >
          Vendor
        </ReduxColumn>
        <ReduxColumn
          field="description"
          sortBy="description"
          minWidth="150px"
          maxWidth="150px"
        >
          Description
        </ReduxColumn>

        <ReduxColumn
          field="net_amount"
          className="text-right"
          renderField={(row) => <span>{Currency.Format(row.net_amount)}</span>}
          width="80px"
          minWidth="110px"
          maxWidth="80px"
          sortBy="amount"
        >
          Amount
        </ReduxColumn>
        <ReduxColumn
          field="ownerName"
          sortBy="ownerName"
          className="text-center"
          minWidth="150px"
          maxWidth="150px"
        >
          Owner
        </ReduxColumn>
        <ReduxColumn
          field="statusName"
          sortBy="status"
          width="80px"
          minWidth="110px"
          maxWidth="80px"
          className="brand-all"
          renderField={(row) => (
            <StatusText backgroundColor={row.statusColor} status={row.statusName} />
          )}
        >
          Status
        </ReduxColumn>
        <ReduxColumn
          field="Action"
          width={"70px"}
          disableOnClick
          renderField={(row) => (
            <div className="text-center action-group-dropdown">
              <MoreDropdown>
                <DropdownItem
                  onClick={() => {
                    setRow(row)
                    toggle();
                  }}
                >
                  Change Owner
                </DropdownItem>
              </MoreDropdown>
            </div>
          )}
        >
          Action
        </ReduxColumn>
      </ReduxTable>
    </>
  );
};

export default PurchaseList;
