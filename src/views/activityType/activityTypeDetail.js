import React from "react";
//Pages
import General from "./components/general";
const Tab = {
  GENERAL: "General",
  USERS: "Users",
  PERMISSION: "Permission",
};

const ActivityTypeDetail = (props) => {
  const { history, match } = props;
  return (
    <>
      <General match={match} history={history} />
    </>
  );
};

export default ActivityTypeDetail;
