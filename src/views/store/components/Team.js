import React, { useState } from "react";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";

// Components
import { DropdownItem } from "reactstrap";
import MoreDropdown from "../../../components/authentication/moreDropdown";
import AvatarCard from "../../../components/AvatarCard";
import { endpoints } from "../../../api/endPoints";
import DeleteModal from "../../../components/DeleteModal";
import { deleteTeam } from "../../../actions/storeList";
import { useDispatch } from "react-redux";
import Link from "../../../components/Link"

const Team = ({ storeId, history }) => {
  const [isDeleteModel, setIsDeleteModel] = useState(false);
  console.log(isDeleteModel);
  const [currentData, setCurrentData] = useState();
  const [Team, setTeam] = useState();

  const dispatch = useDispatch();
  let params = { storeId: storeId }

  const teamDelete = (id) => {
    dispatch(deleteTeam(id, params, storeId, "team"));
    setIsDeleteModel(false);
  };

  return (
    <><DeleteModal
      isOpen={isDeleteModel}
      toggle={() => {
        setIsDeleteModel(false);
      }}
      title="Team"
      id={currentData?.team}
      label={Team}
      deleteFunction={() => {
        teamDelete(currentData?.id);
      }} />
      <ReduxTable
        id="team"
        disableHeader
        paramsToUrl={true}
        apiURL={`${endpoints().storeUserAPI}/search`}
        params={{
          location: storeId,
        }}
        history={history}
        newTableHeading
        sortByDropdown
        searchPlaceholder="Search"
      >
        <ReduxColumn
          field="userName"
          width="140px"
          sortBy="name"
          minWidth="140px"
          maxWidth="140px"
          renderField={(row) => (
            <div className="d-flex">
              <Link url={`/user/${row.userId}`}
                text={(<AvatarCard id="avatar"
                  firstName={row.userName}
                  lastName={row.lastName}
                  mediaUrl={row.media_url}
                />)}


              />

            </div>)}
        >User
        </ReduxColumn>
        <ReduxColumn
          field="shiftName"
          width="110px"
          minWidth="110px"
          maxWidth="110px">
          Shift
        </ReduxColumn>
        <ReduxColumn
          field="Action"
          width="110px"
          maxWidth="110px"
          minWidth="120px"
          className="text-center"
          disableOnClick
          renderField={(row) => (
            <div className="action-group-dropdown">
              <MoreDropdown>
                <DropdownItem
                  className=" text-danger"
                  onClick={() => {
                    setIsDeleteModel(true);
                    setCurrentData(row);
                    setTeam(row?.userName);
                  }}
                >
                  Remove
                </DropdownItem>
              </MoreDropdown>
            </div>
          )}
        >
          Action
        </ReduxColumn>
      </ReduxTable></>
  );
};

export default Team;
