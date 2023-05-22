import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <div className="nav-item">
        <Link to="/">Gifts World</Link>
      </div>
      <div className="nav-item ">
        <input type="search" className="search" placeholder="Search" />
      </div>
      <div className="nav-login">
        <div className="nav-login-item">
          <button>Login</button>
        </div>
        <div className="nav-login-item">
          <Link to="wishlist">Wishlist</Link>
        </div>
        <div className="nav-login-item">
          <Link to="cart">Cart</Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
