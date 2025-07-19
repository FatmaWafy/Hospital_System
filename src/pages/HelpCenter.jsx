import React from "react";
import "./HelpCenter.css";

const HelpCenter = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Help Center</h1>
        <p>Find answers to your questions</p>
      </div>

      <div className="help-section">
        <h2 className="section-title">FAQs</h2>
        <div className="info-box">
          <p><strong>Q:</strong> How do I add a patient?</p>
          <p><strong>A:</strong> Go to the Patients page and click “Add New”.</p>
          <hr />
          <p><strong>Q:</strong> How can I update my profile?</p>
          <p><strong>A:</strong> Visit the My Profile page and click “Edit”.</p>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
