import { useState, createContext } from "react";

export const AuthContext = createContext();

console.log("in AuthCOntext");
const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    loginResponse: "",
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

  return (
    <AuthContext.Provider
      value={{
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
