import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BreadCrumb from "../../../components/Breadcrumb";
import SaveButton from "../../../components/SaveButton";
import { saveSetting } from "../../../services/SettingService";
import SlackService from "../../../services/SlackService";

const SlackPage = (props) => {
  const [status, setStatus] = useState();
  const dispatch = useDispatch();

  const breadcrumbList = [
    { label: "Home", link: "/admin/dashboard" },
    { label: "Integrations", link: "/integrations/Chat" },
    { label: "Slack", link: "" },
  ];

  const statuses = {
    connect: 0,
    disConnect: 1
  }

  const connect = async () => {
    let response = await SlackService.connect();
    if (response && response.redirectTo) {
      window.location.replace(response.redirectTo);
      getSettings();
    }
  };

  useEffect(() => {
    getSettings();
  }, []);

  const getSettings = async () => {
    const data = await SlackService.status();
    setStatus(data);
  };

  const disConnect = async () => {
    await saveSetting({ slack_access_token: "", slack_refresh_token: "" }, "", () => {
    });
    getSettings();
  };

  return (
    <>
      <BreadCrumb list={breadcrumbList} />
      <div className="col-lg-6 col-md-6 col-sm-6 mt-2">
        <div className="card">
          <div className="card-body d-flex align-items-center">
            <p className="m-2 flex-grow-1 text-left font-weight-bold">
              {"Slack"}
            </p>
            <SaveButton
              onClick={status === statuses.disConnect ? disConnect : connect}
              label={status === statuses.disConnect ? "Disconnect" : "Connect"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SlackPage;
