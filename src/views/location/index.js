import React, { useEffect, useState } from "react";
import CancelButton from "../../components/CancelButton";
import Form from "../../components/Form";
import PageTitle from "../../components/PageTitle";
import SaveButton from "../../components/SaveButton";
import SelectStore from "../../components/SelectStore";
import DefaultContent from "../../components/content/defaultContent";
import { Setting } from "../../helpers/Setting";
import ArrayList from "../../lib/ArrayList";
import { getKeyValueByObject } from "../../lib/Helper";
import { getCompanySettings, saveSetting } from "../../services/SettingService";
import { getStoresList } from "../../services/StoreListService";

const Location = (props) => {
  const [store, setStore] = useState([]);
  const [distributing, setDistributing] = useState([]);
  const [settings, setSettings] = useState({});

  const handleStore = (values) => {
    setStore(values && values.value);
  };

  const getSettings = async () => {
    //get company setting
    const settingData = await getCompanySettings();
    //set setting in state
    setSettings(settingData);
  };

  useEffect(() => {
    getDistributing_Center();
    getSettings();
  }, []);

  const initialValues = {
    Location:
      settings &&
      ArrayList.isNotEmpty(distributing)
      &&
      distributing.find(
        (data) =>
          data.id ==
          getKeyValueByObject(settings, Setting.DISTRIBUTION_CENTER)
      ),
  };

  const getDistributing_Center = async () => {
    let response = await getStoresList();
    setDistributing(response);
  };

  const submit = async (values) => {
    const data = new FormData();
    data.append(Setting.DISTRIBUTION_CENTER, values?.Location?.value);
    await saveSetting(data);
  };

  return (
    <>
      <PageTitle label="Location" />

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
              <SelectStore
                name="Location"
                label="Distribution Center"
                placeholder="Select Distribution Center"
                handleStoreChange={handleStore}
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

export default Location;
