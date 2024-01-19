import React from "react";
import PropTypes from "prop-types";
import LabelComponent from "../Label";
// Style
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// Proptypes
const propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
};
class FileUpload extends React.Component {
  render() {
    const { label, onChange, className, accept, onClick } = this.props;
    return (
      <>
        <input
          name="file"
          type="file"
          id="file"
          onChange={(e) => {
            onChange(e);
          }}
          className="form-control d-none"
          accept={accept}
        />
        <span className="d-block ">
          <label
            htmlFor="file"
            className={`profile-img-sm mb-0 ${className}`}
            onClick={onClick}
            
          >
            <LabelComponent id="file" className="upload-button border-0 cursor-pointer">
              <FontAwesomeIcon icon={faPlus} style={{ fontSize: "12px" }} />
              <span className="font-weight-bold" style={{ marginLeft: "8px" }}>
                {label}
              </span>
            </LabelComponent>
          </label>
        </span>
      </>
    );
  }
}
FileUpload.propTypes = propTypes;
export default FileUpload;
