import React, { useEffect, useState } from "react";
import CancelButton from "../../components/CancelButton";
import Form from "../../components/Form";
import PageTitle from "../../components/PageTitle";
import SaveButton from "../../components/SaveButton";
import DefaultContent from "../../components/content/defaultContent";
import { Setting } from "../../helpers/Setting";
import ArrayList from "../../lib/ArrayList";
import { getKeyValueByObject } from "../../lib/Helper";
import { getCompanySettings, saveSetting } from "../../services/SettingService";
import Select from "../../components/Select";

const Replenishment = () => {
    const [settings, setSettings] = useState({});

    useEffect(() => {
        getSettings();
    }, []);

    const getSettings = async () => {
        const settingData = await getCompanySettings();
        setSettings(settingData);
    };

    const replenishmentByOption = [{ label: "Stock", value: 1 }, { label: "Order", value: 2 }];

    const initialValues = {
        replenishment_by:
            settings && ArrayList.isNotEmpty(settings) &&
            replenishmentByOption.find((data)=> data.value == getKeyValueByObject(settings, Setting.REPLENISHMENT_BY))

    };

    const handleSubmit = (values) => {
        const data = new FormData();
        if (values && values.replenishment_by !== undefined) {
            data.append(Setting.REPLENISHMENT_BY, values.replenishment_by ?  values.replenishment_by.value : "");
        } 
        // Save settings
        saveSetting(data, null, () => {
            getSettings();
        });
    }

    return (
        <>
            <PageTitle label="Replenishment" />

            <DefaultContent>
                <Form
                    enableReinitialize={true}
                    initialValues={initialValues}
                    onSubmit={(values) => {
                        handleSubmit(values)
                    }}
                >
                    <div className="row field-wrapper ">
                        <div className="col-lg-6 col-sm-6">
                            <Select
                                name="replenishment_by"
                                label="Replenishment By"
                                options={replenishmentByOption}
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

export default Replenishment;
