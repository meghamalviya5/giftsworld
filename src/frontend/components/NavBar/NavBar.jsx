import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { CartContext } from "../../contexts/CartContext";

const NavBar = () => {
  const { cart } = useContext(CartContext);

  const numberOfCartItems = cart?.reduce((count, { qty }) => count + qty, 0);

  //useEffect(() => {
  // getCart();
  //}, []);
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
          <Link to="/cart">Cart({numberOfCartItems})</Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
