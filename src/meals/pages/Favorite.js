import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Container from "@material-ui/core/Container";
//Local Files
import "./index.css";
import { titleCase } from "../../hoc/function/index";
import MealItem from "./MealItem";
import BackgroundColor from "../../shared/components/BackgroundColor/BackgroundColor";
import Loader from '../../shared/components/Loader/Loader';

function Favorites({ userId, mealData }) {
  let content;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!mealData) {
    content = <Loader/>;
  } else if (!mealData[userId] || !mealData[userId].meals) {
    content = (
      <h2 className="click-to-add">Add meals and pick your favorites!</h2>
    );
  } else if (mealData[userId].meals.length === 0) {
    content = (
      <h2 className="click-to-add">Add meals and pick your favorites!</h2>
    );
    //Otherwise map through meals, sort by time of day and display the meal titles
  } else {
    //Creates an array using only the favorite values
    const faves = mealData[userId].meals.map(m => m.favorite);
    //Checks to see if all array values are equal
    const allEqual = arr => arr.every(val => val === arr[0]);
    //console.log(faves)
    //Checks if the new faves array values are all equal
    if (allEqual(faves)) {
      //Checks if all the value are specifcally equal to true
      function checkTrue(value) {
        return value === true;
      }
      // console.log(faves.every(checkTrue))
      //If all value are equal to true then display; if all values are equal to false then return message
      if (faves.every(checkTrue)) {
        content = (
          <>
            {" "}
            {mealData[userId].meals
              .slice(0)
              .reverse()
              .map(meal => {
                if (meal.favorite) {
                  return (
                    <MealItem
                      key={meal.id}
                      meals={meal}
                      name={meal.name}
                      ing={meal.ingredients}
                      inst={meal.instructions}
                      fav={meal.favorite}
                    >
                      {" "}
                      <h3 className="mealTime-mealTitle">
                        {titleCase(meal.name)}
                      </h3>{" "}
                    </MealItem>
                  );
                } else {
                  return null;
                }
              })}{" "}
          </>
        );
      } else {
        content = (
          <h2 className="click-to-add">Add meals and pick your favorites!</h2>
        );
      }
      //If all values are not equal then only diplay the true values
    } else {
      content = (
        <>
          {" "}
          {mealData[userId].meals
            .slice(0)
            .reverse()
            .map(meal => {
              if (meal.favorite) {
                return (
                  <MealItem
                    key={meal.id}
                    meals={meal}
                    name={meal.name}
                    ing={meal.ingredients}
                    inst={meal.instructions}
                    fav={meal.favorite}
                  >
                    {" "}
                    <h3 className="mealTime-mealTitle">
                      {titleCase(meal.name)}
                    </h3>{" "}
                  </MealItem>
                );
              } else {
                return null;
              }
            })}{" "}
        </>
      );
    }
  }
  return (
    <>
      <BackgroundColor>
        <Container maxWidth="sm" className="fav-container">
          <div className="fav-content">
            <div className="fav-title-wrapper">
              <h1 className="fav-title">Favorites</h1>
            </div>
            <div className="fav-list">{content}</div>
          </div>
        </Container>
      </BackgroundColor>
    </>
  );
}

const mapStateToProps = ({ firebase, firestore }) => ({
  userId: firebase.auth.uid,
  mealData: firestore.data.meals
});

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => [`meals/${props.userId}`])
)(Favorites);
