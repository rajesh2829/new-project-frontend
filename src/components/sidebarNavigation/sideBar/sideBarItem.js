import React, { useEffect, useRef, useState } from "react";
import SVG from "react-inlinesvg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../sideBar/styles.scss";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

// Hook
function useHover() {
  const [value, setValue] = useState(false);

  const ref = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener("mouseover", handleMouseOver);
        node.addEventListener("mouseout", handleMouseOut);

        return () => {
          node.removeEventListener("mouseover", handleMouseOver);
          node.removeEventListener("mouseout", handleMouseOut);
        };
      }
    },
    [ref.current] // Recall only if ref changes
  );

  return [ref, value];
}

const SideBarItem = (props) => {
  let {
    id,
    key,
    navigation,
    currentRoute,
    textColor,
    textHoverColor,
    enable,
    isOpen
  } = props;


  const sideNav = props.sideNav;

  const leftNavTextStyle = textColor ? { color: textColor } : {};
  const leftNavTextHoverStyle = textHoverColor ? { color: textHoverColor } : {};

  const [hoverRef, isHovered] = useHover();

  const [subNav, setSubNav] = useState(false);

  const showSubnav = () => setSubNav(!subNav);

  const renderTooltip = props => (
    <Tooltip {...props}>{navigation.name}</Tooltip>
  );

  const navClose = () => {
    isOpen === false
  }

  return (
    <li
      id={`nav-item-${id}`}
      key={key}
      className={[
        `${currentRoute === navigation.url
          ? `active`
          : currentRoute === navigation.addPageurl
            ? `active`
            : currentRoute.startsWith(navigation.editPageurl)
              ? `active`
              : currentRoute.startsWith(navigation.detailsPageurl)
                ? `active`
                : currentRoute.startsWith(navigation.listPageurl)
                  ? `active`
                  : currentRoute.startsWith(navigation.activePageurl)
                    ? `active`
                    : currentRoute.startsWith(navigation.navPageurl)
                      ? `active`
                      : currentRoute.startsWith(navigation.countryDetailPageurl)
                        ? `active`
                        : currentRoute.startsWith(navigation.loyaltyDetailPageurl)
                          ? `active`
                          : currentRoute.startsWith(navigation.statusPageurl)
                            ? `active`
                            : currentRoute.startsWith(navigation.stroreProductReport)
                              ? `active`
                              : currentRoute.startsWith(navigation.salesReport)
                                ? `active`
                                : currentRoute.startsWith(navigation.orderProductReport)
                                  ? `active`
                                  : currentRoute.startsWith(navigation.storeProductreport)
                                    ? `active`
                                    : currentRoute.startsWith(navigation.transferProductReport)
                                      ? `active`
                                      : currentRoute.startsWith(navigation.purchaseproductReport)
                                        ? `active`
                                        : currentRoute.startsWith(navigation.stockReport)
                                          ? `active`
                                          : currentRoute.startsWith(navigation.stockEntryReport)
                                            ? `active`
                                            : currentRoute.startsWith(navigation.orderReport)
                                              ? `active`
                                              : currentRoute.startsWith(navigation.orderSummaryReport)
                                              ? `active`
                                              : currentRoute.startsWith(navigation.orderProductGraphReport)
                                                ? `active`
                                                : currentRoute.startsWith(navigation.storeProductNoOrderReport)
                                                  ? `active`
                                                  : currentRoute.startsWith(navigation.storeProductNoStockReport)
                                                    ? `active`
                                                    : currentRoute.startsWith(navigation.purchaseRecommendationReport)
                                                      ? `active`
                                                      : currentRoute.startsWith(navigation.replenishReport)
                                                        ? `active`
                                                        : currentRoute.startsWith(navigation.orderProductCancelledReport)
                                                          ? `active`
                                                          : currentRoute.startsWith(navigation.orderCancelledReport)
                                                            ? `active`
                                                            : currentRoute.startsWith(navigation.stockProductNegativeStockReport)
                                                              ? `active`
                                                              : currentRoute.startsWith(navigation.orderSalesSettlementDiscrepancyReport)
                                                                ? `active`
                                                                : currentRoute.startsWith(navigation.highlight)
                                                                  ? `active`
                                                                  : currentRoute.startsWith(navigation.activiyType)
                                                                    ? `active`
                                                                    : currentRoute.startsWith(navigation.productSettingPageUrl)
                                                                      ? `active`
                                                                      : currentRoute.startsWith(navigation.transferType)
                                                                        ? `active`
                                                                        : currentRoute.startsWith(navigation.roledetailsPageurl)
                                                                          ? `active`
                                                                          : currentRoute.startsWith(navigation.purchaseSummaryReport)
                                                                            ? `active`
                                                                            : currentRoute.startsWith(navigation.purchaseReport)
                                                                            ? `active`
                                                                            : currentRoute.startsWith(navigation.mobileApp)
                                                                              ? `active`
                                                                              : currentRoute.startsWith(navigation.salesCoinReport)
                                                                              ? `active`
                                                                              : ""

        }`,
        `${enable ? "" : navigation.name === "Dashboard" ? "" : "disabled"}`,
      ].join(" ")}
      ref={hoverRef}
    >
      <Link to={navigation.url}>
        <OverlayTrigger
          placement="right"
          overlay={renderTooltip}
        >
          <FontAwesomeIcon
            icon={navigation.icon}
            style={
              currentRoute === navigation.url
                ? leftNavTextHoverStyle
                : currentRoute === navigation.addPageurl
                  ? leftNavTextHoverStyle
                  : currentRoute === navigation.stroreProductReport
                    ? leftNavTextHoverStyle
                    : currentRoute === navigation.salesReport
                      ? leftNavTextHoverStyle
                      : currentRoute === navigation.orderProductReport
                        ? leftNavTextHoverStyle
                        : currentRoute === navigation.storeProductreport
                          ? leftNavTextHoverStyle
                          : currentRoute === navigation.transferProductReport
                            ? leftNavTextHoverStyle
                            : currentRoute === navigation.purchaseproductReport
                              ? leftNavTextHoverStyle
                              : currentRoute === navigation.stockReport
                                ? leftNavTextHoverStyle
                                : currentRoute === navigation.stockEntryReport
                                  ? leftNavTextHoverStyle
                                  : currentRoute === navigation.orderReport
                                    ? leftNavTextHoverStyle
                                    : currentRoute === navigation.orderSummaryReport
                                    ? leftNavTextHoverStyle
                                    : currentRoute === navigation.orderProductGraphReport
                                      ? leftNavTextHoverStyle
                                      : currentRoute === navigation.storeProductNoOrderReport
                                        ? leftNavTextHoverStyle
                                        : currentRoute === navigation.storeProductNoStockReport
                                          ? leftNavTextHoverStyle
                                          : currentRoute === navigation.orderSalesSettlementDiscrepancyReport
                                            ? leftNavTextHoverStyle
                                            : currentRoute === navigation.purchaseRecommendationReport
                                              ? leftNavTextHoverStyle
                                              : currentRoute === navigation.replenishReport
                                                ? leftNavTextHoverStyle
                                                : currentRoute === navigation.orderProductCancelledReport
                                                  ? leftNavTextHoverStyle
                                                  : currentRoute === navigation.orderCancelledReport
                                                    ? leftNavTextHoverStyle
                                                    : currentRoute === navigation.stockProductNegativeStockReport
                                                      ? leftNavTextHoverStyle
                                                      : currentRoute === navigation.salesCoinReport
                                                      ? leftNavTextHoverStyle
                                                      : currentRoute.startsWith(navigation.editPageurl)
                                                        ? leftNavTextHoverStyle
                                                        : currentRoute.startsWith(navigation.detailsPageurl)
                                                          ? leftNavTextHoverStyle
                                                          : isHovered
                                                            ? leftNavTextHoverStyle
                                                            : leftNavTextStyle
            }
          />
        </OverlayTrigger>
        <div className="d-flex justify-content-between w-100" onClick={navClose}>
          <div className={isOpen === true ? "visible slide-Right" : !sideNav ? "visible slide-Right d-none d-sm-block" : sideNav ? "visible slide-Right" : "invisible slide-left"} >
            {!sideNav && (
              <span
                className=" desktop-only"
                style={
                  currentRoute === navigation.url
                    ? {}
                    : currentRoute === navigation.addPageurl
                      ? {}
                      : currentRoute.startsWith(navigation.editPageurl)
                        ? {}
                        : currentRoute.startsWith(navigation.detailsPageurl)
                          ? {}
                          : currentRoute.startsWith(navigation.stroreProductReport)
                            ? {}
                            : currentRoute.startsWith(navigation.salesReport)
                              ? {}
                              : currentRoute.startsWith(navigation.orderProductReport)
                                ? {}
                                : currentRoute.startsWith(navigation.storeProductreport)
                                  ? {}
                                  : currentRoute.startsWith(navigation.transferProductReport)
                                    ? {}
                                    : currentRoute.startsWith(navigation.purchaseproductReport)
                                      ? {}
                                      : currentRoute.startsWith(navigation.stockReport)
                                        ? {}
                                        : currentRoute.startsWith(navigation.orderReport)
                                          ? {}
                                          : currentRoute.startsWith(navigation.orderSummaryReport)
                                          ? {}
                                          : currentRoute.startsWith(navigation.orderProductGraphReport)
                                            ? {}
                                            : currentRoute.startsWith(navigation.storeProductNoOrderReport)
                                              ? {}
                                              : currentRoute.startsWith(navigation.storeProductNoStockReport)
                                                ? {}
                                                : currentRoute.startsWith(navigation.purchaseRecommendationReport)
                                                  ? {}
                                                  : currentRoute.startsWith(navigation.replenishReport)
                                                    ? {}
                                                    : currentRoute.startsWith(navigation.orderProductCancelledReport)
                                                      ? {}
                                                      : currentRoute.startsWith(navigation.orderCancelledReport)
                                                        ? {}
                                                        : currentRoute.startsWith(navigation.stockProductNegativeStockReport)
                                                          ? {}
                                                          : currentRoute.startsWith(navigation.orderSalesSettlementDiscrepancyReport)
                                                            ? {}
                                                            : currentRoute.startsWith(navigation.stockEntryReport)
                                                              ? {}
                                                              : currentRoute.startsWith(navigation.salesCoinReport)
                                                              ? {}
                                                              : isHovered
                                                                ? leftNavTextHoverStyle
                                                                : leftNavTextStyle
                }
              >
                {navigation.name}
              </span>
            )}
          </div>
          <div onClick={showSubnav}>
            {navigation && navigation.subNav && subNav === false ? (
              <FontAwesomeIcon
                icon={navigation.iconClosed}
                style={
                  currentRoute === navigation.url
                    ? {}
                    : currentRoute === navigation.addPageurl
                      ? {}
                      : currentRoute.startsWith(navigation.editPageurl)
                        ? {}
                        : currentRoute.startsWith(navigation.detailsPageurl)
                          ? {}
                          : isHovered
                            ? leftNavTextHoverStyle
                            : leftNavTextStyle
                }
              />
            ) : navigation.subNav && subNav ? (
              <FontAwesomeIcon
                icon={navigation.iconOpen}
                style={
                  currentRoute === navigation.url
                    ? {}
                    : currentRoute === navigation.addPageurl
                      ? {}
                      : currentRoute.startsWith(navigation.editPageurl)
                        ? {}
                        : currentRoute.startsWith(navigation.detailsPageurl)
                          ? {}
                          : isHovered
                            ? leftNavTextHoverStyle
                            : leftNavTextStyle
                }
              />
            ) : null}
          </div>
        </div>
      </Link>
      <div className="">
        {subNav && navigation.subNav
          ? navigation.subNav.map((item, index) => {
            return (
              <li id={`nav-item-${id}`}>
                <Link to={item.url} key={index}>
                  <FontAwesomeIcon icon={item.icon} />
                  <div className={!sideNav ? "visible slide-Right" : "invisible slide-left "}>
                    {!sideNav && (
                      <span
                        className="desktop-only"
                        style={
                          currentRoute === navigation.url
                            ? {}
                            : currentRoute === navigation.addPageurl
                              ? {}
                              : currentRoute.startsWith(navigation.editPageurl)
                                ? {}
                                : currentRoute.startsWith(navigation.detailsPageurl)
                                  ? {}
                                  : isHovered
                                    ? leftNavTextHoverStyle
                                    : leftNavTextStyle
                        }
                      >
                        {item.name}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            );
          })
          : ""}
      </div>
    </li>
  );
};

export default SideBarItem;
