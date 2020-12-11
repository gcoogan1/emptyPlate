//Local Files
import * as actions from "./actionTypes";
import firebase from "../../firebase/firebase";



//Add Meal   (1 of 5)
export const addMeal = data => async (dispatch, getState) => {
  const db = firebase.firestore();
  const userId = getState().firebase.auth.uid; //Get firebase user id
  dispatch({ type: actions.ADD_MEAL_START });
  try {
    const res = await db //This will grab the meals
      .collection("meals")
      .doc(userId)
      .get();
    const newMeal = {
      id: new Date().valueOf(),
      name: data.name,
      meal: data.meal, //time of day
      ingredients: data.ingredients,
      instructions: data.instructions,
      favorite: false
    };
    //If there is no meals set meals to new meals
    if (!res.data()) {
      db.collection("meals")
        .doc(userId)
        .set({
          meals: [newMeal]
        });
      //Otherwise add the new meals onto the pre-existing meals
    } else {
      db.collection("meals")
        .doc(userId)
        .update({
          meals: [...res.data().meals, newMeal]
        });
    }

    dispatch({ type: actions.ADD_MEAL_SUCCESS, payload: "Your meal has been created!!" });
    return true;
  } catch (err) {
     dispatch({ type: actions.ADD_MEAL_FAIL, payload: err.message });
  }
};

//Clean-up    (2 of 5)
export const cleanMeals = () => ({
  type: actions.CLEAN_UP_MEALS
});

//Delete Meal   (3 of 5)
export const deleteMeal = id => async (dispatch, getState) => {
  const db = firebase.firestore();
  const userId = getState().firebase.auth.uid;
  dispatch({ type: actions.DELETE_MEAL_START });
  try {
    const res = await db
      //Gets the meals from user
      .collection("meals")
      .doc(userId)
      .get();

    const previousMeals = res.data().meals;
    const newMeals = previousMeals.filter(meal => meal.id !== id); //Filter meals through their id and return only the meals that do not match the id of the meal passed through
    await db
      .collection("meals")
      .doc(userId)
      .update({
        meals: newMeals
      });
    dispatch({ type: actions.DELETE_MEAL_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.DELETE_MEAL_FAIL, payload: err.message });
  }
};

//Edit MEAL    (4 0f 5)
export const editMeal = (id, data) => async (dispatch, getState) => {
  const db = firebase.firestore();
  const userId = getState().firebase.auth.uid;
  dispatch({ type: actions.ADD_MEAL_START });
  try {
    const res = await db
      .collection("meals")
      .doc(userId)
      .get();
    const meals = res.data().meals; //Data passed through from inputs
    const index = meals.findIndex(meal => meal.id === id); //Find id of the meal passed through
    //Update new meal with the data passes through the inputs with the exception of the id (which remains the same)(time of day will be the same as well b/c user is not given the option to change it)
    if (meals[index].favorite) {
      const newMeal = {
        name: data.name,
        meal: data.meal,
        ingredients: data.ingredients,
        instructions: data.instructions,
        favorite: meals[index].favorite,
        id
      };
      meals[index] = newMeal;
      //Update firestore
      await db
        .collection("meals")
        .doc(userId)
        .update({
          meals
        });
    } else {
      const newMeal = {
        name: data.name,
        meal: data.meal,
        ingredients: data.ingredients,
        instructions: data.instructions,
        favorite: false,
        id
      };
      meals[index] = newMeal;
      //Update firestore
      await db
        .collection("meals")
        .doc(userId)
        .update({
          meals
        });
    }

    //Meals with the matched id found, will be set to the new meals so the correct meal is updated

    dispatch({ type: actions.ADD_MEAL_SUCCESS ,  payload: "Your meal has been updated!!" });
    return true;
  } catch (err) {
    dispatch({ type: actions.ADD_MEAL_FAIL, payload: err.message });
  }
};

//Fav MEAL   (5 0f 5)
export const favMeal = (id, meal, favorite) => async (dispatch, getState) => {
  const db = firebase.firestore();
  const userId = getState().firebase.auth.uid;

  dispatch({ type: actions.ADD_FAV_START });
  try {
    const res = await db
      .collection("meals")
      .doc(userId)
      .get();
    const meals = res.data().meals; //Data passed through from inputs
    const index = meals.findIndex(meal => meal.id === id); //Find id of the meal passed through

    const newMeal = {
      name: meal.name,
      meal: meal.meal,
      ingredients: meal.ingredients,
      instructions: meal.instructions,
      favorite: favorite,
      id
    };

    meals[index] = newMeal;
    //Update firestore
    await db
      .collection("meals")
      .doc(userId)
      .update({
        meals
      })
     
    dispatch({ type: actions.ADD_FAV_SUCCESS });
    return true;
  } catch (err) {
    dispatch({ type: actions.ADD_FAV_FAIL, payload: err.message });
  }
};
