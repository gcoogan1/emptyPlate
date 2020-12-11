import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Formik, Field, Form } from "formik";
import Select from "react-select";
//Local Files
import "./index.css";
import { ProfileSchema } from "../../../schema/index";
import * as actions from "../../../store/actions/index";
import Modal from "../../../shared/components/Modal/Modal";
import ResetPassword from "./ResetPassword";
import Error from "../../../shared/components/Messages/Error";
import Success from "../../../shared/components/Messages/Success";
import avatars from "../../../shared/components/Avatars/Avatars";
import BackgroundColor from "../../../shared/components/BackgroundColor/BackgroundColor";
import Input from "../../../shared/components/Form/Input";
import RedBtn from "../../../shared/components/Buttons/RedBtn";
import OutlineBtn from "../../../shared/components/Buttons/OutlineBtn";
import Btn from "../../../shared/components/Buttons/Btn";


function Settings({
  firebase,
  editProfile,
  deleteUser,
  loading,
  error,
  success,
  cleanUp
}) {
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [modalOpened, setModalOpened] = useState(false);
  const [showDelModal, setDelModal] = useState(false);

  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  const handleAvatarChange = selectedAvatar => {
    setSelectedAvatar(selectedAvatar);
  };
  return (
    <>
      <Formik
        initialValues={{
          name: firebase.profile.name,
          email: firebase.auth.email,
          avatar: firebase.profile.avatar
        }}
        validationSchema={ProfileSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await editProfile(values);
          setSubmitting(false);
          resetForm();
          //setTimeout resets auth state after 5 sec so error or success msg stops displaying after 5 sec as well
          setTimeout(() => cleanUp(), 3000);
        }}
      >
        {({ isSubmitting, isValid, handleChange, values }) => (
          <BackgroundColor darker>
            <div className="settings-alert">
              {error ? <Error>{error}</Error> : null}
              {success ? <Success>{success}</Success> : null}
            </div>
            <div className="settings-wrapper">
              <div className="settings-form-wrapper">
                <div className="settings-form-title">
                  <h1>Settings</h1>
                  <hr className="hr2" />
                </div>
                <Form>
                  <h4 className="setting-form-label">Name</h4>
                  <Field type="name" name="name" component={Input} />
                  <h4 className="setting-form-label">Email</h4>
                  <Field
                    type="email"
                    name="email"
                    component={Input}
                    placeholder="rbaker@skuxlyf.com"
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
                  <OutlineBtn type="button" click={() => setModalOpened(true)}>
                    Change Password
                  </OutlineBtn>
                  <RedBtn
                    disabled={!isValid || isSubmitting}
                    loading={loading ? "Saving..." : null}
                    type="submit"
                  >
                    Save Changes
                  </RedBtn>
                </Form>
                <div className="profile-delete">
                  <p
                    onClick={() => {
                      setDelModal(true);
                    }}
                  >
                    Delete Account?
                  </p>
                </div>
              </div>
            </div>
          </BackgroundColor>
        )}
      </Formik>
      <Modal opened={modalOpened} close={() => setModalOpened(false)}>
        <ResetPassword close={() => setModalOpened(false)} />
      </Modal>
      <Modal
        opened={showDelModal}
        close={() => setDelModal(false)}
        padded
        small
      >
        <div className="delete-modal">
          <h2>Are you sure you want to delete this recipe?</h2>
          <Btn del type="submit" click={() => deleteUser()}>
            Yes, Delete
          </Btn>
          <Btn click={() => setDelModal(false)}>No, Cancel</Btn>
        </div>
      </Modal>
    </>
  );
}

const mapStateToProps = ({ firebase, auth }) => ({
  firebase,
  loading: auth.profileEdit.loading,
  error: auth.profileEdit.error,
  success: auth.profileEdit.success
});

const mapDispatchToProps = {
  editProfile: actions.editProfile,
  cleanUp: actions.clean,
  deleteUser: actions.deleteUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
