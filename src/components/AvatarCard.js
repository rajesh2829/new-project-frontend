import PropTypes from "prop-types";
import React from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

class AvatarCard extends React.Component {
  render() {
    const {
      title,
      firstName,
      lastName,
      square,
      email,
      url,
      productImageIcon,
      mobileNumber,
    } = this.props;

    const names = [];
    if (firstName) {
      names.push(firstName);
    }

    if (lastName) {
      names.push(lastName);
    }


    const name = names.join(" ");

    const handleMailClick = () => {
      window.location.href = `mailto:${email}`;
    };
    const handlePhoneClick = () => {
      window.location.href = `callto:${mobileNumber}`;
    };
    return (
      <div className="d-table">

        {(name || title) && (
          <>
            <div className="d-table-cell align-middle"
              style={{
                paddingRight: 10,
              }}>
              <Avatar
                {...this.props} />
            </div>
            <div className="d-table-cell align-middle">
              {(title || name) && (
                <h6>{title || name}</h6>
              )}
              {email && (
                <Link>
                  <h6 onClick={handleMailClick}>{email}</h6>
                </Link>
              )}
              {mobileNumber && (
                <Link>
                  <h6 onClick={handlePhoneClick}>{mobileNumber}</h6>
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    );
  }
}

AvatarCard.propTypes = {
  url: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  title: PropTypes.string,
  defaultUrl: PropTypes.string,
  size: PropTypes.string,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  square: PropTypes.bool,
  customSize: PropTypes.number,
};

export default AvatarCard;
