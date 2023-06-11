import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { CartWishlistContext } from "../../contexts/CartWishlistContext";
import { GiftContext } from "../../contexts/GiftContext";
import { AuthContext } from "../../contexts/AuthContext";

const NavBar = () => {
  const { cart, wishlist } = useContext(CartWishlistContext);
  const { state, dispatch } = useContext(GiftContext);
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
        <Link to="/">Gifts World</Link>
      </div>
      <div className="nav-item ">
        <input
          type="search"
          className="search"
          placeholder="Search"
          value={state.filterState.search}
          onChange={(event) =>
            dispatch({ type: "SEARCH_ITEMS1", payload: event })
          }
          // onChange={(event) => searchItems(event)}
        />
      </div>
      <div className="nav-login">
        <div className="nav-login-item">
          {userData.isLoggedIn ? (
            <Link to="/login">
              <button onClick={handleLogout}>Logout</button>
            </Link>
          ) : (
            <Link to="/login">
              <button>Login</button>
            </Link>
          )}
        </div>
        <div className="nav-login-item">
          <Link to="/wishlist">Wishlist({numberOfwishlistItems})</Link>
        </div>
        <div className="nav-login-item">
          <Link to="/cart">Cart({numberOfCartItems})</Link>
        </div>
        <div className="nav-login-item">
          <Link to="/profile">Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
