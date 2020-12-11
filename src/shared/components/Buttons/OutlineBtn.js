import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: ${({ adjust }) => (adjust ? "240px" : "302px")};
  height: ${({ adjust }) => (adjust ? "56px" : "64px")};
  outline: none;
  border-radius: ${({ adjust }) => (adjust ? "100px" : "5px")};
  text-transform: uppercase;
  font-size: 16px;
  cursor: pointer;
  color: ${({ adjust }) => (adjust ? "#98A4BF" : "white")};
  font-weight: 800;
  margin: 10px 0px;
  background-color: transparent;
  border: ${({ adjust }) => (adjust ? "2px solid #98A4BF" : "2px solid white")};
  &:hover {
    color: var(--red-color);
    border: 2px solid var(--red-color);
  }
  &:disabled {
    cursor: not-allowed;
    background-color: var(--darkGrey-color);
    border: none;
  }
`;

const OutlineBtn = ({ children, adjust, click }) => {
  return <StyledButton onClick={click} adjust={adjust}>{children}</StyledButton>;
};

export default OutlineBtn;