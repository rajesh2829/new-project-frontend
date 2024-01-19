import React, { useEffect, useState } from "react";
import Form from "../../components/Form";
import { endpoints } from "../../api/endPoints";
import { apiClient } from "../../apiClient";
import BreadCrumb from "../../components/Breadcrumb";
import PageTitle from "../../components/PageTitle";
import TaskDetailsForm from "./components/taskDetailForm";
import DeleteButton from "../../components/DeleteButton";
import DeleteModal from "../../components/DeleteModal";
import Urls from "../../helpers/Url";
import { Status } from "../../helpers/Product";
import { useDispatch } from "react-redux";
import SelectDropdown from "../../components/SelectDropdown";
import RecurringService from "../../services/RecurringService";
import Number from "../../lib/Number";
import Spinner from "../../components/Spinner";
import Action from "../../components/Action";
import classNames from "classnames";
const taskDetail = (props) => {
  const { history } = props;

  const recurringTaskTab = {
    GENERAL: "General",
    TICKET : "Tickets",
    HISTORY : "History",
    
  };

  const [detail, setDetail] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState( recurringTaskTab.GENERAL);
  const [isOpen, setIsOpen] = useState(false);

  const id = props.match.params.id;
  const dispatch = useDispatch();

 
  const breadcrumbList = [
    { label: "Home", link: "/dashboard/ticket" },
    {
      label: "Recurring",
      link: Urls.RECURRING_TASK_LIST
    },
    {
      label: "Recurring Details",
      link: ""
    }
  ];
  const toggle = (tab) => {
    setIsOpen(!isOpen);
    setActiveTab(tab);
  };

  const _handleChange = (tabStatus) => {
    props.history.push(`/recurringTask/details/${id}?tab=${tabStatus}`);
  };
  const generalTabChange = () => {
    toggle(recurringTaskTab.GENERAL);
    _handleChange(recurringTaskTab.GENERAL);
  };

  const ticketTabChange = () => {
    toggle(recurringTaskTab.TICKET);
    _handleChange(recurringTaskTab.TICKET);
  };
  const historyTabChange = () => {
    toggle(recurringTaskTab.HISTORY);
    _handleChange(recurringTaskTab.HISTORY);
  };
  const NavTabList = [
    {
      label: recurringTaskTab.GENERAL,
      onClick: generalTabChange,
      className: classNames({ active: activeTab === recurringTaskTab.GENERAL }),
    },
    {
      label: recurringTaskTab.TICKET,
      onClick: ticketTabChange,
      className: classNames({
        active: activeTab === recurringTaskTab.TICKET,
      }),
    }, 
    {
      label: recurringTaskTab.HISTORY,
      onClick: historyTabChange,
      className: classNames({
        active: activeTab === recurringTaskTab.HISTORY,
      }),
    }, 
  ];

  const actionsMenuList = [
    {
      value: "delete",
      label: "Delete",
    },
  ];
  const handleActionChange = (e) => {
    if (e == "delete") {
      setDeleteModal(true);
    }

  };


  const statusOptions =
    detail && detail?.status == Status.INACTIVE
      ? [
        {
          label: Status.ACTIVE,
          value: Status.ACTIVE_VALUE
        }
      ]
      : detail && detail?.status == Status.ACTIVE
        ? [
          {
            label: Status.INACTIVE,
            value: Status.INACTIVE_VALUE
          }
        ]
        : [
          {
            label: Status.ACTIVE,
            value: Status.ACTIVE_VALUE
          }
        ];
  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get(
        `${endpoints().RecurringTaskAPI}/${id}`
      );
      setDetail(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };


  const taskDelete = () => {
    dispatch(RecurringService.delete(id, {}));
    history.push("/recurringTask");
  };

  const handleStatusChange = async (status) => {
    let statusId = Number.Get(status);
    if (status) {
      dispatch(RecurringService.updateStatus(id, { status: statusId }, {}));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  // Form initial values
  return (
    <>
      <DeleteModal
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title="Delete Ticket"
        id={detail?.id}
        label={detail?.item}
        deleteFunction={taskDelete}
      />
      <Form>
        <BreadCrumb list={breadcrumbList} />
        <div className="d-flex justify-content-between">
          <PageTitle label={detail?.item} />
          <div className="d-flex align-items-center justify-content-around">
            <SelectDropdown
              className="px-2"
              visible="visible"
              clearable
              dropdownLinks={statusOptions}
              handleChange={(e) => handleStatusChange(e)}
              buttonLabel={detail?.status ? detail?.status : "Status"}
              hideCaret
            />

            <div className="pl-2">
              <Action
                dropdownLinks={actionsMenuList}
                handleChange={handleActionChange}
              />
            </div>
          </div>
        </div>

        <TaskDetailsForm
          history={history}
          className="col-lg-7"
          details={detail}
          edit={true}
          ticketId={id}
          recurringTaskTab = {recurringTaskTab}
          NavTabList = {NavTabList}
          activeTab = {activeTab}
        />
      </Form>
    </>
  );
};
export default taskDetail;
