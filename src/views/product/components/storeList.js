import React from "react";
import { endpoints } from "../../../api/endPoints";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import { STATUS_ACTIVE_TEXT } from "../../../helpers/Store";

const storeList = (props) => {

  const { id, name, onBulkSelect } = props;

  return (
    <div className="mt-2">
      <ReduxTable
        id="activeStore"
        name={name}
        searchPlaceholder="Search"
        bulkSelect
        newTableHeading={false}
        onBulkSelect={onBulkSelect}
        apiURL={`${endpoints().locationAPI}/search`}
        params={{
          status: STATUS_ACTIVE_TEXT,
          excludeIds: [props.excludeIds],
          pagination: true
        }}
      >
        <ReduxColumn field="name">Location</ReduxColumn>
      </ReduxTable>
    </div>
  );
};
export default storeList;