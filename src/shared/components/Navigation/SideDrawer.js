import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
//Local Files
import NavItems from "./NavItems";
import NEP from "../../../assets/NEP@2x.png";
import Arrow from '../../../assets/Path 2.svg'
import Hamburger from "./Hamburger";

const FixedWrapper = styled.header`
  position: fixed;
  background-color: var(--grey-color);
  padding: 0rem 2rem;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 6rem;
  display: none;
  @media (max-width: 768px) {
    display: flex;
    height: 4rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Menu = styled.div`
  position: fixed;
  z-index: 1;
  width: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--grey-color);
  visibility: ${props => (props.opened ? "visibile" : "hidden")};
  transform: translateY(${props => (props.opened ? "0%" : "-100%")});
  transition: all 0.1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  display: none;
  @media (max-width: 768px) {
    display: flex;
  }
`;

const LogoImg = styled.img`
  width: 80px;
  height: 50px;
`;

const SideDrawer = ({ loggedIn }) => {
  const [isOpened, setIsOpened] = useState(false);
  const history = useHistory();
  return (
    <>
      <FixedWrapper>
        <Wrapper>
          <img
            onClick={() => {
              history.goBack();
            }}
            src={Arrow}
            alt="arrow"
          />
          <LogoImg src={NEP} alt="logo" />
          <Hamburger opened={isOpened} clicked={() => setIsOpened(!isOpened)} />
        </Wrapper>
      </FixedWrapper>
      <Menu opened={isOpened}>
        <NavItems clicked={() => setIsOpened(false)} />
      </Menu>
    </>
  );
};

export default SideDrawer;
