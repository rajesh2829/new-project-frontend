import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";

//Service
import { getCompanySettings, saveSetting } from "../../services/SettingService";

//Components
import DefaultContent from "../../components/content/defaultContent";
import Form from "../../components/Form";
import SaveButton from "../../components/SaveButton";

//Lib
import { faFacebook, faInstagram, faLinkedin, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as portalConstant from "../../helpers/PortalDetail";

const SocialThemes = (props) => {
  const [settingData, setSettingData] = useState([]);
  const [faceBookUrl, setFaceBookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [linkedInUrl, setInkedInUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [youTubeUrl, setYouTubeUrl] = useState("");

  //Handle Setting Save
  const handleSave = (values) => {
    const data = new FormData();
    if (values.facebook_url !== undefined) {
      data.append(
        [portalConstant.PORTAL_SOCIAL_THEME_FACEBOOK_URL],
        values.facebook_url ? values.facebook_url : ""
      );
    }

    if (values.instagram_url !== undefined) {
      data.append(
        [portalConstant.PORTAL_SOCIAL_THEME_INSTAGRAM_URL],
        values.instagram_url ? values.instagram_url : ""
      );
    }

    if (values.twitter_url !== undefined) {
      data.append(
        [portalConstant.PORTAL_SOCIAL_THEME_TWITTER_URL],
        values.twitter_url ? values.twitter_url : ""
      );
    }

    if (values.linkedIn_url !== undefined) {
      data.append(
        [portalConstant.PORTAL_SOCIAL_THEME_LINKEDIN_URL],
        values.linkedIn_url ? values.linkedIn_url : ""
      );
    }

    if (values.youtube_url !== undefined) {
      data.append(
        [portalConstant.PORTAL_SOCIAL_THEME_YOUTUBE_URL],
        values.youtube_url ? values.youtube_url : ""
      );
    }
    // Save settings
    saveSetting(data);
  };

  const getSettingValue = async () => {
    let value = "";
    let initialValue = {};
    value = await getCompanySettings();
    if (value) {
      value &&
        value.length > 0 &&
        value.forEach((data) => {
          if (
            data &&
            data.name === portalConstant.PORTAL_SOCIAL_THEME_FACEBOOK_URL
          ) {
            setFaceBookUrl(data && data.value);
          }
          if (
            data &&
            data.name === portalConstant.PORTAL_SOCIAL_THEME_INSTAGRAM_URL
          ) {
            setInstagramUrl(data && data.value);
          }
          if (
            data &&
            data.name === portalConstant.PORTAL_SOCIAL_THEME_LINKEDIN_URL
          ) {
            setInkedInUrl(data && data.value);
          }
          if (
            data &&
            data.name === portalConstant.PORTAL_SOCIAL_THEME_TWITTER_URL
          ) {
            setTwitterUrl(data && data.value);
          }
          if (
            data &&
            data.name === portalConstant.PORTAL_SOCIAL_THEME_YOUTUBE_URL
          ) {
            setYouTubeUrl(data && data.value);
          }
        });
      setSettingData(initialValue);
    }
  };

  const faceBookFun = (e) => {
    setFaceBookUrl(e.target.value);
  };

  const instagramFun = (e) => {
    setInstagramUrl(e.target.value);
  };

  const linkedInFun = (e) => {
    setInkedInUrl(e.target.value);
  };

  const twitterFun = (e) => {
    setTwitterUrl(e.target.value);
  };

  const youTubFun = (e) => {
    setYouTubeUrl(e.target.value);
  };

  useEffect(() => {
    getSettingValue();
  }, []);

  return (
    <div>
      <Form
        enableReinitialize={true}
        initialValues={{ ...settingData }}
        onSubmit={(values) => {
          values.facebook_url = faceBookUrl;
          values.instagram_url = instagramUrl;
          values.twitter_url = twitterUrl;
          values.linkedIn_url = linkedInUrl;
          values.youtube_url = youTubeUrl;

          handleSave(values);
        }}
      >
        <div className="form-wrapper">
          <DefaultContent>
            {/* Facebook Url */}
            <div className="field-wrapper">
              <span
                className="border rounded-left h-20 w-20  px-3 pt-2 bg-light pb-2 position-relative"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </span>

              <Input
                className="col-sm-8 w-75 p-4"
                id={portalConstant.PORTAL_SOCIAL_THEME_FACEBOOK_URL}
                name={portalConstant.PORTAL_SOCIAL_THEME_FACEBOOK_URL}
                placeholder="Enter Facebook url"
                onChange={(e) => {
                  faceBookFun(e);
                }}
                value={faceBookUrl}
              />
            </div>
            {/* Instagram Url*/}
            <div className="field-wrapper">
              <span
                className="border rounded-left h-20 w-20  px-3 pt-2 bg-light pb-2 position-relative"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </span>

              <Input
                className="col-sm-8 w-75 p-4"
                name={portalConstant.PORTAL_SOCIAL_THEME_INSTAGRAM_URL}
                placeholder="Enter Instagram Url"
                onChange={(e) => {
                  instagramFun(e);
                }}
                value={instagramUrl}
              />
            </div>

            {/* LinkedIn Url*/}
            <div className="field-wrapper">
              <span
                className="border rounded-left h-20 w-20  px-3 pt-2 bg-light pb-2 position-relative"
              >
                <FontAwesomeIcon icon={faLinkedin} />

              </span>

              <Input
                className="col-sm-8 w-75 p-4"
                name={portalConstant.PORTAL_SOCIAL_THEME_LINKEDIN_URL}
                placeholder="Enter LinkedIn Url"
                onChange={(e) => {
                  linkedInFun(e);
                }}
                value={linkedInUrl}
              />
            </div>

            {/* Twitter Url*/}
            <div className="field-wrapper">
              <span
                className="border rounded-left h-20 w-20  px-3 pt-2 bg-light pb-2 position-relative"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </span>
              <Input
                className="col-sm-8 w-75 p-4"
                name={portalConstant.PORTAL_SOCIAL_THEME_TWITTER_URL}
                placeholder="Enter Twitter Url"
                onChange={(e) => {
                  twitterFun(e);
                }}
                value={twitterUrl}
              />
            </div>

            {/* Youtube Url*/}
            <div className="field-wrapper">
              <span
                className="border rounded-left h-20 w-20  px-3 pt-2 bg-light pb-2 position-relative"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </span>
              <Input
                className="col-sm-8 w-75 p-4"
                name={portalConstant.PORTAL_SOCIAL_THEME_YOUTUBE_URL}
                placeholder="Enter Youtube Url"
                onChange={(e) => {
                  youTubFun(e);
                }}
                value={youTubeUrl}
              />
            </div>
            <div className="btn-wrapper">
              <SaveButton />
            </div>
          </DefaultContent>
        </div>
      </Form>
    </div>
  );
};

export default SocialThemes;
