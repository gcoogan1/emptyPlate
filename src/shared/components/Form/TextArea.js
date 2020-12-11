import React from "react";
import styled from "styled-components";

const TextWrapper = styled.div`
  display: flex;
  position: relative;
  margin-top: 3px;
  margin-bottom: 15px;
  flex-direction: column;
`;

const StyledText = styled.textarea`
  width: 302px;
  height: 108px;
  color: var(--black-color);
  background-color: ${({ adjust }) => (adjust ? "#F4F5F7" : "#FFFFFF")};
  border-radius: 4px;
  border: ${({ show }) => (show ? "2px solid #BC3829" : "none")};
  font-size: 16px;
  outline: none;
  resize: none;
  padding: 10px;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: var(--black-color);
    font-size: 16px;
    opacity: 0.2;
  }
  :-ms-input-placeholder {
    color: var(--black-color);
    font-size: 16px;
    opacity: 0.2;
  }
`;

const Error = styled.div`
  visibility: ${({ show }) => (show ? "visibile" : "hidden")};
  opacity: ${({ show }) => (show ? "1" : "0")};
  transform: translateY(${({ show }) => (show ? "20px" : "10px")});
  transition: all 0.1s;
  position: absolute;
  width: 100%;
  color: var(--red-color);
  font-weight: bold;
  text-align: center;
  margin-top: 90px;
  font-size: 12px;
`;

const TextArea = ({ field, form: { touched, errors }, ...props }) => {
  return (
    <TextWrapper>
      <StyledText
        {...field}
        {...props}
        show={errors[field.name] && touched[field.name]}
      />
      <Error show={errors[field.name] && touched[field.name]}>
        {errors[field.name]}
      </Error>
    </TextWrapper>
  );
};

export default TextArea;
