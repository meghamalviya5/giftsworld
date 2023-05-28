import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import "./Cart.css";

const Cart = () => {
  const {
    cart,
    itemQuantityIncrement,
    itemQuantityDecrement,
    updateCartItems,
    removeFromCart,
  } = useContext(CartContext);
  return cart.length ? (
    <div className="cart-cont">
      <h3>My Cart({cart.length})</h3>
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
                  <div>
                    <div className="cart-card-price">
                      <h2>
                        &#x20B9;{" "}
                        {Math.floor(
                          cartItem.price -
                            (cartItem.price * cartItem.discount) / 100
                        )}
                      </h2>
                      <h4>
                        <s>{cartItem.price}</s>
                      </h4>
                    </div>
                    <div className="cart-card-price">
                      <h4>{cartItem.discount}% OFF</h4>
                    </div>
                    <div className="cart-cart-quantity-cont">
                      Quantity:
                      <div className="cart-card-quantity">
                        <div>
                          <button
                            onClick={() => itemQuantityDecrement(cartItem.name)}
                          >
                            -
                          </button>
                        </div>
                        <input
                          type="number"
                          value={cartItem.qty}
                          onChange={(e) => updateCartItems(e, cartItem.name)}
                        />
                        <div>
                          <button
                            onClick={() => itemQuantityIncrement(cartItem.name)}
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
                <button className="cart-card-wishlist">Move To Wishlist</button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-price-details-card">
          <h4>PRICE DETAILS</h4>
          <hr />
          <div className="cart-price-flex">
            <p>Price (1 item)</p>
            <p>₹2000</p>
          </div>
          <div className="cart-price-flex">
            <p>Discount</p>
            <p>- ₹1000</p>
          </div>
          <div className="cart-price-flex">
            <p>Delivery Charges</p>
            <p>₹499</p>
          </div>
          <hr />
          <div className="cart-price-flex">
            <h4>TOTAL AMOUNT</h4>
            <h4>₹2499</h4>
          </div>
          <hr />
          <p>You will save ₹1000 on this order</p>
          <button className="cart-card-button active-button">
            Place Order
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="cart-empty">
      <h3>Your Cart is Empty!!</h3>
    </div>
  );
};

export default Cart;
