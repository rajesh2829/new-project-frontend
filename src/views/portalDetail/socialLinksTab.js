import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Input } from "reactstrap";
import CancelButton from "../../components/CancelButton";
import DefaultContent from "../../components/content/defaultContent";
import Form from "../../components/Form";
import SaveButton from "../../components/SaveButton";

// Social Themes Tab
export const SocialLinks = {
  SOCIAL_LINK_FACEBOOK_URL: "facebook_url",
  SOCIAL_LINK_INSTAGRAM_URL: "instagram_url",
  SOCIAL_LINK_TWITTER_URL: "twitter_url",
  SOCIAL_LINK_LINKEDIN_URL: "linkedIn_url",
  SOCIAL_LINK_YOUTUBE_URL: "youtube_url",
};

const SocialLinksTab = (props) => {
  const {
    faceBookFun,
    faceBookUrl,
    instagramFun,
    instagramUrl,
    linkedInFun,
    linkedInUrl,
    twitterFun,
    twitterUrl,
    youTubFun,
    youTubeUrl,
    handleUpdate,
    initialValue,
    history,
  } = props;

  return (
    <>
      <Form
        enableReinitialize={true}
        initialValues={{
          ...initialValue,
        }}
        onSubmit={(values) => {
          handleUpdate(values);
        }}
      >
        <div className="d-flex">
          <DefaultContent>
            {/* Facebook Url */}
            <div className="d-flex mt-4">
              <span className="border rounded-left h-20 w-20 col-auto pr-4 pl-4 social-bg-color ">
                <FontAwesomeIcon className="mt-3" icon={faFacebook} />
              </span>
              <Input
                className=" social-input"
                id={SocialLinks.SOCIAL_LINK_FACEBOOK_URL}
                name={SocialLinks.SOCIAL_LINK_FACEBOOK_URL}
                placeholder=" Enter Facebook url"
                onChange={(e) => {
                  faceBookFun(e);
                }}
                value={faceBookUrl}
              />
            </div>
            {/* Instagram Url*/}
            <div className="d-flex mt-4">
              <span className="border rounded-left h-20 w-20 col-auto pr-4 pl-4 social-bg-color">
                <FontAwesomeIcon className="mt-3" icon={faInstagram} />
              </span>
              <Input
                className="social-input"
                name={SocialLinks.SOCIAL_LINK_INSTAGRAM_URL}
                placeholder=" Enter Instagram Url"
                onChange={(e) => {
                  instagramFun(e);
                }}
                value={instagramUrl}
              />
            </div>

            {/* LinkedIn Url*/}
            <div className="d-flex mt-4">
              <span className="border rounded-left h-20 w-20 col-auto pr-4 pl-4 social-bg-color">
                <FontAwesomeIcon className="mt-3" icon={faLinkedin} />
              </span>
              <Input
                className="social-input"
                name={SocialLinks.SOCIAL_LINK_LINKEDIN_URL}
                placeholder=" Enter LinkedIn Url"
                onChange={(e) => {
                  linkedInFun(e);
                }}
                value={linkedInUrl}
              />
            </div>

            {/* Twitter Url*/}
            <div className="d-flex mt-4">
              <span className="border rounded-left h-20 w-20 col-auto pr-4 pl-4 social-bg-color">
                <FontAwesomeIcon className="mt-3" icon={faTwitter} />
              </span>
              <Input
                className="social-input"
                name={SocialLinks.SOCIAL_LINK_TWITTER_URL}
                placeholder=" Enter Twitter Url"
                onChange={(e) => {
                  twitterFun(e);
                }}
                value={twitterUrl}
              />
            </div>

            {/* Youtube Url*/}
            <div className="d-flex mt-4">
              <span className="border rounded-left h-20 w-20 col-auto pr-4 pl-4 social-bg-color">
                <FontAwesomeIcon className="mt-3" icon={faYoutube} />
              </span>
              <Input
                className="social-input"
                name={SocialLinks.SOCIAL_LINK_YOUTUBE_URL}
                placeholder=" Enter Youtube Url"
                onChange={(e) => {
                  youTubFun(e);
                }}
                value={youTubeUrl}
              />
            </div>
            <div className="btn-wrapper mt-3">
              <SaveButton />
              <CancelButton
                onClick={() => {
                  history.push(`/admin/dashboard`);
                }}
              />
            </div>
          </DefaultContent>
        </div>
      </Form>
    </>
  );
};
export default SocialLinksTab;
