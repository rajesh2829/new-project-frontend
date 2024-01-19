import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Collapse } from "reactstrap";

// Components
import Hint from "../../components/Hint";
import "../../scss/_custom.scss";

const portalLogo = (props) => {
  const {
    toggleColor,
    portalLogoWithBaseUrl,
    faviconWithBaseUrl,
    loginBackgroundImageWithBaseUrl,
    portalLogoToggles,
    portalLogoToggle,
    onPortalLogoChange,
    portalLogoRef,
    onPortalLogoRemove,
    onPortalFavIconChange,
    portalFavIconRef,
    handlePortalFavIconRemove,
    onLoginBackgroundImageChange,
    loginBackgroundImageRef,
    onLoginBackgroundImageRemove,
  } = props;

  const portalLogoColor = portalLogoToggle ? "#ECF5FF" : "#FFFFFF";

  return (
    <>
      <div
        className="border p-2 cursor-pointer"
        style={{
          backgroundColor: portalLogoColor,
        }}
        onClick={portalLogoToggles}
      >
        <div className="position-relative">
          <p
            type="button"
            className=" button-input pull-right "
          >
            {!portalLogoToggle ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
          </p>
        </div>
        {portalLogoToggle ? (
          <h5 className="text-primary">Portal Logo</h5>
        ) : (
          <h5 className="">Portal Logo</h5>
        )}
      </div>
      <div className="border border-bottom-0 border-top-0">
        <Collapse className="p-3" isOpen={portalLogoToggle}>
          <div className="field-wrapper d-flex mt-3">
            <div>
              <div className="d-inline-block">
                <input
                  name="file"
                  className="form-control d-none"
                  type="file"
                  id="portalLogo"
                  placeholder="Banner Image"
                  accept="image/png,image/gif,image/jpeg"
                  onChange={(e) => {
                    onPortalLogoChange(e);
                  }}
                  ref={portalLogoRef}
                />
                <span className="d-block ">
                  <label htmlFor="portalLogo" className="profile-img-sm mb-0">
                    <span className="image-upload-text-decoration-none cursor-pointer text-primary">
                      Upload Portal Logo
                    </span>
                  </label>
                </span>
              </div>
              {/* Remove image */}
              {portalLogoWithBaseUrl && (
                <span
                  className="image-upload-text-decoration-none cursor-pointer text-primary text-danger ml-md-1"
                  onClick={onPortalLogoRemove}
                >
                  (Remove)
                </span>
              )}
              <div className="field-wrapper">
                <small className={`text-danger mt-3 ${"d-none"}`}>
                  Please select a image file
                </small>
                <Hint
                  id="bannerRequirements"
                  hintText="We recommended using 400 x 600 image"
                />
              </div>
            </div>
            <div className="ml-auto">
              <img src={portalLogoWithBaseUrl} className="portal-logo" />
            </div>
          </div>

          {/* Portal Logo upload Ends */}
          {/* Portal Favicon upload */}
          <h5 className="">Portal Favicon</h5>
          <div className="field-wrapper d-flex">
            <div>
              <div className="d-inline-block">
                <input
                  name="file"
                  className="form-control d-none"
                  type="file"
                  id="portalFavIconImage"
                  placeholder="Favicon"
                  onChange={(e) => {
                    onPortalFavIconChange(e);
                  }}
                  accept="image/png,image/gif,image/jpeg"
                  ref={portalFavIconRef}
                />
                <span className="d-block ">
                  <label
                    htmlFor="portalFavIconImage"
                    className="profile-img-sm mb-0"
                  >
                    <span className="text-decoration-none cursor-pointer text-primary">
                      Upload Portal Favicon
                    </span>
                  </label>
                </span>
              </div>
              {/* Remove image */}
              {faviconWithBaseUrl && (
                <span
                  className="text-decoration-none cursor-pointer text-primary text-danger ml-md-1"
                  onClick={handlePortalFavIconRemove}
                >
                  (Remove)
                </span>
              )}
              <div className="field-wrapper">
                <small className={`text-danger mt-3 ${"d-none"}`}>
                  Please select a image file
                </small>
                <Hint
                  id="bannerRequirements"
                  hintText="We recommended using 32 x 32 image"
                />
              </div>
            </div>
            <div className="ml-auto">
              <img src={faviconWithBaseUrl} className="portal-logo" />
            </div>
          </div>
          {/* Portal Favicon upload Ends */}
          {/* Background image upload */}
        </Collapse>
      </div>
    </>
  );
};
export default portalLogo;
