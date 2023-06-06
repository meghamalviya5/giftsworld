import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

console.log("in user");

const User = () => {
  const { userData } = useContext(AuthContext);
  console.log(userData.loggedInUser, "...loggedInUser");
  return (
    <div>
      <h3>PROFILE DETAILS</h3>
      <h4>Full Name: </h4>
      <p>
        {userData?.loggedInUser?.firstName + userData?.loggedInUser?.lastName}
      </p>
      <h4>Email: </h4>
      <p>{userData?.loggedInUser?.email}</p>
    </div>
  );
};

export default User;
