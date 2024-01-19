import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createTransferTypesData } from "../../actions/transferType";
import { endpoints } from "../../api/endPoints";
import Link from "../../components/Link";
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";
import TransferType from "../../helpers/TransferType";
import * as Tab from "../../helpers/TransferType"
import Detail from "./detail";
import Drawer from "../../components/Drawer";
import MoreDropdown from "../../components/authentication/moreDropdown";
import { DropdownItem } from "reactstrap";
import transferTypeService from "../../services/TransferTypeService";
import { fetchList } from "../../actions/table";
import TransferTypeForm from "./Components/transferTypeForm";
import StoreService from "../../services/StoreService";
import SaveButton from "../../components/SaveButton";
import StatusService from "../../services/StatusService";
import ObjectName from "../../helpers/ObjectName";
import Url from "../../lib/Url";

const TransferTypeList = (props) => {

    const { history, activeTab, match, isAddModalOpen, toggleAddModal } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [currentData, setCurrentData] = useState({});
    const [deleteModal, setDeleteModal] = useState(false);
    const [isSubmit, setIsSubmit] = useState();

    const [storeDetail, setStoreDetails] = useState();
    const [statusList, setStatusList] = useState([]);
    const dispatch = useDispatch();
    const selectedId = match && match.params && match.params.id;

    useEffect(() => {
        Stores();
        getStatus();
    }, []);

    const statusOption = [
        {
            value: Tab.ACTIVE,
            label: Tab.ACTIVE_TEXT,
        },
        {
            value: Tab.INACTIVE,
            label: Tab.INACTIVE_TEXT,
        },
        {
            value: "",
            label: "All",
        },
    ];

    const sortByOption = [
        {
            value: "name:ASC",
            label: "Name",
        },
        {
            value: "id:DESC",
            label: "Most Recent",
        },
    ];

    const AddTransferTypeForm = (
        <>
            <TransferTypeForm />
        </>
    );

    const TransferTypeFooter = (
        <SaveButton
            type="submit"
            label={currentData?.Id ? "Edit" : "Save"}
            className="h6-5-important"
            loading={isSubmit == false}
        />
    )

    const Stores = async () => {
        await StoreService.list(callback => setStoreDetails(callback));
    }

    const findToStore = storeDetail && storeDetail.find((data) => data.value === props?.currentData?.default_to_store_id)
    const findFromStore = storeDetail && storeDetail.find((data) => data.value === props?.currentData?.default_from_store_id)
    const allowedUsers = [];

    if (props?.currentData?.allowed_role_id && Array.isArray(props?.currentData?.allowed_role_id)) {
        props?.currentData?.allowed_role_id.forEach((result) => {
            allowedUsers.push({
                value: result?.id,
                label: result?.name,
            });
        });
    }

    const handleSubmit = async (values) => {
        setIsSubmit(false)
        let obj = new Object();
        obj.name = values.name;
        obj.status = values.status;
        obj.default_to_store = values.default_to_store;
        obj.group = values.group ? values.group.value : "";
        obj.default_from_store = values.default_from_store;
        obj.allow_to_change_from_store = values.allow_to_change_from_store ? 1 : 0;
        obj.allow_to_change_to_store = values.allow_to_change_to_store ? 1 : 0;
        obj.offline_mode = values.offline_mode ? 1 : 0;
        obj.allow_replenishment = values?.allow_replenishment;
        obj.allowedUser = values && values.allowedUser ? JSON.stringify(values.allowedUser) : ""
        obj.allowedStatus = values && values.allowedStatus ? JSON.stringify(values.allowedStatus) : ""
        if (props?.currentData?.id) {
            await transferTypeService.update(props?.currentData?.id, obj, callback => {
                dispatch(fetchList("TransferType", `${endpoints().TransferTypeApi}/search`, 1, 25,
                    { status: Url.GetParam("status"), search: Url.GetParam("search") }));
                toggleAddModal()
                setIsSubmit(true)
            })
        }
        else {

            dispatch(await createTransferTypesData(obj, "", toggleAddModal));
            setIsSubmit(true)
        }
    }

    const getStatus = async () => {
        const response = await StatusService.getOption(ObjectName.TRANSFER);
        setStatusList(response)
    };

    const allowedStatus = [];
    if (props?.currentData && Array.isArray(props?.currentData?.allowedStatuses)) {
        props?.currentData?.allowedStatuses.forEach((result) => {
            let statusValue = statusList && statusList.find((data) => data.value == result);
            allowedStatus.push(statusValue);
        });
    }

    return (
        <>
            {!selectedId ?
                <>
                    <Drawer
                        handleOpenModal={toggleAddModal}
                        handleCloseModal={toggleAddModal}
                        handleDrawerClose={toggleAddModal}
                        isModalOpen={isAddModalOpen}
                        initialValues={{
                            name: props?.currentData?.id
                                ? props?.currentData?.name
                                : "",
                            status: props?.currentData?.id
                                ? TransferType.statusOptions.find((data) => props?.currentData?.status == data.value)
                                : "",
                            group: props?.currentData?.id
                                ? TransferType.groupOptions.find((data) => props?.currentData?.group == data.value)
                                : "",
                            default_to_store: findToStore || "",
                            allow_to_change_from_store: props.currentData?.allow_to_change_from_store || "",
                            allow_to_change_to_store: props.currentData?.allow_to_change_to_store || "",
                            default_from_store: findFromStore || "",
                            offline_mode: props.currentData?.offline_mode || "",
                            allowedUser: allowedUsers,
                            allowedStatus: allowedStatus,
                            allow_replenishment: props.currentData?.allow_replenishment
                        }}
                        enableReinitialize
                        DrawerBody={AddTransferTypeForm}
                        DrawerFooter={TransferTypeFooter}
                        modelTitle={props?.currentData?.id ? "Edit Transfer Type " : "Add Transfer Type"}
                        onSubmit={async (values) => { handleSubmit(values) }}
                    />
                    <div className="mt-4">
                        <ReduxTable
                            id="TransferType"
                            showHeader
                            searchPlaceholder="Search"
                            apiURL={`${endpoints().TransferTypeApi}/search`}
                            newTableHeading
                            history={history}
                            paramsToUrl={true}
                            sortByOptions={sortByOption}
                            showStatusFilter
                            customStatusOption={statusOption}
                        >
                            <ReduxColumn
                                type="link"
                                field="name"
                                sortBy="name"
                                renderField={(row) => (
                                    <Link text={row.name} url={`/setting/Transfer/type/${row.id}`} />
                                )}
                            >
                                Name
                            </ReduxColumn>
                            <ReduxColumn
                                field="default_from_store"
                                sortBy="default_from_store"
                            >
                                From Location
                            </ReduxColumn>
                            <ReduxColumn
                                field="default_to_store"
                                sortBy="default_to_store"
                            >
                                To Location
                            </ReduxColumn>
                            <ReduxColumn
                                field="status"
                                sortBy="status"
                                renderField={(row) => (
                                    <div
                                        className={`status-input text-center rounded text-white fw-600 custom-font-size text-uppercase my-3 mx-auto ${row.status == 1
                                            ? "bg-success"
                                            : row.status === 0
                                                ? "bg-secondary"
                                                : "bg-secondary"
                                            }`}
                                    >
                                        <p>{row.status == 1 ? "Active" : "InActive"}</p>
                                    </div>
                                )}
                            >
                                Status
                            </ReduxColumn>
                            <ReduxColumn
                                field="Action"
                                disableOnClick
                                width="70px"
                                renderField={(row) => (
                                    <>
                                        <div className="d-flex justify-content-center align-items-center row">
                                            <div className="text-dark landing-group-dropdown">
                                                <MoreDropdown>
                                                    <DropdownItem
                                                        onClick={() => {
                                                            props.setCurrentData(row);
                                                            toggleAddModal()
                                                        }}>
                                                        Quick View
                                                    </DropdownItem>
                                                </MoreDropdown>
                                            </div>
                                        </div>
                                    </>
                                )}>
                                Action
                            </ReduxColumn>

                        </ReduxTable>
                    </div>
                </> : (
                    <Detail
                        history={history}
                        data={currentData}
                        match={match}
                        activeTab={activeTab}
                    />
                )
            }
        </>
    )
}

export default TransferTypeList; 