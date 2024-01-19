import React, { useState } from "react";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable/index";
import { endpoints } from "../../api/endPoints";
import Drawer from "../../components/Drawer";
import PageTitle from "../../components/PageTitle";
import DateSelector from "../../components/Date";
import Text from "../../components/Text";
import Phone from "../../components/Phone";
import TextArea from "../../components/TextArea";
import { useDispatch } from "react-redux";
import LeadService from "../../services/LeadService";
import DateTime from "../../lib/DateTime";
import { fetchList } from "../../actions/table";
import MoreDropdown from "../../components/authentication/moreDropdown";
import { DropdownItem } from "reactstrap";
import StatusText from "../../components/StatusText";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import DeleteButton from "../../components/DeleteButton";
import SaveButton from "../../components/SaveButton";
const LeadListPage = (props) => {
  let { history } = props;

  const [rowValue, setRowValue] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(true);
  let dispatch = useDispatch();

  let modelBody = (
    <>
      <DateSelector name="date" label="Date" required />
      <Text name="name" label="Name" required />
      <Phone
        name="mobile"
        label="Mobile Number"
        placeholder="Enter Mobile Number"
        error=""
        fontBolded
        required
      />
      <TextArea
        name="notes"
        label="Notes"
        placeholder="Enter Notes..."
        error=""
        fontBolded
      />
    </>
  );

  const handleDelete = async () => {
    dispatch(
      await LeadService.delete(rowValue && rowValue?.id, (res) => {
        if (res) {
          dispatch(
            fetchList("leads", `${endpoints().LeadApi}/search`, 1, 25, {})
          );
          Toggle();
          setRowValue(null);
        }
      })
    );
  };

  let modelFooter = (
    <>
      <SaveButton
        type="submit"
        label={rowValue && rowValue?.id ? "Edit" : "Add"}
        className="h6-5-important"
        loading={isSubmit == false}
      />

      {rowValue && rowValue?.id && <DeleteButton
        className="ml-3"
        label="Delete"
        onClick={() => {
          handleDelete();
        }}
      />}
    </>
  );

  const handleLeadChange = async (values) => {
    try {
      let data = new FormData();
      data.append("name", values && values?.name ? values?.name : "");
      data.append(
        "date",
        values && values?.date ? DateTime.formatDate(values?.date) : ""
      );
      data.append("notes", values && values?.notes ? values?.notes : "");
      data.append("mobile", values && values?.mobile ? values?.mobile : "");
      if (rowValue && rowValue?.id) {
        dispatch(
          await LeadService.update(rowValue && rowValue?.id, data, (res) => {
            if (res) {
              dispatch(
                fetchList("leads", `${endpoints().LeadApi}/search`, 1, 25, {})
              );
              Toggle();
              setRowValue(null);
            }
          })
        );
      } else {
        dispatch(
          await LeadService.create(data, setIsSubmit, (res) => {
            if (res) {
              dispatch(
                fetchList("leads", `${endpoints().LeadApi}/search`, 1, 25, {})
              );
              Toggle();
              setIsSubmit(false)
            }
          })
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmit(false)
    }
  };

  const Toggle = () => {
    setIsOpen(!isOpen);
    setIsSubmit(true)
  };

  const closeToggle = () => {
    setIsOpen(!isOpen);
    setRowValue(null);
    setIsSubmit(true)
  };

  return (
    <div>
      <Drawer
        modelTitle={rowValue?.id ? "Edit Lead" : "Add Lead"}
        DrawerBody={modelBody}
        DrawerFooter={modelFooter}
        onSubmit={(values) => {
          handleLeadChange(values);
        }}
        initialValues={{
          date: rowValue ? rowValue?.date : new Date(),
          mobile: rowValue ? rowValue?.mobile_number : "",
          name: rowValue ? rowValue?.name : "",
          notes: rowValue ? rowValue?.notes : "",
        }}
        handleOpenModal={Toggle}
        handleCloseModal={closeToggle}
        handleDrawerClose={closeToggle}
        isModalOpen={isOpen}
      />
      <PageTitle
        label="Leads"
        buttonHandler={() => {
          Toggle();
        }}
        buttonLabel="Add"
      />
      <ReduxTable
        id="leads"
        showHeader
        newTableHeading
        showDropdown
        params={{}}
        sortByDropdown={true}
        searchPlaceholder="Search"
        apiURL={`${endpoints().LeadApi}/search`}
        history={history}
        paramsToUrl={true}
      >
        <ReduxColumn
          field="name"
          sortBy="name"
          className="text-center"
          renderField={(row) => <Link to={`/lead/${row.id}`}>{row.name}</Link>}
        >
          Name
        </ReduxColumn>
        <ReduxColumn
          field="date"
          sortBy="date"
          className="text-center"
          renderField={(row) => <span>{DateTime.getDate(row.date)}</span>}
        >
          Date
        </ReduxColumn>
        <ReduxColumn
          field="mobile_number"
          sortBy="mobile_number"
          className="text-center"
        >
          Mobile Number
        </ReduxColumn>
        <ReduxColumn field="notes" sortBy="notes" className="text-center">
          Notes
        </ReduxColumn>
        <ReduxColumn
          field="status"
          sortBy="status"
          className="text-center"
          renderField={(row) => (
            <StatusText
              backgroundColor={row?.color_code}
              status={row?.status_name}
            />
          )}
        >
          Status
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
                      onClick={() => {
                        setRowValue(row);
                        Toggle();
                      }}
                    >
                      Quick View
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
    </div>
  );
};
export default LeadListPage;
