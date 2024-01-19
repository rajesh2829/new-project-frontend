import PropTypes from "prop-types";
import React from "react";
import Avatar from "../views/order/components/avatar";
import DateTime from "../lib/DateTime";
class UserCard extends React.Component {
  render() {
    const { firstName, mobileNumber, email, status, lastName, timestamp, fontSize, minWidth } =
      this.props;

    return (
      <div className="d-flex align-items-center" style={{ minWidth: minWidth ? minWidth : "" }}>
        <div className="mr-3">
          <Avatar {...this.props} />
        </div>
        <div className="mt-0">
          {firstName && (
            <>
              <div style={{ fontSize: fontSize ? fontSize : "" }}>
                <span className="mr-1">{firstName}</span>
                <span className="mr-1">{lastName}</span>
                <span className="text-danger mr-1">{status}</span>
                {timestamp && (
                  <span style={{ color: "#D3D3D3" }}>
                    updated {DateTime.TimeNow(timestamp)}
                  </span>
                )}
              </div>
              {email && <h6>{email}</h6>}
              {mobileNumber && <h6>{mobileNumber}</h6>}
            </>
          )}
        </div>
      </div>
    );
  }
}

UserCard.propTypes = {
  url: PropTypes.string,
  defaultUrl: PropTypes.string,
  size: PropTypes.string,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  square: PropTypes.bool,
  customSize: PropTypes.number,
};

export default UserCard;
