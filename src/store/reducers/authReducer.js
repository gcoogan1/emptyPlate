//Local Files
import * as actions from "../actions/actionTypes";

//Initial State
const initialState = {
  error: null,
  loading: false,
  resetPass: {
    loading: false,
    error: null,
    success: null
  },
  profileEdit: {
    error: null,
    loading: false,
    success: null
  },
  deleteUser: {
    loading: false,
    error: null
  },
  updatePassword: {
    loading: false,
    error: null,
    success: null
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    //SIGNUP ACCOUNT AND LOGIN
    case actions.AUTH_START:
      return { ...state, loading: true };
    case actions.AUTH_END:
      return { ...state, loading: false };
    case actions.AUTH_SUCCESS:
      return { ...state, error: false };
    case actions.AUTH_FAIL:
      return { ...state, error: payload };

    //CLEAN-UP
    case actions.CLEAN_UP:
      return {
        ...state,
        error: null,
        loading: false,
        resetPass:{
          error: null,
          loading: false,
          success: null,
        },
        profileEdit: {
          error: null,
          loading: false,
          success: null
        },
        deleteUser: {
          loading: false,
          error: null
        },
        updatePassword: {
          ...state.updatePassword,
          loading: false,
          error: null,
          success: null
        }
      };

    //FORGOT PASSWORD
    case actions.SEND_SUCCESS:
      return {
        ...state,
        resetPass: { ...state.resetPass, error: false }
      };
    case actions.SEND_FAIL:
      return {
        ...state,
        resetPass: { ...state.resetPass, error: payload }
      };

    //PROFILE
    case actions.PROFILE_EDIT_START:
      return { ...state, profileEdit: { ...state.profileEdit, loading: true } };
    case actions.PROFILE_EDIT_SUCCESS:
      return {
        ...state,
        profileEdit: { ...state.profileEdit, loading: false, error: false , success: payload }
      };
    case actions.PROFILE_EDIT_FAIL:
      return {
        ...state,
        profileEdit: { ...state.profileEdit, loading: false, error: payload, succes: false }
      };

    //CHANGE PASSWORD
    case actions.PASSWORD_EDIT_START:
      return {
        ...state,
        updatePassword: { ...state.updatePassword, loading: true }
      };
    case actions.PASSWORD_EDIT_SUCCESS:
      return {
        ...state,
        updatePassword: {
          ...state.updatePassword,
          loading: false,
          error: false,
          success: payload 
        }
      };
    case actions.PASSWORD_EDIT_FAIL:
      return {
        ...state,
        updatePassword: {
          ...state.updatePassword,
          loading: false,
          error: payload,
          success: false
        }
      };

    //DELETE ACCOUNT
    case actions.DELETE_START:
      return { ...state, deleteUser: { ...state.deleteUser, loading: true } };
    case actions.DELETE_FAIL:
      return {
        ...state,
        deleteUser: { ...state.deleteUser, loading: false, error: payload }
      };

    default:
      return state;
  }
};
