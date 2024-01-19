import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Collapse } from "reactstrap";
import PageTitle from "../../components/PageTitle";
import Url from "../../helpers/Url";

const peoplesReportList = () => {
  const [nameToggle, setNameToggle] = useState(true);

  const nameToggles = () => {
    setNameToggle(!nameToggle);
  };

  // store product report
  const reportAttendence = [];

  let attendanceSummaryReport = {
    title: "Attendance Summary Report",
    link: Url.ATTENDENCE_SUMMARY_REPORT,
  };
  let attendanceReport = {
    title: "Attendance Report",
    link: Url.ATTENDENCE_REPORT,
  };
  let fineReport = {
    title: "Fine Report",
    link: Url.FINE_REPORT,
  }
  reportAttendence.push(attendanceReport);
  reportAttendence.push(attendanceSummaryReport);
  reportAttendence.push(fineReport);

  return (
    <>
      <PageTitle label="Reports" />
      <div className="card">
        <div>
          <div
            className="p-3 cursor-pointer border bg-light"
            onClick={nameToggles}
          >
            <div className="position-relative">
              <p type="button" className="btn-input pull-right">
                <>{!nameToggle ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}</>
              </p>
            </div>
            <h5> Attendence</h5>
          </div>
          <div className="border border-bottom-0 border-top-0">
            <Collapse className="p-3" isOpen={nameToggle}>
              <div className="row">
                <div className="col-lg-12 col-sm-12">
                  {reportAttendence &&
                    reportAttendence.length > 0 &&
                    reportAttendence.map((dataList) => {
                      let { title, link } = dataList;
                      return (
                        <>
                          <Link to={link} className=" my-2 text-dark">
                            {title}
                          </Link>
                          <br />
                        </>
                      );
                    })}
                </div>
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    </>
  );
};

export default peoplesReportList;
