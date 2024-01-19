import React from "react";
import { useDispatch } from "react-redux";
import { DropdownItem } from "reactstrap";
import MoreDropdown from "../../../components/authentication/moreDropdown";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import { endpoints } from "../../../api/endPoints";

// Action
import { updateTagStatus } from "../../../actions/storeProductTag";
import { Link } from "react-router-dom";

import "../../../scss/_custom.scss";
import { sortByOption } from "../../../helpers/SortByOption";
import { Tab } from "../../../helpers/ProductTag";
import { faTag } from "@fortawesome/free-solid-svg-icons";


const ActiveTag = (props) => {
  const { history } = props;

  const dispatch = useDispatch();

  const params = {
    status: Tab.ACTIVE_TAG_TAB,
    section: Tab.ACTIVE_TAG_TAB,
  };

  return (
    <div>
      <ReduxTable
        id="activeTags"
        showHeader
        searchPlaceholder="Search"
        apiURL={`${endpoints().tagApi}/search`}
        newTableHeading
        icon={<FontAwesomeIcon icon={faTag} />}
        message="You can start by clicking Add New"
        sortByOptions={sortByOption}
        params={params}
        paramsToUrl={true}
        onRowClick={(row) => {
          history.push(`/tags/detail/${row.id}`);
        }}
        history={history}
      >
        <ReduxColumn
          field="name"
          type="link"
          sortBy="name"
          width="300px"
          isClickable="true"
          renderField={(row) => (
            <Link to={`/tags/detail/${row.id}`}>
              {row.name}
            </Link>
          )}
        >
          Name
        </ReduxColumn>
        <ReduxColumn field="type" sortBy="tag_type" width="300px">
          Type
        </ReduxColumn>
        <ReduxColumn
          field="status"
          sortBy="status"
          renderField={(row) => (
            <div
              className={`status-input text-center rounded text-white fw-600 custom-font-size text-uppercase ${row.status && row.status === tabConstant.TAG_STATUS_ACTIVE
                  ? "bg-success"
                  : row.status === tabConstant.INACTIVE
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
          field="Action"
          width={"70px"}
          disableOnClick
          renderField={(row) => (
            <div className="text-center action-group-dropdown">
              <MoreDropdown>
                {row.status == tabConstant.INACTIVE ? (
                  <DropdownItem
                    onClick={() => {
                      dispatch(
                        updateTagStatus(
                          row.id,
                          tabConstant.TAG_STATUS_ACTIVE
                        )
                      );
                    }}
                  >
                    Make as Active
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    onClick={() => {
                      dispatch(
                        updateTagStatus(
                          row.id,
                          tabConstant.INACTIVE
                        )
                      );
                    }}
                  >
                    Make as InActive
                  </DropdownItem>
                )}
              </MoreDropdown>
            </div>
          )}
        >
          Action
        </ReduxColumn>
      </ReduxTable>
    </div>
  );
};
export default ActiveTag;
