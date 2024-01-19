import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Form from "../../../components/Form";
import Select from "../../../components/Select";
import StatusService from "../../../services/StatusService";
import ObjectName from "../../../helpers/ObjectName";
import PurchaseOrderService from "../../../services/PurchaseOrderService";
import Url from "../../../lib/Url";


const PurchaseOrderFilter = (props) => {
    const { params } = props;
    const [statusList, setStatusList] = useState([]);
    const [statusValue, setStatusValue] = useState(Url.GetParam("statusId"));
    const dispatch = useDispatch();


    useEffect(() => {
        getStatus();
    }, []);

    if (statusValue) {
        params.statusId = statusValue;

    }

    const getStatus = async () => {
        const demo = await StatusService.search(ObjectName.PURCHASE_ORDER, "");
        const value = demo;
        const status = [];
        value.forEach((statusValue) => {
            status.push({
                value: statusValue.value,
                label: statusValue.label,
            });
            setStatusList(status)
        });
    };

    const statusChange = async (values) => {
        const id = values?.value ? values?.value : "";
        let pageSize = Url.GetParam("pageSize");
        const param = {
            statusId: id ? id : "",
            objectName: ObjectName.PURCHASE_ORDER,

        }
        Url.UpdateUrl({ statusId: id, objectName: ObjectName.PURCHASE_ORDER }, props)
        setStatusValue(id)
        dispatch(await PurchaseOrderService.list(param, pageSize));
    }

    const initialValues = {
        statusId: statusList.find((x) => x?.value == statusValue)
    }

    return (
        <>
            <Form enableReinitialize initialValues={initialValues} >
                <div className="mt-0">
                    <Select
                        name="statusId"
                        options={statusList}
                        placeholder="Select Status"
                        handleChange={statusChange}
                        minWidth="180px"
                    />
                </div>

            </Form>
        </>
    );
};

export default PurchaseOrderFilter;
