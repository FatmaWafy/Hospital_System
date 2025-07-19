import React from "react";
import "./Settings.css";

const Settings = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage application preferences</p>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Notification Preferences</h2>
        <div className="info-box">
          <p><strong>Email Alerts:</strong> Enabled</p>
          <p><strong>Push Notifications:</strong> Enabled</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
