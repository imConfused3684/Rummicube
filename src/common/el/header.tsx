import React from "react";
import "../styles/header.css"

let username = "User"
let rating = 1000
const Header = () => {
    return (
        <header>
        <div className="header-wrapper">
          <span className="header-username">{username}</span>
          <span className="header-rating">{rating}</span>
        </div>
      </header>
    );
}

export default Header;