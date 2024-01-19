import React, { useEffect, useState } from "react";
import DateSelector from "../../../components/Date";
import Select from "../../../components/Select";
import Form from "../../../components/Form";
import PageTitle from "../../../components/PageTitle";
import Currency from "../../../components/Currency";
import CancelButton from "../../../components/CancelButton";
import SaveButton from "../../../components/SaveButton";
import { useHistory } from "react-router-dom";
import BreadCrumb from "../../../components/Breadcrumb";
import Action from "../../../components/Action";
import SalaryService from "../../../services/SalaryService";
import { Salary } from "../../../helpers/Salary";
import UserSelect from "../../../components/UserSelect";
import Button from "../../../components/Button";
import Permission from "../../../helpers/Permission";
import { hasPermission } from "../../../services/UserRolePermissionService";

function FormList(props) {
  const {
    initialValues,
    handleSubmit,
    pageTitle,
    breadcrumbList,
    handleChange,
    handleStartDate,
    handleEndDate,
    selectedDate,
    userList,
    handleStandardAllowance,
    otherDeductChanges,
    ptChange,
    pfChange,
    grautityChange,
    medicalInsuranceChange,
    tdsChange,
    bonusChange,
    buttonLabel,
    calculate
  } = props;

  const [options, setOptions] = useState();
  const history = useHistory();
  const [editable, setEditable] = useState(true);
  let showEditButton = hasPermission(Permission.SALARY_EDIT);

  useEffect(() => {
    getNumberList();
  }, []);

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

  const onStatusChange = (value) => {
    if (value) {
      handleSubmits(value);
    }
  };

  const handleSubmits = async (values) => {
    const data = new FormData();
    data.append("status", values);
    SalaryService.statusUpdate(props?.id, data);
  };

  return (
    <>
      <BreadCrumb list={breadcrumbList} />
      <div className="row mx-1 justify-content-between pb-3">
        <PageTitle label={pageTitle} />
        <div className="d-flex">
          <Button
            className=" ml-3 mr-2"
            label="Recalculate"
            onClick={calculate}
          />
          {showEditButton && editable && (
            <Button
              label="Edit"
              loadingLabel="Editable"
              className="mr-1"
              disabled={editable == false ? true : false}
              onClick={() => {
                setEditable(false);
              }}
            />
          )}

          <Action
            buttonLabel={buttonLabel?.label ? buttonLabel?.label : "Status"}
            dropdownLinks={statusOptions}
            handleChange={onStatusChange}
          />
        </div>
      </div>
      <div className="card-body card">
        <Form
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(values) => {
            setEditable(false);
            handleSubmit(values)
            setEditable(true);
          }}
        >
          <div className="row">
            <div className="col">
              <UserSelect label="User" handleUserChange={handleChange}
                isDisabled={editable}
              />
            </div>
            <div className="col">
              <DateSelector
                selected={selectedDate?.startDate}
                name="start_date"
                label="Start Date"
                onChange={handleStartDate}
                disabled={editable}
              />
            </div>
            <div className="col">
              <DateSelector
                selected={selectedDate?.endDate}
                name="end_date"
                label="End Date"
                onChange={handleEndDate}
                disabled={editable}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Currency name="monthly_salary" label="Monthly Salary"
                disabled={editable}

              />
              <Select
                name="working_days"
                label="Working Days"
                options={options}
                isDisabled={editable}
              />

              <Select
                name="worked_days"
                label="Worked Days"
                options={options}
                isDisabled={editable}
              />
              <Select
                name="additional_days"
                label="Additional Days"
                options={options}
                isDisabled={editable}
              />
              <Currency name="basic" label="Basic" disabled={editable} />
              <Currency name="hra" label="HRA" disabled={editable} />
              <Currency
                name="standard_allowance"
                label="Standard Allowance"
                onInputChange={handleStandardAllowance}
                disabled={editable}
              />
              <Currency name="special_allowance" label="Special Allowance" disabled={editable} />
              <Currency
                name="bonus"
                label="Bonus"
                onInputChange={bonusChange}
                disabled={editable}
              />
              <Currency
                name="additional_day_allowance"
                label="Additional Days Allowance"
                disabled={editable}
              />
            </div>
            <div className="col">
              <Currency name="salaryPerDay" label="Salary Per Day" disabled={editable} />
              <Select name="leave_days" label="Leave" options={options} isDisabled={editable} />
              <Select name="absent" label="Absent" options={options}
                isDisabled={editable}
              />
              <Currency name="tds" label="TDS" onInputChange={tdsChange} disabled={editable} />
              <Currency
                name="medical_insurance"
                label="Medical Insurance"
                onInputChange={medicalInsuranceChange}
                disabled={editable}
              />
              <Currency
                name="gratuity"
                label="Gratuity"
                onInputChange={grautityChange}
                disabled={editable}
              />
              <Currency
                name="provident_fund"
                label="PF"
                onInputChange={pfChange}
                disabled={editable}
              />
              <Currency
                name="professional_tax"
                label="PT"
                onInputChange={ptChange}
                disabled={editable}
              />
              <Currency
                name="other_deductions"
                label="Other Deductions"
                onInputChange={otherDeductChanges}
                disabled={editable}
              />
              <Currency name="lop" label="LOP for Leaves"
                disabled={editable} />
              <Currency name="fine" label="Fine" disabled={editable} />
            </div>
          </div>
          <Currency name="net_salary" label="Net Salary" disabled={editable} />
          {!editable && (
            <><SaveButton /><CancelButton onClick={() => history.push(`/salary`)} /></>)}
        </Form>
      </div>
    </>
  );
}

export default FormList;
