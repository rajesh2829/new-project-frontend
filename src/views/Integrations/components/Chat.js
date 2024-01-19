import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { faSlack, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const ChatTab = (props) => {
  const { onClickValue } = props;

  const onClick = (value) => {
    if (value) {
      onClickValue("Slack");
    }
  };

  return (
    <div className="col-lg-6 col-md-6 col-sm-6 mt-2">
      <div className="card">
        <Link to={`/integrations/Chat/Slack`} onClick={(e) => onClick(e)}>
          <div className="card-body d-flex align-items-center">
            <FontAwesomeIcon
              icon={faSlack}
              className="d-block"
              style={{ width: "40px", marginRight: "8px", height: "40px" }}
            />
            <p className="m-2 flex-grow-1 text-left font-weight-bold">
              {"Slack"}
            </p>
            <FontAwesomeIcon
              icon={faGreaterThan}
            />
          </div>
        </Link>
      </div>
      <div className="card mt-2">
        <Link to={`/integrations/Chat/WhatsApp`} onClick={(e) => onClick(e)}>
          <div className="card-body d-flex align-items-center">
            <FontAwesomeIcon
              icon={faWhatsapp}
              className="d-block"
              style={{ width: "40px", marginRight: "8px", height: "40px" }}
            />
            <p className="m-2 flex-grow-1 text-left font-weight-bold">
              {"WhatsApp"}
            </p>
            <FontAwesomeIcon
              icon={faGreaterThan}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ChatTab;
