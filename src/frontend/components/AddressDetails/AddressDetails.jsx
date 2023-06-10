import React from "react";

const AddressDetails = ({ address }) => {
  console.log("..in address details..", address);
  return (
    <div>
      <label htmlFor={address?.id} className="address-list-item">
        <div className="basic-details">
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
};

export default AddressDetails;
