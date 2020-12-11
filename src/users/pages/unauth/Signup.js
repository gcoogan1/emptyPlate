import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { Formik, Field, Form } from "formik";
import Container from "@material-ui/core/Container";
import Select from "react-select";
//Local Files
import "./index.css";
import { SignUpSchema } from "../../../schema/index";
import * as actions from "../../../store/actions/index";
import Error from "../../../shared/components/Messages/Error";
import Background from "../../components/Background";
import HeaderLogo from "../../components/HeaderLogo";
import RedBtn from "../../../shared/components/Buttons/RedBtn";
import GoogleBtn from "../../components/GoogleBtn";
import Input from "../../../shared/components/Form/Input";
import avatars from "../../../shared/components/Avatars/Avatars";

function SignUp({ signUp, loading, error, cleanUp }) {
  const [selectedAvatar, setSelectedAvatar] = useState("");
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
  //Handle Avatar Change in Select
  const handleAvatarChange = selectedAvatar => {
    // console.log(selectedAvatar);
    setSelectedAvatar(selectedAvatar);
  };

  return (
    <Background>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          avatar: ""
        }}
        validationSchema={SignUpSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          await signUp(values); //Async and await are used so btn can disable properly
          setSubmitting(false); //RESET
          setTimeout(() => cleanUp(), 5000);
        }}
      >
        {({ isSubmitting, isValid, values, handleChange }) => (
          <>
            <div style={{ position: "absolute", width: "100%" }}>
              {error ? <Error>{error}</Error> : null}
            </div>
            <>
              <Container className="form-containter">
                <div className="form-content">
                  <HeaderLogo />
                  <div className="form-header">
                    <h1 className="form-title">Sign Up</h1>
                    <hr className="hr" />
                  </div>

                  <Form>
                    <h4 className="form-label">Name</h4>
                    <Field
                      type="text"
                      name="name"
                      component={Input}
                      placeholder=" Your Name"
                    />
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
                    <h4 className="form-label">Confirm Password</h4>
                    <Field
                      type="password"
                      name="confirmPassword"
                      component={Input}
                      placeholder=". . . . . . . ."
                    />
                    <h4 className="form-label">Avatar (optional)</h4>
                    <Select
                      options={avatars}
                      placeholder="Choose an avatar..."
                      value={selectedAvatar}
                      onChange={selectedOption => {
                        handleAvatarChange(selectedOption);
                        values.avatar = selectedOption.value;
                        // console.log("values", values.avatar);
                        handleChange("avatar");
                      }}
                      isSearchable={true}
                      name="avatar"
                      className="avatar-select"
                      classNamePrefix="react-select"
                    />

                    <RedBtn
                      disabled={!isValid || isSubmitting}
                      loading={loading ? "Signing up..." : null}
                      type="submit"
                    >
                      Sign up
                    </RedBtn>
                    <div className="form-other-option">
                      <NavLink className="form-navlink" to="/login">
                        Existing User? Login
                      </NavLink>
                      <p className="form-or">- or -</p>
                      <GoogleBtn click={loginWithGoogle}>
                        Sign up with Google
                      </GoogleBtn>
                    </div>
                  </Form>
                </div>
              </Container>
            </>
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
  signUp: actions.signUp,
  cleanUp: actions.clean
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
