import React from "react";
import { TabContent, TabPane } from "reactstrap";
//Pages
import { useDispatch } from "react-redux";
import { Navlist } from "../../../helpers/Nav";
import "../../../scss/_custom.scss";
import Activitytype from "../../activityType";
import Country from "../../country/components/List";
import Location from "../../location";
import Themes from "../../portalDetail/themes";
import Shift from "../../shift";
import TransferSetting from "../../transferSetting";
import Notification from "./Notification";

import General from "../../General";
import Integrations from "../../Integrations";
import Tax from "../../Tax";
import AccountSetting from "../../accountSetting";
import Bills from "../../bills";
import DeviceInfo from "../../device info";
import FineStatus from "../../fineStatus";
import MobileApp from "../../mobileApp";
import OrderProductSetting from "../../orderProductSetting";
import OrderSetting from "../../orderSetting";
import PaymentStatus from "../../paymentStatus";
import PurchaseSetting from "../../purchaseSetting";
import PurchaseProductSetting from "../../purchaseProductSetting";
import SaleSettlementSetting from "../../saleSettlementSetting";
import StatusDetails from "../../status/list";
import StockEntrySetting from "../../stockEntrySetting";
import TicketSetting from "../../ticketSetting";
import Message from "./Message";
import Inspection from "../../inspectionSetting";
import Timesheet from "../../timeSheets";
import StockEntryProductSetting from "../../stockEntryProductSetting";
import VisitorType from "../../visitorType";
import Category from "../../loyalty/list";
import TransferProductSetting from "../../TransferProductsetting";
import LocationProduct from "../../locationProduct";
import AttendanceType from "../../attendanceType";
import Replenishment from "../../replenishment";

const TabContentSection = (props) => {
  const { activeTab, history, data, match, settings } = props;

  return (
    <div>
      <TabContent activeTab={activeTab}>
        {activeTab == Navlist.COUNTRY && (
          <TabPane tabId={Navlist.COUNTRY}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <Country history={history} match={match} />
              </div>
            </div>
          </TabPane>
        )}

        {activeTab == Navlist.BILL && (
          <TabPane tabId={Navlist.BILL}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <Bills history={history} />
              </div>
            </div>
          </TabPane>
        )}
        {activeTab == Navlist.FINE && (
          <TabPane tabId={Navlist.FINE}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <FineStatus history={history} />
              </div>
            </div>
          </TabPane>
        )}

        {activeTab == Navlist.THEMES && (
          <TabPane tabId={Navlist.THEMES}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <Themes history={history} match={match} />
              </div>
            </div>
          </TabPane>
        )}

        {activeTab == Navlist.NOTIFICATION && (
          <TabPane tabId={Navlist.NOTIFICATION}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <Notification
                  history={history}
                  match={match}
                  settings={settings}
                />
              </div>
            </div>
          </TabPane>
        )}

        {activeTab == Navlist.REPLENISHMENT && (
          <TabPane tabId={Navlist.REPLENISHMENT}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <Replenishment
                  history={history}
                  match={match}
                  settings={settings}
                />
              </div>
            </div>
          </TabPane>
        )}

        {activeTab == Navlist.SHIFT && (
          <TabPane tabId={Navlist.SHIFT}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <Shift activeTab={activeTab} history={history} match={match} />
              </div>
            </div>
          </TabPane>
        )}

        {activeTab == Navlist.ACTIVITY_TYPE_URL && (
          <TabPane tabId={Navlist.ACTIVITY_TYPE_URL}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <Activitytype
                  activeTab={activeTab}
                  history={history}
                  match={match}
                />
              </div>
            </div>
          </TabPane>
        )}

        {activeTab == Navlist.STATUS && (
          <TabPane tabId={Navlist.STATUS}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <StatusDetails
                  activeTab={activeTab}
                  history={history}
                  match={match}
                />
              </div>
            </div>
          </TabPane>
        )}

        {activeTab == Navlist.INSPECTION && (
          <TabPane tabId={Navlist.INSPECTION}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <Inspection history={history} match={match} />
              </div>
            </div>
          </TabPane>
        )}

        {activeTab == Navlist.DEVICE_INFO && (
          <TabPane tabId={Navlist.DEVICE_INFO}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <DeviceInfo
                  activeTab={activeTab}
                  history={history}
                  match={match}
                />
              </div>
            </div>
          </TabPane>
        )}

        {activeTab == Navlist.TRANSFER && (
          <TabPane tabId={Navlist.TRANSFER}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <TransferSetting
                  activeTab={activeTab}
                  history={history}
                  match={match}
                />
              </div>
            </div>
          </TabPane>
        )}
        {activeTab == Navlist.LOCATION && (
          <TabPane tabId={Navlist.LOCATION}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <Location
                  // activeTab={activeTab}
                  history={history}
                // match={match}
                />
              </div>
            </div>
          </TabPane>
        )}
        {activeTab == Navlist.LOYALTY && (
          <TabPane tabId={Navlist.LOYALTY}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <Category history={history} match={match} activeTab={activeTab} />
              </div>
            </div>
          </TabPane>
        )}

        {activeTab == Navlist.LOCATION_PRODUCT_URL && (
          <TabPane tabId={Navlist.LOCATION_PRODUCT_URL}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <LocationProduct history={history} match={match} activeTab={activeTab} />
              </div>
            </div>
          </TabPane>
        )}

        {activeTab == Navlist.INTEGRATIONS && (
          <TabPane tabId={Navlist.INTEGRATIONS}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <Integrations
                  history={history}
                  props={props}
                  settings={settings}
                />
              </div>
            </div>
          </TabPane>
        )}
        {activeTab == Navlist.GENERAL && (
          <TabPane tabId={Navlist.GENERAL}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <General />
              </div>
            </div>
          </TabPane>
        )}
       
        {activeTab == Navlist.TAX_URL && (
          <TabPane tabId={Navlist.TAX_URL}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <Tax history={history} match={match} settings={settings} />
              </div>
            </div>
          </TabPane>
        )}
        {activeTab == Navlist.PURCHASE && (
          <TabPane tabId={Navlist.PURCHASE}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <PurchaseSetting history={history} />
              </div>
            </div>
          </TabPane>
        )}
        {activeTab == Navlist.PURCHASE_PRODUCT_URL && (
          <TabPane tabId={Navlist.PURCHASE_PRODUCT_URL}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <PurchaseProductSetting history={history} />
              </div>
            </div>
          </TabPane>
        )}
        {activeTab == Navlist.PAYMENT && (
          <TabPane tabId={Navlist.PAYMENT}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <PaymentStatus history={history} />
              </div>
            </div>
          </TabPane>
        )}
        {activeTab == Navlist.TICKET && (
          <TabPane tabId={Navlist.TICKET}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <TicketSetting history={history} />
              </div>
            </div>
          </TabPane>
        )}
        {activeTab == Navlist.ACCOUNT && (
          <TabPane tabId={Navlist.ACCOUNT}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <AccountSetting history={history} />
              </div>
            </div>
          </TabPane>
        )}
        {activeTab == Navlist.ORDER && (
          <TabPane tabId={Navlist.ORDER}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <OrderSetting history={history} />
              </div>
            </div>
          </TabPane>
        )}
        {activeTab == Navlist.SALES_SETTLEMENT_URL && (
          <TabPane tabId={Navlist.SALES_SETTLEMENT_URL}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <SaleSettlementSetting history={history} />
              </div>
            </div>
          </TabPane>
        )}
        {activeTab == Navlist.VISITOR_TYPE && (
          <TabPane tabId={Navlist.VISITOR_TYPE}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <VisitorType history={history} />
              </div>
            </div>
          </TabPane>
        )}
        {activeTab == Navlist.STOCK_ENTRY_URL && (
          <TabPane tabId={Navlist.STOCK_ENTRY_URL}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <StockEntrySetting history={history} />
              </div>
            </div>
          </TabPane>
        )}
        {activeTab == Navlist.STOCK_ENTRY_PRODUCT_URL && (
          <TabPane tabId={Navlist.STOCK_ENTRY_PRODUCT_URL}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <StockEntryProductSetting history={history} />
              </div>
            </div>
          </TabPane>
        )}
        {activeTab == Navlist.ORDER_PRODUCT_URL && (
          <TabPane tabId={Navlist.ORDER_PRODUCT_URL}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <OrderProductSetting history={history} />
              </div>
            </div>
          </TabPane>
        )}
        {activeTab == Navlist.TIME_SHEET && (
          <TabPane tabId={Navlist.TIME_SHEET}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <Timesheet history={history} />
              </div>
            </div>
          </TabPane>

        )}
        {activeTab == Navlist.TRANSFER_PRODUCT_URL && (
          <TabPane tabId={Navlist.TRANSFER_PRODUCT_URL}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <TransferProductSetting history={history} />
              </div>
            </div>
          </TabPane>
        )}
        {activeTab == Navlist.ATTENDANCE_TYPE && (
          <TabPane tabId={Navlist.ATTENDANCE_TYPE}>
            <div className="tab-content-wrapper">
              <div className="mt-3 mb-3">
                <AttendanceType
                  {...props}
                />
              </div>
            </div>
          </TabPane>
        )}
      </TabContent>
    </div>
  );
};

export default TabContentSection;
