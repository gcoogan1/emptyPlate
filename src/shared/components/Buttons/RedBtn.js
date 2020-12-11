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
  color: var(--white-color);
  font-weight: 800;
  margin: 10px 0px;
  background-color: #bc3829;
  border: 2px solid #bc3829;
  &:hover {
    background-color: var(--darkRed-color);
    border: 2px solid var(--darkRed-color);
  }
  &:disabled {
    cursor: not-allowed;
    background-color: var(--darkGrey-color);
    border: none;
  }
`;

const RedBtn = ({ children, adjust, disabled, loading }) => {
  return (
    <StyledButton adjust={adjust} disabled={disabled}>
      {loading ? loading : children}
    </StyledButton>
  );
};

export default RedBtn;