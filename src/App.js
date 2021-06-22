import React from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
//Local Files
import Landing from "./users/pages/unauth/Landing";
import SignUp from "./users/pages/unauth/Signup";
import Login from "./users/pages/unauth/Login";
import Meals from "./meals/pages/Meals";
import NavBar from "./shared/components/Navigation/Navbar";
import SideDrawer from "./shared/components/Navigation/SideDrawer";
import CreateMeal from "./meals/pages/CreateMeal";
import Breakfast from "./meals/pages/MealTimes/Breakfast";
import Lunch from "./meals/pages/MealTimes/Lunch";
import Dinner from "./meals/pages/MealTimes/Dinner";
import Snack from "./meals/pages/MealTimes/Snack";
import Favorite from "./meals/pages/Favorite";
import ForgotPassword from "./users/pages/unauth/ForgotPassword";
import Settings from "./users/pages/auth/Settings";

function App({ loggedIn }) {
  let routes;
  if (loggedIn) {
    routes = (
      <>
        <NavBar />
        <SideDrawer />
        <Switch>
          <Route exact path="/meals" component={Meals} />
          <Route path="/breakfast" component={Breakfast} />
          <Route path="/lunch" component={Lunch} />
          <Route path="/dinner" component={Dinner} />
          <Route path="/snack" component={Snack} />
          <Route path="/create" component={CreateMeal} />
          <Route path="/favorites" component={Favorite} />
          <Route path="/settings" component={Settings} />
          <Redirect to="/meals" />
        </Switch>
      </>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/landing" component={Landing} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgotpass" component={ForgotPassword} />
        <Redirect to="/landing" />
      </Switch>
    );
  }
  return <>{routes}</>;
}

const mapStateToProps = ({ firebase }) => ({
  loggedIn: firebase.auth.uid ? true : null
});

export default connect(mapStateToProps)(App);
