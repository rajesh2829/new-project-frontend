import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { endpoints } from "../../api/endPoints";
import { apiClient } from "../../apiClient";
import Action from "../../components/Action";
import BreadCrumb from "../../components/Breadcrumb";
import DeleteModal from "../../components/DeleteModal";
import Form from "../../components/Form";
import PageTitle from "../../components/PageTitle";
import SelectDropdown from "../../components/SelectDropdown";
import Spinner from "../../components/Spinner";
import { Status } from "../../helpers/Product";
import Number from "../../lib/Number";
import RecurringActiviteService from "../../services/RecurringActivityService";
import ActiviteDetailsForm from "./components/activityDetailForm";
const activityDetailPage = (props) => {
  const { history } = props;

  const recurringActiviteTab = {
    GENERAL: "General",
    TICKET : "Tickets",
    HISTORY : "History",
    
  };

  const [detail, setDetail] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState( recurringActiviteTab.GENERAL);
  const [isOpen, setIsOpen] = useState(false);

  const id = props.match.params.id;
  const dispatch = useDispatch();

 
  const breadcrumbList = [
    { label: "Home", link: "/dashboard/ticket" },
    {
      label: "Recurring Activity",
      link: "/recurringActivity"
    },
    {
      label: "Recurring Activity Details",
      link: ""
    }
  ];
  const toggle = (tab) => {
    setIsOpen(!isOpen);
    setActiveTab(tab);
  };

  const _handleChange = (tabStatus) => {
    props.history.push(`/recurringActivity/details/${id}?tab=${tabStatus}`);
  };
  const generalTabChange = () => {
    toggle(recurringActiviteTab.GENERAL);
    _handleChange(recurringActiviteTab.GENERAL);
  };

  const ticketTabChange = () => {
    toggle(recurringActiviteTab.TICKET);
    _handleChange(recurringActiviteTab.TICKET);
  };
  const historyTabChange = () => {
    toggle(recurringActiviteTab.HISTORY);
    _handleChange(recurringActiviteTab.HISTORY);
  };
  const NavTabList = [
    {
      label: recurringActiviteTab.GENERAL,
      onClick: generalTabChange,
      className: classNames({ active: activeTab === recurringActiviteTab.GENERAL }),
    },
    {
      label: recurringActiviteTab.TICKET,
      onClick: ticketTabChange,
      className: classNames({
        active: activeTab === recurringActiviteTab.TICKET,
      }),
    }, 
    {
      label: recurringActiviteTab.HISTORY,
      onClick: historyTabChange,
      className: classNames({
        active: activeTab === recurringActiviteTab.HISTORY,
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
        `${endpoints().RecurringActivityAPI}/${id}`
      );
      setDetail(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };


  const taskDelete = () => {
    dispatch(RecurringActiviteService.delete(id, {}));
    history.push("/recurringActivity");
  };

  const handleStatusChange = async (status) => {
    let statusId = Number.Get(status);
    if (status) {
      dispatch(RecurringActiviteService.updateStatus(id, { status: statusId }, {}));
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

        <ActiviteDetailsForm
          history={history}
          className="col-lg-7"
          details={detail}
          edit={true}
          ticketId={id}
          recurringActiviteTab = {recurringActiviteTab}
          NavTabList = {NavTabList}
          activeTab = {activeTab}
        />
      </Form>
    </>
  );
};
export default activityDetailPage;
