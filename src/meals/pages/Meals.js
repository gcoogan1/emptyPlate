import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
//Local Files
import "./index.css";
import * as actions from "../../store/actions";
import BackgroundColor from '../../shared/components/BackgroundColor/BackgroundColor';
import BreakfastIcon from "../../assets/icons/Icon_Breakfast.png";
import LunchIcon from "../../assets/icons/Icon_Lunch.png";
import DinnerIcon from "../../assets/icons/Icon_Dinner.png";
import SnackIcon from "../../assets/icons/Icon_Snack.png";

//Specific Styles
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  height: 100%;
  width: 100%;
  text-align: center;
  cursor: pointer;
`;

const MealSection = styled.p`
  color: black;
  font: 16px;
  margin-top: 20px;
  text-align: center;
`;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    width: "146px",
    height: "172px",
    '&:hover': {
      boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)'
    }
  }
}));

function Meals({ cleanMeals }) {
  const classes = useStyles();
  useEffect(() => {
    window.scrollTo(0, 0);
    cleanMeals();
  }, [cleanMeals]);
  return (
    <BackgroundColor>
      <Container className="meal-content">
        <div className="meals-title-wrapper">
          <h1 className="meals-title">What time is it?</h1>
        </div>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={1}>
              <Grid item>
                <Paper className={classes.paper} >
                  <StyledNavLink to="/breakfast">
                    <div className="meals-btn">
                      <img
                        className="icon"
                        src={BreakfastIcon}
                        alt="Breakfast_Icon"
                      />
                      <MealSection>Breakfast</MealSection>{" "}
                    </div>
                  </StyledNavLink>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.paper}>
                  <StyledNavLink to="/lunch">
                    <div className="meals-btn">
                      <img className="icon" src={LunchIcon} alt="Lunch_Icon" />
                      <MealSection>Lunch</MealSection>{" "}
                    </div>
                  </StyledNavLink>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.paper}>
                  <StyledNavLink to="/dinner">
                    <div className="meals-btn">
                      <img
                        className="icon"
                        src={DinnerIcon}
                        alt="Dinner_Icon"
                      />
                      <MealSection>Dinner</MealSection>{" "}
                    </div>
                  </StyledNavLink>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.paper}>
                  <StyledNavLink to="/snack">
                    <div className="meals-btn">
                      <img className="icon" src={SnackIcon} alt="Snack_Icon" />
                      <MealSection>Snack</MealSection>{" "}
                    </div>
                  </StyledNavLink>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </BackgroundColor>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  cleanMeals: actions.cleanMeals
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Meals);
