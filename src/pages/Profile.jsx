import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Profile</h1>
        <p>View and update your personal information</p>
      </div>

      <div className="profile-section">
        <h2 className="section-title">User Info</h2>
        <div className="info-box">
          <p><strong>Name:</strong> Ahmed Safwat</p>
          <p><strong>Email:</strong> a.safwat@gmail.com</p>
          <p><strong>Role:</strong> ER Admin</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
