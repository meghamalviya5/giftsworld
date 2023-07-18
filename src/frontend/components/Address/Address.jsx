import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

// React Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./Address.css";

const addressObj = {
  id: 211,
  name: "Megha",
  address: {
    street: "3375 Stroman Run",
    city: "North Brycen",
    state: "Nevada",
    country: "India",
  },
  zipCode: "00641",
  phone: "1-650-866-5445",
};

const Address = () => {
  const { userData, setUserData, editAddress } = useContext(AuthContext);

  const populateAddress = () => {
    const testdata = userData.address.filter((data) => data.id === 211);
    return userData.email === "123" && testdata.length > 0
      ? setUserData((prevData) => ({
          ...prevData,
          address: [...userData.address],
        }))
      : setUserData((prevData) => ({
          ...prevData,
          address: [...userData.address, addressObj],
        }));
  };

  useEffect(() => {
    console.log("in useEffect-------------");
    populateAddress();
  }, []);

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
              {/* </span> */}
            </div>
            <div className="address-btn">
              <Link to="/newAddress" onClick={() => editAddress(address)}>
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
      <Link to="/newAddress" onClick={addAddress}>
        <button className="btn default address-add false">
          + Add New Address
        </button>
      </Link>
      <ToastContainer />
    </div>
  );
};

export default Address;
