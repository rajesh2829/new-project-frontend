import React, { useEffect, useState } from "react";

// Components
import SelectStore from "../../../components/SelectStore";
import Select from "../../../components/Select";
import SingleCheckbox from "../../../components/SingleCheckbox";
import MultiSelect from "../../../components/Multiselect";
import Text from "../../../components/Text";

// Services
import UserRoleService from "../../../services/UserRoleService";
import StatusService from "../../../services/StatusService";

// Helpers
import TransferType from "../../../helpers/TransferType";
import ObjectName from "../../../helpers/ObjectName";


function TransferTypeForm() {
    const [userRole, setUserRole] = useState();
    const [statusList, setStatusList] = useState([]);
    useEffect(() => {
        getUserRole()
        getStatus()
    }, []);

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
    }

    return (
        <>
            <div className="card bg-white">
                <div className="card-body">
                    <Text
                        name="name"
                        label="Name"
                        placeholder="Enter Name..."
                        required
                    />
                    <Select
                        fullWidth={true}
                        label="Status"
                        name="status"
                        isClearable
                        options={TransferType.statusOptions}
                        required
                    />
                    <Select
                        fullWidth={true}
                        label="Group"
                        name="group"
                        isClearable
                        options={TransferType.groupOptions}
                    />
                    <SelectStore
                        label="Default From Location"
                        name="default_from_store"
                        isClearable
                        placeholder="Enter Default From Location..."
                    />
                    <SelectStore
                        label="Default To Location"
                        name="default_to_store"
                        isClearable
                        placeholder="Enter Default To Location..."
                    />
                    <MultiSelect
                        label="Allowed Roles"
                        name="allowedUser"
                        options={userRole ? userRole : []}
                    />
                    <MultiSelect
                        label="Allowed Status"
                        name="allowedStatus"
                        options={statusList}
                    />
                    <div className="d-flex flex-column">
                        <SingleCheckbox
                            name="allow_to_change_from_store"
                            label="Allow To Change From Location"
                            className="accepted-terms mr-3 mt-1"
                        />
                        <SingleCheckbox
                            name="allow_to_change_to_store"
                            label="Allow To Change To Location"
                            className="accepted-terms mr-3"
                        />
                        <SingleCheckbox
                            name="offline_mode"
                            label="Offline Mode"
                            className="accepted-terms mr-3"
                        />
                        <SingleCheckbox
                            name="allow_replenishment"
                            label="Allow Replenishment"
                            className="accepted-terms mr-3 mt-1"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default TransferTypeForm;
