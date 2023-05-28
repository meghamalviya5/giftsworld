import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router";

const RequiresAuth = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  console.log("isloggedin in RequiresAuth: ", isLoggedIn);
  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default RequiresAuth;
