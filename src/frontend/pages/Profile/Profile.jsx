import React, { useState } from "react";
import User from "../../components/User/User";
import Address from "../../components/Address/Address";
import "./Profile.css";

const Profile = () => {
  const [activeTab, setActiveTabs] = useState("tab1");

  const handleTab = (tab) => {
    setActiveTabs(tab);
  };

  return (
    <div>
      <div className="account-container">
        <div className="profile-container">
          <h2>Account</h2>
          <div className="profile-main">
            <div className="tabs">
              <input
                type="radio"
                className="tabs"
                id="profile"
                onClick={() => handleTab("tab1")}
                checked={activeTab === "tab1"}
              />
              <label htmlFor="profile">Profile</label>
              {activeTab === "tab1" ? (
                <div className="tab">
                  <User />
                  <div>
                    <h3 className="details-header">Account Settings</h3>
                    <button className="btn btn-danger btn-logout">
                      Log Out
                    </button>
                  </div>
                </div>
              ) : null}
              <input
                type="radio"
                className="tabs"
                id="address"
                onClick={() => handleTab("tab2")}
                checked={activeTab === "tab2"}
              />
              <label htmlFor="address">Address</label>
              {activeTab === "tab2" ? (
                <div className="tab">
                  <Address />
                </div>
              ) : null}
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
