import { faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { DropdownItem } from "reactstrap";
import { endpoints } from "../../../api/endPoints";
import MoreDropdown from "../../../components/authentication/moreDropdown";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import { SaleSettlement } from "../../../helpers/SaleSettlement";
import Currency from "../../../lib/Currency";
import Url from "../../../lib/Url";
import * as Constants from "../../../helpers/SaleSettlement";
import { useDispatch } from "react-redux";
import { PAGE } from "../../../helpers/Status";
import { UpdateUrl } from "../../../lib/Url";
import SaleSettlementService from "../../../services/SaleSettlementService";
import StatusText from "../../../components/StatusText";
const SaleSettlementList = (props) => {
    const [page, setPage] = useState(Url.GetParam("page"));
    const dispatch = useDispatch();

    const {
        id,
        history,
        sortByOption,
        arrays,
        status,
        setIsDeleteModel,
        setCurrentData,
        setSaleSettlementId,
        setSaleSettlementData,
        toggleSidebar,
        showSidebar,
        store,
        shift,
        setCurrentPage,
        startDate,
        salesExecutive,
        endDate,
        draftCurrentPage,
        draftCurrentPageSize,
        allCurrentPage,
        allCurrentPageSize,
        reviewCurrentPageSize,
        reviewCurrentPage,
        objectName
    } = props;

    function getKeyByValue(object, value) {
        let isSelected = false;
        for (const key in object) {
            if (key == value) {
                isSelected = object[key] == true ? true : false;
            }
        }
        return isSelected;
    }

    const enable_calculated_amount_cash =
        arrays && getKeyByValue(arrays, Constants.FieldLabel.CALCULATED_AMOUNT_CASH)
            ? true
            : false;
    const enable_calculated_amount_upi =
        arrays && getKeyByValue(arrays, Constants.FieldLabel.CALCULATED_AMOUNT_UPI)
            ? true
            : false;
    const enable_amount_cash =
        arrays && getKeyByValue(arrays, Constants.FieldLabel.AMOUNT_CASH)
            ? true
            : false;
    const enable_amount_upi =
        arrays && getKeyByValue(arrays, Constants.FieldLabel.AMOUNT_UPI)
            ? true
            : false;
    const enable_discrepancy_amount_cash =
        arrays &&
            getKeyByValue(arrays, Constants.FieldLabel.DISCREPANCY_AMOUNT_CASH)
            ? true
            : false;
    const enable_discrepancy_amount_upi =
        arrays && getKeyByValue(arrays, Constants.FieldLabel.DISCREPANCY_AMOUNT_UPI)
            ? true
            : false;

    const enable_received_amount_cash =
        arrays && getKeyByValue(arrays, Constants.FieldLabel.RECEIVED_AMOUNT_CASH)
            ? true
            : false;

    const enable_received_amount_upi =
        arrays && getKeyByValue(arrays, Constants.FieldLabel.RECEIVED_AMOUNT_UPI)
            ? true
            : false;
    const enable_total_calculated_amount =
        arrays &&
            getKeyByValue(arrays, Constants.FieldLabel.TOTAL_CALCULATED_AMOUNT)
            ? true
            : false;
    const enable_total_received_amount =
        arrays && getKeyByValue(arrays, Constants.FieldLabel.TOTAL_RECEIVED_AMOUNT)
            ? true
            : false;
    const enable_cash_in_store =
        arrays && getKeyByValue(arrays, Constants.FieldLabel.CASH_IN_LOCATION)
            ? true
            : false;

    const enable_cash_to_office = arrays && getKeyByValue(arrays, Constants.FieldLabel.CASH_TO_OFFICE) ? true
        : false;

    const params = {
        page: page ? page : "",
    };


    return (
        <div className="mt-4">
            <ReduxTable
                id={"SaleSettlement"}
                showHeader
                newTableHeading
                searchPlaceholder="Search"
                apiURL={`${endpoints().saleSettlementAPI}/list`}
                setPage={setPage}
                params={{
                    page: page ? page : PAGE,
                    objectName: objectName ? objectName : ""
                }}
                sortByOptions={sortByOption}
                paramsToUrl={true}
                history={history}
                showDateFilter
                showStoreFilter
                showSalesExecutiveFilter
                showShiftFilter
                showStatusFilter
                icon={<FontAwesomeIcon icon={faHandHoldingDollar} />}
                message="You can start by clicking on Add New">
                <ReduxColumn
                    className="text-center"
                    field="saleSettlementNumber"
                    sortBy="saleSettlementNumber"
                    isClickable="true"
                    type="link"
                    width="190px"
                    minWidth="190px"
                    maxWidth="190px"
                    renderField={(row) => (
                        <Link to={`/SaleSettlement/${row.id}`}>{row.saleSettlementNumber}</Link>
                    )}>
                    SaleSettlement#
                </ReduxColumn>
                <ReduxColumn
                    field="date"
                    sortBy="date"
                    width="110px"
                    minWidth="110px"
                    maxWidth="110px"
                    className="text-center">
                    Date
                </ReduxColumn>
                <ReduxColumn
                    field="locationName"
                    sortBy="store_id"
                    width="110px"
                    minWidth="110px"
                    maxWidth="110px">
                    Location
                </ReduxColumn>

                <ReduxColumn
                    field="shift"
                    sortBy="shift"
                    width="110px"
                    minWidth="110px"
                    maxWidth="110px">
                    Shift
                </ReduxColumn>
                <ReduxColumn
                    className="text-break"
                    field="salesExecutive"
                    sortBy="salesExecutive"
                    width="110px"
                    minWidth="110px"
                    maxWidth="110px">
                    Sales Executive
                </ReduxColumn>
                {enable_amount_cash && enable_amount_cash == true && (
                    <ReduxColumn
                        field="amount_cash"
                        sortBy="amount_cash"
                        className="text-right"
                        renderField={(row) => (
                            <span>{Currency.Format(row.amount_cash)}</span>
                        )}
                        width="110px"
                        minWidth="110px"
                        maxWidth="110px">
                        Amount (Cash)
                    </ReduxColumn>
                )}
                {enable_amount_upi && enable_amount_upi == true && (
                    <ReduxColumn
                        field="amount_upi"
                        sortBy="amount_upi"
                        className="text-right"
                        renderField={(row) => (
                            <span>{Currency.Format(row.amount_upi)}</span>
                        )}
                        width="110px"
                        minWidth="110px"
                        maxWidth="110px">
                        Amount (UPI)
                    </ReduxColumn>
                )}
                <ReduxColumn
                    field="total_amount"
                    sortBy="total_amount"
                    className="text-right"
                    renderField={(row) => (
                        <span>{Currency.Math(row.total_amount)}</span>
                    )}
                    width="110px"
                    minWidth="110px"
                    maxWidth="110px">
                    Amount (TOTAL)
                </ReduxColumn>

                {enable_calculated_amount_cash &&
                    enable_calculated_amount_cash == true && (
                        <ReduxColumn
                            field="calculated_amount_cash"
                            sortBy="calculated_amount_cash"
                            width="130px"
                            minWidth="130px"
                            maxWidth="130px"
                            className="text-right"
                            renderField={(row) => (
                                <span>
                                    {Currency.Format(row.calculated_amount_cash)}
                                </span>
                            )}>
                            Calculated Amount(Cash)
                        </ReduxColumn>
                    )}
                {enable_calculated_amount_upi &&
                    enable_calculated_amount_upi == true && (
                        <ReduxColumn
                            field="calculated_amount_upi"
                            sortBy="calculated_amount_upi"
                            width="130px"
                            minWidth="130px"
                            maxWidth="130px"
                            className="text-right"
                            renderField={(row) => (
                                <span>
                                    {Currency.Format(row.calculated_amount_upi)}
                                </span>
                            )}>
                            Calculated Amount(Upi)
                        </ReduxColumn>
                    )}

                {enable_total_calculated_amount &&
                    enable_total_calculated_amount == true && (
                        <ReduxColumn
                            field="total_calculated_amount"
                            sortBy="total_calculated_amount"
                            width="130px"
                            minWidth="130px"
                            maxWidth="130px"
                            className="text-right"
                            renderField={(row) => (
                                <span>
                                    {Currency.Format(row.total_calculated_amount)}
                                </span>
                            )}>
                            Calculated Amount(Total)
                        </ReduxColumn>
                    )}
                {enable_received_amount_cash &&
                    enable_received_amount_cash == true && (
                        <ReduxColumn
                            field="received_amount_cash"
                            sortBy="received_amount_cash"
                            width="130px"
                            minWidth="130px"
                            maxWidth="130px"
                            className="text-right"
                            renderField={(row) => (
                                <span>{Currency.Format(row.received_amount_cash)}</span>
                            )}>
                            Received Amount(Cash)
                        </ReduxColumn>
                    )}
                {enable_received_amount_upi && enable_received_amount_upi == true && (
                    <ReduxColumn
                        field="received_amount_upi"
                        sortBy="received_amount_upi"
                        width="130px"
                        minWidth="130px"
                        maxWidth="130px"
                        className="text-right"
                        renderField={(row) => (
                            <span>{Currency.Format(row.received_amount_upi)}</span>
                        )}>
                        Received Amount(Upi)
                    </ReduxColumn>
                )}
                {enable_total_received_amount &&
                    enable_total_received_amount == true && (
                        <ReduxColumn
                            field="total_received_amount"
                            sortBy="total_received_amount"
                            width="130px"
                            minWidth="130px"
                            maxWidth="130px"
                            className="text-right"
                            renderField={(row) => (
                                <span>
                                    {Currency.Format(row.total_received_amount)}
                                </span>
                            )}>
                            Received Amount(Total)
                        </ReduxColumn>
                    )}

                {enable_cash_in_store && enable_cash_in_store == true && (
                    <ReduxColumn
                        field="cash_in_store"
                        sortBy="cash_in_store"
                        width="110px"
                        minWidth="110px"
                        maxWidth="110px"
                        className="text-right"
                        renderField={(row) => (
                            <span>{Currency.Format(row.cash_in_store)}</span>
                        )}>
                        Cash In Location
                    </ReduxColumn>
                )}
                {enable_cash_to_office && enable_cash_to_office == true && <ReduxColumn
                    field="cash_to_office"
                    sortBy="cash_to_office"
                    width="110px"
                    minWidth="110px"
                    maxWidth="110px"
                    className="text-right"
                    renderField={(row) => (
                        <span>{Currency.Format(row.cash_to_office)}</span>
                    )}>
                    Cash To Office
                </ReduxColumn>}

                {enable_discrepancy_amount_cash &&
                    enable_discrepancy_amount_cash == true && (
                        <ReduxColumn
                            field="discrepancy_amount_cash"
                            sortBy="discrepancy_amount_cash"
                            className="text-right"
                            width="130px"
                            minWidth="130px"
                            maxWidth="130px"
                            renderField={(row) => (
                                <span>
                                    {Currency.Format(row.discrepancy_amount_cash)}
                                </span>
                            )}>
                            Discrepancy Amount(Cash)
                        </ReduxColumn>
                    )}

                {enable_discrepancy_amount_upi &&
                    enable_discrepancy_amount_upi == true && (
                        <ReduxColumn
                            field="discrepancy_amount_upi"
                            sortBy="discrepancy_amount_upi"
                            width="130px"
                            minWidth="130px"
                            maxWidth="130px"
                            className="text-right"
                            renderField={(row) => (
                                <span>
                                    {Currency.Format(row.discrepancy_amount_upi)}
                                </span>
                            )}>
                            Discrepancy Amount(Upi)
                        </ReduxColumn>
                    )}
                <ReduxColumn
                    field="total_discrepancy_amount"
                    sortBy="total_discrepancy_amount"
                    width="130px"
                    minWidth="130px"
                    maxWidth="130px"
                    className="text-right"
                    renderField={(row) => (
                        <span>{Currency.Format(row.total_discrepancy_amount)}</span>
                    )}>
                    Discrepancy Amount(Total)
                </ReduxColumn>
                <ReduxColumn
                    field="status"
                    sortBy="status"
                    width="90px"
                    className="brand-all"
                    renderField={(row) => (
                        <StatusText backgroundColor={row.statusColor} status={row.status} />
                    )}>
                    Status
                </ReduxColumn>
                <ReduxColumn
                    field="Action"
                    disableOnClick
                    width="120px"
                    minWidth="80px"
                    maxWidth="80px"
                    renderField={(row) => (
                        <div className=" text-center action-group-dropdown">
                            <MoreDropdown>
                                {row.status == SaleSettlement.STATUS_DRAFT ? (
                                    <>
                                        <DropdownItem
                                            onClick={() => {
                                                dispatch(
                                                    SaleSettlementService.updateStatus(
                                                        row.id,
                                                        SaleSettlement.STATUS_REVIEW,
                                                        params,
                                                        draftCurrentPageSize,
                                                        draftCurrentPage,
                                                        reviewCurrentPageSize,
                                                        reviewCurrentPage,
                                                        allCurrentPage,
                                                        allCurrentPageSize
                                                    )
                                                );
                                            }}>
                                            Review
                                        </DropdownItem>
                                    </>
                                ) : row.status == SaleSettlement.STATUS_REVIEW ? (
                                    <>
                                        <DropdownItem
                                            onClick={() => {
                                                dispatch(
                                                    SaleSettlementService.updateStatus(
                                                        row.id,
                                                        SaleSettlement.STATUS_DRAFT,
                                                        params,
                                                        draftCurrentPageSize,
                                                        draftCurrentPage,
                                                        reviewCurrentPageSize,
                                                        reviewCurrentPage,
                                                        allCurrentPage,
                                                        allCurrentPageSize
                                                    )
                                                );
                                            }}>
                                            Draft
                                        </DropdownItem>
                                    </>
                                ) : (
                                    <>
                                        <DropdownItem
                                            onClick={() => {
                                                dispatch(
                                                    SaleSettlementService.updateStatus(
                                                        row.id,
                                                        SaleSettlement.STATUS_DRAFT,
                                                        params,
                                                        draftCurrentPageSize,
                                                        draftCurrentPage,
                                                        reviewCurrentPageSize,
                                                        reviewCurrentPage,
                                                        allCurrentPage,
                                                        allCurrentPageSize
                                                    )
                                                );
                                            }}>
                                            Draft
                                        </DropdownItem>
                                        <DropdownItem
                                            onClick={() => {
                                                dispatch(
                                                    SaleSettlementService.updateStatus(
                                                        row.id,
                                                        SaleSettlement.STATUS_REVIEW,
                                                        params,
                                                        draftCurrentPageSize,
                                                        draftCurrentPage,
                                                        reviewCurrentPageSize,
                                                        reviewCurrentPage,
                                                        allCurrentPage,
                                                        allCurrentPageSize
                                                    )
                                                );
                                            }}>
                                            Review
                                        </DropdownItem>
                                    </>
                                )}
                                <DropdownItem
                                    onClick={() => {
                                        props.setRowValue(row);
                                        props.toggle();
                                    }}
                                >
                                    Quick View
                                </DropdownItem>
                                <DropdownItem
                                    className="text-danger"
                                    onClick={() => {
                                        setCurrentPage(page);
                                        setCurrentData(row);
                                        setSaleSettlementId(row.id);
                                        setSaleSettlementData(row.saleSettlementNumber);
                                        setIsDeleteModel(true);
                                    }}>
                                    Delete
                                </DropdownItem>
                            </MoreDropdown>
                        </div>
                    )}>
                    Action
                </ReduxColumn>
            </ReduxTable>
        </div>
    );
};

export default SaleSettlementList;
