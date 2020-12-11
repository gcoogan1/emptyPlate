import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
//Local Files
import "./index.css";
import * as actions from "../../../store/actions/index";
import Boxy from "../../../assets/characters/Boxy.png";
import Cat from "../../../assets/characters/Cat.png";
import Alligator from "../../../assets/characters/Alligator.png";
import Dracula from "../../../assets/characters/Dracula.png";
import Ghost from "../../../assets/characters/Ghost.png";
import Racoon from "../../../assets/characters/Racoon.png";
import Octopus from "../../../assets/characters/Octopus.png";
import Kevin from "../../../assets/characters/Kevin.png";
import Mouse from "../../../assets/characters/Mouse.png";

const LinksMenu = styled(NavLink)`
  color: var(--white-color);
  text-decoration: none;
  margin-right: 50px;
  @media (max-width: 768px) {
    margin-right: 0px;
  }
`;

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  }
}));

function NavItems({ logout, clicked, firebase }) {
  const classes = useStyles();
  //console.log(firebase.profile);
  const fire = firebase.profile.avatar;

  let avatarSettings;
  if (!fire) {
    avatarSettings = (
      <LinksMenu
        onClick={clicked}
        activeStyle={{ borderBottom: " 2px solid white" }}
        to="/settings"
      >
        <li>Settings</li>
      </LinksMenu>
    );
  } else if (fire === "boxy") {
    avatarSettings = (
      <LinksMenu onClick={clicked} to="/settings">
        <Avatar src={Boxy} alt="Boxy" className={classes.large} />
      </LinksMenu>
    );
  } else if (fire === "cat") {
    avatarSettings = (
      <LinksMenu onClick={clicked} to="/settings">
        <Avatar src={Cat} alt="Cat" className={classes.large} />
      </LinksMenu>
    );
  } else if (fire === "alligator") {
    avatarSettings = (
      <LinksMenu onClick={clicked} to="/settings">
        <Avatar src={Alligator} alt="Alligator" className={classes.large} />
      </LinksMenu>
    );
  } else if (fire === "dracula") {
    avatarSettings = (
      <LinksMenu onClick={clicked} to="/settings">
        <Avatar src={Dracula} alt="Dracula" className={classes.large} />
      </LinksMenu>
    );
  } else if (fire === "ghost") {
    avatarSettings = (
      <LinksMenu onClick={clicked} to="/settings">
        <Avatar src={Ghost} alt="Ghost" className={classes.large} />
      </LinksMenu>
    );
  } else if (fire === "racoon") {
    avatarSettings = (
      <LinksMenu onClick={clicked} to="/settings">
        <Avatar src={Racoon} alt="Racoon" className={classes.large} />
      </LinksMenu>
    );
  } else if (fire === "octopus") {
    avatarSettings = (
      <LinksMenu onClick={clicked} to="/settings">
        <Avatar src={Octopus} alt="Octopus" className={classes.large} />
      </LinksMenu>
    );
  } else if (fire === "kevin") {
    avatarSettings = (
      <LinksMenu onClick={clicked} to="/settings">
        <Avatar src={Kevin} alt="Kevin" className={classes.large} />
      </LinksMenu>
    );
  } else if (fire === "mouse") {
    avatarSettings = (
      <LinksMenu onClick={clicked} to="/settings">
        <Avatar src={Mouse} alt="Mouse" className={classes.large} />
      </LinksMenu>
    );
  } else {
    avatarSettings = (
      <LinksMenu
        onClick={clicked}
        activeStyle={{ borderBottom: " 2px solid white" }}
        to="/settings"
      >
        <li>Settings</li>
      </LinksMenu>
    );
  }

  return (
    <div className="nav_links">
      <LinksMenu
        onClick={clicked}
        activeStyle={{ borderBottom: " 2px solid white" }}
        to="/meals"
      >
        <li>Meals</li>
      </LinksMenu>
      <LinksMenu
        onClick={clicked}
        activeStyle={{ borderBottom: " 2px solid white" }}
        to="/favorites"
      >
        <li>Favorites</li>
      </LinksMenu>
      {avatarSettings}
      <li onClick={logout} className="nav_leave">
        Logout
      </li>
    </div>
  );
}

const mapStateToProps = ({ firebase }) => ({
  firebase
});

const mapDispatchToProps = {
  logout: actions.signOut
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavItems);
