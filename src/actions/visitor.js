const visitor = {

  REQUEST_ADD: "REQUEST_ADD",
  RECEIVE_ADD: "RECEIVE_ADD",
  ADD_ERROR: "ADD_ERROR",
  REQUEST_DELETE_VISITOR: "REQUEST_DELETE_VISITOR",
  RECEIVE_DELETE_VISITOR: "RECEIVE_DELETE_VISITOR",
  
};

class Visitor {
  static requestAddVisitor() {
    return {
      type: visitor.REQUEST_ADD,
    };
  }

  /**
   */
  static receiveAddVisitor() {
    return {
      type: visitor.RECEIVE_ADD,
    };
  }

  static VisitorCreateError(error) {
    return {
      type: visitor.ADD_ERROR,
      error,
    };
  }

  static requestDeleteVisitor() {
    return {
      type: visitor.REQUEST_DELETE_VISITOR,
    };
  }

  static receiveDeleteVisitor() {
    return {
      type: visitor.RECEIVE_DELETE_VISITOR,
    };
  }
}

export default Visitor;
