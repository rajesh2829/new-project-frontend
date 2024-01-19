import { faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { endpoints } from "../../../api/endPoints";
import UserCard from "../../../components/UserCard";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import ObjectName from "../../../helpers/ObjectName";
import { Group } from "../../../helpers/Status";
import DateTime from "../../../lib/DateTime";

const TicketSummaryList = (props) => {
  let { history } = props;

  let pendingCountGroup = [
    Group.DRAFT,
    Group.NEW,
    Group.REVIEW,
    Group.PENDING,
    Group.APPROVED,
    Group.CANCELLED,
    Group.INPROGRESS,
    Group.REOPEN,
    Group.HOLD,
  ];

  return (
    <>
      <ReduxTable
        id="summary"
        newTableHeading
        disableHeader
        apiURL={`${endpoints().ticketAPI}/summery`}
        paramsToUrl={true}
        history={history}
        message="You can start by clicking on Add New"
        icon={<FontAwesomeIcon icon={faTasks} />}
      >
        <ReduxColumn
          field="assignee_name"
          sortBy="name"
          renderField={(row) => (
            <>
              <UserCard
                firstName={row.firstName}
                url={row.media_url}
                lastName={row.lastName}
              />
            </>
          )}
        >
          User
        </ReduxColumn>
        <ReduxColumn
          field="todays"
          sortBy="todays"
          className="text-center"
          renderField={(row) => (
            <Link
              to={`/ticketSearch?objectName=${ObjectName.TICKET
                }&startDate=${DateTime.getToday()}&endDate=${DateTime.getToday()}&user=${row.user_id
                }`}
            >
              {row.todays && `${row.todays}(${row?.todayStoryPoint})`}
            </Link>
          )}
        >
          Todays
        </ReduxColumn>
        <ReduxColumn
          field="pending"
          sortBy="pending"
          className="text-center"
          renderField={(row) => (
            <Link
              to={`/ticketSearch?objectName=${ObjectName.TICKET
                }&endDate=${DateTime.subtract(1)}&user=${row.user_id
                }&group=${pendingCountGroup.join(",")}`}
            >
              {row.pending && `${row.pending}(${row?.pendingStoryPoint})`}
            </Link>
          )}
        >
          Pending
        </ReduxColumn>
        <ReduxColumn
          field="new"
          sortBy="new"
          className="text-center"
          renderField={(row) => (
            (
              <Link
                to={`/ticketSearch?objectName=${ObjectName.TICKET}&user=${row.user_id}&group=${Group.NEW}`}
              >
                {row.new && `${row.new}(${row?.newStoryPoint})`}
              </Link>
            )
          )}
        >
          New
        </ReduxColumn>
        <ReduxColumn
          field="reopen"
          className="text-center"
          renderField={(row) => (
            (
              <Link
                to={`/ticketSearch?objectName=${ObjectName.TICKET}&user=${row.user_id}&group=${Group.REOPEN}`}
              >
                {row.reopen && `${row.reopen}(${row?.reopenStoryPoint})`}
              </Link>
            )
          )}
        >
          Reopen
        </ReduxColumn>
        <ReduxColumn
          field="hold"
          className="text-center"
          renderField={(row) => (
            (
              <Link
                to={`/ticketSearch?objectName=${ObjectName.TICKET}&user=${row.user_id}&group=${Group.HOLD}`}
              >
                {row.hold && `${row.hold}(${row?.holdStoryPoint})`}
              </Link>
            )
          )}
        >
          Hold
        </ReduxColumn>
        <ReduxColumn
          field="inprogress"
          sortBy="inprogress"
          className="text-center"
          renderField={(row) => (
            (
              <Link
                to={`/ticketSearch?objectName=${ObjectName.TICKET}&user=${row.user_id}&group=${Group.INPROGRESS}`}
              >
                {row.inprogress && `${row.inprogress}(${row?.inprogressStoryPoint})`}
              </Link>
            )
          )}
        >
          InProgress
        </ReduxColumn>
        <ReduxColumn
          field="review"
          sortBy="review"
          className="text-center"
          renderField={(row) => (
            (
              <Link
                to={`/ticketSearch?objectName=${ObjectName.TICKET}&user=${row.user_id}&group=${Group.REVIEW}`}
              >
                {row.review && `${row.review}(${row?.reviewStoryPoint})`}
              </Link>
            )
          )}
        >
          Review
        </ReduxColumn>
      </ReduxTable>
    </>
  );
};
export default TicketSummaryList;
