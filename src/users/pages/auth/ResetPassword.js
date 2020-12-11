import React, { useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { connect } from "react-redux";
//Local Files
import "./index.css";
import { UpdatePasswordSchema } from "../../../schema/index";
import * as actions from "../../../store/actions/index";
import Left from "../../../assets/Path 3.svg";
import RedBtn from "../../../shared/components/Buttons/RedBtn";
import Error from "../../../shared/components/Messages/Error";
import Success from "../../../shared/components/Messages/Success";
import Input from "../../../shared/components/Form/Input";


function ResetPassword({
  loading,
  error,
  success,
  cleanUp,
  updatePassword,
  close
}) {
 
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);
  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: ""
      }}
      validationSchema={UpdatePasswordSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        await updatePassword(values);
        setSubmitting(false);
        resetForm();
        setTimeout(() => (cleanUp(), close()), 3000);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <>
          <div className="reset-arrow">
            <img
              src={Left}
              onClick={() => {
                close();
              }}
              alt="arrow"
            />
          </div>
          <div className="reset-container">
            <div className="reset-content">
              <div style={{ position: "absolute" }}>
                {error ? <Error>{error}</Error> : null}
                {success ? <Success>{success}</Success> : null}
              </div>
              <div style={{paddingBottom: "20px"}}>
                <h1>Change Password</h1>
              </div>

              <Form>
                <h4 className="setting-form-label lighten">New Password</h4>
                <Field
                  type="password"
                  name="password"
                  adjust
                  component={Input}
                  placeholder=". . . . . . . ."
                />
                <h4 className="setting-form-label lighten">Confirm Password</h4>
                <Field
                  type="password"
                  name="confirmPassword"
                  adjust
                  component={Input}
                  placeholder=". . . . . . . ."
                />
                <div className="reset-centerBtn">
                  <RedBtn
                    adjust
                    disabled={!isValid || isSubmitting}
                    loading={loading ? "Saving..." : null}
                    type="submit"
                  >
                    Update Password
                  </RedBtn>
                </div>
              </Form>
            </div>
          </div>
        </>
      )}
    </Formik>
  );
}

const mapStateToProps = ({ firebase, auth }) => ({
  firebase,
  loading: auth.updatePassword.loading,
  error: auth.updatePassword.error,
  success: auth.updatePassword.success
});

const mapDispatchToProps = {
  updatePassword: actions.updatePassword,
  cleanUp: actions.clean
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);
