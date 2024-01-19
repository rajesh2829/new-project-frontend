import React, { useEffect, useState } from "react";
import CancelButton from "../../components/CancelButton";
import Form from "../../components/Form";
import PageTitle from "../../components/PageTitle";
import SaveButton from "../../components/SaveButton";
import SingleCheckbox from "../../components/SingleCheckbox";
import TimeZoneSelect from "../../components/TimeZoneSelect";
import DefaultContent from "../../components/content/defaultContent";
import { Setting } from "../../helpers/Setting";
import ArrayList from "../../lib/ArrayList";
import DateTime from "../../lib/DateTime";
import { getKeyValueByObject } from "../../lib/Helper";
import { getCompanySettings, saveSetting } from "../../services/SettingService";
import CompanyUserService from "../../services/UserService";
import Select from "../../components/Select";

const General = () => {
    const [settings, setSettings] = useState({});
    const [timeZones, setTimeZone] = useState([]);
    const [userList, setUserList] = useState([]);

    const getSettings = async () => {
        const settingData = await getCompanySettings();
        setSettings(settingData);
    };

    useEffect(() => {
        getSettings();
        getTimeZones();
        getUserList();
    }, []);

    const initialValues = {
        after_login_show_store_selection:
            settings && ArrayList.isNotEmpty(settings) &&
                getKeyValueByObject(settings, Setting.AFTER_LOGIN_SHOW_STORE_SELECTION) == "true" ? true : false,
        device_approval_required:
            settings && ArrayList.isNotEmpty(settings) &&
                getKeyValueByObject(settings, Setting.DEVICE_APPROVAL_REQUIRED) == "true" ? true : false,
        user_default_time_zone: settings && ArrayList.isNotEmpty(settings) &&
            timeZones.find((data) => data.value == getKeyValueByObject(settings, Setting.USER_DEFAULT_TIME_ZONE)),

        system_user: settings && ArrayList.isNotEmpty(settings) &&
            userList.find((data) => data.id == getKeyValueByObject(settings, Setting.SYSTEM_USER))

    };

    const handleCheckBoxValue = (values) => {
        const data = new FormData();

        if (values && values.after_login_show_store_selection !== undefined) {
            data.append(Setting.AFTER_LOGIN_SHOW_STORE_SELECTION, values.after_login_show_store_selection);
        }

        // Save settings
        saveSetting(data, null, () => {
            getSettings();
        });
    }

    const handleMobileCheckBoxValue = (values) => {
        const data = new FormData();

        if (values && values.device_approval_required !== undefined) {
            data.append(Setting.DEVICE_APPROVAL_REQUIRED, values.device_approval_required);
        }

        // Save settings
        saveSetting(data, null, () => {
            getSettings();
        });
    }

    const handleSubmit = (values) => {

        const data = new FormData();

        if (values && values.after_login_show_store_selection !== undefined) {
            data.append(Setting.AFTER_LOGIN_SHOW_STORE_SELECTION, values.after_login_show_store_selection);
        }

        if (values && values.user_default_time_zone !== undefined) {
            data.append(Setting.USER_DEFAULT_TIME_ZONE, values.user_default_time_zone.value);
        }


        if (values && values.system_user !== undefined) {
            data.append(Setting.SYSTEM_USER, values.system_user.id);
        }

        if (values && values.device_approval_required !== undefined) {
            data.append(Setting.DEVICE_APPROVAL_REQUIRED, values.device_approval_required);
        }
        // Save settings
        saveSetting(data, null, () => {
            getSettings();
        });
    }

    const getTimeZones = () => {

        let timeZones = DateTime.getTimeZones();

        let timeZoneList = new Array();

        for (let i = 0; i < timeZones.length; i++) {
            timeZoneList.push({
                label: timeZones[i],
                value: timeZones[i]
            })
        }

        setTimeZone(timeZoneList);
    }

    const getUserList = async () => {
        const users = await CompanyUserService.getOption();
        setUserList(users);
    }

    return (
        <>
            <PageTitle label="General" />
            <DefaultContent>
                <Form
                    enableReinitialize={true}
                    initialValues={initialValues}
                    onSubmit={(values) => {
                        handleSubmit(values)
                    }}

                >
                    <div className="row field-wrapper">
                        <div className="col-lg-6 col-sm-6">
                            <TimeZoneSelect
                                name="user_default_time_zone"
                                label="Default Time Zone"
                            />
                        </div>
                    </div>
                    <div className="row field-wrapper">
                        <div className="col-lg-6 col-sm-6">
                            <Select
                                name="system_user"
                                label="System User"
                                options={userList}
                            />
                        </div>
                    </div>
                    <div className="row field-wrapper mt-3">
                        <div className="col-lg-12 col-sm-12">
                            <SingleCheckbox
                                name={Setting.AFTER_LOGIN_SHOW_STORE_SELECTION}
                                label={"After Login Show Location Selection"}
                                handleOnChangeSubmit={(value, name) =>
                                    handleCheckBoxValue(value, name)
                                }
                            />
                        </div>
                    </div>
                    <div className="row field-wrapper mt-3">
                        <div className="col-lg-12 col-sm-12">
                            <SingleCheckbox
                                name={Setting.DEVICE_APPROVAL_REQUIRED}
                                label={"Device Approval Required"}
                                handleOnChangeSubmit={(value, name) =>
                                    handleMobileCheckBoxValue(value, name)
                                }
                            />
                        </div>
                    </div>
                    <SaveButton label={"Save"} />
                    <CancelButton onClick={() => props.history.goBack()} />
                </Form>
            </DefaultContent>
        </>
    );
};

export default General;
