import React, { useEffect, useState } from "react";
import { apiClient } from "../../apiClient";

// Components
import PageTitle from "../../components/PageTitle";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";

// import { Status } from "../../helpers/Product";
import { useDispatch } from "react-redux";
import { endpoints } from "../../api/endPoints";
import Currency from "../../lib/Currency";

import { Link } from "react-router-dom";
import Url from "../../lib/Url";
import CompanyUserService from "../../services/UserService";

import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddButton from "../../components/AddButton";
import Numbers from "../../lib/Number";

import ObjectName from "../../helpers/ObjectName";
import DateTime from "../../lib/DateTime";
import StatusService from "../../services/StatusService";

import UserCard from "../../components/UserCard";
import { Fine } from "../../helpers/Fine";
import ArrayList from "../../lib/ArrayList";
import String from "../../lib/String";
import fineService from "../../services/FineService";
import FineForm from "./fineForm";
import MediaUpload from "../../helpers/MediaUpload";
import StatusText from "../../components/StatusText";
import Drawer from "../../components/Drawer";
import SaveButton from "../../components/SaveButton";
import MoreDropdown from "../../components/authentication/moreDropdown";
import { DropdownItem } from "reactstrap";
import { fetchList } from "../../actions/table";

// Tabs Constants
const Fines = (props) => {
  const { history } = props;
  const [isOpen, setIsOpen] = useState();
  const [userData, setUserData] = useState([]);
  const [fineTypeData, setFineTypeData] = useState();
  const [status, setStatus] = useState();
  const [defaultAmount, setDefaultAmount] = useState();
  const [type, setType] = useState();
  const [date, setDate] = useState();
  const [user, setuser] = useState();
  const [selectedFile, setSelectedFile] = useState("");
  const [productTagList, setProductTagList] = useState();
  const [rowValue, setRowValue] = useState(null);
  const [isSubmit, setIsSubmit] = useState(true);

  const dispatch = useDispatch();

  const buttonLabel = true;

  useEffect(() => {
    getStatus();
    getSeletedTagDetails();
    getUserList();
  }, []);

  const handleDelete = (event) => {
    event.stopPropagation();
    setSelectedFile("");
  };

  const handleSubmit = async (values) => {
    try {
      const data = new FormData();
      data.append("date", values.date);
      data.append("due_date", values && values.due_date);
      data.append("user", Numbers.Get(values?.user?.id));
      data.append("type", Numbers.Get(values?.type?.value));
      data.append("amount", values?.amount ? values?.amount : "");
      data.append("status", Numbers.Get(status));
      data.append("due_date", values?.due_date ? values?.due_date : "");
      data.append("notes", String.Get(values?.notes ? values?.notes : ""));
      data.append("reviewer", Numbers.Get(values?.reviewer?.id));
      if (rowValue && rowValue?.id) {
        await fineService.update(rowValue?.id, data, (res) => {
          if (res) {
            dispatch(
              fetchList("fines", `${endpoints().fineApi}/search`, 1, 25, {
                sort: Url.GetParam("sort"),
                sortDir: Url.GetParam("sortDir")
              })
            );
            closeToggle();
          }
        });
      } else {
        await dispatch(
          fineService.add(
            data,
            {
              sort: Url.GetParam("sort"),
              sortDir: Url.GetParam("sortDir")
            },
            (response) => {
              if (response) {
                MediaUpload.uploadFile(selectedFile, response, ObjectName.FINE);
              }
            }
          )
        );
      }
      toggle();
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmit(false);
    }
  };

  const getSeletedTagDetails = async () => {
    try {
      const response = await apiClient.get(`${endpoints().tagApi}/list`);

      const tagDetails = response.data.data;

      const tagList = [];
      if (ArrayList.isNotEmpty(tagDetails)) {
        tagDetails &&
          tagDetails.forEach((tag) => {
            if (tag.type == "FineType") {
              tagList.push({
                label: tag.name,
                value: tag.id,
                id: tag.id,
                status: tag.status
              });
            }
          });
      }
      setProductTagList(tagList);
    } catch (err) { }
  };

  const getStatus = async () => {
    const status = await StatusService.search(
      ObjectName.FINE,
      Fine.STATUS_DRAFT
    );
    for (let i = 0; i < status.length; i++) {
      setStatus(status[i]?.id);
    }
  };

  const sortByOption = [
    {
      value: "id:DESC",
      label: "Most Recent"
    }
  ];

  const getUserList = async () => {
    const data = await CompanyUserService.list();

    const userList = [];
    data &&
      data.data.forEach((list) => {
        userList.push({
          value: list.id,
          label: list.first_name + " " + list.last_name
        });
      });
    setUserData(userList);
  };

  const toggle = () => {
    setuser("");
    setDate("");
    setType("");
    setDefaultAmount("");
    setIsOpen(!isOpen);
    setSelectedFile("");
    setIsSubmit(true);
  };

  const closeToggle = () => {
    setIsOpen(!isOpen);
    setRowValue(null);
    setIsSubmit(true);
  };

  const getUserName = (media_url, firstName, lastName) => {
    return (
      <div className="d-flex">
        <UserCard
          id="avatar"
          firstName={firstName}
          lastName={lastName}
          url={media_url}
        />
      </div>
    );
  };

  const handleTagChange = (values) => {
    let value = values;
    setDefaultAmount(value.amount);
  };

  const onDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles && acceptedFiles[0]);
  };

  const accountForm = (
    <FineForm
      onDrop={onDrop}
      selectedFile={selectedFile}
      handleDelete={handleDelete}
      rowValue={rowValue}
      handleTagChange={handleTagChange}
    />
  );
  
  const activityFooter = (
    <div>
      <SaveButton
        type="submit"
        loading={isSubmit == false}
        label={rowValue?.id ? "Save" : "Add"}
      />
    </div>
  );

  return (
    <>
      <Drawer
        modelTitle={rowValue?.id ? "Edit Fine " : "Add Fine"}
        DrawerBody={accountForm}
        DrawerFooter={activityFooter}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        initialValues={{
          date: rowValue?.date
            ? rowValue?.date
            : date
              ? DateTime.getTodayDateByUserTimeZone(date)
              : DateTime.getTodayDateByUserTimeZone(new Date()),
          user: rowValue
            ? {
              label: getUserName(
                rowValue?.media_url,
                rowValue?.firstName,
                rowValue?.lastName
              ),
              value: rowValue?.userId
            }
            : (userData && userData.find((data) => data.id == user)) || "",
          type: rowValue
            ? {
              label: rowValue?.type,
              value: rowValue?.typeId
            }
            : (fineTypeData &&
              fineTypeData.find((data) => data.value == type)) ||
            "",
          notes: "" || rowValue?.notes ? rowValue?.notes : "",
          reviewer: rowValue?.reviewerId ? userData && userData.find((data) => data.value == rowValue?.reviewerId) : "",
          amount: Numbers.Get(defaultAmount)
            ? Numbers.Get(defaultAmount)
            : rowValue?.amount
              ? rowValue?.amount
              : "",
          due_date: rowValue?.due_date
            ? rowValue?.due_date
            : DateTime.getTodayDateByUserTimeZone(date)
        }}
        enableReinitialize
        handleOpenModal={toggle}
        handleCloseModal={closeToggle}
        handleDrawerClose={toggle}
        isModalOpen={isOpen}
        buttonLabel={buttonLabel}
      />
      <div className="d-flex justify-content-between pb-3">
        <PageTitle label="Fines" />
        <div className="d-flex">
          <AddButton
            label="Add New"
            onClick={() => {
              toggle();
              setRowValue("");
            }}
          />
        </div>
      </div>

      <div>
        <ReduxTable
          id="fines"
          showHeader
          newTableHeading
          apiURL={`${endpoints().fineApi}/search`}
          searchPlaceholder="Search"
          totalAmount
          params={{
            sort: Url.GetParam("sort"),
            sortDir: Url.GetParam("sortDir"),
            objectName: ObjectName.FINE
          }}
          sortByOptions={sortByOption}
          showTypeFilter
          customTypeOption={productTagList}
          showDateFilter
          showUserFilter
          showStatusFilter
          paramsToUrl={true}
          history={props.history}
          icon={<FontAwesomeIcon icon={faCartShopping} />}
          message="You can start by clicking on Add Order">
          <ReduxColumn
            width="130px"
            minWidth="100px"
            maxWidth="90px"
            field="id"
            sortBy="createdAt"
            type="link"
            isClickable="true"
            className="text-center"
            renderField={(row) => <Link to={`/fine/${row.id}`}>{row.id}</Link>}>
            Fine#
          </ReduxColumn>
          <ReduxColumn
            width="100px"
            className="text-center"
            minWidth="90px"
            maxWidth="130px"
            sortBy="date"
            renderField={(row) => <span>{DateTime.getDate(row.date)}</span>}>
            Date
          </ReduxColumn>
          <ReduxColumn
            field="user"
            className="ellipsis text-left"
            sortBy="user_id"
            renderField={(row) => (
              <>
                <UserCard
                  customSize={parseInt(50, 10)}
                  firstName={row.firstName}
                  url={row.media_url}
                  lastName={row.lastName}
                />
              </>
            )}>
            User
          </ReduxColumn>
          <ReduxColumn
            field="type"
            className="ellipsis text-center"
            minWidth="130px"
            sortBy="type">
            Type
          </ReduxColumn>

          <ReduxColumn
            sortBy="amount"
            width="90px"
            minWidth="130px"
            className="text-right"
            renderField={(row) => <span>{Currency.Format(row.amount)}</span>}>
            Amount
          </ReduxColumn>

          <ReduxColumn
            field="status"
            sortBy="status"
            width={"120px"}
            minWidth="120px"
            maxWidth="120px"
            className="column-status"
            renderField={(row) => (
              <StatusText
                backgroundColor={row.statusColor}
                status={row.status}
              />
            )}>
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
                          toggle();
                        }}>
                        Quick View
                      </DropdownItem>
                    </MoreDropdown>
                  </div>
                </div>
              </>
            )}>
            Action
          </ReduxColumn>
        </ReduxTable>
      </div>
    </>
  );
};

export default Fines;
