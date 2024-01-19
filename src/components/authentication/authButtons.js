import React from "react";
import GoogleLogin from "react-google-login";
import useToggle from "../../components/customHooks/useToggle";
import BasicLoginForm from "../../views/login/basicLoginForm";
import RegisterWithEmail from "../../views/login/registerWithEmail";
import { endpoints } from "../../api/endPoints";
import { apiClient } from "../../apiClient";
import {
  COOKIE_SESSION_TOKEN,
} from "../../lib/Cookie";
import { setCookie } from "../../lib/Helper";

export const GoogleButton = ({
  actions,
  googleClientId,
  redirect,
  redirectUrl,
  id,
}) => {
  const loginUser = (data, callback) => {
    if (data && data.profileObj && data.profileObj.email) {
      let bodyObject = { email: data.profileObj.email };
      apiClient.post(`${endpoints().loginAPI}`, bodyObject).then((response) => {
        let successMessage;
        if (response && response.data) {
          const { token, role, id, portal_id, portal_name, companyId } =
            response?.data?.user;

          // Setting Cookies
          setCookie(COOKIE_SESSION_TOKEN, token);
          if (redirectUrl) {
            window.location.replace(redirectUrl);
          } else if (redirect) {
            redirect();
          }
          successMessage = response.data.message;
          toast.succes(successMessage);
          return callback();
        }
      });
    }
  };
  return (
    <GoogleLogin
      id={id}
      clientId={googleClientId}
      buttonText={<span>Continue with Google</span>}
      onSuccess={(response) => {
        loginUser(response), actions;
      }}
      className="google-login mb-3"
      onFailure={(err) => console.log(err)}
    />
  );
};

export const LoginForm = ({
  redirect,
  eventKey,
  settings,
  secondaryPortalDetails,
  id,
}) => {
  return (
    <BasicLoginForm
      id={id}
      redirect={redirect}
      eventKey={eventKey}
      settings={settings}
      secondaryPortalDetails={secondaryPortalDetails}
    />
  );
};

export const RegisterButton = (props) => {
  const [modal, setModal] = useToggle();
  const { next } = props;

  return (
    <>
      <div className="signup-button">
        <a href="/company-signup" className="btn-link">
          Register with my Email Address
        </a>
      </div>
      <RegisterWithEmail next={next} isOpen={modal} toggle={setModal} />
    </>
  );
};

const AuthButtons = (props) => {
  const { children } = props;

  return (
    <>
      <div className="signup-buttons">{children}</div>
    </>
  );
};

export default AuthButtons;
