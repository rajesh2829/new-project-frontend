import React, { useState } from "react";
import PageTitle from "../../components/PageTitle";
import { CompactDownIcon, CompactUpIcon } from "../../assets/icons";
import { Collapse } from "reactstrap";
import { Link } from "react-router-dom";
import Url from "../../helpers/Url";
import { hasPermission } from "../../services/UserRolePermissionService";
import Permission from "../../helpers/Permission";

const accountEntryList = () => {
  const [nameToggle, setNameToggle] = useState(true);

  const nameToggles = () => {
    setNameToggle(!nameToggle);
  };

  let showSaleGstReport = hasPermission(Permission.SALES_GST_REPORT_VIEW);
  let showPurchaseGstReport = hasPermission(Permission.PURCHASE_GST_REPORT_VIEW);

  const accountEntryReport = [];
  let attendenceReport = {
    title: "AccountEntry Report",
    link: Url.ACCOUNT_ENTRY_REPORT,
  };
  accountEntryReport.push(attendenceReport);

  if (showSaleGstReport) {

    let salesGstReport = {
      title: "Sales GST Report",
      link: Url.SALES_GST_REPORT,
    };
    accountEntryReport.push(salesGstReport);
  }

  if (showPurchaseGstReport) {

    let purchaseGstReport = {
      title: "Purchase GST Report",
      link: Url.PURCHASE_GST_REPORT,
    };
    accountEntryReport.push(purchaseGstReport);
  }

  return (
    <>
      <PageTitle label="Reports" />
      <div className="card">
        <div>
          <div
            className="border bg-light"
            style={{
              padding: "10px",
              cursor: "pointer",
            }}
            onClick={nameToggles}
          >
            <div className="position-relative">
              <p type="button" className=" btn-input pull-right">
                <>{!nameToggle ? <CompactDownIcon /> : <CompactUpIcon />}</>
              </p>
            </div>
            <h5> AccountEntry</h5>
          </div>
          <div className="border border-bottom-0 border-top-0">
            <Collapse className="p-3" isOpen={nameToggle}>
              <div className="row">
                <div className="col-lg-12 col-sm-12">
                  {accountEntryReport &&
                    accountEntryReport.length > 0 &&
                    accountEntryReport.map((dataList) => {
                      let { title, link } = dataList;
                      return (
                        <>
                          <Link to={link} className="my-2 text-dark">
                            {title}
                          </Link>
                          <br />
                        </>
                      );
                    })}
                </div>
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    </>
  );
};

export default accountEntryList;
