import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCartShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import "./NavBar.css";
import "../../../styles.css";
import { CartWishlistContext } from "../../contexts/CartWishlistContext";
import { AuthContext } from "../../contexts/AuthContext";
import Search from "../Search/Search";

const NavBar = () => {
  const { cart, wishlist } = useContext(CartWishlistContext);
  const { userData, setUserData } = useContext(AuthContext);

  const numberOfCartItems = cart?.reduce((count, { qty }) => count + qty, 0);

  const numberOfwishlistItems = wishlist?.length;

  const handleLogout = () => {
    localStorage.clear();
    setUserData((prevData) => ({ ...prevData, isLoggedIn: false }));
  };

  return (
    <div className="nav-bar">
      <div className="nav-item">
        <Link to="/" className="flex brand-name">
          Gifts World
        </Link>
      </div>
      <div className="nav-item ">
        <Search />
      </div>
      {/* <div className="nav-item">
        <FontAwesomeIcon icon={faCompass} />
      </div> */}
      <div className="nav-login">
        <div className="nav-login-item">
          {userData.isLoggedIn ? (
            <Link to="/login" className="flex">
              <button className="btn-log btn-log-out" onClick={handleLogout}>
                Logout
              </button>
            </Link>
          ) : (
            <Link to="/login" className="flex">
              <button className="btn-log btn-log-in">Login</button>
            </Link>
          )}
        </div>
        <div className="nav-login-item nav-icon ">
          <div className="item-count flex-center flex">
            <span className="count-text">{numberOfwishlistItems}</span>
          </div>
          <Link to="/wishlist" className="flex">
            <FontAwesomeIcon
              className="fw-icon"
              icon={faHeart}
              title="Wishlist"
            />
          </Link>
        </div>
        <div className="nav-login-item nav-icon">
          <div className="item-count flex-center flex">
            <span className="count-text">{numberOfCartItems}</span>
          </div>
          <Link to="/cart" className="flex">
            <FontAwesomeIcon
              className="fw-icon"
              icon={faCartShopping}
              title="Cart"
            />
          </Link>
        </div>
        <div className="nav-login-item nav-icon">
          <Link to="/profile" className="flex">
            <FontAwesomeIcon
              className="fw-icon"
              icon={faUser}
              title="Profile"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
