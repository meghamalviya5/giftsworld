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
    isLoggedIn: false,
  });

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
    //console.log("e.target --- ", e.target);

    let requestBody = {};
    for (const [key, value] of formData.entries()) {
      console.log(`${key}, ${value}`);
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
        isLoggedIn: userData.isLoggedIn,
        loginResponse: userData.loginResponse,
        handleSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
