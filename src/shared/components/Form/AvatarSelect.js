import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';



const SelectWrapper = styled.div`
  display: flex;
  position: relative;
  margin-top: 3px;
  margin-bottom: 15px;
  flex-direction: column;
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

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    color: '#bc3829',
    fontWeight: 'bold',
    fontSize: '12px',
  },
});

const AvatarSelect = ({ field, form: { touched, errors }, ...props }) => {
  const classes = useStyles();

  return (
    <SelectWrapper>
      <Select
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
    </SelectWrapper>
 
     
  );
};

export default AvatarSelect;
