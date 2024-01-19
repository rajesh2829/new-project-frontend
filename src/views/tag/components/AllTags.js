import React from "react";
import { useDispatch } from "react-redux";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import { endpoints } from "../../../api/endPoints";

// Action
import * as tagStatus from "../../../helpers/ProductTag";
import { Link } from "react-router-dom";
import "../../../scss/_custom.scss";
import "../../../components/reduxTable/styles.scss";
import { sortByOption } from "../../../helpers/SortByOption";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

const AllTags = (props) => {
  const { history } = props;

  const dispatch = useDispatch();

  const statusOptions = [
    {
      value: tagStatus.TAG_STATUS_ACTIVE,
      label: tagStatus.TAG_STATUS_ACTIVE,
    },
    {
      value: tagStatus.INACTIVE,
      label: tagStatus.INACTIVE,
    },
    {
      value: "",
      label: tagStatus.ALL_TAG_TAB,
    },
  ];

  const params = {
    section: tagStatus.ALL_TAG_TAB,
  };

  return (
    <div>
      <ReduxTable
        id="allTags"
        showHeader
        searchPlaceholder="Search"
        apiURL={`${endpoints().tagApi}/search`}
        newTableHeading
        icon={<FontAwesomeIcon icon={faTag} />}
        message="You can start by clicking Add New"
        statusOptions={statusOptions}
        sortByOptions={sortByOption}
        showStatusOptions={true}
        params={params}
        paramsToUrl={true}
        onRowClick={(row) => {
          history.push(`/tags/detail/${row.id}`);
        }}
        history={props.history}
      >
        <ReduxColumn
          field="name"
          type="link"
          sortBy="name"
          width="160px"
          minWidth="160px"
          maxWidth="160px"
          isClickable="true"
          renderField={(row) => (
            <Link to={`/tags/detail/${row.id}`}>{row.name}</Link>
          )}
        >
          Name
        </ReduxColumn>
        <ReduxColumn
          field="type"
          sortBy="type"
          className="column-type"
          width="150px"
          minWidth="150px"
          maxWidth="150px"
        >
          Type
        </ReduxColumn>
        <ReduxColumn
          field="status"
          sortBy="status"
          width="130px"
          minWidth="130px"
          maxWidth="130px"
          className="column-status"
          renderField={(row) => (
            <div
              className={`status-input text-center rounded text-white fw-600 custom-font-size text-uppercase ${row.status && row.status === tagStatus.TAG_STATUS_ACTIVE
                ? "bg-success"
                : row.status === tagStatus.INACTIVE
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
      </ReduxTable>
    </div>
  );
};
export default AllTags;
