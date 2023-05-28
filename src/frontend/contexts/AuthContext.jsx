import { useState, createContext } from "react";
import axois from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    loginResponse: "",
  });

  //call to login get api
  const loginUser = async () => {
    try {
      console.log(userData, "  ...user");
      const url = "/api/auth/login";
      const data = {
        email: userData.email,
        password: userData.password,
      };
      const response = await axois.post(url, data);
      localStorage.setItem("token", response.data.encodedToken);
      console.log(response);
      if (response.status === 200) {
        setUserData({ ...userData, loginResponse: "Login Successful" });
        console.log(userData.loginResponse, "...loginResponse");
      }
    } catch (error) {
      console.log(error);
      setUserData({ ...userData, loginResponse: "Error: Failed to Login" });
    }
  };
  //call to signup post api
  //const [isLoggedIn, setIsLoggedIn] = useState();

  // const valueProp = {{ login: loginUser(), setEmail, setPassword }};

  //setEmail
  const setEmail = (event) => {
    console.log("email value: ", userData.email);
    setUserData({ ...userData, email: event.target.value });
  };

  //setPassword
  const setPassword = (event) => {
    console.log("password value: ", userData.password);
    setUserData({ ...userData, password: event.target.value });
  };

  return (
    <AuthContext.Provider
      value={{
        login: () => loginUser(),
        setEmail,
        setPassword,
        loginResponse: userData.loginResponse,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
