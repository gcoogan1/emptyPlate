import React from "react";
//Local
import './index.css';
import Logo from '../../assets/NEP@2x.png';

function HeaderLogo() {
  return (
    <div className="logo-wrapper">
      <img src={Logo} alt="logo" />
    </div>
  );
}

export default HeaderLogo;
