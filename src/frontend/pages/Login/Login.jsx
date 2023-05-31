import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const { setEmail, setPassword, loginResponse, userData, setUserData } =
    useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const url = "/api/auth/login";
      const data = {
        email: userData.email,
        password: userData.password,
      };
      const response = await axios.post(url, data);
      localStorage.setItem("token", response.data.encodedToken);
      if (response.status === 200) {
        setUserData((prevUserData) => ({
          ...prevUserData,
          loginResponse: "Login Successful",
          isLoggedIn: true,
        }));

        navigate(location?.state?.from?.pathname);
      }
    } catch (error) {
      console.log(error);
      setUserData({ ...userData, loginResponse: "Error: Failed to Login" });
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
        <div className="login-forgot-details">
          <div className="remember-me">
            <input type="checkbox" />
            <label>Remember Me</label>
          </div>
          <div className="forgot-password">Forgot your Password?</div>
        </div>
        <button
          className="card-button active-button"
          onClick={() => handleLogin()}
        >
          Login
        </button>
        <span>{loginResponse}</span>
        <a className="create-new-account" href="/signup">
          Create New Account
        </a>
      </div>
    </div>
  );
};

export default Login;
