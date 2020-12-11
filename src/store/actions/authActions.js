//Local files
import * as actions from "./actionTypes";
import firebase from "../../firebase/firebase";



//Signup  (1 of 7)
export const signUp = data => async (dispatch, getState) => {
  const db = firebase.firestore(); //Grabs firestore
  dispatch({ type: actions.AUTH_START }); //Creates dispatch for reducer so loading is set to true
  try {
    //Creates user in firbase
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password); //(grabs email and password from formik input name)

    // Send the verfication email
    const user = firebase.auth().currentUser;
    await user.sendEmailVerification();

    //Saves to firestore collection "users" by grabing the userID and setting first & last name
    await db
      .collection("users")
      .doc(res.user.uid) //The document will be the user Id (res awaits user auth)
      .set({
        name: data.name,
        avatar: data.avatar
      });
    dispatch({ type: actions.AUTH_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.AUTH_FAIL, payload: err.message }); //(err.message) is error message from firebase (eg. 'email already in use')
  }
  dispatch({ type: actions.AUTH_END }); //Loading is set back to false
};

//Signout  (2 OF 7)
export const signOut = () => async (dispatch, getState) => {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    //  console.log(err.message);
  }
};

//Login  (3 0f 7)
export const signIn = data => async (dispatch, getState) => {
  dispatch({ type: actions.AUTH_START });
  try {
    await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
    dispatch({ type: actions.AUTH_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.AUTH_FAIL, payload: "Oops something went wrong, please try again!" });
  }
  dispatch({ type: actions.AUTH_END });
};

//Clean-up   (4 of 7)
export const clean = () => ({
  type: actions.CLEAN_UP
});

//Reset Password  (5 of 7)
export const resetPassword = data => async (dispatch, getState) => {
  try {
    firebase
      .auth()
      .sendPasswordResetEmail(data.email)
      .then(() =>
        dispatch({
          type: actions.SEND_SUCCESS,
          payload: "Reset email sent. Go check your inbox."
        })
      )
      .catch(err => {
        dispatch({
          type: actions.SEND_FAIL,
          payload: "Email does not exist, try another!"
        });
      });
  } catch (err) {
    dispatch({
      type: actions.AUTH_FAIL,
      payload: "Could not reset password"
    });
  }
};

//Edit Profile  (6 of 7)
export const editProfile = data => async (dispatch, getState) => {
  const db = firebase.firestore();
  const user = firebase.auth().currentUser; //Grabs user
  const { uid: userId, email: userEmail } = getState().firebase.auth; // -> ( explained in below comments)
  //This getState() (from redux) allows acesss to firebase (state or "store") (from firebase)
  // which (in this case) is destructured to grab uid and email and rename them
  //ALSO NOTE: email and uid comes from firebase is reassigned to the variables (renamed) userId and userEmail -> if not destructured and combined it
  // would look like this: const userEmail: getState().firebase.auth.email  & const userId: getState().firebase.auth.uid

  dispatch({ type: actions.PROFILE_EDIT_START });
  try {
    //If email is diff then update  (grabs email from formik input name)
    if (data.email !== userEmail) {
      //Email put in form must be different from firestore to be able to update
      await user.updateEmail(data.email); //Gets (current)user to be able to update email
    }
    //Update firestore
    await db
      .collection("users")
      .doc(userId) //Ref the userId to be able to make a change
      .set({
        name: data.name,//To fireStore  -if name change
        avatar: data.avatar
      });
    dispatch({ type: actions.PROFILE_EDIT_SUCCESS, payload: "Your changes have been saved! "});
  } catch (err) {
    dispatch({ type: actions.PROFILE_EDIT_FAIL, payload: err.message });
  }
};

//Password Updat  (6 of 6)
export const updatePassword = data => async (dispatch, getState) => {
  const user = firebase.auth().currentUser;
  dispatch({ type: actions.PASSWORD_EDIT_START });
  try {
    if (data.password.length > 0) {
      //Checks if password field on form is filled to change password
      await user.updatePassword(data.password);
    }
    dispatch({ type: actions.PASSWORD_EDIT_SUCCESS , payload: "Your password has been updated!"});
  } catch (err) {
    dispatch({ type: actions.PASSWORD_EDIT_FAIL, payload: err.message });
  }
};

//Delete Profile   (6 of 7)
export const deleteUser = () => async (dispatch, getState) => {
  const db = firebase.firestore();
  const user = firebase.auth().currentUser; //Gets current user
  const userId = getState().firebase.auth.uid;
  dispatch({ type: actions.DELETE_START });
  try {
  

    //Delete a users meals as well when account is deleted
    await db
      .collection("meals")
      .doc(userId)
      .delete();

    await user.delete(); //Deletes current user
  } catch (err) {
    dispatch({ type: actions.DELETE_FAIL, payload: err.message });
  }
};
