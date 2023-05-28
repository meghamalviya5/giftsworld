import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { CartContext } from "../../contexts/CartContext";

const NavBar = () => {
  const { getCart, cart } = useContext(CartContext);

  useEffect(() => {
    getCart();
  }, []);
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
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="nav-login-item">
          <Link to="wishlist">Wishlist({})</Link>
        </div>
        <div className="nav-login-item">
          <Link to="cart">Cart({cart.length})</Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
