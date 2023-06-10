import React, { useContext, useEffect } from "react";
import "./Checkout.css";
import { CartWishlistContext } from "../../contexts/CartWishlistContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AddressDetails from "../../components/AddressDetails/AddressDetails";

const Checkout = () => {
  const { cart, numberOfCartItems, totalPrice, totalDiscount } =
    useContext(CartWishlistContext);
  const { userData, userDeliveryAddress, setUserDeliveryAddress } =
    useContext(AuthContext);

  useEffect(() => {
    setUserDeliveryAddress(userData.address[0]);
  }, []);

  return (
    <div>
      <div className="checkout-main-container flex-center">
        <h3>CHECKOUT </h3>
        <div className="checkout-manage">
          <div className="checkout-manage-item ">
            <div className="address-checkout-container ">
              {userData.address.map((address, index) => {
                return (
                  <div>
                    <label htmlFor={address.id} className="address-list-item">
                      <div className="basic-details">
                        <input
                          type="radio"
                          id={address.id}
                          name="address-input"
                          defaultChecked={index === 0}
                          onChange={() => setUserDeliveryAddress(address)}
                        />
                        <span className="address-details-checkout">
                          <p>{address.name} </p>
                          <p>
                            {address.address.street +
                              ", " +
                              address.address.city +
                              ", " +
                              address.address.state +
                              ", " +
                              address.address.country}
                          </p>
                          <p>Zip Code: {address.address.zipCode}</p>
                          <p>Phone: {address.phone}</p>
                        </span>
                      </div>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="cart-price-details-card">
            <h4>ORDER DETAILS</h4>
            <hr />
            {cart.map((cartItem) => (
              <div className="cart-price-flex">
                <p>{cartItem.name}</p>
                <p>{cartItem.qty}</p>
              </div>
            ))}

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
            <h4>DELIVER TO</h4>
            <hr />
            <div className="cart-price-flex">
              <p>
                <AddressDetails address={userDeliveryAddress} />
              </p>
            </div>
            <Link to="/checkout">
              <button className="cart-card-button active-button">
                Place Order
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
