import React from "react";
import styled from "styled-components";
//Local
import Google from "../../assets/Google.png";

const StyledButton = styled.button`
  width: 302px;
  height: 64px;
  outline: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  color: var(--black-color);
  font-weight: 800;
  background-color: var(--white-color);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  width: 223px;
`;

function GoogleBtn({click, children}) {
  return (
    <StyledButton onClick={click} >
      <img src={Google} alt="google"/>
      <Text>{children}</Text>
    </StyledButton>
  );
}

export default GoogleBtn;
