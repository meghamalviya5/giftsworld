import React from "react";

const CardPrice = ({ gift }) => {
  return (
    <div className="card-price flex-space-between">
      <div className="flex flex-col-gap-xs">
        <div className="fw-bold">
          &#x20B9;
          {gift.price - Math.floor((gift.price * gift.discount) / 100)}
        </div>
        <div className="grey-color">
          <s>{gift.price}</s>
        </div>
      </div>
      <div>{gift.discount}% OFF</div>
    </div>
  );
};

export default CardPrice;
