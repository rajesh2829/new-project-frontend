import React from "react";
import Avatar from "./Avatar";
import DateTime from "../lib/DateTime";
import CountBadge from "./CountBadge";

const MessageCard = (props) => {
  let { first_name, last_name, url, last_message_time, recent_last_message, read_at } =
    props;

  return (
    <div className="d-flex align-items-center">
      <Avatar
        id="avatar"
        url={url}
        firstName={first_name}
        lastName={last_name}
      />
      <div className="ml-2 flex-grow-1">
        <div className="font-weight-bold">
          {first_name + " " + last_name}
          <CountBadge count={read_at} badgeColor="red" />
        </div>
        <div
          className="last-message-time"
          style={{ fontSize: "10px", cursor: "pointer" }}>
          {last_message_time &&
            DateTime.getDateTimeByUserProfileTimezone(last_message_time)}
        </div>
        <div
          className="ellipsis text-truncate text-muted"
          style={{ maxWidth: "50%" }}>
          {recent_last_message}
        </div>


      </div>
    </div>
  );
};

export default MessageCard;
