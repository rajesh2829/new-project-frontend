import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Projects } from "../../../helpers/Project";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import { endpoints } from "../../../api/endPoints";
import Url from "../../../lib/Url";
import { Link } from "react-router-dom";
import TicketTypeDetail from "./ticketTypeDetail";
import { DropdownItem, Nav, NavItem, NavLink } from "reactstrap";
import classNames from "classnames";
import UserCard from "../../../components/UserCard";
import MoreDropdown from "../../../components/authentication/moreDropdown";
import DeleteModal from "../../../components/DeleteModal";
import ProjectUserService from "../../../services/ProjectUserService";

const Tab = {
  GENERAL: "General",
  TICKET_TYPE: "Ticket Type"
};
const ProjectUsers = (props) => {

  const [currentData, setCurrentData] = useState("");
  const [isDeleteModel, setIsDeleteModel] = useState("");

  const dispatch = useDispatch();

  const sortByOption = [

    {
      value: 'user_id:ASC',
      label: 'Name',
    },
    {
      value: 'id:DESC',
      label: 'Most Recent',
    },
  ];





  const sample = async (id) => {
    dispatch(
      await ProjectUserService.deleteProjectUser(
        currentData?.id,
        {
          sort: "id",
          sortDir: "DESC",
          search: Url.GetParam("search") || "",
          pageSize: Url.GetParam("pageSize") || "",
        },
      )
    );

    // setIsDeleteModel(false);
  };

  return (

    <div>
      <DeleteModal
        isOpen={isDeleteModel}
        toggle={() => {
          setIsDeleteModel(false);
        }}
        title=" Project User"
        label={currentData?.userName}

        deleteFunction={sample}
      />
      <div className="mt-4">
        <ReduxTable
          id="projectUser"
          showHeader
          searchPlaceholder="Search"
          apiURL={`${endpoints().ProjectUserApi}/search`}
          newTableHeading
          params={{
            projectId: Url.GetParam("projectId"),
            sort: Url.GetParam("sort"),
            sortDir: Url.GetParam("sortDir")
          }}
          history={props.history}
          paramsToUrl={true}
          sortByOptions={sortByOption}
        >
          <ReduxColumn
            field='userName'
            sortBy='user_id'
            renderField={(row) => (
              <>
                <UserCard
                  customSize={parseInt(50, 10)}
                  firstName={row?.userFirstName}
                  lastName={row?.userLastName}
                  url={row?.userMediaUrl}
                />
              </>
            )}
          >
            User
          </ReduxColumn>
          <ReduxColumn
            field="status"
            sortBy="status"
            width="120px"
            minWidth="120px"
            maxWidth="120px"
            renderField={(row) => (
              <div
                className={`status-input text-center rounded text-white fw-600 custom-font-size text-uppercase  my-3 mx-auto ${row.status && row.status == Projects.STATUS_ACTIVE
                  ? "bg-success"
                  : row.status == Projects.STATUS_INACTIVE
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
            renderField={(row) => (
              <div className="action-group-dropdown text-center">
                <MoreDropdown>

                  <DropdownItem
                    className=" text-danger  cursor-pointer"
                    onClick={() => {
                      setCurrentData(row);
                      setIsDeleteModel(true);
                    }}
                  >
                    Delete
                  </DropdownItem>
                </MoreDropdown>
              </div>
            )}
          >
            Action
          </ReduxColumn>
        </ReduxTable>
      </div>
    </div>
  );
};

export default ProjectUsers;
