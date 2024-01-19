import React, { useEffect, useState } from "react";
import Form from "../../components/Form";
import SaveButton from "../../components/SaveButton";
import Select from "../../components/Select";
import { getCompanySettings, saveSetting } from "../../services/SettingService";
import { getKeyValueByObject } from "../../lib/Helper";
import { Setting } from "../../helpers/Setting";
import StatusService from "../../services/StatusService";
import ObjectName from "../../helpers/ObjectName";
import ArrayList from "../../lib/ArrayList";

const SettingPage = () => {
  const [matchedStatus, setMatchedStatus] = useState(null);
  const [notMatchedStatus, setNotMatchedStatus] = useState(null);
  const [statusList, setStatusList] = useState([]);

  const [settings, setSettings] = useState([]);

  useEffect(() => {
    getStatusList();
    getSettings();
  }, []);

  const getStatusList = async () => {
    const list = await StatusService.search(ObjectName.STOCK_ENTRY_PRODUCT);
    let statusValue = [];
    list &&
      list.forEach((value) => {
        statusValue.push({
          label: value.name,
          id: value.id,
          value: value.id
        });
      });
    setStatusList(statusValue);
  };

  const getSettings = async () => {
    const settingData = await getCompanySettings();
    setSettings(settingData);
  };

  const handleUpdate = async (values) => {
    let data = new FormData();
    data.append(
      Setting.MACHED_STATUS,
      values && values?.matched_status?.value
        ? values?.matched_status?.value
        : ""
    );
    data.append(
      Setting.NOT_MACHED_STATUS,
      values && values?.not_matched_status?.value
        ? values?.not_matched_status?.value
        : ""
    );

    saveSetting(data, null, (res) => {
      if (res) {
      }
    });
  };

  const handleMatchedChange = (values) => {
    let dataValue = values && values?.value;
    if (dataValue !== null) {
      setMatchedStatus(dataValue);
    } else {
      setMatchedStatus(null);
    }
  };

  const handleNotMatchedChange = (values) => {
    let dataValue = values && values?.value;
    if (dataValue !== null) {
      setNotMatchedStatus(dataValue);
    } else {
      setNotMatchedStatus(null);
    }
  };

  return (
    <div>
      <Form
        enableReinitialize={true}
        initialValues={{
          matched_status: matchedStatus
            ? statusList.find((data) => data.value == matchedStatus)
            : settings &&
              ArrayList.isNotEmpty(settings) &&
              getKeyValueByObject(settings, Setting.MACHED_STATUS)
              ? statusList.find(
                (data) =>
                  data.value ==
                  getKeyValueByObject(settings, Setting.MACHED_STATUS)
              )
              : "",
          not_matched_status: notMatchedStatus
            ? statusList.find((data) => data.value == notMatchedStatus)
            : settings &&
              ArrayList.isNotEmpty(settings) &&
              getKeyValueByObject(settings, Setting.NOT_MACHED_STATUS)
              ? statusList.find(
                (data) =>
                  data.value ==
                  getKeyValueByObject(settings, Setting.NOT_MACHED_STATUS)
              )
              : ""
        }}
        onSubmit={(values) => {
          handleUpdate(values);
        }}>
        <div className="card bg-white mb-3">
          <div className="card-body">
            <Select
              name={Setting.MACHED_STATUS}
              label="Matched Status"
              placeholder="Select Status"
              options={statusList}
              handleChange={handleMatchedChange}
            />
            <Select
              name={Setting.NOT_MACHED_STATUS}
              label="Not Matched Status"
              placeholder="Select Status"
              options={statusList}
              handleChange={handleNotMatchedChange}
            />
            <div className="mb-4">
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
