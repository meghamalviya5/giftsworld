import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

import { ToastContainer } from "react-toastify";
// React Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const { setEmail, setPassword, userData, setUserData } =
    useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const addressObj = {
    id: 211,
    name: "Megha Malviya",
    address: {
      street: "3375 Stroman Run",
      city: "North Brycen",
      state: "Nevada",
      country: "India",
    },
    zipCode: "00641",
    phone: "1-650-866-5445",
  };

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

  const handleLogin = async (status) => {
    try {
      const url = "/api/auth/login";
      let data = {};
      if (status === "test") {
        data = {
          email: "123",
          password: "123",
        };
        setUserData((prevUserData) => ({
          ...prevUserData,
          email: "123",
          password: "123",
        }));
      } else {
        data = {
          email: userData.email,
          password: userData.password,
        };
      }
      const response = await axios.post(url, data);
      localStorage.setItem("token", response.data.encodedToken);
      if (response.status === 200) {
        await setUserData((prevUserData) => ({
          ...prevUserData,
          loginResponse: "Login Successful",
          loggedInUser: response.data.foundUser,
          isLoggedIn: true,
        }));
        console.log(response.data.foundUser, "...found User");
        populateAddress();
        toast.success("Login Successful");
        console.log(location?.state?.from?.pathname);
        if (location?.state === null && location?.pathname === "/login") {
          navigate("/");
        } else {
          navigate(location?.state?.from?.pathname);
        }
      }
    } catch (error) {
      console.log(error);
      setUserData({ ...userData, loginResponse: "Error: Failed to Login" });
      toast.error("Login failed!");
    }
  };

  return (
    <div className="login-cont">
      <div className="login-card">
        <h3>Login</h3>
        <div className="login-input">
          <label htmlFor="email-input">
            <b>Enter email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            onChange={(e) => setEmail(e)}
          />
        </div>
        <div className="login-input">
          <label htmlFor="pwd">
            <b>Enter password</b>
          </label>
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e)}
          />
        </div>
        {/* <div className="login-forgot-details">
          <div className="remember-me">
            <input type="checkbox" />
            <label>Remember Me</label>
          </div>
          <div className="forgot-password">Forgot your Password?</div>
        </div> */}
        {/* {userData.isLoggedIn ? (
          <button
            className="card-button active-button"
            onClick={() => handleLogin()}
          >
            {console.log(userData.isLoggedIn, "...isloggedin1")}
            {"Logout"}
          </button>
        ) : (
          <button
            className="card-button active-button"
            onClick={() => handleLogin()}
          >
            {console.log(userData.isLoggedIn, "...isloggedin2")}
            {"Login"}
          </button>
        )} */}
        <button
          className="card-button active-button"
          onClick={() => handleLogin("test")}
        >
          Login as Test User
        </button>
        <button
          className="card-button active-button"
          onClick={() => handleLogin("")}
        >
          Login
        </button>
        <a className="create-new-account" href="/signup">
          Create New Account
        </a>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
