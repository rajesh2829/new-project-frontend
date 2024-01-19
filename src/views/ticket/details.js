import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { EditorState, convertFromRaw } from "draft-js";

// Components
import Action from "../../components/Action";
import BreadCrumb from "../../components/Breadcrumb";
import DeleteModal from "../../components/DeleteModal";
import Form from "../../components/Form";
import PageTitle from "../../components/PageTitle";
import Status from "../../components/Status";
import CreateTicketModel from "../../components/createTicketModel";
import TicketDetailsForm from "./components/ticketDetailsForm";
import PageNotFound from "../../components/PageNotFound";
import Spinner from "../../components/Spinner";

// Services
import TicketService from "../../services/TicketService";
import { hasPermission } from "../../services/UserRolePermissionService";

// Helpers
import ObjectName from "../../helpers/ObjectName";
import Permission from "../../helpers/Permission";
import Urls from "../../helpers/Url";

// API
import { endpoints } from "../../api/endPoints";
import { apiClient } from "../../apiClient";
import { deleteTicket } from "../../actions/ticket";


const ticketDetail = (props) => {
  const { history } = props;
  const [detail, setDetail] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editorState, setEditorState] = useState()
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const id = props.match.params.id;
  const breadcrumbList = [
    { label: "Home", link: "/locationDashboard" },
    {
      label: "Ticket",
      link: Urls.TICKET_LIST
    },
    {
      label: "Ticket Details",
      link: ""
    }
  ];

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    if (loading == true) {
      getDetails();
    }
  }, [loading]);


  let showTicketDelete = hasPermission(Permission.TICKET_DELETE);

  const dispatch = useDispatch();

  const ticketDelete = (id) => {
    dispatch(
      deleteTicket(id, {
        projectId: detail?.project
      })
    );
    history.push(Urls.TICKET_LIST);
  };

  const getDetails = async () => {
    setIsLoading(true)
    try {
      let params = {
        slug: props?.match?.params?.project,
        ticket_number: id
      }
      const response = await apiClient.get(`${endpoints().ticketAPI}/${JSON.stringify(params)}`);
      setDetail(response?.data);
      setIsLoading(false)
      setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(response?.data?.description))))
    } catch (err) {
      console.error(err);
    }
  };


  const onStatusChange = (value) => {
    let data = {};
    data.status = value;
    data.statusName = value && value?.label;
    dispatch(
      TicketService.updateStatus(detail?.id, data, (response) => {
        if (response) {
          getDetails();
        }
      })
    );
  };

  const handleCloseModal = () => {
    setModalOpen(!isModalOpen)
  };

  const handleTicketClone = async () => {
    setModalOpen(!isModalOpen)
    getDetails()
  }

  const initialValues = {
    status: {
      label: detail && detail.statusName,
      value: detail && detail.status
    }
  };

  const actionOptions = [
    {
      label: "Clone",
      value: "Clone"
    },
    {
      label: "Delete",
      value: "Delete"
    }
  ];

  const handleChange = (e) => {
    if (e == "Delete") {
      setDeleteModal(true);
    }
    if (e == "Clone") {
      handleTicketClone();
    }
  };

  // Form initial values
  return (
    <>
      <CreateTicketModel
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        handleCloseModal={handleCloseModal}
        cloneValue={detail}
      />
      <DeleteModal
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        title='Delete Ticket'
        id={detail?.id}
        label={detail?.ticket_number}
        deleteFunction={ticketDelete}
      />
      <Form initialValues={initialValues} enableReinitialize>
        <BreadCrumb list={breadcrumbList} />
        <div className='d-flex justify-content-between'>
          <PageTitle label={`Ticket #${detail?.ticket_number}`} />
          <div className='d-flex justify-content-between '>
            <div className='mx-2'>
              <Status
                objectName={ObjectName.TICKET}
                handleChange={onStatusChange}
                buttonLabel={detail?.statusName}
                currentStatusId={detail?.statusId}
                projectId={detail?.project}
              />
            </div>
            <div style={{ height: '10px' }}>
              {showTicketDelete ? (
                <Action
                  dropdownLinks={actionOptions}
                  handleChange={handleChange}
                />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        <TicketDetailsForm
          history={history}
          className='col-lg-7'
          details={detail}
          edit={true}
          ticketId={detail?.id}
          editorStates={editorState}
          setEditorState={setEditorState}
          setLoading={setLoading}
        />
      </Form>

    </>
  );
};
export default ticketDetail;
