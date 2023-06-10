import { useState, createContext } from "react";
import axios from "axios";

// React Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

console.log("in AuthCOntext");
const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    loginResponse: "",
    loggeddInUser: {},
    address: [],
    isLoggedIn: false,
    deliveryAddress: [],
    saveState: "add",
  });

  const [userAddress, setUserAddress] = useState({
    id: 0,
    name: "",
    address: { street: "", city: "", state: "", country: "" },
    zipCode: "",
    phone: "",
  });

  const [userDeliveryAddress, setUserDeliveryAddress] = useState({
    id: 211,
    name: "",
    address: { street: "", city: "", state: "", country: "" },
    zipCode: "",
    phone: "",
  });

  const editAddress = (chosenAddress) => {
    console.log(chosenAddress, "  in edit chosenAddress");
    setUserData({ ...userData, saveState: "edit" });
    setUserAddress({
      id: chosenAddress.id,
      name: chosenAddress.name,
      address: {
        street: chosenAddress.address.street,
        city: chosenAddress.address.city,
        state: chosenAddress.address.state,
        country: chosenAddress.address.country,
      },
      zipCode: chosenAddress.zipCode,
      phone: chosenAddress.phone,
    });
  };

  //call to signup post api

  //setEmail
  const setEmail = (event) => {
    setUserData({ ...userData, email: event.target.value });
  };

  //setPassword
  const setPassword = (event) => {
    setUserData({ ...userData, password: event.target.value });
  };

  //handleSignup
  const handleSignup = async (e) => {
    e.preventDefault();

    //read form data
    const form = e.target;
    const formData = new FormData(form);

    let requestBody = {};
    for (const [key, value] of formData.entries()) {
      //console.log(`${key}, ${value}`);
      requestBody = { ...requestBody, [key]: value };
    }

    try {
      //call api
      const response = await axios(`/api/auth/signup`, {
        method: form.method,
        data: requestBody,
      });
      console.log(response.data);
      localStorage.setItem("token", response.data.encodedToken);
      toast.success("Signed Up Successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Email Already Exists.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        setEmail,
        userData,
        setUserData,
        setPassword,
        userAddress,
        setUserAddress,
        userDeliveryAddress,
        setUserDeliveryAddress,
        isLoggedIn: userData.isLoggedIn,
        loginResponse: userData.loginResponse,
        handleSignup,
        editAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
