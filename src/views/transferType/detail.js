import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import {
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
} from "reactstrap";
//components
import Form from "../../components/Form";
import HorizontalSpace from "../../components/HorizontalSpace";
import SaveButton from "../../components/SaveButton";
import Text from "../../components/Text";
import CancelButton from "../../components/CancelButton";
//actions
import BreadCrumb from "../../components/Breadcrumb";
import DeleteModal from "../../components/DeleteModal";
import TransferType from "../../helpers/TransferType";
import transferTypeService from "../../services/TransferTypeService";
import StoreService from "../../services/StoreService"
import Url from "../../lib/Url";
import { Link } from "react-router-dom";
import classNames from "classnames";
import TransferTypeReasonList from "./Components/TransferTypeReasonList";
import String from "../../lib/String";
import { useDispatch } from "react-redux";
import ReasonService from "../../services/TranferTypeReasonService";
import UserRoleService from "../../services/UserRoleService";
import Action from "../../components/Action";
import Drawer from "../../components/Drawer";
import AddButton from "../../components/AddButton";
import StatusService from "../../services/StatusService";
import ObjectName from "../../helpers/ObjectName";
import TransferTypeForm from "./Components/transferTypeForm";

export const Tabs = {
    GENERAL: "General",
    REASON: "Reason",
};

const TransferTypeDetails = (props) => {
    const [detail, setDetail] = useState();
    const [label, setLabel] = useState()
    const [storeDetail, setStoreDetails] = useState();
    const [deleteModal, setDeleteModal] = useState(false);
    const [reasonModalOpen, setReasonModalOpen] = useState(false);
    const [userRole, setUserRole] = useState("")
    const [row, setRow] = useState()
    const [isSubmit, setIsSubmit] = useState();
    const dispatch = useDispatch();
    const Param = new URLSearchParams(props.history.location.search);
    const role = Param.get("section");
    const [activeTab, setActiveTab] = useState(
        Url.GetParam("tab") || Tabs.GENERAL);
    const [statusList, setStatusList] = useState([]);

    const id = props.match.params.id;

    useEffect(() => {
        transferTypeService.getDetails(id, (callback) => {
            setDetail(callback)
        });
        Stores()
        getUserRole()
        getStatus()
    }, []);

    const Stores = async () => {
        await StoreService.list(callback => setStoreDetails(callback));

    };

    const getStatus = async () => {
        const response = await StatusService.getOption(ObjectName.TRANSFER);
        setStatusList(response)
    };

    const getUserRole = async () => {
        let userData = [];
        let response = await UserRoleService.search();
        let values = response.data.data
        for (let i in values) {
            userData.push({
                id: values[i].id,
                label: values[i].role_name,
                value: values[i].id
            })
        }
        setUserRole(userData);
    };

    const breadcrumbList = [
        { label: "Settings", link: "/setting/transfer" },
        {
            label: "Transfer",
            link: "/setting/Transfer",
        },
        {
            // label: Customer.GetDisplayName(shiftDetails?.name),
            label: label ? label : detail?.name,
            link: "",
        },
    ];

    const status = TransferType.statusOptions.find((data) => data.value == detail?.status)
    const group = TransferType.groupOptions.find((data) => data.value == detail?.group)
    const findToStore = storeDetail && storeDetail.find((data) => data.value === detail?.default_to_store)
    const findFromStore = storeDetail && storeDetail.find((data) => data.value === detail?.default_from_store)
    const allowedUsers = [];

    if (detail && Array.isArray(detail.allowedUser)) {
        detail.allowedUser.forEach((result) => {
            allowedUsers.push({
                value: result.id,
                label: result.name,
            });
        });
    }

    const allowedStatus = [];

    if (detail && Array.isArray(detail.allowed_statuses)) {
        detail.allowed_statuses.forEach((result) => {
            let statusValue = statusList && statusList.find((data) => data.value == result);
            allowedStatus.push(statusValue);
        });
    }

    const initialValues = {
        name: detail?.name,
        status: status || "",
        group: group || "",
        default_to_store: findToStore || "",
        allow_to_change_from_store: detail?.allow_to_change_from_store || "",
        allow_to_change_to_store: detail?.allow_to_change_to_store || "",
        default_from_store: findFromStore || "",
        offline_mode: detail?.offline_mode || "",
        allowedUser: allowedUsers,
        allowedStatus: allowedStatus,
        allow_replenishment: detail?.allow_replenishment
    }

    const handleUpdate = async (id, values) => {
        let obj = new Object();
        obj.name = values.name;
        obj.status = values.status;
        obj.group = values.group ? values.group.value : "";
        obj.default_to_store = values.default_to_store;
        obj.default_from_store = values.default_from_store;
        obj.allow_to_change_from_store = values.allow_to_change_from_store ? 1 : 0;
        obj.allow_to_change_to_store = values.allow_to_change_to_store ? 1 : 0;
        obj.offline_mode = values.offline_mode ? 1 : 0;
        obj.allowedUser = values && values.allowedUser ? JSON.stringify(values.allowedUser) : ""
        obj.allowedStatus = values && values.allowedStatus ? JSON.stringify(values.allowedStatus) : "",
            obj.allow_replenishment = values && values.allow_replenishment

        await transferTypeService.update(id, obj, callback => {
            console.log(callback)
            setLabel(values.name)
        })
    };

    const _handleStatusChange = (tabStatus) => {
        props.history.push(`?tab=${tabStatus}`);
    };

    const tabToggle = (tab) => {
        setActiveTab(tab);
    };

    const reasonSelectModal = () => {
        setReasonModalOpen(!reasonModalOpen);
    };

    const addreasonForm = (
        <Text
            name="reason"
            label="Reason"
            placeholder="Enter Reason..."
            required
        />
    )

    const addreasonFooter = (
        <SaveButton type="submit" loading={isSubmit == false} label={row?.id ? "Save" : "Add"} />
    );

    const handleSubmit = (values, id) => {
        let params = {
            transferType: id
        }
        setIsSubmit(false)
        const data = new FormData();
        data.append("reason", String.Get(values.reason));
        data.append("transferType", id);
        if (row?.id) {

            dispatch(
                ReasonService.update(row?.id, data, params)
            );
            setIsSubmit(true)
        }
        else {
            dispatch(ReasonService.add(data, params, reasonSelectModal()));
            setIsSubmit(true)
        }
        setReasonModalOpen(false);
    };

    const handleDelete = async () => {
        await transferTypeService.delete(id, callback => callback && props.history.push("/setting/Transfer"))
    }

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

    return (
        <>
            <DeleteModal
                id={id}
                label={detail?.name}
                isOpen={deleteModal}
                toggle={() => {
                    setDeleteModal(false);
                }}
                title="Delete Transfer Type"
                deleteFunction={handleDelete}
            />

            <Drawer
                modelTitle={"Add Reason"}
                DrawerBody={addreasonForm}
                DrawerFooter={addreasonFooter}

                onSubmit={(values) => handleSubmit(values, id)}
                initialValues={{
                    reason: row?.id ? row?.name : ""
                }}

                handleOpenModal={
                    reasonSelectModal
                }
                handleCloseModal={reasonSelectModal}
                handleDrawerClose={reasonSelectModal}
                isModalOpen={reasonModalOpen}
                enableReinitialize
            />

            <BreadCrumb list={breadcrumbList} />

            <div className="d-flex mb-3 justify-content-between">
                <PageTitle
                    label={label ? label : detail?.name}
                />
                <div className="pl-2 d-flex">
                    <AddButton
                        className="ml-3 mr-2"
                        label="Add"
                        onClick={() => {
                            setRow("");
                            reasonSelectModal();

                        }}
                    />
                    <Action
                        dropdownLinks={actionsMenuList}
                        handleChange={handleActionChange}
                    />
                </div>
            </div>
            <Nav tabs className="admin-tabs mb-1">
                <Link style={{ textDecoration: 'none', color: 'inherit' }}
                    onClick={(e) => e.preventDefault()}>
                    <NavItem>
                        <NavLink
                            className={classNames({
                                active: activeTab === Tabs.GENERAL,
                            })}
                            onClick={() => {
                                tabToggle(Tabs.GENERAL);
                                _handleStatusChange(Tabs.GENERAL);
                            }}>
                            General
                        </NavLink>
                    </NavItem>
                </Link>

                <Link style={{ textDecoration: 'none', color: 'inherit' }}
                    onClick={(e) => e.preventDefault()}>
                    <NavItem>
                        <NavLink
                            className={classNames({
                                active: activeTab === Tabs.REASON,
                            })}
                            onClick={() => {
                                tabToggle(Tabs.REASON);
                                _handleStatusChange(Tabs.REASON);
                            }}>
                            Reason
                        </NavLink>
                    </NavItem>
                </Link>

            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId={Tabs.GENERAL}>
                    <Form
                        enableReinitialize={true}
                        initialValues={initialValues}
                        onSubmit={(values) => {
                            let id = props.match.params.id;
                            handleUpdate(id, values);
                        }}
                    >
                        <div className="card bg-white">
                            <div className="card-body">

                                <TransferTypeForm />

                                <HorizontalSpace bottom="2">
                                    <SaveButton label="Save" />
                                    <CancelButton
                                        onClick={() => {
                                            props.history.push("/setting/Transfer");
                                        }}
                                    />
                                </HorizontalSpace>
                            </div>
                        </div>
                    </Form>
                </TabPane>
                <TabPane tabId={Tabs.REASON}>
                    <TransferTypeReasonList transferType={id} reasonSelectModal={reasonSelectModal} setRow={setRow} />
                </TabPane>
            </TabContent>
        </>
    )
}

export default TransferTypeDetails;
