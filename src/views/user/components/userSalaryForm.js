import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BreadCrumb from "../../../components/Breadcrumb";
import CancelButton from "../../../components/CancelButton";
import Currency from "../../../components/Currency";
import DateSelector from "../../../components/Date";
import Form from "../../../components/Form";
import SaveButton from "../../../components/SaveButton";
import Select from "../../../components/Select";
import UserSelect from "../../../components/UserSelect";
import { Salary } from "../../../helpers/Salary";
import SalaryService from "../../../services/SalaryService";
import DateTime from "../../../lib/DateTime";
import UserSalaryService from "../../../services/UserSalaryService";
import Url from "../../../lib/Url";
import PageTitle from "../../../components/PageTitle";
import CompanyUserService from "../../../services/UserService";

function UserFormList(props) {
  const [options, setOptions] = useState();
  const history = useHistory();
  const [userList, setUserList] = useState([]);
  const [startDateValue, setStartDateValue] = useState();
  const [endDateValue, setEndDateValue] = useState();

  const [userDetail, setuserDetail] = useState();

  useEffect(() => {
    getNumberList();
  }, []);

  let id = props.match.params.id;

  let user_id = Url.GetParam("user_id");

  useEffect(() => {
    userDetailList();
  }, []);

  useEffect(() => {
    if (userDetail && userDetail.user_id)
      getUserList();
  }, [userDetail]);

  const getUserList = async () => {
    let userList = await CompanyUserService.getOption();
    setUserList(userList);
  }

  const breadcrumbList = [
    { label: "Home", link: "/people/dashboard" },
    {
      label: "User",
      link: `/user/${userDetail !== undefined ? userDetail?.user_id : Url.GetParam("user_id")
        }?tab=Salary`,
    },
    {
      label: "Salary Detail",
      link: "",
    },
  ];

  const userDetailList = async () => {
    let response = await UserSalaryService.get(id);
    let data = response.data;
    setuserDetail(data);
  };

  const handleStartDate = async (startDate) => {
    const value = startDate ? DateTime.formatDate(startDate) : "";
    setStartDateValue(value);
  };

  const handleEndDate = async (endDate) => {
    const value = endDate ? DateTime.formatDate(endDate) : "";
    setEndDateValue(value);
  };

  const getNumberList = () => {
    let NumberList = new Array();
    for (let i = 1; i <= 100; i++) {
      NumberList.push({
        label: i,
        value: i,
      });
    }
    setOptions(NumberList);
  };

  const onStatusChange = (value) => {
    if (value) {
      handleSubmits(value);
    }
  };

  const handleSubmits = async (values) => {
    if (user_id) {
      const data = new FormData();
      data.append("user", values?.user.id ? values?.user.id : "");

      data.append("start_date", values?.start_date ? values?.start_date : "");
      data.append("end_date", values?.end_date ? values?.end_date : "");
      data.append(
        "house_rent_allowance",
        values?.house_rent_allowance ? values?.house_rent_allowance : ""
      );
      data.append(
        "conveyance_allowance",
        values?.conveyance_allowance ? values?.conveyance_allowance : ""
      );

      data.append(
        "medical_reimbursement",
        values?.medical_reimbursement ? values?.medical_reimbursement : ""
      );

      data.append(
        "telephone_reimbursement",
        values?.telephone_reimbursement ? values?.telephone_reimbursement : ""
      );

      data.append(
        "leave_travel_allowance",
        values?.leave_travel_allowance ? values?.leave_travel_allowance : ""
      );

      data.append(
        "special_allowance",
        values?.special_allowance ? values?.special_allowance : ""
      );

      data.append(
        "medical_insurance_premium",
        values?.medical_insurance_premium
          ? values?.medical_insurance_premium
          : ""
      );

      data.append(
        "provident_fund_users",
        values?.provident_fund_users ? values?.provident_fund_users : ""
      );

      data.append(
        "provident_fund_user",
        values?.provident_fund_user ? values?.provident_fund_user : ""
      );

      data.append(
        "user_contribution",
        values?.user_contribution ? values?.user_contribution : ""
      );

      data.append("gratuity", values?.gratuity ? values?.gratuity : "");

      data.append(
        "annual_bonus",
        values?.annual_bonus ? values?.annual_bonus : ""
      );

      data.append("ctc", values?.ctc ? values?.ctc : "");

      await UserSalaryService.create(data, user_id, history);
    } else {
      const data = new FormData();
      data.append("user", values?.user.id ? values?.user.id : "");

      data.append("start_date", values?.start_date ? values?.start_date : "");
      data.append("end_date", values?.end_date ? values?.end_date : "");
      data.append(
        "house_rent_allowance",
        values?.house_rent_allowance ? values?.house_rent_allowance : ""
      );
      data.append(
        "conveyance_allowance",
        values?.conveyance_allowance ? values?.conveyance_allowance : ""
      );

      data.append(
        "medical_reimbursement",
        values?.medical_reimbursement ? values?.medical_reimbursement : ""
      );

      data.append(
        "telephone_reimbursement",
        values?.telephone_reimbursement ? values?.telephone_reimbursement : ""
      );

      data.append(
        "leave_travel_allowance",
        values?.leave_travel_allowance ? values?.leave_travel_allowance : ""
      );

      data.append(
        "special_allowance",
        values?.special_allowance ? values?.special_allowance : ""
      );

      data.append(
        "medical_insurance_premium",
        values?.medical_insurance_premium
          ? values?.medical_insurance_premium
          : ""
      );

      data.append(
        "provident_fund_users",
        values?.provident_fund_users ? values?.provident_fund_users : ""
      );

      data.append(
        "provident_fund_user",
        values?.provident_fund_user ? values?.provident_fund_user : ""
      );

      data.append(
        "user_contribution",
        values?.user_contribution ? values?.user_contribution : ""
      );

      data.append("gratuity", values?.gratuity ? values?.gratuity : "");

      data.append(
        "annual_bonus",
        values?.annual_bonus ? values?.annual_bonus : ""
      );

      data.append("ctc", values?.ctc ? values?.ctc : "");

      await UserSalaryService.update(id, data);
    }
  };

  const initialValues = {
    user:
      userDetail !== undefined
        ? userList && userList.find((data) => data.id == userDetail?.user_id)
        : userList &&
        userList.find((data) => data.id == Url.GetParam("user_id")),
    start_date: userDetail?.start_date ? userDetail?.start_date : "",
    end_date: userDetail?.end_date ? userDetail?.end_date : "",
    house_rent_allowance: userDetail?.house_rent_allowance
      ? userDetail?.house_rent_allowance
      : "",
    conveyance_allowance: userDetail?.conveyance_allowance
      ? userDetail?.conveyance_allowance
      : "",
    medical_reimbursement: userDetail?.medical_reimbursement
      ? userDetail?.medical_reimbursement
      : "",
    telephone_reimbursement: userDetail?.telephone_reimbursement
      ? userDetail?.telephone_reimbursement
      : "",
    leave_travel_allowance: userDetail?.leave_travel_allowance
      ? userDetail?.leave_travel_allowance
      : "",
    special_allowance: userDetail?.special_allowance
      ? userDetail?.special_allowance
      : "",
    medical_insurance_premium: userDetail?.medical_insurance_premium
      ? userDetail?.medical_insurance_premium
      : "",
    provident_fund_users: userDetail?.provident_fund_users
      ? userDetail?.provident_fund_users
      : "",
    provident_fund_user: userDetail?.provident_fund_user
      ? userDetail?.provident_fund_user
      : "",
    user_contribution: userDetail?.user_contribution
      ? userDetail?.user_contribution
      : "",
    gratuity: userDetail?.gratuity ? userDetail?.gratuity : "",
    annual_bonus: userDetail?.annual_bonus ? userDetail?.annual_bonus : "",
    ctc: userDetail?.ctc ? userDetail?.ctc : "",
  };

  return (
    <>
      <BreadCrumb list={breadcrumbList} />

      <div className="d-flex justify-content-between">
        <div className="d-flex ">
          <PageTitle
            label={user_id ? "User Salary Add" : "User Salary details"}
          />
        </div>
      </div>
      <div className="card-body card">
        <Form
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmits}
        >
          <div className="row">
            <div className="col">
              <UserSelect label="User" />
            </div>
            <div className="col">
              <DateSelector
                selected={startDateValue}
                name="start_date"
                label="Start Date"
              />
            </div>
            <div className="col">
              <DateSelector
                selected={endDateValue}
                name="end_date"
                label="End Date"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Currency
                name="house_rent_allowance"
                label="House Rent Allowance"
                options={options}
              />

              <Currency
                name="conveyance_allowance"
                label="Conveyance Allowance"
                options={options}
              />
              <Currency
                name="medical_reimbursement"
                label="Medical Reimbursement"
                options={options}
              />
              <Currency
                name="telephone_reimbursement"
                label="Telephone Reimbursement"
                options={options}
              />
              <Currency
                name="leave_travel_allowance"
                label="Leave Travel Allowance"
                options={options}
              />

              <Currency
                name="special_allowance"
                label="Special Allowance"
                options={options}
              />
            </div>
            <div className="col">
              <Currency
                name="medical_insurance_premium"
                label="Medical Insurance Premium"
                options={options}
              />
              <Currency
                name="provident_fund_users"
                label="Provident Fund Users"
              />

              <Currency
                name="provident_fund_user"
                label="Provident Fund User"
                options={options}
              />
              <Currency
                name="user_contribution"
                label="User Contribution"
                options={options}
              />

              <Currency name="gratuity" label="Gratuity" />

              <Currency
                name="annual_bonus"
                label="Annual Bonus"
                options={options}
              />
            </div>
          </div>

          <Currency name="ctc" label="CTC" />

          <SaveButton />

          <CancelButton
            onClick={() =>
              history.push(
                `/user/${userDetail !== undefined
                  ? userDetail?.user_id
                  : Url.GetParam("user_id")
                }?tab=Salary`
              )
            }
          />
        </Form>
      </div>
    </>
  );
}

export default UserFormList;
