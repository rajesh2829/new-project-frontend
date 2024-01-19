import React, { useEffect, useState } from "react";
import DropdownWithCheckbox from "../../components/DropdownWithCheckbox";
import PageTitle from "../../components/PageTitle";
import TicketList from "../../components/TicketList";
import CreateTicketModel from "../../components/createTicketModel";
import Cookie from "../../helpers/Cookie";
import * as ticketcolumns from "../../helpers/Ticket";
import Cookies, {  setCookie } from "../../lib/Helper";
import Url from "../../lib/Url";

const TicketSearch = (props) => {
  const [array, setArray] = useState([]);
  const [arrayList, setArrayList] = useState([]);
  const [rowValue, setRowValue] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState();
  const [isSubmit, setIsSubmit] = useState(true);
  const FieldLabel = [
    {
      value: ticketcolumns?.FieldLabel?.CREATEDAT,
      label: ticketcolumns?.FieldLabel?.CREATEDAT,
    },
    {
      value: ticketcolumns?.FieldLabel?.REPORTER,
      label: ticketcolumns?.FieldLabel?.REPORTER,
    },
    {
      value: ticketcolumns?.FieldLabel?.PROJECT,
      label: ticketcolumns?.FieldLabel?.PROJECT,
    },
    {
      value: ticketcolumns?.FieldLabel?.SPRINT,
      label: ticketcolumns?.FieldLabel?.SPRINT,
    },
  ];

  const handleColumnChange = async (e) => {
    const array = e;
    let arrayList = [];
    arrayList = JSON.stringify(array);
    setCookie(Cookie.TICKET, arrayList);
    setArray(array);
    setArrayList(array);
  };

  useEffect(() => {
    const checkedList = Cookies.get(Cookie.TICKET);
    const checkedLists = checkedList ? JSON.parse(checkedList) : checkedList;

    if (checkedLists) {
      setArrayList(checkedLists);
      setArray(checkedLists);
    }
  }, []);

  const handleOpenModal = () => {
    setModalOpen(!isModalOpen);
    setIsSubmit(true);
  };
  
  const handleCloseModal = () => {
    setRowValue(null);
    setName("")
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
          <PageTitle label="Tickets" />
        </div>
        <div>
          <div className=" d-flex">
            <div className="mx-2">
            <CreateTicketModel
                buttonLabel="Add New"
                rowValue={rowValue}
                showAddButton
                name={name}
                isModalOpen={isModalOpen}
                setModalOpen={setModalOpen}
                handleCloseModal={handleCloseModal}
              />
            </div>
            <div>
              <DropdownWithCheckbox
                className="overflow-visible d-flex justify-content-between"
                buttonLabel=""
                dropdownLinks={FieldLabel}
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
      </div>

      <TicketList
        history={props.history}
        array={array}
        showDateFilter
        showSprintFilter
        showStatusFilter
        showUserFilter
        showReporterFilter
        newTableHeading
        setRowValue={setRowValue}
        isMultiSelect
        handleOpenModal={handleOpenModal}
        showStatusGroupFilter
        startDateFilter={Url.GetParam("startDate")}
        endDateFilter={Url.GetParam("endDate")}
      />
    </>
  );
};

export default TicketSearch;
