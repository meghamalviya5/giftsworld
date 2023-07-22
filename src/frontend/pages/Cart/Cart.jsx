import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { CartWishlistContext } from "../../contexts/CartWishlistContext";
import "./Cart.css";
import CardPrice from "../../components/CardPrice/CardPrice";

const Cart = () => {
  const {
    cart,
    itemQuantityIncrement,
    itemQuantityDecrement,
    removeFromCart,
    moveToWishlist,
    findInWishlist,
    numberOfCartItems,
    totalPrice,
    totalDiscount,
  } = useContext(CartWishlistContext);

  return cart.length ? (
    <div className="cart-cont">
      <h3>My Cart({numberOfCartItems})</h3>
      <div className="cart-items">
        <div className="cart-items-card-container">
          {cart.map((cartItem) => (
            <div className="cart-card-cont" key={cartItem._id}>
              <div className="cart-card-img">
                <img src={cartItem.image} alt="cart item" />
              </div>
              <div className="cart-card-details-cont">
                <div className="cart-card-details">
                  <h3>{cartItem.name}</h3>
                  <div className="">
                    <CardPrice gift={cartItem} />
                    <div className="cart-cart-quantity-cont">
                      Quantity:
                      <div className="cart-card-quantity">
                        <div>
                          <button
                            onClick={() => itemQuantityDecrement(cartItem)}
                          >
                            -
                          </button>
                        </div>
                        <input type="text" value={cartItem.qty} />
                        <div>
                          <button
                            onClick={() => itemQuantityIncrement(cartItem._id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="cart-card-button"
                  onClick={() => removeFromCart(cartItem._id)}
                >
                  Remove From Cart
                </button>

                {findInWishlist(cartItem._id) ? (
                  <Link to="/wishlist">
                    <button className="cart-card-wishlist">
                      Go To Wishlist
                    </button>
                  </Link>
                ) : (
                  <button
                    className="cart-card-wishlist"
                    onClick={() => moveToWishlist(cartItem)}
                  >
                    Move to Wishlist
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="cart-price-details-card">
          <h4>PRICE DETAILS</h4>
          <hr />
          <div className="cart-price-flex">
            <p>Price ({numberOfCartItems} item)</p>
            <p>₹{totalPrice}</p>
          </div>
          <div className="cart-price-flex">
            <p>Discount</p>
            <p>₹{totalDiscount}</p>
          </div>
          <div className="cart-price-flex">
            <p>Delivery Charges</p>
            <p>FREE</p>
          </div>
          <hr />
          <div className="cart-price-flex">
            <h4>TOTAL AMOUNT</h4>
            <h4>₹{totalPrice - totalDiscount}</h4>
          </div>
          <hr />
          <p>You will save ₹{totalDiscount} on this order</p>
          <Link to="/checkout">
            <button className="cart-card-button active-button">Checkout</button>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  ) : (
    <div className="cart-empty">
      <h3>Your Cart is Empty!!</h3>
    </div>
  );
};

export default Cart;
