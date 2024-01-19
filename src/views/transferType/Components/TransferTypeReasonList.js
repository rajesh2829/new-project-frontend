import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";
import { endpoints } from "../../../api/endPoints";
import MoreDropdown from "../../../components/authentication/moreDropdown";
import { Button, DropdownItem } from "reactstrap";
import ReasonService from "../../../services/TranferTypeReasonService";
import Text from "../../../components/Text";
import String from "../../../lib/String";
import DeleteModal from "../../../components/DeleteModal";
import Url from "../../../lib/Url";

const TransferTypeReasonList = (props) => {

    const { transferType } = props
    const [rowValues, setRowValue] = useState("");
    const [reasonModalOpen, setReasonModalOpen] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const dispatch = useDispatch();

    const sortByOption = [
        {
            value: "id:DESC",
            label: "Most Recent",
        },
        {
            value: "name:ASC",
            label: "Name",
        },
    ];

    const EditPurchaseProduct = async (values) => {
        // setIsLoading(true);
        try {
            let params = {
                transferType: transferType,
                tab: Url.GetParam("tab")
            }
            //cretae parms
            const data = new FormData();

            data.append("reason", values && String.Get(values.reason));


            dispatch(
                ReasonService.update(rowValues.id, data, params)
            );
            reasonSelectModal();
        } catch (err) {
            console.log(err);
        }
    };

    const reasonSelectModal = () => {
        setReasonModalOpen(!reasonModalOpen);
    };

    const deleteReason = () => {
        let params = {
            transferType: transferType,
            tab: Url.GetParam("tab")
        }

        dispatch(ReasonService.delete(rowValues.id, params));
    };

    const closeDeleteModal = () => {
        //close modal
        setOpenDeleteModal(!openDeleteModal);
    };

    return (
        <>
            <DeleteModal
                isOpen={openDeleteModal}
                label={rowValues.name}
                toggle={closeDeleteModal}
                title="Delete Reason"
                deleteFunction={deleteReason}
            />
            <div>
                <div className="mt-4">
                    <ReduxTable
                        id="TransferTypeReason"
                        paramsToUrl={true}
                        apiURL={`${endpoints().TransferTypeReasonAPI}/search`}
                        params={{
                            transferType: transferType,
                            tab: Url.GetParam("tab")
                        }}
                        newTableHeading
                        sortByOptions={sortByOption}
                    >
                        <ReduxColumn
                            field="name"
                            sortBy="name"
                            width="400px"
                            minWidth="400px"
                            maxWidth="400px"
                            className="ellipsis text-wrap"
                        >
                            Reason
                        </ReduxColumn>
                        <ReduxColumn
                            field="status"
                            disableOnClick
                            width="70px"
                            renderField={(row) => (
                                <>
                                    <div className="d-flex justify-content-center align-items-center row">
                                        <div className="text-dark landing-group-dropdown">
                                            <MoreDropdown>
                                                <DropdownItem
                                                    onClick={() => {
                                                        props.setRow(row)
                                                        props.reasonSelectModal()
                                                    }}
                                                >
                                                    Edit
                                                </DropdownItem>
                                                <DropdownItem
                                                    onClick={() => {
                                                        props.setRow(row)
                                                        props.reasonSelectModal()
                                                    }}
                                                >
                                                    Quick View
                                                </DropdownItem>
                                                <DropdownItem
                                                    className="text-danger cursor-pointer"
                                                    onClick={() => {
                                                        setOpenDeleteModal(true);
                                                        setRowValue(row);
                                                    }}
                                                >
                                                    Delete
                                                </DropdownItem>
                                            </MoreDropdown>
                                        </div>
                                    </div>
                                </>
                            )}
                        >
                            Action
                        </ReduxColumn>
                    </ReduxTable>
                </div>
            </div>
        </>
    );
};

export default TransferTypeReasonList;
