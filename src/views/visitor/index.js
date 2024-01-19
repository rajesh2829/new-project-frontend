import { faCubes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { endpoints } from "../../api/endPoints";
import AddButton from "../../components/AddButton";
import PageTitle from "../../components/PageTitle";
import UserCard from "../../components/UserCard";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import visitorService from "../../services/VisitorService";
import VisitorForm from "./visitorForm";
import DateTime from "../../lib/DateTime";
import Numbers from "../../lib/Number";
import MoreDropdown from "../../components/authentication/moreDropdown";
import { DropdownItem } from "reactstrap";
import Drawer from "../../components/Drawer";
import SaveButton from "../../components/SaveButton";
import { TagTypeName } from "../../helpers/Tag";

const Visitor = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rowValue, setRowValue] = useState("")
  const [selectedFile, setSelectedFile] = useState();
  const [isSubmit, setIsSubmit] = useState(true);
  const dispatch = useDispatch();

  const sortByOption = [
    {
      value: "id:DESC",
      label: "Most recent",
    },
  ];

  const toggle = () => {
    setIsOpen(!isOpen);
    setIsSubmit(true)
  };

  const onDrop = (selectedFile) => {
    setSelectedFile(selectedFile && selectedFile[0])
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    setSelectedFile("")
  }

  const visitorForm = (<VisitorForm onDrop={onDrop} selectedFile={selectedFile} handleDelete={handleDelete} rowValue={rowValue} />)

  const initialValues = {
    visitor: rowValue ? rowValue?.name : "",
    mobileNumber: rowValue ? rowValue?.phone : "",
    purpose: rowValue ? rowValue?.purpose : "",
    notes: rowValue ? rowValue?.notes : "",
    type: rowValue ? {
      value: rowValue?.type,
      label: rowValue?.typeName
    } : "",
    date: rowValue?.created_at ? rowValue?.created_at : ""
  };

  const visitorFooter = (
    <SaveButton type="submit" loading={isSubmit == false} label={rowValue?.id ? "Save" : "Add"} className="h6-5-important" />
  );

  const handleSubmit = async (values) => {
    try {
      setIsSubmit(true)
      const data = new FormData();
      data.append("name", values?.visitor);
      data.append("mobileNumber", values?.mobileNumber);
      data.append("purpose", values?.purpose);
      data.append("notes", values?.notes);
      data.append("type", Numbers.Get(values?.type?.value));

      data.append("media_file", selectedFile ? selectedFile : "");
      dispatch(await visitorService.add(data, () => {
        toggle();
        setIsSubmit(false)
        setSelectedFile("")
      }));
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmit(false)
    }
  };

  const toggleModelClose = () => {
    setRowValue("")
    setSelectedFile("")
    toggle()
    setIsSubmit(true)

  }

  const handleUpdate = async (values) => {
    const data = new FormData();
    data.append("name", values?.visitor ? values?.visitor : rowValue?.name);
    data.append("phone", values?.mobileNumber ? values?.mobileNumber : rowValue?.phone);
    data.append("purpose", values?.purpose ? values?.purpose : rowValue?.purpose);
    data.append("notes", values?.notes ? values?.notes : rowValue?.notes);
    data.append("type", Numbers.Get(values?.type?.value ? values?.type?.value : rowValue?.type));
    dispatch(await visitorService.update(rowValue?.id, data, {}, {}, toggle, dispatch));

  };

  return (
    <>
      <Drawer
        handleOpenModal={toggle}
        handleCloseModal={toggle}
        handleDrawerClose={toggleModelClose}
        isModalOpen={isOpen}
        enableReinitialize
        initialValues={initialValues}
        DrawerBody={visitorForm}
        DrawerFooter={visitorFooter}
        modelTitle={rowValue?.id ? "Edit Visitor" : "Add Visitor"}
        onSubmit={(values) => {
          if (rowValue?.id) {
            handleUpdate(values)
          }
          else {
            handleSubmit(values)
          }

        }}
      />
      <div className="d-flex justify-content-between pb-3">
        <PageTitle label="Visitors" />
        <div className="d-flex">
          <AddButton
            label="Add New"
            onClick={() => {
              toggle();
            }}
          />
        </div>
      </div>

      <ReduxTable
        id="visitors"
        showHeader
        searchPlaceholder="Search"
        newTableHeading
        icon={<FontAwesomeIcon icon={faCubes} />}
        message="You can start by clicking on Add New"
        apiURL={`${endpoints().visitor}/search`}
        sortByOptions={sortByOption}
        showVisitorTypeFilter
        tagPlaceholder={"Visitor Type"}
        tagFilterType={{ type: TagTypeName.VISITOR_TYPE }}
        paramsToUrl={true}
        history={props.history}
      >
        <ReduxColumn
          className="text-left"
          width="140px"
          sortBy="name"
          minWidth="140px"
          maxWidth="140px"
          renderField={(row) => (
            <Link to={`/visitor/${row.id}`}>
              <UserCard
                customSize={parseInt(50, 10)}
                firstName={row.name}
                url={row.media_url}
                mobileNumber={row.phone}

              />
            </Link>
          )
          }
        >
          Name
        </ReduxColumn>
        <ReduxColumn
          field="purpose"
          width="110px"
          minWidth="110px"
          maxWidth="110px"
          sortBy="purpose"
        >
          Purpose
        </ReduxColumn>
        <ReduxColumn field="created_at" sortBy="created_at" className="text-center" width="150px"
          renderField={(row) => (
            <span>{DateTime.getDateTimeByUserProfileTimezone(row.created_at)}</span>
          )}>
          Created At
        </ReduxColumn>
        <ReduxColumn field="typeName" sortBy="typeName" className="text-center" width="150px">
          Type
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
                        toggle()
                        setRowValue(row);
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
    </>
  );
};

export default Visitor;
