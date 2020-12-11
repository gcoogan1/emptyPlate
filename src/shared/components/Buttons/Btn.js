import React from "react";
import styled from "styled-components";

const Button = styled.button`
  color: ${({ del }) => (del ? "#FFFFFF" : "#8A8382")};
  background-color: ${({ del }) => (del ? "#BC3829" : "transparent")};
  border: ${({ del }) => (del ? "2px solid #BC3829" : "2px solid #8A8382")};
  width: 129px;
  height: 64px;
  border-radius: 5px;
  margin-right: 8px;
  margin-top: 10px;
  font-size: 16px;
  font-weight: 800;
  &:hover {
    background-color: ${({ del }) => (del ? "#a93224" : "transparent")};
    border: ${({ del }) => (del ? "2px solid #a93224" : "2px solid #a93224")};
    color: ${({ del }) => (del ? "#FFFFFF" : "#a93224")};
  }
`;

export default function Btn({ children, click , del}) {
  return <Button del={del} onClick={click}>{children}</Button>;
}
