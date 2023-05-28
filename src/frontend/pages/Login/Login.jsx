import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const { login, setEmail, setPassword, loginResponse } =
    useContext(AuthContext);
  const handleLogin = () => {
    login();
  };

  console.log("in login");

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
