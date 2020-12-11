//Local Files
import * as actions from "../actions/actionTypes";

//Initial State
const initialState = {
  error: null,
  loading: false,
  success: null,
  deleteMeal: {
    error: null,
    loading: false
  },
  favMeal: {
    error: null,
    loading: false
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    //ADD MEAL AND EDIT MEAL
    case actions.ADD_MEAL_START:
      return { ...state, loading: true };
    case actions.ADD_MEAL_SUCCESS:
      return { ...state, loading: false, error: false, success: payload };
    case actions.ADD_MEAL_FAIL:
      return { ...state, loading: false, error: payload, success: false };

    //CLEAN-UP-MEALS
    case actions.CLEAN_UP_MEALS:
      return {
        ...state,
        error: null,
        loading: false,
        success: null,
        deleteMeal: {
          error: null,
          loading: false
        },
        favMeal: {
          error: null,
          loading: false
        }
      };

    //DELETE MEAL
    case actions.DELETE_MEAL_START:
      return { ...state, loading: true };
    case actions.DELETE_MEAL_SUCCESS:
      return { ...state, loading: false, error: false };
    case actions.DELETE_MEAL_FAIL:
      return { ...state, loading: false, error: payload };

    //PROFILE
    case actions.ADD_FAV_START:
      return { ...state, favMeal: { ...state.favMeal, loading: true } };
    case actions.ADD_FAV_SUCCESS:
      return {
        ...state,
        favMeal: { ...state.favMeal, loading: false, error: false }
      };
    case actions.ADD_FAV_FAIL:
      return {
        ...state,
        favMeal: { ...state.favMeal, loading: false, error: payload }
      };

    default:
      return state;
  }
};
