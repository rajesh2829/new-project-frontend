import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Collapse } from "reactstrap";
import PageTitle from "../../components/PageTitle";
import Permission from "../../helpers/Permission";
import Url from "../../helpers/Url";
import { hasPermission } from "../../services/UserRolePermissionService";

const ReportList = () => {
  const [nameToggle, setNameToggle] = useState(true);
  const [purchaseProductToggle, setPurchaseProductToggle] = useState(true);
  const [purchaseToggle, setPurchaseToggle] = useState(true);

  const [salesToggle, setSalesToggle] = useState(true);
  const [stockToggle, setStockToggle] = useState(true);
  const [storeProductToggle, setStoreProductToggle] = useState(true);
  const [transferProductToggle, setTransferProductToggle] = useState(true);


  let showOrderGraphReport = hasPermission(Permission.ORDER_PRODUCT_GRAPH_REPORT_VIEW);

  let showOrderReport = hasPermission(Permission.ORDER_REPORT_VIEW);
  let showProductReport = hasPermission(Permission.ORDER_PRODUCT_REPORT_VIEW);
  let showPurchaseReport = hasPermission(Permission.PURCHASE_REPORT_VENDOR_WISE_VIEW);

  let purchaseRecommendedationReport = hasPermission(Permission.PURCHASE_RECOMMENDATION_REPORT_VIEW);
  let shoePurchaseProductReport = hasPermission(Permission.PURCHASE_PRODUCT_REPORT_VIEW);
  let showSalesReport = hasPermission(Permission.SALES_SETTLEMENT_REPORT_VIEW);
  let showStockReport = hasPermission(Permission.STOCK_REPORT_VIEW);
  let showOrdrSalesDiscrepancyReport = hasPermission(Permission.ORDER_SALES_SETTLEMENT_DISCREPANCY_REPORT_VIEW);

  let showNoOrderReport = hasPermission(Permission.STORE_PRODUCT_NO_ORDER_REPORT_VIEW);
  let showNoStockReport = hasPermission(Permission.STORE_PRODUCT_NO_STOCK_REPORT_VIEW);
  let showStoreProductReport = hasPermission(Permission.STORE_PRODUCT_STORE_PRODUCT_REPORT_VIEW);
  let showStoreProductNegativeStockReport = hasPermission(Permission.STORE_PRODUCT_NEGATIVE_STOCK_REPORT_VIEW);
  let showTransferProduct = hasPermission(Permission.TRANSFER_PRODUCT_REPORT_VIEW);
  let showOrderCancelledReport = hasPermission(Permission.ORDER_CANCELLED_REPORT_VIEW);
  let showOrderProductCancelledReport = hasPermission(Permission.ORDER_PRODUCT_CANCELLED_REPORT_VIEW);

  const nameToggles = () => {
    setNameToggle(!nameToggle);
  };
  const purchaseProductToggles = () => {
    setPurchaseProductToggle(!purchaseProductToggle);
  };
  const purchaseToggles = () => {
    setPurchaseToggle(!purchaseToggle);
  };
  const salesToggles = () => {
    setSalesToggle(!salesToggle);
  };
  const stockToggles = () => {
    setStockToggle(!stockToggle);
  };
  const storeProductToggles = () => {
    setStoreProductToggle(!storeProductToggle);
  };
  const transferProductToggles = () => {
    setTransferProductToggle(!transferProductToggle);
  };
  const tableheader = [
    {
      name: "Report Name",
    },
  ];

  // store product report

  const reportStoreProduct = [];
  if (showNoOrderReport) {
    let noOrderReport = {
      title: "Store Product - No Order Report",
      link: Url.STORE_PRODUCT_NO_ORDER_REPORT,
    };
    reportStoreProduct.push(noOrderReport);
  }
  if (showNoStockReport) {
    let noStockReport = {
      title: "Store Product - No Stock Report",
      link: Url.STORE_PRODUCT_NO_STOCK_REPORT,
    };
    reportStoreProduct.push(noStockReport);
  }
  if (showStoreProductReport) {
    let storeProductReport = {
      title: "Store Product Report",
      link: Url.STORE_PRODUCT_REPORT,
    };
    reportStoreProduct.push(storeProductReport);
  }

  if (showStoreProductNegativeStockReport) {
    let storeProductNegativeStockReport = {
      title: "Store Product - Negative Stock Report",
      link: Url.STORE_PRODUCT_NEGATIVE_STOCK_REPORT,
    };
    reportStoreProduct.push(storeProductNegativeStockReport);
  }

  // sales report
  const reportSalesProduct = [];
  if (showSalesReport) {
    let saleReport = {
      title: "Sales Settlement Report",
      link: Url.SALES_REPORT,
    };
    reportSalesProduct.push(saleReport);
  }

  // order report
  const reportOrderProduct = [];
  if (showOrderGraphReport) {
    let OrderGraphReport = {
      title: "Order Product Graph Report",
      link: Url.ORDER_GRAPH_REPORT,
    };
    reportOrderProduct.push(OrderGraphReport);
  }
  if (showProductReport) {
    let orderProductReport = {
      title: "Order Product Report",
      link: Url.ORDER_PRODUCT_REPORT,
    };
    reportOrderProduct.push(orderProductReport);
  }
  if (showOrderReport) {
    let OrderReport = {
      title: "Order Summary Report ",
      link: "/orderSummaryReport",
    };
    reportOrderProduct.push(OrderReport);
  }
  let orderReportUserWise = {
    title: "Order Sales Executive Report",
    link: Url.ORDER_REPORT_USER_WISE,
  };
  reportOrderProduct.push(orderReportUserWise);

  if (showOrdrSalesDiscrepancyReport) {
    let orderSalesSettlementDiscrepancyReport = {
      title: "Order And Sales Settlement Discrepancy Report",
      link: Url.ORDER_SALES_SETTLEMENT_DISCREPANCY_REPORT,
    };
    reportOrderProduct.push(orderSalesSettlementDiscrepancyReport);
  }

  if (showOrderCancelledReport) {
    let orderCancelledReport = {
      title: "Order Cancelled Report",
      link: Url.ORDER_CANCELLED_REPORT,
    };
    reportOrderProduct.push(orderCancelledReport);
  }

  if (showOrderProductCancelledReport) {
    let orderProductCancelledReport = {
      title: "Order Product Cancelled Report",
      link: Url.ORDER_PRODUCT_CANCELLED_REPORT,
    };
    reportOrderProduct.push(orderProductCancelledReport);
  }

  let replenishReport = {
    title: "Replenish Report",
    link: Url.REPLENISH_REPORT,
  };
  reportOrderProduct.push(replenishReport);

  let salesCoinReport = {
    title: "Sales Coins Report",
    link: Url.SALES_COIN_REPORT,
  };
  reportOrderProduct.push(salesCoinReport);

  let orderReport = {
    title: "Order Report",
    link: Url.ORDER_REPORT,
  };
  reportOrderProduct.push(orderReport);

  // trnsfer report
  const reportTransferProduct = [];
  if (showTransferProduct) {
    let trnsferReport = {
      title: "Transfer Product Report",
      link: Url.TRANSFER_PRODUCT_REPORT,
    };
    reportTransferProduct.push(trnsferReport);
  }

  // stock report
  const reportStock = [];
  if (showStockReport) {
    let stockreport = {
      title: "Stock Report",
      link: Url.STOCK_REPORT,
    };
    reportStock.push(stockreport);
  }

  // report purchase
  const reportPurchase = [];
  if (showPurchaseReport) {
    let purchaseReportVendorWise = {
      title: "Purchase Summary Report",
      link: Url.PURCHASE_SUMMARY_REPORT,
    };
    reportPurchase.push(purchaseReportVendorWise);
  }
  if (purchaseRecommendedationReport) {
    let recommandedReportProduct = {
      title: "Purchase: Recommendation Report",
      link: Url.PURCHASE_RECOMMENDATION_REPORT,
    };
    reportPurchase.push(recommandedReportProduct);
  }

  let recommandedReportProduct = {
    title: "Purchase Report",
    link: Url.PURCHASE_REPORT,
  };
  reportPurchase.push(recommandedReportProduct);

  //  purchase product report
  const reportPurchaseProduct = [];
  if (shoePurchaseProductReport) {
    let purchaseProductReport = {
      title: "Purchase Products Report",
      link: Url.PURCHASE_PRODUCT_REPORT,
    };
    reportPurchaseProduct.push(purchaseProductReport);
  }

  const reportStockEntry = [];
  let stockEntryReport = {
    title: "Stock Entry Report",
    link: Url.STOCK_ENTRY_REPORT,
  };
  reportStockEntry.push(stockEntryReport);


  return (
    <>
      <PageTitle label="Reports" />
      <div className="card">
        {showOrderGraphReport || showOrderReport || showProductReport ? (
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
                  <>{!nameToggle ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}</>
                </p>
              </div>
              <h5> Order</h5>
            </div>
            <div className="border border-bottom-0 border-top-0">
              <Collapse className="p-3" isOpen={nameToggle}>
                <div className="row">
                  <div className="col-lg-12 col-sm-12">
                    {reportOrderProduct &&
                      reportOrderProduct.length > 0 &&
                      reportOrderProduct.map((dataList) => {
                        let { title, link } = dataList;
                        return (
                          <>
                            <Link to={link} className=" my-2 text-dark">
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
        ) : null}
        {showPurchaseReport || purchaseRecommendedationReport ? (
          <div>
            <div
              className="border bg-light"
              style={{
                padding: "10px",
                cursor: "pointer",
              }}
              onClick={purchaseToggles}
            >
              <div className="position-relative">
                <p type="button" className=" btn-input pull-right">
                  <>{!nameToggle ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}</>
                </p>
              </div>
              <h5>Purchase</h5>
            </div>
            <div className="border border-bottom-0 border-top-0">
              <Collapse className="p-3" isOpen={purchaseToggle}>
                <div className="row">
                  <div className="col-lg-12 col-sm-12">
                    {reportPurchase &&
                      reportPurchase.length > 0 &&
                      reportPurchase.map((dataList) => {
                        let { title, link } = dataList;
                        return (
                          <>
                            <Link to={link} className=" my-2 text-dark">
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
        ) : null}
        {shoePurchaseProductReport ? (
          <div>
            <div
              className="border bg-light"
              style={{
                padding: "10px",
                cursor: "pointer",
              }}
              onClick={purchaseProductToggles}
            >
              <div className="position-relative">
                <p type="button" className=" btn-input pull-right">
                  <>
                    {!purchaseToggle ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
                  </>
                </p>
              </div>

              <h5>Purchase Product</h5>
            </div>
            <div className="border border-bottom-0 border-top-0">
              <Collapse className="p-3" isOpen={purchaseProductToggle}>
                <div className="row">
                  <div className="col-lg-12 col-sm-12">
                    {reportPurchaseProduct &&
                      reportPurchaseProduct.length > 0 &&
                      reportPurchaseProduct.map((dataList) => {
                        let { title, link } = dataList;
                        return (
                          <Link to={link} className=" my-2 text-dark">
                            {title}
                          </Link>
                        );
                      })}
                  </div>
                </div>
              </Collapse>
            </div>
          </div>
        ) : null}
        {showSalesReport ? (
          <div>
            <div
              className="border bg-light"
              style={{
                padding: "10px",
                cursor: "pointer",
              }}
              onClick={salesToggles}
            >
              <div className="position-relative">
                <p type="button" className=" btn-input pull-right">
                  <>{!salesToggle ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}</>
                </p>
              </div>
              <h5 className="">Sales </h5>
            </div>
            <div className="border border-bottom-0 border-top-0">
              <Collapse className="p-3" isOpen={salesToggle}>
                <div className="row">
                  <div className="col-lg-12 col-sm-12">
                    {reportSalesProduct &&
                      reportSalesProduct.length > 0 &&
                      reportSalesProduct.map((dataList) => {
                        let { title, link } = dataList;
                        return (
                          <Link to={link} className="  my-2  text-dark">
                            {title}
                          </Link>
                        );
                      })}
                  </div>
                </div>
              </Collapse>
            </div>
          </div>
        ) : null}
        {showStockReport ? (
          <div>
            <div
              className="border bg-light"
              style={{
                padding: "10px",
                cursor: "pointer",
              }}
              onClick={stockToggles}
            >
              <div className="position-relative">
                <p type="button" className=" btn-input pull-right">
                  <>{!stockToggle ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}</>
                </p>
              </div>

              <h5>Stock</h5>
            </div>
            <div className="border border-bottom-0 border-top-0">
              <Collapse className="p-3" isOpen={stockToggle}>
                <div className="row">
                  <div className="col-lg-12 col-sm-12">
                    {reportStock &&
                      reportStock.length > 0 &&
                      reportStock.map((dataList) => {
                        let { title, link } = dataList;
                        return (
                          <Link to={link} className="  my-2 text-dark">
                            {title}
                          </Link>
                        );
                      })}
                  </div>
                </div>
              </Collapse>
            </div>
          </div>
        ) : null}
        <div>
          <div
            className="border bg-light"
            style={{
              padding: "10px",
              cursor: "pointer",
            }}
            onClick={stockToggles}
          >
            <div className="position-relative">
              <p type="button" className=" btn-input pull-right">
                <>{!stockToggle ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}</>
              </p>
            </div>

            <h5>StockEnrty</h5>
          </div>
          <div className="border border-bottom-0 border-top-0">
            <Collapse className="p-3" isOpen={stockToggle}>
              <div className="row">
                <div className="col-lg-12 col-sm-12">
                  {reportStockEntry &&
                    reportStockEntry.length > 0 &&
                    reportStockEntry.map((dataList) => {
                      let { title, link } = dataList;
                      return (
                        <Link to={link} className="  my-2 text-dark">
                          {title}
                        </Link>
                      );
                    })}
                </div>
              </div>
            </Collapse>
          </div>
        </div>
        {showNoOrderReport || showNoStockReport || showStoreProductReport ? (
          <div>
            <div
              className="border bg-light"
              style={{
                padding: "10px",
                cursor: "pointer",
              }}
              onClick={storeProductToggles}
            >
              <div className="position-relative">
                <p type="button" className=" btn-input pull-right">
                  <>
                    {!storeProductToggle ?
                      <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />
                    }
                  </>
                </p>
              </div>
              <h5>Store Product</h5>
            </div>
            <div className="border border-bottom ">
              <Collapse className="p-3" isOpen={storeProductToggle}>
                <div className="row">
                  <div className="col-lg-12 col-sm-12">
                    {reportStoreProduct &&
                      reportStoreProduct.length > 0 &&
                      reportStoreProduct.map((dataList) => {
                        let { title, link } = dataList;
                        return (
                          <>
                            <Link to={link} className="  my-2 text-dark">
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
        ) : null}
        {showTransferProduct ? (
          <div>
            <div
              className="border bg-light"
              style={{
                padding: "10px",
                cursor: "pointer",
              }}
              onClick={transferProductToggles}
            >
              <div className="position-relative">
                <p type="button" className=" btn-input pull-right">
                  <>
                    {!transferProductToggle ?
                      <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />
                    }
                  </>
                </p>
              </div>
              <h5>Transfer Product</h5>
            </div>
            <div className="border border-bottom ">
              <Collapse className="p-3" isOpen={transferProductToggle}>
                <div className="row">
                  <div className="col-lg-12 col-sm-12">
                    {reportTransferProduct &&
                      reportTransferProduct.length > 0 &&
                      reportTransferProduct.map((dataList) => {
                        let { title, link } = dataList;
                        return (
                          <Link to={link} className="  my-2 text-dark">
                            {title}
                          </Link>
                        );
                      })}
                  </div>
                </div>
              </Collapse>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ReportList;
