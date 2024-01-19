import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Component
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import { DropdownItem, Nav, NavItem, NavLink, TabPane, TabContent } from "reactstrap";

// Helper
import { TagsIcon } from "../../assets/icons";
import PageTitle from "../../components/PageTitle";
import { endpoints } from "../../api/endPoints";
import Url from "../../lib/Url";
import DateTime from "../../lib/DateTime";
import AvatarCard from "../../components/AvatarCard";
import DeviceInfoStatus from "../../helpers/DeviceInfo";
import MoreDropdown from "../../components/authentication/moreDropdown";
import { useDispatch } from "react-redux";
import DeviceInfoService from "../../services/DeviceInfoService";
import { fetchList } from "../../actions/table";
import { Tabs } from "../../helpers/Setting";
import classNames from "classnames";
import Settings from "../setting/components/Message";

const DeviceInfo = (props) => {

  const { history } = props;
  // Use Effect
  const [activeTab, setActiveTab] = useState(Tabs.DEVICE);

  const Dispatch = useDispatch();
  const sortByOption = [
    {
      value: "id:DESC",
      label: "Most Recent",
    },
    {
      value: "name:ASC",
      label: "Name",
    }

  ];

  const tabToggle = (tab) => {
    setActiveTab(tab)
  }

  const statusOption = [
    {
      value: 1,
      label: "Pending",
    },
    {
      value: 2,
      label: "Approved",
    },
    {
      value: 3,
      label: "Blocked",
    }
  ]

  const updateStatus = async (id, status, params) => {
    Dispatch(await DeviceInfoService.statusUpdate(id, status, (res) => {
      if (res) {
        Dispatch(
          fetchList("deviceInfo", `${endpoints().userDeviceInfo}/search`, 1, 25, { sort: Url.GetParam("sort"), sortDir: Url.GetParam("sortDir"), search: Url.GetParam("search"), user: Url.GetParam("user"), status: Url.GetParam("status") })
        );
      }
    }))
  }

  return (
    <>
      <div className="pb-4">
        <PageTitle
          label="Devices"
        />
      </div>
      <Nav tabs className="admin-tabs mb-3">
        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tabs.DEVICE,
            })}
            onClick={() => {
              tabToggle(Tabs.DEVICE);
            }}
          >
            {Tabs.DEVICE}
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classNames({
              active: activeTab === Tabs.SETTING,
            })}
            onClick={() => {
              tabToggle(Tabs.SETTING);
            }}
          >
            {Tabs.SETTING}
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId={Tabs.DEVICE}>
          <ReduxTable
            id="deviceInfo"
            apiURL={`${endpoints().userDeviceInfo}/search`}
            showHeader
            newTableHeading
            sortByOptions={sortByOption}
            icon={<TagsIcon />}
            message="You can start by clicking Add New"
            paramsToUrl={true}
            history={history}
            searchPlaceholder="Search"
            showDateFilter
            showUserFilter
            showStatusFilter
            customStatusOption={statusOption}
          >
            <ReduxColumn
              type="link"
              isClickable="true"
              sortBy="name"
              width="350px"
              maxWidth="250px"
              minWidth="250px"
              renderField={(row) => (
                (
                  <>
                    <Link to={`/users/edit/${row.id}`}>
                      <AvatarCard
                        firstName={row.first_name}
                        lastName={row.last_name}
                        url={row.avatarUrl}

                      />
                    </Link>
                  </>
                )
              )}
            >
              Name
            </ReduxColumn>

            <ReduxColumn
              field="ip_address"
              sortBy="ip_address"
              minWidth="110px"
              className="text-center"
            >
              IP Address
            </ReduxColumn>
            <ReduxColumn
              field="device_name"
              sortBy="device_name"
              minWidth="130px"
              className="text-center"
            >
              Device Name
            </ReduxColumn>
            <ReduxColumn
              field="brand_name"
              sortBy="brand_name"
              minWidth="100px"
              className="text-center"
            >
              Brand Name
            </ReduxColumn>
            <ReduxColumn
              field="battery_percentage"
              sortBy="battery_percentage"
              minWidth="100px"
              className="text-center"
            >
              Battery  Percentage
            </ReduxColumn>
            <ReduxColumn
              field="network_connection"
              sortBy="network_connection"
              minWidth="100px"
              className="text-center"
            >
              Network Connection
            </ReduxColumn>
            <ReduxColumn
              field="version_number"
              sortBy="version_number"
              minWidth="100px"
              className="text-center"
            >
              Version Number
            </ReduxColumn>
            <ReduxColumn
              sortBy="created_at"
              minWidth="200px"
              className="text-center"

              renderField={(row) => (<span>{DateTime.getDateTimeByUserProfileTimezone(row.created_at)}</span>)}
            >
              CreatedAt
            </ReduxColumn>
            <ReduxColumn
              field="status"
              width="80px"
              minWidth="110px"
              maxWidth="80px"
              className="text-center"

            >
              Status
            </ReduxColumn>
            <ReduxColumn
              field="uniqueId"
              sortBy="unique_id"
              minWidth="100px"
              className="text-center"
            >
              Unique Id
            </ReduxColumn>
            <ReduxColumn
              field="Action"
              width="90px"
              disableOnClick
              renderField={(row) => (
                <div className=" text-center action-group-dropdown">
                  <MoreDropdown>
                    <DropdownItem
                      onClick={async () => {
                        Dispatch(
                          await updateStatus(
                            row.device_info_id,
                            DeviceInfoStatus.STATUS_PENDING,
                            { pagination: true }
                          )
                        );
                      }}
                    >
                      Pending
                    </DropdownItem>
                    <DropdownItem
                      onClick={async () => {
                        Dispatch(
                          await updateStatus(
                            row.device_info_id,
                            DeviceInfoStatus.STATUS_APPROVED,
                            { pagination: true }
                          )
                        );
                      }}
                    >
                      Approved
                    </DropdownItem>
                    <DropdownItem
                      onClick={async () => {
                        Dispatch(
                          await updateStatus(
                            row.device_info_id,
                            DeviceInfoStatus.STATUS_BLOCKED,
                            { pagination: true }
                          )
                        );
                      }}
                    >
                      Blocked
                    </DropdownItem>
                  </MoreDropdown>

                </div>
              )}
            >
              Action
            </ReduxColumn>
          </ReduxTable>
        </TabPane>
        <TabPane tabId={Tabs.SETTING}>
          <Settings
            history={history}
          />
        </TabPane>
      </TabContent>
    </>

  );
};

export default DeviceInfo;