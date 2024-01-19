import React from "react";
import propTypes from "prop-types";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

class StatisticsCountCard extends React.Component {
  render() {
    const {
      count,
      label,
      redirectUrl,
      icon,
      borderCurved,
      className
    } = this.props;
    return (
      <Link
        className={`card-statistic col-sm-4 text-center text-decoration-none ${borderCurved
          ? "border-curved" : ""}`}
        to={redirectUrl || "#"}
        style={{ cursor: "pointer" }}
      >
        {icon ? (
          <div className="d-flex align-items-center justify-content-center text-white">
            <span className="text-white">{icon}</span>
          </div>
        ) : (
          ""
        )}
        <span className="count mt-3">
          <CountUp
            separator=","
            start={0}
            end={count || 0}
            duration={3}
            className={className}
          />
        </span>
        <h6 className="">{label}</h6>
      </Link>
    );
  }
}

StatisticsCountCard.propTypes = {
  count: propTypes.number,
  label: propTypes.string.isRequired,
  prefix: propTypes.string
};

export default StatisticsCountCard;
