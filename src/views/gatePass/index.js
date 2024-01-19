import { faCubes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { endpoints } from "../../api/endPoints";
import AddButton from "../../components/AddButton";
import Button from "../../components/Button";
import AddModal from "../../components/Modal";
import PageTitle from "../../components/PageTitle";
import UserCard from "../../components/UserCard";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import visitorService from "../../services/VisitorService";
import GatePassForm from "./gatePassForm";
import DateTime from "../../lib/DateTime";
import Numbers from "../../lib/Number";
import MoreDropdown from "../../components/authentication/moreDropdown";
import { DropdownItem } from "reactstrap";
import Drawer from "../../components/Drawer";
import SaveButton from "../../components/SaveButton";
import GatePassService from "../../services/GatePassService";
import { fetchList } from "../../actions/table";


const GatePass = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rowValue, setRowValue] = useState("")
  const [selectedFile, setSelectedFile] = useState();
  const [isSubmit, setIsSubmit] = useState(true);
  const [user, setUser] = useState(null);
  const [logedInUser, setLogedInUser] = useState();
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
  }

  const handleDelete = (event) => {
    event.stopPropagation();
    setSelectedFile("")
  }

  const handleUserChange = (e) => {
    let value = e.id;
    setUser(value);
  };

  const gatePassForm = (
    <GatePassForm
      onDrop={onDrop}
      selectedFile={selectedFile}
      handleDelete={handleDelete}
      rowValue={rowValue}
      handleUserChange={handleUserChange}
      user={user}
      logedInUser={logedInUser}
      setLogedInUser={setLogedInUser}
    />)


  const initialValues = {
    notes: rowValue ? rowValue?.notes : "",

  };

  const gatePassFooter = (
    <SaveButton type="submit" loading={isSubmit == false} label={rowValue?.id ? "Save" : "Add"} className="h6-5-important" />
  );

  const handleSubmit = async (values) => {
    try {
      setIsSubmit(true)
      const data = new FormData();
      data.append("notes", values?.notes);
      data.append("owner_id", logedInUser ? logedInUser : user)
      data.append("media_file", selectedFile ? selectedFile : "");
      dispatch(await GatePassService.add(data, (res) => {
        if (res) {
          dispatch(
            fetchList(
              "gatePass",
              `${endpoints().GatePassApi}/search`,
              1,
              25,
              {}
            )
          );
          toggle();
          setIsSubmit(false)
          setSelectedFile("")
        }

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
    data.append("notes", values?.notes ? values?.notes : rowValue?.notes);
    data.append("owner_id", values?.owner_id?.id ? values?.owner_id?.id : rowValue?.owner_id)
    data.append("media_file", selectedFile ? selectedFile : rowValue?.media_url);
    dispatch(await GatePassService.update(rowValue?.id, data, (res) => {
      if (res) {
        dispatch(
          fetchList(
            "gatePass",
            `${endpoints().GatePassApi}/search`,
            1,
            25,
            {}
          )
        );
        toggle();
        setIsSubmit(false)
        setSelectedFile("")
      }
    }));

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
        DrawerBody={gatePassForm}
        DrawerFooter={gatePassFooter}
        modelTitle={rowValue?.id ? "Edit Gate Pass" : "Add Gate Pass"}
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
        <PageTitle label="Gate Pass" />
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
        id="gatePass"
        showHeader
        searchPlaceholder="Search"
        newTableHeading
        icon={<FontAwesomeIcon icon={faCubes} />}
        message="You can start by clicking on Add New"
        apiURL={`${endpoints().GatePassApi}/search`}
        sortByOptions={sortByOption}
        paramsToUrl={true}
        history={props.history}
      >
        <ReduxColumn
          field="user"
          className="ellipsis text-left"
          sortBy="owner_id"
          renderField={(row) => (
            <>
              <Link to={`/gatePass/${row.id}`}>

                <UserCard
                  customSize={parseInt(50, 10)}
                  firstName={row.first_name}
                  url={row.owner_media_url}
                  lastName={row.last_name}
                />
              </Link>

            </>
          )}
        >
          Owner
        </ReduxColumn>
        <ReduxColumn
          field="notes"
          minWidth="170px"
          sortBy="notes"
        >
          Notes
        </ReduxColumn>
        <ReduxColumn field="createdAt" sortBy="createdAt" className="text-center" width="150px"
          renderField={(row) => (
            <span>{DateTime.getDateTimeByUserProfileTimezone(row.createdAt)}</span>
          )}>
          Created At
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

export default GatePass;
