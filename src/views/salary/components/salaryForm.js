import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Currency from "../../../lib/Currency";
import Number from "../../../lib/Number";
import salaryService from "../../../services/SalaryService";
import FormList from "./form";
import Url, { UpdateUrl } from "../../../lib/Url";
import DateTime from "../../../lib/DateTime";
import { apiClient } from "../../../apiClient";
import { endpoints } from "../../../api/endPoints";
import { User } from "../../../helpers/User";
import Avatar from "../../../components/Avatar";
import Toast from "../../../components/Toast";
import { isBadRequest } from "../../../lib/Http";

function SalaryForm(props) {
  const { history } = props;
  const [param, setParam] = useState({
    user: Url.GetParam("user"),
    startDate: Url.GetParam("startDate"),
    endDate: Url.GetParam("endDate"),
    standardAllowance: Url.GetParam("standardAllowance"),
    bonus: Url.GetParam("bonus"),
    tds: Url.GetParam("tds"),
    medical_insurance: Url.GetParam("medical_insurance"),
    gratuity: Url.GetParam("gratuity"),
    provident_fund: Url.GetParam("provident_fund"),
    professional_tax: Url.GetParam("professional_tax"),
    other_deductions: Url.GetParam("other_deductions"),
  });

  const [userList, setUsersList] = useState("");
  const [endDateValue, setEndDateValue] = useState();
  const [startDateValue, setStartDateValue] = useState();
  const [userValue, setUserValue] = useState();
  const [standardAllowance, setStandardAllowance] = useState();
  const [bonusValue, setbonusChange] = useState();
  const [tdsValue, setTdsChange] = useState();
  const [medicalValue, setMedicalInsurance] = useState();
  const [grautityValue, setGrautityChange] = useState();
  const [pfValue, setPf] = useState();
  const [ptValue, setPt] = useState();
  const [otherDeductValue, setOtherDeduct] = useState();
  const [data, setData] = useState();
  const [selectedDate, setSelectedDate] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    getUserList();
  }, []);

  //Get User Details and list Start
  const getUserName = (media_url, firstName, lastName) => {
    return (
      <div className="d-flex">
        <Avatar
          id="avatar"
          firstName={firstName}
          lastName={lastName}
          url={media_url}
        />
        <div className="edit-profile-name m-2">
          {firstName} {lastName}
        </div>
      </div>
    );
  };

  const getUserList = async () => {
    let data;
    await apiClient
      .get(
        `${endpoints().userAPI}/search?status=${User.STATUS_ACTIVE_VALUE
        }`
      )
      .then((response) => {
        data = response.data.data;
        if (data && data.length > 0) {
          const userList = [];
          data.forEach((list) => {
            userList.push({
              value: list.first_name,
              id: list.id,
              label: getUserName(
                list.avatarUrl,
                list.first_name,
                list.last_name
              ),
            });
          });
          // Set the User List Options in State
          setUsersList(userList);
        }
      });
    return data;
  };

  //initialValues
  const initialValues = {
    user: userList ? userList.find((data) => data.id == userValue) : userValue,
    startDate: startDateValue ? startDateValue : Url.GetParam("startDate"),
    endDate: endDateValue ? endDateValue : Url.GetParam("endDate"),
    working_days: {
      label: data?.totalWorkingDays ? data?.totalWorkingDays : "",
      value: data?.totalWorkingDays ? data?.totalWorkingDays : "",
    },
    worked_days: {
      label: data?.worked_days ? data?.worked_days : "",
      value: data?.worked_days ? data?.worked_days : "",
    },
    additional_days: {
      label: data?.additional ? data?.additional : "",
      value: data?.additional ? data?.additional : "",
    },
    absent: {
      label: data?.absent ? data?.absent : "",
      value: data?.absent ? data?.absent : "",
    },
    standard_allowance: standardAllowance ? standardAllowance : "",
    special_allowance: Currency.Get(data?.specialAllowance),
    medical_insurance: medicalValue ? medicalValue : "",
    gratuity: grautityValue ? grautityValue : "",
    professional_tax: ptValue ? ptValue : "",
    net_salary: Currency.Get(data?.net_salary),
    monthly_salary: Number.Get(data?.monthlySalary),
    leave_days: {
      label: data?.leave ? data?.leave : "",
      value: data?.leave ? data?.leave : "",
    },
    hra: Currency.Get(data?.hra),
    basic: Currency.Get(data?.basic),
    salaryPerDay: Currency.Get(data?.salaryPerDay),
    lop: Currency.Get(data?.lop),
    tds: tdsValue ? tdsValue : "",
    other_deductions: otherDeductValue ? otherDeductValue : "",
    additional_day_allowance: Currency.Get(data?.additional_day_allowance),
    provident_fund: pfValue ? pfValue : "",
    bonus: bonusValue ? bonusValue : "",
    fine: Number.Get(data?.fine),
  };

  // Handle User change
  const handleUserChange = async (user) => {
    let params = { ...param };
    if (user) params.user = user?.id;
    if (!user) params.user = "";

    setParam(params);
    setUserValue(user?.id);
    if (user?.id) {
      let data = await salaryService.getfilterData(params);
      setData(data);
    } else {
      setData("");
    }
  };

  const handleStartDate = async (startDate) => {
    setSelectedDate((prevState) => ({ ...prevState, startDate: startDate }));
    const value = startDate ? DateTime.formatDate(startDate) : "";

    let params = { ...param };
    if (startDate) params.startDate = DateTime.toISOString(startDate);
    if (!startDate) params.startDate = "";

    setStartDateValue(value);

    setParam(params);
    if (value) {
      let data = await salaryService.getfilterData(params);
      setData(data);
    } else {
      setData("");
    }
  };

  const handleEndDate = async (endDate) => {
    setSelectedDate((prevState) => ({ ...prevState, endDate: endDate }));

    const value = endDate ? DateTime.formatDate(endDate) : "";

    let params = { ...param };
    if (endDate) params.endDate = DateTime.toISOString(endDate);
    if (!endDate) params.endDate = "";

    setEndDateValue(value);

    setParam(params);
    if (value) {
      let data = await salaryService.getfilterData(params);
      setData(data);
    } else {
      setData("");
    }
  };

  const handleStandardAllowance = async (value) => {
    const allowanceValue =
      value && value?.values && value?.values.standard_allowance
        ? value?.values.standard_allowance
        : "";
    setStandardAllowance(allowanceValue);

    let params = { ...param };
    if (value) params.standardAllowance = allowanceValue;
    if (!value) params.standardAllowance = "";

    setParam(params);
    let data = await salaryService.getfilterData(params);
    setData(data);
  };

  const bonusChange = async (value) => {
    const values =
      value && value?.values && value?.values.bonus ? value?.values.bonus : "";
    setbonusChange(values);

    let params = { ...param };
    if (value) params.bonus = values;
    if (!value) params.bonus = "";

    setParam(params);
    let data = await salaryService.getfilterData(params);
    setData(data);
  };

  const tdsChange = async (value) => {
    const values =
      value && value?.values && value?.values.tds ? value?.values.tds : "";
    setTdsChange(values);

    let params = { ...param };
    if (value) params.tds = values;
    if (!value) params.tds = "";

    setParam(params);
    let data = await salaryService.getfilterData(params);
    setData(data);
  };

  const medicalInsuranceChange = async (value) => {
    const values =
      value && value?.values && value?.values.medical_insurance
        ? value?.values.medical_insurance
        : "";
    setMedicalInsurance(values);

    let params = { ...param };
    if (value) params.medical_insurance = values;
    if (!value) params.medical_insurance = "";

    setParam(params);
    let data = await salaryService.getfilterData(params);
    setData(data);
  };

  const grautityChange = async (value) => {
    const allowanceValue =
      value && value?.values && value?.values.gratuity
        ? value?.values.gratuity
        : "";
    setGrautityChange(allowanceValue);

    let params = { ...param };
    if (value) params.gratuity = allowanceValue;
    if (!value) params.gratuity = "";

    setParam(params);
    let data = await salaryService.getfilterData(params);
    setData(data);
  };

  const pfChange = async (value) => {
    const allowanceValue =
      value && value?.values && value?.values.provident_fund
        ? value?.values.provident_fund
        : "";
    setPf(allowanceValue);

    let params = { ...param };
    if (value) params.provident_fund = allowanceValue;
    if (!value) params.provident_fund = "";

    setParam(params);
    let data = await salaryService.getfilterData(params);
    setData(data);
  };

  const ptChange = async (value) => {
    const allowanceValue =
      value && value?.values && value?.values.professional_tax
        ? value?.values.professional_tax
        : "";
    setPt(allowanceValue);

    let params = { ...param };
    if (value) params.professional_tax = allowanceValue;
    if (!value) params.professional_tax = "";

    setParam(params);
    let data = await salaryService.getfilterData(params);
    setData(data);
  };

  const otherDeductChanges = async (value) => {
    const allowanceValue =
      value && value?.values && value?.values.other_deductions
        ? value?.values.other_deductions
        : "";
    setOtherDeduct(allowanceValue);

    let params = { ...param };
    if (value) params.other_deductions = allowanceValue;
    if (!value) params.other_deductions = "";

    setParam(params);
    let data = await salaryService.getfilterData(params);
    setData(data);
  };

  const handleSubmit = async (values) => {
    let basic = values.basic;
    let hra = values.hra;
    let medical_insurance = values.medical_insurance;
    let net_salary = values.net_salary;
    let professional_tax = values.professional_tax;
    let special_allowance = values.special_allowance;
    let standard_allowance = values && values.standard_allowance;
    let gratuity = values.gratuity;
    const data = new FormData();
    data.append("user", values?.user.id ? values?.user.id : "");
    data.append("start_date", startDateValue ? startDateValue : "");
    data.append("end_date", endDateValue ? endDateValue : "");
    data.append(
      "working_days",
      values?.working_days.value ? values?.working_days.value : ""
    );
    data.append("monthly_salary", Number.Get(values?.monthly_salary));
    data.append(
      "worked_days",
      values?.worked_days.value ? values?.worked_days.value : ""
    );
    data.append(
      "additional_days",
      values?.additional_days.value ? values?.additional_days.value : ""
    );

    data.append("basic", Number.Get(basic));
    data.append("hra", Number.Get(hra));
    data.append("standard_allowance", Number.Get(standard_allowance));
    data.append("special_allowance", Number.Get(special_allowance));
    data.append("bonus", Number.Get(values.bonus));
    data.append(
      "additional_day_allowance",
      Number.Get(values.additional_day_allowance)
    );

    data.append(
      "leave_days",
      values?.leave_days.value ? values?.leave_days.value : ""
    );
    data.append("absent", values?.absent.value ? values?.absent.value : "");
    data.append("salaryPerDay", Number.Get(values.salaryPerDay));
    data.append("tds", Number.Get(values.tds));

    data.append("medical_insurance", Number.Get(medical_insurance));
    data.append("gratuity", Number.Get(gratuity));
    data.append("provident_fund", Number.Get(values.provident_fund));
    data.append("professional_tax", Number.Get(professional_tax));

    data.append("lop", Number.Get(values.lop));
    data.append("net_salary", Number.Get(net_salary));
    data.append("other_deductions", Number.Get(values.other_deductions));
    data.append("fine", Number.Get(values.fine));
    try {
      let response = await salaryService.create(data);
      if (response && response.data) {
        Toast.success(response.data.message);
        history.push("/salary");
      }
    } catch (err) {
      if (isBadRequest(err)) {
        let errorMessage;
        const errorRequest = err.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        Toast.error(errorMessage);
      }
    }
  };

  const breadcrumbList = [
    { label: "Home", link: "/people/dashboard" },
    { label: "SalaryList", link: "/salary" },
    { label: "Salary Add", link: "" },
  ];

  return (
    <>
      <FormList
        initialValues={initialValues}
        pageTitle={"Salary Form"}
        handleSubmit={handleSubmit}
        breadcrumbList={breadcrumbList}
        handleChange={handleUserChange}
        handleStartDate={handleStartDate}
        handleEndDate={handleEndDate}
        selectedDate={selectedDate}
        userList={userList}
        handleStandardAllowance={handleStandardAllowance}
        otherDeductChanges={otherDeductChanges}
        ptChange={ptChange}
        pfChange={pfChange}
        grautityChange={grautityChange}
        medicalInsuranceChange={medicalInsuranceChange}
        tdsChange={tdsChange}
        bonusChange={bonusChange}
      />
    </>
  );
}

export default SalaryForm;
