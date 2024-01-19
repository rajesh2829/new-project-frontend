import React, { useEffect, useState } from "react";
import Form from "../../../components/Form";
import Select from "../../../components/Select";

import { saveSetting,getCompanySettings } from "../../../services/SettingService";

import SlackService from "../../../services/SlackService";

import SaveButton from "../../../components/SaveButton";


import { getKeyValueByObject } from "../../../lib/Helper";

import { fetchSettings } from "../../../actions/settings";

import { useDispatch } from "react-redux";

import { Setting } from "../../../helpers/Setting";

import ArrayList from "../../../lib/ArrayList";

const SlackTab = (props) => {


    const [slackChannel, setSlackChannel] = useState([]);
    const [settings, setSettings] = useState([])

    const dispatch = useDispatch();

    useEffect(() => {
        getSlackChannelList();
        getSettings()
    }, []);
    const getSettings = async () => {
        const settingData = await getCompanySettings();
        setSettings(settingData)
      };

    const getSlackChannelList = async () => {

        let response = await SlackService.getChannelList();

        if (response && response.channels) {
            let channel = [];

            let channelList = response.channels

            if (channelList && channelList.length > 0) {
                for (let i in channelList) {
                    let { id, name } = channelList[i];
                    channel.push({
                        label: name,
                        value: id,
                        id: id,
                    });
                }
            }
            setSlackChannel(channel);
        }
    }

    const handleSubmit = (values) => {

        if (values) {
            let bodyData = {
                visitor_notification_channel: values.visitor_notification_channel ? values.visitor_notification_channel.value : "",
                attendance_notification_channel: values.attendance_notification_channel ? values.attendance_notification_channel.value : "",
                attendance_leave_notification_channel: values.attendance_leave_notification_channel ? values.attendance_leave_notification_channel.value : "",
                attendance_additional_day_notification_channel: values.attendance_additional_day_notification_channel ? values.attendance_additional_day_notification_channel.value : ""
            }

            saveSetting(bodyData, null, () => {
                dispatch(fetchSettings())
            });
        }
    }

    return (
        <div className="card card-body">
            <Form
                initialValues={{
                    visitor_notification_channel: ArrayList.isNotEmpty(slackChannel) && ArrayList.isNotEmpty(settings) && slackChannel.find((data) => data.value == getKeyValueByObject(settings, Setting.SETTING_VISITOR_NOTIFICATION_CHANNEL)),
                    attendance_notification_channel: ArrayList.isNotEmpty(slackChannel) &&  ArrayList.isNotEmpty(settings) && slackChannel.find((data) => data.value == getKeyValueByObject(settings, Setting.SETTING_ATTENDANCE_NOTIFICATION_CHANNEL)),
                    attendance_leave_notification_channel: ArrayList.isNotEmpty(slackChannel) &&  ArrayList.isNotEmpty(settings) && slackChannel.find((data) => data.value == getKeyValueByObject(settings, Setting.SETTING_ATTENDANCE_LEAVE_NOTIFICATION_CHANNEL)),
                    attendance_additional_day_notification_channel: ArrayList.isNotEmpty(slackChannel) &&  ArrayList.isNotEmpty(settings) && slackChannel.find((data) => data.value == getKeyValueByObject(settings, Setting.SETTING_ATTENDANCE_ADDITIONAL_DAY_NOTIFICATION_CHANNEL)),
                }}
                enableReinitialize={true}
                onSubmit={(value) => handleSubmit(value)}
            >
                <Select name={Setting.SETTING_VISITOR_NOTIFICATION_CHANNEL} options={slackChannel} label="Visitor Notification Channel" />

                <Select name={Setting.SETTING_ATTENDANCE_NOTIFICATION_CHANNEL} options={slackChannel} label="Attendance Notification Channel" />
              
                <Select name={Setting.SETTING_ATTENDANCE_LEAVE_NOTIFICATION_CHANNEL} options={slackChannel} label="Attendance Leave Notification Channel" />
                
                <Select name={Setting.SETTING_ATTENDANCE_ADDITIONAL_DAY_NOTIFICATION_CHANNEL} options={slackChannel} label="Attendance Additional Day Notification Channel" />

                <SaveButton label="Save" />

               
            </Form>
        </div>
    )
}

export default SlackTab;