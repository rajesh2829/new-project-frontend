import React from "react";

import Form from "../../../components/Form";

import { saveSetting } from "../../../services/SettingService";

import SaveButton from "../../../components/SaveButton";


import { getKeyValueByObject } from "../../../lib/Helper";

import { fetchSettings } from "../../../actions/settings";

import { useDispatch } from "react-redux";

import { Setting } from "../../../helpers/Setting";

import Text from "../../../components/Text";

const WhatsAppTab = (props) => {

    const { settings } = props;

    const dispatch = useDispatch();

    const handleSubmit = (values) => {

        if (values) {
            let bodyData = {
                login_notication_whatsapp_mobile_number: values.login_notication_whatsapp_mobile_number ? values.login_notication_whatsapp_mobile_number : "",
            }

            saveSetting(bodyData,null, () => {
                dispatch(fetchSettings())
            });
        }
    }

    return (
        <div className="card card-body">
            <Form
                initialValues={{
                    login_notication_whatsapp_mobile_number: settings && getKeyValueByObject(settings, Setting.SETTING_LOGIN_WHATSAPP_NOTIFICATION_NUMBER),
                }}
                enableReinitialize={true}
                onSubmit={(value) => handleSubmit(value)}
            >
                <Text
                    name="login_notication_whatsapp_mobile_number"
                    label="Log In Notification Mobile Number"
                    placeholder="Log in Notification Mobile Number"
                    required
                />

                <SaveButton label="Save" />

                
            </Form>
        </div>
    )
}

export default WhatsAppTab;