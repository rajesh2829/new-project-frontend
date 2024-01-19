import { useState } from "react";
import { useDispatch } from "react-redux";
import { Projects } from "../../../helpers/Project";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import { endpoints } from "../../../api/endPoints";
import Url from "../../../lib/Url";
import { Link } from "react-router-dom";

const Tab = {
    GENERAL: "General",
    TICKET_TYPE: "Ticket Type"
};

const TicketType = (props) => {
    const [activeTab, setActiveTab] = useState(Tab.GENERAL);


    let dispatch = useDispatch();
    const toggle = (tab) => {

        if (activeTab !== tab) {
            setActiveTab(tab);

        };

    };


    const Id = Url.GetParam("id")
    return (
        <div className="mt-4">
            <ReduxTable
                id="projectTicketType"
                showHeader
                searchPlaceholder="Search"
                apiURL={`${endpoints().projectTicketTypeAPI}/search`}
                projectId={props?.projectId ? props?.projectId : null}
                newTableHeading
                params={{
                    projectId: props?.projectId ? props?.projectId : null
                }}
                history={props.history}
                paramsToUrl={true}

            >
                <ReduxColumn
                    type="link"
                    isClickable="true"
                    field="name"
                    sortBy="name"
                    width="140px"
                    minWidth="140px"
                    maxWidth="140px"
                    renderField={(row) => (
                        <Link to={`/project/${row.project_id}/${row.id}?projectId=${Url.GetParam("projectId")}`}>{row.name}</Link>
                    )}
                >

                    Name
                </ReduxColumn>
                <ReduxColumn
                    isClickable="true"
                    field="sort"
                    sortBy="sort"
                    width="110px"
                    minWidth="110px"
                    maxWidth="110px"
                >
                    Sort
                </ReduxColumn>

                <ReduxColumn
                    field="status"
                    sortBy="status"
                    width="120px"
                    minWidth="120px"
                    maxWidth="120px"
                    renderField={(row) => (
                        <div
                            className={`status-input text-center rounded text-white fw-600 custom-font-size text-uppercase  my-3 mx-auto ${row.status && row.status == Projects.STATUS_ACTIVE
                                ? "bg-success"
                                : row.status == Projects.STATUS_INACTIVE
                                    ? "bg-secondary"
                                    : ""
                                }`}
                        >
                            <p>{row.status}</p>
                        </div>
                    )}
                >
                    Status
                </ReduxColumn>
                <ReduxColumn
                    width="70px"
                    maxWidth="70px"
                    minWidth="70px"
                    field="Action"
                    disableOnClick
                >
                    Action
                </ReduxColumn>
            </ReduxTable>
        </div>
    );
};

export default TicketType;
