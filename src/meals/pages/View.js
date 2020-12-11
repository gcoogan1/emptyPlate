import React, { useState } from "react";
import { connect } from "react-redux";
//Local
import "./index.css";
import * as actions from "../../store/actions/index";
import { titleCase } from "../../hoc/function/index";
import Modal from "../../shared/components/Modal/Modal";
import Container from "@material-ui/core/Container";
import Arrow from "../../assets/Path 3.svg";
import Edit from "./Edit";
import OutlineBtn from "../../shared/components/Buttons/OutlineBtn";
import Btn from "../../shared/components/Buttons/Btn";
import Star from "../components/Star/Star";

//LIST STYLE
const listStyle = {
  paddingRight: "12px"
};

function View({
  opened,
  close,
  name,
  meals,
  ing,
  inst,
  deleteMeal,
  cleanMeals
}) {
  const [showDelModal, setDelModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  return (
    <>
      <Modal opened={opened} close={close}>
        <Container maxWidth="md" className="mealView-container">
          <div className="mealView-top">
            <img
              style={{ cursor: "pointer", height: "30px" }}
              src={Arrow}
              alt="arrow"
              onClick={() => {
                close();
              }}
              className="mealView-close"
            />
            <div className="mealView-star">
              {" "}
              <Star meal={meals} />
            </div>
          </div>
          <Container maxWidth="sm">
            <div className="mealView-content">
              <h2>{name}</h2>
              <div className="mealView-cards">
                <div className="mealView-text">
                  <h4 className="mealView-text-title">Ingredients</h4>
                  <div className="mealView-list">
                    {ing.split(",").map((i, id) => {
                      //Seperates ingr by (,) then capitalize each word
                      return (
                        <ul key={id}>
                          <li>{titleCase(i).trim()}</li>
                        </ul>
                      );
                    })}
                  </div>
                </div>
                <div className="mealView-text">
                  <h4 className="mealView-text-title">Instuctions</h4>
                  <div className="mealView-list">
                    {inst.split(",").map((i, id) => {
                      id = id + 1 + "."; //Seperates instr by (,) then capitalize the first letter of each word
                      return (
                        <ul key={id}>
                          <div style={listStyle}>{id}</div>{" "}
                          {titleCase(i).trim()}
                        </ul>
                      );
                    })}
                  </div>
                </div>
              </div>
              <OutlineBtn
                adjust
                click={() => {
                  setEditModal(true);
                  cleanMeals();
                  close();
                }}
              >
                Edit Recipe
              </OutlineBtn>
              <div className="delete-recipe">
                <p
                  onClick={() => {
                    setDelModal(true);
                    close();
                  }}
                >
                  Delete Meal?
                </p>
              </div>
            </div>
          </Container>
        </Container>
      </Modal>
      <Modal
        opened={showDelModal}
        close={() => setDelModal(false)}
        padded
        small
      >
        <div className="delete-modal">
          <h2>Are you sure you want to delete this recipe?</h2>
          <Btn del click={() => deleteMeal(meals.id)}>
            Yes, Delete
          </Btn>
          <Btn click={() => setDelModal(false)}>No, Cancel</Btn>
        </div>
      </Modal>
      <Modal opened={showEditModal} close={() => setEditModal(false)}>
        <Edit
          meals={meals}
          ing={ing}
          inst={inst}
          name={name}
          close={() => setEditModal(false)}
        />
      </Modal>
    </>
  );
}

const mapStateToProps = ({ meals }) => ({
  loading: meals.loading
});

const mapDispatchToProps = {
  deleteMeal: actions.deleteMeal,
  cleanMeals: actions.cleanMeals
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
