import React from "react";
//Local Files
import "./index.css";
import NavItems from "./NavItems";
import NEP from "../../../assets/NEP@2x.png";



function NavBar() {
  return (
    <header className="nav_wrapper">
      <img className="nav_logo" src={NEP} alt="Logo" />
      <NavItems />
    </header>
  );
}

export default NavBar;