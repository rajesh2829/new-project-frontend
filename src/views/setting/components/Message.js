import React, { useEffect, useState } from "react";
import CancelButton from "../../../components/CancelButton";
import Form from "../../../components/Form";
import PageTitle from "../../../components/PageTitle";
import SaveButton from "../../../components/SaveButton";
import Text from "../../../components/Text";
import DefaultContent from "../../../components/content/defaultContent";
import { Setting } from "../../../helpers/Setting";
import { getKeyValueByObject } from "../../../lib/Helper";
import { getCompanySettings, saveSetting } from "../../../services/SettingService";

const Settings = (props) => {
    const [settings, setSettings] = useState({});

    const getSettings = async () => {
        const settingData = await getCompanySettings();
        setSettings(settingData);
    };

    useEffect(() => {
        getSettings();
    }, []);
    const initialValues = {
        message_background_fetch_interval:

            getKeyValueByObject(settings, Setting.MESSAGE_BACKGROUND_FETCH_INTERVAL) || ""

    };

    const submit = async (values) => {
        const data = new FormData();
        data.append(Setting.MESSAGE_BACKGROUND_FETCH_INTERVAL, values?.message_background_fetch_interval);
        await saveSetting(data, null);
    };
    return (
        <>

            <DefaultContent>
                <Form
                    enableReinitialize={true}
                    initialValues={initialValues}
                    onSubmit={(values) => {
                        submit(values);
                    }}
                >
                    <div className="row field-wrapper">
                        <div className="col-lg-12 col-sm-12">
                            <Text
                                name="message_background_fetch_interval"
                                label="Background Fetch Interval"
                                placeholder="Enter Background Fetch Interval"
                                error=""
                                required={true}
                            />

                            <SaveButton />
                            <CancelButton onClick={() => props.history.goBack()} />
                        </div>
                    </div>
                </Form>
            </DefaultContent>
        </>
    );
};

export default Settings;
