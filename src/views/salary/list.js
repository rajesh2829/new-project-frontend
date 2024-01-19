import React, { useState } from "react";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { endpoints } from "../../api/endPoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";
import Currency from "../../lib/Currency";
import { useDispatch } from "react-redux";
import DropdownWithCheckbox from "../../components/DropdownWithCheckbox";
import { setCookie } from "../../lib/Helper";
import Cookie from "../../helpers/Cookie";
import SalaryService from "../../services/SalaryService";
import DateSelector from "../../components/Date";
import AddButton from "../../components/AddButton";
import SaveButton from "../../components/SaveButton";
import AddModal from "../../components/Modal";

import AddSalaryList from "./AddSalaryList";
import DateTime from "../../lib/DateTime";

function salaryList(props) {
  const { history } = props;
  const dispatch = useDispatch();
  const [arrays, setArray] = useState([]);
  const [arrayList, setArrayList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([0]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([0]);

  const [selectedDate, setSelectedDate] = useState({
    startDate: "",
    endDate: "",
  });

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isSubmit, setIsSubmit] = useState(true);

  const FieldLabel = {
    WORKING_DAYS: "Working Days",
    MONTHLY_SALARY: "Monthly Salary",
    WORKED_DAYS: "Worked Days",
    LEAVE: "Leave",
    ADDITIONAL_DAYS: "Additional Days",
    BASIC: "Basic",
    HRA: "HRA",
    STANDARD_ALLOWANCE: "Standard Allowance",
    SPECIAL_ALLOWANCE: "Special Allowance",
    MEDICAL_INSURANCE: "Medical Insurance",
    GRATUITY: "Gratuity",
    PROFESSIONAL_TAX: "Professional Tax",
    LOP_LEAVES: "Lop Leaves",
  };

  const FieldLabels = [
    {
      value: FieldLabel.WORKING_DAYS,
      label: FieldLabel.WORKING_DAYS,
    },
    {
      value: FieldLabel.MONTHLY_SALARY,
      label: FieldLabel.MONTHLY_SALARY,
    },
    {
      value: FieldLabel.WORKED_DAYS,
      label: FieldLabel.WORKED_DAYS,
    },
    {
      value: FieldLabel.ADDITIONAL_DAYS,
      label: FieldLabel.ADDITIONAL_DAYS,
    },
    {
      value: FieldLabel.BASIC,
      label: FieldLabel.BASIC,
    },
    {
      value: FieldLabel.HRA,
      label: FieldLabel.HRA,
    },
    {
      value: FieldLabel.STANDARD_ALLOWANCE,
      label: FieldLabel.STANDARD_ALLOWANCE,
    },
    {
      value: FieldLabel.SPECIAL_ALLOWANCE,
      label: FieldLabel.SPECIAL_ALLOWANCE,
    },
    {
      value: FieldLabel.MEDICAL_INSURANCE,
      label: FieldLabel.MEDICAL_INSURANCE,
    },
    {
      value: FieldLabel.GRATUITY,
      label: FieldLabel.GRATUITY,
    },
    {
      value: FieldLabel.PROFESSIONAL_TAX,
      label: FieldLabel.PROFESSIONAL_TAX,
    },
    {
      value: FieldLabel.LOP_LEAVES,
      label: FieldLabel.LOP_LEAVES,
    },
  ];

  const enable_working_days =
    arrays && getKeyByValue(arrays, FieldLabel.WORKING_DAYS) ? true : false;
  const enable_monthly_salary =
    arrays && getKeyByValue(arrays, FieldLabel.MONTHLY_SALARY) ? true : false;
  const enable_worked_days =
    arrays && getKeyByValue(arrays, FieldLabel.WORKED_DAYS) ? true : false;
  const enable_leave =
    arrays && getKeyByValue(arrays, FieldLabel.LEAVE) ? true : false;
  const enable_addtional_days =
    arrays && getKeyByValue(arrays, FieldLabel.ADDITIONAL_DAYS) ? true : false;
  const enable_basic =
    arrays && getKeyByValue(arrays, FieldLabel.BASIC) ? true : false;
  const enable_HRA =
    arrays && getKeyByValue(arrays, FieldLabel.HRA) ? true : false;
  const enable_standrad_allowance =
    arrays && getKeyByValue(arrays, FieldLabel.STANDARD_ALLOWANCE)
      ? true
      : false;
  const enable_special_allowance =
    arrays && getKeyByValue(arrays, FieldLabel.SPECIAL_ALLOWANCE)
      ? true
      : false;
  const enable_medical_allowance =
    arrays && getKeyByValue(arrays, FieldLabel.MEDICAL_INSURANCE)
      ? true
      : false;
  const enable_gratuity =
    arrays && getKeyByValue(arrays, FieldLabel.GRATUITY) ? true : false;
  const enable_professional_tax =
    arrays && getKeyByValue(arrays, FieldLabel.PROFESSIONAL_TAX) ? true : false;
  const enable_lop_leaves =
    arrays && getKeyByValue(arrays, FieldLabel.LOP_LEAVES) ? true : false;

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

  function getKeyByValue(object, value) {
    let isSelected = false;
    for (const key in object) {
      if (key == value) {
        isSelected = object[key] == true ? true : false;
      }
    }
    return isSelected;
  }

  const handleColumnChange = async (e) => {
    const array = e;
    let arrayList = [];
    arrayList = JSON.stringify(array);
    setCookie(Cookie.SALARY_LIST_COLUMNS, arrayList);
    setArray(array);
    setArrayList(array);
  };

  // Bulk update handler for Select
  const handleBulkSelect = (ids) => {
    setSelectedIds({ selectedIds: ids });
  };

  const calculate = async () => {
    dispatch(
      await SalaryService.bulkUpdate(selectedIds)
    )
  };

  const _toggle = () => {
    setIsOpen(!isOpen);
    setSelectedDate()
    setIsSubmit(true)

  };

  // // Handle startdate
  const handleStartDate = async (startDate) => {
    setSelectedDate((prevState) => ({ ...prevState, startDate: startDate }));
    const date = startDate ? DateTime.toISOStringDate(startDate) : "";

    setStartDate(date)
  };

  // Handle End date
  const handleEndDate = async (endDate) => {
    setSelectedDate((prevState) => ({ ...prevState, endDate: endDate }));
    let date = endDate ? DateTime.toISOStringDate(endDate) : "";

    setEndDate(date)
  };

  const BulkSelect = (values) => {
    setSelectedUserIds(values)
  };

  const initialValues = {
    startDate: "",
    endDate: "",
  };

  const handleSubmit = async () => {
    try {
      setIsSubmit(true)

      const data = new FormData();
      data.append("user", selectedUserIds);
      data.append("start_date", startDate);
      data.append("end_date", endDate);
      dispatch(
        await SalaryService.create(data, _toggle, setIsSubmit)
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmit(false)
    }
  };

  const addSalary = (
    <>
      <div className="row">
        <div className="col">
          <DateSelector
            selected={selectedDate?.startDate}
            name="start_date"
            label="Start Date"
            onChange={handleStartDate}
          />
        </div>
        <div className="col">
          <DateSelector
            selected={selectedDate?.endDate}
            name="end_date"
            label="End Date"
            onChange={handleEndDate}
          />
        </div>
      </div>
      <AddSalaryList BulkSelect={BulkSelect} />
    </>
  );

  const addFooter = (
    <SaveButton loading={isSubmit == false} label="Add" />
  );

  return (
    <>
      <div className="d-flex justify-content-between">
        <PageTitle label="Salary" />

        <div className="d-flex justify-content-around">
          <div className="mr-2 font-weight-bold mb-1">
            <Button
              className="justify-content-end"
              label="Recalculate"
              onClick={calculate}
            />
          </div>
          <div className="mr-2 font-weight-bold mb-1">
            <AddButton
              label="Add Salary"
              onClick={() => {
                _toggle();
              }}
            />
          </div>
          <div className="pl-1 mb-1">
            <DropdownWithCheckbox
              className="overflow-visible d-flex justify-content-between"
              buttonLabel=""
              dropdownLinks={FieldLabels}
              handleChange={(e) => {
                handleColumnChange(e);
              }}
              color="gray"
              hideCaret
              checkedItems={arrayList}
            />
          </div>
        </div>
      </div>

      <AddModal
        modalTitle="Add Salary"
        modalBody={addSalary}
        modalFooter={addFooter}
        isOpen={isOpen}
        toggle={_toggle}
        toggleModalClose={_toggle}
        hideDefaultButtons
        initialValues={initialValues}
        onSubmit={(values) => {
          handleSubmit(values);
        }}

      />
      <ReduxTable
        id="salaryList"
        newTableHeading
        searchPlaceholder="Search"
        apiURL={`${endpoints().salaryAPI}/search`}
        bulkSelect
        onBulkSelect={handleBulkSelect}
        paramsToUrl={true}
        history={history}
        sortByOptions={sortOptions}
        icon={<FontAwesomeIcon icon={faHandHoldingDollar} />}
        message="You can start by clicking on Add New"
        showDateFilter
      >
        <ReduxColumn
          field="salary_number"
          sortBy="salary_number"
          renderField={(row) => (
            <Link to={`/salary/detail/${row.id}`}>{row.salary_number}</Link>
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
        <ReduxColumn field="start_date" sortBy="start_date">
          Start Date
        </ReduxColumn>
        <ReduxColumn field="end_date" sortBy="end_date " >
          End Date
        </ReduxColumn>
        {enable_working_days && enable_working_days == true && (
          <ReduxColumn field="working_days" sortBy="working_days">
            Working Days
          </ReduxColumn>
        )}
        {enable_monthly_salary && enable_monthly_salary == true && (
          <ReduxColumn
            field="monthly_salary"
            sortBy="monthly_salary"
            renderField={(row) => (
              <span>{Currency.Format(row.monthly_salary)}</span>
            )}
          >
            Monthly Salary
          </ReduxColumn>
        )}
        {enable_worked_days && enable_worked_days == true && (
          <ReduxColumn field="worked_days" sortBy="worked_days">
            Worked Days
          </ReduxColumn>
        )}

        {enable_leave && enable_leave == true && (
          <ReduxColumn field="leave" sortBy="leave">
            Leave
          </ReduxColumn>
        )}

        {enable_addtional_days && enable_addtional_days == true && (
          <ReduxColumn field="additional_days" sortBy="additional_days">
            Additional Days
          </ReduxColumn>
        )}

        {enable_basic && enable_basic == true && (
          <ReduxColumn
            field="basic"
            sortBy="basic"
            renderField={(row) => <span>{Currency.Format(row.basic)}</span>}
          >
            Basic
          </ReduxColumn>
        )}

        {enable_HRA && enable_HRA == true && (
          <ReduxColumn
            field="hra"
            sortBy="hra"
            renderField={(row) => <span>{Currency.Format(row.hra)}</span>}
          >
            HRA
          </ReduxColumn>
        )}

        {enable_standrad_allowance && enable_standrad_allowance == true && (
          <ReduxColumn
            field="standard_allowance"
            sortBy="standard_allowance"
            renderField={(row) => (
              <span>{Currency.Format(row.standard_allowance)}</span>
            )}
          >
            Standard Allowance
          </ReduxColumn>
        )}

        {enable_special_allowance && enable_special_allowance == true && (
          <ReduxColumn
            field="special_allowance"
            sortBy="special_allowance"
            renderField={(row) => (
              <span>{Currency.Format(row.special_allowance)}</span>
            )}
          >
            Special Allowance
          </ReduxColumn>
        )}

        {enable_medical_allowance && enable_medical_allowance == true && (
          <ReduxColumn
            field="medical_insurance"
            sortBy="medical_insurance"
            renderField={(row) => (
              <span>{Currency.Format(row.medical_insurance)}</span>
            )}
          >
            Medical Insurance
          </ReduxColumn>
        )}

        {enable_gratuity && enable_gratuity == true && (
          <ReduxColumn
            field="gratuity"
            sortBy="gratuity"
            renderField={(row) => <span>{Currency.Format(row.gratuity)}</span>}
          >
            Gratuity
          </ReduxColumn>
        )}

        {enable_professional_tax && enable_professional_tax == true && (
          <ReduxColumn
            field="professional_tax"
            sortBy="professional_tax"
            renderField={(row) => (
              <span>{Currency.Format(row.professional_tax)}</span>
            )}
          >
            Professional Tax
          </ReduxColumn>
        )}

        {enable_lop_leaves && enable_lop_leaves == true && (
          <ReduxColumn field="lop" sortBy="lop">
            Lop Leaves
          </ReduxColumn>
        )}

        <ReduxColumn
          className="text-right"
          field="net_salary"
          sortBy="net_salary"
          renderField={(row) => (
            <span>{Currency.Format(row.net_salary)}</span>
          )}
        >
          Net Salary
        </ReduxColumn>
      </ReduxTable>
    </>
  );
}

export default salaryList;
