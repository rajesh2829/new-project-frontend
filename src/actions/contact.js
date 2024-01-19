/* CONTACT */
export const REQUEST_ADD_CONTACT = "REQUEST_ADD_CONTACT";
export const RECEIVE_ADD_CONTACT = "RECEIVE_ADD_CONTACT";
export const CONTACT_ADD_ERROR = "CONTACT_ADD_ERROR";
export const REQUEST_DELETE_CONTACT = "REQUEST_DELETE_CONTACT";
export const RECEIVE_DELETE_CONTACT = "RECEIVE_DELETE_CONTACT";
export const CONTACT_DELETE_ERROR = "CONTACT_DELETE_ERROR";

/**
 * Request for creating contact
 */
export function requestAddContact() {
  return {
    type: REQUEST_ADD_CONTACT,
  };
}

/**
 * Receive for receive contact
 */
export function receiveContactAdd() {
  return {
    type: RECEIVE_ADD_CONTACT,
  };
}

/**
 * Receive for error creating contact
 */
export function contactCreateError(error) {
  return {
    type: CONTACT_ADD_ERROR,
    error,
  };
}

/**
 * Delete the contact
 */
export function requestDeleteContact() {
  return {
    type: REQUEST_DELETE_CONTACT,
  };
}

/**
 * Receive for receive delete contact
 */
export function receiveDeleteContact() {
  return {
    type: RECEIVE_DELETE_CONTACT,
  };
}

/**
 * Receive for error delete contact
 */
export function contactDeleteError(error) {
  return {
    type: CONTACT_DELETE_ERROR,
    error,
  };
}
