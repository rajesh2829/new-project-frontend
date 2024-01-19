import React from "react";

// Components
import GeneralDetailsTab from "./generalDetailsTab";

const BillDetails = (props) => {
 return (
      <GeneralDetailsTab history={props.history} match={props.match} />
  );
};

export default BillDetails;
