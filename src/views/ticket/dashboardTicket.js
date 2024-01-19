import React from "react";
import PageTitle from "../../components/PageTitle";
import { endpoints } from "../../api/endPoints";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import DateTime from "../../lib/DateTime";
import Url, { UpdateUrl } from "../../lib/Url";
import AvatarCard from "../../components/AvatarCard";
import  Cookies  from "../../lib/Helper";
import Cookie from "../../helpers/Cookie";

const DashboardTicket = (props) => {

const projectId = Cookies.get(Cookie?.PROJECT_ID)

  return (
    <>
      <PageTitle
        label="Tickets"

      />
      <div className="mt-4">
        <ReduxTable
          newTableHeading
          disableHeader
          id="ticket"
          apiURL={`${endpoints().ticketAPI}/search`}
          paramsToUrl={true}
          history={props.history}

          params={{
           projectId:Url.GetParam("projectId")?Url.GetParam("projectId"):projectId!== "null"?projectId:"",
           startDate: DateTime.getToday(),
           endDate:DateTime.getToday(),
          }
          }
          message="You can start by clicking on Add New"
          icon={<FontAwesomeIcon icon={faTasks} />}
        >
          <ReduxColumn
            className="text-center text-decoration-none"
            field="id"
            sortBy="id"
            isClickable="true"
            width="50px"
            minWidth="50px"
            type="link"
            maxWidth="50px"
            renderField={(row) => (
              <Link to={`/ticket/details/${row.id}?projectId=${row.projectId}`}>{row.id}</Link>
            )}
          >
            Ticket#
          </ReduxColumn>
          <ReduxColumn
            className="text-wrap text-decoration-none"
            field="summary"
            sortBy="summary"
         
            isClickable="true"
            width="250px"
            minWidth="250px"
            maxWidth="250px"
          >
            Summary
          </ReduxColumn>
          <ReduxColumn
            className="text-center display-flex"
            field="assignee_name"
            sortBy="name"
            width="150px"
            renderField={(row) => (
              <AvatarCard
                id="avatar" firstName={row.firstName} lastName={row.lastName}
              />

            )}
          >
            Assignee
          </ReduxColumn>
          <ReduxColumn
            field="eta"
            sortBy="eta"
            width="100px"
            className="text-center"
            renderField={(row) => (
              <span>{DateTime.getDateTimeByUserProfileTimezone(row.eta)}</span>
            )}
          >
            ETA
          </ReduxColumn>
          <ReduxColumn
            field="statusName"
            sortBy="status"
            width="100px"
            className="text-center"
          >
            Status
          </ReduxColumn>
          <ReduxColumn field="createdAt" sortBy="createdAt" className="text-center" width="150px"
            renderField={(row) => (
              <span>{DateTime.getDateTimeByUserProfileTimezone(row.createdAt)}</span>
            )}>
            Created At
          </ReduxColumn>
        </ReduxTable>
      </div>
    </>
  );
};

export default DashboardTicket;
