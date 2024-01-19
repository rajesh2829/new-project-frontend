import React from "react";
import AuthButtons, {
  GoogleButton,
  LoginForm,
} from "../../components/authentication/authButtons";

// Components
import SectionTitle from "../../components/SectionTitle";
import { getUrlParameter } from "../../lib/Url";

import { GOOGLE_CLIENT_ID } from "../../configs";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  render() {
    let redirectUrl = getUrlParameter("redirect");
    if (!redirectUrl) {
      redirectUrl = "/mydashboard";
    }

    return (
      <div className="min-vh-100 container-fluid">
        <div className="row overflow-hidden h-100 min-vh-100">
          <div className="col bg-white m-0">
            <div className="d-flex justify-content-center align-items-center vh-100 ">
              <div>
                <SectionTitle
                  label="Login"
                  description="Enter your email and password to continue"
                />
                <AuthButtons>
                  {GOOGLE_CLIENT_ID != null && (
                    <GoogleButton
                      redirectUrl={redirectUrl}
                      eventKey="google-login"
                      googleClientId={GOOGLE_CLIENT_ID}
                    />
                  )}
                </AuthButtons>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
