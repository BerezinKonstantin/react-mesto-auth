import React from "react";
import headerLogo from "../pictures/logo.svg";

function Header() {
  return (
    <header className="header">
      <img className="logo" src={headerLogo} alt="Логотип" />
    </header>
  );
}

export default Header;
