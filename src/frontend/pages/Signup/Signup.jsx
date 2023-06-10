import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "./Signup.css";
import "./images/show-password.svg";

const Signup = () => {
  const { handleSignup } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    showPassword: false,
    confirmPassword: "",
    showConfirmPassword: false,
  });

  const handlePassword = () => {
    setUserData((prevData) => ({
      ...prevData,
      showPassword: !userData.showPassword,
    }));
  };

  const handleConfirmPassword = () => {
    setUserData((prevData) => ({
      ...prevData,
      showConfirmPassword: !userData.showConfirmPassword,
    }));
  };

  return (
    <form method="post" onSubmit={handleSignup}>
      <div className="signup-cont">
        <div className="signup-card">
          <h3>Sign Up</h3>
          <div className="signup-input">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              id="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            ></input>
          </div>
          <div className="signup-input">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type={userData.showPassword ? "text" : "password"}
              id="password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            ></input>
            <i
              onClick={handlePassword}
              className={`fa ${
                userData.showPassword ? "fa-eye" : "fa-eye-slash"
              }`}
            ></i>
          </div>
          <div className="signup-input">
            <label htmlFor="confirm-password">Re-enter your password</label>
            <input
              name="confirmPassword"
              type={userData.showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              value={userData.confirmPassword}
              onChange={(e) =>
                setUserData({ ...userData, confirmPassword: e.target.value })
              }
            ></input>
            <i
              onClick={handleConfirmPassword}
              className={`fa ${
                userData.showConfirmPassword ? "fa-eye" : "fa-eye-slash"
              }`}
            ></i>
          </div>
          <div className="signup-input">
            <label>First Name</label>
            <input
              name="firstName"
              type="text"
              id="first-name"
              value={userData.firstName}
              onChange={(e) =>
                setUserData({ ...userData, firstName: e.target.value })
              }
            ></input>
          </div>
          <div className="signup-input">
            <label>Last Name</label>
            <input
              name="lastName"
              type="text"
              id="last-name"
              value={userData.lastName}
              onChange={(e) =>
                setUserData({ ...userData, lastName: e.target.value })
              }
            ></input>
          </div>
          {/* <div>
           <div>
              <input name="email" type="checkbox" id="sign-up-terms" />
              <label htmlFor="sign-up-terms">
                I accept all Terms & Conditions
              </label>
            </div>
          </div> */}
          <button type="submit" className="card-button active-button">
            Sign Up
          </button>
          <Link to="/login">Already have an account</Link>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default Signup;
