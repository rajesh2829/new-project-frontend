import React from "react";

const SystemLogList = () => {

  return (
    <>
      <div>
        <p>
          <strong>Ranjith </strong>
          <span className="text-muted"> made changes - 8 hours ago</span>
        </p>
        <br />
        <div className="row">
          <div className="col-2 text-center text-capitalize">Field Name</div>
          <div className="col-5 text-left">Original Value</div>
          <div className="col-2 text-left">New Value</div>
        </div>
      </div>
    </>
  );
};

export default SystemLogList;
