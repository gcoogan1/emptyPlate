import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { NavLink } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { Formik, Field, Form } from "formik";
//Local
import "./index.css";
import { LoginSchema } from "../../../schema/index";
import * as actions from "../../../store/actions/index";
import Background from "../../components/Background";
import Error from "../../../shared/components/Messages/Error";
import HeaderLogo from "../../components/HeaderLogo";
import RedBtn from "../../../shared/components/Buttons/RedBtn";
import GoogleBtn from "../../components/GoogleBtn";
import Input from "../../../shared/components/Form/Input";

function Login({ error, loading, login, cleanUp }) {
  //Clean up messages
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);
  //Google Signup/Login
  const firebase = useFirebase();
  function loginWithGoogle() {
    return firebase.login({ provider: "google", type: "popup" });
  }
  return (
    <Background>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: ""
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          await login(values); //Async and await are used so btn can disable properly
          setSubmitting(false); //RESET
          setTimeout(() => cleanUp(), 5000);
        }}
      >
        {({ isSubmitting, isValid }) => (
          <>
            <div style={{ position: "absolute", width: "100%" }}>
              {error ? <Error>{error}</Error> : null}
            </div>
            <Container className="form-containter">
              <div className="form-content">
                <HeaderLogo />
                <div className="form-header">
                  <h1 className="form-title">Login</h1>
                  <hr className="hr" />
                </div>
                <Form>
                  <h4 className="form-label">Email</h4>
                  <Field
                    type="email"
                    name="email"
                    component={Input}
                    placeholder="your_email@address.com"
                  />
                  <h4 className="form-label">Password</h4>
                  <Field
                    type="password"
                    name="password"
                    component={Input}
                    placeholder=". . . . . . . ."
                  />
                  <div className="form-forgot">
                    <NavLink className="form-navlink" to="/forgotpass">
                      Forgot Password?
                    </NavLink>
                  </div>
                  <RedBtn
                    disabled={!isValid || isSubmitting}
                    loading={loading ? "Signing up..." : null}
                    type="submit"
                  >
                    Login
                  </RedBtn>
                  <div className="form-other-option">
                    <NavLink className="form-navlink" to="/signup">
                      New User? Create New account
                    </NavLink>
                    <p className="form-or">- or -</p>
                    <GoogleBtn click={loginWithGoogle}>
                      Login with Google
                    </GoogleBtn>
                  </div>
                </Form>
              </div>
            </Container>
          </>
        )}
      </Formik>
    </Background>
  );
}

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
  error: auth.error
});

const mapDispatchToProps = {
  login: actions.signIn,
  cleanUp: actions.clean
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
