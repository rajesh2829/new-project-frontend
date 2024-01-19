import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DropdownItem } from "reactstrap";
import { fetchList } from "../../../actions/table";
import { endpoints } from "../../../api/endPoints";
import MoreDropdown from "../../../components/authentication/moreDropdown";
import DeleteModal from "../../../components/DeleteModal";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import UserSalaryService from "../../../services/UserSalaryService";

const UserSalary = (props) => {
  const { history, user } = props;
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUserSalary, setSelectedUserSalary] = useState();

  const dispatch = useDispatch();

  const closeDeleteModal = () => {
    //close modal
    setOpenDeleteModal(!openDeleteModal);
  };

  const handleUserSalaryDelete = async () => {
    dispatch(await UserSalaryService.delete(selectedUserSalary?.id));
    dispatch(
      fetchList(
        "userSalaryList",
        `${endpoints().UsersalaryAPI}/search`,
        1,
        25,
        {
          user_id: user,
        }
      )
    );
  };

  const sortOptions = [
    {
      value: "id:DESC",
      label: "Most Recent",
    },
    {
      value: "start_date:ASC",
      label: "Date",
    },
  ];

  return (
    <>
      <DeleteModal
        isOpen={openDeleteModal}
        label={selectedUserSalary?.id}
        toggle={closeDeleteModal}
        title="Delete User Salary"
        deleteFunction={handleUserSalaryDelete}
        onSelectItem={setSelectedUserSalary}
      />
      <ReduxTable
        id="userSalaryList"
        newTableHeading
        searchPlaceholder="Search"
        sortByDropdown
        apiURL={`${endpoints().UsersalaryAPI}/search`}
        paramsToUrl={true}
        params={{
          user_id: user,
        }}
        history={history}
        sortByOptions={sortOptions}
        message="You can start by clicking on Add New"
      >
        <ReduxColumn
          field="id"
          sortBy="salary_number"
          renderField={(row) => (
            <Link to={`/user/salary/detail/${row.id}`}>{row.id}</Link>
          )}
        >
          Salary#
        </ReduxColumn>
        <ReduxColumn
          field="user"
          sortBy="user"
          renderField={(row) => <>{row.user}</>}
        >
          User
        </ReduxColumn>
        <ReduxColumn field="ctc" sortBy="ctc">
          CTC
        </ReduxColumn>
        <ReduxColumn field="house_rent_allowance" sortBy="house_rent_allowance">
          House Rent Allowance
        </ReduxColumn>
        <ReduxColumn field="conveyance_allowance" sortBy="conveyance_allowance">
          Conveyance Allowance
        </ReduxColumn>
        <ReduxColumn
          field="medical_reimbursement"
          sortBy="medical_reimbursement"
        >
          Medical Reimbursement
        </ReduxColumn>
        <ReduxColumn
          field="telephone_reimbursement"
          sortBy="telephone_reimbursement"
        >
          Telephone Reimbursement
        </ReduxColumn>
        <ReduxColumn
          field="leave_travel_allowance"
          sortBy="leave_travel_allowance"
        >
          Leave Travel Allowance
        </ReduxColumn>
        <ReduxColumn field="special_allowance" sortBy="special_allowance">
          Special Allowance
        </ReduxColumn>
        <ReduxColumn
          field="medical_insurance_premium"
          sortBy="medical_insurance_premium"
        >
          Medical Insurance Premium
        </ReduxColumn>
        <ReduxColumn field="provident_fund_users" sortBy="provident_fund_users">
          Provident Fund Users
        </ReduxColumn>
        <ReduxColumn field="provident_fund_user" sortBy="provident_fund_user">
          Provident Fund User
        </ReduxColumn>
        <ReduxColumn field="user_contribution" sortBy="user_contribution">
          User Contribution
        </ReduxColumn>
        <ReduxColumn field="gratuity" sortBy="gratuity">
          Gratuity
        </ReduxColumn>
        <ReduxColumn field="annual_bonus" sortBy="annual_bonus">
          Annual Bonus
        </ReduxColumn>
        <ReduxColumn field="start_date" sortBy="start_date">
          Start Date
        </ReduxColumn>
        <ReduxColumn field="end_date" sortBy="end_date">
          End Date
        </ReduxColumn>
        <ReduxColumn
          field="Action"
          disableOnClick
          width="70px"
          renderField={(row) => (
            <>
              <div className="d-flex justify-content-center align-items-center row">
                <div className="text-dark landing-group-dropdown">
                  <MoreDropdown>
                    <DropdownItem
                      className=" text-danger cursor-pointer"
                      onClick={() => {
                        setOpenDeleteModal(true);
                        setSelectedUserSalary(row);
                      }}
                    >
                      Delete
                    </DropdownItem>
                  </MoreDropdown>
                </div>
              </div>
            </>
          )}
        >
          Action
        </ReduxColumn>
      </ReduxTable>
    </>
  );
};

export default UserSalary;
