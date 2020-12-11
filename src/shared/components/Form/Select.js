import React from "react";
import styled from "styled-components";
import DownArrow from '../../../assets/down-arrow.png';



const SelectWrapper = styled.div`
  display: flex;
  position: relative;
  margin-top: 3px;
  margin-bottom: 15px;
  flex-direction: column;
`;


const StyledSelect = styled.select`
  width: 302px;
  height: 54px;
  color: var(--black-color);
  border-radius: 4px;
  border: ${({ show }) => (show ? "2px solid #BC3829" : "none")};
  background-color: ${({ adjust }) => (adjust ? "#F4F5F7" : "white")};
  font-size: 16px;
  outline: none;
  text-indent: 20px;
  appearance: none; 
  background-position:
    calc(100% - 21px) calc(1em + 2px),
    calc(100% - 16px) calc(1em + 2px),
    100% 0;
  background-repeat: no-repeat;
  background-image: url(${DownArrow});
`;

const Error = styled.div`
  visibility: ${({ show }) => (show ? "visibile" : "hidden")};
  opacity: ${({ show }) => (show ? "1" : "0")};
  transform: translateY(${({ show }) => (show ? "20px" : "10px")});
  transition: all 0.1s;
  position: absolute;
  width: 100%;
  text-align: center;
  margin-top: 36px;
  color: var(--red-color);
  font-weight: bold;
  font-size: 12px;
`;

const Select = ({ field, form: { touched, errors }, ...props  }) => {
  return (
    <SelectWrapper>
      <StyledSelect  {...field} {...props}  show={errors[field.name] && touched[field.name]} />
      <Error
        show={errors[field.name] && touched[field.name]}
        //will show if there is an error from the moment it is touched
      >
        {errors[field.name]}
      </Error>
    </SelectWrapper>
  );
};

export default Select;