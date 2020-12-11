import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
//Local Files
import authReducer from "./authReducer";
import mealReducer from "./mealReducer";

//ROOT REDUCER WITH ALL REDUCERS

export default combineReducers({
  auth: authReducer,
  meals: mealReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});
