import React from "react";
import Container from "@material-ui/core/Container";
import { NavLink } from "react-router-dom";
//Local Files
import "./index.css";
import Background from "../../components/Background";
import HeaderLogo from "../../components/HeaderLogo";
import RedBtn from "../../../shared/components/Buttons/RedBtn";
import OutlineBtn from "../../../shared/components/Buttons/OutlineBtn";
import Hero from "../../../assets/KEVIN.png";

function Landing() {
  return (
    <Background>
      <Container className="landing">
        <div className="landing-content">
          <HeaderLogo />
          <div className="kevin">
            <img src={Hero} alt="backround_img" />
          </div>
          <div className="landing-btns">
            <p className="landing-btns-p">First time here?</p>
            <NavLink to="/signup">
              <RedBtn>Sign Up</RedBtn>
            </NavLink>
            <NavLink to="/login">
              <OutlineBtn>Login</OutlineBtn>
            </NavLink>
          </div>
        </div>
      </Container>
    </Background>
  );
}

export default Landing;
