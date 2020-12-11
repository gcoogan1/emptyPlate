import React from "react";
import styled from "styled-components";
import './index.css';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';

const InputWrapper = styled.div`
  display: flex;
  position: relative;
  margin-top: 3px;
  flex-direction: column;
`;

const StyledInput = styled.input`
  border-radius: 4px;
  border: ${({ show }) => (show ? "2px solid  #BC3829" : "none")};
  width: 302px;
  height: 54px;
  text-indent: 20px;
  font-size: 16px;
  background-color: ${({ adjust }) => (adjust ? "#F4F5F7" : "none")};
  outline: none;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: var(--black-color);
    font-size: 16px;
    text-indent: 20px;
    opacity: 0.2;
  }
  :-ms-input-placeholder {
    color: var(--black-color);
    font-size: 16px;
    text-indent: 20px;
    opacity: 0.2;
  }
  /* Change auto-fill effect in chrome ;) */
  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
`;

const Error = styled.div`
 width: 302px;
 height: 20px;
`

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    color: '#bc3829',
    fontWeight: 'bold',
    fontSize: '12px',
  },
});



const Input = ({ field, form: { touched, errors }, ...props }) => {
  const classes = useStyles();
  return (
    <InputWrapper>
      <StyledInput
        {...field}
        {...props}
        show={errors[field.name] && touched[field.name]}
      />
      <Error>
      <FormHelperText  classes={{root: classes.root}}
        show={errors[field.name] && touched[field.name]}
        //will show if there is an error from the moment it is touched
      >
        {errors[field.name]}
      </FormHelperText>
      </Error>
    </InputWrapper>
  );
};

export default Input;