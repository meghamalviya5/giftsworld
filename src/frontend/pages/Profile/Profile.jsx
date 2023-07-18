import React from "react";
import User from "../../components/User/User";
import Address from "../../components/Address/Address";
import "./Profile.css";

const Profile = () => {
  return (
    <div>
      <div className="account-container">
        <div className="profile-container">
          <h2>Account</h2>
          <div className="profile-main">
            <div className="tabs">
              <input type="radio" className="tabs" id="profile" checked />
              <label htmlFor="profile">Profile</label>
              <div className="tab">
                <User />
                <div>
                  <h3 className="details-header">Account Settings</h3>
                  <button className="btn btn-danger btn-logout">Log Out</button>
                </div>
              </div>
              <input type="radio" className="tabs" id="address" />
              <label htmlFor="address">Address</label>
              <div className="tab">
                <Address />
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2></h2>
      {/* <User /> */}
      {/* <Address /> */}
    </div>
  );
};

export default Profile;
