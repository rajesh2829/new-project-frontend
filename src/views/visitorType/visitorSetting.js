import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from '../../components/Form';
import SaveButton from '../../components/SaveButton';
import Select from '../../components/Select';
import TagTypeService from '../../services/TagTypeService';
import { getCompanySettings, saveSetting } from "../../services/SettingService";
import { getKeyValueByObject } from "../../lib/Helper";
import { Setting } from "../../helpers/Setting";

const SettingPage = (props) => {
    const [type, setType] = useState([]);
    const [visitorType, setVisitorType] = useState([])
    let dispatch = useDispatch();

    useEffect(() => {
        getSettings()
        getTypes();
    }, []);

    const getSettings = async () => {
        const settingData = await getCompanySettings();
        let visitorType = getKeyValueByObject(settingData, Setting.VISITOR_TYPE);
        setVisitorType(visitorType)
    };

    const getTypes = async () => {
        let response = await TagTypeService.TagList('Visitor Type');
        let data = response && response?.data;
        if (data && data.length > 0) {
            let list = [];
            for (let i = 0; i < data.length; i++) {
                const { id, name } = data[i];
                list.push({
                    value: id,
                    label: name,
                });
            }
            setType(list);
        }
    };

    const handleUpdate = async (values) => {
        let data = new FormData();
        data.append(
            Setting.VISITOR_TYPE,
            values && values?.visitor_type?.value
        );
        saveSetting(data, null, (res) => {
            if (res) {
            }
        });
    };
    
    return (
        <div>
            <Form
                enableReinitialize={true}
                initialValues={{
                    visitor_type: type && type.length > 0 && type.find((data) => data?.value == visitorType),
                }}
                onSubmit={(values) => {
                    handleUpdate(values);
                }}
            >
                <div className='card bg-white mb-3'>
                    <div className='card-body'>
                        <Select
                            name={Setting.VISITOR_TYPE}
                            label='Visitor Type'
                            options={type}
                        />

                        <div className='mb-4'>
                            <div>
                                <SaveButton />
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
};
export default SettingPage;