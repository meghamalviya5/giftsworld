import React from "react";
import "./Checkout.css";
const Checkout = () => {
  return (
    <div>
      <div class="checkout-main-container flex-center">
        <h3>CHECKOUT </h3>
        <div class="checkout-manage">
          <div class="checkout-manage-item ">
            <div class="address-checkout-container ">
              <label class="select-input">
                <input
                  type="radio"
                  name="radio"
                  class="radio-input-address"
                  checked=""
                />
                <p class="paragraph-md ">Rutvik Umak</p>
              </label>
              <div class="address-details-checkout">
                <p class="paragraph-sm">
                  #1/4 , 100ft Ring Road, Karve Nagar, Bangalore,Maharashtra .
                  452412
                </p>
                <p class="paragraph-sm">India.</p>
                <p class="paragraph-sm">Phone Number : 123456789</p>
              </div>
            </div>
          </div>
          <div class="checkout-details">
            <h4 class="text-center border-header">ORDER DETAILS</h4>
            <div>
              <li>
                <ul class="order-header">
                  <p>Item</p>
                  <p>Qty</p>
                </ul>
              </li>
              <li>
                <ul>
                  <p>Do Epic Shit</p>
                  <p>1</p>
                </ul>
                <ul>
                  <p>Believe In Yourself</p>
                  <p>1</p>
                </ul>
                <ul>
                  <p>Zero To One</p>
                  <p>1</p>
                </ul>
              </li>
            </div>
            <h4 class="text-center border-header">PRICE DETAILS</h4>
            <div class="checkout-calculate">
              <li>
                <ul>
                  <p>Price (3 items)</p>
                  <p>₹ 2099</p>
                </ul>
                <ul>
                  <p>Discount</p>
                  <p>-₹ 1580</p>
                </ul>
                <ul>
                  <p>Delivery Charges</p>
                  <p>FREE</p>
                </ul>
                <ul>
                  <p>Coupon Discount</p>
                  <p>₹ 0</p>
                </ul>
              </li>
            </div>
            <ul>
              <h4>Total Amount</h4>
              <h4>₹ 519.00</h4>
            </ul>
            <h4 class="text-center border-header">DELIVER TO</h4>

            <div class="deliver-container ">
              <div>
                <p class="paragraph-md ">Rutvik Umak</p>
                <p class="paragraph-sm">
                  #1/4 , 100ft Ring Road, Karve Nagar, Bangalore , Maharashtra
                  ,India. 452412
                </p>
                <p class="paragraph-sm">Phone Number : 123456789</p>
              </div>
            </div>
            <div class="primary-btn text-center">
              <button class="link-btn checkout-btn">Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
