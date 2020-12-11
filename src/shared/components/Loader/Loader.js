import React from "react";
import styled from "styled-components";

//TO CHANGE LOADER GRAB CSS FROM 'https://loading.io/css/'

const BeanContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: var(--white-color);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: var(--grey-color);
`;

const BeanWrapper = styled.div`
  width: 300px;
  height: 300px;
  display: inline-block;
  overflow: hidden;
  background: var(--white-color);
  @media (max-width: 425px) {
    width: 200px;
    height: 200px;
  }
`;

const Bean = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
  & div {
    box-sizing: border-box;
  }
  & div:nth-child(1) {
    display: block;
  }
  & div:nth-child(1) div {
    position: absolute;
    top: 92px;
    left: -8px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #bc3829;
    animation: bean-3 1s linear infinite;
  }
  & div:nth-child(2) {
    transform: translate(-15px, 0);
  }
  & div:nth-child(2) div {
    position: absolute;
    top: 40px;
    left: 40px;
    width: 120px;
    height: 60px;
    border-radius: 120px 120px 0 0;
    background: #ffc400;
    animation: bean-1 1s linear infinite;
    transform-origin: 60px 60px;
  }
  & div:nth-child(1) div:nth-child(1) {
    animation-delay: -0.67s;
  }
  & div:nth-child(1) div:nth-child(2) {
    animation-delay: -0.33s;
  }
  & div:nth-child(1) div:nth-child(3) {
    animation-delay: 0s;
  }
  & div:nth-child(2) div:nth-child(2) {
    animation: bean-2 1s linear infinite;
  }
  & div:nth-child(2) div:nth-child(3) {
    transform: rotate(-90deg);
    animation: none;
  }
  @keyframes bean-1 {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(-45deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
  @keyframes bean-2 {
    0% {
      transform: rotate(180deg);
    }
    50% {
      transform: rotate(225deg);
    }
    100% {
      transform: rotate(180deg);
    }
  }
  @keyframes bean-3 {
    0% {
      transform: translate(190px, 0);
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    100% {
      transform: translate(70px, 0);
      opacity: 1;
    }
  }
`;

function Loader() {
  return (
    <BeanContainer>
      <h1>loading...</h1>
      <BeanWrapper>
        <Bean>
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </Bean>
      </BeanWrapper>
    </BeanContainer>
  );
}

export default Loader;
