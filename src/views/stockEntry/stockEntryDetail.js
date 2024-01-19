import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import Form from "../../components/Form";

// Components
import BreadCrumb from "../../components/Breadcrumb";
import CancelButton from "../../components/CancelButton";
import DefaultContent from "../../components/content/defaultContent";
import DateSelector from "../../components/Date";
import PageTitle from "../../components/PageTitle";
import SaveButton from "../../components/SaveButton";
import Select from "../../components/Select";
import toast from "../../components/Toast";
import StockEntryProduct from "./components/product";

// Action
import { endpoints } from "../../api/endPoints";
import { apiClient } from "../../apiClient";
import { getStoresList } from "../../services/StoreListService";

//  Lib
import { useDispatch } from "react-redux";
import Action from "../../components/Action";
import AddButton from "../../components/AddButton";
import Button from "../../components/Button";
import DeleteModal from "../../components/DeleteModal";
import Spinner from "../../components/Spinner";
import Permission from "../../helpers/Permission";
import Urls from "../../helpers/Url";
import ArrayList from "../../lib/ArrayList";
import { isBadRequest, SUCCESS_RESPONSE } from "../../lib/Http";
import Url from "../../lib/Url";
import StockEntryService from "../../services/StockEntryService";
import StockEntryProductService from "../../services/StockProductEntryService";
import { search } from "../../services/UserService";
import StockList from "./components/StockList";
import { fetchList } from "../../actions/table";
import ActivityList from "../../components/ActivityList";
import ProductSelectModal from "../../components/ProductSelectModal";
import SelectStore from "../../components/SelectStore";
import StatusComponent from "../../components/Status";
import ObjectName from "../../helpers/ObjectName";
import DateTime from "../../lib/DateTime";
import { hasPermission } from "../../services/UserRolePermissionService";
import UserSelect from "../../components/UserSelect";

export const Tab = { GENERAL: "General", PRODUCTS: "Products", HISTORY: "History" };

const StockEntryDetails = (props) => {
    const [activeTab, setActiveTab] = useState(Url.GetParam("tab") || Tab.GENERAL);
    const [detail, setDetail] = useState();
    const [store, setStore] = useState([]);
    const [status, setStatus] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [PermissionList, setPermissionList] = useState();
    const [stockEntryNumber, setStockEntryNumber] = useState("");
    const [addStoreModal, setAddProductModal] = useState(false);
    const [MultiSelectProduct, setMultiSelectProduct] = useState([]);
    const [ownerValue, setownerValue] = useState();
    const [StockOwner, setStockOwner] = useState();
    const [PermissionLists, setPermissionLists] = useState();
    const [deleteModal, setDeleteModal] = useState(false);
    const dispatch = useDispatch();
    const [productIds, setProductIds] = useState([]);

    let stockEntryId = props.match.params.stockEntryId;
    let showHistory = hasPermission(Permission.STOCK_ENTRY_HISTORY_VIEW)

    useEffect(() => {
        storeList();
        getDetails();
        getRolePermissions();
        getRolePermission();
        getUserRoleValue();
        getUserDetail();
    }, []);

    useEffect(() => {
        getproductId();
    }, [MultiSelectProduct])

    const toggle = (tab) => {
        setActiveTab(tab);
    };

    const _handleTabChange = (tab) => {
        props.history.push(`?tab=${tab}`);
    };

    // Bread crumb list
    const breadcrumbList = [
        { label: "Home", link: "/locationDashboard" },
        {
            label: "Stock Entry",
            link: Urls.STOCK_ENTRY_LIST,
        },
        {
            label: activeTab,
            link: "",
        },
    ];

    // Status Option
    const statusOptions = [
        {
            value: "Draft",
            label: "Draft",
        },
        {
            value: "Review",
            label: "Review",
        },
        {
            label: "Reopen",
            value: "Reopen",
        },
        {
            value: "Complete",
            label: "Complete",
        },
    ];

    const getUserDetail = async () => {
        try {
            let response = await apiClient.get(`${endpoints().userAPI}/`);
            const createdBy = response.data.name;
            setStockOwner(createdBy);
        } catch (error) {
            if (isBadRequest(error)) {
                let errorMessage;
                const errorRequest = error.response.request;
                if (errorRequest && errorRequest.response) {
                    errorMessage = JSON.parse(errorRequest.response).message;
                }
                console.error(errorMessage);
            }
        }
    };

    const getUserRoleValue = async () => {
        const userRole = await search();
        const data = [];
        userRole &&
            userRole.length > 0 &&
            userRole.forEach((list) => {
                data.push({
                    label: list.first_name,
                    value: list.id,
                });
            });
        setownerValue(data);
    };

    const getRolePermission = async () => {
        const statusPermission = hasPermission(Permission.STOCK_ENTRY_MANAGE_OTHERS)
        setPermissionLists(statusPermission);
        setIsLoading(false);
    };


    //  Get Stock Entry Details
    const getDetails = async () => {
        const response = await apiClient.get(
            `${endpoints().stockEntry}/${stockEntryId}`
        );
        setDetail(() => response?.data);
    }

    //  Get Store List
    const storeList = async () => {

        try {
            let storeListArray = [];
            const stores = await getStoresList();
            if (ArrayList.isNotEmpty(stores)) {
                stores.forEach((store) => {
                    storeListArray.push({
                        id: store.id,
                        label: store.label,
                        value: store.label,
                    });
                });
            }
            setStore(storeListArray);
        } catch (err) {
            console.log(err);
        }
    };

    const getproductId = async () => {
        let params = { pagination: false, stockEntryId: stockEntryId };
        const response = await StockEntryProductService.search(params);

        const data = response.data.data;
        let productsId = [];
        for (let i = 0; i < data.length; i++) {
            let { product_id } = data[i];
            productsId.push(product_id);
        }
        setProductIds(productsId);
    };

    // Handle form Submit
    const submit = async (values) => {
        try {
            const data = new FormData();
            // store id
            data.append("storeId", values?.location?.id);

            // date
            data.append("date", DateTime.toISOStringDate(values?.date));
            data.append("due_date", DateTime.toISOStringDate(values?.due_date));

            data.append("owner", values?.owner?.id);


            apiClient
                .put(`${endpoints().stockEntry}/${stockEntryId}`, data)
                .then((res) => {
                    if (res.status == SUCCESS_RESPONSE) {
                        toast.success(res?.data?.message);
                    }
                })
                .catch((err) => {
                    if (isBadRequest(err)) {
                        let errorMessage;
                        const errorRequest = err.response.request;
                        if (errorRequest && errorRequest.response) {
                            errorMessage = JSON.parse(errorRequest.response).message;
                        }
                        toast.error(errorMessage);
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };

    const AddStockProductEntry = (values) => {
        try {
            const data = new FormData()
            data.append("productIds", MultiSelectProduct);
            data.append("stockEntryId", stockEntryId);
            data.append("storeId", detail?.store_id);


            if (stockEntryId) {
                //cretae parms,
                let params = { stockEntryId: stockEntryId, pagination: true };
                //add stock product entry data
                dispatch(StockEntryProductService.create
                    (
                        data,
                        addProductToggle,
                        { stockEntryId, pagination: true, sort: "id", sortDir: "DESC" }
                    ));
            }
            dispatch(
                fetchList(
                    "product",
                    `${endpoints().productAPI}/search`,
                    1,
                    25,
                    {
                        excludeIds: productIds,
                    }
                )
            );
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {

        if (e == "Delete") {
            setDeleteModal(true);
        }
    };

    const actionOptions = [
        {
            label: "Delete",
            value: "Delete",
        }
    ];

    const deleteStockEntry = async (id) => {

        try {
            StockEntryService.delete(id, props)


        } catch (err) {
            console.log(err);
        }

    }

    // Handle status change
    const handleStatusChange = (status) => {

        const data = new FormData();
        // status
        data.append("status", status ? status : "");

        dispatch(StockEntryService.update(stockEntryId, data, getDetails, {}));
        setStatus("")

    };

    const handleChangeStatus = (selectStatus) => {
        if (selectStatus) {
            setStatus(selectStatus);
        }
        StockEntryService.update(stockEntryId, status, {});
    };

    if (isLoading) {
        return <Spinner />;
    }

    //Get Role Permission
    const getRolePermissions = async () => {
        const statusPermission = hasPermission(Permission.STOCK_ENTRY_STATUS)
        setPermissionList(statusPermission);
        setIsLoading(false);
    };

    // Add stock modal toggling
    const addProductToggle = () => {
        setAddProductModal(false);
        setMultiSelectProduct("");
    };


    // MultiSelect Stock Values
    const multiselect = (values) => {
        setMultiSelectProduct(values);
    };

    // Modal Body of Add Stock
    const addStockForm = (
        <StockList
            storeId={detail?.store_id}
            stockEntryId={stockEntryId}
            MultiSelectProduct={multiselect}
            history={props.history}
        />
    );


    // Modal Footer of Add Stock
    const stockFooter = (
        <Button label="Add Product"
            onClick={(values) => {
                AddStockProductEntry(values);
            }} />

    );

    const locationName = store && store.find((data) => data.id == detail?.store_id);

    return (
        <>
            {/* Stock Delete Modal */}
            <DeleteModal
                id={stockEntryId}
                label={detail?.stock_entry_number}
                isOpen={deleteModal}
                toggle={() => {
                    setDeleteModal(false);
                }}
                title="Delete"
                deleteFunction={() => deleteStockEntry(stockEntryId)}
            />
            {/* Stock Add Modal */}

            <ProductSelectModal
                modalOpen={addStoreModal}
                toggle={toggle}
                toggleModalClose={addProductToggle}
                BulkSelect={multiselect}
                history={history}
                handleSubmit={AddStockProductEntry}
                params={{ excludeIds: productIds }}


            />
            <BreadCrumb list={breadcrumbList} />

            <div className="d-flex justify-content-between">

                <PageTitle
                    label={`Stock Entry# ${detail?.stock_entry_number} (${locationName?.label} )`}
                />
                <div className="d-flex">
                    {activeTab == Tab.PRODUCTS ? (
                        <AddButton
                            label={"Add New"}
                            onClick={() => {
                                setAddProductModal(true);
                            }}
                            className="mx-1"
                        />) : ""}
                    <div className="mr-2">
                        {activeTab == Tab.GENERAL ? (
                            <StatusComponent
                                objectName={ObjectName.STOCK_ENTRY}
                                handleChange={handleStatusChange}
                                buttonLabel={detail?.status}
                                currentStatusId={detail?.statusId}
                            />
                        ) : ""}
                    </div>

                    <Action
                        dropdownLinks={actionOptions}
                        handleChange={handleChange}
                    />
                </div>
            </div>

            <Nav tabs className="admin-tabs mb-1">
                {/* GENERAL Tab */}
                <NavItem>
                    <NavLink
                        className={classNames({
                            active: activeTab === Tab.GENERAL,
                        })}
                        onClick={() => {
                            toggle(Tab.GENERAL);
                            _handleTabChange(Tab.GENERAL);
                        }}
                    >
                        General
                    </NavLink>
                </NavItem>

                {/* PRODUCT tab */}
                <NavItem>
                    <NavLink
                        className={classNames({
                            active: activeTab === Tab.PRODUCTS,
                        })}
                        onClick={() => {
                            toggle(Tab.PRODUCTS);
                            _handleTabChange(Tab.PRODUCTS);
                        }}
                    >
                        Products
                    </NavLink>
                </NavItem>
                <NavItem>
                    {showHistory && <NavLink
                        className={classNames({
                            active: activeTab === Tab.HISTORY,
                        })}
                        onClick={() => {
                            toggle(Tab.HISTORY);
                            _handleTabChange(Tab.HISTORY);
                        }}
                    >
                        History
                    </NavLink>}
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                {activeTab == Tab.GENERAL &&
                    <TabPane tabId={Tab.GENERAL}>
                        <DefaultContent>
                            <Form
                                enableReinitialize={true}
                                initialValues={{
                                    location:
                                        (Array.isArray(store) && store.find((data) => data.id == detail?.store_id)),
                                    status: statusOptions.find((data) => detail?.status == data.value),
                                    date: DateTime.getDateTimeByUserProfileTimezone(detail?.date),
                                    due_date: detail?.due_date ? DateTime.getDateTimeByUserProfileTimezone(detail?.due_date) : "",
                                    owner: (Array.isArray(ownerValue) && ownerValue.find((data) => data.value == detail?.owner_id))
                                        ? (Array.isArray(ownerValue) && ownerValue.find((data) => data.value == detail?.owner_id))
                                        : (Array.isArray(ownerValue) && ownerValue.find((data) => data.label == StockOwner)),
                                }}
                                onSubmit={(values) => {
                                    submit(values);
                                }}
                            >
                                <SelectStore
                                    name="location"
                                    label="Location"
                                    isDisabled={PermissionList ? false : true}
                                />
                                <DateSelector
                                    name="date"
                                    fontBolded
                                    label="Date"
                                    disabled={PermissionList ? false : true}
                                />
                                <UserSelect
                                    label="Owner"
                                    name="owner"
                                    isDisabled={PermissionLists ? false : true}
                                />
                                <DateSelector
                                    name="due_date"
                                    fontBolded
                                    label="Due Date"
                                    disabled={PermissionList ? false : true}
                                />
                                <SaveButton />
                                <CancelButton
                                    onClick={() => props.history.push(`/stockEntry`)}
                                />
                            </Form>
                        </DefaultContent>
                    </TabPane>}
                {activeTab == Tab.PRODUCTS &&
                    <TabPane tabId={Tab.PRODUCTS}>
                        {activeTab === Tab.PRODUCTS && (
                            <StockEntryProduct
                                storeId={detail?.store_id}
                                id={stockEntryId}
                                history={props.history}
                                stock_entry_date={detail?.date}
                            />
                        )}
                    </TabPane>}
                {showHistory && activeTab === Tab.HISTORY && (
                    <TabPane tabId={Tab.HISTORY} className="w-100">
                        <ActivityList
                            id={stockEntryId}
                            objectId={stockEntryId}
                            object_name={ObjectName.STOCK_ENTRY}
                        />
                    </TabPane>)}
            </TabContent >

        </>
    )
};
export default StockEntryDetails;