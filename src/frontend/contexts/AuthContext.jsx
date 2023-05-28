import { useState, createContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext();

console.log("in AuthCOntext");
const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    loginResponse: "",
    isLoggedIn: false,
  });

  //call to login get api
  const loginUser = async () => {
    try {
      const url = "/api/auth/login";
      const data = {
        email: userData.email,
        password: userData.password,
      };
      const response = await axios.post(url, data);
      localStorage.setItem("token", response.data.encodedToken);
      if (response.status === 200) {
        setUserData((prevUserData) => {
          console.log("setting userdata data");
          const setValue = {
            ...prevUserData,
            loginResponse: "Login Successful",
            isLoggedIn: true,
          };
          console.log("setValue: ", setValue);
          return setValue;
        });

        // setUserData({
        //   ...userData,
        //   loginResponse: "Login Successful",
        //   isLoggedIn: true,
        // });
      }
    } catch (error) {
      console.log(error);
      setUserData({ ...userData, loginResponse: "Error: Failed to Login" });
    }
  };
  //call to signup post api
  //const [isLoggedIn, setIsLoggedIn] = useState();

  //setEmail
  const setEmail = (event) => {
    setUserData({ ...userData, email: event.target.value });
  };

  //setPassword
  const setPassword = (event) => {
    setUserData({ ...userData, password: event.target.value });
  };

  return (
    <AuthContext.Provider
      value={{
        loginUser,
        setEmail,
        userData,
        setUserData,
        setPassword,
        isLoggedIn: userData.isLoggedIn,
        loginResponse: userData.loginResponse,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
