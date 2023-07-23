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

  return (
    <div className="cart-cont">
      <div className="flex cart-main-container">
        <h3>
          My Cart
          {cart?.length > 0 ? `(${cart?.length})` : ""}
        </h3>
        {cart.length ? (
          <div className="cart-details">
            <div className="cart-items-card-container">
              {cart.map((cartItem) => (
                <div className="cart-card-cont" key={cartItem._id}>
                  <div className="cart-card-img">
                    <img src={cartItem.image} alt="cart item" />
                  </div>
                  <div className="cart-card-details-cont">
                    <div className="cart-card-details">
                      <h4>{cartItem.name}</h4>
                      <div className="flex flex-column">
                        <div className="fw-bold">
                          <CardPrice gift={cartItem} />
                        </div>
                        <div className="cart-cart-quantity-cont">
                          Quantity:
                          <div className="cart-card-quantity">
                            <button
                              className="minus-btn"
                              onClick={() => itemQuantityDecrement(cartItem)}
                              disabled={cartItem.qty <= 1}
                            >
                              -
                            </button>

                            <input type="text" value={cartItem.qty} />

                            <button
                              className="plus-btn"
                              onClick={() =>
                                itemQuantityIncrement(cartItem._id)
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-column mt-m flex-col-gap-s">
                      <button
                        className="cart-card-remove cart-btn"
                        onClick={() => removeFromCart(cartItem._id)}
                      >
                        Remove From Cart
                      </button>
                      {findInWishlist(cartItem._id) ? (
                        <Link to="/wishlist">
                          <button className="cart-card-wishlist cart-btn">
                            Go To Wishlist
                          </button>
                        </Link>
                      ) : (
                        <button
                          className="cart-card-wishlist cart-btns"
                          onClick={() => moveToWishlist(cartItem)}
                        >
                          Move to Wishlist
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-price-details-card">
              <h4 className="txt-center">PRICE DETAILS</h4>
              {/* <hr /> */}
              {/* <div className="cart-price-flex"> */}
              <div className="price-calculate">
                <li>
                  <ul>
                    <p>Price ({numberOfCartItems} item)</p>
                    <p>₹{totalPrice}</p>
                  </ul>
                  {/* </div> */}
                  {/* <div className="cart-price-flex"> */}
                  <ul>
                    <p>Discount</p>
                    <p>₹{totalDiscount}</p>
                  </ul>
                  {/* </div> */}
                  {/* <div className="cart-price-flex"> */}
                  <ul>
                    <p>Delivery Charges</p>
                    <p>FREE</p>
                  </ul>
                </li>
              </div>
              {/* </div> */}
              {/* <hr /> */}
              {/* <div className="cart-price-flex"> */}
              <ul className="price-totalAmt">
                <h4>TOTAL AMOUNT</h4>
                <h4>₹{totalPrice - totalDiscount}</h4>
              </ul>
              {/* </div> */}
              {/* <hr /> */}
              <p className="save-msg">
                You will save ₹{totalDiscount} on this order
              </p>
              <Link to="/checkout">
                <button className="cart-card-button active-button">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="cart-empty">
            <h3>Your Cart is Empty!!</h3>
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Cart;
