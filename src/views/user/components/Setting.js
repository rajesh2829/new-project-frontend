import React, { useEffect, useState } from "react";

import { saveSetting } from "../../../services/SettingService";

import TagSelect from "../../../components/TagSelect";
import { TagTypeName } from "../../../helpers/Tag";
import { TabContent, TabPane } from "reactstrap";
import Form from "../../../components/Form";
import SaveButton from "../../../components/SaveButton";
import ObjectName from "../../../helpers/ObjectName";
import Number from "../../../lib/Number";
import TagService from "../../../services/TagService";

export const Tab = {
  SETTING: "Settings",
  STATUS: "Status",
  TYPES: "Types"
};

const Settings = (props) => {

  const { userDetail } = props

  const [tagList, setTagList] = useState([]);

  let params = { type: TagTypeName.PRODUCT };

  useEffect(() => {
    getTags();
  }, []);

  const getTags = async () => {
    const response = await TagService.getOption(params);
    setTagList(response);
  };

  const submit = (values) => {
    let Ids = [];

    let tagData = values && values.product_tag;

    if (tagData && tagData.length > 0) {
      for (let i = 0; i < tagData.length; i++) {
        Ids.push(tagData[i].value);
      }
    }

    const data = new FormData();

    if (values.product_tag !== undefined) {
      data.append("product_tag", Ids.join(",") || "");
    }
    data.append("objectId", userDetail && userDetail.id);
    data.append("objectName", ObjectName.USER);

    // Save settings
    saveSetting(data, "", (error, res) => {
      if (res) {
        props.getUserDetail();
      }
    });
  };

  let tagValue = [];

  if (
    userDetail && userDetail.productTag &&
    userDetail.productTag.length > 0
  ) {
    tagValue = userDetail.productTag.map((tag) => {
      return tagList && tagList.find((data) => data.value === Number.Get(tag));
    });
  }

  const initialValues = {
    product_tag: tagValue
  };

  return (
    <>
      <div>
        <TabContent>
          <TabPane>
            <div className="card card-body">
              <Form
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={(values) => {
                  submit(values);
                }}>
                <div className="row field-wrapper">
                  <div className="col-lg-12 col-sm-12">
                    <TagSelect
                      name="product_tag"
                      placeholder="Select Product Tag"
                      label="Product Tag"
                      params={params}
                      isMulti
                    />
                    <SaveButton />
                  </div>
                </div>
              </Form>
            </div>
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default Settings;
