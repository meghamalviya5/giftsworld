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
          <div className="input-container flex flex-column flex-row-gap-s fw-bold">
            <div className="signup-input">
              <label>First Name</label>
              <input
                name="firstName"
                type="text"
                id="first-name"
                placeholder="Enter first name"
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
                placeholder="Enter last name"
                value={userData.lastName}
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
              ></input>
            </div>
            <div className="signup-input">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="text"
                id="email"
                placeholder="Enter email"
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
                placeholder="Enter password"
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
              <label htmlFor="confirm-password">Confirm password</label>
              <input
                name="confirmPassword"
                type={userData.showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                placeholder="Re-enter your password"
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
          </div>
          {/* <div>
           <div>
              <input name="email" type="checkbox" id="sign-up-terms" />
              <label htmlFor="sign-up-terms">
                I accept all Terms & Conditions
              </label>
            </div>
          </div> */}
          <button type="submit" className="card-button">
            Sign Up
          </button>
          <p className="txt-center w-full mt-s">
            Already have an account?
            <Link to="/login" className="secondary-color p-xs">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default Signup;
