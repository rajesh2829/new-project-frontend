import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchList } from "../../../actions/table";
import { endpoints } from "../../../api/endPoints";
import Form from "../../../components/Form";
import Select from "../../../components/Select";
import { User } from "../../../helpers/User";
import { UpdateUrl } from "../../../lib/Url";
import Url from "../../../lib/Url";

const UserFilter = (props) => {

    //Props
    const { showSidebar, toggleSidebar, handleReset, setRole, initialParam, roleLists, getFilterParams, activeTab } = props;

    const [param, setParam] = useState({ role: "" });

    const dispatch = useDispatch();

    useEffect(() => {
        setParam(Url.GetParam("role"));
    }, [initialParam]);

    // Handle role change
    const handleRoleChange = (role) => {
        setRole(role);
        const data = role?.value;
        let params = { ...param };
        if (role) { params.role = role?.value };
        if (!role) { params.role = "" };
        let pageSize = Url.GetParam("pageSize");
        Url.UpdateUrl({ role: data ? data : "" }, props);
        setParam(params);
        getFilterParams(params);
        dispatch(fetchList(activeTab == User.ACTIVE_USER_TAB ? User.ACTIVE_USER_TAB
            : User.ACTIVE_USER_TAB, `${endpoints().userAPI}/search`, 1, pageSize,
            {
                role: data,
                tab: User.ACTIVE_USER_TAB,
                status: User.STATUS_ACTIVE_VALUE,
                search: Url.GetParam("search") || "",
                pagination: true,
            }));
        dispatch(fetchList(activeTab == User.INACTIVE_USER_TAB ? User.INACTIVE_USER_TAB
            : User.INACTIVE_USER_TAB, `${endpoints().userAPI}/search`, 1, pageSize,
            {
                role: data,
                tab: User.INACTIVE_USER_TAB,
                status: User.STATUS_INACTIVE_VALUE,
                search: Url.GetParam("search") || "",
                pagination: true,
            }));
        dispatch(fetchList(User.ALL_USERS_TAB, `${endpoints().userAPI}/search`, 1, pageSize,
            {
                role: data,
                search: Url.GetParam("search") || "",
                pagination: true,
            }));
    };

    // Initial Values
    const initialValues = {
        role: roleLists.find((data) => data.value == initialParam.role) || "",
    };

    return (

        <div className={`${showSidebar == true ? "visible slide-Right" : "invisible slide-Left"} sidebar`}>
            <div className="pt-3 pl-3 pr-3">
                <div className="">

                    <Form initialValues={initialValues} enableReinitialize>
                        <div className="filter-sidebar align-items-center d-inline-block w-100 pr-2">
                            <div className="col-md-4 mt-3">
                                <h5 class="text-dark pull-left">Filters </h5>
                            </div>
                            <button
                                type="button"
                                class="btn btn-secondary btn-lg pull-right active btn-sm"
                                onClick={() => {
                                    handleReset();
                                }}
                            >
                                Reset
                            </button>
                            <button
                                type="button"
                                class="btn btn-danger pull-right btn-lg active btn-sm mr-2"
                                onClick={toggleSidebar}
                            >
                                Close
                            </button>
                            <br /><br />
                            <div className="sidbar-minheight m-2">
                                {/* role Filter */}
                                <div className="m-1 border-dark">
                                    <Select
                                        name="role"
                                        placeholder="Select Role"
                                        options={roleLists}
                                        handleChange={handleRoleChange}
                                    />
                                </div>

                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default UserFilter;