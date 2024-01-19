import propTypes from "prop-types";
import React from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

class CountCard extends React.Component {
  render() {
    const { count, label, prefix, redirectUrl, countColor, icon, subText } =
      this.props;

    return (
      <div className="card m-2 p-3">
        {/* Card label */}
        <h6 className="font-weight-bold">{label}</h6>
        <div
          className="mt-2 d-flex align-items-center"
          style={{ color: countColor }}
        >
          {/* Icon */}
          <div className="mr-4">
            <img src={icon} alt={label} height="50px" />
          </div>
          {/* Count */}
          <div>
            <h3 className="mb-0 font-weight-bold">
              <CountUp
                separator=","
                start={0}
                end={count || 0}
                duration={3}
                prefix={prefix}
              />
            </h3>
            <Link
              style={{ color: countColor, textDecoration: "underline" }}
              to={redirectUrl || "#"}
            >
              {subText}
            </Link>
          </div>
          {/* ----- */}
        </div>
      </div>
    );
  }
}

StatisticsCountCard.propTypes = {
  count: propTypes.number,
  label: propTypes.string.isRequired,
  prefix: propTypes.string,
};

export default CountCard;
