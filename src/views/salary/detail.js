import React, { useEffect, useRef, useState } from "react";
import Avatar from "../../components/Avatar";
import Currency from "../../lib/Currency";
import SalaryService from "../../services/SalaryService";
import CompanyUserService, { search } from "../../services/UserService";
import FormList from "./components/form";
import Url from "../../lib/Url";
import DateTime from "../../lib/DateTime";
import Number from "../../lib/Number";
import { Salary } from "../../helpers/Salary";

function SalaryDetail(props) {
  const [salaryList, setSalaryList] = useState();
  const [usersList, setUsersList] = useState();
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

  const salaryRef = useRef();

  const [selectedDate, setSelectedDate] = useState({
    startDate: "",
    endDate: "",
  });

  let salary_id = props.match.params.id;
  useEffect(() => {
    getDetails();
    getUsersList();
    setUserValue("");
  }, []);

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

  const getUsersList = async () => {
    const userRole = await CompanyUserService.list();
    const data = [];
    userRole &&
      userRole.length > 0 &&
      userRole.forEach((list) => {
        data.push({
          label: getUserName(list.media_url, list.first_name, list.last_name),
          value: list.first_name,
          id: list.id,
        });
      });
    setUsersList(data);
  };
  const statusOptions = [
    {
      label: Salary.STATUS_APPROVED_TEXT,
      value: Salary.STATUS_APPROVED_VALUE,
    },
    {
      label: Salary.STATUS_PAID_TEXT,
      value: Salary.STATUS_PAID_VALUE,
    },
    {
      label: Salary.STATUS_COMPLETED_TEXT,
      value: Salary.STATUS_COMPLETED_VALUE,
    },
    {
      label: Salary.STATUS_DRAFT_TEXT,
      value: Salary.STATUS_DRAFT_VALUE,
    },
  ];

  const initialValues = {
    user:
      usersList && usersList.find((data) => data.id == userValue)
        ? usersList && usersList.find((data) => data.id == userValue)
        : usersList && usersList.find((data) => data.id == salaryList?.user_id),
    start_date: startDateValue ? startDateValue : salaryList?.start_date,
    end_date: endDateValue ? endDateValue : salaryList?.end_date,
    working_days: {
      label: data?.totalWorkingDays
        ? data?.totalWorkingDays
        : salaryList?.working_days,
      value: data?.totalWorkingDays
        ? data?.totalWorkingDays
        : salaryList?.working_days,
    },
    worked_days: {
      label: data?.worked_days ? data?.worked_days : salaryList?.worked_days,
      value: data?.worked_days ? data?.worked_days : salaryList?.worked_days,
    },
    leave_days: {
      label: data?.leave ? data?.leave : salaryList?.leave,
      value: data?.leave ? data?.leave : salaryList?.leave,
    },
    additional_days: {
      label: data?.additional ? data?.additional : salaryList?.additional_days,
      value: data?.additional ? data?.additional : salaryList?.additional_days,
    },

    absent: {
      label: data?.absent ? data?.absent : salaryList?.absent,
      value: data?.absent ? data?.absent : salaryList?.absent,
    },

    basic: data?.basic ? data?.basic : salaryList?.basic,
    hra: data?.hra ? data?.hra : salaryList?.hra,
    standard_allowance: standardAllowance
      ? standardAllowance
      : salaryList?.standard_allowance,
    special_allowance: data?.specialAllowance
      ? data?.specialAllowance
      : salaryList?.special_allowance,
    medical_insurance: medicalValue
      ? medicalValue
      : salaryList?.medical_insurance,
    gratuity:grautityValue ? grautityValue : salaryList?.gratuity,
    professional_tax: ptValue ? ptValue : salaryList?.professional_tax,

    net_salary: data?.net_salary ? data?.net_salary : salaryList?.net_salary,
    monthly_salary: data?.monthlySalary
      ? data?.monthlySalary
      : salaryList?.monthly_salary,
    salaryPerDay: data?.salaryPerDay
      ? data?.salaryPerDay
      : salaryList?.salaryPerDay,
    lop: data?.lop ? data?.lop : salaryList?.lop,
    tds: tdsValue ? tdsValue : salaryList?.tds,
    other_deductions: otherDeductValue
      ? otherDeductValue
      : salaryList?.other_deductions,
    additional_day_allowance: data?.additional_day_allowance
      ? data?.additional_day_allowance
      : salaryList?.additional_day_allowance,
    provident_fund: pfValue ? pfValue : salaryList?.provident_fund,
    bonus: Currency.Get(bonusValue ? bonusValue : salaryList?.bonus),
    fine: data?.fine ? data?.fine : salaryList?.fine, 
  };

  const getDetails = async () => {
    const data = await SalaryService.get(salary_id);
    setSalaryList(data);

    salaryRef.current = data;
  };

  // Handle User change
  const handleUserChange = async (user) => {
    let params = { ...param };

    if (user) params.user = user?.id ? user?.id : salaryRef.current.user_id;

    params.startDate = DateTime.toISOString(
      startDateValue ? startDateValue : salaryRef.current.start_date
    );
    params.endDate = DateTime.toISOString(
      endDateValue ? endDateValue : salaryRef.current.end_date
    );
    params.standardAllowance = standardAllowance
      ? standardAllowance
      : salaryRef.current.standard_allowance;
    params.bonus = bonusValue ? bonusValue : salaryRef.current.bonus;
    params.tds = tdsValue ? tdsValue : salaryRef.current.tds;
    params.medical_insurance = medicalValue
      ? medicalValue
      : salaryRef.current.medical_insurance;
    params.gratuity = grautityValue
      ? grautityValue
      : salaryRef.current.gratuity;
    params.provident_fund = pfValue
      ? pfValue
      : salaryRef.current.provident_fund;
    params.professional_tax = ptValue
      ? ptValue
      : salaryRef.current.professional_tax;
    params.other_deductions = otherDeductValue
      ? otherDeductValue
      : salaryRef.current.other_deductions;

    if (!user) params.user = "";

    setParam(params);
    setUserValue(user?.id);
    let data = await SalaryService.getfilterData(params);
    setData(data);
  };

  // Handle User change
  const handleStartDate = async (startDate) => {
    setSelectedDate((prevState) => ({ ...prevState, startDate: startDate }));
    const value = startDate ? DateTime.formatDate(startDate) : "";

    let params = { ...param };
    if (startDate)
      params.startDate = DateTime.toISOString(
        value ? value : salaryRef.current.start_date
      );
    if (!startDate) params.startDate = "";
    params.endDate = DateTime.toISOString(
      endDateValue ? endDateValue : salaryRef.current.end_date
    );
    params.standardAllowance = standardAllowance
      ? standardAllowance
      : salaryRef.current.standard_allowance;
    params.bonus = bonusValue ? bonusValue : salaryRef.current.bonus;
    params.tds = tdsValue ? tdsValue : salaryRef.current.tds;
    params.medical_insurance = medicalValue
      ? medicalValue
      : salaryRef.current.medical_insurance;
    params.gratuity = grautityValue
      ? grautityValue
      : salaryRef.current.gratuity;
    params.provident_fund = pfValue
      ? pfValue
      : salaryRef.current.provident_fund;
    params.professional_tax = ptValue
      ? ptValue
      : salaryRef.current.professional_tax;
    params.other_deductions = otherDeductValue
      ? otherDeductValue
      : salaryRef.current.other_deductions;
    params.user = userValue ? userValue : salaryRef.current.user_id;

    setStartDateValue(value);

    setParam(params);
    let data = await SalaryService.getfilterData(params);
    setData(data);
  };

  // Handle User change
  const handleEndDate = async (endDate) => {
    setSelectedDate((prevState) => ({ ...prevState, endDate: endDate }));

    const value = endDate ? DateTime.formatDate(endDate) : "";

    let params = { ...param };
    if (endDate)
      params.endDate = DateTime.toISOString(
        value ? value : salaryRef.current.end_date
      );

    if (!endDate) params.endDate = "";
    params.startDate = DateTime.toISOString(
      startDateValue ? startDateValue : salaryRef.current.start_date
    );
    params.standardAllowance = standardAllowance
      ? standardAllowance
      : salaryRef.current.standard_allowance;
    params.bonus = bonusValue ? bonusValue : salaryRef.current.bonus;
    params.tds = tdsValue ? tdsValue : salaryRef.current.tds;
    params.medical_insurance = medicalValue
      ? medicalValue
      : salaryRef.current.medical_insurance;
    params.gratuity = grautityValue
      ? grautityValue
      : salaryRef.current.gratuity;
    params.provident_fund = pfValue
      ? pfValue
      : salaryRef.current.provident_fund;
    params.professional_tax = ptValue
      ? ptValue
      : salaryRef.current.professional_tax;
    params.other_deductions = otherDeductValue
      ? otherDeductValue
      : salaryRef.current.other_deductions;
    params.user = userValue ? userValue : salaryRef.current.user_id;

    setEndDateValue(value);

    setParam(params);
    let data = await SalaryService.getfilterData(params);
    setData(data);
  };

  // Handle User change
  const handleStandardAllowance = async (value) => {
    const allowanceValue =
      value && value?.values && value?.values.standard_allowance
        ? value?.values.standard_allowance
        : "";
    setStandardAllowance(allowanceValue);

    let params = { ...param };
    if (value)
      params.standardAllowance = allowanceValue
        ? allowanceValue
        : salaryRef.current.standard_allowance;

    if (!value) params.standardAllowance = "";
    params.startDate = DateTime.toISOString(
      startDateValue ? startDateValue : salaryRef.current.start_date
    );
    params.endDate = DateTime.toISOString(
      endDateValue ? endDateValue : salaryRef.current.end_date
    );
    params.bonus = bonusValue ? bonusValue : salaryRef.current.bonus;
    params.tds = tdsValue ? tdsValue : salaryRef.current.tds;
    params.medical_insurance = medicalValue
      ? medicalValue
      : salaryRef.current.medical_insurance;
    params.gratuity = grautityValue
      ? grautityValue
      : salaryRef.current.gratuity;
    params.provident_fund = pfValue
      ? pfValue
      : salaryRef.current.provident_fund;
    params.professional_tax = ptValue
      ? ptValue
      : salaryRef.current.professional_tax;
    params.other_deductions = otherDeductValue
      ? otherDeductValue
      : salaryRef.current.other_deductions;
    params.user = userValue ? userValue : salaryRef.current.user_id;

    setParam(params);
    let data = await SalaryService.getfilterData(params);
    setData(data);
  };

  const bonusChange = async (value) => {
    const values =
      value && value?.values && value?.values.bonus ? value?.values.bonus : "";
    setbonusChange(values);

    let params = { ...param };
    if (value) params.bonus = values ? values : salaryRef.current.bonus;
    if (!value) params.bonus = "";
    params.startDate = DateTime.toISOString(
      startDateValue ? startDateValue : salaryRef.current.start_date
    );
    params.endDate = DateTime.toISOString(
      endDateValue ? endDateValue : salaryRef.current.end_date
    );
    params.standardAllowance = standardAllowance
      ? standardAllowance
      : salaryRef.current.standard_allowance;
    params.tds = tdsValue ? tdsValue : salaryRef.current.tds;
    params.medical_insurance = medicalValue
      ? medicalValue
      : salaryRef.current.medical_insurance;
    params.gratuity = grautityValue
      ? grautityValue
      : salaryRef.current.gratuity;
    params.provident_fund = pfValue
      ? pfValue
      : salaryRef.current.provident_fund;
    params.professional_tax = ptValue
      ? ptValue
      : salaryRef.current.professional_tax;
    params.other_deductions = otherDeductValue
      ? otherDeductValue
      : salaryRef.current.other_deductions;
    params.user = userValue ? userValue : salaryRef.current.user_id;

    setParam(params);
    let data = await SalaryService.getfilterData(params);
    setData(data);
  };

  const tdsChange = async (value) => {
    const values =
      value && value?.values && value?.values.tds ? value?.values.tds : "";
    setTdsChange(values);

    let params = { ...param };
    if (value) params.tds = values ? values : salaryRef.current.tds;

    if (!value) params.tds = "";
    params.startDate = DateTime.toISOString(
      startDateValue ? startDateValue : salaryRef.current.start_date
    );
    params.endDate = DateTime.toISOString(
      endDateValue ? endDateValue : salaryRef.current.end_date
    );
    params.standardAllowance = standardAllowance
      ? standardAllowance
      : salaryRef.current.standard_allowance;
    params.bonus = bonusValue ? bonusValue : salaryRef.current.bonus;
    params.medical_insurance = medicalValue
      ? medicalValue
      : salaryRef.current.medical_insurance;
    params.gratuity = grautityValue
      ? grautityValue
      : salaryRef.current.gratuity;
    params.provident_fund = pfValue
      ? pfValue
      : salaryRef.current.provident_fund;
    params.professional_tax = ptValue
      ? ptValue
      : salaryRef.current.professional_tax;
    params.other_deductions = otherDeductValue
      ? otherDeductValue
      : salaryRef.current.other_deductions;
    params.user = userValue ? userValue : salaryRef.current.user_id;

    setParam(params);
    let data = await SalaryService.getfilterData(params);
    setData(data);
  };

  const medicalInsuranceChange = async (value) => {
    const values =
      value && value?.values && value?.values.medical_insurance
        ? value?.values.medical_insurance
        : "";
    setMedicalInsurance(values);

    let params = { ...param };
    if (value)
      params.medical_insurance = values
        ? values
        : salaryRef.current.medical_insurance;
    if (!value) params.medical_insurance = "";
    params.startDate = DateTime.toISOString(
      startDateValue ? startDateValue : salaryRef.current.start_date
    );
    params.endDate = DateTime.toISOString(
      endDateValue ? endDateValue : salaryRef.current.end_date
    );
    params.standardAllowance = standardAllowance
      ? standardAllowance
      : salaryRef.current.standard_allowance;
    params.bonus = bonusValue ? bonusValue : salaryRef.current.bonus;
    params.tds = tdsValue ? tdsValue : salaryRef.current.tds;
    params.gratuity = grautityValue
      ? grautityValue
      : salaryRef.current.gratuity;
    params.provident_fund = pfValue
      ? pfValue
      : salaryRef.current.provident_fund;
    params.professional_tax = ptValue
      ? ptValue
      : salaryRef.current.professional_tax;
    params.other_deductions = otherDeductValue
      ? otherDeductValue
      : salaryRef.current.other_deductions;
    params.user = userValue ? userValue : salaryRef.current.user_id;

    setParam(params);
    let data = await SalaryService.getfilterData(params);
    setData(data);
  };

  const grautityChange = async (value) => {
    const allowanceValue =
      value && value?.values && value?.values.gratuity
        ? value?.values.gratuity
        : "";
    setGrautityChange(allowanceValue);

    let params = { ...param };
    if (value)
      params.gratuity = allowanceValue
        ? allowanceValue
        : salaryRef.current.gratuity;

    if (!value) params.gratuity = "";
    params.startDate = DateTime.toISOString(
      startDateValue ? startDateValue : salaryRef.current.start_date
    );
    params.endDate = DateTime.toISOString(
      endDateValue ? endDateValue : salaryRef.current.end_date
    );
    params.standardAllowance = standardAllowance
      ? standardAllowance
      : salaryRef.current.standard_allowance;
    params.bonus = bonusValue ? bonusValue : salaryRef.current.bonus;
    params.tds = tdsValue ? tdsValue : salaryRef.current.tds;
    params.medical_insurance = medicalValue
      ? medicalValue
      : salaryRef.current.medical_insurance;
    params.provident_fund = pfValue
      ? pfValue
      : salaryRef.current.provident_fund;
    params.professional_tax = ptValue
      ? ptValue
      : salaryRef.current.professional_tax;
    params.other_deductions = otherDeductValue
      ? otherDeductValue
      : salaryRef.current.other_deductions;
    params.user = userValue ? userValue : salaryRef.current.user_id;

    setParam(params);
    let data = await SalaryService.getfilterData(params);
    setData(data);
  };

  const pfChange = async (value) => {
    const allowanceValue =
      value && value?.values && value?.values.provident_fund
        ? value?.values.provident_fund
        : "";
    setPf(allowanceValue);

    let params = { ...param };
    if (value)
      params.provident_fund = allowanceValue
        ? allowanceValue
        : salaryRef.current.provident_fund;

    if (!value) params.provident_fund = "";
    params.startDate = DateTime.toISOString(
      startDateValue ? startDateValue : salaryRef.current.start_date
    );
    params.endDate = DateTime.toISOString(
      endDateValue ? endDateValue : salaryRef.current.end_date
    );
    params.standardAllowance = standardAllowance
      ? standardAllowance
      : salaryRef.current.standard_allowance;
    params.bonus = bonusValue ? bonusValue : salaryRef.current.bonus;
    params.tds = tdsValue ? tdsValue : salaryRef.current.tds;
    params.medical_insurance = medicalValue
      ? medicalValue
      : salaryRef.current.medical_insurance;
    params.gratuity = grautityValue
      ? grautityValue
      : salaryRef.current.gratuity;
    params.professional_tax = ptValue
      ? ptValue
      : salaryRef.current.professional_tax;
    params.other_deductions = otherDeductValue
      ? otherDeductValue
      : salaryRef.current.other_deductions;
    params.user = userValue ? userValue : salaryRef.current.user_id;

    setParam(params);
    let data = await SalaryService.getfilterData(params);
    setData(data);
  };

  const ptChange = async (value) => {
    const allowanceValue =
      value && value?.values && value?.values.professional_tax
        ? value?.values.professional_tax
        : "";
    setPt(allowanceValue);

    let params = { ...param };
    if (value)
      params.professional_tax = allowanceValue
        ? allowanceValue
        : salaryRef.current.professional_tax;

    if (!value) params.professional_tax = "";
    params.startDate = DateTime.toISOString(
      startDateValue ? startDateValue : salaryRef.current.start_date
    );
    params.endDate = DateTime.toISOString(
      endDateValue ? endDateValue : salaryRef.current.end_date
    );
    params.standardAllowance = standardAllowance
      ? standardAllowance
      : salaryRef.current.standard_allowance;
    params.bonus = bonusValue ? bonusValue : salaryRef.current.bonus;
    params.tds = tdsValue ? tdsValue : salaryRef.current.tds;
    params.medical_insurance = medicalValue
      ? medicalValue
      : salaryRef.current.medical_insurance;
    params.gratuity = grautityValue
      ? grautityValue
      : salaryRef.current.gratuity;
    params.provident_fund = pfValue
      ? pfValue
      : salaryRef.current.provident_fund;
    params.other_deductions = otherDeductValue
      ? otherDeductValue
      : salaryRef.current.other_deductions;
    params.user = userValue ? userValue : salaryRef.current.user_id;

    setParam(params);
    let data = await SalaryService.getfilterData(params);
    setData(data);
  };

  const otherDeductChanges = async (value) => {
    const allowanceValue =
      value && value?.values && value?.values.other_deductions
        ? value?.values.other_deductions
        : "";
    setOtherDeduct(allowanceValue);

    let params = { ...param };
    if (value)
      params.other_deductions = allowanceValue
        ? allowanceValue
        : salaryRef.current.other_deductions;

    if (!value) params.other_deductions = "";
    params.startDate = DateTime.toISOString(
      startDateValue ? startDateValue : salaryRef.current.start_date
    );
    params.endDate = DateTime.toISOString(
      endDateValue ? endDateValue : salaryRef.current.end_date
    );
    params.standardAllowance = standardAllowance
      ? standardAllowance
      : salaryRef.current.standard_allowance;
    params.bonus = bonusValue ? bonusValue : salaryRef.current.bonus;
    params.tds = tdsValue ? tdsValue : salaryRef.current.tds;
    params.medical_insurance = medicalValue
      ? medicalValue
      : salaryRef.current.medical_insurance;
    params.gratuity = grautityValue
      ? grautityValue
      : salaryRef.current.gratuity;
    params.provident_fund = pfValue
      ? pfValue
      : salaryRef.current.provident_fund;
    params.professional_tax = ptValue
      ? ptValue
      : salaryRef.current.professional_tax;
    params.user = userValue ? userValue : salaryRef.current.user_id;

    setParam(params);
    let data = await SalaryService.getfilterData(params);
    setData(data);
  };

  const salaryUpdate = async (values) => {
    const id = window.location.pathname.split("/")[3];
    let monthly_salary = values.monthly_salary;
    let net_salary = values.net_salary;
    const data = new FormData();
    data.append("user", values?.user.id);
    data.append("start_date", values?.start_date);
    data.append("end_date", values?.end_date);
    data.append("working_days", values?.working_days.value);
    data.append("worked_days", values?.worked_days.value);
    data.append(
      "leave_days",
      values?.leave_days.value ? values?.leave_days.value : 0
    );
    data.append(
      "additional_days",
      values?.additional_days.value ? values?.additional_days.value : 0
    );
    data.append("basic", Currency.Get(values.basic));
    data.append("hra", Currency.Get(values.hra));
    data.append("standard_allowance", Currency.Get(values.standard_allowance));
    data.append("special_allowance", Currency.Get(values.special_allowance));
    data.append("medical_insurance", Currency.Get(values.medical_insurance));
    data.append("gratuity", Currency.Get(values.gratuity));
    data.append("professional_tax", Currency.Get(values.professional_tax));
    data.append("net_salary", Currency.Get(net_salary));
    data.append("monthly_salary", Currency.Get(monthly_salary));
    data.append("bonus", Currency.Get(values.bonus));
    data.append(
      "additional_day_allowance",
      Currency.Get(values.additional_day_allowance)
    );
    data.append("tds", Currency.Get(values.tds));
    data.append("salaryPerDay", Currency.Get(values.salaryPerDay));
    data.append("provident_fund", Currency.Get(values.provident_fund));
    data.append("lop", Currency.Get(values.lop));
    data.append("other_deductions", Currency.Get(values.other_deductions));
    data.append("fine", Number.Get(values.fine));

    await SalaryService.update(id, data);
  };

  const breadcrumbList = [
    { label: "Home", link: "/people/dashboard" },
    { label: "Salary", link: "/salary" },
    { label: "Salary Detail", link: "" },
  ];

  const calculate = async () => {
    const params = {
      bonus: initialValues.bonus,
      endDate: initialValues.end_date,
      gratuity: initialValues.gratuity,
      medical_insurance: initialValues.medical_insurance,
      other_deductions: initialValues.other_deductions,
      professional_tax: initialValues.professional_tax,
      provident_fund: initialValues.provident_fund,
      standardAllowance: initialValues.standard_allowance,
      startDate: initialValues.start_date,
      tds: initialValues.tds,
      user: initialValues.user.id,
    };

    let data = await SalaryService.getfilterData(params);
    setData(data);
  };
  
  return (
    <>
      <FormList
        pageTitle={"Salary Detail Page"}
        initialValues={initialValues}
        handleSubmit={salaryUpdate}
        breadcrumbList={breadcrumbList}
        handleChange={handleUserChange}
        handleStartDate={handleStartDate}
        handleEndDate={handleEndDate}
        selectedDate={selectedDate}
        userList={usersList}
        handleStandardAllowance={handleStandardAllowance}
        otherDeductChanges={otherDeductChanges}
        ptChange={ptChange}
        pfChange={pfChange}
        grautityChange={grautityChange}
        medicalInsuranceChange={medicalInsuranceChange}
        tdsChange={tdsChange}
        bonusChange={bonusChange}
        id={props?.match?.params?.id}
        buttonLabel={statusOptions.find(
          (data) => data?.value == salaryList?.status
        )}
        calculate={calculate}
      />
    </>
  );
}

export default SalaryDetail;
