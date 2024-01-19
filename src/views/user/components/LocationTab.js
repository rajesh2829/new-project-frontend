import React from "react";
import { endpoints } from "../../../api/endPoints";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import DateTime from "../../../lib/DateTime";
import AvatarCard from "../../../components/AvatarCard";
import MoreDropdown from "../../../components/authentication/moreDropdown";
import { DropdownItem } from "reactstrap";

const LocationTab = (props) => {
    const openMap = (latitude, longitude) => {
        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        window.open(url, '_blank');
    };

    return (
        <>
            <ReduxTable
                id="userLocationList"
                newTableHeading
                searchPlaceholder="Search"
                sortByDropdown
                apiURL={`${endpoints().userLocationAPI}`}
                paramsToUrl={true}
                params={{
                    user_id: props && props.user_id
                }}
                history={props.history}
                message="You can start by clicking on Add New">
                <ReduxColumn
                    field="created_at"
                    sortBy="created_at"
                    className="text-center"
                    width="150px"
                    minWidth="150px"
                    maxWidth="150px"
                    renderField={(row) => (
                        <span>
                            {DateTime.getDateTimeByUserProfileTimezone(row.created_at)}
                        </span>
                    )}>
                    Date
                </ReduxColumn>
                <ReduxColumn
                    field="userName"
                    sortBy="user"
                    disableOnClick
                    width="150px"
                    minWidth="150px"
                    maxWidth="150px"
                    renderField={(row) => (
                        <div className="d-flex text-break">
                            <AvatarCard
                                id="avatar"
                                firstName={row.userName}
                                url={row.media_url}
                            />
                        </div>
                    )}>
                    User
                </ReduxColumn>
                <ReduxColumn field="latitude" sortBy="latitude" width="150px"
                    minWidth="150px"
                    maxWidth="150px"
                    className="text-center">
                    Latitude
                </ReduxColumn>
                <ReduxColumn
                    field="longitude"
                    sortBy="longitude"
                    width="150px"
                    minWidth="100px"
                    maxWidth="150px"
                    className="text-center">
                    Longitude
                </ReduxColumn>

                <ReduxColumn
                    field="Action"
                    disableOnClick
                    width="150px"
                    minWidth="150px"
                    maxWidth="150px"
                    renderField={(row) => (
                        <>
                            <div className="d-flex justify-content-center align-items-center row">
                                <div className="text-dark landing-group-dropdown">
                                    <MoreDropdown>
                                        <DropdownItem
                                            className=" text-primary cursor-pointer"
                                            onClick={() => {
                                                openMap(row.latitude, row.longitude)
                                            }}
                                        >
                                            View In Map
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
        </>
    );
};

export default LocationTab;
