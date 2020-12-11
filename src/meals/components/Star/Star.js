import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
//Local Files
import StarPlain from "../../../assets/Icon_Star-Outline.svg";
import StarGold from "../../../assets/Star.svg";
import * as actions from "../../../store/actions/index";

const imagesPath = {
  plain: StarPlain,
  gold: StarGold
};

const ButtonStar = styled.button`
  border: none;
  background-color: transparent;
  width: 33px;
  height: 32px;
`;
const StarImg = styled.img`
  width: 33px;
  height: 32px;
`;

const Star = ({ meal, favMeal, cleanMeals }) => {
  const [toogle, setToogle] = useState(meal.favorite);

 // console.log(toogle);

  const toogler = () => {
    setToogle(!toogle);
  };

  //Use Effect it used so that the toggled star and favMeal action are in sync
  useEffect(() => {
    cleanMeals();
    favMeal(meal.id, meal, toogle);
  }, [favMeal, meal, toogle, cleanMeals]);

  const getImageName = () => (toogle ? "gold" : "plain");
  const imageName = getImageName();

  return (
    <div>
      <ButtonStar onClick={toogler}>
        <StarImg src={imagesPath[imageName]} alt="star" />
      </ButtonStar>
    </div>
  );
};

const mapStateToProps = ({ meals }) => ({
  error: meals.favMeal.error
});

const mapDispatchToProps = {
  favMeal: actions.favMeal,
  cleanMeals: actions.cleanMeals
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Star);