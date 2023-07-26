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
      <div className="checkout-main-container flex flex-center">
        <h3>CHECKOUT </h3>
        <div className="checkout-manage">
          <div className="checkout-manage-item ">
            {userData.address.map((address, index) => {
              return (
                <div className="address-checkout-container ">
                  <label htmlFor={address.id} className="select-input">
                    <input
                      type="radio"
                      id={address.id}
                      name="address-input"
                      className="radio-input-address"
                      defaultChecked={index === 0}
                      onChange={() => setUserDeliveryAddress(address)}
                    />
                    <p className="txt-s">{address.name} </p>
                  </label>
                  <div>
                    <span className="address-details-checkout">
                      <p>
                        {address.address.street +
                          ", " +
                          address.address.city +
                          ", " +
                          address.address.state +
                          ", " +
                          address.address.country}
                      </p>
                      <p>Zip Code: {address.zipCode}</p>
                      <p>Phone: {address.phone}</p>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="checkout-details">
            <h4 className="txt-center border-header">ORDER DETAILS</h4>
            {/* <hr /> */}
            <div>
              <li>
                <ul className="order-header">
                  <p>Item</p>
                  <p>Quantity</p>
                </ul>
              </li>
              {cart.map((cartItem) => (
                <li>
                  <ul>
                    <p>{cartItem.name}</p>
                    <p>{cartItem.qty}</p>
                  </ul>
                </li>
              ))}
            </div>

            <h4 className="txt-center border-header">PRICE DETAILS</h4>

            <div className="cart-price-flex">
              <p>Price ({numberOfCartItems} item)</p>
              <p>₹ {totalPrice}</p>
            </div>
            <div className="cart-price-flex">
              <p>Discount</p>
              <p>-₹ {totalDiscount}</p>
            </div>
            <div className="cart-price-flex">
              <p>Delivery Charges</p>
              <p>FREE</p>
            </div>

            <div className="cart-price-flex">
              <h4>TOTAL AMOUNT</h4>
              <h4>₹ {totalPrice - totalDiscount}</h4>
            </div>

            <h4 className="txt-center border-header">DELIVER TO</h4>

            <div className="cart-price-flex">
              <p>
                <AddressDetails address={userDeliveryAddress} />
              </p>
            </div>
            <Link to="/checkout">
              <button className="card-button">Place Order</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
