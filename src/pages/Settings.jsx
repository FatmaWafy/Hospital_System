import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Ahmed Safwat Mohamed",
    jobTitle: "Er Manager",
    email: "i.asafwat@gmail.com",
    phone: "0123456789",
    photo: "avatar.svg",
  });
  const [newPhoto, setNewPhoto] = useState(null);

  const handleSave = () => {
    console.log("Saving user data:", userData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewPhoto(file);
      // Placeholder for API call to upload photo
      console.log("Uploading photo:", file.name);
      // Example: fetch('/api/upload-photo', { method: 'POST', body: file })
      // Then update userData.photo with the new URL from backend response
    }
  };

  return (
    <div className='settings-page'>
      <div className='settings-header'>
        <h1>Settings</h1>
        <a href='/notifications'>
          <img
            src='/notifications.svg'
            alt='Notifications'
            className='notification-icon'
          />
        </a>
      </div>
      <div className='settings-welcome'>
        <div className='welcome-text'>
          <h2>Good morning, ER Admin</h2>
          <p>
            Here is what’s happening with ER Department from May 19 - May 25.
          </p>
        </div>
        <button className='date-range-btn'>
          <span>May 19 - May 25</span>
          <img src='/calendar.svg' alt='Calendar' className='calendar-icon' />
        </button>
      </div>
      <div className='tabs-container'>
        <button
          className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          My Profile
        </button>
        <button
          className={`tab-btn ${activeTab === "specialties" ? "active" : ""}`}
          onClick={() => setActiveTab("specialties")}
        >
          Specialties
        </button>
        <button
          className={`tab-btn ${activeTab === "doctors" ? "active" : ""}`}
          onClick={() => setActiveTab("doctors")}
        >
          Doctors
        </button>
        <button
          className={`tab-btn ${activeTab === "requests" ? "active" : ""}`}
          onClick={() => setActiveTab("requests")}
        >
          Requests & Notifications
        </button>
        <button
          className={`tab-btn ${activeTab === "feedbacks" ? "active" : ""}`}
          onClick={() => setActiveTab("feedbacks")}
        >
          Feed backs
        </button>
      </div>
      <div className='tab-content'>
        {activeTab === "profile" && (
          <div>
            <p className='profile-title'>Personal Info</p>
            <div className='profile-section'>
              <div className='photo-container'>
                <label className='input-label'>Profile Photo:</label>
                <img
                  src={userData.photo}
                  alt='Profile'
                  className='profile-photo'
                />
                {isEditing && (
                  <>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handlePhotoChange}
                      style={{ display: "none" }}
                      id='photoInput'
                    />
                    <button
                      className='btn-edit-photo'
                      onClick={() =>
                        document.getElementById("photoInput").click()
                      }
                    >
                      <img
                        src='f2.svg'
                        alt='Change Photo'
                        className='change-photo-icon'
                      />
                    </button>
                  </>
                )}
              </div>
              <div className='personal-info-stack'>
                <div className='info-item'>
                  <label className='input-label'>Name:</label>
                  <input
                    type='text'
                    value={userData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    readOnly={!isEditing}
                    className={`input-field ${!isEditing ? "readonly" : ""}`}
                  />
                </div>
                <div className='info-item'>
                  <label className='input-label'>Job Title:</label>
                  <input
                    type='text'
                    value={userData.jobTitle}
                    onChange={(e) =>
                      handleInputChange("jobTitle", e.target.value)
                    }
                    readOnly={!isEditing}
                    className={`input-field ${!isEditing ? "readonly" : ""}`}
                  />
                </div>
                <div className='info-item'>
                  <label className='input-label'>Email:</label>
                  <input
                    type='text'
                    value={userData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    readOnly={!isEditing}
                    className={`input-field ${!isEditing ? "readonly" : ""}`}
                  />
                </div>
                <div className='info-item'>
                  <label className='input-label'>Phone no.:</label>
                  <input
                    type='text'
                    value={userData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    readOnly={!isEditing}
                    className={`input-field ${!isEditing ? "readonly" : ""}`}
                  />
                </div>
              </div>
              <div className='action-buttons-group'>
                <div className='save-edit-buttons'>
                  <button
                    className='btn-save'
                    onClick={handleSave}
                    disabled={!isEditing}
                  >
                    Save
                  </button>
                  <button
                    className='btn-edit'
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "Cancel Edit" : "Edit Profile"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "specialties" && (
          <div className='tab-content-placeholder'>
            <h3>Specialties</h3>
            <p> from backend </p>
          </div>
        )}
        {activeTab === "doctors" && (
          <div className='tab-content-placeholder'>
            <h3>Doctors</h3>
            <p> from backend </p>
          </div>
        )}
        {activeTab === "requests" && (
          <div className='tab-content-placeholder'>
            <h3>Requests & Notifications</h3>
            <p> from backend </p>
          </div>
        )}
        {activeTab === "feedbacks" && (
          <div className='tab-content-placeholder'>
            <h3>Feed backs</h3>
            <p> from backend </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
