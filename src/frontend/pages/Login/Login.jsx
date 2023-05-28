import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

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
        setUserData((prevUserData) => {
          // console.log("setting userdata data");
          const setValue = {
            ...prevUserData,
            loginResponse: "Login Successful",
            isLoggedIn: true,
          };
          //console.log("setValue: ", setValue);
          navigate(location?.state?.from?.pathname);
          return setValue;
        });
      }
    } catch (error) {
      console.log(error);
      setUserData({ ...userData, loginResponse: "Error: Failed to Login" });
    }
  };

  return (
    <div>
      <label htmlFor="email-input">Enter email</label>
      <input type="text" onChange={(e) => setEmail(e)} />
      <label htmlFor="pwd">Enter password</label>
      <input type="password" onChange={(e) => setPassword(e)} />
      <button onClick={() => handleLogin()}>Login</button>
      <span>{loginResponse}</span>
    </div>
  );
};

export default Login;
