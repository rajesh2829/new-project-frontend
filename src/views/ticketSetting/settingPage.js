import React, { useEffect, useState } from "react";
import Form from "../../components/Form";
import SaveButton from "../../components/SaveButton";
import Select from "../../components/Select";
import { getCompanySettings, saveSetting } from "../../services/SettingService";
import { getKeyValueByObject } from "../../lib/Helper";
import { Setting } from "../../helpers/Setting";
import ArrayList from "../../lib/ArrayList";
import ProjectTicketTypeService from "../../services/ProjectTicketTypeService";

const SettingPage = () => {
  const [type, setType] = useState(null);
  const [list, setList] = useState([]);

  const [settings, setSettings] = useState([]);

  useEffect(() => {
    getStatusList();
    getSettings();
  }, []);

  const getStatusList = async () => {
    const data = await ProjectTicketTypeService.list();
    setList(data);
  };

  const getSettings = async () => {
    const settingData = await getCompanySettings();
    setSettings(settingData);
  };

  const handleUpdate = async (values) => {
    let data = new FormData();
    data.append(
      Setting.SALE_SETTLEMENT_MISSING_TICKET_TYPE,
      values && values?.sales_settlement_missing_ticket_type?.value
        ? values?.sales_settlement_missing_ticket_type?.value
        : ""
    );

    saveSetting(data, null, (res) => {
      if (res) {
      }
    });
  };
  
  const handleChange = (values) => {
    let dataValue = values && values?.value;
    if (dataValue !== null) {
      setType(dataValue);
    } else {
      setType(null);
    }
  };

  return (
    <div>
      <Form
        enableReinitialize={true}
        initialValues={{
            sales_settlement_missing_ticket_type: type
            ? list.find((data) => data.value == type)
            : settings &&
              ArrayList.isNotEmpty(settings) &&
              getKeyValueByObject(settings, Setting.SALE_SETTLEMENT_MISSING_TICKET_TYPE)
            ? list.find(
                (data) =>
                  data.value ==
                  getKeyValueByObject(settings, Setting.SALE_SETTLEMENT_MISSING_TICKET_TYPE)
              )
            : ""
        }}
        onSubmit={(values) => {
          handleUpdate(values);
        }}>
        <div className="card bg-white mb-3">
          <div className="card-body">
            <Select
              name={Setting.SALE_SETTLEMENT_MISSING_TICKET_TYPE}
              label="Sale Settlement Missing Ticket Type"
              placeholder="Select Type"
              options={list}
              handleChange={handleChange}
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
