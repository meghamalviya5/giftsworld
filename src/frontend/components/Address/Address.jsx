import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./Address.css";

const addressObj = {
  id: 211,
  name: "Megha",
  address: {
    street: "3375 Stroman Run",
    city: "North Brycen",
    state: "Nevada",
    country: "India",
    zipCode: "00641",
  },
  phone: "1-650-866-5445",
};

const Address = () => {
  const { userData, setUserData, userAddress, setUserAddress } =
    useContext(AuthContext);

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
  const navigate = useNavigate();

  const editAddress = async (chosenAddress) => {
    console.log(chosenAddress, "  in edit chosenAddress");
    setUserAddress(
      {
        name: chosenAddress.name,
        address: {
          street: chosenAddress.street,
          city: chosenAddress.city,
          state: chosenAddress.state,
          country: chosenAddress.country,
          zipCode: chosenAddress.zipCode,
        },
        phone: chosenAddress.phone,
      },
      () => navigate("/newAddress")
    );
  };

  const deleteAddress = (chosenAddress) => {
    const updatedAddress = userData.address.filter(
      (address) => address.id !== chosenAddress.id
    );
    setUserData((prevData) => ({
      ...prevData,
      address: [...updatedAddress],
    }));
  };

  return (
    <div>
      {console.log("in address")}
      <h3>ADDRESS</h3>
      {userData.address.map((address) => {
        return (
          <div>
            <label htmlFor={address.id} className="address-list-item">
              <div className="basic-details">
                <input type="radio" id={address.id} name="address-input" />
                <span className="address-details">
                  <p>{address.name} || </p>
                  <p>
                    {address.address.street +
                      ", " +
                      address.address.city +
                      ", " +
                      address.address.state +
                      ", " +
                      address.address.country}
                  </p>
                </span>
              </div>
              <div className="more-details">
                <p>Zip Code: {address.address.zipCode}</p>
                <p>Phone: {address.phone}</p>
              </div>
            </label>
            <button onClick={() => editAddress(address.id)}>Edit</button>

            <button onClick={() => deleteAddress(address)}>Delete</button>
          </div>
        );
      })}
      <Link to="/newAddress">
        <button>Add New Address</button>
      </Link>
    </div>
  );
};

export default Address;
