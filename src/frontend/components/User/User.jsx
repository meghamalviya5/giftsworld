import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "./User.css";

console.log("in user");

const User = () => {
  const { userData } = useContext(AuthContext);
  console.log(userData.loggedInUser, "...loggedInUser");
  return (
    <div className="profile-details">
      <h3 className="details-header">Profile Details</h3>
      <div className="profile-details-main">
        <div className="details-title">
          <p className="paragraph-md">Full Name </p>
          <p className="paragraph-md">Email </p>
        </div>
        <div>
          <p className="paragraph-md">
            {`${userData?.loggedInUser?.firstName} ${userData?.loggedInUser?.lastName}`}
          </p>
          <p className="paragraph-md">{userData?.loggedInUser?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default User;
