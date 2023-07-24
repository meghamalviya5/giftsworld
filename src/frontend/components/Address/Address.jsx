import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

// React Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./Address.css";
import { CartWishlistContext } from "../../contexts/CartWishlistContext";
import NewAddress from "../NewAddress/NewAddress";

const Address = () => {
  const { userData, setUserData, editAddress } = useContext(AuthContext);
  const {
    state: { addressModalStatus },
    dispatch,
  } = useContext(CartWishlistContext);

  const addAddress = () => {
    setUserData({ ...userData, saveState: "add" });
  };

  const deleteAddress = (chosenAddress) => {
    const updatedAddress = userData.address.filter(
      (address) => address.id !== chosenAddress.id
    );
    setUserData((prevData) => ({
      ...prevData,
      address: [...updatedAddress],
    }));

    toast.success("Address deleted successfully!");
  };

  return (
    <div>
      {console.log("in address")}
      <h3 className="details-header">My Addresses</h3>
      {userData.address.map((address) => {
        return (
          <div className="address-container">
            <p className="paragraph-md">{address.name} </p>
            <div>
              <p className="paragraph-sm">
                {address.address.street +
                  ", " +
                  address.address.city +
                  ", " +
                  address.address.state +
                  ", "}
              </p>
              <p className="paragraph-sm">Zip Code: {address.zipCode}</p>
              <p className="paragraph-sm">{address.address.country}</p>
              <p className="paragraph-sm">Phone: {address.phone}</p>
            </div>
            <div className="address-btn">
              <Link
                onClick={() => {
                  editAddress(address);
                  dispatch({
                    type: "ADDRESS_MODAL_STATUS_UPDATE",
                    payload: true,
                  });
                }}
              >
                <button className="btn outlined-default address-edit">
                  Edit
                </button>
              </Link>
              <button
                className="btn outlined-danger address-remove"
                onClick={() => deleteAddress(address)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
      <Link
        onClick={() => {
          addAddress();
          dispatch({
            type: "ADDRESS_MODAL_STATUS_UPDATE",
            payload: true,
          });
        }}
      >
        <button className="btn default address-add false">
          + Add New Address
        </button>
      </Link>
      {addressModalStatus ? <NewAddress /> : null}
      <ToastContainer />
    </div>
  );
};

export default Address;
