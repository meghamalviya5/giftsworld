import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { CartWishlistContext } from "../../contexts/CartWishlistContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

const CartButton = ({ gift }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  const { addToCart, findInCart } = useContext(CartWishlistContext);

  const handleAddToCart = (gift) => {
    if (token) {
      addToCart(gift);
    } else {
      navigate("/login", { state: { from: location } });
    }
  };

  return (
    <div>
      {findInCart(gift._id) ? (
        <Link to="/cart">
          <button className="flex flex-col-gap-xs flex-center card-btn">
            <FontAwesomeIcon
              className="fw-icon-cart"
              icon={faCartShopping}
              title="Cart"
            />
            <span>Go To Cart</span>
          </button>
        </Link>
      ) : (
        <button
          className="flex flex-col-gap-xs flex-center card-btn"
          onClick={() => handleAddToCart(gift)}
        >
          <FontAwesomeIcon
            className="fw-icon-cart"
            icon={faCartShopping}
            title="Cart"
          />
          Add To Cart
        </button>
      )}
    </div>
  );
};

export default CartButton;
