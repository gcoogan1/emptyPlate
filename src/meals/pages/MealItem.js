import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
//Local Files
import View from "./View";
import StarGold from "../../assets/Star.svg";

const MealItemBtn = styled.button`
  width: 375px;
  height: 80px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  outline: none;
  margin: 5px;
`;

const MealItem = ({ children, name, meals, ing, inst, key, fav }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <MealItemBtn onClick={() => setIsEditing(true)}>
        {children}
        {fav ? (
          <img style={{ marginRight: "30px" }} src={StarGold} alt="STAR" />
        ) : null}
      </MealItemBtn>
      <View
        opened={isEditing}
        name={name}
        meals={meals}
        ing={ing}
        key={key}
        inst={inst}
        close={() => setIsEditing(false)}
      />
    </>
  );
};

const mapStateToProps = ({ firebase }) => ({
  userId: firebase.auth.uid
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MealItem);
