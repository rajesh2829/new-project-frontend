import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { toast } from "react-toastify";

const Toast = {
  success: (message) => {
    const CustomSuccessToast = (
      <div className={"d-flex text-capitalize"}>
        <FontAwesomeIcon icon={faCircleInfo} className="mt-1" />
        <span className={"ml-1"}>{message}</span>
      </div>
    );

    return toast.success(CustomSuccessToast);
  },

  error: (message) => {
    const CustomErrorToast = (
      <div className={"d-flex text-capitalize"}>
        <FontAwesomeIcon icon={faCircleInfo} className="mt-1" />
        <span className={"ml-1"}>{message}</span>
      </div>
    );

    return toast.error(CustomErrorToast);
  },

  warn: (message) => {
    const CustomWarnToast = (
      <div className={"d-flex text-capitalize"}>
        <FontAwesomeIcon icon={faCircleInfo} className="mt-1" />
        <span className={"ml-1"}>{message}</span>
      </div>
    );

    return toast.warn(CustomWarnToast);
  },
};

export default Toast;
