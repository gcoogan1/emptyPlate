import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Container from "@material-ui/core/Container";
//Local Files
import "../index.css";
import {titleCase} from '../../../hoc/function/index';
import MealItem from "../MealItem";
import Left from "../../../assets/Path 3.svg";
import RedBtn from "../../../shared/components/Buttons/RedBtn";
import BackgroundColor from "../../../shared/components/BackgroundColor/BackgroundColor";




function Dinner({ meals, userId }) {
  const history = useHistory();
  let content;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
   //If there are no meals or user
   if (!meals) {
    content = <h4>Loading</h4>;
  } else if (!meals[userId] || !meals[userId].meals) {
    content = <h3 className="click-to-add">Click to add meals!</h3>;
  } else if (meals[userId].meals.length === 0) {
    content = <h3 className="click-to-add">Click to add meals!</h3>;
    //Otherwise map through meals, sort by time of day and display the meal titles
  } else {
    const times = meals[userId].meals.map(m => m.meal);
    const findTime = times.includes("Dinner");
   

    if (findTime) {
      content = (
        <>
          {" "}
          {meals[userId].meals
            .slice(0)
            .reverse()
            .map(meal => {
              if (meal.meal === "Dinner") {
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
                    <h3 className="mealTime-mealTitle">{titleCase(meal.name)}</h3>{" "}
                  </MealItem>
              
                );
              } else {
                return null;
              }
            })}{" "}
        </>
      );
    } else {
      content = <h3 className="click-to-add">Click to add meals!</h3>;
    }
  }

  return (
    <BackgroundColor>
      <div className="mealTime-arrow">
        <img
          src={Left}
          onClick={() => {
            history.goBack();
          }}
          alt="arrow"
        />
      </div>
      <Container maxWidth="md" className="mealTime-container">
        <div className="mealTime-content">
          <h1>Dinner</h1>
          <NavLink to="/create">
            <RedBtn adjust>Add New Recipe</RedBtn>
          </NavLink>
          <div className="mealTime-meals">
            <div className="mealTime-meal">{content}</div>
          </div>
        </div>
      </Container>
    </BackgroundColor>
  );
}

const mapStateToProps = ({ firebase, firestore }) => ({
  userId: firebase.auth.uid,
  meals: firestore.data.meals
});

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => [`meals/${props.userId}`])
)(Dinner);