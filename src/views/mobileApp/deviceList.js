import React, { useEffect, useState } from "react";
import { DropdownItem, Nav, NavItem, NavLink, TabPane, TabContent } from "reactstrap";
import PageTitle from "../../components/PageTitle";
import TagDetail from "../../components/TagList";
import { TagsIcon } from "../../assets/icons";

export const Type = {
  MOBILE: "Mobile", 
};

import Tab from "../../components/Tab";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import { endpoints } from "../../api/endPoints";
import { Link } from "react-router-dom";
import AvatarCard from "../../components/AvatarCard";
import DateTime from "../../lib/DateTime";
import MoreDropdown from "../../components/authentication/moreDropdown";
import DeviceInfoStatus from "../../helpers/DeviceInfo";
import { useDispatch } from "react-redux";
import DeviceInfoService from "../../services/DeviceInfoService";
import { fetchList } from "../../actions/table";


const   DeviceList = (props) => {

 const Dispatch = useDispatch()

  const statusOption = [
    {
      value: DeviceInfoStatus.PENDING,
      label: DeviceInfoStatus.PENDING_TEXT,
    },
    {
      value: DeviceInfoStatus.APPROVED,
      label: DeviceInfoStatus.APPROVED_TEXT,
    },
    {
      value: DeviceInfoStatus.BLOCKED,
      label: DeviceInfoStatus.BLOCKED_TEXT,
    }
  ]
  const updateStatus = async (id, status, params) => {
    Dispatch(await DeviceInfoService.statusUpdate(id, status, (res) => {
      if (res) {
        console.log("res-------------=",res);
        Dispatch(
          fetchList("deviceInfo",`${endpoints().userDeviceInfo}/search`, 1, 25, {})
        );
      }
    }))
  }

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

  return (
  <>    
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
                      onClick={ () => {
                           updateStatus(
                            row.device_info_id,
                            DeviceInfoStatus.PENDING,
                            { pagination: true }
                          )
                      }}
                    >
                      Pending
                    </DropdownItem>
                    <DropdownItem
                      onClick={ () => {
                           updateStatus(
                            row.device_info_id,
                            DeviceInfoStatus.APPROVED,
                            { pagination: true }
                          )
                      }}
                    >
                      Approved
                    </DropdownItem>
                    <DropdownItem
                      onClick={async () => {
                        Dispatch(
                          await updateStatus(
                            row.device_info_id,
                            DeviceInfoStatus.BLOCKED,
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

  
    </>
  )

};
export default DeviceList;
