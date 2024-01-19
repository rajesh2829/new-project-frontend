import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Form from "../../../components/Form";
import Select from "../../../components/Select";
import Url from "../../../lib/Url";
import transferTypeService from "../../../services/TransferTypeService";
import { endpoints } from "../../../api/endPoints";
import { fetchList } from "../../../actions/table";

const TransferFilter = (props) => {
    const { params } = props;
    const [typeList, setTypeList] = useState([]);
    const [typeValue, setTypeValue] = useState(Url.GetParam("type"));
    const dispatch = useDispatch();

    useEffect(() => {
        getTransferTypeList();
    }, []);

    if (typeValue) {
        params.type = typeValue;

    }

    const getTransferTypeList = async () => {
        const { data } = await transferTypeService.get();
        const value = data.data;
        const type = [];
        value.forEach((typeValue) => {
            type.push({
                value: typeValue.id,
                label: typeValue.name,
            });
            setTypeList(type)
        });
    };

    const TypeChange = async (values) => {
        const id = values?.value ? values?.value : "";
        let pageSize = Url.GetParam("pageSize");
        const param = {
            type: id ? id : "",
            search: Url.GetParam("search"),
            pageSize: Url.GetParam("pageSize")
        }

        Url.UpdateUrl({ type: id, pageSize: Url.GetParam("pageSize") }, props)
        setTypeValue(id)
        dispatch(
            fetchList("transfer", `${endpoints().transferApi}/search`, 1, pageSize, {
                ...param,

            })
        );
    }

    const initialValues = {
        type: typeList.find((x) => x?.value == typeValue)
    }

    return (
        <>
            <Form enableReinitialize initialValues={initialValues}>
                <Select
                    name="type"
                    options={typeList}
                    placeholder="Select Type"
                    handleChange={TypeChange}
                    minWidth="150px"
                />
            </Form>
        </>
    );
};

export default TransferFilter;
