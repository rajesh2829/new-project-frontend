import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { endpoints } from "../../../api/endPoints";
import MessageCard from "../../../components/MessageCard";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";


const SideBarMobile = (props) => {
  let { userList, toggle, handleClick } = props;

  return (
    <Fragment>
      <ReduxTable
        id="navBar"
        disableHeader
        showHeader={false}
        className="w-100"
        apiURL={`${endpoints().messageAPI}/search`}
      >
        <ReduxColumn
          field="first_name"
          renderField={(row) => (
            (
              <>
                <Link onClick={() => handleClick(row.id)}>
                  <MessageCard
                    first_name={row.first_name}
                    last_name={row.last_name}
                    url={row.media}
                    last_message_time={row.recent_message_timestamp}
                    recent_last_message={row.recent_last_message}

                  />
                </Link>
              </>
            )
          )}
        >
          Users
        </ReduxColumn>
      </ReduxTable>
    </Fragment>

  );
};

export default SideBarMobile;
