import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { CartWishlistContext } from "../../contexts/CartWishlistContext";
import { GiftContext } from "../../contexts/GiftContext";

const NavBar = () => {
  const { cart, wishlist } = useContext(CartWishlistContext);
  const { searchItems } = useContext(GiftContext);

  const numberOfCartItems = cart?.reduce((count, { qty }) => count + qty, 0);

  const numberOfwishlistItems = wishlist?.length;

  return (
    <div className="nav-bar">
      <div className="nav-item">
        <Link to="/">Gifts World</Link>
      </div>
      <div className="nav-item ">
        <input
          type="search"
          className="search"
          placeholder="Search"
          onChange={(event) => searchItems(event)}
        />
      </div>
      <div className="nav-login">
        <div className="nav-login-item">
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="nav-login-item">
          <Link to="/wishlist">Wishlist({numberOfwishlistItems})</Link>
        </div>
        <div className="nav-login-item">
          <Link to="/cart">Cart({numberOfCartItems})</Link>
        </div>
        <div className="nav-login-item">
          <Link to="/profile">Cart({numberOfCartItems})</Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
