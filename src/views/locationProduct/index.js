import React, { useEffect, useState } from "react";
import CancelButton from "../../components/CancelButton";
import Form from "../../components/Form";
import PageTitle from "../../components/PageTitle";
import SaveButton from "../../components/SaveButton";
import DefaultContent from "../../components/content/defaultContent";
import ArrayList from "../../lib/ArrayList";
import { getKeyValueByObject } from "../../lib/Helper";
import { getCompanySettings, saveSetting } from "../../services/SettingService";
import Text from "../../components/Text";
import LocationProduct from "../../helpers/LocationProduct";

const LocationProductSetting = (props) => {
    const [settings, setSettings] = useState({});

    const getSettings = async () => {
        const settingData = await getCompanySettings();
        setSettings(settingData);
    };

    useEffect(() => {
        getSettings();
    }, []);

    const initialValues = {
        location_product_min_quantity_order_days:
            settings && ArrayList.isNotEmpty(settings) &&
            getKeyValueByObject(settings, LocationProduct.MIN_QUANTITY_ORDER_DAYS),
        location_product_max_quantity_order_days:
            settings && ArrayList.isNotEmpty(settings) &&
            getKeyValueByObject(settings, LocationProduct.MAX_QUANTITY_ORDER_DAYS),
    };

    const handleSubmit = (values) => {

        const data = new FormData();

        if (values && values.location_product_min_quantity_order_days !== undefined) {
            data.append(LocationProduct.MIN_QUANTITY_ORDER_DAYS, values.location_product_min_quantity_order_days);
        }

        if (values && values.location_product_max_quantity_order_days !== undefined) {
            data.append(LocationProduct.MAX_QUANTITY_ORDER_DAYS, values.location_product_max_quantity_order_days);
        }

        // Save settings
        saveSetting(data, null, () => {
            getSettings();
        });
    }

    return (
        <>
            <PageTitle label="Location Product" />
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
                            <Text
                                name="location_product_min_quantity_order_days"
                                label="Min Quantity Order Days"
                                placeholder="Enter Min Quantity Order Days"
                            />
                        </div>
                    </div>
                    <div className="row field-wrapper">
                        <div className="col-lg-6 col-sm-6">
                            <Text
                                name="location_product_max_quantity_order_days"
                                label="Max Quantity Order Days"
                                placeholder="Enter Max Quantity Order Days"
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

export default LocationProductSetting;
