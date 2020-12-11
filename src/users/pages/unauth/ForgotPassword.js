import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Field, Form } from "formik";
//Local Files
import "./index.css";
import { ResetSchema } from "../../../schema/index";
import * as actions from "../../../store/actions";
import Left from "../../../assets/Path 3.svg";
import RedBtn from "../../../shared/components/Buttons/RedBtn";
import Input from "../../../shared/components/Form/Input";
import Error from "../../../shared/components/Messages/Error";
import Success from "../../../shared/components/Messages/Success";

function ForgotPassword({ loading, error, cleanUp, reset, success }) {
  const history = useHistory();

  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <>
      <Formik
        initialValues={{
          email: ""
        }}
        validationSchema={ResetSchema}
        onSubmit={async (values, { setSubmitting }) => {
          // console.log(values);
          await reset(values);
          setSubmitting(false);
          setTimeout(() => cleanUp(), 5000);
        }}
      >
        {({ isSubmitting, isValid }) => (
          <>
            <div className="forgot-arrow">
              <img
                src={Left}
                onClick={() => {
                  history.goBack();
                }}
                alt="arrow"
              />
            </div>
            <div className="forgot-container">
              <div className="forgot-content">
                <div style={{ position: "absolute" }}>
                  {error ? <Error>{error}</Error> : null}
                  {success ? <Success>{success}</Success> : null}
                </div>
                <div>
                  <h1>Forgot Password?</h1>
                  <p>
                    Enter your email and we’ll send you a link to create a new
                    password.
                  </p>
                </div>

                <Form>
                  <h4 className="form-label light">Email</h4>
                  <Field
                    type="email"
                    name="email"
                    component={Input}
                    adjust
                    placeholder="your_email@address.com"
                  />
                  <div className="centerBtn">
                    <RedBtn
                      adjust
                      disabled={!isValid || isSubmitting}
                      loading={loading ? "Sending..." : null}
                      type="submit"
                    >
                      Send
                    </RedBtn>
                  </div>
                </Form>
              </div>
            </div>
          </>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ auth }) => ({
  loading: auth.resetPass.loading,
  error: auth.resetPass.error,
  success: auth.resetPass.success
});

const mapDispatchToProps = {
  reset: actions.resetPassword,
  cleanUp: actions.clean
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);
