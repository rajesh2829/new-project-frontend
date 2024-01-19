const Action = {
  REQUEST_TABLE_LIST: "REQUEST_TABLE_LIST",
  RECEIVE_TABLE_LIST: "RECEIVE_TABLE_LIST",
  FETCH_TABLE_LIST_FAIL: "FETCH_TABLE_LIST_FAIL",
  SET_TABLE_PAGE: "SET_TABLE_PAGE",
  CLEAR_TABLE_LIST: "CLEAR_TABLE_LIST",
}

export default (state = {}, action) => {
  const { id, payload, type } = action;
  switch (type) {
    // Clear table list
    case Action.CLEAR_TABLE_LIST: {
      delete state[id];
      return state;
    }
    // Request table list
    case Action.REQUEST_TABLE_LIST:
      return {
        ...state,
        [id]: Object.assign({}, state[id], { isFetching: true }),
      };
    // Recieve table list
    case Action.RECEIVE_TABLE_LIST:
      return {
        ...state,
        [id]: Object.assign({}, state[id], {
          isFetching: false,
          currentPage: payload.currentPage,
          totalCount: payload.totalCount,
          pageSize: payload.pageSize,
          [payload.currentPage]: payload.data,
          sortList: Object.assign({}, state[id].sortList, {
            [payload.currentPage]: payload.sort,
          }),
          sortDirList: Object.assign({}, state[id].sortDirList, {
            [payload.currentPage]: payload.sortDir,
          }),
          sort: payload.sort,
          sortDir: payload.sortDir,
          totalAmount: payload?.totalAmount,
          totalHours: payload?.totalHours,
          totalCash: payload.totalCash,
          totalUpi: payload.totalUpi,
          cashInStore: payload.cashInStore,
          totalReceivedAmount: payload.totalReceivedAmount,
          totalCalculatedAmount: payload.totalCalculatedAmount,
          receivedUpi: payload.receivedUpi,
          receivedCash: payload.receivedCash,
          calculatedUpi: payload.calculatedUpi,
          calculatedCash: payload.calculatedCash,
          totalDiscrepancyAmount: payload.totalDiscrepancyAmount,
          totalDiscrepancyCash: payload.totalDiscrepancyCash,
          totalDiscrepancyUpi: payload.totalDiscrepancyUpi,
          totalNetAmount: payload.totalNetAmount,
          totalProfitAmount: payload.totalProfitAmount,
          totalMarginAmount: payload.totalMarginAmount,
          totalDiscountAmount: payload.totalDiscountAmount,
          totalTaxAmount: payload.totalTaxAmount,
          totalTaxableAmount: payload.totalTaxableAmount

        }),
      };
    // Set table page
    case Action.SET_TABLE_PAGE:
      return {
        ...state,
        [id]: Object.assign({}, state[id], {
          currentPage: payload,
        }),
      };
    // Fetch table list error
    case Action.FETCH_TABLE_LIST_FAIL:
      return {
        ...state,
        [id]: Object.assign({}, state[id], { isFetching: false }),
      };
    default:
      return state;
  }
};
