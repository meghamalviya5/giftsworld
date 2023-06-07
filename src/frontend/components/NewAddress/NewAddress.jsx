import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { v4 as uuid } from "uuid";
import "./NewAddress.css";
import { AuthContext } from "../../contexts/AuthContext";

// React Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

console.log("..in new address");
const NewAddress = () => {
  const { userData, setUserData, userAddress, setUserAddress } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handleNewAddressSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    let newAddressInfo = {
      id: uuid(),
      name: "",
      address: { street: "", city: "", state: "", country: "" },
      zipCode: "",
      phone: "",
    };
    for (const [key, value] of formData.entries()) {
      if (
        key === "street" ||
        key === "city" ||
        key === "state" ||
        key === "country" ||
        key === "zipCode"
      ) {
        newAddressInfo = {
          ...newAddressInfo,
          address: { ...newAddressInfo.address, [key]: value },
        };
        console.log(newAddressInfo, "...address fields");
      } else {
        newAddressInfo = { ...newAddressInfo, [key]: value };
        console.log(newAddressInfo, "...address fields222");
      }
    }

    setUserData((prevData) => ({
      ...prevData,
      address: [...userData.address, newAddressInfo],
    }));
    toast.success("Address added successfully!");
    navigate("/profile");
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  console.log(userData, " after ..userData");

  return (
    <div className="address-form-container displayFlex">
      <form className="address-form" onSubmit={handleNewAddressSubmit}>
        <h4>ADD NEW ADDRESS</h4>
        <div className="form-input">
          <input
            placeholder="Enter Name"
            name="name"
            className="text-input address-form-input"
            type="text"
            required=""
            value={userAddress.name}
            onChange={(e) =>
              setUserAddress({ ...userAddress, name: e.target.value })
            }
          />
          <input
            placeholder="Enter House No. , Road , Colony"
            name="street"
            className="text-input address-form-input"
            type="text"
            required=""
            value={userAddress?.address?.street}
            onChange={(e) =>
              setUserAddress({
                ...userAddress,
                address: { ...userAddress.address, street: e.target.value },
              })
            }
          />
          <input
            placeholder="Enter City"
            name="city"
            className="text-input address-form-input"
            type="text"
            required=""
            value={userAddress?.address?.city}
            onChange={(e) =>
              setUserAddress({
                ...userAddress,
                address: { ...userAddress.address, city: e.target.value },
              })
            }
          />
          <input
            placeholder="Enter State"
            name="state"
            className="text-input address-form-input"
            type="text"
            required=""
            value={userAddress?.address?.state}
            onChange={(e) =>
              setUserAddress({
                ...userAddress,
                address: { ...userAddress.address, state: e.target.value },
              })
            }
          />
          <input
            placeholder="Enter Country"
            name="country"
            className="text-input address-form-input"
            type="text"
            required=""
            value={userAddress?.address?.country}
            onChange={(e) =>
              setUserAddress({
                ...userAddress,
                address: { ...userAddress.address, country: e.target.value },
              })
            }
          />
          <input
            placeholder="Enter Zip Code"
            name="zipCode"
            className="text-input address-form-input"
            type="text"
            required=""
            value={userAddress.zipCode}
            onChange={(e) =>
              setUserAddress({ ...userAddress, zipCode: e.target.value })
            }
          />
          <input
            placeholder="Enter Mobile Number"
            name="phone"
            className="text-input address-form-input"
            type="text"
            required=""
            value={userAddress.phone}
            onChange={(e) =>
              setUserAddress({ ...userAddress, phone: e.target.value })
            }
          />
        </div>
        <div className="address-form-btn">
          <button
            className="btn link-btn address-save"
            type="submit"
            value="Save"
          >
            Save
          </button>
          <button
            type="reset"
            className="btn danger address-cancel"
            value="Cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default NewAddress;
