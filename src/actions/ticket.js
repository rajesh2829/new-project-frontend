import { endpoints } from "../api/endPoints";
import { isBadRequest } from "../lib/Http";
import toast from "../components/Toast";
import { fetchList } from "./table";
import * as ticketConstants from "../helpers/Tickets";
import { apiClient } from "../apiClient";

/**
 * Receive for error creating PortalUser
 */
export function TicketCreateError(error) {
  return {
    type: ticketConstants.TICKET_CREATE_ERROR,
    error,
  };
}
/**
 * Create New Media
 */
export function requestAddTicketMedia() {
  return {
    type: ticketConstants.REQUEST_ADD_TICKET_MEDIA,
  };
}
export function receiveTicketMedia() {
  return {
    type: ticketConstants.RECEIVE_ADD_TICKET_MEDIA,
  };
}

/**
 * Receive for deleting item
 */
export function receiveDeleteMedia() {
  return {
    type: ticketConstants.RECEIVE_DELETE_MEDIA,
  };
}

/**
 * Request for deleting item
 */
export function requestDeleteMedia() {
  return {
    type: ticketConstants.REQUEST_DELETE_MEDIA,
  };
}

/**
 * Receive for error deleting item
 */
export function mediaDeleteError(error) {
  return {
    type: ticketConstants.MEDIA_DELETE_ERROR,
    error,
  };
}

/**
 * Receive for error creating task
 */
export function ticketMediaCreateError(error) {
  return {
    type: ticketConstants.TICKET_MEDIA_ADD_ERROR,
    error,
  };
}
/**
 * Request for creating PortalUser
 */
export function requestCreateTicket() {
  return {
    type: ticketConstants.REQUEST_CREATE_TICKET,
  };
}

/**
 * Receive for receive PortalUser
 */
export function receiveCreateTicket() {
  return {
    type: ticketConstants.RECEIVE_CREATE_TICKET,
  };
}

/**
 * Request for updating Company
 */
export function requestUpdateTicket() {
  return {
    type: ticketConstants.REQUEST_UPDATE_TICKET,
  };
}

/**
 * Receive for error updating Company
 */
export function TicketUpdateError(error) {
  return {
    type: ticketConstants.TICKET_UPDATE_ERROR,
    error,
  };
}

/**
 * Request for deleting Ticket
 */
export function requestDeleteTicket() {
  return {
    type: ticketConstants.REQUEST_DELETE_TICKET,
  };
}

/**
 * Receive for error deleting Store
 */
export function ticketDeleteError(error) {
  return {
    type: ticketConstants.TICKET_DELETE_ERROR,
    error,
  };
}


export function addTicketMedia(data, params, taskId, status) {
  return (dispatch) => {
    dispatch(requestAddTicketMedia());

    return apiClient
    .post(`${endpoints().mediaAPI}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
          status(true);
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            "task-media",
            `${endpoints().mediaAPI}/search`,
            1,
            25,
            params
          )
        );
        dispatch(receiveTicketMedia());
      })
      .catch((error) => {
        dispatch(ticketMediaCreateError(error));

        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(errorMessage);
          console.error(errorMessage);
        }
      });
  };
}

export function deleteMedia(id, params) {
  return (dispatch) => {
    dispatch(requestDeleteMedia());

    apiClient
      .delete(`${endpoints().mediaAPI}/${id}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            "task-media",
            `${endpoints().mediaAPI}/search`,
            1,
            25,
            params
          )
        );
        dispatch(receiveDeleteMedia());
      })
      .catch((error) => {
        dispatch(mediaDeleteError(error));
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(errorMessage);
        }
      });
  };
}

export async function updateTicket(id, data, params) {
  return (dispatch) => {
    dispatch(requestUpdateTicket());
     apiClient
      .put(`${endpoints().ticketsAPI}/${id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .catch((error) => {
        dispatch(TicketUpdateError(error));

        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(error.response.data.message);
          console.error(errorMessage);
        }
      });
  };
}


export function deleteTicket(id, params) {
  return (dispatch) => {
    dispatch(requestDeleteTicket());

    apiClient
      .delete(`${endpoints().ticketAPI}/${id}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toast.success(successMessage);
        }
      })
      .then(() => {
        dispatch(
          fetchList("ticket", `${endpoints().ticketAPI}/search`, 1, 25, params)
        );
      })
      .catch((error) => {
        dispatch(ticketDeleteError(error));
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(errorMessage);
        }
      });
  };
}