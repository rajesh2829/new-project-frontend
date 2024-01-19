import React from 'react'
import { endpoints } from "../../api/endPoints";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import PageTitle from "../../components/PageTitle";
import BreadCrumb from "../../components/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import DateTime from "../../lib/DateTime";
import AvatarCard from "../../components/AvatarCard";
import Currency from "../../lib/Currency";
import { Link } from "react-router-dom";

const PurchaseReport = (props) => {

  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    {
      label: "Reports",
      link: "/report"
    },
    {
      label: "Purchase Report ",
      link: ""
    }
  ];

  return (
    <>
      <BreadCrumb list={breadcrumbList} />
      <PageTitle label="Purchase Report" />
      <ReduxTable
        id="purchaseReport"
        showHeader
        searchPlaceholder="Search"
        apiURL={`${endpoints().PurchaseReportAPI}`}
        newTableHeading
        icon={<FontAwesomeIcon icon={faUser} />}
        message="You can start by clicking add."
        history={props.history}
        paramsToUrl={true}
        showDateFilter
        showStoreFilter
        sortByDropdown
        showUserFilter
        showAccountFilter
      >
        <ReduxColumn field="purchase_number" sortBy="purchase_number" className="text-center"
          renderField={(row) => (
            <Link to={`/purchase/${row.id}`}>{row.purchase_number}</Link>
          )}
        >
          Purchase#
        </ReduxColumn>
        <ReduxColumn className="text-center" field="purchase_date" sortBy="purchase_date" renderField={(row) => <>{DateTime.getDate(row.purchase_date)}</>}>
          Purchase Date
        </ReduxColumn>
        <ReduxColumn field="vendorName" sortBy="vendorName" className="text-center"
        >
          Vendor name
        </ReduxColumn>
        <ReduxColumn className="text-center" field="vendor_invoice_date" sortBy="vendor_invoice_date" renderField={(row) => <>{DateTime.getDate(row.vendor_invoice_date)}</>}>
          Vendor Invoice Date
        </ReduxColumn>
        <ReduxColumn field="vendor_invoice_number" sortBy="vendor_invoice_number" className="text-center"
        >
          Vendor Invoice Number
        </ReduxColumn>
        <ReduxColumn field="invoice_amount" sortBy="invoice_amount"
          renderField={(row) => (
            <span className="float-right">{Currency.Format(row.invoice_amount)}</span>
          )}
        >
          Invoice Amount
        </ReduxColumn>
        <ReduxColumn field="returned_items_amount" sortBy="returned_items_amount"
          renderField={(row) => (
            <span className="float-right">{Currency.Format(row.returned_items_amount)}</span>
          )}
        >
          Returned Items Amount
        </ReduxColumn>
        <ReduxColumn field="other_deduction_amount" sortBy="other_deduction_amount"
          renderField={(row) => (
            <span className="float-right">{Currency.Format(row.other_deduction_amount)}</span>
          )}
        >
          Other Deducation Amount
        </ReduxColumn>
        <ReduxColumn field="net_amount" sortBy="net_amount"
          renderField={(row) => (
            <span className="float-right">{Currency.Format(row.net_amount)}</span>
          )}
        >
          Net Amount
        </ReduxColumn>
        <ReduxColumn className="text-center" field="due_date" sortBy="due_date" renderField={(row) => <>{DateTime.getDate(row.due_date)}</>}>
          Due Date
        </ReduxColumn>
        <ReduxColumn field="location" sortBy="location" className="text-center"
        >
          Location
        </ReduxColumn>
        <ReduxColumn
          field="owner"
          className="ellipsis"
          sortBy="owner"
          renderField={(row) => (
            <>
              <AvatarCard
                firstName={row?.firstName}
                lastName={row?.lastname}
                url={row?.image_url}
              />
            </>
          )}
        >
          Owner
        </ReduxColumn>
      </ReduxTable>
    </>
  )
}

export default PurchaseReport