
/* purchase order Entry */
const Candidate = {
    REQUEST_DELETE: "REQUEST_DELETE",
    RECEIVE_DELETE: "RECEIVE_DELETE",
  
    REQUEST_ADD: "REQUEST_ADD",
    RECEIVE_ADD: "RECEIVE_ADD",
    ADD_ERROR: "ADD_ERROR",
  
    REQUEST_UPDATE: "REQUEST_UPDATE",
    RECEIVE_UPDATE: "RECEIVE_UPDATE",
    UPDATE_ERROR: "UPDATE_ERROR",
    DELETE_ERROR: "DELETE_ERROR",
  
  
    REQUEST_DELETE_CANDIDATE: "REQUEST_DELETE_CANDIDATE",
    RECEIVE_DELETE_CANDIDATE: "RECEIVE_DELETE_CANDIDATE",
    CANDIDATE_DELETE_ERROR: "CANDIDATE_DELETE_ERROR",
  
    REQUEST_UPDATE_CANDIDATE: "REQUEST_UPDATE_CANDIDATE",
    RECEIVE_UPDATE_CANDIDATE: "RECEIVE_UPDATE_CANDIDATE",
    CANDIDATE_UPDATE_ERROR: "CANDIDATE_UPDATE_ERROR",
  
    
    REQUEST_UPDATE_STATUS_CANDIDATE:"REQUEST_UPDATE_STATUS_CANDIDATE",
    RECEIVE_UPDATE_STATUS_CANDIDATE:"RECEIVE_UPDATE_STATUS_CANDIDATE",
    CANDIDATE_UPDATE_STATUS_ERROR:"CANDIDATE_UPDATE_STATUS_ERROR"
  
  }
  
  
  /**
   * Request for creating purchase order Entry
   */
  
  class CandidateAdd{
  static  requestAddCandidate() {
    return {
      type: Candidate.REQUEST_ADD,
    };
  }
  
  /**
   * Receive for receive purchase order Entry
   */
  static receiveAddCandidate() {
    return {
      type: Candidate.RECEIVE_ADD,
    };
  }
  
  
  static candidateCreateError(error) {
    return {
      type: Candidate.ADD_ERROR,
      error,
    };
  }
  

  
  
  static requestUpdateFine() {
    return {
      type: Candidate.REQUEST_UPDATE_CANDIDATE,
    };
  }
  
  static receiveUpdateFine() {
    return {
      type: Candidate.RECEIVE_UPDATE_CANDIDATE,
    };
  }
  
  static fineUpdateError(error) {
    return {
      type: Candidate.CANDIDATE_UPDATE_ERROR,
      error,
    };
  }
  
 
  
  static requestDeleteCandidate() {
    return {
      type: Candidate.REQUEST_DELETE_CANDIDATE,
    };
  }
  
  /**
   * Receive for deleting purchase order
   */
  static receiveDeleteCandidate() {
    return {
      type: Candidate.RECEIVE_DELETE_CANDIDATE,
    };
  }
  
  /**
   * Receive for error deleting brand
   */
  static receiveCandidateDeleteError(error) {
    return {
      type: Candidate.CANDIDATE_DELETE_ERROR,
      error,
    };
  }

  static requestUpdateStatusFine() {
    return {
      type: fine.REQUEST_UPDATE_STATUS_FINE,
    };
  }
  
  static receiveUpdateStatusFine() {
    return {
      type: fine.RECEIVE_UPDATE_STATUS_FINE,
    };
  }
  
  
  static fineUpdateStatusError(error) {
    return {
      type: fine.FINE_UPDATE_STATUS_ERROR,
      error,
    };
  }
  }
  
  export default CandidateAdd