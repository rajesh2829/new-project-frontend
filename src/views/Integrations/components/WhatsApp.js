import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../components/Breadcrumb";
import CancelButton from "../../../components/CancelButton";
import Form from "../../../components/Form";
import PageTitle from "../../../components/PageTitle";
import SaveButton from "../../../components/SaveButton";
import Text from "../../../components/Text";
import DefaultContent from "../../../components/content/defaultContent";
import { Setting } from "../../../helpers/Setting";
import { getKeyValueByObject } from "../../../lib/Helper";
import { getCompanySettings, saveSetting } from "../../../services/SettingService";

const WhatsApp = (props) => {
    
    const [settings, setSettings] = useState({});

    const getSettings = async () => {
        //get company setting
        const settingData = await getCompanySettings();
        //set setting in state
        setSettings(settingData);
    };

    useEffect(() => {
        getSettings();
    }, []);

    const initialValues = {
        whatsapp_access_token: getKeyValueByObject(settings, Setting.SETTING_WHATSAPP_ACCESS_TOKEN),
    };

    const submit = async (values) => {
        const data = new FormData();
        data.append(Setting.SETTING_WHATSAPP_ACCESS_TOKEN, values?.whatsapp_access_token);
        await saveSetting(data);
    };
    const breadcrumbList = [
        { label: "Home", link: "/admin/dashboard" },
        { label: "Integrations", link: "/integrations/Chat" },
        { label: "WhatsApp", link: "" },
    ];

    return (
        <>
            <BreadCrumb list={breadcrumbList} />
            <PageTitle label="WhatsApp" />

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
                                name="whatsapp_access_token"
                                label="Access Token"
                                placeholder="Enter Access Token"
                                error=""
                                required={true}
                            />
                            <SaveButton />
                            <CancelButton onClick={() => props.history.push("/integrations/Chat")} />
                        </div>
                    </div>
                </Form>
            </DefaultContent>
        </>
    );
};

export default WhatsApp;
