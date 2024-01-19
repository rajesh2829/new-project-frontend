import React from "react";
import { Alert, Card, CardBody } from "reactstrap";

// Components
import Form from "../../components/Form";
import Button from "../../components/Button";
import Email from "../../components/Email";
import { endpoints } from "../../api/endPoints";
import { apiClient } from "../../apiClient";
import { isBadRequest } from "../../lib/Http";
import { Link } from "react-router-dom";
import { ChevronLeft, ErrorIcon, SuccessIcon } from "../../assets/icons";
import"./forgot.scss";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: innerHeight,
      errorMessage: "",
      showSuccess: false,
      successMessage: "",
    };
  }

  // Reset the message
  _hideErrorMessage = () => {
    this.setState({ errorMessage: "", successMessage: "" });
  };

  //Submit Function
  handleSubmit = (data) => {
    return apiClient
      .put(`${endpoints().userAPI}/forgotPassword`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          this.setState({
            successMessage,
            errorMessage: "",
            showSuccess: true,
          });
        }
      })
      .catch((error) => {
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          this.setState({
            errorMessage,
            successMessage: "",
            showSuccess: true,
          });
          console.error(errorMessage);
        }
      });
  };

  render() {
    const { errorMessage, height, showSuccess } = this.state;

    const initialValues = {
      email: "",
    };

    return (
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ height: height - 85 }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7 col-sm-12">
              <Card className="mx-auto rounded forgot-card">
                <Form
                  initialValues={initialValues}
                  onSubmit={(value) => {
                    this.handleSubmit(value);
                  }}
                >
                  <CardBody className="pb-0 forget-text">
                    <div className="text-center pb-3 pt-3">
                      <div className="font-weight-bold">Forgot password?</div>
                      <small>
                        Tell us your email so we can send you a reset link.
                      </small>
                    </div>
                    {!showSuccess ? (
                      <>
                        <div className={`${errorMessage ? "mb-2" : "mb-4"}`}>
                          <div className="mb-4">
                            <Email
                              name="email"
                              label="Email"
                              placeholder="Email Address"
                              required
                              onKeyDown={this._hideErrorMessage}
                            />
                          </div>
                        </div>
                        <div className="pb-3">
                          <Button
                            type="submit"
                            color="#E0674C"
                            hoverColor="#ff876c"
                            label="Send Reset Password Link"
                            className="rounded-0 pr-1 text-white w-100 font-weight-bold"
                          />
                          <div className="pt-1">
                            <small>
                              Did you remembered your password ?
                              <Link to="/login">Try logging in</Link>
                            </small>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <Alert color={errorMessage ? "danger" : "success"}>
                          {errorMessage ? <ErrorIcon /> : <SuccessIcon />}
                          <span className="pl-2">
                            {errorMessage
                              ? errorMessage
                              : "Password reset email has been sent"}
                          </span>
                        </Alert>
                        <small>
                          <Link
                            onClick={() => {
                              this.setState({ showSuccess: false });
                            }}
                          >
                             <FontAwesomeIcon
              icon={faChevronLeft}
            />
                            Go Back
                          </Link>
                        </small>
                      </>
                    )}
                  </CardBody>
                </Form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
