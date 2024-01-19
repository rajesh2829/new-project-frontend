import React from 'react'
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DropdownItem } from "reactstrap";

import MoreDropdown from "../../../components/authentication/moreDropdown";
import AvatarCard from "../../../components/AvatarCard";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import { endpoints } from "../../../api/endPoints";
import { Brand } from "../../../helpers/Brand";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Url from "../../../lib/Url";
import BrandService from "../../../services/BrandService";

const brandListpage = (props) => {
  const { id, status, tab } = props
  const params = {
    tab: tab ? tab : "",
    status: status ? status : ""
  };

  const sortByOption = [
    {
      value: "name:ASC",
      label: "Name",
    },
    {
      value: "id:DESC",
      label: "Most Recent",
    },
  ];

  const dispatch = useDispatch();
  
  return (
    <>
      <ReduxTable
        id={id}
        showHeader
        searchPlaceholder="Search"
        apiURL={`${endpoints().brandAPI}/search`}
        newTableHeading
        icon={<FontAwesomeIcon icon={faStar} />}
        message="You can start by clicking add."
        sortByOptions={sortByOption}
        params={params}
        customStatus={{ status: status ? status : "" }}
        paramsToUrl={true}
        onRowClick={(row) => {
          history.push(`/brands/${row.id}`);
        }}
        history={props.history}
      >
        <ReduxColumn
          field="name"
          type="link"
          sortBy="name"
          width="550px"
          minwidth="90px"
          maxwidth="90px"
          isClickable="true"
          renderField={(row) => (
            <>
              <Link to={`/brands/${row.id}`}>
                <AvatarCard firstName={row.name} url={row.image} />
              </Link>
            </>
          )}
        >
          Brand Name
        </ReduxColumn>
        <ReduxColumn
          field="productCount"
          className="text-center"
          sortBy="productCount"
          width="550px"
          minwidth="90px"
          maxwidth="90px"
          isClickable="true"
        >
          Product Count
        </ReduxColumn>
        <ReduxColumn
          field="status"
          sortBy="status"
          width="240px"
          minwidth="240px"
          maxwidth="240px"
          className="brand-all"
          renderField={(row) => (
            <div
              className={`status-input text-center rounded text-white fw-600 custom-font-size text-uppercase mx-auto ${row.status && row.status === Brand.STATUS_ACTIVE_TEXT
                ? "bg-success"
                : row.status === Brand.STATUS_INACTIVE_TEXT
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
          field="Action"
          disableOnClick
          renderField={(row) => (
            <div className="col-4 text-center landing-group-dropdown">
              <MoreDropdown>
                {row.status !== Brand.STATUS_ACTIVE_TEXT ? (
                  <DropdownItem
                    // className={"text-danger"}
                    onClick={async () => {
                      dispatch(await BrandService.updateStatus(row.id, Brand.STATUS_ACTIVE_TEXT, {
                        sort: Url.GetParam("sort"),
                        sortDir: Url.GetParam("sortDir"),
                        search: Url.GetParam("search") || "",
                        AllPage: Url.GetParam("page") || props.AllCurrentPage,
                        AllPageSize: Url.GetParam("pageSize") || props.AllCurrentPageSize,
                      }));
                    }}
                  >
                    Make as Active
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    onClick={async () => {
                      dispatch(await BrandService.updateStatus(row.id, Brand.STATUS_INACTIVE_TEXT, {
                        sort: Url.GetParam("sort"),
                        sortDir: Url.GetParam("sortDir"),
                        search: Url.GetParam("search") || "",
                        AllPage: Url.GetParam("page") || props.AllCurrentPage,
                        AllPageSize: Url.GetParam("pageSize") || props.AllCurrentPageSize,
                      }));
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
    </>
  )
}

export default brandListpage